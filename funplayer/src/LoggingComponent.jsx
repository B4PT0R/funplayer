import React, { Component } from 'react';
import FeatherIcon from './FeatherIcon';

/**
 * LoggingComponent - Composant de debug ultra-simplifié
 * 
 * RESPONSABILITÉS:
 * - Affichage des logs centralisés de Core
 * - Interface pour clear/download/copy
 * - Style cohérent avec MediaPlayer
 * - Pure couche d'affichage (pas de logique métier)
 */
class LoggingComponent extends Component {
  constructor(props) {
    super(props);

    this.core=props.core
    
    this.state = {
      autoScroll: true
    };
    
    this.textareaRef = React.createRef();
    this.coreListener = null;
    this.resizeObserver = null;
  }

  // ============================================================================
  // LIFECYCLE
  // ============================================================================

  componentDidMount() {
    this.coreListener = this.core.addListener(this.handleEvent);
    this.updateTextarea(); // Charger les logs existants
    if (this.props.visible) {
      setTimeout(() => {
        this.setupResizeObserver();
      }, 10);
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.visible && this.props.visible) {
      setTimeout(() => {
        this.setupResizeObserver();
      }, 10);
    }
    
    if (prevProps.visible && !this.props.visible) {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
        this.resizeObserver = null;
      }
    }
  }

  componentWillUnmount() {
    console.log("LoggingComponent unmounting");
    
    if (this.coreListener) {
      this.coreListener();
      this.coreListener = null;
    }
    
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  // ============================================================================
  // RESIZE OBSERVER
  // ============================================================================

  setupResizeObserver = () => {

    if (!this.textareaRef.current || !window.ResizeObserver) return;
    
    this.resizeObserver = new ResizeObserver(() => {
      // Déclencher resize parent quand la textarea change de taille
      setTimeout(() => {
        this.core.notify('component:resize', {
          source: 'LoggingComponent',
          reason: 'textarea-content-changed'
        });
      }, 0);
    });
    
    this.resizeObserver.observe(this.textareaRef.current);
  }

  // ============================================================================
  // GESTION D'ÉVÉNEMENTS - SIMPLIFIÉ
  // ============================================================================

  handleEvent = (event, data) => {
    // Rerender sur tous les événements status:* (nouveaux logs dans Core)
    if (event.startsWith('status:')) {
      this.updateTextarea();
    }
  }

  // ============================================================================
  // GESTION DES LOGS - ULTRA-SIMPLIFIÉ
  // ============================================================================

  updateTextarea = () => {
    if (this.textareaRef.current) {
      // Récupère les messages formatés depuis Core
      this.textareaRef.current.value = this.core.logging.getFormattedLogs();
      
      // Auto-scroll si activé
      if (this.state.autoScroll) {
        this.textareaRef.current.scrollTop = this.textareaRef.current.scrollHeight;
      }
    }
  }

  // ============================================================================
  // ACTIONS
  // ============================================================================

  handleClear = () => {
    this.core.logging.clear();
  }

  handleDownload = () => {
    const content = this.core.generateExportContent();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const filename = `funplayer-debug-${timestamp}.log`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    this.core.notify?.('status:logging', { message: `Debug logs downloaded: ${filename}`, type: 'success' });
  }

  handleCopy = async () => {
    try {
      const content = this.core.generateExportContent();
      await navigator.clipboard.writeText(content);
      this.core.notify?.('status:logging', { message: 'Debug logs copied to clipboard', type: 'success' });
    } catch (error) {
      // Fallback: sélectionner le texte
      if (this.textareaRef.current) {
        this.textareaRef.current.select();
        this.core.notify?.('status:logging', { message: 'Logs selected, press Ctrl+C to copy', type: 'info' });
      }
    }
  }

  handleToggleAutoScroll = () => {
    this.setState(prevState => ({ 
      autoScroll: !prevState.autoScroll 
    }));
  }

  // ============================================================================
  // RENDER
  // ============================================================================
    
  render() {
    const { visible = true } = this.props;  // ✅ Défaut visible pour rétrocompatibilité
  
    if (!visible) {
      return null;  // ✅ Plus propre pour un composant debug
    }

    const { autoScroll } = this.state;
    const logCount = this.core.logging.getLogs().length;
    
    return (
      <div className="fp-logging">
        
        {/* Header avec titre et actions */}
        <div className="fp-logging-header">
          
          {/* Zone titre */}
          <div className="fp-logging-title">
            {/* ✅ MODIFIÉ: Feather icon au lieu d'emoji */}
            <FeatherIcon 
              name="file-text" 
              size={16} 
              className="fp-icon"
            />
            <span className="fp-logging-label">Debug Logs</span>
            <span className="fp-logging-count">{logCount}</span>
          </div>
          
          {/* Zone actions */}
          <div className="fp-logging-actions">
            <button 
              className="fp-logging-clear-btn"
              onClick={this.handleClear}
              title="Clear logs"
            >
              {/* ✅ MODIFIÉ: Feather icon trash */}
              <FeatherIcon 
                name="trash-2" 
                size={14} 
                className="fp-icon-button"
              />
            </button>
            
            <button 
              className="fp-logging-download-btn"
              onClick={this.handleDownload}
              title="Download logs"
            >
              {/* ✅ MODIFIÉ: Feather icon download */}
              <FeatherIcon 
                name="download" 
                size={14} 
                className="fp-icon-button"
              />
            </button>
            
            <button 
              className="fp-logging-copy-btn"
              onClick={this.handleCopy}
              title="Copy to clipboard"
            >
              {/* ✅ MODIFIÉ: Feather icon copy */}
              <FeatherIcon 
                name="copy" 
                size={14} 
                className="fp-icon-button"
              />
            </button>
            
            <button 
              className={`fp-logging-autoscroll-btn ${autoScroll ? 'fp-logging-autoscroll-btn-active' : ''}`}
              onClick={this.handleToggleAutoScroll}
              title="Toggle auto-scroll"
            >
              {/* ✅ MODIFIÉ: Feather icons pour autoscroll */}
              <FeatherIcon 
                name={autoScroll ? "lock" : "unlock"} 
                size={14} 
                className="fp-icon-button"
              />
            </button>
          </div>
          
        </div>
        
        {/* Zone de logs */}
        <textarea
          ref={this.textareaRef}
          className="fp-logging-textarea"
          readOnly
          placeholder="Debug logs will appear here..."
        />
        
      </div>
    );
  }
}

export default LoggingComponent;