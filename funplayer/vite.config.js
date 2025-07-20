import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

/**
 * Configuration Vite pour funplayer React package
 */
export default defineConfig({
  plugins: [
    react()
  ],
  
  build: {
    outDir: "build",
    emptyOutDir: true,
    target: 'es2020',
    
    // Library mode
    lib: {
      entry: resolve(__dirname, 'src/index.jsx'),
      name: 'FunPlayer',
      fileName: 'index',  // ✅ Juste index.js (ES module pur)
      formats: ['es']     // ✅ Seulement ES module
    },
    
    // External dependencies
    rollupOptions: {
      external: [
        'react', 
        'react-dom',
        'feather-icons',
        'video.js',           // ✅ AJOUT 
        'videojs-playlist',   // ✅ AJOUT
        'videojs-vr',         // ✅ AJOUT
        'buttplug',           // ✅ AJOUT
        'three',               // ✅ AJOUT
        'videojs-vr/dist/videojs-vr',     // ✅ AJOUT
        'videojs-vr/dist/videojs-vr.css', // ✅ AJOUT
      ],
      output: {
        exports: 'named',  // ✅ CRUCIAL: Force exports nommés
        assetFileNames: 'style.css'
      }
    },
    
    // Préservation des noms (comme config embed)
    minify: 'terser',
    terserOptions: {
      compress: {
        keep_classnames: true,
        keep_fnames: true
      },
      mangle: {
        keep_classnames: true,
        keep_fnames: true
      }
    },
    
    sourcemap: true
  },
  
  // ✅ Config esbuild cohérente
  esbuild: {
    target: 'es2020',
    keepNames: true
  }
})