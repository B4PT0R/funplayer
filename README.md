# FunPlayer

**Synchronized Media & Haptic Playback Platform**

A modern, high-performance media player that synchronizes audio/video content with haptic feedback devices through the Buttplug.io ecosystem. Built with React and optimized for real-time performance, supporting everything from simple media playback to complex multi-channel haptic orchestration.

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

## 🏗️ Project Structure

This repository contains **two separate but related packages**:

### 📦 **React Package** (`/funplayer/`)
- **npm package**: `funplayer-react`
- **Purpose**: Pure React component library for web integration
- **Builds**: Normal library + standalone embed version
- **Target**: Web developers, direct browser integration

### 📦 **Streamlit Package** (`/streamlit_funplayer/`)
- **PyPI package**: `streamlit-funplayer` 
- **Purpose**: Python/Streamlit wrapper for the React component
- **Target**: Python developers, data scientists, rapid prototyping

## 🚀 Quick Start

Choose your integration path:

**For React/JS developers:**
```bash
npm install funplayer-react
```
→ See [`/funplayer/README.md`](./funplayer/README.md) for React usage

**For Python/Streamlit developers:**
```bash
pip install streamlit-funplayer
```
→ See [`/streamlit_funplayer/README.md`](./streamlit_funplayer/README.md) for Python usage

## ✨ Key Features

- **🎯 Multi-format support**: Video, audio, streaming (HLS/DASH)
- **⚡ Real-time haptic sync**: 120Hz refresh rate with funscript support  
- **🥽 VR ready**: Native browser VR support (Quest, Pico)
- **🎮 100+ devices**: Compatible through Buttplug.io ecosystem
- **🎨 Professional UI**: Real-time visualization and adaptive theming
- **🔧 Modular architecture**: Event-driven, decoupled components

## 🛠️ Development

### Repository Layout
```
📦 FunPlayer/
├─ 📄 funplayer.toml          # Version source of truth
├─ 📄 deploy.py               # Automated dual-package deployment
├─ 📂 funplayer/              # React package (funplayer-react)
│  ├─ 📄 package.json
│  ├─ 📂 src/                 # React components & business logic
│  ├─ 📂 build/               # Normal build output
│  └─ 📂 build-embed/         # Embed build output
└─ 📂 streamlit_funplayer/    # Streamlit package
   ├─ 📄 pyproject.toml
   ├─ 📂 streamlit_funplayer/
   │  └─ 📂 frontend/         # Streamlit React wrapper
   └─ 📄 funplayer.py         # Demo app
```

### Build & Deploy
```bash
# Development
cd funplayer && npm start                    # React dev server
cd streamlit_funplayer && streamlit run funplayer.py  # Streamlit demo

# Production deployment (both packages)
python deploy.py                             # Full deployment
python deploy.py --dry-run                   # Test without publishing
```

## 📋 Requirements

- **[Intiface Central](https://intiface.com/central/)** for device connectivity
- **Compatible haptic device** (see Buttplug.io device list)
- **HTTPS connection** for device access in production environments

## 📖 Documentation

- **React Integration**: [`/funplayer/README.md`](./funplayer/README.md)
- **Streamlit Integration**: [`/streamlit_funplayer/README.md`](./streamlit_funplayer/README.md)  
- **Architecture**: [`/development_guidelines.md`](./development_guidelines.md)

## 📄 License

**Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International**

For commercial licensing, contact: **bferrand.math@gmail.com**

---

**Built with ❤️ using React, Video.js, Buttplug.io, and Streamlit**