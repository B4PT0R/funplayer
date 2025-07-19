import React from 'react';
import ReactDOM from 'react-dom/client';
import FunPlayer from './FunPlayer';
import { createCallbackProps, ALL_SUPPORTED_EVENTS } from './FunPlayerEvents';

const STYLE_TEMPLATE = `
/* ============================================================================
   TOUS LES STYLES DU DOM PRINCIPAL {EXTRACTION_COMMENT}
   ============================================================================ */

{ALL_STYLES}

/* ============================================================================
   WEB COMPONENT HOST STYLES BASIQUES
   ============================================================================ */

:host {
  display: block;
  width: 100%;
  height: auto;
  min-height: 200px;
  transition: height 0.2s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.funplayer-shadow-container {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  background: transparent;
  outline: none;
}
`;

/**
 * FunPlayerWebComponent - ✅ SIMPLIFIÉ
 * 
 * Rôle: Infrastructure pour faire fonctionner React dans Shadow DOM
 * - Injecte les styles du DOM principal vers Shadow DOM
 * - Transmet les props au composant React
 * - Laisse React gérer les thèmes avec sa logique normale
 * 
 * Usage:
 * <fun-player 
 *   playlist='[{"sources": "video.mp4", "funscript": {...}}]'
 *   theme='{"primaryColor": "#ff4b4b"}'
 * ></fun-player>
 */

class FunPlayerWebComponent extends HTMLElement {
  constructor() {
    super();
    
    // Shadow DOM pour isolation CSS/JS
    console.log('🔍 Creating shadow DOM...');
    this.attachShadow({ mode: 'open' });
    console.log('🔍 Shadow DOM created:', !!this.shadowRoot);
    
    // État interne
    this.reactRoot = null;
    this.stylesInjected = false;
    this.initializationPromise = null;
    
    // Variables pour la sync des styles
    this.styleObserver = null;
    
    console.log('✅ FunPlayerWebComponent constructed');
  }

  // ============================================================================
  // LIFECYCLE WEB COMPONENT
  // ============================================================================

  connectedCallback() {
    console.log('🔗 FunPlayerWebComponent connected to DOM');
    
    // Prévenir les multiples initialisations
    if (this.initializationPromise) {
      console.log('⚠️ Already initializing, skipping...');
      return;
    }
    
    this.initializationPromise = this.initializeAsync();
  }

  disconnectedCallback() {
    console.log('🔌 FunPlayerWebComponent disconnected from DOM');
    this.cleanup();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    
    console.log(`🔄 Attribute changed: ${name}`, { oldValue, newValue });
    
    // ✅ SIMPLIFIÉ: Juste mettre à jour React, qui gère ses thèmes tout seul
    if (this.reactRoot) {
      this.updateReactComponent();
    }
  }

  static get observedAttributes() {
    return ['playlist', 'theme'];
  }

  // ============================================================================
  // INITIALISATION ASYNC
  // ============================================================================

  async initializeAsync() {
    try {
      console.log('🚀 Initializing FunPlayerWebComponent...');
      
      // 1. Injection des styles (prioritaire)
      await this.injectStylesAsync();
      
      // 2. Initialisation React
      this.initializeReact();
      
      console.log('✅ FunPlayerWebComponent fully initialized');
      
    } catch (error) {
      console.error('❌ FunPlayerWebComponent initialization failed:', error);
      this.showErrorFallback(error);
    }
  }

  // ============================================================================
  // REACT INTEGRATION
  // ============================================================================

  initializeReact() {
    try {
      console.log('⚛️ Initializing React in Shadow DOM...');
      
      // Container pour React dans le Shadow DOM
      const reactContainer = document.createElement('div');
      reactContainer.className = 'funplayer-shadow-container';
      this.shadowRoot.appendChild(reactContainer);
      
      // Créer root React
      this.reactRoot = ReactDOM.createRoot(reactContainer);
      
      // Render initial
      this.updateReactComponent();
      
      console.log('✅ React initialized successfully in Shadow DOM');
      
    } catch (error) {
      console.error('❌ React initialization failed:', error);
      throw error;
    }
  }

  updateReactComponent() {
    if (!this.reactRoot) return;
    
    try {
      const props = this.buildReactProps();
      
      console.log('🔄 Updating React component with props:', {
        hasPlaylist: !!props.playlist,
        hasTheme: !!props.theme,
        eventCallbacks: Object.keys(props).filter(key => key.startsWith('on')).length
      });
      
      this.reactRoot.render(React.createElement(FunPlayer, props));
      
    } catch (error) {
      console.error('❌ React component update failed:', error);
      this.showErrorFallback(error);
    }
  }

  buildReactProps() {
    const props = {};
    
    // 1. Parse des attributs principaux
    try {
      const playlistAttr = this.getAttribute('playlist');
      if (playlistAttr) {
        props.playlist = JSON.parse(playlistAttr);
      }
    } catch (error) {
      console.warn('⚠️ Invalid playlist JSON:', error.message);
      props.playlist = [];
    }
    
    try {
      const themeAttr = this.getAttribute('theme');
      if (themeAttr) {
        // ✅ SIMPLIFIÉ: Juste passer le thème en props
        // React FunPlayer s'occupera de l'appliquer avec sa logique normale
        props.theme = JSON.parse(themeAttr);
      }
    } catch (error) {
      console.warn('⚠️ Invalid theme JSON:', error.message);
    }
    
    // 2. Création automatique des callbacks événements
    const eventCallbacks = createCallbackProps(this);
    Object.assign(props, eventCallbacks);
    
    // 3. Callback resize spécial (pour iframe integration)
    props.onResize = (dimensions) => {
      console.log('📏 FunPlayer resize:', dimensions);
      
      // ✅ DEBUG: Mesurer la hauteur du Web Component AVANT modification
      const currentHostHeight = this.getBoundingClientRect().height;
      console.log('🔍 Host height BEFORE resize:', currentHostHeight);
      
      if (dimensions && dimensions.height) {
        this.style.height = `${dimensions.height}px`;
        console.log('🎬 Web Component resized to:', dimensions.height + 'px');
        
        // ✅ DEBUG: Mesurer APRÈS pour voir la différence
        setTimeout(() => {
          const newHostHeight = this.getBoundingClientRect().height;
          console.log('🔍 Host height AFTER resize:', newHostHeight);
          console.log('📊 Difference:', newHostHeight - dimensions.height);
        }, 10);
      }
    };
    
    return props;
  }

  // ============================================================================
  // STYLES INJECTION - ✅ SIMPLIFIÉ: Juste copier les styles
  // ============================================================================

  getStyleTemplate(allStyles = '') {
    return STYLE_TEMPLATE
      .replace('{ALL_STYLES}', allStyles)
      .replace('{EXTRACTION_COMMENT}', allStyles ? '' : '(vides)');
  }

  async injectStylesAsync() {
    if (this.stylesInjected) return;
    
    try {
      console.log('🎨 Injecting ALL styles into Shadow DOM...');
      
      // ✅ 1. Copier TOUS les styles existants (SCSS + Video.js + plugins)
      const allStyles = this.extractAllExistingStyles();
      
      // ✅ 2. Créer un seul style element avec tout
      const style = document.createElement('style');
      style.id = 'funplayer-injected-styles';
      style.textContent = this.getStyleTemplate(allStyles);
      
      this.shadowRoot.appendChild(style);
      this.stylesInjected = true;
      
      // ✅ 3. Observer les changements pour capturer lazy loading
      this.observeStyleChanges();
      
      console.log('✅ All styles successfully injected into Shadow DOM');
      console.log(`📊 Total CSS length: ${allStyles.length} characters`);
      
    } catch (error) {
      console.error('❌ Failed to inject styles:', error);
      this.injectFallbackStylesOnly();
    }
  }

  extractAllExistingStyles() {
    let allCSS = '';
    
    try {
      console.log('🔍 Extracting ALL styles from main DOM...');

      // Debug: Compter ce qu'on trouve
      const styleTags = document.querySelectorAll('style');
      const styleSheets = document.styleSheets;
      
      console.log(`📊 Found ${styleTags.length} <style> tags`);
      console.log(`📊 Found ${styleSheets.length} stylesheets`);
      
      // 1. Styles inline <style>
      styleTags.forEach((style, index) => {
        if (style.textContent) {
          allCSS += `\n/* <style> tag ${index + 1} */\n${style.textContent}\n`;
        }
      });
      
      // 2. Stylesheets <link>
      Array.from(styleSheets).forEach((sheet, index) => {
        try {
          const rules = Array.from(sheet.cssRules || sheet.rules || []);
          const sheetCSS = rules.map(rule => rule.cssText).join('\n');
          if (sheetCSS) {
            allCSS += `\n/* Stylesheet ${index + 1} */\n${sheetCSS}\n`;
          }
        } catch (e) {
          console.warn(`Cannot access stylesheet ${index + 1} (CORS):`, e.message);
        }
      });
      
      console.log(`✅ Extracted ${allCSS.length} characters of CSS`);
      return allCSS;
      
    } catch (error) {
      console.error('❌ CSS extraction failed:', error);
      return '';
    }
  }

  observeStyleChanges() {
    if (this.styleObserver) return;
    
    try {
      this.styleObserver = new MutationObserver((mutations) => {
        let stylesChanged = false;
        
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node.tagName === 'STYLE' || (node.tagName === 'LINK' && node.rel === 'stylesheet')) {
                stylesChanged = true;
              }
            });
          }
        });
        
        if (stylesChanged) {
          console.log('🔍 New styles detected, updating Shadow DOM...');
          this.updateStylesFromChanges();
        }
      });
      
      this.styleObserver.observe(document.head, {
        childList: true,
        subtree: true
      });
      
      console.log('👁️ Style observer started');
      
    } catch (error) {
      console.warn('⚠️ Cannot observe style changes:', error);
    }
  }

  updateStylesFromChanges() {
    const existingStyleElement = this.shadowRoot.getElementById('funplayer-injected-styles');
    if (!existingStyleElement) return;
    
    const updatedStyles = this.extractAllExistingStyles();
    
    existingStyleElement.textContent = this.getStyleTemplate(updatedStyles);
    
    console.log('✅ Styles updated for lazy loading');
  }

  injectFallbackStylesOnly() {
    if (this.stylesInjected) return;
    
    const style = document.createElement('style');
    style.textContent = this.getStyleTemplate('');
    
    this.shadowRoot.appendChild(style);
    this.stylesInjected = true;
    
    console.log('⚠️ Fallback styles injected');
  }

  // ============================================================================
  // ERROR HANDLING & CLEANUP
  // ============================================================================

  showErrorFallback(error) {
    this.shadowRoot.innerHTML = `
      <div style="padding: 20px; background: #fee; border: 1px solid #fcc; border-radius: 4px; font-family: monospace; font-size: 14px;">
        <h3>FunPlayer Error</h3>
        <p>Something went wrong with the FunPlayer Web Component:</p>
        <pre style="background: #f9f9f9; padding: 10px; border-radius: 3px; overflow: auto;">${error.message}</pre>
        <button onclick="window.location.reload()" style="margin-top: 10px; padding: 5px 10px; cursor: pointer;">
          Reload
        </button>
      </div>
    `;
  }

  cleanup() {
    if (this.reactRoot) {
      this.reactRoot.unmount();
      this.reactRoot = null;
    }
    
    if (this.styleObserver) {
      this.styleObserver.disconnect();
      this.styleObserver = null;
    }
    
    this.stylesInjected = false;
    this.initializationPromise = null;
  }
}

// ============================================================================
// REGISTRATION & EXPORT
// ============================================================================

export function registerFunPlayerWebComponent() {
  if (!window.customElements.get('fun-player')) {
    window.customElements.define('fun-player', FunPlayerWebComponent);
    console.log('✅ <fun-player> Web Component registered');
  } else {
    console.log('⚠️ <fun-player> already registered');
  }
}

export default FunPlayerWebComponent;