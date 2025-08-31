// sw.js
const CACHE_NAME = 'mileage-tracker-v1';
const urlsToCache = [
  '/', // The root page (your index.html)
  '/styles.css', // If you have a separate CSS file
  '/script.js'   // If you have a separate JS file
];

// Install the service worker and cache the app shell
self.addEventListener('install', event => {
  console.log('Service Worker installing.');
  // Perform install steps: open a cache and cache our files
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return the response from the cached version
        if (response) {
          return response;
        }
        // If not cached, get it from the network
        return fetch(event.request);
      }
    )
  );
});
