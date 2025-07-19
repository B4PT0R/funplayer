import React, { Component } from 'react';
import FeatherIcon from './FeatherIcon'; // ✅ AJOUTÉ: Import du nouveau composant

/**
 * ButtPlugSettingsComponent - ✅ NETTOYÉ: UI pure sans notifications
 * 
 * RESPONSABILITÉS SIMPLIFIÉES:
 * - Barre horizontale compacte (status + actions)
 * - Appels directs this.core.xxx (pas d'indirections)
 * - Re-render sur événements choisis uniquement
 * - ✅ CLEAN: Pas de notifications status (c'est aux managers de le faire)
 * 
 * ✅ MODIFIÉ: Utilise FeatherIcon au lieu d'emojis
 */
class ButtPlugSettingsComponent extends Component {
  constructor(props) {
    super(props);

    this.core = props.core
    
    this.state = {
      isAutoConnecting: false,
      isRescanActive: false,  // ✅ NOUVEAU: État pour le bouton rescan
      renderTrigger: 0
    };
    
    this.coreListener = null;
  }

  componentDidMount() {
    this.coreListener = this.core.addListener(this.handleEvent);
  }

  componentWillUnmount() {
    if (this.coreListener) {
      this.coreListener();
      this.coreListener = null;
    }
  }

  // ============================================================================
  // GESTION D'ÉVÉNEMENTS GRANULAIRES - Filtrage des événements buttplug
  // ============================================================================

  handleEvent = (event, data) => {
    // Filtrage intelligent: Ne réagir qu'aux événements buttplug
    const buttplugEvents = [
      'buttplug:connection',    // Status connexion changé
      'buttplug:scan',          // Scan démarré/arrêté
      'buttplug:device',        // Device sélectionné
      'funscript:load',         // Nouveaux canaux → affecte la validité connection
      'funscript:channels'      // Canaux mis à jour → affecte la validité connection
    ];
    
    if (buttplugEvents.includes(event)) {
      this._triggerRender();
      
      // Reset des états temporaires
      if (event === 'buttplug:connection') {
        this.setState({ isAutoConnecting: false });
      }
      if (event === 'buttplug:scan') {
        this.setState({ isRescanActive: false });
      }
    }
  }

  _triggerRender = () => {
    this.setState(prevState => ({ 
      renderTrigger: prevState.renderTrigger + 1 
    }));
  }

  // ============================================================================
  // ACTIONS SIMPLIFIÉES - Appels directs core, pas d'indirections
  // ============================================================================

  handleAutoConnect = async () => {
    if (this.state.isAutoConnecting) return;
    
    this.setState({ isAutoConnecting: true });
    
    try {
      // Appel direct core - les notifications seront faites par ButtPlugManager
      const success = await this.core.buttplug.connect();
      
      if (success) {
        // Auto-scan après connexion réussie
        await this.core.buttplug.scan();
      }
    } catch (error) {
      console.error('Auto-connect failed:', error);
    }
    
    // L'état sera reset par l'événement buttplug:connection
  }

  handleDisconnect = async () => {
    try {
      // Appel direct core - les notifications seront faites par ButtPlugManager
      await this.core.buttplug.disconnect();
    } catch (error) {
      console.error('Disconnect failed:', error);
    }
  }

  handleRescan = async () => {
    if (this.state.isRescanActive) return;
    
    this.setState({ isRescanActive: true });
    
    try {
      // Appel direct core - les notifications seront faites par ButtPlugManager
      await this.core.buttplug.scan();
    } catch (error) {
      console.error('Rescan failed:', error);
    }
    
    // L'état sera reset par l'événement buttplug:scan
  }

  handleDeviceChange = (deviceIndex) => {
    try {
      const numericIndex = deviceIndex === '-1' ? -1 : parseInt(deviceIndex);
      // Appel direct core - les notifications seront faites par ButtPlugManager
      this.core.buttplug.selectDevice(numericIndex);
    } catch (error) {
      console.error('Device selection failed:', error);
    }
  }

  // ============================================================================
  // RENDER SIMPLIFIÉ - Accès direct aux données via core
  // ============================================================================

  render() {
    const { 
      onToggleSettings, 
      isSettingsExpanded 
    } = this.props;
    
    const { isAutoConnecting, isRescanActive } = this.state;
    
    // Accès direct core pour toutes les données
    const buttplugStatus = this.core.buttplug.getStatus();
    const funscriptChannels = this.core.funscript.getChannelNames();
    const devices = this.core.buttplug.getDevices();
    const selectedDevice = this.core.buttplug.getSelected();
    
    const isConnected = buttplugStatus?.isConnected || false;
    
    return (
      <div className="fp-buttplug-settings">
        
        {/* Zone status à gauche */}
        <div className="fp-buttplug-settings-status">
          {/* ✅ MODIFIÉ: Feather icon au lieu d'emoji pour le statut */}
          <FeatherIcon 
            name={isConnected ? "wifi" : "wifi-off"} 
            size={18} 
            className="fp-buttplug-settings-connection-icon"
          />
          <span className="fp-buttplug-settings-device-name">
            {selectedDevice?.name || 'Unknown device'}
          </span>
          {funscriptChannels.length === 0 && (
            <span className="fp-buttplug-settings-no-haptic-hint">
              No haptic
            </span>
          )}
        </div>
        
        {/* Zone actions à droite */}
        <div className="fp-buttplug-settings-actions">
          
          {/* Connect/Disconnect */}
          {!isConnected ? (
            <button 
              className="fp-buttplug-settings-connect-btn"
              onClick={this.handleAutoConnect}
              disabled={isAutoConnecting || funscriptChannels.length === 0}
              title={funscriptChannels.length === 0 ? "Load funscript first" : "Connect to Intiface Central"}
            >
              {/* ✅ MODIFIÉ: Feather icon pour connect */}
              <FeatherIcon 
                name={isAutoConnecting ? "loader" : "zap"} 
                size={14} 
                className="fp-icon-button"
                style={{ marginRight: '4px' }}
              />
              {isAutoConnecting ? 'Connecting...' : 'Connect'}
            </button>
          ) : (
            <>
              <button 
                className="fp-buttplug-settings-disconnect-btn"
                onClick={this.handleDisconnect}
              >
                {/* ✅ MODIFIÉ: Feather icon pour disconnect */}
                <FeatherIcon 
                  name="zap-off" 
                  size={14} 
                  className="fp-icon-button"
                  style={{ marginRight: '4px' }}
                />
                Disconnect
              </button>
              
              {/* Bouton rescan */}
              <button
                className="fp-buttplug-settings-rescan-btn"
                onClick={this.handleRescan}
                disabled={isRescanActive}
                title="Scan for new devices"
              >
                {/* ✅ MODIFIÉ: Feather icons pour rescan */}
                <FeatherIcon 
                  name={isRescanActive ? "loader" : "search"} 
                  size={14} 
                  className="fp-icon-button"
                />
              </button>
            </>
          )}
          
          {/* Device selector */}
          <select
            className="fp-buttplug-settings-device-select"
            value={selectedDevice?.index ?? -1}
            onChange={(e) => this.handleDeviceChange(e.target.value)}
            disabled={funscriptChannels.length === 0}
            title={funscriptChannels.length === 0 ? 
              "Load funscript first" : 
              "Select haptic device"}
          >
            {devices.map(device => (
              <option key={device.index} value={device.index}>
                {device.name} {device.index === -1 ? '(Virtual)' : ''}
              </option>
            ))}
          </select>
          
          {/* Settings toggle */}
          <button
            className="fp-buttplug-settings-toggle"
            onClick={onToggleSettings}
            title={isSettingsExpanded ? "Hide haptic settings" : "Show haptic settings"}
          >
            {/* ✅ MODIFIÉ: Feather icon pour toggle */}
            <FeatherIcon 
              name={isSettingsExpanded ? "chevron-up" : "chevron-down"} 
              size={20} 
              className="fp-icon-button"
              style={{marginLeft:"6px",marginRight:"6px"}}
            />
          </button>
        </div>
        
      </div>
    );
  }
}

export default ButtPlugSettingsComponent;