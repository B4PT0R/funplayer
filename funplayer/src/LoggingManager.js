/**
 * LoggingManager - Gestionnaire centralisé des logs
 * 
 * RESPONSABILITÉS:
 * - Centralisation de tous les logs de l'application
 * - Formatage et persistance des messages de debug
 * - Interface unifiée pour les composants UI
 * - Rotation automatique des logs pour éviter les fuites mémoire
 * - Support console logging configurable
 * - Export/import des logs
 * 
 * ARCHITECTURE:
 * - Manager autonome (pas de dépendances vers autres managers)
 * - Interface simple et cohérente avec les autres managers
 * - Optimisé pour les performances (pas de reformat systématique)
 * - Extensible (niveaux, filtres, etc.)
 */

class LoggingManager {
  constructor(notify) {
    // ============================================================================
    // CONFIGURATION
    // ============================================================================
    this.notify=notify
    this.enableConsoleLogging = process.env.NODE_ENV !== 'production';
    this.maxDebugLogs = 1000;
    this.sessionStart = performance.now();
    
    // ============================================================================
    // STOCKAGE DES LOGS
    // ============================================================================
    this.debugLogs = [];
    
    // ============================================================================
    // TYPES ET EMOJIS
    // ============================================================================
    this.statusEmojis = {
      'log': '📝',
      'info': 'ℹ️',
      'success': '✅',
      'warning': '⚠️',
      'error': '❌',
      'processing': '⏳',
      'device': '🔌',
      'funscript': '📊',
      'playlist': '📋',
      'media': '🎬'
    };
  }
  
  
  // ============================================================================
  // CRÉATION ET FORMATAGE DES MESSAGES
  // ============================================================================
  
  /**
   * Crée un objet message structuré
   * @param {string} event - Nom de l'événement (ex: 'status:core', 'buttplug:device')
   * @param {object} data - Données du message { message, type, error }
   * @returns {object} Message structuré avec metadata
   */
  createMessage(event, data = {}) {
    return {
      timestamp: new Date().toISOString(),
      relativeTime: ((performance.now() - this.sessionStart) / 1000).toFixed(3),
      source: this._extractSource(event),
      type: data.type || 'log',
      message: data.message || '',
      error: data.error || null,
      event,
      id: this._generateMessageId()
    };
  }
  
  /**
   * ✅ CORRIGÉ: Formate un message pour l'affichage console avec type toujours visible
   * @param {object} messageObj - Message structuré
   * @param {boolean} includeTimestamp - Inclure le timestamp relatif
   * @returns {string} Message formaté
   */
  formatMessage(messageObj, includeTimestamp = false) {
    const emoji = this.statusEmojis[messageObj.type] || '📝';
    const time = includeTimestamp ? `[${messageObj.relativeTime.padStart(8)}s] ` : '';
    const source = `[${messageObj.source.padEnd(13)}]`;
    
    // ✅ CORRIGÉ: Toujours afficher un type, [INFO] par défaut pour 'log'
    const typeMap = {
      'log': 'LOG',
      'info': 'INFO', 
      'success': 'SUCCESS',
      'warning': 'WARNING',
      'error': 'ERROR',
      'processing': 'PROCESSING'
    };
    const typeLabel = typeMap[messageObj.type] || messageObj.type.toUpperCase();
    const type = `[${typeLabel.padEnd(13)}]`; // Alignement sur 11 chars pour [PROCESSING]
    
    const message = messageObj.message;
    const error = messageObj.error ? ` (ERROR: ${messageObj.error})` : '';
    
    return `${emoji} ${time}${source} ${type} ${message}${error}`;
  }
  
  // ============================================================================
  // AJOUT ET GESTION DES LOGS
  // ============================================================================
  
  addInitialSessionMessage(){
    this.notify('status:core', {
      message: 'FunPlayerCore session started',
      type: 'info'
    });
  }

  /**
   * Ajoute un message de log (interface principale)
   * @param {string} event - Nom de l'événement
   * @param {object} data - Données du message
   */
  log(event, data = {}) {
    // 1. Créer le message structuré
    const messageObj = this.createMessage(event, data);
    
    // 2. Stockage avec rotation automatique
    this._addMessage(messageObj);
    
    // 3. Console logging si activé
    if (this.enableConsoleLogging) {
      this._outputToConsole(messageObj);
    }

    this.notify?.("logging:new-message",{messageObj:messageObj})
    
    return messageObj;
  }
  
  // ============================================================================
  // RÉCUPÉRATION DES LOGS
  // ============================================================================
  
  /**
   * Récupère tous les logs bruts
   * @returns {Array} Copie des logs pour éviter les mutations
   */
  getLogs() {
    return [...this.debugLogs];
  }
  
  /**
   * Récupère les logs formatés pour l'affichage
   * @returns {string} Logs formatés avec timestamps
   */
  getFormattedLogs() {
    return this.debugLogs
      .map(msg => this.formatMessage(msg, true))
      .join('\n');
  }
  
  /**
   * Filtre les logs par critères
   * @param {object} filters - { source, type, since, until }
   * @returns {Array} Logs filtrés
   */
  getFilteredLogs(filters = {}) {
    return this.debugLogs.filter(log => {
      if (filters.source && log.source !== filters.source) return false;
      if (filters.type && log.type !== filters.type) return false;
      if (filters.since && new Date(log.timestamp) < filters.since) return false;
      if (filters.until && new Date(log.timestamp) > filters.until) return false;
      return true;
    });
  }
  
  // ============================================================================
  // GESTION DES LOGS
  // ============================================================================
  
  /**
   * Vide tous les logs
   */
  clear() {
    this.debugLogs = [];
    this.sessionStart = performance.now();
    
    // Ajouter le message initial
    this.addInitialSessionMessage();
    
    // Notifier les listeners
    this.notify('status:logging', {message:"Logs cleared", type:'info'});
  }
  
  /**
   * Génère le contenu complet des logs pour export
   * @returns {string} Contenu formaté pour fichier
   */
  generateExportContent() {
    const header = `FunPlayer Debug Log
Generated: ${new Date().toISOString()}
Total entries: ${this.debugLogs.length}
Session duration: ${((performance.now() - this.sessionStart) / 1000).toFixed(1)}s
Console logging: ${this.enableConsoleLogging ? 'enabled' : 'disabled'}

${'='.repeat(80)}

`;
    
    const content = this.debugLogs
      .map(msg => this.formatMessage(msg, true))
      .join('\n');
    
    return header + content;
  }
  
  // ============================================================================
  // CONFIGURATION
  // ============================================================================
  
  /**
   * Active/désactive le logging console
   * @param {boolean} enabled 
   */
  setConsoleLogging(enabled) {
    this.enableConsoleLogging = enabled;
    this.notify?.('status:config', { 
      message: `Console logging ${enabled ? 'enabled' : 'disabled'}`,
      type: 'info'
    });
  }
  
  getConsoleLogging() {
    return this.enableConsoleLogging;
  }
  
  /**
   * Configure la limite de logs
   * @param {number} maxLogs 
   */
  setMaxLogs(maxLogs) {
    this.maxDebugLogs = Math.max(100, maxLogs); // Minimum 100
    this._rotateLogsIfNeeded();
    
    this.notify?.('logging:config', { 
      message: `Max logs set to ${this.maxDebugLogs}`,
      type: 'info'
    });
  }
  
  getMaxLogs() {
    return this.maxDebugLogs;
  }
  
  // ============================================================================
  // MÉTHODES PRIVÉES
  // ============================================================================
  
  _addMessage(messageObj) {
    this.debugLogs.push(messageObj);
    this._rotateLogsIfNeeded();
  }
  
  _rotateLogsIfNeeded() {
    if (this.debugLogs.length > this.maxDebugLogs) {
      this.debugLogs = this.debugLogs.slice(-this.maxDebugLogs);
    }
  }
  
  _extractSource(event) {
    return event.split(':')[1] || event.split(':')[0] || 'unknown';
  }
  
  _generateMessageId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  
  _outputToConsole(messageObj) {
    const formattedMsg = this.formatMessage(messageObj);
    
    switch (messageObj.type) {
      case 'error':
        console.error(formattedMsg, messageObj.error || '');
        break;
      case 'warning':
        console.warn(formattedMsg);
        break;
      case 'info':
      case 'success':
        console.info(formattedMsg);
        break;
      default:
        console.log(formattedMsg);
    }
  }
}

export default LoggingManager;