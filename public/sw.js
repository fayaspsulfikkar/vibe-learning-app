// Minimal Service Worker to satisfy Chrome PWA install requirements
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  // Empty fetch handler allows the browser to recognize this as a valid PWA capable of at least passing the install check
});
