// ✅ Process polyfill si nécessaire (pour Node.js modules)
if (typeof globalThis.process === 'undefined') {
  globalThis.process = {
    env: { NODE_ENV: 'production' },
    nextTick: (cb) => setTimeout(cb, 0),
    version: 'v16.0.0'
  };
}

// ✅ Buffer polyfill si nécessaire
if (typeof globalThis.Buffer === 'undefined') {
  globalThis.Buffer = {
    from: (data) => new Uint8Array(data),
    isBuffer: () => false
  };
}