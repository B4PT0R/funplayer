import { Channel } from './Channel';
import { HapticType } from './constants';

/**
 * FunscriptManager - ✅ SIMPLIFIÉ: Heuristique déplacée dans Channel
 * 
 * RESPONSABILITÉS SIMPLIFIÉES:
 * - Parsing funscript et extraction des champs 
 * - Configuration fieldConfig basique (sans heuristique complexe)
 * - Création des instances Channel (qui font leur propre heuristique)
 * - AutoMap optimisé utilisant channel.likelyCapability
 * - Support config utilisateur custom pour override manuel
 */
class FunscriptManager {
  constructor(notify) {
    this.notify = notify;
    
    // Données funscript
    this.data = null;
    this.channels = []; // Array<Channel> - source de vérité unique
    this.duration = 0;
    
    // Support config utilisateur custom
    this.customFieldConfig = null;
  }

  // ============================================================================
  // SECTION 1: LOADING & RESET
  // ============================================================================

  /**
   * Charge un funscript depuis URL ou objet
   */
  async loadFromSource(src) {
    try {
      this.notify?.('status:funscript', { message: 'Loading funscript from source...', type: 'processing' });

      let data;
      if (typeof src === 'string') {
        if (src.startsWith('http') || src.startsWith('/')) {
          data = await this._fetchWithCorsProxy(src);
        } else {
          data = JSON.parse(src);
        }
      } else {
        data = src;
      }
      
      return this.load(data);
      
    } catch (error) {
      this.notify?.('status:funscript', { message: 'Failed to load funscript from source', type: 'error', error: error.message });
      throw error;
    }
  }

  /**
   * Charge un funscript et extrait tous les canaux en instances Channel
   */
  load(funscriptData) {
    try {
      this.notify?.('status:funscript', { message: 'Processing funscript data...', type: 'processing' });

      this.data = typeof funscriptData === 'string' ? JSON.parse(funscriptData) : funscriptData;
      this._extractChannels();
      this._calculateDuration();
      
      this.notify?.('status:funscript', { message: `Loaded ${this.channels.length} channels, ${this.duration.toFixed(2)}s`, type: 'success' });
      this.notify?.('status:funscript', { message: `Channel extraction complete: ${this.channels.map(ch => ch.name).join(', ')}`, type: 'log' });
      
      this.notify?.('funscript:load', { 
        data: this.data, 
        channels: this.channels.map(ch => ch.name),
        channelInstances: this.channels,
        duration: this.duration
      });
      
      this.notify?.('funscript:channels', { 
        channels: this.channels.map(ch => ch.name),
        channelInstances: this.channels,
        total: this.channels.length 
      });
      
      return true;
    } catch (error) {
      this.notify?.('status:funscript', { message: 'Failed to process funscript', type: 'error', error: error.message });
      this._reset();
      return false;
    }
  }

  /**
   * Charge un funscript avec config utilisateur custom
   */
  loadWithCustomFieldConfig(funscriptData, customFieldConfig = null) {
    this.customFieldConfig = customFieldConfig;
    return this.load(funscriptData);
  }

  /**
   * Charge le funscript d'un item de playlist
   */
  async loadFromPlaylistItem(item) {
    if (!item) {
      this.reset();
      return true;
    }

    try {
      this.notify?.('status:funscript', { message: `Loading funscript for item: ${item.name || 'Untitled'}`, type: 'processing' });

      if (item.funscript) {
        if (typeof item.funscript === 'object') {
          this.load(item.funscript);
        } else {
          await this.loadFromSource(item.funscript);
        }
        this.notify?.('status:funscript', { message: `Funscript loaded for: ${item.name || 'Untitled'}`, type: 'success' });
      } else {
        this.reset();
        this.notify?.('status:funscript', { message: 'No funscript for current item', type: 'info' });
      }

      return true;

    } catch (error) {
      this.notify?.('status:funscript', { message: `Failed to load funscript from playlist item: ${error.message}`, type: 'error' });
      this.reset();
      return false;
    }
  }

  /**
   * Fetch avec proxy CORS si besoin
   */
  async _fetchWithCorsProxy(url) {
    const directError = null;
    const proxyError = null;
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      try {
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
      } catch (proxyErr) {
        throw new Error(`Failed to fetch funscript. Direct: ${directError?.message || error.message}, Proxy: ${proxyErr.message}`);
      }
    }
  }

  /**
   * Vérifie si des canaux sont chargés
   */
  hasFunscript() {
    return this.channels.length > 0;
  }

  /**
   * Reset complet du manager
   */
  reset() {
    this._reset();
    this.notify?.('status:funscript', { message: 'Funscript manager reset', type: 'info' });
    this.notify?.('funscript:reset', {});
  }

  /**
   * Reset interne
   */
  _reset() {
    // Débrancher tous les canaux avant reset
    this.channels.forEach(channel => channel.unplugAll());
    
    this.data = null;
    this.channels = [];
    this.duration = 0;
    this.customFieldConfig = null;
  }

  // ============================================================================
  // SECTION 2: GETTERS & BASIC INFO
  // ============================================================================

  getChannels() {
    return [...this.channels];
  }

  getChannelNames() {
    return this.channels.map(channel => channel.name);
  }

  getChannel(channelName) {
    return this.channels.find(channel => channel.name === channelName) || null;
  }

  hasChannel(channelName) {
    return this.getChannel(channelName) !== null;
  }

  getChannelsByType(hapticType) {
    return this.channels.filter(channel => channel.type === hapticType);
  }

  getDuration() {
    return this.duration;
  }

  // ============================================================================
  // SECTION 3: INTERPOLATION PURE
  // ============================================================================

  interpolateAll(channelTimings) {
    const result = {};
    
    for (const [channelName, t_canal] of Object.entries(channelTimings)) {
      const channel = this.getChannel(channelName);
      if (channel) {
        const value = channel.interpolateAt(t_canal);
        if (value!=null){
          result[channelName] = value;
        }
      }
    }
    
    return result;
  }

  // ============================================================================
  // SECTION 4: AUTO-MAPPING OPTIMISÉ avec likely_capability
  // ============================================================================

  autoMapChannels(actuators) {
    if (this.channels.length === 0) {
      this.notify?.('status:funscript', { message: 'No channels available for auto-mapping', type: 'info' });
      return { suggestions: [], mapped: 0, total: 0, mode: 'no channels' };
    }

    if (!actuators || actuators.length === 0) {
      this.notify?.('status:funscript', { message: 'No actuators available for auto-mapping', type: 'info' });
      return { suggestions: [], mapped: 0, total: this.channels.length, mode: 'no actuators' };
    }

    this.notify?.('status:funscript', { message: `Starting auto-mapping for ${this.channels.length} channels with ${actuators.length} actuators...`, type: 'processing' });

    const suggestions = [];
    let mappedCount = 0;

    for (const channel of this.channels) {
      // Utiliser directement channel.likelyCapability au lieu de re-analyser le nom
      const bestActuator = this._findBestActuatorMatch(channel, actuators);
      
      if (bestActuator) {
        suggestions.push({
          channelName: channel.name,
          actuatorIndex: bestActuator.index,
          confidence: 'high', // Basé sur likely_capability, donc high confidence
          reason: `${channel.likelyCapability} match`
        });
        mappedCount++;
      } else {
        this.notify?.('status:funscript', { message: `No compatible actuator found for channel "${channel.name}" (${channel.type}, likely: ${channel.likelyCapability})`, type: 'warning' });
      }
    }

    const mode = mappedCount === this.channels.length ? 'complete' : 
                 mappedCount > 0 ? 'partial' : 'none';

    this.notify?.('status:funscript', { message: `Auto-mapping complete: ${mappedCount}/${this.channels.length} channels mapped`, type: mappedCount > 0 ? 'success' : 'warning' });

    return {
      suggestions,
      mapped: mappedCount,
      total: this.channels.length,
      mode
    };
  }

  /**
   * ✅ SIMPLIFIÉ: Trouve le meilleur actuateur pour un canal basé sur likely_capability
   */
  _findBestActuatorMatch(channel, actuators) {
    // Filtrer les actuateurs compatibles (même type SCALAR/POLAR)
    const compatibleActuators = actuators.filter(actuator => 
      actuator.settings.enabled && channel.canPlugTo(actuator)
    );

    if (compatibleActuators.length === 0) {
      this.notify?.('status:funscript', { message: `No compatible actuators for channel "${channel.name}" (${channel.type})`, type: 'log' });
      return null;
    }

    // 1. Priorité 1 : Match exact avec likely_capability
    const exactMatch = compatibleActuators.find(actuator => 
      actuator.capability === channel.likelyCapability
    );
    
    if (exactMatch) {
      this.notify?.('status:funscript', { message: `Perfect match: ${channel.name} → ${exactMatch.capability} (likely_capability match)`, type: 'log' });
      return exactMatch;
    }

    // 2. Priorité 2 : Ordre de priorité par défaut
    const priorityOrder = ['linear', 'vibrate', 'oscillate', 'rotate'];
    for (const capability of priorityOrder) {
      const actuator = compatibleActuators.find(a => a.capability === capability);
      if (actuator) {
        this.notify?.('status:funscript', { message: `Fallback mapping: ${channel.name} → ${capability} (priority order)`, type: 'log' });
        return actuator;
      }
    }
    
    // 3. Dernier recours : premier compatible
    const fallbackActuator = compatibleActuators[0] || null;
    if (fallbackActuator) {
      this.notify?.('status:funscript', { message: `Last resort mapping: ${channel.name} → ${fallbackActuator.capability} (first available)`, type: 'log' });
    }
    return fallbackActuator;
  }

  // ============================================================================
  // SECTION 5: FUNSCRIPT PARSING SIMPLIFIÉ
  // ============================================================================

  /**
   * Extrait tous les canaux du funscript en créant des instances Channel
   */
  _extractChannels() {
    this.channels = [];

    this.notify?.('status:funscript', { message: 'Extracting channels from funscript data...', type: 'processing' });

    // 1. Extraire les métadonnées globales (si disponibles)
    const metadata = this._extractMetadata();
    
    // 2. Format standard single-channel (toujours en premier)
    if (this.data.actions?.length) {
      const channel = this._createChannelFromActions('pos', this.data.actions, metadata);
      if (channel) {
        this.channels.push(channel);
        this.notify?.('status:funscript', { message: `Found main channel: ${channel.name} (${this.data.actions.length} actions)`, type: 'log' });
      }
    }

    // 3. Détection flexible des canaux multi-axes
    this._extractMultiAxisChannels(metadata);

    // 4. Format tracks nested (format alternatif)
    if (this.data.tracks) {
      this.notify?.('status:funscript', { message: `Processing ${Object.keys(this.data.tracks).length} nested tracks...`, type: 'log' });
      for (const [trackName, trackData] of Object.entries(this.data.tracks)) {
        if (trackData.actions?.length) {
          const trackMetadata = { ...metadata, ...trackData.metadata };
          const channel = this._createChannelFromActions(trackName, trackData.actions, trackMetadata);
          if (channel) {
            this.channels.push(channel);
            this.notify?.('status:funscript', { message: `Found track channel: ${channel.name} (${trackData.actions.length} actions)`, type: 'log' });
          }
        }
      }
    }

    if (this.channels.length === 0) {
      throw new Error('No valid channels found in funscript data');
    }

    this.notify?.('status:funscript', { message: `Channel extraction complete: ${this.channels.length} channels created`, type: 'success' });
  }

  /**
   * Scan des canaux multi-axes dans les propriétés root
   */
  _extractMultiAxisChannels(metadata) {
    this.notify?.('status:funscript', { message: 'Scanning for multi-axis channels...', type: 'log' });

    let foundMultiAxis = 0;
    for (const [key, value] of Object.entries(this.data)) {
      if (this._isActionArray(value)) {
        if (key === 'actions') continue; // Éviter de retraiter 'actions'
        
        const channel = this._createChannelFromActions(key, value, metadata);
        if (channel) {
          this.channels.push(channel);
          foundMultiAxis++;
        }
      }
    }

    if (foundMultiAxis > 0) {
      this.notify?.('status:funscript', { message: `Found ${foundMultiAxis} multi-axis channels`, type: 'log' });
    }
  }

  /**
   * Test si un objet est un array d'actions valide
   */
  _isActionArray(value) {
    return Array.isArray(value) && 
           value.length > 0 && 
           value.every(action => 
             typeof action === 'object' && 
             action !== null &&
             (action.at !== undefined || action.t !== undefined || action.time !== undefined)
           );
  }

  /**
   * ✅ SIMPLIFIÉ: Création d'une instance Channel (heuristique déléguée au Channel)
   */
  _createChannelFromActions(fieldName, actions, metadata = {}) {
    try {
      this.notify?.('status:funscript', { message: `Creating channel from field: ${fieldName} (${actions.length} actions)`, type: 'log' });

      // 1. Configuration utilisateur explicite (priorité absolue)
      if (this.customFieldConfig && this.customFieldConfig[fieldName]) {
        const userConfig = this.customFieldConfig[fieldName];
        const fieldConfig = {
          timeField: userConfig.timeField || 'at',
          valueField: userConfig.valueField || 'pos',
          directionField: userConfig.directionField || null,
          durationField: userConfig.durationField || null
        };
        
        this.notify?.('status:funscript', { message: `Using user-defined config for ${fieldName}`, type: 'success' });
        
        return new Channel(fieldName, actions, fieldConfig, {
          ...metadata,
          originalField: fieldName
        }, this.notify);
      }

      // 2. Configuration basique avec détection automatique des champs
      const fieldConfig = this._buildBasicFieldConfig(fieldName, actions, metadata);
      
      const channel = new Channel(fieldName, actions, fieldConfig, {
        ...metadata,
        originalField: fieldName
      }, this.notify);

      this.notify?.('status:funscript', { message: `Channel created: ${channel.name} (${channel.type}, likely: ${channel.likelyCapability}, ${channel.actions.length} actions)`, type: 'log' });
      
      return channel;
      
    } catch (error) {
      this.notify?.('status:funscript', { message: `Failed to create channel "${fieldName}": ${error.message}`, type: 'error' });
      return null;
    }
  }

  /**
   * ✅ NOUVEAU: Construit un fieldConfig basique en détectant les champs disponibles
   */
  _buildBasicFieldConfig(fieldName, actions, metadata) {
    if (actions.length === 0) {
      return { timeField: 'at', valueField: 'pos' };
    }

    const firstAction = actions[0];
    const availableFields = Object.keys(firstAction);

    // Détecter timeField
    const timeField = this._detectTimeField(availableFields);
    
    // Détecter valueField  
    const valueField = this._detectValueField(availableFields, fieldName);
    
    // Détecter directionField optionnel
    const directionField = this._detectDirectionField(availableFields);
    
    // Détecter durationField optionnel
    const durationField = this._detectDurationField(availableFields);

    this.notify?.('status:funscript', { message: `Field detection for ${fieldName}: time=${timeField}, value=${valueField}, direction=${directionField || 'none'}, duration=${durationField || 'none'}`, type: 'log' });

    return {
      timeField,
      valueField,
      directionField,
      durationField
    };
  }

  /**
   * Détecte le champ temps dans les actions
   */
  _detectTimeField(availableFields) {
    const timeFields = ['at', 't', 'time', 'timestamp'];
    for (const field of timeFields) {
      if (availableFields.includes(field)) {
        return field;
      }
    }
    return 'at'; // fallback
  }

  /**
   * Détecte le champ valeur principal
   */
  _detectValueField(availableFields, fieldName) {
    // Essayer des noms liés au fieldName d'abord
    if (availableFields.includes(fieldName.toLowerCase())) {
      return fieldName.toLowerCase();
    }

    // Standards communs
    const valueFields = [
      'pos', 'position', 'value', 'val', 'v',
      'speed', 'spd', 's',
      'scalar', 'intensity', 'i'
    ];
    
    for (const field of valueFields) {
      if (availableFields.includes(field)) {
        return field;
      }
    }
    
    return 'pos'; // fallback
  }

  /**
   * Détecte le champ direction optionnel
   */
  _detectDirectionField(availableFields) {
    const directionFields = [
      'clockwise', 'cw', 'direction', 'dir',
      'ccw', 'counterclockwise'
    ];
    
    for (const field of directionFields) {
      if (availableFields.includes(field)) {
        return field;
      }
    }
    
    return null; // Pas de champ direction trouvé
  }

  /**
   * Détecte le champ durée optionnel
   */
  _detectDurationField(availableFields) {
    const durationFields = ['duration', 'dur', 'd'];
    
    for (const field of durationFields) {
      if (availableFields.includes(field)) {
        return field;
      }
    }
    
    return null; // Pas de champ durée trouvé
  }

  /**
   * Extrait métadonnées du funscript
   */
  _extractMetadata() {
    if (!this.data) return {};
    
    return {
      metadata: this.data.metadata || {},
      channels: this.data.channels || {},
      mapping: this.data.mapping || {},
      ...this.data.metadata // Flatten au niveau racine
    };
  }

  /**
   * Calcule la durée totale du funscript
   */
  _calculateDuration() {
    this.duration = Math.max(
      ...this.channels.map(channel => channel.duration),
      0
    );
  }

  // ============================================================================
  // SECTION 6: HELPERS ET DEBUG
  // ============================================================================

  /**
   * ✅ NOUVEAU: Retourne les likely_capability de tous les canaux
   */
  getChannelSuggestions() {
    return this.channels.map(channel => ({
      name: channel.name,
      type: channel.type,
      likelyCapability: channel.likelyCapability,
      actionCount: channel.getActionCount(),
      duration: channel.duration
    }));
  }

  /**
   * Informations de debug complètes
   */
  getDebugInfo() {
    return {
      loaded: this.hasFunscript(),
      channelCount: this.channels.length,
      duration: this.duration,
      channels: this.channels.map(ch => ({
        name: ch.name,
        type: ch.type,
        likelyCapability: ch.likelyCapability,
        actionCount: ch.getActionCount(),
        connectedActuators: ch.getConnectedActuators().length
      })),
      customFieldConfig: this.customFieldConfig,
      dataKeys: this.data ? Object.keys(this.data) : []
    };
  }

  /**
   * Métadonnées d'un canal spécifique
   */
  getChannelMetadata(channelName) {
    const channel = this.getChannel(channelName);
    return channel ? channel.getMetadata() : {};
  }

  /**
   * Vérifie si un canal a des valeurs négatives
   */
  hasNegativeValues(channelName) {
    const channel = this.getChannel(channelName);
    return channel ? channel.type === HapticType.POLAR : false;
  }

  // ============================================================================
  // SECTION 7: DÉTECTION DES CHAMPS POUR CHANNELSETTINGS
  // ============================================================================

  /**
   * ✅ NOUVEAU: Analyse des champs disponibles dans chaque canal pour ChannelSettings
   */
  getDetectedFields() {
    if (!this.data) return {};
    
    const detectedFields = {};
    
    // Analyser le canal principal
    if (this.data.actions?.length > 0) {
      detectedFields['pos'] = this._analyzeFieldsInActions(this.data.actions);
    }
    
    // Analyser les canaux multi-axes
    for (const [key, value] of Object.entries(this.data)) {
      if (this._isActionArray(value) && key !== 'actions') {
        detectedFields[key] = this._analyzeFieldsInActions(value);
      }
    }
    
    // Analyser les tracks nested
    if (this.data.tracks) {
      for (const [trackName, trackData] of Object.entries(this.data.tracks)) {
        if (trackData.actions?.length) {
          detectedFields[trackName] = this._analyzeFieldsInActions(trackData.actions);
        }
      }
    }
    
    return detectedFields;
  }

  /**
   * ✅ NOUVEAU: Analyse les champs dans un array d'actions
   */
  _analyzeFieldsInActions(actions) {
    if (!actions || actions.length === 0) {
      return {
        availableTimeFields: ['at'],
        availableValueFields: ['pos'],
        availableDirectionFields: [],
        availableDurationFields: [],
        otherFields: [],
        sampleAction: null
      };
    }
    
    const firstAction = actions[0];
    const allFields = Object.keys(firstAction);
    
    return {
      // Champs de temps (étendus avec conventions buttplug)
      availableTimeFields: allFields.filter(k => {
        const lower = k.toLowerCase();
        return ['at', 't', 'time', 'timestamp', 'ms'].includes(lower);
      }),
      
      // Champs de valeur (étendus avec conventions buttplug)
      availableValueFields: allFields.filter(k => {
        const lower = k.toLowerCase();
        return ['pos', 'p', 'position', 'scalar', 'speed', 'spd', 's', 
                'val', 'v', 'value', 'intensity', 'i'].includes(lower);
      }),
      
      // Champs de direction (étendus avec conventions buttplug)
      availableDirectionFields: allFields.filter(k => {
        const lower = k.toLowerCase();
        return ['clockwise', 'cw', 'direction', 'dir', 'ccw', 'counterclockwise'].includes(lower);
      }),
      
      // Champs de durée (étendus avec conventions buttplug)
      availableDurationFields: allFields.filter(k => {
        const lower = k.toLowerCase();
        return ['duration', 'dur', 'd', 'delay', 'ms', 'millis', 'time'].includes(lower);
      }),
      
      // Autres champs (non reconnus)
      otherFields: allFields.filter(k => {
        const lower = k.toLowerCase();
        const knownFields = [
          // Time
          'at', 't', 'time', 'timestamp', 'ms',
          // Value
          'pos', 'p', 'position', 'scalar', 'speed', 'spd', 's', 
          'val', 'v', 'value', 'intensity', 'i',
          // Direction
          'clockwise', 'cw', 'direction', 'dir', 'ccw', 'counterclockwise',
          // Duration
          'duration', 'dur', 'd', 'delay', 'millis'
        ];
        return !knownFields.includes(lower);
      }),
      
      sampleAction: firstAction
    };
  }
}

export default FunscriptManager;