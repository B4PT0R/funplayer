import React from 'react';
import { Streamlit, StreamlitComponentBase, withStreamlitConnection } from 'streamlit-component-lib';
import FunPlayer from 'funplayer-react'
import 'funplayer-react/style.css'

class StreamlitFunPlayer extends StreamlitComponentBase {
  constructor(props) {
    super(props);
    
    this.state = {
      isStreamlitReady: false,
      lastHeight: 0
    };
    
    // Debouncer pour setFrameHeight
    this.resizeTimeout = null;
  }

  componentDidMount() {
    this.waitForStreamlitReady().then(() => {
      this.setState({ isStreamlitReady: true });
      this.handleResize();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isStreamlitReady && !prevState.isStreamlitReady) {
      this.handleResize();
    }
  }

  componentWillUnmount() {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
  }

  // ============================================================================
  // STREAMLIT INTEGRATION - Inchangé
  // ============================================================================

  waitForStreamlitReady = async () => {
    return new Promise((resolve) => {
      const checkStreamlit = () => {
        if (Streamlit && 
            typeof Streamlit.setFrameHeight === 'function' && 
            typeof Streamlit.setComponentValue === 'function') {
          resolve();
        } else {
          setTimeout(checkStreamlit, 10);
        }
      };
      checkStreamlit();
    });
  }

  handleResize = (dimensions) => {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    
    this.resizeTimeout = setTimeout(() => {
      if (!this.state.isStreamlitReady || !Streamlit || typeof Streamlit.setFrameHeight !== 'function') {
        return;
      }

      try {
        const height = dimensions?.height || 300; // Fallback au cas où
        
        if (Math.abs(height - this.state.lastHeight) > 0) {
          Streamlit.setFrameHeight(height);
          this.setState({ lastHeight: height });
        }
      } catch (error) {
        console.error('StreamlitFunPlayer: setFrameHeight failed:', error);
      }
    }, 50);
  }

  // ============================================================================
  // RENDER
  // ============================================================================

  render() {
    const { args, theme: streamlitTheme } = this.props;
    const { isStreamlitReady } = this.state;
    
    const playlist = args?.playlist || null;
    const customTheme = args?.theme || null;
    
    // ✅ Thème unifié : customTheme OU thème Streamlit converti
    const Theme = customTheme || streamlitTheme;

    return isStreamlitReady ? (
      <FunPlayer 
        playlist={playlist}
        theme={Theme}
        onResize={this.handleResize}
      />
    ) : (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        Loading...
      </div>
    );
  }
}

export default withStreamlitConnection(StreamlitFunPlayer);