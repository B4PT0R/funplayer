/**
 * types.js - Types et enums centralisés pour FunPlayer
 * 
 * RESPONSABILITÉS:
 * - Définitions des types de base utilisés dans toute l'application
 * - Enums pour les signaux haptiques et actions d'actuateurs
 * - Mappings et utilitaires de compatibilité
 * - Types pour les événements et états
 */

// ============================================================================
// TYPES DE SIGNAUX HAPTIQUES
// ============================================================================

/**
 * Type de signal haptique - détermine la compatibilité canal/actuateur
 * un canal peut contrôler un actuateur ssi ils ont le même HapticType
 * un actuateur est POLAR s'il gère rotate, SCALAR dans tout autre cas
 * un canal est POLAR s'il est orienté (valeur signée), SCALAR si valeurs >0
 */
export const HapticType = {
  SCALAR: 'scalar',  // Signal unidirectionnel (0 à 1) - pour linear, vibrate, oscillate
  POLAR: 'polar'     // Signal bidirectionnel (-1 à +1) - pour rotate
};

/**
 * Type de commande prise en charge par l'actuateur - détermine la commande envoyée au device
 */
export const Capability = {
  LINEAR: 'linear',      // Mouvement linéaire
  VIBRATE: 'vibrate',    // Vibration
  OSCILLATE: 'oscillate', // Oscillation
  ROTATE: 'rotate'       // Rotation
};

/**
 * Mapping action → type de signal par défaut
 */
export const CapabilityToHapticType = {
  [Capability.LINEAR]: HapticType.SCALAR,
  [Capability.VIBRATE]: HapticType.SCALAR,
  [Capability.OSCILLATE]: HapticType.SCALAR,
  [Capability.ROTATE]: HapticType.POLAR
};


// ============================================================================
// TYPES D'ÉVÉNEMENTS MANAGER
// ============================================================================

/**
 * Types d'événements pour le système de messaging entre managers
 */
export const EventType = {
  // ButtPlug events
  BUTTPLUG_CONNECTION: 'buttplug:connection',
  BUTTPLUG_DEVICE: 'buttplug:device',
  BUTTPLUG_ERROR: 'buttplug:error',
  BUTTPLUG_CONFIG: 'buttplug:config',
  BUTTPLUG_MAPPING: 'buttplug:mapping',
  BUTTPLUG_GLOBAL_SCALE: 'buttplug:globalScale',
  BUTTPLUG_GLOBAL_OFFSET: 'buttplug:globalOffset',
  BUTTPLUG_ACTUATOR_OPTIONS: 'buttplug:actuatorOptions',
  
  // Funscript events
  FUNSCRIPT_LOAD: 'funscript:load',
  FUNSCRIPT_RESET: 'funscript:reset',
  FUNSCRIPT_CHANNELS: 'funscript:channels',
  
  // Playlist events
  PLAYLIST_LOADED: 'playlist:loaded',
  PLAYLIST_ITEM_CHANGED: 'playlist:itemChanged',
  PLAYLIST_PLAYBACK_CHANGED: 'playlist:playbackChanged',
  PLAYLIST_ITEM_UPDATED: 'playlist:itemUpdated',
  PLAYLIST_ERROR: 'playlist:error',
  
  // Combined manager events
  CORE_AUTO_CONNECT: 'core:autoConnect',
  CORE_AUTO_MAP: 'core:autoMap'
};

// ============================================================================
// TYPES D'ÉTAT PLAYBACK
// ============================================================================

/**
 * États de lecture possibles
 */
export const PlaybackState = {
  IDLE: 'idle',
  LOADING: 'loading',
  READY: 'ready',
  PLAYING: 'playing',
  PAUSED: 'paused',
  ENDED: 'ended',
  ERROR: 'error'
};

/**
 * Types de media supportés
 */
export const MediaType = {
  VIDEO: 'video',
  AUDIO: 'audio',
  HAPTIC: 'haptic',
  VIDEO_HAPTIC: 'video_haptic',
  AUDIO_HAPTIC: 'audio_haptic',
};

// ============================================================================
// CONFIGURATION PAR DÉFAUT
// ============================================================================

/**
 * Configuration par défaut d'un actuateur
 */
export const DEFAULT_ACTUATOR_SETTINGS = {
  enabled: true,
  scale: 1.0,
  invert: false,
  timeOffset: 0.0
};

/**
 * Configuration par défaut d'un canal
 */
export const DEFAULT_CHANNEL_CONFIG = {
  timeField: 'at',
  valueField: 'pos',
  directionField: null
};

/**
 * Paramètres de performance par défaut
 */
export const DEFAULT_PERFORMANCE = {
  UPDATE_RATE: 60,           // Hz - fréquence de la boucle haptique
  SEEK_THRESHOLD: 100,       // ms - seuil pour détecter un seek vs progression
  MIN_COMMAND_INTERVAL: 16,  // ms - intervalle minimum entre commandes
  MAX_FILE_SIZE_MB: 200      // MB - taille max des fichiers uploadés
};

// ============================================================================
// TYPES DE VALIDATION
// ============================================================================

/**
 * Types MIME supportés pour les media
 */
export const SUPPORTED_MEDIA_TYPES = {
  VIDEO: [
    'video/mp4', 'video/webm', 'video/quicktime', 
    'video/x-msvideo', 'video/x-matroska', 'video/ogg'
  ],
  AUDIO: [
    'audio/mpeg', 'audio/wav', 'audio/ogg', 
    'audio/mp4', 'audio/aac', 'audio/flac'
  ],
  STREAMING: [
    'application/x-mpegURL',     // HLS
    'application/dash+xml',      // DASH
    'application/vnd.ms-sstr+xml' // Smooth Streaming
  ]
};

/**
 * Extensions de fichiers supportées
 */
export const SUPPORTED_EXTENSIONS = {
  VIDEO: ['.mp4', '.webm', '.mov', '.avi', '.mkv', '.ogv', '.m4v'],
  AUDIO: ['.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac'],
  FUNSCRIPT: ['.funscript', '.json'],
  IMAGE: ['.jpg', '.jpeg', '.png', '.gif', '.webp']
};

// ============================================================================
// UTILITAIRES DE VALIDATION
// ============================================================================

/**
 * Vérifie si un type MIME est supporté
 */
export const isSupportedMimeType = (mimeType) => {
  return Object.values(SUPPORTED_MEDIA_TYPES)
    .flat()
    .includes(mimeType.toLowerCase());
};

/**
 * Vérifie si une extension est supportée
 */
export const isSupportedExtension = (extension) => {
  const ext = extension.toLowerCase();
  return Object.values(SUPPORTED_EXTENSIONS)
    .flat()
    .includes(ext);
};

/**
 * Détermine le type de media depuis un MIME type
 */
export const getMediaTypeFromMime = (mimeType) => {
  const mime = mimeType.toLowerCase();
  
  if (SUPPORTED_MEDIA_TYPES.VIDEO.includes(mime)) {
    return MediaType.VIDEO;
  }
  if (SUPPORTED_MEDIA_TYPES.AUDIO.includes(mime)) {
    return MediaType.AUDIO;
  }
  if (SUPPORTED_MEDIA_TYPES.STREAMING.includes(mime)) {
    return MediaType.VIDEO; // Traiter streaming comme vidéo
  }
  
  return null;
};

/**
 * Détecte le type MIME depuis une extension
 */
export const getMimeTypeFromExtension = (extension) => {
  const ext = extension.toLowerCase();
  
  const mimeMap = {
    // Video
    '.mp4': 'video/mp4',
    '.webm': 'video/webm', 
    '.mov': 'video/quicktime',
    '.avi': 'video/x-msvideo',
    '.mkv': 'video/x-matroska',
    '.ogv': 'video/ogg',
    '.m4v': 'video/mp4',
    
    // Audio
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.ogg': 'audio/ogg',
    '.m4a': 'audio/mp4',
    '.aac': 'audio/aac',
    '.flac': 'audio/flac',
    
    // Funscript
    '.funscript': 'application/json',
    '.json': 'application/json',
    
    // Images
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp'
  };
  
  return mimeMap[ext] || 'application/octet-stream';
};

// ============================================================================
// EXPORTS GROUPÉS
// ============================================================================

export const Types = {
  HapticType,
  Capability,
  EventType,
  PlaybackState,
  MediaType
};

export const Config = {
  DEFAULT_ACTUATOR_SETTINGS,
  DEFAULT_CHANNEL_CONFIG,
  DEFAULT_PERFORMANCE
};

export const Validation = {
  SUPPORTED_MEDIA_TYPES,
  SUPPORTED_EXTENSIONS,
  isSupportedMimeType,
  isSupportedExtension,
  getMediaTypeFromMime,
  getMimeTypeFromExtension
};

export default {
  ...Types,
  ...Config,
  ...Validation,
  CapabilityToHapticType
};