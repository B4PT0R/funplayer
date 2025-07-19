# FunPlayer

**Synchronized media and haptic playback for web applications**

FunPlayer is a React component and Web Component that provides synchronized video/audio playback with haptic feedback through [Intiface Central](https://intiface.com/central/) and compatible devices.

## Features

- 🎬 **Media Playback**: Video, audio, and funscript-only playback
- 🎮 **Haptic Sync**: Precise synchronization with funscript data
- 🔌 **Device Support**: Compatible with all Buttplug.js supported devices
- 🎨 **Customizable**: Theming support with CSS variables
- 📱 **Cross-Platform**: Works on desktop, mobile, and VR browsers
- ⚡ **Performance**: Optimized for smooth playback and responsive haptics

## Installation

```bash
npm install funplayer
```

## Quick Start

### React Component

```jsx
import { FunPlayer } from 'funplayer'

function App() {
  const playlist = [
    {
      sources: [
        { src: 'video.mp4', type: 'video/mp4' }
      ],
      funscript: { actions: [/* funscript data */] },
      name: 'Example Video'
    }
  ]

  return (
    <FunPlayer 
      playlist={playlist}
      onPlay={() => console.log('Playing')}
      onDeviceConnect={(device) => console.log('Device connected:', device)}
    />
  )
}
```

### Web Component (Embed)

```html
<!-- Include the embed script -->
<script src="https://unpkg.com/funplayer/build-embed/funplayer-embed.js"></script>

<!-- Use the web component -->
<fun-player 
  playlist='[{"sources":[{"src":"video.mp4","type":"video/mp4"}],"funscript":{"actions":[...]}}]'
  theme='{"primaryColor":"#FF4B4B"}'
></fun-player>
```

## API Reference

### Props

#### `playlist` (Array, optional)

Array of playlist items. Each item follows the Video.js format with funscript integration:

```javascript
{
  sources: [                    // Media sources (Video.js format)
    {
      src: 'video_720p.mp4',    // URL, local file, or data
      type: 'video/mp4',        // MIME type (auto-detected if omitted)
      label: '720p'             // Quality label (optional)
    }
  ],
  funscript: {                  // Haptic data
    actions: [                  // Array of action points
      { at: 1000, pos: 50 },    // at: timestamp (ms), pos: position (0-100)
      { at: 2000, pos: 80 }
    ]
  },
  name: 'Video Title',          // Display name
  description: 'Description',   // Optional description
  poster: 'poster.jpg',         // Poster image URL (optional)
  duration: 120.5,              // Duration in seconds (optional)
  textTracks: [...]             // Subtitles/captions (optional)
}
```

#### `theme` (Object, optional)

Customize the player appearance:

```javascript
{
  // Colors
  primaryColor: '#FF4B4B',                    // Primary accent color
  backgroundColor: '#FFFFFF',                 // Main background
  secondaryBackgroundColor: '#F0F2F6',        // Secondary background
  textColor: '#262730',                       // Text color
  borderColor: '#E6EBF5',                     // Border color
  
  // Typography & Layout
  fontFamily: '"Source Sans Pro", sans-serif', // Font family
  baseRadius: '0.5rem',                        // Border radius
  spacing: '1rem',                             // Base spacing unit
  
  // Predefined base
  base: 'dark'                                // 'light' or 'dark'
}
```

### Events

FunPlayer exposes standard Video.js events plus haptic-specific events:

#### Media Events

| Event | Callback Prop | Description |
|-------|---------------|-------------|
| `play` | `onPlay` | Playback started |
| `pause` | `onPause` | Playback paused |
| `ended` | `onEnded` | Playback finished |
| `timeupdate` | `onTimeUpdate` | Current time changed |
| `seeking` | `onSeeking` | User started seeking |
| `seeked` | `onSeeked` | User finished seeking |
| `loadstart` | `onLoadStart` | Started loading media |
| `loadeddata` | `onLoadedData` | Media data loaded |
| `canplay` | `onCanPlay` | Media can start playing |
| `error` | `onError` | Playback error occurred |

#### Haptic Events

| Event | Callback Prop | Description |
|-------|---------------|-------------|
| `deviceconnect` | `onDeviceConnect` | Haptic device connected |
| `devicedisconnect` | `onDeviceDisconnect` | Haptic device disconnected |
| `hapticstart` | `onHapticStart` | Haptic playback started |
| `hapticstop` | `onHapticStop` | Haptic playback stopped |

#### Playlist Events

| Event | Callback Prop | Description |
|-------|---------------|-------------|
| `playlistitemchange` | `onPlaylistItemChange` | Playlist item changed |

### Event Handler Example

```jsx
<FunPlayer
  playlist={playlist}
  onPlay={(event) => {
    console.log('Playing:', event.detail)
  }}
  onDeviceConnect={(event) => {
    const device = event.detail
    console.log('Connected device:', device.name)
  }}
  onTimeUpdate={(event) => {
    const currentTime = event.detail.currentTime
    console.log('Current time:', currentTime)
  }}
/>
```

## Setup Requirements

### Browser Requirements

- Modern browser with WebRTC support
- HTTPS required for device access (except localhost)
- WebAssembly support for audio processing

### Haptic Setup

1. **Install [Intiface Central](https://intiface.com/central/)**
2. **Connect your compatible device**
3. **Start Intiface Central server** (default: `ws://localhost:12345`)
4. **Allow browser permissions** for device access

### Supported Devices

FunPlayer works with all [Buttplug.js compatible devices](https://iostindex.com/), including:
- Interactive toys (strokers, vibrators, etc.)
- Game controllers with haptic feedback
- Custom hardware via Buttplug device drivers

## Advanced Usage

### Programmatic Control

```javascript
// Access the player instance (React)
const playerRef = useRef()

// Control playback
playerRef.current?.play()
playerRef.current?.pause()
playerRef.current?.seek(30) // Seek to 30 seconds

// Get player state
const currentTime = playerRef.current?.getCurrentTime()
const isPlaying = playerRef.current?.isPlaying()
```

### Custom Theming

FunPlayer uses CSS custom properties for theming. You can override these directly:

```css
.funplayer-container {
  --fp-primary-color: #your-color;
  --fp-background-color: #your-bg;
  --fp-text-color: #your-text;
}
```

### Web Component Events

For the Web Component version, listen to events on the element:

```javascript
const player = document.querySelector('fun-player')

player.addEventListener('funplayer-play', (event) => {
  console.log('Player started:', event.detail)
})

player.addEventListener('funplayer-deviceconnect', (event) => {
  console.log('Device connected:', event.detail)
})
```

## Browser Support

- Chrome/Chromium 90+
- Firefox 90+
- Safari 14+
- Edge 90+

## License

MIT

## Links

- [GitHub Repository](https://github.com/B4PT0R/funplayer)
- [Intiface Central](https://intiface.com/central/)
- [Buttplug.js Documentation](https://buttplug-js.docs.buttplug.io/)
- [Funscript Format](https://github.com/FredTungsten/ScriptPlayer/wiki/Funscript-Format)