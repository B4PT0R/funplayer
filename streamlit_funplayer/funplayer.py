#!/usr/bin/env python3
"""
🎮 FunPlayer - Synchronized Media & Haptic Playback
Streamlit demo
"""
import streamlit as st
import json
import uuid
from typing import Dict, List, Any
from pathlib import PurePosixPath

try:
    from streamlit_funplayer import (
        funplayer, 
        __version__ as version
    )
except ImportError:
    st.error("📦 streamlit-funplayer not found! Run: `pip install -e .`")
    st.stop()

# ============================================================================
# UTILS LOCALES - Fonctions qui étaient dans __init__.py
# ============================================================================

def _validate_playlist_item(item: Dict[str, Any]) -> bool:
    """Validation locale d'un item de playlist"""
    if not isinstance(item, dict):
        return False
    
    # Au moins sources OU funscript requis
    has_sources = 'sources' in item and isinstance(item['sources'], list) and len(item['sources']) > 0
    has_funscript = 'funscript' in item and item['funscript'] is not None
    
    return has_sources or has_funscript

# ============================================================================
# UTILS DEMO
# ============================================================================

def add_item_from_bucket(name=None, description=None, media_file=None, funscript_file=None):
    """
    Utility to fetch a media/funscript from the remote bucket containing the BlackTantra demo files
    and add it as a new item to the current playlist.
    """
    if not (media_file or funscript_file):
        return
    
    item = {
        'sources': [],
        "_id": generate_item_id()
    }

    BASE_URL = "https://pub-3e61723b945d40e490d065f5b484484b.r2.dev"

    if media_file:
        path = PurePosixPath(media_file)
        ext = path.suffix.lower()
        if not name:
            name = path.stem
        media_url = f"{BASE_URL}/{media_file}"
        item.update(sources=[{'src': media_url}])

    if funscript_file:
        path = PurePosixPath(funscript_file)
        funscript_url = f"{BASE_URL}/{funscript_file}"
        if not name:
            name = path.stem
        item.update(funscript=funscript_url)

    item.update(name=name)

    if description:
        item.update(description=description)

    st.session_state.playlist.append(item)

def generate_item_id():
    """Generate unique ID for playlist items"""
    return str(uuid.uuid4())[:8]

def validate_and_add_item(item_data: Dict[str, Any]) -> bool:
    """Validate and add item to playlist"""
    try:
        if _validate_playlist_item(item_data):
            item_data['_id'] = generate_item_id()
            st.session_state.playlist.append(item_data)
            return True
        else:
            st.error("❌ Invalid item: must have 'sources' or 'funscript'")
            return False
    except Exception as e:
        st.error(f"❌ Error adding item: {e}")
        return False

def remove_item(item_id: str):
    """Remove item from playlist"""
    st.session_state.playlist = [
        item for item in st.session_state.playlist 
        if item.get('_id') != item_id
    ]

def move_item(item_id: str, direction: str):
    """Move item up or down in playlist"""
    items = st.session_state.playlist
    index = next((i for i, item in enumerate(items) if item.get('_id') == item_id), -1)
    
    if index == -1:
        return
    
    if direction == 'up' and index > 0:
        items[index], items[index-1] = items[index-1], items[index]
    elif direction == 'down' and index < len(items) - 1:
        items[index], items[index+1] = items[index+1], items[index]

def get_clean_playlist():
    """Get playlist without internal IDs for FunPlayer"""
    return [{k: v for k, v in item.items() if k != '_id'} 
            for item in st.session_state.playlist]

# ============================================================================
# PAGE CONFIG
# ============================================================================

st.set_page_config(
    page_title="FunPlayer", 
    layout="wide", 
    initial_sidebar_state="expanded",
    menu_items={
        'Get Help': 'https://github.com/B4PT0R/streamlit-funplayer',
        'Report a bug': 'https://github.com/B4PT0R/streamlit-funplayer/issues',
        'About': '**FunPlayer v0.1** - Synchronized Media & Haptic Playback'
    }
)

# ============================================================================
# SESSION STATE INITIALIZATION
# ============================================================================

if 'playlist' not in st.session_state:
    st.session_state.playlist = []

if 'current_item_id' not in st.session_state:
    st.session_state.current_item_id = None

if 'demo_loaded' not in st.session_state:
    st.session_state.demo_loaded = False

# ============================================================================
# DEMO DATA & EXAMPLES
# ============================================================================

from numpy import cos, pi, linspace

def modulation(t,min=0,max=100,freq=1):
    # t=0 gives min
    avg=(max+min)/2
    amp=max-avg
    return avg+amp*cos(2*pi*freq*t+pi)

def gen_demo_funscript(duration=240):
    return {
        "version": "1.0",
        "actions": [dict(at=int(t*1000), pos=int(modulation(t,min=5,max=95,freq=1))) for t in linspace(0, duration, duration*10)]
    }

EXAMPLE_PLAYLISTS = {
    "🎥 Video Examples": [
        {
            'sources': [{'src': 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 'type': 'video/mp4'}],
            'name': 'Big Buck Bunny',
            'description': 'Classic demo video with synchronized haptics',
            'funscript': gen_demo_funscript()
        }
    ],
    "🎵 Audio Examples": [
        {
            'sources': [{'src': 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', 'type': 'audio/wav'}],
            'name': 'Audio + Haptics',
            'description': 'Audio experience with haptic feedback',
            'funscript': gen_demo_funscript()
        }
    ],
    "🎮 Haptic Only": [
        {
            'funscript': gen_demo_funscript(),
            'name': 'Pure Haptic Experience',
            'description': 'Haptic-only playback (no media)'
        }
    ]
}

# ============================================================================
# HEADERS
# ============================================================================

# Header principal avec colonnes
header_col1, header_col2 = st.columns([3, 1])

with header_col1:
    st.title("FunPlayer")
    st.markdown("**Interactive Media Player with Synchronized Haptic Feedback**")

with header_col2:
    st.info(f"**v{version}**")

st.markdown("*Powered by Video.js & Buttplug.io*")
st.divider()

# ============================================================================
# SIDEBAR
# ============================================================================

with st.sidebar:
    st.header("📝 Playlist Editor")
    
    # ========================================================================
    # DEMO EXAMPLES
    # ========================================================================
    
    st.subheader("🚀 Quick Start")
    
    demo_col1, demo_col2 = st.columns(2)
    
    with demo_col1:
        if st.button("📺 Load Examples", use_container_width=True, type="primary"):
            st.session_state.playlist = []
            for category, items in EXAMPLE_PLAYLISTS.items():
                for item in items:
                    item_copy = item.copy()
                    item_copy['_id'] = generate_item_id()
                    st.session_state.playlist.append(item_copy)
            st.session_state.demo_loaded = True
            st.rerun()
    
    with demo_col2:
        if st.button("🗑️ Clear All", use_container_width=True):
            st.session_state.playlist = []
            st.session_state.demo_loaded = False
            st.rerun()

    st.divider()

    st.subheader("I'm 18+ and willing to try with awesome NSFW content produced by [BlackTantra](https://blacktantra.net/)")
    if st.button("Yes!😈", type="primary", use_container_width=True):

        add_item_from_bucket(
            name="Squeeze Training With Lily #1",
            description="Squeeze it for Lily!",
            media_file="squeeze_training_with_lily_1.mp4",
            funscript_file="squeeze_training_with_lily_1.funscript",
        )

        add_item_from_bucket(
            name="Squeeze Training With Lily #2",
            description="Squeeze it harder!",
            media_file="squeeze_training_with_lily_2.mp4",
            funscript_file="squeeze_training_with_lily_2.funscript",
        )

        add_item_from_bucket(
            name="Edge Training #3 Extended",
            description="Will you resist?",
            media_file="edge_training_3_extended.mp4",
            funscript_file="edge_training_3_extended.funscript",
        )

        st.session_state.demo_loaded = True
        st.rerun()

    st.divider()
    
    if st.session_state.demo_loaded:
        st.success("✅ Demo examples loaded!")
    
    st.divider()
    
    # ========================================================================
    # ADD NEW ITEM
    # ========================================================================
    
    with st.expander("➕ Add New Item", expanded=True):
        
        # Item metadata
        item_name = st.text_input("📝 Name", placeholder="Enter item title...")
        item_description = st.text_area("📄 Description", placeholder="Optional description...", height=70)
        
        # Media sources
        st.markdown("**🎬 Media Sources**")
        source_type = st.selectbox("Source Type", ["📎 Upload File", "🌐 URL", "⏱️ Haptic Only"])
        
        sources = []
        
        if source_type == "📎 Upload File":
            uploaded_file = st.file_uploader(
                "Choose media file", 
                type=['mp4', 'webm', 'mov', 'avi', 'mp3', 'wav', 'ogg', 'm4a'],
                help="Upload video or audio file"
            )
            if uploaded_file:
                # ✅ NOUVEAU: BytesIO direct, conversion automatique dans funplayer
                sources = [{'src': uploaded_file}]
                st.success(f"✅ {uploaded_file.name} ready ({uploaded_file.size // 1024} KB)")
        
        elif source_type == "🌐 URL":
            media_url = st.text_input("Media URL", placeholder="https://example.com/video.mp4")
            if media_url:
                sources = [{'src': media_url}]
        
        # Funscript
        st.markdown("**🎮 Haptic Script**")
        funscript_type = st.selectbox("Funscript Type", ["📎 Upload .funscript", "🌐 Funscript URL", "🎲 Demo Data", "❌ None"])
        
        funscript_data = None
        
        if funscript_type == "📎 Upload .funscript":
            funscript_file = st.file_uploader(
                "Choose funscript file", 
                type=['funscript', 'json'],
                help="Upload .funscript or .json file"
            )
            if funscript_file:
                # ✅ NOUVEAU: BytesIO direct, conversion automatique dans funplayer
                funscript_data = funscript_file
                try:
                    # Pour le feedback utilisateur, on peut toujours lire le contenu
                    temp_data = json.loads(funscript_file.getvalue().decode('utf-8'))
                    action_count = len(temp_data.get('actions', []))
                    st.success(f"✅ {funscript_file.name} ready ({action_count} actions)")
                except Exception as e:
                    st.warning(f"⚠️ Funscript upload successful but preview failed: {e}")
        
        elif funscript_type == "🌐 Funscript URL":
            funscript_url = st.text_input("Funscript URL", placeholder="https://example.com/script.funscript")
            if funscript_url:
                funscript_data = funscript_url
        
        elif funscript_type == "🎲 Demo Data":
            funscript_data = gen_demo_funscript()
            st.info("ℹ️ Using demo funscript")
        
        # Duration for haptic-only
        duration = None
        if source_type == "⏱️ Haptic Only" and funscript_data:
            duration = st.number_input("Duration (seconds)", min_value=1.0, max_value=3600.0, value=11.0, step=0.1)
        
        # Submit button
        if st.button("➕ Add to Playlist", use_container_width=True, type="primary"):
            # Build item data
            item_data = {}
            
            if sources:
                item_data['sources'] = sources
            
            if funscript_data:
                item_data['funscript'] = funscript_data
            
            if item_name:
                item_data['name'] = item_name
            
            if item_description:
                item_data['description'] = item_description
            
            if duration:
                item_data['duration'] = duration
            
            # Validate and add
            if validate_and_add_item(item_data):
                st.success(f"✅ Added '{item_name or 'Untitled'}' to playlist!")
                st.rerun()
    
    st.divider()
    
    # ========================================================================
    # CURRENT PLAYLIST
    # ========================================================================
    
    st.subheader(f"📋 Current Playlist ({len(st.session_state.playlist)})")
    
    if st.session_state.playlist:
        for i, item in enumerate(st.session_state.playlist):
            
            # Info de l'item
            with st.container(border=True):
                st.markdown(f"**#{i+1} {item.get('name', 'Untitled')}**")
                if item.get('description'):
                    st.caption(item.get('description'))
            
            # Menu d'actions en colonnes
            action_col1, action_col2, action_col3, action_col4 = st.columns(4)
            
            with action_col1:
                if st.button("⬆️", key=f"up_{item['_id']}", use_container_width=True, help="Move up"):
                    move_item(item['_id'], 'up')
                    st.rerun()
            
            with action_col2:
                if st.button("⬇️", key=f"down_{item['_id']}",use_container_width=True, help="Move down"):
                    move_item(item['_id'], 'down')
                    st.rerun()
            
            with action_col3:
                if st.button("✏️", key=f"edit_{item['_id']}",use_container_width=True, help="Edit"):
                    st.info("🚧 Edit feature coming soon!")
            
            with action_col4:
                if st.button("🗑️", key=f"del_{item['_id']}",use_container_width=True, help="Delete"):
                    remove_item(item['_id'])
                    st.rerun()
            
            # Séparateur visuel entre items
            if i < len(st.session_state.playlist) - 1:
                st.markdown("---")
    else:
        st.info("📝 No items in playlist. Add some content above!")
    
    # ========================================================================
    # IMPORT/EXPORT
    # ========================================================================
    
    if st.session_state.playlist:
        with st.expander("💾 Import/Export"):
            # Export
            playlist_json = json.dumps(get_clean_playlist(), indent=2)
            st.download_button(
                "📤 Export Playlist",
                playlist_json,
                file_name="funplayer_playlist.json",
                mime="application/json",
                use_container_width=True
            )
            
            # Import
            imported_file = st.file_uploader("📥 Import Playlist", type=['json'])
            if imported_file:
                try:
                    imported_data = json.loads(imported_file.getvalue().decode('utf-8'))
                    if isinstance(imported_data, list):
                        st.session_state.playlist = []
                        for item in imported_data:
                            item['_id'] = generate_item_id()
                            st.session_state.playlist.append(item)
                        st.success(f"✅ Imported {len(imported_data)} items!")
                        st.rerun()
                    else:
                        st.error("❌ Invalid playlist format")
                except Exception as e:
                    st.error(f"❌ Import failed: {e}")

# ============================================================================
# MAIN CONTENT
# ============================================================================

# Player section
if st.session_state.playlist:    
    # Render the player
    try:
        clean_playlist = get_clean_playlist()
        
        result = funplayer(
            playlist=clean_playlist,
            key="main_player"
        )

    except Exception as e:
        st.error(f"❌ Player error: {e}")
        with st.expander("🔧 Debug Info"):
            st.json(get_clean_playlist())

else:
    # Empty state
    with st.container():
        st.subheader("🎯 Welcome to FunPlayer!")
        
        st.markdown("""
        **Get started by:**
        
        - 📺 **Loading example content** from the sidebar
        - 📎 **Uploading your own** video/audio + funscript files  
        - 🌐 **Adding URLs** to online media content
        - 🎮 **Creating haptic-only** experiences
        
        *Start building your synchronized media playlist! 🚀*
        """)

# ============================================================================
# HELP & DOCUMENTATION
# ============================================================================

st.divider()

with st.expander("📖 How to Use FunPlayer"):
    help_col1, help_col2 = st.columns(2)
    
    with help_col1:
        st.markdown("""
        ### 🎯 **Getting Started**
        
        1. **📺 Try Examples**: Click "Load Examples" for demo content
        2. **📎 Upload Files**: Add your video/audio + .funscript files  
        3. **🎮 Connect Device**: Use Intiface Central + compatible device
        4. **▶️ Play & Enjoy**: Synchronized media + haptic feedback!
        
        ### 🎬 **Supported Media**
        
        - **Video**: MP4, WebM, MOV, AVI
        - **Audio**: MP3, WAV, OGG, M4A, AAC
        - **Streaming**: HLS (m3u8), DASH (mpd)
        - **Funscripts**: JSON format with haptic actions
        """)
    
    with help_col2:
        st.markdown("""
        ### ⚙️ **Advanced Features**
        
        - **🎵 Playlist Mode**: Multiple items with auto-advance
        - **🔀 Multi-Resolution**: Automatic quality switching  
        - **🎮 Haptic-Only**: Timeline playback without media
        - **📊 Real-time Visualizer**: See haptic waveforms
        - **🎛️ Channel Mapping**: Multi-actuator device support
        
        ### 🔗 **Requirements**
        
        - **[Intiface Central](https://intiface.com/central/)** for device connectivity
        - **Bluetooth-enabled** compatible device
        - **HTTPS connection** (for device access in production)
        """)

with st.expander("🔧 Technical Details"):
    st.code("""
# Playlist Format (Video.js Extended)
playlist = [{
    'sources': [{'src': 'video.mp4', 'type': 'video/mp4'}],  # Required (empty list for haptic only)
    'name': 'Scene Title',                                   # Recommended  
    'description': 'Scene description',                      # Optional
    'poster': 'poster.jpg',                                  # Optional
    'duration': time_in_s,                                   # Optional but recommended
    'funscript': {'actions': [...]},                         # FunPlayer extension
}]
    """, language="python")

# ============================================================================
# FOOTER
# ============================================================================

st.divider()

footer_col1, footer_col2, footer_col3 = st.columns(3)

with footer_col1:
    st.markdown(f"**FunPlayer v{version}**")

with footer_col2:
    st.markdown("[View on GitHub](https://github.com/B4PT0R/streamlit-funplayer)")

with footer_col3:
    st.markdown("© 2025 Baptiste Ferrand")