import { Capability } from './constants';

/**
 * VirtualDevice - ✅ REFACTORISÉ: Status notifications uniformisées
 * 
 * Device virtuel avec configuration d'actuateurs dynamique
 * 
 * NOUVELLES FONCTIONNALITÉS:
 * - Configuration d'actuateurs à chaud via setConfig()
 * - Presets prédéfinis pour configurations communes
 * - Notification automatique des changements de config
 * - Comptage intelligent des commandes par actuateur
 * - API simple pour tests et développement
 */
class VirtualDevice {
  constructor(notify = null) {
    this.index = -1;
    this.name = 'Virtual Device';
    this.notify = notify;
    this.messageTimingGap = 0;
    
    // Configuration dynamique des actuateurs
    this.actuatorConfig = [];
    this.messageAttributes = {};
    
    // Configuration par défaut (comme avant)
    this.setConfig('default');
    
    // Système de comptage amélioré
    this.commandCounts = {
      total: 0,
      byActuator: new Map(),
      lastCommand: null,
      lastCommandTime: null
    };

    this.notify?.('status:virtual', { message: 'Virtual Device initialized with default config', type: 'success' });
  }

  // ============================================================================
  // SECTION 1: CONFIGURATION DYNAMIQUE
  // ============================================================================

  /**
   * Configure les actuateurs du device virtuel
   * @param {string|Array} config - Preset name ou array de configs d'actuateurs
   * 
   * Exemples:
   * - setConfig('default') -> 1 linear + 1 vibrate + 1 oscillate + 1 rotate
   * - setConfig('simple') -> 1 linear + 1 vibrate  
   * - setConfig([{capability: 'linear'}, {capability: 'vibrate'}])
   * - setConfig('stroker') -> 1 linear seulement
   * - setConfig('multi-vibe') -> 3 vibrate
   */
  setConfig(config) {
    let newConfig = [];
    
    if (typeof config === 'string') {
      newConfig = this._getPresetConfig(config);
    } else if (Array.isArray(config)) {
      newConfig = this._validateCustomConfig(config);
    } else {
      this.notify?.('status:virtual', { message: 'Invalid config type. Use preset name or array', type: 'error' });
      return false;
    }
    
    const oldConfig = [...this.actuatorConfig];
    this.actuatorConfig = newConfig;
    this._rebuildMessageAttributes();
    this._resetCommandCounts();
    
    this.notify?.('status:virtual', { message: `Config changed from ${oldConfig.length} to ${newConfig.length} actuators`, type: 'success' });
    
    // Notifier le changement (comme un vrai device connect/disconnect)
    this.notify?.('buttplug:device', { 
      device: this,
      configChanged: true,
      oldConfig,
      newConfig: [...newConfig]
    });
    
    return true;
  }

  /**
   * Configurations prédéfinies
   * @private
   */
  _getPresetConfig(preset) {
    const presets = {
      'default': [
        { capability: Capability.LINEAR, name: 'Main Stroke' },
        { capability: Capability.VIBRATE, name: 'Vibration' },
        { capability: Capability.OSCILLATE, name: 'Oscillation' },
        { capability: Capability.ROTATE, name: 'Rotation' }
      ],
      
      'simple': [
        { capability: Capability.LINEAR, name: 'Stroke' },
        { capability: Capability.VIBRATE, name: 'Buzz' }
      ],
      
      'stroker': [
        { capability: Capability.LINEAR, name: 'Main Stroke' }
      ],
      
      'multi-vibe': [
        { capability: Capability.VIBRATE, name: 'Vibe 1' },
        { capability: Capability.VIBRATE, name: 'Vibe 2' },
        { capability: Capability.VIBRATE, name: 'Vibe 3' }
      ],
      
      'full-featured': [
        { capability: Capability.LINEAR, name: 'Main Stroke' },
        { capability: Capability.LINEAR, name: 'Secondary' },
        { capability: Capability.VIBRATE, name: 'Tip Vibe' },
        { capability: Capability.VIBRATE, name: 'Base Vibe' },
        { capability: Capability.ROTATE, name: 'Twist' },
        { capability: Capability.OSCILLATE, name: 'Swing' }
      ],
      
      'rotator': [
        { capability: Capability.ROTATE, name: 'Main Rotation' },
        { capability: Capability.VIBRATE, name: 'Secondary Vibe' }
      ]
    };
    
    if (!presets[preset]) {
      this.notify?.('status:virtual', { message: `Unknown preset '${preset}', using 'default'`, type: 'info' });
      return presets['default'];
    }
    
    this.notify?.('status:virtual', { message: `Applied preset: ${preset}`, type: 'log' });
    return presets[preset];
  }

  /**
   * Valide une configuration custom
   * @private
   */
  _validateCustomConfig(config) {
    const validCapabilities = Object.values(Capability);
    
    return config.map((actuatorDef, index) => {
      if (!actuatorDef.capability || !validCapabilities.includes(actuatorDef.capability)) {
        this.notify?.('status:virtual', { message: `Invalid capability for actuator ${index}, using linear`, type: 'error' });
        return { capability: Capability.LINEAR, name: `Actuator ${index}` };
      }
      
      return {
        capability: actuatorDef.capability,
        name: actuatorDef.name || `${actuatorDef.capability} ${index}`,
        stepCount: actuatorDef.stepCount || 20,
        featureDescriptor: actuatorDef.featureDescriptor || `Virtual ${actuatorDef.capability}`
      };
    });
  }

  /**
   * Reconstruit messageAttributes selon la config actuelle
   * @private
   */
  _rebuildMessageAttributes() {
    this.messageAttributes = {};
    
    // Grouper par type de commande
    const scalarCmds = [];
    const linearCmds = [];
    const rotateCmds = [];
    
    this.actuatorConfig.forEach((actuator, index) => {
      const baseAttrs = {
        Index: index,
        StepCount: actuator.stepCount || 20,
        FeatureDescriptor: actuator.featureDescriptor || actuator.name
      };
      
      switch (actuator.capability) {
        case Capability.VIBRATE:
          scalarCmds.push({ ...baseAttrs, ActuatorType: 'Vibrate' });
          break;
        case Capability.OSCILLATE:
          scalarCmds.push({ ...baseAttrs, ActuatorType: 'Oscillate' });
          break;
        case Capability.LINEAR:
          linearCmds.push(baseAttrs);
          break;
        case Capability.ROTATE:
          rotateCmds.push(baseAttrs);
          break;
      }
    });
    
    // Construire messageAttributes
    if (scalarCmds.length > 0) {
      this.messageAttributes['ScalarCmd'] = scalarCmds;
    }
    if (linearCmds.length > 0) {
      this.messageAttributes['LinearCmd'] = linearCmds;
    }
    if (rotateCmds.length > 0) {
      this.messageAttributes['RotateCmd'] = rotateCmds;
    }
    
    // StopDeviceCmd toujours présent
    this.messageAttributes['StopDeviceCmd'] = {};

    this.notify?.('status:virtual', { message: `MessageAttributes rebuilt: ${Object.keys(this.messageAttributes).join(', ')}`, type: 'log' });
  }

  // ============================================================================
  // SECTION 2: API DEVICE (compatible ButtplugClientDevice)
  // ============================================================================

  async vibrate(values) {
    this._countCommand('ScalarCmd', 'Vibrate', values);
    return Promise.resolve();
  }

  async oscillate(values) {
    this._countCommand('ScalarCmd', 'Oscillate', values);
    return Promise.resolve();
  }

  async linear(values) {
    this._countCommand('LinearCmd', null, values);
    return Promise.resolve();
  }

  async rotate(values) {
    this._countCommand('RotateCmd', null, values);
    return Promise.resolve();
  }

  async stop() {
    this._countCommand('StopDeviceCmd');
    return Promise.resolve();
  }

  getAllowedMessages() {
    return Object.keys(this.messageAttributes);
  }

  // ============================================================================
  // SECTION 3: COMPTAGE INTELLIGENT
  // ============================================================================

  /**
   * Compte les commandes par actuateur intelligent
   * @private
   */
  _countCommand(messageType, actuatorType = null, values = null) {
    this.commandCounts.total++;
    this.commandCounts.lastCommand = messageType;
    this.commandCounts.lastCommandTime = Date.now();
    
    // Identifier les actuateurs affectés
    const affectedActuators = this._getAffectedActuators(messageType, actuatorType, values);
    
    affectedActuators.forEach(actuatorIndex => {
      if (!this.commandCounts.byActuator.has(actuatorIndex)) {
        this.commandCounts.byActuator.set(actuatorIndex, 0);
      }
      this.commandCounts.byActuator.set(
        actuatorIndex, 
        this.commandCounts.byActuator.get(actuatorIndex) + 1
      );
    });
  }

  /**
   * Détermine quels actuateurs sont affectés par une commande
   * @private
   */
  _getAffectedActuators(messageType, actuatorType, values) {
    const affected = [];
    
    if (messageType === 'StopDeviceCmd') {
      // Stop affecte tous les actuateurs
      return this.actuatorConfig.map((_, index) => index);
    }
    
    // Pour les autres commandes, identifier par capability
    this.actuatorConfig.forEach((actuator, index) => {
      let isAffected = false;
      
      if (messageType === 'ScalarCmd' && actuatorType) {
        isAffected = (actuatorType === 'Vibrate' && actuator.capability === Capability.VIBRATE) ||
                    (actuatorType === 'Oscillate' && actuator.capability === Capability.OSCILLATE);
      } else if (messageType === 'LinearCmd') {
        isAffected = actuator.capability === Capability.LINEAR;
      } else if (messageType === 'RotateCmd') {
        isAffected = actuator.capability === Capability.ROTATE;
      }
      
      if (isAffected) {
        affected.push(index);
      }
    });
    
    return affected;
  }

  _resetCommandCounts() {
    this.commandCounts = {
      total: 0,
      byActuator: new Map(),
      lastCommand: null,
      lastCommandTime: null
    };

    this.notify?.('status:virtual', { message: 'Command counts reset', type: 'log' });
  }

  // ============================================================================
  // SECTION 4: API PUBLIQUE - Configuration et Stats
  // ============================================================================

  /**
   * Récupère la configuration actuelle
   */
  getConfig() {
    return {
      actuatorCount: this.actuatorConfig.length,
      actuators: this.actuatorConfig.map((actuator, index) => ({
        index,
        capability: actuator.capability,
        name: actuator.name
      })),
      presets: this.getAvailablePresets()
    };
  }

  /**
   * Récupère les presets disponibles
   */
  getAvailablePresets() {
    return ['default', 'simple', 'stroker', 'multi-vibe', 'full-featured', 'rotator'];
  }

  /**
   * Ajoute un actuateur à la config existante
   */
  addActuator(capability, name = null) {
    const newActuator = {
      capability,
      name: name || `${capability} ${this.actuatorConfig.length}`,
      stepCount: 20,
      featureDescriptor: `Virtual ${capability}`
    };
    
    this.actuatorConfig.push(newActuator);
    this._rebuildMessageAttributes();
    
    this.notify?.('status:virtual', { message: `Added ${capability} actuator`, type: 'success' });
    
    // Notifier le changement
    this.notify?.('buttplug:device', { 
      device: this,
      actuatorAdded: true,
      newActuator
    });
    
    return true;
  }

  /**
   * Supprime un actuateur par index
   */
  removeActuator(index) {
    if (index < 0 || index >= this.actuatorConfig.length) {
      this.notify?.('status:virtual', { message: `Invalid actuator index ${index}`, type: 'error' });
      return false;
    }
    
    const removed = this.actuatorConfig.splice(index, 1)[0];
    this._rebuildMessageAttributes();
    this._resetCommandCounts();
    
    this.notify?.('status:virtual', { message: `Removed actuator ${index} (${removed.capability})`, type: 'success' });
    
    // Notifier le changement
    this.notify?.('buttplug:device', { 
      device: this,
      actuatorRemoved: true,
      removedActuator: removed
    });
    
    return true;
  }

  /**
   * Stats détaillées
   */
  getCommandStats() {
    const byActuator = {};
    this.commandCounts.byActuator.forEach((count, index) => {
      const actuator = this.actuatorConfig[index];
      byActuator[index] = {
        count,
        capability: actuator?.capability || 'unknown',
        name: actuator?.name || `Actuator ${index}`
      };
    });
    
    return {
      total: this.commandCounts.total,
      byActuator,
      lastCommand: this.commandCounts.lastCommand,
      lastCommandTime: this.commandCounts.lastCommandTime,
      actuatorCount: this.actuatorConfig.length
    };
  }

  resetCommandStats() {
    this._resetCommandCounts();
    this.notify?.('status:virtual', { message: 'Command stats reset', type: 'info' });
  }

  /**
   * Debug info complète
   */
  getDebugInfo() {
    const debugInfo = {
      config: this.getConfig(),
      stats: this.getCommandStats(),
      messageAttributes: this.messageAttributes,
      name: this.name,
      index: this.index
    };

    this.notify?.('status:virtual', { message: 'Debug info requested', type: 'log' });
    
    return debugInfo;
  }
}

export default VirtualDevice;