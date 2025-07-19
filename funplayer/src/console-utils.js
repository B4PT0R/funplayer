/**
 * Console cleanup utilities - Version simplifiée
 */

// Filtrage console basique pour la production
const setupConsoleFiltering = () => {
  const originalWarn = console.warn;
  
  // Liste réduite des patterns les plus verbeux
  const warningPatternsToFilter = [
    /Feature Policy.*non prise en charge ignoré/i,
    /Feature Policy.*not supported/i,
    /accelerometer/i,
    /gyroscope/i,
    /magnetometer/i,
    /vr.*feature.*policy/i,
    /wake-lock/i,
    /usb/i
  ];

  console.warn = (...args) => {
    const message = args.join(' ');
    const shouldFilter = warningPatternsToFilter.some(pattern => 
      pattern.test(message)
    );
    
    if (!shouldFilter) {
      originalWarn.apply(console, args);
    }
  };
};

// Setup simple
const initConsoleUtils = (options = {}) => {
  const { 
    filterFeaturePolicyWarnings = true,
    debugMode = false 
  } = options;

  if (filterFeaturePolicyWarnings && !debugMode) {
    setupConsoleFiltering();
  }
};

export { initConsoleUtils, setupConsoleFiltering };