import ButtPlugManager from './ButtPlugManager';
import FunscriptManager from './FunscriptManager';
import PlaylistManager from './PlaylistManager';
import LoggingManager from './LoggingManager';

/**
 * FunPlayerCore - ✅ REFACTORISÉ: Hub business logic central
 * 
 * - Hors cycle de vie du composant React, survit au remounts
 * - Centralise tous les managers + logique business
 * - ✅ NOUVEAU: handleEvent() central pour toute la logique business
 * - ✅ NOUVEAU: État business centralisé (isReady, status, error)
 * - Lazy initialization des managers via getters
 * - notify() public direct passé aux managers
 * - API simple et prévisible partout dans l'app
 */

class FunPlayerCore {
  static instance = null;
  
  constructor() {
    
      // ✅ NOUVEAU: Configuration logging
    this.enableConsoleLogging = process.env.NODE_ENV !== 'production';
    this.debugLogs = [];
    this.maxDebugLogs = 1000;
    this.sessionStart = performance.now();

    // ============================================================================
    // INSTANCES PRIVÉES - Lazy initialization via getters (INCHANGÉ)
    // ============================================================================
    this._buttplug = null;
    this._funscript = null;
    this._playlist = null;
    this._logging = null;
    
    // ============================================================================
    // ÉTAT BUSINESS CENTRALISÉ (INCHANGÉ)
    // ============================================================================
    this.status = 'idle';
    this.error = null;
    this.isReady = false;
    
    // ============================================================================
    // SYSTÈME D'ÉVÉNEMENTS (INCHANGÉ)
    // ============================================================================
    this.listeners = new Set();
    this.addListener(this.handleEvent)

    // ✅ MODIFIÉ: Log de session via LoggingManager
    this.logging.addInitialSessionMessage();
  }

  // ============================================================================
  // BUS D'ÉVÉNEMENTS (INCHANGÉ)
  // ============================================================================
  
  addListener(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }
  
  notify = (event, data) => {
    this.listeners.forEach(callback => {
      try {
        callback(event, data);
      } catch (error) {
        // ✅ MODIFIÉ: Respect du flag logging
        if (this.enableConsoleLogging) {
          console.error('Core: Listener error:', error);
        }
      }
    });
  }

  handleEvent = (event, data) => {
    // ✅ NOUVEAU: Handler unifié de status avec source dans l'événement
    if (event.startsWith('status:')) {
      this._handleStatusEvent(event, data);
    } else if (event.startsWith('buttplug:')) {
      this._handleButtplugEvent(event, data);
    } else if (event.startsWith('channel:')) {
      this._handleChannelEvent(event, data);
    } else if (event.startsWith('actuator:')) {
      this._handleActuatorEvent(event, data);
    } else if (event.startsWith('funscript:')) {
      this._handleFunscriptEvent(event, data);
    } else if (event.startsWith('playlist:')) {
      this._handlePlaylistEvent(event, data);
    } else if (event.startsWith('media:')) {
      this._handleMediaEvent(event, data);
    } else if (event.startsWith('core:')) {
      this._handleCoreEvent(event, data);
    } else if (event.startsWith('logging:')) {
      this._handleLoggingEvent(event, data);
    } else if (event.startsWith('component:')) {
      this._handleComponentEvent(event, data);
    } else {
      if (this.enableConsoleLogging) {
        console.warn(`FunPlayerCore: Unknown event type ${event}`);
      }
    }
  }
  
  // ============================================================================
  // GETTERS DECLARATIFS VERS LES MANAGERS (INCHANGÉ)
  // ============================================================================
  
  get buttplug() {
    if (!this._buttplug) {
      this._buttplug = new ButtPlugManager(this.notify);
    }
    return this._buttplug;
  }
  
  get funscript() {
    if (!this._funscript) {
      this._funscript = new FunscriptManager(this.notify);
    }
    return this._funscript;
  }

  get playlist() {
    if (!this._playlist) {
      this._playlist = new PlaylistManager(this.notify);
    }
    return this._playlist;
  }

    get logging() {
    if (!this._logging) {
      this._logging = new LoggingManager(this.notify);
    }
    return this._logging;
  }

  // ============================================================================
  // EVENT HANDLERS MÉTIER (SIMPLIFIÉS)
  // ============================================================================

  /**
   * ✅ Handler unifié pour tous les status avec extraction automatique de la source
   */
  _handleStatusEvent = (event, data) => {
    // 1. Créer l'objet message structuré
    const messageObj = this.logging.log(event, data);
    
    // 4. Gestion des événements système
    switch (messageObj.type) {
      case 'log':
        break;
      case 'error':
        this.setError(messageObj);
        break;
      case 'success':
      case 'info':
      case 'processing':
      default:
        this.setStatus(messageObj);
        break;
    }
  }

  /**
   * ✅ CORRIGÉ: Handler d'événements core avec messageObj structuré
   */
  _handleCoreEvent = (event, data) => {
    switch (event) {
      case 'core:autoConnect':
        if (data.success) {
          this.setStatus({
            source: 'core',
            message: `Auto-connected to ${data.device.name} (${data.mapResult.mapped}/${data.mapResult.total} channels mapped)`,
            type: 'success'
          });
        } else {
          this.setError({
            source: 'core',
            message: 'Auto-connect failed',
            type: 'error',
            error: data.error
          });
        }
        break;

      case 'core:autoMap':
        this.setStatus({
          source: 'core',
          message: `Auto-mapped ${data.result.mapped} new channels`,
          type: 'success'
        });
        break;
    }
  }

  /**
   * ✅ CORRIGÉ: Handler d'événements buttplug avec messageObj structuré
   */
  _handleButtplugEvent = (event, data) => {
    switch (event) {
      case 'buttplug:connection':
        this.setStatus({
          source: 'buttplug',
          message: data.connected ? 'Connected to Intiface' : 'Disconnected from Intiface',
          type: data.connected ? 'success' : 'info'
        });
        break;
        
      case 'buttplug:device':
        this.setStatus({
          source: 'buttplug',
          message: data.device ? `Device selected: ${data.device.name}` : 'No device selected',
          type: data.device ? 'success' : 'info'
        });
        
        if (data.device) {
          setTimeout(() => {
            const mapResult = this.autoMapChannels(); // ✅ Utilise le nouvel autoMap intelligent
          }, 100);
        }
        break;
        
      case 'buttplug:error':
        this.setError({
          source: 'buttplug',
          message: 'Device error',
          type: 'error',
          error: data.error
        });
        break;
    }
  }

  /**
   * ✅ CORRIGÉ: Handler d'événements funscript (si utilisé)
   */
  _handleFunscriptEvent = (event, data) => {
    switch (event) {
      case 'funscript:load':
        setTimeout(() => {
          const mapResult = this.autoMapChannels(); // ✅ Utilise le nouvel autoMap intelligent
        }, 100);
        break;
        
      case 'funscript:channels':        
      case 'funscript:options':
      case 'funscript:globalOffset':
        break;
    }
  }

  /**
   * ✅ CORRIGÉ: Handler d'événements playlist avec messageObj structuré
   */
  _handlePlaylistEvent = (event, data) => {
    switch (event) {
      case 'playlist:loaded':
        this.isReady = false;
        
        // ✅ Précharger automatiquement le funscript du premier item
        if (data.items && data.items.length > 0) {
          const firstItem = data.items[0];
          
          this.notify?.('status:core', { 
            message: `Preloading funscript for first item: ${firstItem.name || 'Untitled'}`, 
            type: 'log' 
          });
          
          // Charger le funscript du premier item
          this.funscript.loadFromPlaylistItem(firstItem)
            .then(() => {
              this.notify?.('status:core', { 
                message: `First item ready: ${firstItem.name || 'Untitled'}`, 
                type: 'success' 
              });
              this.setReady(true);
            })
            .catch(error => {
              this.notify?.('status:core', { 
                message: `Failed to preload funscript for first item`, 
                type: 'error', 
                error: error.message 
              });
              // Toujours marquer comme prêt même si pas de funscript
              this.setReady(true);
            });
        } else {
          // Playlist vide, quand même prêt
          this.setReady(true);
        }
        break;
        
      case 'playlist:itemChanged':
        this.isReady = false;
        
        // stopAll() préventif + chargement funscript
        this.buttplug.stopAll().catch(err => console.warn('Failed to stop devices:', err));
        
        if (data.item) {
          this.funscript.loadFromPlaylistItem(data.item)
            .then(() => {
              this.setReady(true);
            })
            .catch(error => {
              // Erreur gérée par status:funscript
              console.error('Failed to load funscript for item:', error);
              this.setReady(true); // Quand même prêt même sans funscript
            });
        } else {
          this.setReady(true);
        }
        break;
        
      case 'playlist:playbackChanged':
        // Synchroniser l'état de lecture se fait automatiquement
        break;
        
      case 'playlist:error':
        // Erreurs gérées par status:playlist
        break;
    }
  }

  _handleActuatorEvent = (event, data) => {
    switch (event) {
      default:
        break
    }
  }

  _handleChannelEvent = (event, data) => {
    switch (event) {
      default:
        break
    }
  }

  _handleLoggingEvent = (event, data) => {
    switch (event) {
      default:
        break
    }
  }

  _handleMediaEvent = (event, data) => {
    switch (event) {
      default:
        break
    }
  }

  _handleComponentEvent = (event, data) => {
    switch (event) {
      default:
        break
    }
  }

  // ============================================================================
  // GLOBAL STATE HELPERS (INCHANGÉ)
  // ============================================================================


  /**
   * Met à jour le status à partir d'un messageObj
   */
  setStatus = (messageObj) => {
    // Formater le message pour l'affichage système
    const formattedMessage = `[${messageObj.source.charAt(0).toUpperCase() + messageObj.source.slice(1)}] ${messageObj.message}`;
    
    this.status = formattedMessage;
    this.error = null;
    this.notify('core:status', { status: formattedMessage, error: null, messageObj });
  }

  /**
   * Met à jour l'erreur à partir d'un messageObj
   */
  setError = (messageObj) => {
    // Formater le message pour l'affichage système
    const formattedMessage = `[${messageObj.source.charAt(0).toUpperCase() + messageObj.source.slice(1)}] ${messageObj.message}`;
    
    this.error = formattedMessage;
    this.status = 'error';
    this.isReady = false;
    
    // Logging d'erreurs toujours activé (important en production aussi)
    if (messageObj.error) {
      console.error(`FunPlayer Core Error: ${formattedMessage}`, messageObj.error);
    }
    
    this.notify('core:status', { status: 'error', error: formattedMessage, messageObj });
  }

  setReady = (ready) => {
    this.isReady = ready;
    this.notify('core:ready', { isReady: ready });
  }

  // ============================================================================
  // CHANNEL/ACTUATOR HELPERS (INCHANGÉ)
  // ============================================================================

  plugChannel(channelName, actuatorIndex) {
    const channel = this.funscript.getChannel(channelName);
    const actuator = this.buttplug.getActuator(actuatorIndex);
    
    if (!channel || !actuator) return false;
    
    return channel.plug(actuator);
  }

  unplugChannel(channelName, actuatorIndex) {
    const channel = this.funscript.getChannel(channelName);
    const actuator = this.buttplug.getActuator(actuatorIndex);
    
    if (!channel || !actuator) return false;
    
    channel.unplug(actuator);
    return true;
  }

  unplugAllChannels() {
    this.funscript.getChannels().forEach(channel => {
      channel.unplugAll();
    });
  }

  // ============================================================================
  // CORE METHODS (INCHANGÉ)
  // ============================================================================
  
  /**
   * ✅ CORRIGÉ: autoConnect avec gestion d'erreur cohérente
   */
  async autoConnect(scanTimeout = 3000) {
    try {
      const connected = await this.buttplug.connect();
      
      if (!connected) {
        throw new Error('Failed to connect to Intiface Central');
      }
      
      const devices = this.buttplug.getDevices().filter(device => device.index>=0)

      if (devices.length === 0) {
        throw new Error('No physical device found');
      }
      
      const selectSuccess = this.buttplug.selectDevice(devices[0].index);
      if (!selectSuccess) {
        throw new Error('Failed to select device');
      }
      
      const mapResult = this.autoMapChannels();
      
      this.notify('core:autoConnect', {
        success: true,
        device: devices[0],
        mapResult,
        deviceInfo: this.buttplug.getDeviceInfo()
      });

      this.notify('status:core', { 
        message: `AutoConnect successful: ${devices[0].name}`, 
        type: 'success' 
      });
      
      return {
        success: true,
        device: devices[0],
        mapResult
      };
      
    } catch (error) {
      this.notify('core:autoConnect', {
        success: false,
        error: error.message
      });
      
      // ✅ CORRIGÉ: Notification d'erreur avec format cohérent
      this.notify('status:core', {
        message: 'AutoConnect failed',
        type: 'error',
        error: error.message
      });
      
      return {
        success: false,
        error: error.message
      };
    }
  }

  async processHapticFrame(currentTime, options = {}) {
    const channels = this.funscript.getChannels();
    if (channels.length === 0) {
      return new Map();
    }

    const times = this.buttplug.getTimeWithOffsets(currentTime);
    const channelTimings = Object.fromEntries(times.entries());
    const values = this.funscript.interpolateAll(channelTimings);
    const actuatorData = await this.buttplug.processChannels(values);
    
    return actuatorData;
  }

  // ============================================================================
  // SECTION: AUTOMAP INTELLIGENT AVEC PERSISTANCE
  // ============================================================================

  /**
   * ✅ NOUVEAU: AutoMap intelligent qui préserve la configuration utilisateur entre funscripts
   * 
   * STRATÉGIE:
   * 1. Sauvegarder les mappings actuels avant reset
   * 2. Pour chaque actuateur :
   *    - Priorité 1: Canal même nom que previousMappedChannel (si compatible)
   *    - Priorité 2: Canal avec capability matching (parmi non-mappés)
   *    - Priorité 3: Canal avec type matching (parmi non-mappés)
   *    - Priorité 4: Répéter 2-3 sur canaux déjà mappés (multi-assignment)
   */
  autoMapChannels() {
    const actuators = this.buttplug.getActuators();
    const channels = this.funscript.getChannels();
    
    if (actuators.length === 0) {
      this.notify('status:core', { message: 'No actuators available for auto-mapping', type: 'info' });
      return { mapped: 0, total: 0, skippedIncompatible: 0, strategy: 'no_actuators' };
    }
    
    if (channels.length === 0) {
      this.notify('status:core', { message: 'No channels available for auto-mapping', type: 'info' });
      return { mapped: 0, total: actuators.length, skippedIncompatible: 0, strategy: 'no_channels' };
    }

    this.notify('status:core', { message: `🎯 Starting intelligent autoMap: ${actuators.length} actuators → ${channels.length} channels`, type: 'processing' });

    // 1. Sauvegarder les mappings actuels (déjà fait via unplug → previousMappedChannel)
    this._savePreviousMappings(actuators);

    // 2. Initialiser le tracking des assignations
    const assignmentTracker = {
      mappedActuators: new Set(),
      assignedChannels: new Map(), // channelName → [actuatorIndex, ...]
      unmappedChannels: new Set(channels.map(ch => ch.name)),
      statistics: {
        priorityByName: 0,
        priorityByCapability: 0,
        priorityByType: 0,
        fallbackMultiAssignment: 0,
        incompatible: 0
      }
    };

    // 3. Phase 1: Mappings prioritaires (nom + capability/type sur canaux non-mappés)
    this._phase1PriorityMapping(actuators, channels, assignmentTracker);

    // 4. Phase 2: Fallback multi-assignment sur canaux déjà mappés
    this._phase2FallbackMapping(actuators, channels, assignmentTracker);

    // 5. Résultats et logging
    const result = this._buildAutoMapResult(assignmentTracker, actuators.length);
    
    this.notify('core:autoMap', {
      result,
      deviceInfo: this.buttplug.getDeviceInfo(),
      strategy: 'intelligent_persistent'
    });

    return result;
  }

  /**
   * ✅ NOUVEAU: Sauvegarde les mappings actuels dans previousMappedChannel
   */
  _savePreviousMappings(actuators) {
    let savedMappings = 0;
    
    for (const actuator of actuators) {
      if (actuator.isPlugged()) {
        const channelName = actuator.getAssignedChannelName();
        
        // Le mapping sera automatiquement sauvé lors du unplug dans _reset()
        this.notify('status:core', { message: `💾 Saving mapping: Actuator ${actuator.index} was connected to "${channelName}"`, type: 'log' });
        savedMappings++;
      }
    }
    
    if (savedMappings > 0) {
      this.notify('status:core', { message: `💾 Saved ${savedMappings} previous mappings for intelligent autoMap`, type: 'info' });
    }
  }

  /**
   * ✅ NOUVEAU: Phase 1 - Mappings prioritaires
   */
  _phase1PriorityMapping(actuators, channels, tracker) {
    this.notify('status:core', { message: '🎯 Phase 1: Priority mapping (name → capability → type)', type: 'log' });

    for (const actuator of actuators) {
      if (!actuator.settings.enabled) {
        this.notify('status:core', { message: `⏭️ Skipping disabled actuator ${actuator.index}`, type: 'log' });
        continue;
      }

      // Priorité 1: Canal même nom que previousMappedChannel
      if (this._tryMapByPreviousName(actuator, channels, tracker)) continue;
      
      // Priorité 2: Canal avec capability matching (parmi non-mappés uniquement)
      if (this._tryMapByCapability(actuator, channels, tracker, false)) continue;
      
      // Priorité 3: Canal avec type matching (parmi non-mappés uniquement)
      if (this._tryMapByType(actuator, channels, tracker, false)) continue;
      
      // Phase 1 terminée pour cet actuateur, sera tenté en Phase 2
    }
  }

  /**
   * ✅ NOUVEAU: Phase 2 - Fallback multi-assignment
   */
  _phase2FallbackMapping(actuators, channels, tracker) {
    this.notify('status:core', { message: '🎯 Phase 2: Fallback multi-assignment on already mapped channels', type: 'log' });

    for (const actuator of actuators) {
      if (!actuator.settings.enabled || tracker.mappedActuators.has(actuator.index)) {
        continue; // Déjà mappé ou désactivé
      }

      // Priorité 4: Capability matching sur canaux déjà mappés
      if (this._tryMapByCapability(actuator, channels, tracker, true)) continue;
      
      // Priorité 5: Type matching sur canaux déjà mappés
      if (this._tryMapByType(actuator, channels, tracker, true)) continue;
      
      // Aucun mapping possible
      tracker.statistics.incompatible++;
      this.notify('status:core', { message: `❌ No mapping found for actuator ${actuator.index} (${actuator.capability}/${actuator.type})`, type: 'warning' });
    }
  }

  /**
   * ✅ NOUVEAU: Tentative de mapping par nom précédent
   */
  _tryMapByPreviousName(actuator, channels, tracker) {
    const previousChannelName = actuator.getPreviousMappedChannelName();
    
    if (!previousChannelName) {
      return false; // Pas de mapping précédent
    }
    
    const targetChannel = channels.find(ch => ch.name === previousChannelName);
    
    if (!targetChannel) {
      this.notify('status:core', { message: `🔍 Previous channel "${previousChannelName}" not found in new funscript for actuator ${actuator.index}`, type: 'log' });
      return false;
    }
    
    if (!actuator.canPlugTo(targetChannel)) {
      this.notify('status:core', { message: `🔍 Previous channel "${previousChannelName}" incompatible with actuator ${actuator.index} (${actuator.type} vs ${targetChannel.type})`, type: 'log' });
      return false;
    }
    
    // Mapping réussi !
    const success = targetChannel.plug(actuator);
    if (success) {
      this._recordSuccessfulMapping(actuator, targetChannel, tracker, 'previous_name');
      tracker.statistics.priorityByName++;
      this.notify('status:core', { message: `✅ [PRIORITY NAME] Actuator ${actuator.index} → "${targetChannel.name}" (restored previous mapping)`, type: 'success' });
      return true;
    }
    
    return false;
  }

  /**
   * ✅ NOUVEAU: Tentative de mapping par capability
   */
  _tryMapByCapability(actuator, channels, tracker, allowAlreadyMapped) {
    const candidateChannels = channels.filter(channel => {
      // Vérifier compatibilité de base
      if (!actuator.canPlugTo(channel)) return false;
      
      // Vérifier si matching capability
      if (channel.likelyCapability !== actuator.capability) return false;
      
      // Vérifier statut mapping selon la phase
      const isAlreadyMapped = tracker.assignedChannels.has(channel.name);
      return allowAlreadyMapped || !isAlreadyMapped;
    });
    
    if (candidateChannels.length === 0) return false;
    
    // Prendre le premier candidat (ou améliorer avec scoring si besoin)
    const targetChannel = candidateChannels[0];
    const success = targetChannel.plug(actuator);
    
    if (success) {
      const phase = allowAlreadyMapped ? 'MULTI-CAPABILITY' : 'CAPABILITY';
      this._recordSuccessfulMapping(actuator, targetChannel, tracker, 'capability');
      
      if (allowAlreadyMapped) {
        tracker.statistics.fallbackMultiAssignment++;
      } else {
        tracker.statistics.priorityByCapability++;
      }
      
      this.notify('status:core', { message: `✅ [${phase}] Actuator ${actuator.index} → "${targetChannel.name}" (${actuator.capability} match)`, type: 'success' });
      return true;
    }
    
    return false;
  }

  /**
   * ✅ NOUVEAU: Tentative de mapping par type
   */
  _tryMapByType(actuator, channels, tracker, allowAlreadyMapped) {
    const candidateChannels = channels.filter(channel => {
      // Vérifier compatibilité de base
      if (!actuator.canPlugTo(channel)) return false;
      
      // Vérifier statut mapping selon la phase
      const isAlreadyMapped = tracker.assignedChannels.has(channel.name);
      return allowAlreadyMapped || !isAlreadyMapped;
    });
    
    if (candidateChannels.length === 0) return false;
    
    // Prendre le premier candidat compatible
    const targetChannel = candidateChannels[0];
    const success = targetChannel.plug(actuator);
    
    if (success) {
      const phase = allowAlreadyMapped ? 'MULTI-TYPE' : 'TYPE';
      this._recordSuccessfulMapping(actuator, targetChannel, tracker, 'type');
      
      if (allowAlreadyMapped) {
        tracker.statistics.fallbackMultiAssignment++;
      } else {
        tracker.statistics.priorityByType++;
      }
      
      this.notify('status:core', { message: `✅ [${phase}] Actuator ${actuator.index} → "${targetChannel.name}" (${actuator.type} type match)`, type: 'success' });
      return true;
    }
    
    return false;
  }

  /**
   * ✅ NOUVEAU: Enregistre un mapping réussi dans le tracker
   */
  _recordSuccessfulMapping(actuator, channel, tracker, reason) {
    tracker.mappedActuators.add(actuator.index);
    
    if (!tracker.assignedChannels.has(channel.name)) {
      tracker.assignedChannels.set(channel.name, []);
      tracker.unmappedChannels.delete(channel.name);
    }
    
    tracker.assignedChannels.get(channel.name).push({
      actuatorIndex: actuator.index,
      reason: reason
    });
  }

  /**
   * ✅ NOUVEAU: Construit le résultat final de l'autoMap
   */
  _buildAutoMapResult(tracker, totalActuators) {
    const mapped = tracker.mappedActuators.size;
    const multiAssignedChannels = Array.from(tracker.assignedChannels.entries())
      .filter(([channelName, assignments]) => assignments.length > 1)
      .length;
    
    this.notify('status:core', { 
      message: `🎯 AutoMap completed: ${mapped}/${totalActuators} actuators mapped` +
              (multiAssignedChannels > 0 ? `, ${multiAssignedChannels} channels multi-assigned` : ''), 
      type: mapped > 0 ? 'success' : 'warning' 
    });
    
    // Détails statistiques
    const stats = tracker.statistics;
    if (stats.priorityByName > 0) {
      this.notify('status:core', { message: `📊 Priority mappings: ${stats.priorityByName} by name, ${stats.priorityByCapability} by capability, ${stats.priorityByType} by type`, type: 'log' });
    }
    if (stats.fallbackMultiAssignment > 0) {
      this.notify('status:core', { message: `📊 Fallback multi-assignments: ${stats.fallbackMultiAssignment}`, type: 'log' });
    }
    if (stats.incompatible > 0) {
      this.notify('status:core', { message: `📊 Incompatible actuators: ${stats.incompatible}`, type: 'log' });
    }
    
    return {
      mapped,
      total: totalActuators,
      skippedIncompatible: stats.incompatible,
      strategy: 'intelligent_persistent',
      statistics: {
        ...stats,
        multiAssignedChannels,
        unmappedChannels: tracker.unmappedChannels.size
      },
      details: {
        assignedChannels: Object.fromEntries(tracker.assignedChannels.entries()),
        unmappedChannels: Array.from(tracker.unmappedChannels)
      }
    };
  }

  // ============================================================================
  // UTILITAIRES POUR DEBUG ET GESTION MANUELLE
  // ============================================================================

  /**
   * ✅ NOUVEAU: Force l'oubli de tous les mappings précédents
   */
  clearAllPreviousMappings() {
    const actuators = this.buttplug.getActuators();
    let clearedCount = 0;
    
    for (const actuator of actuators) {
      if (actuator.hasPreviousMapping()) {
        actuator.forgetPreviousMapping();
        clearedCount++;
      }
    }
    
    this.notify('status:core', { message: `🧹 Cleared ${clearedCount} previous mappings`, type: 'info' });
    
    return { cleared: clearedCount, total: actuators.length };
  }

  /**
   * ✅ NOUVEAU: Diagnostic des mappings précédents
   */
  getPreviousMappingsDiagnostic() {
    const actuators = this.buttplug.getActuators();
    const channels = this.funscript.getChannelNames();
    
    const diagnostics = actuators.map(actuator => {
      const previousChannel = actuator.getPreviousMappedChannelName();
      const currentChannel = actuator.getAssignedChannelName();
      const isAvailable = previousChannel ? channels.includes(previousChannel) : false;
      const isCompatible = isAvailable ? actuator.canPlugTo(this.funscript.getChannel(previousChannel)) : false;
      
      return {
        actuatorIndex: actuator.index,
        capability: actuator.capability,
        type: actuator.type,
        currentChannel,
        previousChannel,
        isAvailable,
        isCompatible,
        canRestore: isAvailable && isCompatible
      };
    });
    
    const stats = {
      total: actuators.length,
      withPreviousMapping: diagnostics.filter(d => d.previousChannel).length,
      canRestore: diagnostics.filter(d => d.canRestore).length,
      lost: diagnostics.filter(d => d.previousChannel && !d.isAvailable).length,
      incompatible: diagnostics.filter(d => d.previousChannel && d.isAvailable && !d.isCompatible).length
    };
    
    return { diagnostics, stats };
  }
  
  getCompatibilityDiagnostic() {
    const allChannels = this.funscript.getChannels();
    const allActuators = this.buttplug.getActuators();
    
    if (allChannels.length === 0) {
      return { channels: [], actuators: [], issues: ['No funscript loaded'] };
    }
    
    const channelDiag = allChannels.map(channel => {
      const compatibleActuators = allActuators.filter(actuator => 
        channel.canPlugTo(actuator)
      ).map(actuator => actuator.index);
      
      return {
        channel: channel.name,
        type: channel.type,
        valueRange: channel.valueRange,
        compatibleActuators,
        isOrphaned: compatibleActuators.length === 0,
        connectedActuators: Array.from(channel.connectedActuators.keys())
      };
    });
    
    const actuatorDiag = allActuators.map(actuator => {
      const compatibleChannels = allChannels.filter(channel => 
        channel.canPlugTo(actuator)
      ).map(channel => channel.name);
      
      return {
        index: actuator.index,
        type: actuator.type,
        capability: actuator.capability,
        compatibleChannels,
        isUnused: compatibleChannels.length === 0,
        assignedChannel: actuator.getAssignedChannelName()
      };
    });
    
    const issues = [];
    const orphanedChannels = channelDiag.filter(c => c.isOrphaned);
    const unusedActuators = actuatorDiag.filter(a => a.isUnused);
    
    if (orphanedChannels.length > 0) {
      issues.push(`${orphanedChannels.length} channel(s) have no compatible actuators`);
    }
    if (unusedActuators.length > 0) {
      issues.push(`${unusedActuators.length} actuator(s) have no compatible channels`);
    }
    
    return {
      channels: channelDiag,
      actuators: actuatorDiag,
      issues
    };
  }
  
  // ============================================================================
  // STATUS & CLEANUP HELPERS (INCHANGÉ)
  // ============================================================================
  
  getStatus() {
    return {
      status: this.status,
      error: this.error,
      isReady: this.isReady,
      buttplug: this.buttplug.getStatus(),
      funscript: this.funscript?.getDebugInfo() || { loaded: false },
      playlist: this.playlist.getStats()
    };
  }
  
  async cleanup() {
    if (this._buttplug) {
      await this._buttplug.cleanup();
      this._buttplug = null;
    }
    
    if (this._playlist) {
      this._playlist.cleanup();
      this._playlist = null;
    }
    
    if (this._funscript) {
      this._funscript.reset();
      this._funscript = null;
    }
    
    this.status = 'idle';
    this.error = null;
    this.isReady = false;
    this.listeners.clear();
    
    if (this.logging.enableConsoleLogging) {
      console.log('Core: Cleanup complete');
    }

    if (this._logging) {
      this._logging.cleanup();
      this._logging = null;
    }
  }
}

export default FunPlayerCore;