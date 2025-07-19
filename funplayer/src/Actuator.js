/**
 * Actuator.js - ✅ AMÉLIORÉ: Persistance mapping avec previousMappedChannel
 */

import { HapticType, Capability, CapabilityToHapticType } from "./constants";

// ============================================================================
// CLASSE ACTUATOR
// ============================================================================

export class Actuator {
  constructor(index, capability, options = {}, notify = null) {
    // Propriétés de base
    this.index = index;
    this.type = CapabilityToHapticType[capability];
    this.capability = capability;
    
    // Notification system
    this.notify = notify;
    
    // Settings par défaut
    this.settings = {
      enabled: true,
      scale: 1.0,
      invert: false,
      timeOffset: 0.0,
      range: [0, 1], // [min, max] pour clamp final
      ...options.settings
    };
    
    // Canal assigné (référence vers instance Channel)
    this.assignedChannel = null;
    
    // ✅ NOUVEAU: Persistance du mapping précédent pour autoMap intelligent
    this.previousMappedChannel = null; // String: nom du canal mappé précédemment
    
    // Métadonnées optionnelles
    this.metadata = {
      name: `Actuator ${index}`,
      featureDescriptor: '',
      stepCount: 20,
      ...options.metadata
    };

    this.notify?.('status:actuator', { message: `Actuator ${index} (${capability}) initialized`, type: 'log' });
  }

  // ============================================================================
  // SYSTÈME DE BRANCHEMENT AVEC NOTIFY + PERSISTANCE MAPPING
  // ============================================================================

  /**
   * Branche cet actuateur à un canal
   */
  plug(channel) {
    const success = channel.plug(this); // Déléguer au canal qui gère la logique
    
    if (success) {
      // ✅ NOUVEAU: Sauvegarder le nom du canal pour autoMap futur
      this.previousMappedChannel = channel.name;
      
      this.notify?.('status:actuator', { message: `Actuator ${this.index} plugged to channel "${channel.name}"`, type: 'success' });
      this.notify?.('actuator:plugged', {
        actuatorIndex: this.index,
        channelName: channel.name,
        channel: {
          name: channel.name,
          type: channel.type,
          duration: channel.duration
        },
        actuator: {
          index: this.index,
          type: this.type,
          capability: this.capability
        }
      });
    } else {
      this.notify?.('status:actuator', { message: `Failed to plug actuator ${this.index} to channel "${channel.name}" (incompatible)`, type: 'error' });
    }
    
    return success;
  }

  /**
   * Débranche cet actuateur de son canal actuel
   */
  unplug() {
    if (this.assignedChannel) {
      const channelName = this.assignedChannel.name;
      
      // ✅ NOUVEAU: Conserver previousMappedChannel même après unplug
      // (ça permet de retrouver le mapping au prochain funscript)
      if (!this.previousMappedChannel) {
        this.previousMappedChannel = channelName;
      }
      
      this.assignedChannel.unplug(this);
      
      this.notify?.('status:actuator', { message: `Actuator ${this.index} unplugged from channel "${channelName}"`, type: 'info' });
      this.notify?.('actuator:unplugged', {
        actuatorIndex: this.index,
        channelName: channelName,
        actuator: {
          index: this.index,
          type: this.type,
          capability: this.capability
        }
      });
    } else {
      this.notify?.('status:actuator', { message: `Actuator ${this.index} was not plugged to any channel`, type: 'info' });
    }
  }

  /**
   * ✅ NOUVEAU: Force l'oubli du mapping précédent (reset manuel)
   */
  forgetPreviousMapping() {
    const oldMapping = this.previousMappedChannel;
    this.previousMappedChannel = null;
    
    this.notify?.('status:actuator', { message: `Actuator ${this.index} forgot previous mapping to "${oldMapping}"`, type: 'info' });
    
    this.notify?.('actuator:mappingForgotten', {
      actuatorIndex: this.index,
      forgottenChannelName: oldMapping,
      actuator: {
        index: this.index,
        type: this.type,
        capability: this.capability
      }
    });
  }

  /**
   * Vérifie si cet actuateur peut être branché à un canal
   */
  canPlugTo(channel) {
    const compatible = this.settings.enabled && this.type === channel.type;
    if (!compatible) {
      this.notify?.('status:actuator', { message: `Actuator ${this.index} incompatible with channel "${channel.name}" (${this.type} vs ${channel.type})`, type: 'log' });
    }
    return compatible;
  }

  /**
   * Récupère le nom du canal assigné
   */
  getAssignedChannelName() {
    return this.assignedChannel ? this.assignedChannel.name : null;
  }

  /**
   * ✅ NOUVEAU: Récupère le nom du canal mappé précédemment
   */
  getPreviousMappedChannelName() {
    return this.previousMappedChannel;
  }

  /**
   * ✅ NOUVEAU: Vérifie si l'actuateur a un mapping précédent
   */
  hasPreviousMapping() {
    return this.previousMappedChannel !== null;
  }

  /**
   * Vérifie si l'actuateur est branché à un canal
   */
  isPlugged() {
    return this.assignedChannel !== null;
  }

  // ============================================================================
  // CONFIGURATION ET ÉTAT AVEC NOTIFY
  // ============================================================================

  /**
   * Met à jour les settings avec notification
   */
  updateSettings(newSettings) {
    const oldSettings = { ...this.settings };
    this.settings = { ...this.settings, ...newSettings };
    
    const changedKeys = Object.keys(newSettings);
    this.notify?.('status:actuator', { message: `Actuator ${this.index} settings updated: ${changedKeys.join(', ')}`, type: 'log' });
    
    this.notify?.('actuator:settingsChanged', {
      actuatorIndex: this.index,
      oldSettings,
      newSettings: { ...this.settings },
      changes: changedKeys,
      actuator: {
        index: this.index,
        type: this.type,
        capability: this.capability,
        channelName: this.getAssignedChannelName()
      }
    });
  }

  /**
   * Reset des settings par défaut avec notification
   */
  resetSettings() {
    const oldSettings = { ...this.settings };
    
    this.settings = {
      enabled: true,
      scale: 1.0,
      invert: false,
      timeOffset: 0.0,
      range: [0, 1]
    };
    
    this.notify?.('status:actuator', { message: `Actuator ${this.index} settings reset to defaults`, type: 'info' });
    
    this.notify?.('actuator:settingsReset', {
      actuatorIndex: this.index,
      oldSettings,
      newSettings: { ...this.settings },
      actuator: {
        index: this.index,
        type: this.type,
        capability: this.capability,
        channelName: this.getAssignedChannelName()
      }
    });
  }

  // ============================================================================
  // COMPATIBILITÉ
  // ============================================================================

  /**
   * Vérifie si cet actuateur est compatible avec un canal
   */
  isCompatibleWith(channel) {
    return this.type === channel.type;
  }

  /**
   * Vérifie si cet actuateur peut traiter un canal spécifique
   */
  canProcess(channel) {
    if (!this.settings.enabled) {
      this.notify?.('status:actuator', { message: `Actuator ${this.index} cannot process: disabled`, type: 'log' });
      return false;
    }
    if (this.assignedChannel && this.assignedChannel !== channel) {
      this.notify?.('status:actuator', { message: `Actuator ${this.index} cannot process: assigned to different channel`, type: 'log' });
      return false;
    }
    
    return this.isCompatibleWith(channel);
  }

  // ============================================================================
  // TRAITEMENT DES VALEURS
  // ============================================================================

  /**
   * Calcule la valeur de sortie finale à partir de la valeur brute interpolée
   */
  processValue(rawValue, globalScale = 1.0) {
    if (!this.settings.enabled || rawValue === null || rawValue === undefined) {
      return 0;
    }

    let value = rawValue;
    
    // 1. Appliquer invert si demandé
    if (this.settings.invert) {
      if (this.type === HapticType.POLAR) {
        value = -value; // Inverser le signe pour polaire
      } else {
        value = 1 - value; // Inverser pour scalaire
      }
    }
    
    // 2. Appliquer l'échelle individuelle
    value *= this.settings.scale;
    
    // 3. Appliquer l'échelle globale
    value *= globalScale;
    
    // 4. Clamp selon le type et la plage
    const [minRange, maxRange] = this.settings.range;
    
    if (this.type === HapticType.POLAR) {
      // Pour polaire : maintenir le signe, clamp l'amplitude
      const amplitude = Math.abs(value);
      const clampedAmplitude = Math.max(0, Math.min(1, amplitude));
      value = Math.sign(value) * clampedAmplitude;
    } else {
      // Pour scalaire : clamp direct
      value = Math.max(0, Math.min(1, value));
    }
    
    return value;
  }

  /**
   * Génère l'objet de commande pour le device
   */
  generateCommand(processedValue, options = {}) {
    if (!this.settings.enabled || processedValue === 0) {
      return {
        capability: this.capability,
        value: 0,
        options: {}
      };
    }

    const command = {
      capability: this.capability,
      value: processedValue,
      options: {}
    };

    // Options spécifiques par capability
    switch (this.capability) {
      case Capability.LINEAR:
        command.options.duration = options.duration || 100;
        break;
        
      case Capability.ROTATE:
        // Pour rotate, convertir en speed + direction
        command.value = Math.abs(processedValue);
        command.options.clockwise = processedValue >= 0;
        break;
        
      case Capability.VIBRATE:
      case Capability.OSCILLATE:
        // Pas d'options spéciales pour scalar
        break;
    }

    return command;
  }

  /**
   * Pipeline complet : rawValue → command
   */
  process(rawValue, globalScale = 1.0, options = {}) {
    const processedValue = this.processValue(rawValue, globalScale);
    const command = this.generateCommand(processedValue, options);    
    return command;
  }

  // ============================================================================
  // UTILITAIRES ET DEBUG
  // ============================================================================

  /**
   * ✅ AMÉLIORÉ: Export de la configuration avec previousMappedChannel
   */
  toConfig() {
    return {
      index: this.index,
      type: this.type,
      capability: this.capability,
      settings: { ...this.settings },
      assignedChannelName: this.getAssignedChannelName(),
      previousMappedChannel: this.previousMappedChannel, // ✅ NOUVEAU
      metadata: { ...this.metadata }
    };
  }

  /**
   * ✅ AMÉLIORÉ: Import de configuration avec previousMappedChannel
   */
  fromConfig(config) {
    if (config.settings) {
      const oldSettings = { ...this.settings };
      this.settings = { ...this.settings, ...config.settings };
      this.notify?.('status:actuator', { message: `Actuator ${this.index} loaded settings from config`, type: 'log' });
    }
    if (config.metadata) {
      this.metadata = { ...this.metadata, ...config.metadata };
    }
    
    // ✅ NOUVEAU: Restaurer previousMappedChannel
    if (config.previousMappedChannel) {
      this.previousMappedChannel = config.previousMappedChannel;
      this.notify?.('status:actuator', { message: `Actuator ${this.index} restored previous mapping to "${config.previousMappedChannel}"`, type: 'log' });
    }
    
    // Note: assignedChannelName ne peut pas être restauré directement, 
    // il faut rebrancher via plug()
  }

  /**
   * ✅ AMÉLIORÉ: Informations de debug avec previousMappedChannel
   */
  getDebugInfo() {
    const debugInfo = {
      index: this.index,
      type: this.type,
      capability: this.capability,
      settings: { ...this.settings },
      assignedChannel: this.assignedChannel ? {
        name: this.assignedChannel.name,
        type: this.assignedChannel.type,
        duration: this.assignedChannel.duration
      } : null,
      previousMappedChannel: this.previousMappedChannel, // ✅ NOUVEAU
      isPlugged: this.isPlugged(),
      hasPreviousMapping: this.hasPreviousMapping(), // ✅ NOUVEAU
      metadata: { ...this.metadata }
    };
    return debugInfo;
  }

  /**
   * ✅ AMÉLIORÉ: Représentation string avec info mapping précédent
   */
  toString() {
    const channel = this.getAssignedChannelName() || 'unassigned';
    const status = this.settings.enabled ? 'enabled' : 'disabled';
    const plugged = this.isPlugged() ? 'plugged' : 'unplugged';
    const previousInfo = this.previousMappedChannel ? ` (prev: ${this.previousMappedChannel})` : '';
    return `Actuator[${this.index}](${this.capability}, ${this.type}, ${status}, ${plugged} to ${channel}${previousInfo})`;
  }
}

export default Actuator;