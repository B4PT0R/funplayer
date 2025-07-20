# ============================================================================
# MÉTADONNÉES DU PACKAGE
# ============================================================================

try:
    from importlib.metadata import version, metadata
    # Package metadata
    __version__ = version('streamlit-funplayer')
    meta = metadata('streamlit-funplayer')
    __author__ = meta.get('Author', "unknown")
    __email__ = meta.get('Author-email', "")
    __description__ = meta.get('Summary', '')
except Exception as e:
    __version__ = "0.0.0"
    __author__ = 'unknown'
    __email__ = ""
    __description__ = ""

# Export seulement les fonctions essentielles
__all__ = [
    "funplayer", 
]

# ============================================================================
# IMPORTS AND COMPONENT DECLARATION
# ============================================================================

import os
import json
import base64
from pathlib import Path
from io import BytesIO
from typing import Union, Optional, List, Dict, Any
import streamlit.components.v1 as components

# Create a _RELEASE constant. We'll set this to False while we're developing
# the component, and True when we're ready to package and distribute it.
_RELEASE = True

if not _RELEASE:
    _component_func = components.declare_component(
        "streamlit_funplayer",
        url="http://localhost:3001",  # Local development server
    )
else:
    # When we're distributing a production version of the component, we'll
    # replace the `url` param with `path`, and point it to the component's
    # build directory:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component("streamlit_funplayer", path=build_dir)

# ============================================================================
# UTILITAIRES DE CONVERSION
# ============================================================================

def _ext_to_mime(ext):
    """Extension vers type MIME - fonction interne"""
    mime_types = {
        # Video formats
        '.mp4': 'video/mp4', '.webm': 'video/webm', '.mov': 'video/quicktime',
        '.avi': 'video/x-msvideo', '.mkv': 'video/x-matroska', '.ogv': 'video/ogg',
        '.m4v': 'video/mp4',
        
        # Audio formats  
        '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.ogg': 'audio/ogg',
        '.m4a': 'audio/mp4', '.aac': 'audio/aac', '.flac': 'audio/flac',
        
        # Funscript/JSON
        '.funscript': 'application/json', '.json': 'application/json',
        
        # Images (posters)
        '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
        '.gif': 'image/gif', '.webp': 'image/webp'
    }
    return mime_types.get(ext, 'application/octet-stream')


def _get_mime_type(src):
    """
    Détection intelligente du type MIME depuis différentes sources.
    
    Parameters
    ----------
    src : str, Path, BytesIO, or other
        Source du fichier (chemin local, URL, BytesIO, etc.)
        
    Returns
    -------
    str
        Type MIME détecté ou 'application/octet-stream' par défaut
        
    Examples
    --------
    >>> get_mime_type("video.mp4")                    # 'video/mp4'
    >>> get_mime_type("https://site.com/audio.mp3")   # 'audio/mpeg' 
    >>> get_mime_type(uploaded_file)                   # 'video/webm' (via .name)
    """
    try:
        # Cas 1: BytesIO (fichier uploadé)
        if isinstance(src, BytesIO):
            filename = getattr(src, 'name', 'unknown.bin')
            file_extension = Path(filename).suffix.lower()
            return _ext_to_mime(file_extension)
        
        # Cas 2: String (chemin local ou URL)
        elif isinstance(src, str):
            # URL (http/https)
            if src.startswith(('http://', 'https://')):
                try:
                    from urllib.parse import urlparse
                    parsed = urlparse(src)
                    file_extension = Path(parsed.path).suffix.lower()
                    return _ext_to_mime(file_extension)
                except:
                    return 'application/octet-stream'
            
            # Chemin local
            else:
                file_extension = Path(src).suffix.lower()
                return _ext_to_mime(file_extension)
        
        # Cas 3: Path object
        elif hasattr(src, 'suffix'):
            file_extension = src.suffix.lower()
            return _ext_to_mime(file_extension)
        
        # Cas par défaut
        else:
            return 'application/octet-stream'
            
    except Exception:
        # Fallback sécurisé
        return 'application/octet-stream'


def _file_to_data_url(
    file: Union[str, os.PathLike, BytesIO], 
    max_size_mb: Optional[int] = None
) -> Optional[str]:
    """
    Convert a file to a data URL for browser compatibility.
    
    Parameters
    ----------
    file : str, PathLike, or BytesIO
        File path, Path object, or BytesIO object (e.g. from st.file_uploader) to convert
    max_size_mb : int, optional
        Maximum file size in MB. If None, uses Streamlit's maxUploadSize setting.
        
    Returns
    -------
    str or None
        Data URL string, or None if conversion failed
        
    Examples
    --------
    >>> data_url = _file_to_data_url("video.mp4")  # File path
    >>> data_url = _file_to_data_url(uploaded_file)  # BytesIO object
    >>> data_url = _file_to_data_url(Path("script.funscript"))  # Path object
    """
    try:
        # Handle different input types
        if isinstance(file, (str, os.PathLike)):
            file_path = Path(file)
            if not file_path.exists():
                raise FileNotFoundError(f"File not found: {file_path}")
            
            filename = file_path.name
            with open(file_path, 'rb') as f:
                bytes_content = f.read()
                
        elif isinstance(file, BytesIO):
            filename = getattr(file, 'name', 'uploaded_file')
            bytes_content = file.getvalue()
            
        else:
            raise TypeError(f"Expected str, PathLike, or BytesIO. Got {type(file)}")
    
        # Get size limit from Streamlit config if not specified
        if max_size_mb is None:
            try:
                import streamlit as st
                max_size_mb = st.get_option("server.maxUploadSize")
            except:
                max_size_mb = 200  # Fallback si impossible de lire la config
    
        # Safety check: file size
        size_mb = len(bytes_content) / 1024 / 1024
        if size_mb > max_size_mb:
            raise ValueError(f"File too large: {size_mb:.1f}MB > {max_size_mb}MB limit (Streamlit maxUploadSize)")
    
        # Determine MIME type
        mime_type = _get_mime_type(filename)
    
        # Encode to base64
        base64_content = base64.b64encode(bytes_content).decode('utf-8')
    
        return f"data:{mime_type};base64,{base64_content}"
        
    except Exception as e:
        print(f"Warning: Failed to convert {file} to data URL: {e}")
        return None


def _process_playlist_for_frontend(playlist:List[Dict]):
    """
    Traite une playlist pour le frontend en convertissant les fichiers locaux et BytesIO.
    
    - Fichiers video locaux ou BytesIO -> data_url  
    - Fichiers funscript locaux ou BytesIO -> données JSON
    
    Parameters
    ----------
    playlist : list
        Playlist d'entrée
        
    Returns
    -------
    list
        Playlist avec fichiers locaux et BytesIO convertis
    """
    if not playlist:
        return playlist
        
    processed_playlist = []
    
    for item in playlist:
        if not isinstance(item, dict):
            processed_playlist.append(item)
            continue
            
        # Copie de l'item pour éviter de modifier l'original
        processed_item = item.copy()
        
        # ============================================================================
        # TRAITEMENT DES SOURCES VIDEO/AUDIO
        # ============================================================================
        if 'sources' in processed_item and isinstance(processed_item['sources'], list):
            processed_sources = []
            
            for source in processed_item['sources']:
                if isinstance(source, dict) and 'src' in source:
                    src = source['src']
                    processed_source = source.copy()
                    
                    # Test si c'est un fichier local (string path)
                    if isinstance(src, str) and os.path.isfile(src):
                        # Convertir en data_url
                        data_url = _file_to_data_url(src)
                        if data_url:
                            processed_source['src'] = data_url
                        # Inférer le type MIME si pas fourni
                        if 'type' not in processed_source:
                            processed_source['type'] = _get_mime_type(src)
                    
                    # Test si c'est un objet BytesIO (uploaded file)
                    elif isinstance(src, BytesIO):
                        # Convertir directement en data_url
                        data_url = _file_to_data_url(src)
                        if data_url:
                            processed_source['src'] = data_url
                        # Inférer le type MIME si pas fourni
                        if 'type' not in processed_source:
                            processed_source['type'] = _get_mime_type(src)
                    
                    # URL distante ou autre format
                    else:
                        # Inférer le type MIME si pas fourni
                        if 'type' not in processed_source:
                            processed_source['type'] = _get_mime_type(src)
                    
                    processed_sources.append(processed_source)
                else:
                    # Format source invalide, garder tel quel
                    processed_sources.append(source)
                    
            processed_item['sources'] = processed_sources
        
        # ============================================================================
        # TRAITEMENT DU FUNSCRIPT
        # ============================================================================
        if 'funscript' in processed_item:
            funscript = processed_item['funscript']
            
            # Test si c'est un fichier local (string path)
            if isinstance(funscript, str) and os.path.isfile(funscript):
                try:
                    # Charger le fichier funscript
                    with open(funscript, 'r', encoding='utf-8') as f:
                        funscript_data = json.load(f)
                    
                    # Remplacer le chemin par les données
                    processed_item['funscript'] = funscript_data
                    
                except Exception as e:
                    print(f"Warning: Failed to load funscript {funscript}: {e}")
                    # Garder le chemin original si chargement échoue
            
            # Test si c'est un objet BytesIO (uploaded file)
            elif isinstance(funscript, BytesIO):
                try:
                    # Charger depuis BytesIO
                    content = funscript.getvalue().decode('utf-8')
                    funscript_data = json.loads(content)
                    
                    # Remplacer l'objet BytesIO par les données
                    processed_item['funscript'] = funscript_data
                    
                except Exception as e:
                    print(f"Warning: Failed to load funscript from BytesIO: {e}")
                    # Garder l'original si chargement échoue
            
            # Si ce n'est ni fichier local ni BytesIO, garder tel quel (URL, dict, etc.)
        
        processed_playlist.append(processed_item)
    
    return processed_playlist


# ============================================================================
# COMPOSANT PRINCIPAL
# ============================================================================

def funplayer(
    playlist: Optional[List[Dict[str, Any]]] = None,
    theme: Optional[Dict[str, Any]] = None,
    key: Optional[str] = None
) -> Any:
    """
    FunPlayer component for synchronized media and haptic playback.
    
    Parameters
    ----------
    playlist : list of dict, optional (defaults to empty list)
        Playlist items in Video.js extended format. Local file paths and 
        BytesIO objects (e.g. from st.file_uploader) are automatically converted.
    theme : dict, optional
        Theme configuration
    key : str, optional
        Streamlit component key
        
    Returns
    -------
    Any
        Component return value (currently None)
        
    Examples
    --------
    # Simple usage
    playlist = [
        {
            "sources": [{"src": "http://remotestorage.io/video.mp4"}],
            "funscript": {"actions": [{"at": 0, "pos": 0}, {"at": 1000, "pos": 100}]},
            "name": "Demo Scene"
        }
    ]
    funplayer(playlist=playlist)
    
    # With local files (will be auto-converted)
    playlist = [
        {
            "sources": [{"src": "/path/to/local/video.mp4"}],  # -> data_url
            "funscript": "/path/to/script.funscript",          # -> JSON data
            "name": "Local Files"
        }
    ]
    funplayer(playlist=playlist)
    
    # With uploaded files from Streamlit
    uploaded_video = st.file_uploader("Video", type=['mp4'])
    uploaded_funscript = st.file_uploader("Funscript", type=['funscript'])
    
    if uploaded_video and uploaded_funscript:
        playlist = [
            {
                "sources": [{"src": uploaded_video}],  # BytesIO -> auto-converted to data_url
                "funscript": uploaded_funscript,       # BytesIO -> auto-converted to JSON
                "name": uploaded_video.name
            }
        ]
        funplayer(playlist=playlist)
    
    Notes
    -----
    Local file size is limited by Streamlit's maxUploadSize setting (default 200MB).
    This can be increased in .streamlit/config.toml:
    
    [server]
    maxUploadSize = 1000  # MB
    
    Warning: Large local files may significantly slow down the application.
    For better performance, use remote URLs instead of local files for media content.
    """

    playlist = playlist or []
    
    # Validation des paramètres
    if playlist is not None:
        if not isinstance(playlist, list):
            raise ValueError("playlist must be a list of dict")
    
    # Traitement de la playlist pour le frontend
    processed_playlist = _process_playlist_for_frontend(playlist)
    
    # Préparer les arguments pour le composant
    component_args = {}
    
    if processed_playlist is not None:
        component_args["playlist"] = processed_playlist
    
    if theme is not None:
        component_args["theme"] = theme
    
    return _component_func(**component_args, key=key, default=None)