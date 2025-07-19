import React, { Component } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Logo from './Logo';

// Import conditionnel pour éviter les Feature Policy warnings
let videojsVR = null;
let videojsPlaylist = null;

const loadVRPlugin = async () => {
  if (!videojsVR) {
    try {
      videojsVR = await import('videojs-vr/dist/videojs-vr');
      await import('videojs-vr/dist/videojs-vr.css');
      return videojsVR;
    } catch (error) {
      return null;
    }
  }
  return videojsVR;
};

const loadPlaylistPlugin = async () => {
  if (!videojsPlaylist) {
    try {
      videojsPlaylist = await import('videojs-playlist');
      return videojsPlaylist;
    } catch (error) {
      return null;
    }
  }
  return videojsPlaylist;
};

/**
 * MediaPlayer - ✅ REFACTORISÉ: Utilise this.notify directement
 * 
 * AUTONOME: Reçoit notify en props comme les autres managers
 */
class MediaPlayer extends Component {

  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.player = null;
    this.isPlayerReady = false;
    this.initRetries = 0;
    this.maxRetries = 3;

    this.state = {
      renderTrigger: 0
    };

    this.isInitialized = false;
    this.isInitializing = false;
    this.isDestroyed = false;
    
    // ✅ NOUVEAU: Récupérer notify directement depuis les props
    this.notify = props.notify;
  }

  // ============================================================================
  // LIFECYCLE
  // ============================================================================

  componentDidMount() {
    this.isDestroyed = false;
    this.isInitialized = false;
    this.isInitializing = false;
    
    const hasContent = this._hasValidPlaylist();
    
    if (hasContent && !this.isInitialized && !this.isInitializing) {
      setTimeout(() => {
        if (!this.isDestroyed) {
          this.initPlayer();
        }
      }, 50);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.isDestroyed) return;
    
    // ✅ Test de référence simple et ultra-performant
    if (prevProps.playlist === this.props.playlist) return;
    
    // ✅ Si on arrive ici, le contenu a vraiment changé
    this.handlePlaylistPropsChange();
    
    const hasContent = this._hasValidPlaylist();
    if (hasContent && !this.isInitialized && !this.isInitializing) {
      setTimeout(() => {
        if (!this.isDestroyed) {
          this.initPlayer();
        }
      }, 50);
    }
  }

  componentWillUnmount() {
    this.cleanup();
  }

  // ============================================================================
  // GESTION PLAYLIST VIA PROPS
  // ============================================================================

  handlePlaylistPropsChange = () => {
    if (this.player && this.isPlayerReady) {
      this.updatePlaylistFromProps();
    }
  }

  updatePlaylistFromProps = async () => {
    if (!this.player || !this.isPlayerReady || typeof this.player.playlist !== 'function') {
      return;
    }

    const playlistItems = this.props.playlist || [];
    
    if (playlistItems.length === 0) {
      this.player.playlist([]);
      this.notify?.('status:media', { message: 'Playlist cleared', type: 'info' });
      return;
    }

    try {
      this.notify?.('status:media', { message: `Updating Video.js playlist: ${playlistItems.length} items`, type: 'log' });
      
      const vjsPlaylist = this.filterForVideojs(playlistItems);
      this.player.playlist(vjsPlaylist);
      
      if (this.player.playlist.currentItem() === -1) {
        this.player.playlist.currentItem(0);
      }
      
      this.notify?.('status:media', { message: `Video.js playlist updated successfully`, type: 'success' });
      this._triggerRender();
      
    } catch (error) {
      this.notify?.('status:media', { message: 'Failed to update Video.js playlist', type: 'error', error: error.message });
      this.props.onError?.(error);
    }
  }

  // ============================================================================
  // HELPERS AUTONOMES
  // ============================================================================

  _hasValidPlaylist = () => {
    const items = this.props.playlist;
    return items && items.length > 0;
  }

  _triggerRender = () => {
    this.setState(prevState => ({ 
      renderTrigger: prevState.renderTrigger + 1 
    }));
  }

  _isPlaylistMode = () => {
    return this.player && typeof this.player.playlist === 'function' && this.player.playlist().length > 0;
  }

  // ============================================================================
  // PLAYLIST PLUGIN
  // ============================================================================

  initPlaylistPlugin = async () => {
    if (!this.player || this.isDestroyed) return;

    try {
      this.notify?.('status:media', { message: 'Loading Video.js playlist plugin...', type: 'log' });
      const playlistPlugin = await loadPlaylistPlugin();

      if (!playlistPlugin) {
        this.notify?.('status:media', { message: 'Playlist plugin not available, skipping', type: 'info' });
        return;
      }

      if (typeof this.player.playlist !== 'function' && playlistPlugin.default) {
        videojs.registerPlugin('playlist', playlistPlugin.default);
      }

      if (typeof this.player.playlist !== 'function') {
        throw new Error('Playlist plugin failed to register');
      }

      this.player.on('playlistchange', this.handlePlaylistChange);
      this.player.on('playlistitem', this.handlePlaylistItem);
      
      this.notify?.('status:media', { message: 'Video.js playlist plugin loaded successfully', type: 'success' });
      
    } catch (error) {
      this.notify?.('status:media', { message: 'Playlist plugin initialization failed', type: 'error', error: error.message });
      throw error;
    }
  }

  filterForVideojs = (playlist) => {
    return playlist.map(item => {
      const { funscript, ...vjsItem } = item;
      return vjsItem;
    });
  };

  // ============================================================================
  // PLAYLIST EVENT HANDLERS - ✅ MODIFIÉ: Timing correct des événements
  // ============================================================================

  handlePlaylistChange = () => {
    this.notify?.('status:media', { message: 'Video.js playlist changed', type: 'log' });
    this._triggerRender();
    this.updatePlaylistButtons();
  }

  // ✅ MODIFIÉ: Attendre que Video.js soit synchronisé avant d'émettre
  handlePlaylistItem = () => {
    // ✅ NOUVEAU: Petit délai pour s'assurer que Video.js a fini sa mise à jour
    setTimeout(() => {
      const newVideoJsIndex = this.player.playlist.currentItem();
      
      this.notify?.('status:media', { message: `Video.js switched to item ${newVideoJsIndex}`, type: 'log' });
      
      // ✅ Maintenant on émet avec le bon index
      this.props.onPlaylistItemChange?.(newVideoJsIndex);
      
      // Gestion poster
      setTimeout(() => {
        const currentItem = this.getCurrentPlaylistItem();
        if (currentItem && currentItem.poster) {
          this.player.poster(currentItem.poster);
        }
      }, 100);
      
      this.updatePlaylistButtons();
    }, 0); // Micro-délai pour laisser Video.js finir
  }

  // ============================================================================
  // PLAYLIST PUBLIC API - ✅ MODIFIÉ: S'assurer de la synchronisation
  // ============================================================================

  getCurrentPlaylistItem = () => {
    if (!this._isPlaylistMode()) return null;
    const index = this.player.playlist.currentItem();
    const playlist = this.player.playlist();
    return index >= 0 && index < playlist.length ? playlist[index] : null;
  }

  goToPlaylistItem = (index) => {
    if (!this._isPlaylistMode()) return false;
    try {
      // ✅ MODIFIÉ: S'assurer que l'index est valide avant de naviguer
      const playlist = this.player.playlist();
      if (index < 0 || index >= playlist.length) {
        this.notify?.('status:media', { message: `Invalid playlist index: ${index}`, type: 'error' });
        return false;
      }
      
      this.player.playlist.currentItem(index);
      this.notify?.('status:media', { message: `Navigated to playlist item ${index}`, type: 'log' });
      
      // ✅ NOUVEAU: Vérification que la navigation a bien fonctionné
      setTimeout(() => {
        const actualIndex = this.player.playlist.currentItem();
        if (actualIndex !== index) {
          this.notify?.('status:media', { message: `Navigation mismatch: requested ${index}, got ${actualIndex}`, type: 'error' });
        }
      }, 10);
      
      return true;
    } catch (error) {
      this.notify?.('status:media', { message: `Failed to navigate to playlist item ${index}`, type: 'error', error: error.message });
      return false;
    }
  }

  handleNext = () => {
    if (this._isPlaylistMode()) {
      this.player.playlist.next();
      this.notify?.('status:media', { message: 'Video.js playlist: next item', type: 'log' });
    }
  }

  handlePrevious = () => {
    if (this._isPlaylistMode()) {
      this.player.playlist.previous();
      this.notify?.('status:media', { message: 'Video.js playlist: previous item', type: 'log' });
    }
  }

  getPlaylistInfo = () => {
    if (!this._isPlaylistMode()) {
      return { hasPlaylist: false, currentIndex: -1, totalItems: 0 };
    }
    
    const currentIndex = this.player.playlist.currentItem();
    const totalItems = this.player.playlist().length;
    
    return {
      hasPlaylist: true,
      currentIndex,
      totalItems,
      canNext: currentIndex < totalItems - 1,
      canPrevious: currentIndex > 0
    };
  }

  // ============================================================================
  // PLAYLIST COMPONENTS REGISTRATION
  // ============================================================================

  registerPlaylistComponents = () => {
    const Button = videojs.getComponent('Button');

    class PreviousButton extends Button {
      constructor(player, options) {
        super(player, options);
        this.controlText('Previous item');
      }

      handleClick() {
        if (this.player().playlist) {
          this.player().playlist.previous();
        }
      }

      createEl() {
        const el = super.createEl('button', {
          className: 'vjs-previous-button vjs-control vjs-button'
        });
        el.innerHTML = '<span aria-hidden="true">⏮</span>';
        el.title = 'Previous item';
        return el;
      }
    }

    class NextButton extends Button {
      constructor(player, options) {
        super(player, options);
        this.controlText('Next item');
      }

      handleClick() {
        if (this.player().playlist) {
          this.player().playlist.next();
        }
      }

      createEl() {
        const el = super.createEl('button', {
          className: 'vjs-next-button vjs-control vjs-button'
        });
        el.innerHTML = '<span aria-hidden="true">⏭</span>';
        el.title = 'Next item';
        return el;
      }
    }

    videojs.registerComponent('PreviousButton', PreviousButton);
    videojs.registerComponent('NextButton', NextButton);

    this.notify?.('status:media', { message: 'Video.js playlist control buttons registered', type: 'log' });
  }

  updatePlaylistButtons = () => {
    if (!this.player) return;

    const controlBar = this.player.getChild('controlBar');
    if (!controlBar) return;

    const prevBtn = controlBar.getChild('PreviousButton');
    const nextBtn = controlBar.getChild('NextButton');
    const playlistInfo = this.getPlaylistInfo();

    if (prevBtn) {
      prevBtn.el().disabled = !playlistInfo.canPrevious;
      prevBtn.el().style.opacity = playlistInfo.canPrevious ? '1' : '0.3';
    }

    if (nextBtn) {
      nextBtn.el().disabled = !playlistInfo.canNext;
      nextBtn.el().style.opacity = playlistInfo.canNext ? '1' : '0.3';
    }
  }

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  initPlayer = async () => {
    if (this.isDestroyed || this.isInitialized || this.isInitializing) {
      return;
    }

    if (!this.videoRef?.current) {
      this.notify?.('status:media', { message: 'Video element not available for initialization', type: 'error' });
      return;
    }

    this.isInitializing = true;
    this.notify?.('status:media', { message: 'Initializing Video.js player...', type: 'processing' });

    try {
      const videoElement = this.videoRef.current;
      this.registerPlaylistComponents();

      const options = {
        controls: true,
        responsive: true,
        fluid: true,
        playsinline: true,
        preload: 'metadata',
        techOrder: ['html5'],
        html5: {
          vhs: {
            overrideNative: false
          }
        },
        controlBar: {
          children: [
            'playToggle', 'currentTimeDisplay', 'timeDivider', 
            'durationDisplay', 'progressControl', 'PreviousButton', 
            'NextButton', 'volumePanel', 'fullscreenToggle'
          ]
        }
      };

      this.player = videojs(videoElement, options);
      
      if (!this.player) {
        throw new Error('Failed to create Video.js player instance');
      }

      this.player.ready(() => {
        if (this.isDestroyed) return;

        this.isPlayerReady = true;
        this.isInitialized = true;
        this.isInitializing = false;
        
        this.notify?.('status:media', { message: 'Video.js player ready', type: 'success' });
        
        this.initPlugins().then(() => {
          // ✅ CORRIGÉ: Callbacks après plugins pour supporter playlist events
          this.setupCallbacks();
          
          this.notify?.('status:media', { message: 'Video.js player initialization complete', type: 'success' });
          this._triggerRender();
        }).catch((error) => {
          this.notify?.('status:media', { message: 'Plugin initialization failed', type: 'error', error: error.message });
          this.props.onError?.(error);
        });
      });

    } catch (error) {
      this.notify?.('status:media', { message: 'Failed to initialize Video.js player', type: 'error', error: error.message });
      this.isInitializing = false;
      this.props.onError?.(error);
    }
  }

  initPlugins = async () => {
    if (this.isDestroyed || !this.player) return;

    try {
      this.notify?.('status:media', { message: 'Loading Video.js plugins...', type: 'processing' });

      const [vrResult, playlistResult] = await Promise.allSettled([
        this.initVRPlugin(),
        this.initPlaylistPlugin()
      ]);

      if (vrResult.status === 'rejected') {
        this.notify?.('status:media', { message: 'VR plugin initialization failed', type: 'log', error: vrResult.reason?.message });
      }

      if (playlistResult.status === 'rejected') {
        this.notify?.('status:media', { message: 'Playlist plugin initialization failed', type: 'error', error: playlistResult.reason?.message });
      }

      if (this._hasValidPlaylist()) {
        await this.updatePlaylistFromProps();
      }

      this.notify?.('status:media', { message: 'Video.js plugins loaded', type: 'success' });

    } catch (error) {
      this.notify?.('status:media', { message: 'Plugin initialization error', type: 'error', error: error.message });
      throw error;
    }
  }

  // ============================================================================
  // VR PLUGIN
  // ============================================================================
  
  initVRPlugin = async () => {
    if (!this.player || this.isDestroyed) return;

    try {
      this.notify?.('status:media', { message: 'Loading Video.js VR plugin...', type: 'log' });
      const vrPlugin = await loadVRPlugin();
      
      if (!vrPlugin) {
        this.notify?.('status:media', { message: 'VR plugin not available', type: 'info' });
        return;
      }

      if (typeof this.player.vr === 'function') {
        this.configureVRPlugin();
        return;
      }

      if (!videojs.getPlugin('vr')) {
        if (vrPlugin.default) {
          const vrWrapper = function(options = {}) {
            return new vrPlugin.default(this, options);
          };
          videojs.registerPlugin('vr', vrWrapper);
        }
      }

      this.configureVRPlugin();
      this.notify?.('status:media', { message: 'VR plugin loaded successfully', type: 'success' });
      
    } catch (error) {
      this.notify?.('status:media', { message: 'VR plugin initialization failed', type: 'log', error: error.message });
    }
  }

  configureVRPlugin = () => {
    if (!this.player || this.isDestroyed) return;
    
    try {
      if (!this.player.mediainfo) {
        this.player.mediainfo = {};
      }
      
      this.player.vr({
        projection: 'AUTO',
        debug: false,
        forceCardboard: false
      });
      
      this.notify?.('status:media', { message: 'VR plugin configured', type: 'log' });
    } catch (error) {
      this.notify?.('status:media', { message: 'VR configuration failed', type: 'log', error: error.message });
    }
  }

  // ============================================================================
  // CALLBACKS
  // ============================================================================

  setupCallbacks = () => {
    if (!this.player) return;

    // ============================================================================
    // ERROR EVENTS (en premier pour capturer les erreurs setup)
    // ============================================================================
    
    this.player.on('error', (error) => {
      this.notify?.('status:media', { message: 'Video.js player error occurred', type: 'error', error: error?.message || 'Unknown Video.js error' });
      this.props.onError?.(error);
    });

    // ============================================================================
    // PLAYBACK CONTROL EVENTS
    // ============================================================================
    
    this.player.on('play', () => {
      const currentTime = this.player.currentTime() || 0;
      this.notify?.('status:media', { message: `Playback started at ${currentTime.toFixed(1)}s`, type: 'log' });
      
      this.updatePlaylistButtons();
      this.props.onPlay?.({ currentTime });
    });

    this.player.on('pause', () => {
      const currentTime = this.player.currentTime() || 0;
      this.notify?.('status:media', { message: `Playback paused at ${currentTime.toFixed(1)}s`, type: 'log' });
      
      this.props.onPause?.({ currentTime });
    });

    this.player.on('ended', () => {
      this.notify?.('status:media', { message: 'Media playback ended', type: 'info' });
      this.props.onEnded?.({ currentTime: 0 });
    });

    // ============================================================================
    // SEEKING EVENTS
    // ============================================================================
    
    this.player.on('seeking', () => {
      const currentTime = this.player.currentTime() || 0;
      this.notify?.('status:media', { message: `Seeking to ${currentTime.toFixed(1)}s`, type: 'log' });
      this.props.onSeeking?.({ currentTime });
    });

    this.player.on('seeked', () => {
      const currentTime = this.player.currentTime() || 0;
      this.notify?.('status:media', { message: `Seeked to ${currentTime.toFixed(1)}s`, type: 'log' });
      
      this.props.onSeeked?.({ currentTime });
    });

    // ============================================================================
    // TIME EVENTS
    // ============================================================================
    
    this.player.on('timeupdate', () => {
      const currentTime = this.player.currentTime() || 0;
      this.props.onTimeUpdate?.({ currentTime });
    });

    this.player.on('durationchange', () => {
      const duration = this.player.duration() || 0;
      this.notify?.('status:media', { message: `Duration changed: ${duration.toFixed(1)}s`, type: 'log' });
      this.props.onDurationChange?.({ duration });
    });

    // ============================================================================
    // LOADING EVENTS
    // ============================================================================
    
    this.player.on('loadstart', () => {
      this.notify?.('status:media', { message: 'Media loading started', type: 'log' });
      this.props.onLoadStart?.({ });
    });

    this.player.on('loadeddata', () => {
      const duration = this.player.duration() || 0;
      this.notify?.('status:media', { message: 'Media data loaded', type: 'log' });
      this.props.onLoadedData?.({ duration });
    });

    this.player.on('loadedmetadata', () => {
      const duration = this.player.duration() || 0;
      this.notify?.('status:media', { message: `Media loaded: ${duration.toFixed(1)}s duration`, type: 'success' });
      
      this.updatePlaylistButtons();
      this._triggerRender();
      
      this.props.onLoadedMetadata?.({ 
        duration, 
        type: this._isPlaylistMode() ? 'playlist' : 'media' 
      });
    });

    this.player.on('canplay', () => {
      const currentTime = this.player.currentTime() || 0;
      this.notify?.('status:media', { message: 'Media ready to play', type: 'log' });
      this.props.onCanPlay?.({ currentTime });
    });

    this.player.on('canplaythrough', () => {
      const currentTime = this.player.currentTime() || 0;
      this.notify?.('status:media', { message: 'Media can play through', type: 'log' });
      this.props.onCanPlayThrough?.({ currentTime });
    });

    // ============================================================================
    // BUFFERING EVENTS
    // ============================================================================
    
    this.player.on('waiting', () => {
      const currentTime = this.player.currentTime() || 0;
      this.notify?.('status:media', { message: 'Media buffering...', type: 'log' });
      this.props.onWaiting?.({ currentTime });
    });

    this.player.on('stalled', () => {
      const currentTime = this.player.currentTime() || 0;
      this.notify?.('status:media', { message: 'Media connection stalled', type: 'warning' });
      this.props.onStalled?.({ currentTime });
    });

    this.player.on('suspend', () => {
      const currentTime = this.player.currentTime() || 0;
      this.notify?.('status:media', { message: 'Media loading suspended', type: 'log' });
      this.props.onSuspend?.({ currentTime });
    });

    // ============================================================================
    // VOLUME EVENTS
    // ============================================================================
    
    this.player.on('volumechange', () => {
      const volume = this.player.volume();
      const muted = this.player.muted();
      this.notify?.('status:media', { message: `Volume: ${muted ? 'muted' : Math.round(volume * 100) + '%'}`, type: 'log' });
      this.props.onVolumeChange?.({ volume, muted });
    });

    // ============================================================================
    // ERROR EVENTS
    // ============================================================================
    
    this.player.on('error', (error) => {
      this.notify?.('status:media', { message: 'Video.js player error occurred', type: 'error', error: error?.message || 'Unknown Video.js error' });
      this.props.onError?.(error);
    });

    // ============================================================================
    // SIZE EVENTS
    // ============================================================================
    
    this.player.on('resize', () => {
      const dimensions = {
        width: this.player.currentWidth(),
        height: this.player.currentHeight()
      };
      this.notify?.('status:media', { message: `Player resized: ${dimensions.width}x${dimensions.height}`, type: 'log' });
      this.props.onResize?.(dimensions);
    });

    // ============================================================================
    // PLAYLIST EVENTS - ✅ Événements playlist spécifiques FunPlayer
    // ============================================================================
    
    // Setup playlist callbacks si playlist plugin est disponible
    if (this.player.playlist) {
      this.player.on('playlistitem', (event) => {
        const currentIndex = this.player.playlist.currentItem();
        const totalItems = this.player.playlist().length;
        
        this.notify?.('status:media', { 
          message: `Playlist item changed: ${currentIndex + 1}/${totalItems}`, 
          type: 'info' 
        });
        
        this.updatePlaylistButtons();
        this._triggerRender();
        
        this.props.onPlaylistItemChange?.({ 
          index: currentIndex,
          total: totalItems,
          item: this.player.playlist()[currentIndex]
        });
      });
    }
  }

  // ============================================================================
  // CLEANUP
  // ============================================================================

  cleanup = () => {
    this.isDestroyed = true;
    this.isInitialized = false;
    this.isInitializing = false;
    
    if (this.player) {
      try {
        if (!this.player.paused()) {
          this.player.pause();
        }
        
        if (typeof this.player.dispose === 'function') {
          this.player.dispose();
        }
        
        this.notify?.('status:media', { message: 'Video.js player disposed', type: 'log' });
      } catch (error) {
        this.notify?.('status:media', { message: 'Error during player cleanup', type: 'error', error: error.message });
      } finally {
        this.player = null;
        this.isPlayerReady = false;
        this.initRetries = 0;
        
        this.setState({
          renderTrigger: 0
        });
      }
    }
  }

  // ============================================================================
  // PUBLIC API
  // ============================================================================

  play = () => this.player?.play()
  pause = () => this.player?.pause()
  stop = () => { 
    this.player?.pause(); 
    this.player?.currentTime(0); 
  }
  seek = (time) => this.player?.currentTime(time)
  getTime = () => this.player?.currentTime() || 0
  getDuration = () => this.player?.duration() || 0
  isPlaying = () => this.player ? !this.player.paused() : false

  nextItem = () => this.handleNext()
  previousItem = () => this.handlePrevious()
  goToItem = (index) => this.goToPlaylistItem(index)
  getCurrentItem = () => this.getCurrentPlaylistItem()
  getPlaylist = () => this._isPlaylistMode() ? this.player.playlist() : []

  getState = () => ({
    currentTime: this.getTime(),
    duration: this.getDuration(),
    isPlaying: this.isPlaying(),
    mediaType: this._isPlaylistMode() ? 'playlist' : 'media',
    playlistInfo: this.getPlaylistInfo()
  })

  // ============================================================================
  // RENDER
  // ============================================================================

  render() {
    const hasContent = this._hasValidPlaylist();
    
    return (
      <div className='fp-media-player'>
        {hasContent ? (
          <video
            ref={this.videoRef}
            className="video-js vjs-default-skin fp-media-player-video"
            playsInline
            data-setup="{}"
          />
        ) : (
          <div className="fp-media-player-placeholder">
            <Logo className="fp-media-player-placeholder-logo" size={240} />
          </div>
        )}
      </div>
    );
  }
}

export default MediaPlayer;