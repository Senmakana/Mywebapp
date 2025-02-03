const CACHE_NAME = 'app-cache-v1';
const OFFLINE_URL = '/Mywebapp/offline.html';

// Files to cache during installation
const ASSETS_TO_CACHE = [
  '/Mywebapp/',
  '/Mywebapp/index.html',
  '/Mywebapp/style.css',
  '/Mywebapp/windows/index.html',
  '/Mywebapp/windows/style.css',
  '/Mywebapp/windows/script.js',
  '/Mywebapp/columnstarters/index.html',
  '/Mywebapp/columnstarters/style.css',
  '/Mywebapp/columnstarters/script.js',
  '/Mywebapp/columnbases/index.html',
  '/Mywebapp/columnbases/style.css',
  '/Mywebapp/columnbases/script.js',
  '/Mywebapp/columnsteel/index.html',
  '/Mywebapp/columnsteel/style.css',
  '/Mywebapp/columnsteel/script.js',
  '/Mywebapp/beam/index.html',
  '/Mywebapp/beam/style.css',
  '/Mywebapp/beam/script.js',
  '/Mywebapp/staircases/index.html',
  '/Mywebapp/staircases/style.css',
  '/Mywebapp/staircases/script.js',
  OFFLINE_URL, // Add offline fallback page
];

// Install event: Cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event: Serve cached assets or fetch from network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return fetch(event.request);
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached response if available
      if (response) {
        return response;
      }

      // Fetch from network and cache the response
      return fetch(event.request).then((fetchResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      }).catch(() => {
        // Fallback to offline page if fetch fails
        return caches.match(OFFLINE_URL);
      });
    })
  );
});