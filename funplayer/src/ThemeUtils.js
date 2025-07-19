/**
 * ThemeUtils.js - Utilitaires centralisés pour la gestion des thèmes
 * 
 * ✅ VERSION SIMPLIFIÉE:
 * - Applique seulement les variables de base via setProperty()
 * - Les variables dérivées (color-mix) sont gérées par le CSS natif
 * - Pas de génération de CSS complexe
 */

// ============================================================================
// CONSTANTES
// ============================================================================

export const CSS_VAR_MAPPINGS = {
  'primaryColor': '--fp-primary-color',
  'backgroundColor': '--fp-background-color',
  'secondaryBackgroundColor': '--fp-secondary-background-color',
  'textColor': '--fp-text-color',
  'borderColor': '--fp-border-color',
  'fontFamily': '--fp-font-family',
  'baseRadius': '--fp-base-radius',
  'spacing': '--fp-spacing'
};

// ============================================================================
// UTILITAIRES DE CONVERSION
// ============================================================================

/**
 * Convertit une clé de thème en variable CSS préfixée
 * @param {string} key - Clé du thème (ex: 'primaryColor')
 * @returns {string} Variable CSS (ex: '--fp-primary-color')
 */
export function convertToCssVar(key) {
  return CSS_VAR_MAPPINGS[key] || `--fp-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
}

/**
 * Nettoie et valide un objet thème
 * @param {Object} theme - Objet thème à nettoyer
 * @returns {Object} Thème nettoyé
 */
export function sanitizeTheme(theme) {
  if (!theme || typeof theme !== 'object') return {};
  
  const sanitized = {};
  
  Object.entries(theme).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      sanitized[key] = String(value).trim();
    }
  });
  
  return sanitized;
}

/**
 * Valide qu'un objet thème est valide
 * @param {Object} theme - Objet thème à valider
 * @returns {boolean} true si valide
 */
export function isValidTheme(theme) {
  if (!theme || typeof theme !== 'object') return false;
  
  // Au moins une propriété valide
  return Object.keys(theme).some(key => 
    theme[key] !== null && 
    theme[key] !== undefined && 
    theme[key] !== ''
  );
}

// ============================================================================
// APPLICATION DU THÈME - VERSION SIMPLIFIÉE
// ============================================================================

/**
 * Applique un thème sur un élément DOM
 * ✅ VERSION SIMPLIFIÉE: Applique seulement les variables de base
 * Les variables dérivées (color-mix) sont automatiquement recalculées par CSS
 * 
 * @param {Object} theme - Objet thème
 * @param {HTMLElement} element - Élément DOM cible
 * @param {Object} options - Options { setDataTheme: boolean }
 * @returns {boolean} true si succès
 */
export function applyThemeToElement(theme, element, options = {}) {
  if (!theme || !element) return false;
  
  const { setDataTheme = true } = options;
  
  try {
    // ✅ Nettoyer le thème
    const sanitizedTheme = sanitizeTheme(theme);
    
    // ✅ Appliquer seulement les variables de base
    Object.entries(sanitizedTheme).forEach(([key, value]) => {
      if (key !== 'base') {
        const cssVar = convertToCssVar(key);
        element.style.setProperty(cssVar, value);
      }
    });
    
    // ✅ Appliquer l'attribut data-theme pour les surcharges CSS
    if (setDataTheme && sanitizedTheme.base) {
      element.setAttribute('data-theme', sanitizedTheme.base);
    }
    
    return true;
    
  } catch (error) {
    console.error('Failed to apply theme to element:', error);
    return false;
  }
}

// ============================================================================
// EXPORTS GROUPÉS
// ============================================================================

export default {
  convertToCssVar,
  sanitizeTheme,
  isValidTheme,
  applyThemeToElement,
  CSS_VAR_MAPPINGS
};