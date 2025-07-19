import { defineConfig, loadEnv} from "vite"
import react from "@vitejs/plugin-react-swc"

/**
 * Vite configuration for Streamlit React Component development
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const port = env.VITE_PORT ? parseInt(env.VITE_PORT) : 3001

  return {
    base: "./",
    plugins: [react()],
    server: {
      port,
      cors: false,  // !!!
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS',
      }
    },
    build: {
      outDir: "dist",
      // ✅ MODIFIÉ: Spécifier le point d'entrée index.jsx
      rollupOptions: {
        input: {
          main: './index.html'
        }
      }
    },
    // ✅ AJOUT: Résolution des extensions pour supporter .jsx en priorité
    resolve: {
      extensions: ['.jsx', '.js', '.tsx', '.ts', '.json']
    }
  }
})