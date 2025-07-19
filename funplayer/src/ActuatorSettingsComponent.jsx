import React, { Component } from 'react';
import FeatherIcon from './FeatherIcon';

/**
 * ActuatorSettingsComponent - ✅ NETTOYÉ: UI pure sans notifications
 * 
 * RESPONSABILITÉS SIMPLIFIÉES:
 * - UI pure pour un actuateur (instance passée en props)
 * - Appels directs this.core.xxx (pas d'indirections)
 * - Re-render uniquement sur événements concernant CET actuateur
 * - ✅ CLEAN: Pas de notifications status (c'est aux managers de le faire)
 */
class ActuatorSettingsComponent extends Component {
  constructor(props) {
    super(props);

    this.core=props.core
    
    this.state = {
      isExpanded: false,
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
  // GESTION D'ÉVÉNEMENTS GRANULAIRES - Filtrage par actuateur
  // ============================================================================

  handleEvent = (event, data) => {
    const { actuator } = this.props;
    if (!actuator) return;

    // Événements granulaires concernant CET actuateur spécifiquement
    if (event === 'actuator:settingsChanged' || 
        event === 'actuator:settingsReset' ||
        event === 'actuator:plugged' ||
        event === 'actuator:unplugged') {
      
      // Filtrage: Ne re-render que si c'est NOTRE actuateur
      if (data.actuatorIndex === actuator.index) {
        this._triggerRender();
      }
      return;
    }

    // Événements de canal concernant CET actuateur
    if (event === 'channel:plugged' || event === 'channel:unplugged') {
      // Filtrage: Ne re-render que si c'est NOTRE actuateur qui est affecté
      if (data.actuatorIndex === actuator.index) {
        this._triggerRender();
      }
      return;
    }

    // Événements globaux qui peuvent affecter la compatibilité
    const globalEvents = [
      'funscript:load',     // Nouveaux canaux disponibles
      'funscript:channels', // Liste des canaux mise à jour
      'buttplug:device'     // Device changé (peut affecter l'actuateur)
    ];
    
    if (globalEvents.includes(event)) {
      this._triggerRender();
    }
  }

  _triggerRender = () => {
    this.setState(prevState => ({ 
      renderTrigger: prevState.renderTrigger + 1 
    }));
  }

  handleToggleExpanded = () => {
    this.setState({ isExpanded: !this.state.isExpanded }, () => {
      // ✅ ANCIEN: this.props.onResize?.();
      // ✅ NOUVEAU: Bus d'événements avec index actuator
      this.core.notify('component:resize', {
        source: 'ActuatorSettingsComponent',
        reason: `actuator-${this.props.actuator?.index}-${this.state.isExpanded ? 'expanded' : 'collapsed'}`
      });
    });
  }

  // ============================================================================
  // ACTIONS SIMPLIFIÉES - Appels directs core, pas d'indirections
  // ============================================================================

  handleGlobalScaleChange = (scale) => {
    // Appel direct core - la notification sera faite par ButtPlugManager
    this.core.buttplug.setGlobalScale(scale);
  }

  handleActuatorSettingChange = (key, value) => {
    const { actuator } = this.props;
    if (!actuator) return;
    
    // Mise à jour directe sur l'instance - la notification sera faite par Actuator
    actuator.updateSettings({ [key]: value });
  }

  handleChannelMapping = (channelName) => {
    const { actuator } = this.props;
    if (!actuator) return;
    
    if (channelName === '' || channelName === null) {
      // Appel direct instance - la notification sera faite par Channel/Actuator
      actuator.unplug();
    } else {
      // Appel direct core + instance - la notification sera faite par Channel
      const channel = this.core.funscript.getChannel(channelName);
      if (channel) {
        channel.plug(actuator);
      }
    }
  }

  // ============================================================================
  // RENDER PRINCIPAL - Structure simplifiée
  // ============================================================================
  render() {
    return (
      <div className="fp-actuator-settings">
        {this.renderCompactLine()}
        {this.renderExpandedSettings()}
      </div>
    );
  }

  // ============================================================================
  // LIGNE COMPACTE - Suppression du sur-nesting fp-expandable > fp-compact-line
  // ============================================================================
  renderCompactLine() {
    const { actuator } = this.props;
    const { isExpanded } = this.state;
    
    if (!actuator) {
      return <div className="fp-actuator-settings-error">No actuator provided</div>;
    }
    
    // Accès direct core pour canaux compatibles
    const allChannels = this.core.funscript.getChannels();
    const compatibleChannels = allChannels.filter(channel => 
      channel.canPlugTo(actuator)
    );
    
    const assignedChannel = actuator.assignedChannel;
    
    // Logique diagnostic en place
    let usabilityMessage = null;
    if (actuator.settings.enabled) {
      if (allChannels.length === 0) {
        usabilityMessage = 'Load funscript first';
      } else if (compatibleChannels.length === 0) {
        // Diagnostic rapide
        const hasRotateCapability = actuator.capability === 'rotate';
        const hasNegativeChannels = allChannels.some(channel => channel.type === 'polar');
        
        if (hasNegativeChannels && !hasRotateCapability) {
          usabilityMessage = 'Funscript has bipolar channels (needs rotate actuator)';
        } else if (!hasNegativeChannels && hasRotateCapability) {
          usabilityMessage = 'Funscript has only unipolar channels (rotate not needed)';
        } else {
          usabilityMessage = 'No compatible channels in current funscript';
        }
      }
    }
    
    return (
      <div className="fp-actuator-settings-header">
        
        {/* Nom actuateur avec indicateur de statut */}
        <span className={`fp-actuator-settings-badge ${!actuator.settings.enabled ? 'fp-actuator-settings-badge-disabled' : ''}`}>
          #{actuator.index} ({actuator.capability})
          {!actuator.settings.enabled && (
            <span 
              className="fp-actuator-settings-warning"
              title={usabilityMessage}
            >
              ⚠️
            </span>
          )}
        </span>
        
        {/* Enable toggle */}
        <label className="fp-actuator-settings-enable-toggle">
          <input
            className="fp-actuator-settings-enable-checkbox"
            type="checkbox"
            checked={actuator.settings.enabled}
            onChange={(e) => this.handleActuatorSettingChange('enabled', e.target.checked)}
            title={!actuator.settings.enabled ? usabilityMessage : "Enable/disable this actuator"}
          />
        </label>
        
        {/* Sélecteur canaux compatibles */}
        <select
          className="fp-actuator-settings-channel-select"
          value={assignedChannel?.name || ''}
          onChange={(e) => this.handleChannelMapping(e.target.value)}
          disabled={!actuator.settings.enabled}
          title={!actuator.settings.enabled ? usabilityMessage : "Assign compatible channel to this actuator"}
        >
          <option value="">None</option>
          {compatibleChannels.map((channel) => {
            const bipolarIndicator = channel.type === 'polar' ? ' (±)' : '';
            return (
              <option key={channel.name} value={channel.name}>
                {channel.name}{bipolarIndicator}
              </option>
            );
          })}
        </select>
        
        {/* Expand toggle */}
        <button 
          className="fp-actuator-settings-expand-toggle"
          onClick={this.handleToggleExpanded}
        >
          <FeatherIcon 
            name={isExpanded ? "chevron-up" : "chevron-down"} 
            size={18} 
            className="fp-icon-button"
          />
        </button>
        
      </div>
    );
  }

  // ============================================================================
  // SETTINGS EXPANDUS - Suppression du sur-nesting fp-expanded > fp-layout-column
  // ============================================================================
  renderExpandedSettings() {
    if (!this.state.isExpanded) return null;
    
    const { actuator } = this.props;
    
    if (!actuator) return null;
    
    // Accès direct core pour canaux compatibles
    const allChannels = this.core.funscript.getChannels();
    const compatibleChannels = allChannels.filter(channel => 
      channel.canPlugTo(actuator)
    );

    return (
      <div className="fp-actuator-settings-expanded">
        
        {/* Message de diagnostic si pas utilisable */}
        {!actuator.settings.enabled && allChannels.length === 0 && (
          <div className="fp-actuator-settings-warning-message">
            📄 Load a funscript first
          </div>
        )}
        
        {/* Info sur les canaux compatibles si utilisable */}
        {actuator.settings.enabled && compatibleChannels.length > 0 && (
          <div className="fp-actuator-settings-compatibility-info">
            Compatible with {compatibleChannels.length} channel(s): {compatibleChannels.map(ch => ch.name).join(', ')}
          </div>
        )}
        
        {/* Scale + Offset en horizontal */}
        <div className="fp-actuator-settings-controls">
          
          {/* Scale */}
          <div className="fp-actuator-settings-scale-control">
            <label className="fp-actuator-settings-scale-label">
              Scale: {((actuator.settings.scale || 1) * 100).toFixed(0)}%
            </label>
            <input
              className="fp-actuator-settings-scale-range"
              type="range"
              min="0"
              max="2"
              step="0.01"
              value={actuator.settings.scale || 1}
              onChange={(e) => this.handleActuatorSettingChange('scale', parseFloat(e.target.value))}
              disabled={!actuator.settings.enabled}
            />
          </div>

          {/* Time Offset */}
          <div className="fp-actuator-settings-offset-control">
            <label className="fp-actuator-settings-offset-label">
              Time Offset: {((actuator.settings.timeOffset || 0) * 1000).toFixed(0)}ms
            </label>
            <input
              className="fp-actuator-settings-offset-range"
              type="range"
              min="-0.5"
              max="0.5"
              step="0.001"
              value={actuator.settings.timeOffset || 0}
              onChange={(e) => this.handleActuatorSettingChange('timeOffset', parseFloat(e.target.value))}
              disabled={!actuator.settings.enabled}
            />
          </div>
          
        </div>

        {/* Invert */}
        <label className="fp-actuator-settings-invert-toggle">
          <input
            className="fp-actuator-settings-invert-checkbox"
            type="checkbox"
            checked={actuator.settings.invert || false}
            onChange={(e) => this.handleActuatorSettingChange('invert', e.target.checked)}
            disabled={!actuator.settings.enabled}
          />
          <span className="fp-actuator-settings-invert-label">Invert Values</span>
        </label>        
      </div>
    );
  }
}

export default ActuatorSettingsComponent;