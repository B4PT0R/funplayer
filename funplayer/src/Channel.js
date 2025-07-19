/**
 * Channel.js - ✅ AMÉLIORÉ: Ajout likely_capability pour optimiser autoMap
 * 
 * RESPONSABILITÉS:
 * - Classe Channel avec parsing et normalisation des actions
 * - Interpolation optimisée avec cache pour performance
 * - Validation stricte des données et configuration
 * - Système de branchement bidirectionnel avec actuateurs + notify
 * - ✅ NOUVEAU: Calcul de likely_capability au parsing pour éviter duplication dans autoMap
 */

import { HapticType, Capability } from './constants';

// ============================================================================
// CLASSE CHANNEL
// ============================================================================

export class Channel {
  constructor(name, rawActions, fieldConfig = {}, metadata = {}, notify = null) {
    // Validation de base
    if (!name || typeof name !== 'string') {
      throw new Error('Channel name must be a non-empty string');
    }
    
    // Propriétés de base
    this.name = name;
    this.metadata = metadata;
    
    // Notification system
    this.notify = notify;
    
    // Configuration des champs à extraire
    this.fieldConfig = {
      timeField: 'at',           // Champ temps par défaut
      valueField: 'pos',         // Champ valeur par défaut
      directionField: null,      // Champ direction optionnel (pour rotation)
      durationField: null,       // Champ durée optionnel (pour linear)
      ...fieldConfig
    };
    
    // Validation configuration
    if (!this.fieldConfig.timeField || !this.fieldConfig.valueField) {
      throw new Error(`Channel "${name}": timeField and valueField must be specified`);
    }
    
    // Cache d'interpolation
    this.interpolationCache = {
      leftIndex: 0,
      rightIndex: 1,
      lastTime: -1
    };
    this.seekThreshold = 1000; // ms
    
    // Actuateurs connectés indexés par leur index
    this.connectedActuators = new Map(); // Map<actuatorIndex, actuatorInstance>
    
    this.notify?.('status:channel', { message: `Creating channel "${name}"...`, type: 'log' });
    
    // Traitement des actions (peut lever des erreurs)
    this.actions = this._processActions(rawActions);
    
    // ✅ NOUVEAU: Calcul de likely_capability AVANT type (pour pouvoir influencer le type si besoin)
    this.likelyCapability = this._determineLikelyCapability();
    
    this.type = this._determineType();
    this.duration = this._calculateDuration();
    this.averageIntervalMs=this.actions.length > 1 ? (this.duration * 1000) / (this.actions.length - 1) : 100;
    this.valueRange = this._calculateValueRange();

    this.notify?.('status:channel', { message: `Channel "${name}" created: ${this.type} type, likely_capability: ${this.likelyCapability}, ${this.actions.length} actions, ${this.duration.toFixed(2)}s`, type: 'success' });
  }

  // ============================================================================
  // ✅ NOUVEAU: DÉTERMINATION LIKELY_CAPABILITY
  // ============================================================================

  /**
   * Détermine la capability la plus probable pour ce canal
   * Combine analyse du nom + fieldConfig + données
   */
  _determineLikelyCapability() {
    // 1. Priorité 1: Capability explicite dans metadata
    if (this.metadata.capability) {
      this.notify?.('status:channel', { message: `Channel "${this.name}": Using explicit capability from metadata: ${this.metadata.capability}`, type: 'log' });
      return this.metadata.capability;
    }

    // 2. Priorité 2: Analyse heuristique combinée
    const heuristicResult = this._heuristicCapabilityAnalysis();
    
    // 3. Priorité 3: Validation avec fieldConfig et données
    const validatedResult = this._validateCapabilityWithContext(heuristicResult);
    
    this.notify?.('status:channel', { message: `Channel "${this.name}": Likely capability determined as "${validatedResult}" (from heuristic: "${heuristicResult}")`, type: 'log' });
    
    return validatedResult;
  }

  /**
   * Analyse heuristique du nom du canal pour déterminer la capability
   */
  _heuristicCapabilityAnalysis() {
    const nameLower = this.name.toLowerCase();
    
    // Patterns de détection par nom avec ordre de priorité
    const patterns = [
      { capability: Capability.ROTATE, regex: /^(rot|rotat|twist|spin|turn|roll|angle|pitch|yaw)$/i },
      { capability: Capability.LINEAR, regex: /^(pos|position|stroke|linear|up|down|vertical|y)$/i },
      { capability: Capability.OSCILLATE, regex: /^(osc|oscill|swing|wave|sway)$/i },
      { capability: Capability.VIBRATE, regex: /^(vib|vibr|vibrat|buzz|rumble|shake)$/i },
      
      // Patterns étendus pour types non-officiels → mappés vers capabilities officielles
      { capability: Capability.VIBRATE, regex: /^(squeeze|constrict|pressure|grip|clamp)$/i },
      { capability: Capability.VIBRATE, regex: /^(suck|suction|vacuum|pump)$/i }
    ];
    
    // Test des patterns dans l'ordre
    for (const { capability, regex } of patterns) {
      if (regex.test(nameLower)) {
        this.notify?.('status:channel', { message: `Channel "${this.name}": Pattern match for ${capability}`, type: 'log' });
        return capability;
      }
    }
    
    // Fallback: analyse par fieldConfig si pas de match par nom
    return this._inferCapabilityFromFieldConfig();
  }

  /**
   * Inférence de capability basée sur la structure du fieldConfig
   */
  _inferCapabilityFromFieldConfig() {
    // Si directionField configuré → suggère rotate
    if (this.fieldConfig.directionField) {
      this.notify?.('status:channel', { message: `Channel "${this.name}": Direction field detected, suggesting rotate`, type: 'log' });
      return Capability.ROTATE;
    }
    
    // Si durationField configuré → suggère linear
    if (this.fieldConfig.durationField) {
      this.notify?.('status:channel', { message: `Channel "${this.name}": Duration field detected, suggesting linear`, type: 'log' });
      return Capability.LINEAR;
    }
    
    // Analyse du nom du valueField pour indices supplémentaires
    const valueField = this.fieldConfig.valueField.toLowerCase();
    if (valueField.includes('speed') || valueField.includes('spd')) {
      this.notify?.('status:channel', { message: `Channel "${this.name}": Speed field detected, suggesting rotate`, type: 'log' });
      return Capability.ROTATE;
    }
    
    if (valueField.includes('pos') || valueField.includes('position')) {
      this.notify?.('status:channel', { message: `Channel "${this.name}": Position field detected, suggesting linear`, type: 'log' });
      return Capability.LINEAR;
    }
    
    // Fallback ultime
    this.notify?.('status:channel', { message: `Channel "${this.name}": No clear indicators, defaulting to linear`, type: 'log' });
    return Capability.LINEAR;
  }

  /**
   * Validation de la capability avec le contexte (détection des downgrades)
   */
  _validateCapabilityWithContext(heuristicCapability) {
    const hasNegativeValues = this.actions.some(a => a.value < 0);
    const hasDirectionField = !!this.fieldConfig.directionField;
    
    // Cas spécial: rotate détecté mais pas de rotation effective → downgrade vers linear
    if (heuristicCapability === Capability.ROTATE) {
      // Si pas de directionField ET pas de valeurs signées → vraiment downgradé
      if (!hasDirectionField && !hasNegativeValues) {
        this.notify?.('status:channel', { message: `Channel "${this.name}": Rotate detected but no rotation data, downgrading to linear`, type: 'warning' });
        return Capability.LINEAR;
      }
    }
    
    // Cas spécial: linear détecté mais a un directionField → upgrade vers rotate
    if (heuristicCapability === Capability.LINEAR && hasDirectionField) {
      this.notify?.('status:channel', { message: `Channel "${this.name}": Linear detected but has direction field, upgrading to rotate`, type: 'log' });
      return Capability.ROTATE;
    }
    
    // Pas de modification nécessaire
    return heuristicCapability;
  }

  // ============================================================================
  // SYSTÈME DE BRANCHEMENT AVEC NOTIFY
  // ============================================================================

  /**
   * Branche un actuateur à ce canal
   */
  plug(actuator) {
    if (!this.canPlugTo(actuator)) {
      this.notify?.('status:channel', { message: `Cannot plug actuator ${actuator.index} to channel "${this.name}" (incompatible: ${actuator.type} vs ${this.type})`, type: 'error' });
      return false;
    }
    
    // Déconnecter l'actuateur de son canal précédent si besoin
    if (actuator.assignedChannel && actuator.assignedChannel !== this) {
      actuator.assignedChannel.unplug(actuator);
    }
    
    // Brancher
    this.connectedActuators.set(actuator.index, actuator);
    actuator.assignedChannel = this;
    actuator.previousMappedChannel=this.name
    
    this.notify?.('status:channel', { message: `Channel "${this.name}" plugged to actuator ${actuator.index} (${actuator.capability})`, type: 'success' });
    
    this.notify?.('channel:plugged', {
      channelName: this.name,
      actuatorIndex: actuator.index,
      actuator: {
        index: actuator.index,
        type: actuator.type,
        capability: actuator.capability
      },
      connectedCount: this.connectedActuators.size
    });
    
    return true;
  }

  /**
   * Débranche un actuateur de ce canal
   */
  unplug(actuator) {
    if (this.connectedActuators.get(actuator.index) === actuator) {
      this.connectedActuators.delete(actuator.index);
      
      if (actuator.assignedChannel === this) {
        actuator.assignedChannel = null;
      }
      
      this.notify?.('status:channel', { message: `Channel "${this.name}" unplugged from actuator ${actuator.index}`, type: 'info' });
      
      this.notify?.('channel:unplugged', {
        channelName: this.name,
        actuatorIndex: actuator.index,
        actuator: {
          index: actuator.index,
          type: actuator.type,
          capability: actuator.capability
        },
        connectedCount: this.connectedActuators.size
      });
    } else {
      this.notify?.('status:channel', { message: `Actuator ${actuator.index} was not connected to channel "${this.name}"`, type: 'warning' });
    }
  }

  /**
   * Débranche tous les actuateurs
   */
  unplugAll() {
    const actuatorsToUnplug = Array.from(this.connectedActuators.values());
    actuatorsToUnplug.forEach(actuator => this.unplug(actuator));
  }

  /**
   * Vérifie si un actuateur peut être branché à ce canal
   */
  canPlugTo(actuator) {
    return actuator.settings.enabled && this.type === actuator.type;
  }

  /**
   * Retourne la liste des actuateurs connectés
   */
  getConnectedActuators() {
    return Array.from(this.connectedActuators.values());
  }

  // ============================================================================
  // GETTERS ET API PUBLIQUE
  // ============================================================================

  /**
   * ✅ NOUVEAU: Getter pour likely_capability
   */
  getLikelyCapability() {
    return this.likelyCapability;
  }

  /**
   * Retourne les métadonnées du canal
   */
  getMetadata() {
    return { ...this.metadata };
  }

  /**
   * Vérifie si le canal a des actions
   */
  hasActions() {
    return this.actions.length > 0;
  }

  /**
   * Retourne le nombre d'actions
   */
  getActionCount() {
    return this.actions.length;
  }

  // ============================================================================
  // TRAITEMENT DES ACTIONS
  // ============================================================================

  _processActions(rawActions) {
    if (!Array.isArray(rawActions) || rawActions.length === 0) {
      this.notify?.('status:channel', { message: `Channel "${this.name}": No actions provided`, type: 'error' });
      return [];
    }

    this.notify?.('status:channel', { message: `Channel "${this.name}": Processing ${rawActions.length} raw actions...`, type: 'log' });

    const { timeField, valueField, directionField } = this.fieldConfig;
    const validActions = [];

    for (const [index, action] of rawActions.entries()) {
      const time = action[timeField];
      let value = action[valueField];
      
      // ✅ AMÉLIORÉ: Gestion direction avec fallback gracieux
      if (directionField && action[directionField] !== undefined) {
        const direction = action[directionField];
        const magnitude = Math.abs(value); // Force absolute pour magnitude
        
        // Si valeur était négative + directionField → warning + correction
        if (value < 0) {
          this.notify?.('status:channel', { message: `Channel "${this.name}": Negative value with direction field, applying Math.abs()`, type: 'warning' });
        }
        
        // Conversion direction → signe
        if (typeof direction === 'boolean') {
          value = direction ? magnitude : -magnitude;
        } else if (typeof direction === 'string') {
          const isPositive = ['cw', 'clockwise', 'right', 'positive','+','true','1']
            .includes(direction.toLowerCase());
          value = isPositive ? magnitude : -magnitude;
        } else if (typeof direction === 'number') {
          value = direction >= 0 ? magnitude : -magnitude;
        } else {
          this.notify?.('status:channel', { message: `Channel "${this.name}": Invalid direction "${direction}", using absolute value`, type: 'warning' });
          value = magnitude;
        }
      }
      
      // Validation et ajout
      if (typeof time === 'number' && typeof value === 'number') {
        // Préserver métadonnées
        const actionMetadata = { ...action };
        delete actionMetadata[timeField];
        delete actionMetadata[valueField];
        if (directionField) delete actionMetadata[directionField];
        
        validActions.push({ time, value, metadata: actionMetadata });
      } else {
        this.notify?.('status:channel', { message: `Channel "${this.name}": Invalid action at index ${index} (time: ${typeof time}, value: ${typeof value})`, type: 'log' });
      }
    }

    if (validActions.length === 0) {
      this.notify?.('status:channel', { message: `Channel "${this.name}": No valid actions found. Check "${timeField}" and "${valueField}" fields`, type: 'error' });
      throw new Error(
        `Channel "${this.name}": No valid actions. Check "${timeField}" and "${valueField}" fields.`
      );
    }

    // Tri et normalisation
    validActions.sort((a, b) => a.time - b.time);
    
    const maxAbsValue = Math.max(...validActions.map(a => Math.abs(a.value)));
    const normFactor = maxAbsValue > 0 ? (1 / maxAbsValue) : 1;

    this.notify?.('status:channel', { message: `Channel "${this.name}": ${validActions.length} valid actions, normalization factor: ${normFactor.toFixed(3)}`, type: 'log' });

    return validActions.map(({ time, value, metadata }) => ({
      time,
      value: value * normFactor,
      metadata
    }));
  }

  _determineType() {
    if (this.actions.length === 0) return HapticType.SCALAR;
    
    // Si directionField configuré → forcément polaire
    if (this.fieldConfig.directionField) {
      this.notify?.('status:channel', { message: `Channel "${this.name}": Type determined as POLAR (has direction field)`, type: 'log' });
      return HapticType.POLAR;
    }
    
    // Sinon détecter par valeurs négatives
    const hasNegative = this.actions.some(a => a.value < 0);
    const type = hasNegative ? HapticType.POLAR : HapticType.SCALAR;
    
    this.notify?.('status:channel', { message: `Channel "${this.name}": Type determined as ${type} (${hasNegative ? 'has negative values' : 'all positive values'})`, type: 'log' });
    
    return type;
  }

  _calculateDuration() {
    const duration = this.actions.length > 0 ? this.actions[this.actions.length - 1].time / 1000 : 0;
    this.notify?.('status:channel', { message: `Channel "${this.name}": Duration calculated as ${duration.toFixed(2)}s`, type: 'log' });
    return duration;
  }

  _calculateValueRange() {
    if (this.actions.length === 0) return [0, 0];
    const values = this.actions.map(a => a.value);
    const range = [Math.min(...values), Math.max(...values)];
    this.notify?.('status:channel', { message: `Channel "${this.name}": Value range: [${range[0].toFixed(3)}, ${range[1].toFixed(3)}]`, type: 'log' });
    return range;
  }

  // ============================================================================
  // INTERPOLATION OPTIMISÉE
  // ============================================================================

  interpolateAt(time) {
    if (this.actions.length === 0) {
      return 0;
    }

    const timeMs = time * 1000;

    // Gestion cas limites
    if (timeMs <= this.actions[0].time) {
      return 0;
    }
    if (timeMs >= this.actions[this.actions.length - 1].time) {
      return 0;
    }

    // Optimisation du cache pour éviter les recherches
    const { leftIndex, rightIndex, lastTime } = this.interpolationCache;
    
    if  (timeMs < this.actions[leftIndex].time || 
        timeMs >= this.actions[rightIndex].time) {
      this._updateInterpolationCache(timeMs);
    }

    const left = this.actions[this.interpolationCache.leftIndex];
    const right = this.actions[this.interpolationCache.rightIndex];
    
    // Interpolation linéaire
    const factor = (timeMs - left.time) / (right.time - left.time);
    const result = left.value + factor * (right.value - left.value);
    
    this.interpolationCache.lastTime = timeMs;
    return result;
  }

_updateInterpolationCache(timeMs) {
  const { leftIndex: currentLeft, rightIndex: currentRight, lastTime } = this.interpolationCache;
  
  // 1. Si on a un cache valide et qu'on est proche temporellement
  if (lastTime >= 0 && Math.abs(timeMs - lastTime) <= this.seekThreshold) {
    
    // Essayer le glissement incrémental optimisé
    if (this._tryIncrementalSlide(timeMs)) {
      return; // Succès ! Pas besoin de recherche dichotomique
    }
  }
  
  // 2. Fallback : recherche dichotomique complète (cas de seek lointain)
  this._performBinarySearch(timeMs);
}

/**
 * ✅ NOUVEAU: Glissement incrémental des bornes du cache
 * Retourne true si l'encadrement a pu être rétabli, false sinon
 */
_tryIncrementalSlide(timeMs) {
  let { leftIndex, rightIndex } = this.interpolationCache;
  const maxSlideSteps = this.seekThreshold/this.averageIntervalMs;
  let steps = 0;
  
  // Glissement vers la gauche (timeMs < actions[leftIndex].time)
  while (timeMs < this.actions[leftIndex]?.time && leftIndex > 0 && steps < maxSlideSteps) {
    leftIndex--;
    rightIndex--;
    steps++;
  }
  
  // Glissement vers la droite (timeMs > actions[rightIndex].time)  
  while (timeMs >= this.actions[rightIndex]?.time && rightIndex < this.actions.length - 1 && steps < maxSlideSteps) {
    leftIndex++;
    rightIndex++;
    steps++;
  }
  
  // Vérifier que l'encadrement est correct
  const isValid = leftIndex >= 0 && 
                  rightIndex < this.actions.length &&
                  leftIndex < rightIndex &&
                  timeMs >= this.actions[leftIndex].time &&
                  timeMs < this.actions[rightIndex].time;
  
  if (isValid) {
    // Succès : mettre à jour le cache
    this.interpolationCache.leftIndex = leftIndex;
    this.interpolationCache.rightIndex = rightIndex;
    return true;
  }
  
  return false; // Échec, fallback vers recherche dichotomique
}

/**
 * ✅ OPTIMISÉ: Recherche dichotomique avec bornes intelligentes
 * Exploite la position actuelle du cache pour réduire l'espace de recherche
 */
_performBinarySearch(timeMs) {
  const { leftIndex: currentLeft, rightIndex: currentRight } = this.interpolationCache;
  let leftBound, rightBound;
  
  // Déterminer l'espace de recherche optimal selon la position de timeMs
  if (timeMs < this.actions[currentLeft]?.time) {
    // timeMs est avant la fenêtre actuelle → chercher dans [0, currentLeft]
    leftBound = 0;
    rightBound = currentLeft;
  } else if (timeMs > this.actions[currentRight]?.time) {
    // timeMs est après la fenêtre actuelle → chercher dans [currentRight, end]
    leftBound = currentRight;
    rightBound = this.actions.length - 1;
  } else {
    // timeMs est dans la fenêtre actuelle → resserrer directement l'intervalle
    leftBound = currentLeft;
    rightBound = currentRight;
  }
  
  // Recherche dichotomique dans l'espace restreint
  let leftIndex = leftBound;
  let rightIndex = rightBound;
  
  while (rightIndex - leftIndex > 1) {
    const mid = Math.floor((leftIndex + rightIndex) / 2);
    if (this.actions[mid].time <= timeMs) {
      leftIndex = mid;
    } else {
      rightIndex = mid;
    }
  }
  
  this.interpolationCache.leftIndex = leftIndex;
  this.interpolationCache.rightIndex = rightIndex;
}

  // ============================================================================
  // DEBUG ET UTILITAIRES
  // ============================================================================

  /**
   * ✅ AMÉLIORÉ: Informations de debug avec likely_capability
   */
  getDebugInfo() {
    const debugInfo = {
      name: this.name,
      type: this.type,
      likelyCapability: this.likelyCapability, // ✅ NOUVEAU
      duration: this.duration,
      actionCount: this.actions.length,
      valueRange: this.valueRange,
      fieldConfig: { ...this.fieldConfig },
      metadata: { ...this.metadata },
      connectedActuators: Object.fromEntries(
        Array.from(this.connectedActuators.entries()).map(([idx, actuator]) => [
          idx, { index: actuator.index, type: actuator.type, enabled: actuator.settings.enabled }
        ])
      ),
      sampleActions: this.actions.slice(0, 3).map(a => ({
        ...a,
        metadata: a.metadata ? a.metadata : undefined
      })),
      cache: { ...this.interpolationCache }
    };
    return debugInfo;
  }

  toString() {
    const fieldInfo = `${this.fieldConfig.valueField}${
      this.fieldConfig.directionField ? '+' + this.fieldConfig.directionField : ''
    }`;
    const connectedCount = this.connectedActuators.size;
    return `Channel[${this.name}](${this.type}/${this.likelyCapability}, ${fieldInfo}, ${this.actions.length} actions, ${this.duration.toFixed(2)}s, ${connectedCount} actuators)`;
  }
}

export default Channel;