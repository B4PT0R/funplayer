/**
 * embed.js - Point d'entrée pour FunPlayer Web Component
 * 
 * Génère: funplayer-embed.js
 * Usage: <script src="funplayer-embed.js"></script>
 * Puis:  <fun-player playlist="..." theme="..."></fun-player>
 */

// ============================================================================
// IMPORTS CORE
// ============================================================================
import './polyfills.js';
import React from 'react';
import ReactDOM from 'react-dom/client';

// Components et utilitaires FunPlayer
import FunPlayerWebComponent, { registerFunPlayerWebComponent } from './FunPlayerWebComponent.js';
import { ALL_SUPPORTED_EVENTS, getEventDocumentation } from './FunPlayerEvents.js';

// ✅ MODIFIÉ: Import styles centralisé ici seulement
// Ces styles seront injectés dans le <head> du document principal
// et extraits par le WebComponent pour injection dans le Shadow DOM
import './funplayer.scss';
import 'video.js/dist/video-js.css';

// ============================================================================
// POLYFILLS CONDITIONNELS
// ============================================================================

// CustomElements polyfill pour anciens navigateurs
if (!window.customElements) {
  console.warn('⚠️ Web Components not supported. Consider loading a polyfill.');
}

// Polyfill ResizeObserver si nécessaire (pour certains composants)
if (!window.ResizeObserver) {
  // Polyfill léger ou no-op
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

// ============================================================================
// EXPOSITION GLOBALE POUR USAGE DIRECT
// ============================================================================

// Créer namespace global FunPlayer
window.FunPlayer = {
  // Version et infos
  version: process.env.FUNPLAYER_VERSION || '1.0.0',
  mode: 'embed',
  
  // Web Component class
  WebComponent: FunPlayerWebComponent,
  
  // API d'enregistrement manuel
  register: registerFunPlayerWebComponent,
  
  // Utilitaires développeurs
  getSupportedEvents: () => ALL_SUPPORTED_EVENTS,
  getEventDocumentation: getEventDocumentation,
  
  // Helpers pour intégration dynamique
  create: (container, options = {}) => {
    return createFunPlayerElement(container, options);
  },
  
  // React components pour usage avancé
  React: {
    Component: null, // Sera assigné plus bas après import dynamique
    createElement: React.createElement,
    version: React.version
  }
};

// ============================================================================
// HELPERS POUR INTÉGRATION DYNAMIQUE
// ============================================================================

/**
 * Crée un élément FunPlayer programmatiquement
 * @param {string|HTMLElement} container - Sélecteur CSS ou élément DOM
 * @param {Object} options - Configuration {playlist, theme, ...}
 * @returns {HTMLElement} Élément funplayer créé
 */
function createFunPlayerElement(container, options = {}) {
  // Résoudre le container
  let targetElement;
  if (typeof container === 'string') {
    targetElement = document.querySelector(container);
    if (!targetElement) {
      throw new Error(`Container not found: ${container}`);
    }
  } else if (container instanceof HTMLElement) {
    targetElement = container;
  } else {
    throw new Error('Container must be a CSS selector string or HTMLElement');
  }
  
  // Créer l'élément funplayer
  const player = document.createElement('fun-player');
  
  // Appliquer les options comme attributs
  if (options.playlist) {
    player.setAttribute('playlist', JSON.stringify(options.playlist));
  }
  
  if (options.theme) {
    player.setAttribute('theme', JSON.stringify(options.theme));
  }
  
  // Appliquer les callbacks comme propriétés
  Object.keys(options).forEach(key => {
    if (typeof options[key] === 'function' && key.startsWith('on')) {
      const eventName = key.slice(2).toLowerCase(); // onPlay -> play
      player.addEventListener(`funplayer-${eventName}`, options[key]);
    }
  });
  
  // Ajouter au container
  targetElement.appendChild(player);
  
  return player;
}

// ============================================================================
// ENREGISTREMENT AUTOMATIQUE DU WEB COMPONENT
// ============================================================================

// Enregistrer automatiquement le Web Component si pas déjà fait
registerFunPlayerWebComponent();

// Vérifier l'enregistrement après un délai pour debugger
if (process.env.NODE_ENV !== 'production') {
  setTimeout(() => {
    console.log('🔍 Web Component registration check:', {
      registered: !!window.customElements.get('fun-player'),
      customElementsSupported: !!window.customElements,
      funplayerElementsInDOM: document.querySelectorAll('fun-player').length
    });
  }, 100);
  
  // Exemple d'usage dans la console
  console.log(`
📚 Quick Start:
1. Add to HTML: <fun-player playlist='[...]' theme='{}'></fun-player>
2. Or via JS: FunPlayer.create('#container', {playlist: [...], onPlay: () => {}})
3. Events: player.addEventListener('funplayer-play', console.log)

🔧 Available globally:
- FunPlayer.create()
- FunPlayer.getSupportedEvents()
- FunPlayer.getEventDocumentation()
  `);
}

// ============================================================================
// CHARGEMENT ASYNC DU COMPOSANT REACT (pour usage avancé)
// ============================================================================

// Exposer le composant React pour les utilisateurs avancés
// qui veulent l'intégrer dans leur app React existante
import('./FunPlayer.jsx').then(({ default: FunPlayerComponent }) => {
  window.FunPlayer.React.Component = FunPlayerComponent;
  
  if (process.env.NODE_ENV !== 'production') {
    console.log('🎮 FunPlayer React Component loaded for advanced usage');
  }
}).catch(error => {
  console.warn('⚠️ Failed to load React Component for advanced usage:', error);
});

// ============================================================================
// ERROR HANDLING GLOBAL
// ============================================================================

// Capturer les erreurs non gérées liées à FunPlayer
window.addEventListener('error', (event) => {
  if (event.error && event.error.message && event.error.message.includes('FunPlayer')) {
    console.error('🎮 FunPlayer Error:', event.error);
    
    // Optionnel: Envoyer les erreurs à un service de monitoring
    // if (window.FunPlayer.onError) {
    //   window.FunPlayer.onError(event.error);
    // }
  }
});

// ============================================================================
// EXPORT POUR ENVIRONNEMENTS MODULE
// ============================================================================

// Support ES modules
export default window.FunPlayer;
export { 
  FunPlayerWebComponent, 
  registerFunPlayerWebComponent,
  createFunPlayerElement,
  ALL_SUPPORTED_EVENTS,
  getEventDocumentation 
};

// Support CommonJS
if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.FunPlayer;
}