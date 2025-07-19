import React, { Component } from 'react';
import MediaPlayer from './MediaPlayer';
import PlaylistComponent from './PlaylistComponent';
import HapticSettingsComponent from './HapticSettingsComponent';
import HapticVisualizerComponent from './HapticVisualizerComponent';
import LoggingComponent from './LoggingComponent';
import StatusBarComponent from './StatusBarComponent';
import FunPlayerCore from './FunPlayerCore';
import ThemeUtils from './ThemeUtils';
import './funplayer.scss';

/**
 * FunPlayer - ✅ REFACTORISÉ: Status notifications uniformisées + callback MediaPlayer
 */
class FunPlayer extends Component {
  constructor(props) {
    super(props);

    this.core=new FunPlayerCore()
    
    this.state = {
      updateRate: 60,
      isPlaying: false,
      currentActuatorData: new Map(),
      showVisualizer: true,
      showDebug: false,
      showPlaylist: true,
      renderTrigger: 0
    };
    

    // ✅ NOUVEAU: Ref directe sur le container principal
    this.containerRef = React.createRef();
    this.mediaPlayerRef = React.createRef();
    
    // Haptic loop technique (performance pure)
    this.hapticIntervalId = null;
    this.expectedHapticTime = 0;
    this.hapticTime = 0;
    this.lastMediaTime = 0;
    this.lastSyncTime = 0;

    // ✅ MODIFIÉ: État buffering 
    this.isBuffering = false;
    this.bufferingStartTime = 0;
    this.bufferingSource = null; // 'waiting' | 'stall_detection' | null
    this.stallTimeoutId = null;
    this.stallTimeout = 5000; // 5s pour détecter un player figé
    this.isHapticAborted = false; // Flag d'abandon définitif
    
    // Event listener cleanup
    this.coreListener = null;
  }

  // ============================================================================
  // LIFECYCLE
  // ============================================================================

  componentDidMount() {
    this.applyTheme();
    this.initializeComponent();
  }

  // ✅ Dans FunPlayer.jsx
  componentDidUpdate(prevProps) {
    if (prevProps.theme !== this.props.theme) {
      this.applyTheme();
    }
    
    // ✅ Test de référence simple et ultra-performant
    if (prevProps.playlist === this.props.playlist) return;
    
    // ✅ Si on arrive ici, le contenu a vraiment changé
    this.handlePlaylistUpdate();
  }

  componentWillUnmount() {
    this.stopHapticLoop();
    
    // ✅ NOUVEAU: Cleanup timeout stall
    if (this.stallTimeoutId) {
      clearTimeout(this.stallTimeoutId);
      this.stallTimeoutId = null;
    }
    
    if (this.coreListener) {
      this.coreListener();
    }
  }

  initializeComponent = () => {
    try {
      this.core.notify?.('status:funplayer', { message: 'Initializing FunPlayer component...', type: 'processing' });
      
      this.coreListener = this.core.addListener(this.handleEvent);
      
      if (this.props.playlist) {
        this.handlePlaylistUpdate();
      }
      
      this.core.notify?.('status:funplayer', { message: 'FunPlayer component initialized', type: 'success' });
      
    } catch (error) {
      this.core.notify?.('status:funplayer', { message: 'FunPlayer initialization failed', type: 'error', error: error.message });
    }
  }

  handlePlaylistUpdate = async () => {
    const { playlist } = this.props;
    
    this.core.notify?.('status:funplayer', { message: `Synchronizing playlist: ${playlist?.length || 0} items`, type: 'log' });
    
    await this.core.playlist.loadPlaylist(playlist);
  }

  // ============================================================================
  // THEME
  // ============================================================================

  applyTheme = () => {
    const { theme } = this.props;
    if (!theme) return;

    // ✅ SIMPLIFIÉ: Utilisation de ThemeUtils.applyThemeToElement
    const element = this.containerRef.current;
    if (!element) {
      console.warn('Cannot apply theme: container ref not available');
      return;
    }

    const success = ThemeUtils.applyThemeToElement(theme, element);
    
    if (success) {
      this.core.notify?.('status:funplayer', { 
        message: 'Theme applied successfully with fp- prefixed variables', 
        type: 'log' 
      });
    } else {
      this.core.notify?.('status:funplayer', { 
        message: 'Failed to apply theme', 
        type: 'error' 
      });
    }
  }

  // ============================================================================
  // GESTION D'ÉVÉNEMENTS
  // ============================================================================

  handleEvent = (event, data) => {
    switch (event) {
      // ============================================================================
      // MEDIA EVENTS - Router vers handlers internes (noms harmonisés)
      // ============================================================================
      case 'media:play':
        this.handleMediaPlayEvent(data);
        break;
      case 'media:pause':
        this.handleMediaPauseEvent(data);
        break;
      case 'media:ended':
        this.handleMediaEndedEvent(data);
        break;
        
      // ✅ CORRIGÉ: seeking/seeked (événements natifs Video.js)
      case 'media:seeking':
        this.handleMediaSeekingEvent(data);
        break;
      case 'media:seeked':
        this.handleMediaSeekedEvent(data);
        break;
        
      // Time events
      case 'media:timeupdate':
        this.handleMediaTimeUpdateEvent(data);
        break;
      case 'media:durationchange':
        this.handleMediaDurationChangeEvent(data);
        break;
        
      // Loading events
      case 'media:loadstart':
        this.handleMediaLoadStartEvent(data);
        break;
      case 'media:loadeddata':
        this.handleMediaLoadedDataEvent(data);
        break;
      case 'media:loadedmetadata':
        this.handleMediaLoadedMetadataEvent(data);
        break;
      case 'media:canplay':
        this.handleMediaCanPlayEvent(data);
        break;
      case 'media:canplaythrough':
        this.handleMediaCanPlayThroughEvent(data);
        break;
        
      // Buffering events
      case 'media:waiting':
        this.handleMediaWaitingEvent(data);
        break;
      case 'media:stalled':
        this.handleMediaStalledEvent(data);
        break;
      case 'media:suspend':
        this.handleMediaSuspendEvent(data);
        break;
        
      // Volume events
      case 'media:volumechange':
        this.handleMediaVolumeChangeEvent(data);
        break;
        
      // Error events
      case 'media:error':
        this.handleMediaErrorEvent(data);
        break;
        
      // Playlist events
      case 'media:playlistitemchange':
        this.handleMediaPlaylistItemChangeEvent(data);
        break;
        
      // Size events
      case 'media:resize':
        this.handleMediaResizeEvent(data);
        break;

      // ============================================================================
      // FUNPLAYER SPECIFIC EVENTS
      // ============================================================================
      case 'buttplug:device':
        if (data.connected !== false) {
          this.handleDeviceConnect(data);
        } else {
          this.handleDeviceDisconnect(data);
        }
        this._triggerRender();
        break;
        
      case 'buttplug:connection':
        if (data.connected === false && data.reason) {
          const disconnectData = { device: { name: 'All devices' }, reason: data.reason };
          this.handleDeviceDisconnect(disconnectData);
        }
        this._triggerRender();
        break;
        
      case 'haptic:started':
        this.handleHapticStart(data);
        break;
        
      case 'haptic:stopped':
        this.handleHapticStop(data);
        break;

      // ============================================================================
      // OTHER EVENTS
      // ============================================================================
      case 'core:ready':
        this.core.notify('status:funplayer',{message:'Core systems ready', type:'success'});
        this._triggerRender();
        break;
        
      case 'playlist:playbackChanged':
        this.setState({ isPlaying: data.isPlaying });
        break;

      case 'playlist:itemChanged':
        if (this.mediaPlayerRef.current && data.index >= 0) {
          const currentMediaPlayerIndex = this.mediaPlayerRef.current.getPlaylistInfo().currentIndex;
          if (currentMediaPlayerIndex !== data.index) {
            this.core.notify?.('status:funplayer', { 
              message: `Syncing MediaPlayer: ${currentMediaPlayerIndex} → ${data.index}`, 
              type: 'log' 
            });
            this.mediaPlayerRef.current.goToPlaylistItem(data.index);
          }
        }
        break;
        
      case 'funscript:load':
      case 'funscript:channels':
        this._triggerRender();
        break;

      case 'component:resize':
        this.handleResize(data);
        break
    }
  }

  _triggerRender = () => {
    this.setState(prevState => ({ 
      renderTrigger: prevState.renderTrigger + 1 
    }));
  }

  // ============================================================================
  // MAIN API CALLBACKS
  // ============================================================================

  handleResize = (data) => {
    const element = this.containerRef.current;
    
    if (!element) {
      console.warn('📏 FunPlayer container ref not available');
      return;
    }

    const dimensions = {
      width: element.offsetWidth,
      height: element.offsetHeight
    };
    
    // ✅ Logging avec fallbacks pour rétrocompatibilité
    if (data && typeof data === 'object') {
      // Nouveau système: data fourni via bus d'événements
      const source = data.source || 'unknown';
      const reason = data.reason ? ` (${data.reason})` : '';
      
      this.core.notify?.('status:funplayer', { 
        message: `Resize from ${source}${reason}: ${dimensions.width}×${dimensions.height}px`, 
        type: 'log' 
      });
    } else {
      // Ancien système: appel direct sans contexte
      this.core.notify?.('status:funplayer', { 
        message: `Resize (legacy call): ${dimensions.width}×${dimensions.height}px`, 
        type: 'log' 
      });
    }
    
    // ✅ Propager vers l'hôte (Streamlit/Web Component)
    this.props.onResize?.(dimensions);
  }

  // Device Events (logique déjà dans ButtPlugManager)
  handleDeviceConnect = (data) => {
    // ✅ Trace pour uniformité/debug (pas d'echo au bus)
    this.core.notify?.('status:funplayer', { 
      message: `Device connected: ${data.device?.name || 'Unknown'}`, 
      type: 'log' 
    });
    this.props.onDeviceConnect?.(data);
  }

  handleDeviceDisconnect = (data) => {
    // ✅ Trace pour uniformité/debug (pas d'echo au bus)
    this.core.notify?.('status:funplayer', { 
      message: `Device disconnected: ${data.device?.name || 'Unknown'}`, 
      type: 'log' 
    });
    this.props.onDeviceDisconnect?.(data);
  }

  // Haptic Events (logique déjà dans boucle haptique)
  handleHapticStart = (data) => {
    // ✅ Trace pour uniformité/debug (pas d'echo au bus)
    this.core.notify?.('status:funplayer', { 
      message: `Haptic playback started: ${data.channels} channels at ${data.updateRate}Hz`, 
      type: 'log' 
    });
    this.props.onHapticStart?.(data);
  }

  handleHapticStop = (data) => {
    // ✅ Trace pour uniformité/debug (pas d'echo au bus)
    this.core.notify?.('status:funplayer', { 
      message: `Haptic playback stopped: ${data.reason}`, 
      type: 'log' 
    });
    this.props.onHapticStop?.(data);
  }

  // ============================================================================
  // MEDIA PLAYER CALLBACKS
  // ============================================================================

  handleMediaPlay = (data) => {
    this.core.notify("media:play", data);
    this.props.onPlay?.(data);
  }

  handleMediaPause = (data) => {
    this.core.notify("media:pause", data);
    this.props.onPause?.(data);
  }

  handleMediaEnded = (data) => {
    this.core.notify("media:ended", data);
    this.props.onEnded?.(data);
  }

  handleMediaSeeking = (data) => {
    this.core.notify("media:seeking", data);
    this.props.onSeeking?.(data);
  }

  handleMediaSeeked = (data) => {
    this.core.notify("media:seeked", data);
    this.props.onSeeked?.(data);
  }

  handleMediaTimeUpdate = (data) => {
    this.core.notify("media:timeupdate", data);
    this.props.onTimeUpdate?.(data);
  }

  handleMediaDurationChange = (data) => {
    this.core.notify("media:durationchange", data);
    this.props.onDurationChange?.(data);
  }

  handleMediaLoadStart = (data) => {
    this.core.notify("media:loadstart", data);
    this.props.onLoadStart?.(data);
  }

  handleMediaLoadedData = (data) => {
    this.core.notify("media:loadeddata", data);
    this.props.onLoadedData?.(data);
  }

  handleMediaLoadedMetadata = (data) => {
    this.core.notify("media:loadedmetadata", data);
    this.props.onLoadedMetadata?.(data);
  }

  handleMediaCanPlay = (data) => {
    this.core.notify("media:canplay", data);
    this.props.onCanPlay?.(data);
  }

  handleMediaCanPlayThrough = (data) => {
    this.core.notify("media:canplaythrough", data);
    this.props.onCanPlayThrough?.(data);
  }

  handleMediaWaiting = (data) => {
    this.core.notify("media:waiting", data);
    this.props.onWaiting?.(data);
  }

  handleMediaStalled = (data) => {
    this.core.notify("media:stalled", data);
    this.props.onStalled?.(data);
  }

  handleMediaSuspend = (data) => {
    this.core.notify("media:suspend", data);
    this.props.onSuspend?.(data);
  }

  handleMediaVolumeChange = (data) => {
    this.core.notify("media:volumechange", data);
    this.props.onVolumeChange?.(data);
  }

  handleMediaError = (data) => {
    this.core.notify("media:error", data);
    this.props.onError?.(data);
  }

  handleMediaPlaylistItemChange = (data) => {
    this.core.notify("media:playlistitemchange", data);
    this.props.onPlaylistItemChange?.(data);
  }

  handleMediaResize = (data) => {
    this.core.notify("media:resize", data);
  }

  // ============================================================================
  // MEDIA PLAYER EVENT HANDLERS
  // ============================================================================

  handleMediaPlayEvent = ({ currentTime }) => {
    // Timing technique haptique
    this.hapticTime = currentTime || 0;
    this.lastMediaTime = this.hapticTime;
    this.lastSyncTime = performance.now();
    
    const duration = this.mediaPlayerRef.current?.getDuration() || 0;
    
    this.core.playlist.updatePlaybackState(true, currentTime, duration);
    
    // Démarrage boucle haptique
    if (this.core.funscript.hasFunscript()) {
      this.startHapticLoop();
      this.core.notify?.('status:funplayer', { message: `Haptic playback started at ${currentTime.toFixed(1)}s`, type: 'log' });
    }
  }

  handleMediaPauseEvent = async ({ currentTime }) => {
    // Arrêt boucle haptique
    if (this.core.funscript.hasFunscript()) {
      this.stopHapticLoop();
      try {
        await this.core.buttplug.stopAll();
        this.core.notify?.('status:funplayer', { message: 'Haptic devices stopped', type: 'log' });
      } catch (error) {
        this.core.notify?.('status:funplayer', { message: 'Failed to stop haptic devices', type: 'log', error: error.message });
      }
    }
    
    const duration = this.mediaPlayerRef.current?.getDuration() || 0;
    this.core.playlist.updatePlaybackState(false, currentTime, duration);
    
    this.setState({ currentActuatorData: new Map() });
  }

  handleMediaEndedEvent = async ({ currentTime }) => {
    // Arrêt boucle haptique
    if (this.core.funscript.hasFunscript()) {
      this.stopHapticLoop();
      try {
        await this.core.buttplug.stopAll();
        this.core.notify?.('status:funplayer', { message: 'Haptic playback ended', type: 'log' });
      } catch (error) {
        this.core.notify?.('status:funplayer', { message: 'Failed to stop haptic devices on end', type: 'log', error: error.message });
      }
    }
    
    this.core.playlist.updatePlaybackState(false, 0, 0);
    
    this.hapticTime = 0;
    this.lastMediaTime = 0;
    this.setState({ currentActuatorData: new Map() });
  }

  handleMediaSeekingEvent = ({ currentTime }) => {
    // Pas de logique spéciale pour l'instant
    this.core.notify?.('status:funplayer', { message: `Seeking to ${currentTime.toFixed(1)}s`, type: 'log' });
  }

  handleMediaSeekedEvent = ({ currentTime }) => {
    // Sync haptique après seek
    if (this.core.funscript.hasFunscript() && this.hapticIntervalId) {
      this.hapticTime = currentTime;
      this.lastMediaTime = currentTime;
      this.lastSyncTime = performance.now();
      this.core.notify?.('status:funplayer', { message: `Seeked to ${currentTime.toFixed(1)}s`, type: 'log' });
    }
  }

  handleMediaTimeUpdateEvent = ({ currentTime }) => {
    // Si haptique déjà abandonné, ne plus rien faire
    if (this.isHapticAborted) {
      return;
    }
    
    // Synchronisation timing haptique (technique pur)
    if (!this.core.funscript.hasFunscript() || !this.hapticIntervalId) {
      return;
    }
    
    const now = performance.now();
    const timeSinceLastSync = (now - this.lastSyncTime) / 1000;
    const mediaTimeDelta = currentTime - this.lastMediaTime;
    
    // ✅ Détection stall : 1s+ sans progression ET pas de buffering officiel
    if (timeSinceLastSync > 1.0 && Math.abs(mediaTimeDelta) < 0.01 && !this.isBuffering) {
      this.core.notify?.('status:funplayer', { message: 'Player stall detected (1s+ frozen), starting timeout', type: 'error' });
      this._startBuffering('stall_detection', currentTime);
      return;
    }
    
    // Synchronisation normale
    const drift = Math.abs(currentTime - this.hapticTime);
    const shouldResync = drift > 0.05 || timeSinceLastSync > 1.0;
    
    if (shouldResync) {
      this.hapticTime = currentTime;
      this.lastMediaTime = currentTime;
      this.lastSyncTime = now;
      
      if (drift > 0.1) {
        this.core.notify?.('status:funplayer', { message: `Haptic drift detected: ${(drift * 1000).toFixed(1)}ms, resyncing`, type: 'log' });
      }
    }
  }

  handleMediaDurationChangeEvent = ({ duration }) => {
    // Pas de logique spéciale pour l'instant
    this.core.notify?.('status:funplayer', { message: `Duration changed: ${duration.toFixed(1)}s`, type: 'log' });
  }

  handleMediaLoadStartEvent = (data) => {
    // Pas de logique spéciale pour l'instant
    this.core.notify?.('status:funplayer', { message: 'Media loading started', type: 'log' });
  }

  handleMediaLoadedDataEvent = ({ duration }) => {
    // Pas de logique spéciale pour l'instant
    this.core.notify?.('status:funplayer', { message: `Media data loaded: ${duration.toFixed(1)}s`, type: 'log' });
  }

  handleMediaLoadedMetadataEvent = (data) => {
    this.core.notify?.('status:funplayer', { message: `Media loaded: ${data.duration.toFixed(1)}s`, type: 'log' });
    
    const currentItem = this.core.playlist.getCurrentItem();
    if (currentItem && Math.abs((currentItem.duration || 0) - data.duration) > 1) {
      this.core.notify?.('status:funplayer', { message: `Duration corrected: ${currentItem.duration?.toFixed(1) || 'unknown'}s → ${data.duration.toFixed(1)}s`, type: 'log' });
      this.core.playlist.updateCurrentItemDuration(data.duration);
    }
    
    this.handleResize();
  }

  handleMediaCanPlayEvent = ({ currentTime }) => {
    this.core.notify?.('status:funplayer', { message: 'Media can play', type: 'log' });
    if (this.isBuffering) {
      this._endBuffering('canplay', currentTime);
    }
  }

  handleMediaCanPlayThroughEvent = ({ currentTime }) => {
    // Pas de logique spéciale pour l'instant
    this.core.notify?.('status:funplayer', { message: 'Media can play through', type: 'log' });
  }

  handleMediaWaitingEvent = ({ currentTime }) => {
    if (this.isBuffering && this.bufferingSource === 'waiting') {
      // Déjà en buffering officiel
      return;
    }
    
    // Arrêter tout timeout de stall en cours (priorité au buffering officiel)
    if (this.stallTimeoutId) {
      clearTimeout(this.stallTimeoutId);
      this.stallTimeoutId = null;
    }
    
    this._startBuffering('waiting', currentTime);
  }

  handleMediaStalledEvent = ({ currentTime }) => {
    // Similaire à waiting
    this.handleMediaWaitingEvent({ currentTime });
  }

  handleMediaSuspendEvent = ({ currentTime }) => {
    // Pas de logique spéciale pour l'instant
    this.core.notify?.('status:funplayer', { message: 'Media loading suspended', type: 'log' });
  }

  handleMediaVolumeChangeEvent = ({ volume, muted }) => {
    // Pas de logique spéciale pour l'instant
    this.core.notify?.('status:funplayer', { 
      message: `Volume: ${muted ? 'muted' : Math.round(volume * 100) + '%'}`, 
      type: 'log' 
    });
  }

  handleMediaErrorEvent = (error) => {
    this.core.notify?.('status:funplayer', { message: 'Media loading failed', type: 'error', error: error.message });
    this.core.setError('Media loading failed', error);
  }

  handleMediaPlaylistItemChangeEvent = (newVideoJsIndex) => {
    this.core.notify?.('status:funplayer', { message: `MediaPlayer switched to item ${newVideoJsIndex}`, type: 'log' });
    
    if (newVideoJsIndex >= 0) {
      const currentPlaylistIndex = this.core.playlist.getCurrentIndex();
      
      if (newVideoJsIndex !== currentPlaylistIndex) {
        this.core.notify?.('status:funplayer', { message: `Syncing core playlist to Video.js index ${newVideoJsIndex}`, type: 'log' });
        this.core.playlist.goTo(newVideoJsIndex);
      }
    }
  }

  handleMediaResizeEvent = (data) => {
    // ✅ NOUVEAU: Via bus d'événements avec contexte Video.js
    this.core.notify('component:resize', {
      source: 'MediaPlayer',
      reason: 'video-js-resize',
      dimensions: data  // Video.js fournit { width, height } pour information
    });
  }

  // ============================================================================
  // ✅ NOUVEAU: Logique buffering intelligente selon source
  // ============================================================================

  _startBuffering = (source, currentTime) => {
    if (this.isBuffering && this.bufferingSource === 'waiting') {
      // Priorité absolue au buffering officiel
      return;
    }
    
    this.isBuffering = true;
    this.bufferingSource = source;
    this.bufferingStartTime = performance.now();
    
    // Suspendre la boucle haptique
    if (this.hapticIntervalId) {
      this.stopHapticLoop();
      try {
        this.core.buttplug.stopAll();
        this.core.notify?.('status:funplayer', { message: `Buffering suspended (${source})`, type: 'log' });
      } catch (error) {
        this.core.notify?.('status:funplayer', { message: 'Failed to stop haptic devices', type: 'log', error: error.message });
      }
    }
    
    this.setState({ currentActuatorData: new Map() });
    
    // ✅ NOUVEAU: Timeout UNIQUEMENT pour stall detection
    if (source === 'stall_detection') {
      this.stallTimeoutId = setTimeout(() => {
        this._abortHapticPlayback();
      }, this.stallTimeout);
      
      this.core.notify?.('status:funplayer', { message: `Player stall timeout started (${this.stallTimeout}ms)`, type: 'error' });
    }
    // Pour 'waiting' : pas de timeout, patience infinie
  }

  _endBuffering = (trigger, currentTime) => {
    if (!this.isBuffering) return;
    
    const bufferingDuration = performance.now() - this.bufferingStartTime;
    const wasStallDetection = this.bufferingSource === 'stall_detection';
    
    // Clear timeout si stall detection
    if (this.stallTimeoutId) {
      clearTimeout(this.stallTimeoutId);
      this.stallTimeoutId = null;
    }
    
    // Reset état buffering
    this.isBuffering = false;
    this.bufferingSource = null;
    
    // ✅ NOUVEAU: Reset abandon si le player s'est remis
    if (this.isHapticAborted && trigger === 'canplay') {
      this.isHapticAborted = false;
      this.core.notify?.('status:funplayer', { message: 'Player recovered, haptic playback re-enabled', type: 'success' });
    }
    
    // Reprendre si conditions OK
    const mediaPlayer = this.mediaPlayerRef.current;
    if (mediaPlayer && mediaPlayer.isPlaying() && this.core.funscript.hasFunscript() && !this.isHapticAborted) {
      // Re-synchroniser proprement
      this.hapticTime = currentTime || mediaPlayer.getTime();
      this.lastMediaTime = this.hapticTime;
      this.lastSyncTime = performance.now();
      
      this.startHapticLoop();
      
      const sourceInfo = wasStallDetection ? ' (stall recovered)' : '';
      this.core.notify?.('status:funplayer', { message: `Buffering ended via ${trigger} (${bufferingDuration.toFixed(0)}ms)${sourceInfo}, haptic resumed`, type: 'success' });
    }
  }

  // ✅ NOUVEAU: Abandon définitif en cas de player figé
  _abortHapticPlayback = () => {
    const bufferingDuration = performance.now() - this.bufferingStartTime;
    
    // Clear timeout
    if (this.stallTimeoutId) {
      clearTimeout(this.stallTimeoutId);
      this.stallTimeoutId = null;
    }
    
    // Marquer comme abandonné
    this.isHapticAborted = true;
    this.isBuffering = false;
    this.bufferingSource = null;
    
    // Arrêt définitif de la boucle haptique
    this.stopHapticLoop();
    try {
      this.core.buttplug.stopAll();
    } catch (error) {
      // Silent fail
    }
    
    // ✅ Tentative de réveil du player
    const mediaPlayer = this.mediaPlayerRef.current;
    if (mediaPlayer) {
      try {
        mediaPlayer.pause();
        this.core.notify?.('status:funplayer', { message: 'Sent pause command to unresponsive player', type: 'log' });
      } catch (error) {
        this.core.notify?.('status:funplayer', { message: 'Failed to send pause to player', type: 'log', error: error.message });
      }
    }
    
    this.setState({ currentActuatorData: new Map() });
    
    // Status d'erreur final
    this.core.notify?.('status:funplayer', { 
      message: `Media playing aborted due to unresponsive player (${bufferingDuration.toFixed(0)}ms stall)`, 
      type: 'error' 
    });
  }

  // ============================================================================
  // HAPTIC LOOP
  // ============================================================================

  processHapticFrame = async (timeDelta) => {
    const mediaPlayer = this.mediaPlayerRef.current;
    
    if (!mediaPlayer) return;
    
    // ✅ NOUVEAU: Ne pas traiter si abandonné ou buffering
    if (this.isHapticAborted || this.isBuffering) {
      return;
    }
    
    // Calculs de timing spécifiques à FunPlayer
    this.hapticTime += timeDelta;
    const currentTime = this.hapticTime;
    
    const mediaRefreshRate = this.getMediaRefreshRate(mediaPlayer);
    const adjustedDuration = this.calculateLinearDuration(timeDelta, mediaRefreshRate);
    
    // Orchestration haptique via core
    const visualizerData = await this.core.processHapticFrame(currentTime, { 
      duration: adjustedDuration * 1000 
    });
    
    this.setState({ currentActuatorData: visualizerData });
  }

  startHapticLoop = () => {
    if (this.hapticIntervalId) return;
    
    this.expectedHapticTime = performance.now();
    const targetInterval = 1000 / this.state.updateRate;
    
    this.core.notify?.('status:funplayer', { message: `Starting haptic loop at ${this.state.updateRate}Hz`, type: 'log' });

    // ✅ NOUVEAU: Émettre événement haptic started sur le bus
    const hapticData = {
      channels: this.core.funscript.getChannels().length,
      updateRate: this.state.updateRate,
      reason: 'media_play'
    };
    this.core.notify('haptic:started', hapticData);

    const optimizedLoop = () => {
      try {
        const currentTime = performance.now();
        const drift = currentTime - this.expectedHapticTime;
        
        const hapticDelta = targetInterval / 1000;
        this.processHapticFrame(hapticDelta);
        
        this.expectedHapticTime += targetInterval;
        const adjustedDelay = Math.max(0, targetInterval - drift);
        
        const currentTargetInterval = 1000 / this.state.updateRate;
        if (currentTargetInterval !== targetInterval) {
          this.expectedHapticTime = currentTime + currentTargetInterval;
          this.hapticIntervalId = setTimeout(() => this.restartWithNewRate(), currentTargetInterval);
        } else {
          this.hapticIntervalId = setTimeout(optimizedLoop, adjustedDelay);
        }
        
      } catch (error) {
        this.core.notify?.('status:funplayer', { message: 'Haptic loop error', type: 'error', error: error.message });
        this.hapticIntervalId = setTimeout(optimizedLoop, targetInterval);
      }
    };
    
    this.hapticIntervalId = setTimeout(optimizedLoop, targetInterval);
  }

  stopHapticLoop = () => {
    if (this.hapticIntervalId) {
      clearTimeout(this.hapticIntervalId);
      this.hapticIntervalId = null;
      this.core.notify?.('status:funplayer', { message: 'Haptic loop stopped', type: 'log' });
            // ✅ NOUVEAU: Émettre événement haptic stopped sur le bus
      const hapticData = {
        reason: 'media_pause'
      };
      this.core.notify('haptic:stopped', hapticData);
    }
    this.expectedHapticTime = 0;
    this.lastSyncTime = 0;
  }

  restartWithNewRate = () => {
    const wasPlaying = this.hapticIntervalId !== null;
    if (wasPlaying) {
      this.core.notify?.('status:funplayer', { message: `Restarting haptic loop with new rate: ${this.state.updateRate}Hz`, type: 'log' });
      this.stopHapticLoop();
      this.startHapticLoop();
    }
  }

  getCurrentActuatorData = () => {
    return this.state.currentActuatorData;
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  getMediaRefreshRate = (mediaPlayer) => {
    const state = mediaPlayer.getState();
    const mediaType = state.mediaType;
    
    switch (mediaType) {
      case 'playlist':
        const currentItem = mediaPlayer.getCurrentItem();
        if (!currentItem || !currentItem.sources || currentItem.sources.length === 0) {
          return this.state.updateRate;
        }
        const mimeType = currentItem.sources[0].type || '';
        return mimeType.startsWith('audio/') ? this.state.updateRate : 30;
      case 'media':
        return 30;
      default:
        return this.state.updateRate;
    }
  }

  calculateLinearDuration = (hapticDelta, mediaRefreshRate) => {
    const mediaFrameDuration = 1 / mediaRefreshRate;
    const safeDuration = Math.max(hapticDelta, mediaFrameDuration) * 1.2;
    return Math.max(0.01, Math.min(0.1, safeDuration));
  }

  getUpdateRate = () => this.state.updateRate

  handleUpdateRateChange = (newRate) => {
    this.core.notify?.('status:funplayer', { message: `Update rate changed: ${this.state.updateRate}Hz → ${newRate}Hz`, type: 'log' });
    this.setState({ updateRate: newRate });
  }

  // ============================================================================
  // UI CALLBACKS
  // ============================================================================


  handleToggleVisualizer = () => {
    const newState = !this.state.showVisualizer;
    this.core.notify?.('status:funplayer', { message: `Visualizer ${newState ? 'shown' : 'hidden'}`, type: 'log' });
    this.setState({ showVisualizer: newState }, () => {
      this.handleResize();
    });
  }

  handleToggleDebug = () => {
    const newState = !this.state.showDebug;
    this.core.notify?.('status:funplayer', { message: `Debug panel ${newState ? 'shown' : 'hidden'}`, type: 'log' });
    this.setState({ showDebug: newState }, () => {
      this.handleResize();
    });
  }

  handleTogglePlaylist = () => {
    const newState = !this.state.showPlaylist;
    this.core.notify?.('status:funplayer', { message: `Playlist ${newState ? 'shown' : 'hidden'}`, type: 'log' });
    this.setState({ showPlaylist: newState }, () => {
      this.handleResize();
    });
  }

  // ============================================================================
  // RENDER
  // ============================================================================

  render() {
    const { showVisualizer, showDebug, showPlaylist } = this.state;
    const playlistItems = this.core.playlist.items;
    
    return (
      <div className="fp-funplayer" ref={this.containerRef} >
        
        {/* Settings haptiques */}
        <HapticSettingsComponent
          core={this.core} 
          onUpdateRateChange={this.handleUpdateRateChange}
          onGetUpdateRate={this.getUpdateRate}
        />
        
        {/* Lecteur vidéo */}
        <MediaPlayer
          ref={this.mediaPlayerRef}
          playlist={playlistItems}
          notify={this.core.notify}
          onPlay={this.handleMediaPlay}
          onPause={this.handleMediaPause}
          onEnded={this.handleMediaEnded}
          onSeeking={this.handleMediaSeeking}
          onSeeked={this.handleMediaSeeked}
          onTimeUpdate={this.handleMediaTimeUpdate}
          onDurationChange={this.handleMediaDurationChange}
          onLoadStart={this.handleMediaLoadStart}
          onLoadedData={this.handleMediaLoadedData}
          onLoadedMetadata={this.handleMediaLoadedMetadata}
          onCanPlay={this.handleMediaCanPlay}
          onCanPlayThrough={this.handleMediaCanPlayThrough}
          onWaiting={this.handleMediaWaiting}
          onStalled={this.handleMediaStalled}
          onSuspend={this.handleMediaSuspend}
          onVolumeChange={this.handleMediaVolumeChange}
          onError={this.handleMediaError}
          onResize={this.handleResize}
        />
        
        <HapticVisualizerComponent
          core={this.core}
          visible={showVisualizer}
          isPlaying={this.state.isPlaying}
          getCurrentActuatorData={this.getCurrentActuatorData}
        />
        
        <LoggingComponent
          core={this.core}
          visible={showDebug}
        />
        
        {/* Barre de status */}
        <StatusBarComponent
          core={this.core}
          isPlaying={this.state.isPlaying}
          updateRate={this.state.updateRate}
          showVisualizer={showVisualizer}
          showDebug={showDebug}
          showPlaylist={showPlaylist}
          onToggleVisualizer={this.handleToggleVisualizer}
          onToggleDebug={this.handleToggleDebug}
          onTogglePlaylist={this.handleTogglePlaylist}
        />
        
        <PlaylistComponent
          core={this.core} 
          visible={showPlaylist}
        />
        
      </div>
    );
  }
}

export default FunPlayer;