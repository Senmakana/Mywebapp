self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('app-cache').then((cache) => {
      return cache.addAll([
        '/Mywebapp/', // Add the relative root of your app
        '/Mywebapp/index.html',
        '/Mywebapp/style.css',
        '/Mywebapp/converters/index.html',
        '/Mywebapp/quantities/index.html',
        '/Mywebapp/materials/index.html',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
