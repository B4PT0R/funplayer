import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import autoprefixer from 'autoprefixer'

/**
 * Configuration Vite pour build embed (Web Component)
 * Génère: funplayer-embed.js + funplayer-embed.css
 * 
 * ✅ INCLUT FIX pour "class heritage EventTarget is not an object or null"
 * 
 * Usage: npm run build:embed
 */
export default defineConfig({
  plugins: [react()],
  
  build: {
    // ============================================================================
    // CONFIGURATION EMBED
    // ============================================================================
    
    // Répertoire de sortie spécifique embed
    outDir: 'build-embed',
    
    // Clean avant build
    emptyOutDir: true,
    
    // ✅ Target moderne pour globaux natifs
    target: 'es2020',
    
    // Configuration library pour embed
    lib: {
      entry: './src/embed.js',
      name: 'FunPlayer',
      fileName: 'funplayer-embed',
      formats: ['iife']  // IIFE plus robuste pour web components
    },
    
    // ============================================================================
    // OPTIMISATIONS POUR EMBED + FIX CLASS HERITAGE
    // ============================================================================
    
    rollupOptions: {
      // ✅ NOUVEAU: Plugin custom pour fixer les références cassées d'héritage
      plugins: [
        {
          name: 'fix-bundled-references',  // ← Nouveau nom plus générique
          generateBundle(options, bundle) {
            Object.keys(bundle).forEach(fileName => {
              const chunk = bundle[fileName];
              if (chunk.type === 'chunk' && chunk.code) {
                let fixedCode = chunk.code;
                
                // ✅ Fix EventTarget (déjà fait - on garde)
                fixedCode = fixedCode.replace(/(\w+)\.default\.EventTarget/g, 'EventTarget');
                fixedCode = fixedCode.replace(/extends\s+(\w+)\.default\.EventTarget/g, 'extends EventTarget');
                fixedCode = fixedCode.replace(/class\s+(\w+)\s+extends\s+(\w+)\.default\.EventTarget/g, 'class $1 extends EventTarget');
                
                // ✅ NOUVEAU: Fix Video.js methods
                fixedCode = fixedCode.replace(/(\w+)\.default\.getComponent/g, 'videojs.getComponent');
                fixedCode = fixedCode.replace(/(\w+)\.default\.registerComponent/g, 'videojs.registerComponent');
                fixedCode = fixedCode.replace(/(\w+)\.default\.getPlugin/g, 'videojs.getPlugin');
                fixedCode = fixedCode.replace(/(\w+)\.default\.registerPlugin/g, 'videojs.registerPlugin');
                
                // ✅ Fix générique pour autres méthodes Video.js
                fixedCode = fixedCode.replace(/(\w+)\.default\.(extend|mergeOptions|ready)/g, 'videojs.$2');
                
                chunk.code = fixedCode;
              }
            });
          }
        },
        {
          name: 'inline-css',
          generateBundle(options, bundle) {
            const entries = Object.entries(bundle);
            const cssEntry = entries.find(([name]) => name.endsWith('.css'));
            const jsEntry = entries.find(([name]) => name.endsWith('.js'));
            
            if (cssEntry && jsEntry) {
              const [cssName, cssBundle] = cssEntry;
              const [jsName, jsBundle] = jsEntry;
              
              // ✅ Type guards explicites
              if (cssBundle.type === 'asset' && jsBundle.type === 'chunk' && typeof cssBundle.source === 'string') {
                // Injecter CSS dans JS
                jsBundle.code = `
        (function() {
          if (typeof document !== 'undefined') {
            const style = document.createElement('style');
            style.textContent = ${JSON.stringify(cssBundle.source)};
            document.head.appendChild(style);
            console.log('📦 Embed CSS injected: ${cssBundle.source.length} characters');
          }
        })();

        ${jsBundle.code}`;
                
                // Supprimer le CSS séparé
                delete bundle[cssName];
              }
            }
          }
        }
      ],
      
      output: {
        // ✅ Config web component
        extend: true,                    // Étendre window au lieu d'overwrite
        inlineDynamicImports: true,      // Éviter les chunks multiples
        manualChunks: undefined,         // Pas de chunking pour embed
        exports: "named",                // Fix warning exports
        
        // ✅ IMPORTANT: Préserver les globaux natifs
        format: 'iife',
        globals: {
          'EventTarget': 'EventTarget',
          'CustomEvent': 'CustomEvent',
          'Event': 'Event'
        },
        
        // Nom des fichiers
        assetFileNames: 'funplayer-embed.[ext]',
        entryFileNames: 'funplayer-embed.js',
      }
    },
    
    // ============================================================================
    // COMMONJS OPTIONS (CRITIQUE POUR FIX HERITAGE)
    // ============================================================================
    
    // ✅ NOUVEAU: Configuration CommonJS pour éviter la casse des classes
    commonjsOptions: {
      include: [/node_modules/],           // Seulement les node_modules
      exclude: [/\.es\.js$/],              // Exclure les modules ES natifs
      transformMixedEsModules: true,       // Gérer les modules mixtes
      ignoreTryCatch: false,               // Préserver les try/catch critiques
      
      // ✅ CRITIQUE: Préserver les noms et références de classes
      strictRequires: true,                // Mode strict pour les requires
      dynamicRequireTargets: [],           // Pas de requires dynamiques
      
      // ✅ Préserver les exports/imports critiques
      defaultIsModuleExports: 'auto',      // Auto-detect module.exports vs exports
    },
    
    // ============================================================================
    // MINIFICATION PRUDENTE (PRÉSERVER L'HÉRITAGE)
    // ============================================================================
    
    // ✅ Minification prudente pour préserver l'héritage de classes
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,     // Garder pour debug embed
        drop_debugger: true,
        keep_classnames: true,   // ✅ CRITIQUE: Préserver les noms de classes
        keep_fnames: true,       // ✅ CRITIQUE: Préserver les noms de fonctions
        passes: 1,               // Un seul pass pour éviter la sur-optimisation
        unsafe: false,           // Pas d'optimisations risquées
        hoist_funs: false,       // Pas de hoisting qui peut casser l'ordre
      },
      mangle: {
        keep_classnames: true,   // ✅ CRITIQUE: Préserver extends EventTarget
        keep_fnames: true,       // ✅ CRITIQUE: Préserver les noms de fonctions
        reserved: [              // ✅ Protéger les globaux critiques
          'EventTarget', 
          'HTMLElement', 
          'CustomEvent', 
          'Event',
          'ShadowRoot',
          'Document',
          'Window'
        ]
      },
      format: {
        comments: false,         // Supprimer les commentaires
        preserve_annotations: true // Préserver les annotations critiques
      }
    },
    
    // Chunking optimisé
    chunkSizeWarningLimit: 1000,
    
    // ============================================================================
    // SOURCE MAPS POUR DEBUG
    // ============================================================================
    
    sourcemap: process.env.NODE_ENV !== 'production',
  },
  
  // ============================================================================
  // ESBUILD CONFIG (COHÉRENT AVEC BUILD TARGET)
  // ============================================================================
  
  esbuild: {
    target: 'es2020',          // ✅ Cohérent avec build.target
    legalComments: 'none',
    keepNames: true,           // ✅ NOUVEAU: Préserver les noms pour l'héritage
  },
  
  // ============================================================================
  // CSS CONFIGURATION
  // ============================================================================
  
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          // Config optimisée pour embed
          overrideBrowserslist: [
            '> 0.5%',
            'last 3 versions',
            'not dead'
          ]
        })
      ]
    }
  },
  
  // ============================================================================
  // DÉFINITIONS GLOBALES
  // ============================================================================
  
  define: {
    // Mode embed
    'process.env.FUNPLAYER_MODE': JSON.stringify('embed'),
    
    // Version (peut être injectée depuis package.json)
    'process.env.FUNPLAYER_VERSION': JSON.stringify('1.0.0'),
    
    // Environnement
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    
    // ✅ NOUVEAU: Forcer les globaux pour éviter la transformation
    'global.EventTarget': 'globalThis.EventTarget',
    'global.CustomEvent': 'globalThis.CustomEvent',
  },
  
  // ============================================================================
  // CONFIGURATION SERVEUR (pour test embed local)
  // ============================================================================
  
  server: {
    port: 3002,
    cors: true,
    
    // Headers de sécurité pour test
    headers: {
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff'
    }
  }
})