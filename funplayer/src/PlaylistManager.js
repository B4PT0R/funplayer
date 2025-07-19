import PlaylistUtils from './PlaylistUtils';

/**
 * PlaylistManager - ✅ REFACTORISÉ: Status notifications uniformisées
 */
class PlaylistManager {
  constructor(notify) {
    this.notify = notify;
    
    // État centralisé
    this.currentIndex = -1;
    this.items = [];
    this.originalPlaylist = [];
    
    // État de lecture (synchronisé avec MediaPlayer)
    this.isPlaying = false;
    this.currentTime = 0;
    this.duration = 0;
  }

  // ============================================================================
  // SECTION 1: TRAITEMENT PLAYLIST
  // ============================================================================

  /**
   * Point d'entrée principal enrichi avec notifications status
   */
  loadPlaylist = async (playlist) => {
    if (!playlist || playlist.length === 0) {
      this._resetPlaylist();
      
      this.notify?.('status:playlist', { message: 'No playlist to load', type: 'info' });
      this.notify?.('playlist:loaded', { items: [], originalPlaylist: [], totalItems: 0 });
      
      return [];
    }

    try {
      // ✅ NOUVEAU: Comparaison intelligente du contenu
      if (PlaylistUtils.deepComparePlaylist(this.originalPlaylist, playlist)) {
        this.notify?.('status:playlist', { 
          message: 'Playlist content identical, keeping current state', 
          type: 'log' 
        });
        return this.items; // Retourne la référence existante
      }

      this.notify?.('status:playlist', { 
        message: `Playlist content changed, processing ${playlist.length} items...`, 
        type: 'processing' 
      });
      
      // 1. Sauvegarder + traitement
      this.originalPlaylist = [...playlist];
      const processedItems = await this.processPlaylist(playlist);
      
      // ✅ NOUVELLE RÉFÉRENCE: Seulement quand le contenu change vraiment
      this.items = processedItems;
      this.currentIndex = processedItems.length > 0 ? 0 : -1;
      
      this.notify?.('status:playlist', { 
        message: `Playlist loaded: ${processedItems.length} items processed`, 
        type: 'success' 
      });
      
      this.notify?.('playlist:loaded', { 
        items: this.items, 
        originalPlaylist: this.originalPlaylist, 
        totalItems: this.items.length 
      });
      
      return this.items;
      
    } catch (error) {
      this.notify?.('status:playlist', { 
        message: 'Playlist loading failed', 
        type: 'error', 
        error: error.message 
      });
      throw error;
    }
  }

  /**
   * Pipeline complet de traitement playlist
   */
  processPlaylist = async (playlist) => {
    this.notify?.('status:playlist', { message: `Starting playlist processing pipeline...`, type: 'log' });
    
    // 1. Filtrer les items valides
    const validItems = this.filterValidItems(playlist);
    this.notify?.('status:playlist', { message: `Filtered to ${validItems.length} valid items`, type: 'log' });
    
    // 2. Marquer les types originaux
    const withTypes = this.markItemTypes(validItems);
    this.notify?.('status:playlist', { message: `Item types marked`, type: 'log' });
    
    // 3. Générer fallbacks SVG
    const withFallbacks = this.addFallbackPosters(withTypes);
    this.notify?.('status:playlist', { message: `Fallback posters generated`, type: 'log' });
    
    // 4. Traiter les cas sans media (funscript seul)
    const withMedia = this.processNoMediaItems(withFallbacks);
    this.notify?.('status:playlist', { message: `Silent audio generated for haptic-only items`, type: 'log' });
    
    // 5. Normaliser les sources
    const normalizedPlaylist = this.normalizeSources(withMedia);
    this.notify?.('status:playlist', { message: `Source normalization complete`, type: 'log' });
    
    return normalizedPlaylist;
  }

  /**
   * Filtre les items de playlist valides
   */
  filterValidItems = (playlist) => {
    this.notify?.('status:playlist', { message: `Filtering ${playlist.length} items for validity...`, type: 'log' });

    const validItems = playlist.filter((item, index) => {
      // Valide: A des sources (media)
      if (item.sources && item.sources.length > 0) {
        return true;
      }
      
      // Valide: A un funscript (mode haptic pur)
      if (item.funscript) {
        return true;
      }
      
      // Invalide: Timeline pur (duration seule sans media ni funscript)
      if (item.duration && !item.sources && !item.funscript) {
        this.notify?.('status:playlist', { message: `Filtered out timeline-only item ${index + 1}`, type: 'log' });
        return false;
      }
      
      // Invalide: Item vide
      this.notify?.('status:playlist', { message: `Filtered out empty item ${index + 1}`, type: 'log' });
      return false;
    });

    const filteredCount = playlist.length - validItems.length;
    if (filteredCount > 0) {
      this.notify?.('status:playlist', { message: `Filtered out ${filteredCount} invalid items`, type: 'info' });
    }

    return validItems;
  }

  /**
   * Marquer les types avant enrichissement
   */
  markItemTypes = (playlist) => {
    this.notify?.('status:playlist', { message: `Analyzing item types...`, type: 'log' });

    return playlist.map((item, index) => {
      let itemType = 'unknown';
      
      if (item.sources && item.sources.length > 0) {
        const firstSource = item.sources[0];
        const typeLower = (firstSource.type || PlaylistUtils.detectMimeType(firstSource.src)).toLowerCase();
        
        if (typeLower.startsWith('video/')) {
          itemType = item.funscript ? 'video_haptic' : 'video';
        } else if (typeLower.startsWith('audio/')) {
          itemType = item.funscript ? 'audio_haptic' : 'audio';
        } else {
          itemType = 'media'; // HLS, DASH, etc.
        }
      } else if (item.funscript) {
        itemType = 'haptic';
      }
      
      this.notify?.('status:playlist', { message: `Item ${index + 1}: ${itemType}`, type: 'log' });
      
      return {
        ...item,
        item_type: itemType
      };
    });
  }

  /**
   * Génère des sources audio silencieuses pour items sans media
   */
  processNoMediaItems = (playlist) => {
    this.notify?.('status:playlist', { message: `Processing haptic-only items...`, type: 'log' });

    let processedCount = 0;

    const result = playlist.map((item, index) => {
      // Si sources déjà présentes, ne pas toucher
      if (item.sources && item.sources.length > 0) {
        return item;
      }
      
      // Seul cas restant: Funscript seul
      if (item.funscript) {
        try {
          const funscriptDuration = PlaylistUtils.extractFunscriptDuration(item.funscript);
          if (funscriptDuration > 0) {
            const silentAudioUrl = PlaylistUtils.generateSilentAudio(funscriptDuration);
            processedCount++;
            this.notify?.('status:playlist', { message: `Generated ${funscriptDuration.toFixed(1)}s silent audio for item ${index + 1}`, type: 'log' });
            return {
              ...item,
              sources: [{ src: silentAudioUrl, type: 'audio/wav' }]
            };
          }
        } catch (error) {
          this.notify?.('status:playlist', { message: `Failed to process funscript for item ${index + 1}: ${error.message}`, type: 'error' });
        }
      }
      
      this.notify?.('status:playlist', { message: `Unexpected item without sources or funscript at index ${index}`, type: 'log' });
      return item;
    });

    if (processedCount > 0) {
      this.notify?.('status:playlist', { message: `Generated silent audio for ${processedCount} haptic-only items`, type: 'info' });
    }

    return result;
  }

  /**
   * Normalise les sources via PlaylistUtils
   */
  normalizeSources = (playlist) => {
    this.notify?.('status:playlist', { message: `Normalizing source MIME types...`, type: 'log' });

    return playlist.map(item => {
      if (!item.sources || item.sources.length === 0) {
        return item;
      }
      
      const normalizedSources = item.sources.map(source => ({
        ...source,
        type: source.type || PlaylistUtils.detectMimeType(source.src)
      }));
      
      return {
        ...item,
        sources: normalizedSources
      };
    });
  }

  /**
   * Génère des fallbacks SVG via PlaylistUtils
   */
  addFallbackPosters = (playlist) => {
    this.notify?.('status:playlist', { message: `Generating fallback posters...`, type: 'log' });

    let generatedCount = 0;

    const result = playlist.map((item, index) => {
      // Skip si poster déjà présent
      if (item.poster) return item;
      
      generatedCount++;
      return {
        ...item,
        poster: PlaylistUtils.generateSVGPoster(item, index),
        _generatedPoster: true
      };
    });

    if (generatedCount > 0) {
      this.notify?.('status:playlist', { message: `Generated ${generatedCount} SVG fallback posters`, type: 'log' });
    }

    return result;
  }

  // ============================================================================
  // SECTION 2: NAVIGATION
  // ============================================================================

  /**
   * Navigation vers l'item suivant
   */
  next = () => {
    if (this.items.length === 0) {
      this.notify?.('status:playlist', { message: 'Cannot go next: empty playlist', type: 'info' });
      return false;
    }
    
    const nextIndex = this.currentIndex + 1;
    if (nextIndex >= this.items.length) {
      this.notify?.('status:playlist', { message: 'Cannot go next: end of playlist reached', type: 'info' });
      return false;
    }
    
    return this.goTo(nextIndex);
  }

  /**
   * Navigation vers l'item précédent
   */
  previous = () => {
    if (this.items.length === 0) {
      this.notify?.('status:playlist', { message: 'Cannot go previous: empty playlist', type: 'info' });
      return false;
    }
    
    const prevIndex = this.currentIndex - 1;
    if (prevIndex < 0) {
      this.notify?.('status:playlist', { message: 'Cannot go previous: beginning of playlist reached', type: 'info' });
      return false;
    }
    
    return this.goTo(prevIndex);
  }

  /**
   * Navigation vers un item spécifique
   */
  goTo = (index) => {
    if (this.items.length === 0) {
      this.notify?.('status:playlist', { message: 'Cannot navigate: empty playlist', type: 'error' });
      return false;
    }
    
    if (index < 0 || index >= this.items.length) {
      this.notify?.('status:playlist', { message: `Cannot navigate to index ${index}: out of bounds`, type: 'error' });
      return false;
    }
    
    const previousIndex = this.currentIndex;
    this.currentIndex = index;
    
    const currentItem = this.items[index];
    const itemName = currentItem?.name || `Item ${index + 1}`;
    
    this.notify?.('status:playlist', { message: `Playing: ${itemName} (${index + 1}/${this.items.length})`, type: 'success' });
    
    this.notify?.('playlist:itemChanged', { 
      index, 
      item: currentItem ? { ...currentItem } : null, 
      previousIndex,
      hasNext: this.canNext(),
      hasPrevious: this.canPrevious()
    });
    
    return true;
  }

  /**
   * Vérifie si on peut aller au suivant
   */
  canNext = () => {
    return this.items.length > 0 && this.currentIndex < this.items.length - 1;
  }

  /**
   * Vérifie si on peut aller au précédent
   */
  canPrevious = () => {
    return this.items.length > 0 && this.currentIndex > 0;
  }

  // ============================================================================
  // SECTION 3: GETTERS D'ÉTAT
  // ============================================================================

  getCurrentIndex = () => this.currentIndex

  getCurrentItem = () => {
    if (this.currentIndex >= 0 && this.currentIndex < this.items.length) {
      return this.items[this.currentIndex];
    }
    return null;
  }

  getOriginalPlaylist = () => [...this.originalPlaylist]

  getPlaylistInfo = () => ({
    currentIndex: this.currentIndex,
    totalItems: this.items.length,
    hasPlaylist: this.items.length > 0,
    canNext: this.canNext(),
    canPrevious: this.canPrevious(),
    isPlaying: this.isPlaying,
    currentTime: this.currentTime,
    duration: this.duration
  })

  // ============================================================================
  // SECTION 4: SYNCHRONISATION PLAYBACK
  // ============================================================================

  /**
   * Synchronise l'état de lecture avec MediaPlayer
   */
  updatePlaybackState = (isPlaying, currentTime = null, duration = null) => {
    let hasChanged = false;
    
    if (this.isPlaying !== isPlaying) {
      this.isPlaying = isPlaying;
      hasChanged = true;
    }
    
    if (currentTime !== null && this.currentTime !== currentTime) {
      this.currentTime = currentTime;
      hasChanged = true;
    }
    
    if (duration !== null && this.duration !== duration) {
      this.duration = duration;
      hasChanged = true;
    }
    
    if (hasChanged) {
      // Log détaillé pour debug playback
      this.notify?.('status:playlist', { message: `Playback state: ${isPlaying ? 'playing' : 'paused'} ${currentTime?.toFixed(1)}s/${duration?.toFixed(1)}s`, type: 'log' });
      
      this.notify?.('playlist:playbackChanged', {
        isPlaying: this.isPlaying,
        currentTime: this.currentTime,
        duration: this.duration,
        currentIndex: this.currentIndex,
        currentItem: this.getCurrentItem(),
        playlistInfo: this.getPlaylistInfo()
      });
    }
  }

  updateCurrentItemDuration = (realDuration) => {
    const currentItem = this.getCurrentItem();
    if (!currentItem) return false;
    
    const oldDuration = currentItem.duration;
    currentItem.duration = realDuration;
    
    this.notify?.('status:playlist', { message: `Duration corrected: ${oldDuration?.toFixed(1) || 'unknown'}s → ${realDuration.toFixed(1)}s`, type: 'log' });
    
    this.notify?.('playlist:itemUpdated', { 
      index: this.currentIndex, 
      item: { ...currentItem }, 
      change: { 
        field: 'duration', 
        oldValue: oldDuration, 
        newValue: realDuration 
      } 
    });
    
    return true;
  }

  // ============================================================================
  // SECTION 5: RESET & CLEANUP
  // ============================================================================

  _resetPlaylist = () => {
    this.currentIndex = -1;
    this.items = [];
    this.originalPlaylist = [];
    this.isPlaying = false;
    this.currentTime = 0;
    this.duration = 0;
  }

  reset = () => {
    this._resetPlaylist();
    this.notify?.('status:playlist', { message: 'Playlist manager reset', type: 'info' });
  }

  cleanup = () => {
    this._resetPlaylist();
    this.notify?.('status:playlist', { message: 'Playlist manager cleanup completed', type: 'log' });
  }

  // ============================================================================
  // SECTION 6: DEBUG & STATS
  // ============================================================================

  getStats = () => ({
    totalItems: this.items.length,
    currentIndex: this.currentIndex,
    isPlaying: this.isPlaying,
    hasGeneratedPosters: this.items.filter(item => item._generatedPoster).length,
    processingComplete: true
  })

  getDebugInfo = () => {
    const stats = this.getStats();
    
    this.notify?.('status:playlist', { message: `Debug info requested: ${stats.totalItems} items, index ${stats.currentIndex}, ${stats.hasGeneratedPosters} generated posters`, type: 'log' });

    return {
      state: {
        currentIndex: this.currentIndex,
        totalItems: this.items.length,
        isPlaying: this.isPlaying,
        currentTime: this.currentTime,
        duration: this.duration
      },
      currentItem: this.getCurrentItem(),
      navigation: {
        canNext: this.canNext(),
        canPrevious: this.canPrevious()
      },
      stats
    };
  }
}

export default PlaylistManager;