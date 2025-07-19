import React, { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import StreamlitFunPlayer from "./StreamlitFunPlayer"

// ✅ SIMPLIFIÉ: Console filtering basique (optionnel)
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  // En production, filtrer seulement les Feature Policy warnings les plus verbeux
  const originalWarn = console.warn;
  console.warn = (...args) => {
    const message = args.join(' ');
    if (!message.includes('Feature Policy')) {
      originalWarn.apply(console, args);
    }
  };
}

// Error boundary pour capturer les erreurs React
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('FunPlayer Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          background: '#fee', 
          border: '1px solid #fcc',
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '14px'
        }}>
          <h3>Something went wrong with FunPlayer</h3>
          <details>
            <summary>Error details</summary>
            <pre>{this.state.error?.toString()}</pre>
          </details>
          <button 
            onClick={() => window.location.reload()}
            style={{ 
              marginTop: '10px', 
              padding: '5px 10px',
              cursor: 'pointer'
            }}
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Vérifier que l'élément root existe
const rootElement = document.getElementById("root")

if (!rootElement) {
  throw new Error("Root element not found")
}

const root = createRoot(rootElement)

root.render(
  //<StrictMode>
    <ErrorBoundary>
      <StreamlitFunPlayer />
    </ErrorBoundary>
  //</StrictMode>
)