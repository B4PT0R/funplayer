import React, { Component } from 'react';
import FeatherIcon from './FeatherIcon'; // ✅ AJOUTÉ: Import du nouveau composant
import Logo from './Logo';

/**
 * StatusBarComponent - Barre de status et contrôles UI
 * 
 * RESPONSABILITÉS:
 * - Affichage status lecture (play/pause, updateRate)
 * - Boutons toggle (visualizer, debug)
 * - UI pure, pas de logique métier
 * 
 * ✅ MODIFIÉ: Utilise FeatherIcon au lieu d'emojis
 */
class StatusBarComponent extends Component {
  
  render() {
    const { 
      isPlaying, 
      updateRate, 
      showVisualizer, 
      showDebug,
      showPlaylist,
      onToggleVisualizer,
      onToggleDebug,
      onTogglePlaylist
    } = this.props;
    
    return (
      <div className="fp-status-bar">
        
        {/* Status lecture */}
        <span className="fp-status-bar-status">
          {/* ✅ MODIFIÉ: Feather icons au lieu d'emojis */}
          <FeatherIcon 
            name={isPlaying ? "play" : "pause"}  
            className="fp-status-bar-status-icon"
          />
          {updateRate}Hz
        </span>

        <div className='fp-status-bar-logo-area'>
          <Logo className="fp-status-bar-logo" size={30} />
        </div>
        
        {/* Contrôles UI */}
        <div className="fp-status-bar-controls">

          <button 
            className="fp-status-bar-playlist-btn"
            onClick={onTogglePlaylist}
            title={showPlaylist ? "Hide Playlist" : "Show Playlist"}
          >
            <FeatherIcon 
              name="list" 
              size={16} 
              className="fp-icon-button"
            />
          </button>

          <button 
            className="fp-status-bar-visualizer-btn"
            onClick={onToggleVisualizer}
            title={showVisualizer ? "Hide Visualizer" : "Show Visualizer"}
          >
            {/* ✅ MODIFIÉ: Feather icons avec logique conditionnelle */}
            <FeatherIcon 
              name="bar-chart-2" 
              size={16} 
              className="fp-icon-button"
            />
          </button>
          
          <button 
            className="fp-status-bar-debug-btn"
            onClick={onToggleDebug}
            title={showDebug ? "Hide Debug" : "Show Debug"}
          >
            {/* ✅ MODIFIÉ: Feather icons pour debug */}
            <FeatherIcon 
              name="search" 
              size={16} 
              className="fp-icon-button"
            />
          </button>
        </div>
        
      </div>
    );
  }
}

export default StatusBarComponent;