import React, { Component } from 'react';
import FeatherIcon from './FeatherIcon';

/**
 * ChannelSettingsComponent - Configuration manuelle des champs d'actions
 * 
 * RESPONSABILITÉS:
 * - UI minimaliste pour configurer timeField, valueField, directionField, durationField
 * - Bouton discret "Configure Action Channels" en bas des settings
 * - Dropdowns simples avec options détectées + "none"
 * - Permet de convertir canaux polar → scalar via "none" sur directionField
 */
class ChannelSettingsComponent extends Component {
  constructor(props) {
    super(props);

    this.core=props.core
    
    this.state = {
      isExpanded: false,
      renderTrigger: 0,
      pendingConfig: {} // Config en cours avant validation
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
  // GESTION D'ÉVÉNEMENTS
  // ============================================================================

  handleEvent = (event, data) => {
    const eventsToReact = [
      'funscript:load',     // Nouveau funscript → reset config
      'funscript:reset'     // Reset → masquer
    ];
    
    if (eventsToReact.includes(event)) {
      if (event === 'funscript:load') {
        this.setState({ pendingConfig: {}});
      }
      if (event === 'funscript:reset') {
        this.setState({ isExpanded: false });
      }
      this._triggerRender();
    }
  }

  _triggerRender = () => {
    this.setState(prevState => ({ 
      renderTrigger: prevState.renderTrigger + 1 
    }));
  }

  // ============================================================================
  // ACTIONS
  // ============================================================================

  handleToggleExpanded = () => {
    this.setState({ isExpanded: !this.state.isExpanded }, () => {
      // ✅ ANCIEN: this.props.onResize?.();
      // ✅ NOUVEAU: Bus d'événements
      this.core.notify('component:resize', {
        source: 'ChannelSettingsComponent',
        reason: `config-${this.state.isExpanded ? 'expanded' : 'collapsed'}`
      });
    });
  }

  handleFieldChange = (channelName, fieldType, value) => {
    this.setState(prevState => ({
      pendingConfig: {
        ...prevState.pendingConfig,
        [channelName]: {
          ...prevState.pendingConfig[channelName],
          [fieldType]: value === 'none' ? null : value
        }
      }
    }));
  }

  handleValidate = () => {  // Enlever async
    try {
      const originalData = this.core.funscript.data;
      if (originalData) {
        this.core.funscript.loadWithCustomFieldConfig(originalData, pendingConfig); // Enlever await
        this.setState({ pendingConfig: {}, isExpanded: false });
      }
    } catch (error) {
      console.error('Failed to apply channel configuration:', error);
    }
  }

  // ============================================================================
  // HELPERS
  // ============================================================================

  getCurrentConfig = (channelName, fieldType) => {
    const { pendingConfig } = this.state;
    const channel = this.core.funscript.getChannel(channelName);
    
    // Valeur en cours d'édition ou valeur actuelle du canal
    if (pendingConfig[channelName] && pendingConfig[channelName][fieldType] !== undefined) {
      return pendingConfig[channelName][fieldType] || 'none';
    }
    
    if (channel && channel.fieldConfig) {
      return channel.fieldConfig[fieldType] || 'none';
    }
    
    // Defaults par type
    const defaults = {
      timeField: 'at',
      valueField: 'pos',
      directionField: 'none',
      durationField: 'none'
    };
    
    return defaults[fieldType] || 'none';
  }

  getAvailableFields = (detectedFields, fieldType) => {
    const fieldMap = {
      timeField: 'availableTimeFields',
      valueField: 'availableValueFields', 
      directionField: 'availableDirectionFields',
      durationField: 'availableDurationFields'
    };
    
    const availableKey = fieldMap[fieldType];
    return detectedFields[availableKey] || [];
  }

  hasPendingChanges = () => {
    return Object.keys(this.state.pendingConfig).length > 0;
  }

  // ============================================================================
  // RENDER
  // ============================================================================

  render() {
    const { isExpanded } = this.state;
    
    // Ne s'afficher que si funscript chargé
    if (!this.core.funscript.hasFunscript()) {
      return null;
    }
    
    const detectedFields = this.core.funscript.getDetectedFields();
    const channelCount = Object.keys(detectedFields).length;
    
    return (
      <div className="fp-channel-settings">
        
        {/* Header avec toggle - plus de div inutile */}
        <div className="fp-channel-settings-header">
          <span className="fp-channel-settings-title">
            Configure Action Channels ({channelCount})
          </span>
          <button
            className="fp-channel-settings-toggle"
            onClick={this.handleToggleExpanded}
          >
            <FeatherIcon 
              name={isExpanded ? "chevron-up" : "chevron-down"} 
              size={18} 
              className="fp-icon-button"
            />
          </button>
        </div>
        
        {/* Zone expandue */}
        {this.renderExpandedSettings()}
        
      </div>
    );
  }

  // ============================================================================
  // SETTINGS EXPANDUS - Suppression du sur-nesting
  // ============================================================================
  renderExpandedSettings = () => {
    if (!this.state.isExpanded) return null;
    
    const detectedFields = this.core.funscript.getDetectedFields();
    const channelNames = Object.keys(detectedFields);
    
    if (channelNames.length === 0) {
      return (
        <div className="fp-channel-settings-empty">
          No channels detected. Load a funscript first.
        </div>
      );
    }

    return (
      <div className="fp-channel-settings-expanded">
        
        {/* Config par canal */}
        {channelNames.map(channelName => 
          this.renderChannelConfig(channelName, detectedFields[channelName])
        )}
        
        {/* Actions */}
        <div className="fp-channel-settings-actions">
          <button 
            className="fp-channel-settings-validate-btn"
            onClick={this.handleValidate}
            disabled={!this.hasPendingChanges()}
          >
            ✓ Validate Changes
          </button>
          
          {this.hasPendingChanges() && (
            <button 
              className="fp-channel-settings-cancel-btn"
              onClick={() => this.setState({ pendingConfig: {} })}
            >
              Cancel
            </button>
          )}
        </div>
        
      </div>
    );
  }

  // ============================================================================
  // CONFIG CANAL - Suppression du sur-nesting
  // ============================================================================
  renderChannelConfig = (channelName, detectedFields) => {
    const fieldTypes = [
      { key: 'timeField', label: 'Time' },
      { key: 'valueField', label: 'Value' },
      { key: 'directionField', label: 'Direction' },
      { key: 'durationField', label: 'Duration' }
    ];

    return (
      <div className="fp-channel-settings-channel">
        
        {/* Nom du canal */}
        <span className="fp-channel-settings-channel-name">
          {channelName}
        </span>
        
        {/* Les 4 champs inline */}
        {fieldTypes.map(({ key, label }) => {
          const availableFields = this.getAvailableFields(detectedFields, key);
          const currentValue = this.getCurrentConfig(channelName, key);
          
          return (
            <div key={key} className="fp-channel-settings-field">
              <label className="fp-channel-settings-field-label">
                {label}:
              </label>
              <select
                className="fp-channel-settings-field-select"
                value={currentValue}
                onChange={(e) => this.handleFieldChange(channelName, key, e.target.value)}
              >
                <option value="none">none</option>
                {availableFields.map(field => (
                  <option key={field} value={field}>{field}</option>
                ))}
              </select>
            </div>
          );
        })}
        
      </div>
    );
  }
}

export default ChannelSettingsComponent;