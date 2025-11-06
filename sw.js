const CACHE_NAME = 'shawnyxx-cache-v1';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/offline.html',
  '/style.css',
  '/script.js',
  '/manifest.webmanifest',
  '/assets/files/icons/javascript-icon.ico'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Listen for messages from the client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((keys) => {
        return Promise.all(
          keys.map((key) => caches.delete(key))
        );
      }).then(() => {
        // Send confirmation back to client if port is available
        if (event.ports && event.ports[0]) {
          event.ports[0].postMessage({ success: true });
        }
      })
    );
  }
});

// Navigation handler: network-first, fallback to cache then offline page
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Only handle GET
  if (request.method !== 'GET') return;

  // If this is a navigation request, try network first then fallback
  if (request.mode === 'navigate' || (request.headers.get('accept') || '').includes('text/html')) {
    event.respondWith(
      fetch(request).then((networkResponse) => {
        // Clone before consuming
        const responseToCache = networkResponse.clone();
        // Update cache with the latest HTML
        caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
        return networkResponse;
      }).catch(() => caches.match('/offline.html'))
    );
    return;
  }

  // For other requests, try cache first then network, and cache new resources
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(request).then((networkResponse) => {
        // If there's no valid response, just pass it through
        if (!networkResponse || networkResponse.status !== 200) return networkResponse;
        
        // Clone the response before consuming it
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
        
        return networkResponse;
      }).catch(() => {
        // If it's an image request, return a fallback icon if available
        if (request.destination === 'image') {
          return caches.match('/assets/files/icons/javascript-icon.ico');
        }
      });
    })
  );
});
