/**
 * FunPlayerEvents.js - ✅ Mapping complet événements Video.js + Haptic → Web Component
 * 
 * Centralise tous les événements supportés par FunPlayer pour faciliter :
 * - La création du Web Component
 * - La documentation de l'API
 * - La maintenance des événements
 */

// ============================================================================
// ÉVÉNEMENTS VIDEO.JS HTML5 SUPPORTÉS
// ============================================================================

export const VIDEO_JS_EVENTS = {
  // Playback Control Events
  PLAY: 'play',
  PAUSE: 'pause', 
  ENDED: 'ended',
  
  // Seeking Events
  SEEKING: 'seeking',
  SEEKED: 'seeked',
  
  // Time Events
  TIME_UPDATE: 'timeupdate',
  DURATION_CHANGE: 'durationchange',
  
  // Loading Events
  LOAD_START: 'loadstart',
  LOADED_DATA: 'loadeddata',
  LOADED_METADATA: 'loadedmetadata',
  CAN_PLAY: 'canplay',
  CAN_PLAY_THROUGH: 'canplaythrough',
  
  // Buffering Events
  WAITING: 'waiting',
  STALLED: 'stalled',
  SUSPEND: 'suspend',
  
  // Volume Events
  VOLUME_CHANGE: 'volumechange',
  
  // Error Events
  ERROR: 'error',
  
  // Size Events
  RESIZE: 'resize'
};

// Événements spécifiques FunPlayer
export const FUNPLAYER_EVENTS = {
  PLAYLIST_ITEM_CHANGE: 'playlistitemchange',
  DEVICE_CONNECT: 'deviceconnect',
  DEVICE_DISCONNECT: 'devicedisconnect',
  HAPTIC_START: 'hapticstart',
  HAPTIC_STOP: 'hapticstop'
};

// ============================================================================
// TABLE DE MAPPING POUR CAMELCASE CORRECT
// ============================================================================

/**
 * Mapping manuel des événements vers les noms de callback camelCase
 * Respecte les conventions web standards (comme React fait avec les événements HTML5)
 */
const EVENT_NAME_MAPPINGS = {
  // ========== VIDEO.JS / HTML5 EVENTS ==========
  
  // Playback Control Events
  'play': 'onPlay',
  'pause': 'onPause', 
  'ended': 'onEnded',
  
  // Seeking Events
  'seeking': 'onSeeking',
  'seeked': 'onSeeked',
  
  // Time Events - ✅ CORRIGÉ: segmentation intelligente
  'timeupdate': 'onTimeUpdate',
  'durationchange': 'onDurationChange',
  
  // Loading Events - ✅ CORRIGÉ: segmentation intelligente
  'loadstart': 'onLoadStart',
  'loadeddata': 'onLoadedData',
  'loadedmetadata': 'onLoadedMetadata',
  'canplay': 'onCanPlay',
  'canplaythrough': 'onCanPlayThrough',
  
  // Buffering Events
  'waiting': 'onWaiting',
  'stalled': 'onStalled',
  'suspend': 'onSuspend',
  
  // Volume Events - ✅ CORRIGÉ: segmentation intelligente
  'volumechange': 'onVolumeChange',
  
  // Error Events
  'error': 'onError',
  
  // Size Events
  'resize': 'onResize',
  
  // ========== FUNPLAYER EVENTS ==========
  
  // ✅ CORRIGÉ: segmentation intelligente des événements FunPlayer
  'playlistitemchange': 'onPlaylistItemChange',
  'deviceconnect': 'onDeviceConnect',
  'devicedisconnect': 'onDeviceDisconnect',
  'hapticstart': 'onHapticStart',
  'hapticstop': 'onHapticStop'
};

/**
 * ✅ NOUVELLE FONCTION: Convertit un nom d'événement vers le nom de callback
 * @param {string} eventName - Nom de l'événement (ex: 'timeupdate')
 * @returns {string} Nom du callback (ex: 'onTimeUpdate')
 */
function getCallbackNameFromEvent(eventName) {
  // Utiliser le mapping explicite en priorité
  if (EVENT_NAME_MAPPINGS[eventName]) {
    return EVENT_NAME_MAPPINGS[eventName];
  }
  
  // Fallback: camelCase automatique pour événements non mappés
  // (garde tirets/underscores existants mais improbable d'être utilisé)
  return `on${eventName
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')}`;
}

// ============================================================================
// MAPPING POUR WEB COMPONENT
// ============================================================================

/**
 * ✅ CORRIGÉ: Tous les événements exposés par le Web Component FunPlayer
 * Format: { eventName: 'callback_prop_name' }
 */
export const FUNPLAYER_WEB_COMPONENT_EVENTS = {
  // Video.js HTML5 Events - utilise la nouvelle fonction
  ...Object.fromEntries(
    Object.values(VIDEO_JS_EVENTS).map(event => [event, getCallbackNameFromEvent(event)])
  ),
  
  // FunPlayer specific events - utilise la nouvelle fonction
  ...Object.fromEntries(
    Object.values(FUNPLAYER_EVENTS).map(event => [event, getCallbackNameFromEvent(event)])
  )
};

/**
 * Liste des événements pour documentation/validation
 */
export const ALL_SUPPORTED_EVENTS = [
  ...Object.values(VIDEO_JS_EVENTS),
  ...Object.values(FUNPLAYER_EVENTS)
];

// ============================================================================
// UTILITAIRES POUR WEB COMPONENT
// ============================================================================

/**
 * ✅ SUPPRIMÉ: l'ancienne fonction capitalize défectueuse
 * Remplacée par getCallbackNameFromEvent() avec table de mapping
 */

/**
 * Crée les props callbacks pour FunPlayer depuis les attributs Web Component
 * 
 * @param {HTMLElement} webComponentElement 
 * @returns {Object} Props callbacks pour FunPlayer
 */
export function createCallbackProps(webComponentElement) {
  const callbacks = {};
  
  // Pour chaque événement supporté, créer un callback qui dispatch un CustomEvent
  ALL_SUPPORTED_EVENTS.forEach(eventName => {
    const callbackName = FUNPLAYER_WEB_COMPONENT_EVENTS[eventName];
    
    callbacks[callbackName] = (data) => {
      // Dispatch event standard DOM
      webComponentElement.dispatchEvent(
        new CustomEvent(`funplayer-${eventName}`, {
          detail: data,
          bubbles: true,
          cancelable: true
        })
      );
      
      // Support callback direct (si défini comme propriété)
      const directCallback = webComponentElement[callbackName];
      if (typeof directCallback === 'function') {
        try {
          directCallback(data);
        } catch (error) {
          console.error(`❌ Error in direct callback ${callbackName}:`, error);
        }
      }
      
      // Support callback via attribut HTML (pour simple integration)
      const attrCallback = webComponentElement.getAttribute(callbackName.toLowerCase());
      if (attrCallback && typeof window[attrCallback] === 'function') {
        try {
          window[attrCallback](data);
        } catch (error) {
          console.error(`❌ Error in attribute callback ${attrCallback}:`, error);
        }
      }
    };
  });
  
  return callbacks;
}

/**
 * Crée la documentation des événements pour le Web Component
 */
export function getEventDocumentation() {
  const docs = {
    videoJsEvents: {},
    funPlayerEvents: {},
    usage: {}
  };
  
  // Documentation Video.js events
  Object.entries(VIDEO_JS_EVENTS).forEach(([key, eventName]) => {
    const callbackName = FUNPLAYER_WEB_COMPONENT_EVENTS[eventName];
    docs.videoJsEvents[eventName] = {
      callback: callbackName,
      domEvent: `funplayer-${eventName}`,
      description: getEventDescription(eventName),
      dataStructure: getEventDataStructure(eventName)
    };
  });
  
  // Documentation FunPlayer events
  Object.entries(FUNPLAYER_EVENTS).forEach(([key, eventName]) => {
    const callbackName = FUNPLAYER_WEB_COMPONENT_EVENTS[eventName];
    docs.funPlayerEvents[eventName] = {
      callback: callbackName,
      domEvent: `funplayer-${eventName}`,
      description: getEventDescription(eventName),
      dataStructure: getEventDataStructure(eventName)
    };
  });
  
  // ✅ CORRIGÉ: Exemples d'usage avec les nouveaux noms camelCase
  docs.usage = {
    htmlAttributes: `<funplayer onplay="handlePlay" ontimeupdate="handleTimeUpdate" onresize="handleResize"></funplayer>`,
    directCallbacks: `player.onPlay = (data) => console.log(data); player.onTimeUpdate = (data) => updateProgress(data);`,
    domEvents: `player.addEventListener('funplayer-play', (e) => console.log(e.detail)); player.addEventListener('funplayer-timeupdate', (e) => updateUI(e.detail));`,
    dynamicCreation: `FunPlayer.create('#container', { onPlay: handlePlay, onTimeUpdate: handleTimeUpdate, onResize: handleResize })`
  };
  
  return docs;
}

/**
 * Descriptions des événements
 */
function getEventDescription(eventName) {
  const descriptions = {
    // Playback events
    'play': 'Fired when playback starts',
    'pause': 'Fired when playback is paused', 
    'ended': 'Fired when playback reaches the end',
    
    // Seeking events
    'seeking': 'Fired when seeking starts',
    'seeked': 'Fired when seeking completes',
    
    // Time events
    'timeupdate': 'Fired periodically during playback (usually 15-250ms intervals)',
    'durationchange': 'Fired when media duration changes',
    
    // Loading events
    'loadstart': 'Fired when loading starts',
    'loadeddata': 'Fired when media data is loaded',
    'loadedmetadata': 'Fired when metadata is loaded (duration, dimensions, etc.)',
    'canplay': 'Fired when enough data is available to start playback',
    'canplaythrough': 'Fired when entire media can play without buffering',
    
    // Buffering events
    'waiting': 'Fired when playback stops due to buffering',
    'stalled': 'Fired when download has stopped unexpectedly',
    'suspend': 'Fired when loading is intentionally suspended',
    
    // Volume events
    'volumechange': 'Fired when volume or muted state changes',
    
    // Error events
    'error': 'Fired when an error occurs during loading or playback',
    
    // Size events
    'resize': 'Fired when player dimensions change',
    
    // FunPlayer events
    'playlistitemchange': 'Fired when playlist advances to next/previous item',
    'deviceconnect': 'Fired when a haptic device connects',
    'devicedisconnect': 'Fired when a haptic device disconnects',
    'hapticstart': 'Fired when haptic playback begins',
    'hapticstop': 'Fired when haptic playback stops'
  };
  
  return descriptions[eventName] || 'Event fired during media interaction';
}

/**
 * Structures de données des événements
 */
function getEventDataStructure(eventName) {
  const structures = {
    // Time-based events
    'play': '{ currentTime: number, duration: number }',
    'pause': '{ currentTime: number, duration: number }',
    'timeupdate': '{ currentTime: number, duration: number }', 
    'seeking': '{ currentTime: number, seekingTo: number }',
    'seeked': '{ currentTime: number, duration: number }',
    'durationchange': '{ duration: number }',
    
    // Loading events
    'loadedmetadata': '{ duration: number, videoWidth?: number, videoHeight?: number }',
    'canplay': '{ currentTime: number, duration: number }',
    'canplaythrough': '{ currentTime: number, duration: number }',
    'waiting': '{ currentTime: number, reason: string }',
    
    // Volume events  
    'volumechange': '{ volume: number, muted: boolean }',
    
    // Size events
    'resize': '{ width: number, height: number }',
    
    // Error events
    'error': '{ message: string, code: number, error?: Error }',
    
    // Device events
    'deviceconnect': '{ device: object, name: string }',
    'devicedisconnect': '{ device: object, name: string }',
    
    // Haptic events
    'hapticstart': '{ channels: number, updateRate: number }',
    'hapticstop': '{ reason: string }',
    
    // Simple events
    'ended': '{ currentTime: 0 }',
    'loadstart': '{ }',
    'stalled': '{ currentTime: number }',
    'suspend': '{ currentTime: number }'
  };
  
  return structures[eventName] || '{ }';
}

// ============================================================================
// UTILITAIRES DE VALIDATION
// ============================================================================

/**
 * Valide qu'un événement est supporté
 * @param {string} eventName 
 * @returns {boolean}
 */
export function isSupportedEvent(eventName) {
  return ALL_SUPPORTED_EVENTS.includes(eventName);
}

/**
 * Obtient le nom du callback pour un événement
 * @param {string} eventName 
 * @returns {string|null}
 */
export function getCallbackName(eventName) {
  return FUNPLAYER_WEB_COMPONENT_EVENTS[eventName] || null;
}

/**
 * Obtient le nom de l'événement DOM pour un événement
 * @param {string} eventName 
 * @returns {string}
 */
export function getDomEventName(eventName) {
  return `funplayer-${eventName}`;
}

// ============================================================================
// EXPORT DEFAULT POUR USAGE SIMPLE
// ============================================================================

export default {
  // Constantes
  VIDEO_JS_EVENTS,
  FUNPLAYER_EVENTS,
  ALL_SUPPORTED_EVENTS,
  FUNPLAYER_WEB_COMPONENT_EVENTS,
  
  // Fonctions principales
  createCallbackProps,
  getEventDocumentation,
  
  // Utilitaires
  isSupportedEvent,
  getCallbackName,
  getDomEventName,
  
  // ✅ AJOUTÉ: Nouvelle fonction de conversion
  getCallbackNameFromEvent,
  
  // Métadonnées
  eventCount: ALL_SUPPORTED_EVENTS.length,
  version: '1.0.0'
};