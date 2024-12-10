self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('app-cache').then((cache) => {
      return cache.addAll([
        '/Mywebapp/', // Add the relative root of your app
        '/Mywebapp/index.html',
        '/Mywebapp/style.css',
        '/Mywebapp/converters/index.html',
        '/Mywebapp/converters/distance/index.html',
        '/Mywebapp/quantities/index.html',
        '/Mywebapp/quantities/wallarea/index.html',
        '/Mywebapp/quantities/wallarea/fenestrations/index.html',
        '/Mywebapp/quantities/wallarea/fenestrations/passages/index.html',
        '/Mywebapp/quantities/wallarea/fenestrations/windows/index.html',
        '/Mywebapp/quantities/wallarea/fenestrations/doors/index.html',
        '/Mywebapp/quantities/wallarea/walldimensions/index.html',
        '/Mywebapp/quantities/concretevolume/index.html',
        '/Mywebapp/materials/index.html',
        '/Mywebapp/materials/roof/index.html',
        '/Mywebapp/materials/roof/roofstructure/index.html',
        '/Mywebapp/materials/roof/roofstructure/timberrafters/index.html',
        '/Mywebapp/materials/roof/roofstructure/timberpurlins/index.html',
        '/Mywebapp/materials/roof/roofingmaterials/index.html',
        '/Mywebapp/materials/roof/roofingmaterials/Corrugatedironsheets/index.html',
        '/Mywebapp/materials/roof/roofdimensions/index.html',
        '/Mywebapp/materials/concrete/index.html',
        '/Mywebapp/materials/concrete/concretemix/index.html',
        '/Mywebapp/materials/wall/index.html',
        '/Mywebapp/materials/wall/morta/index.html',
        '/Mywebapp/materials/wall/block/index.html',
        '/Mywebapp/materials/rebar/columnrebar/index.html',
        '/Mywebapp/materials/rebar/columnrebar/columnrings/index.html',
        '/Mywebapp/materials/rebar/columnrebar/columnmains/index.html',
        '/Mywebapp/materials/rebar/beamrebar/index.html',
        '/Mywebapp/materials/rebar/beamrebar/beamrings/index.html',
        '/Mywebapp/materials/rebar/beamrebar/beammains/index.html',
        '/Mywebapp/materials/rebar/slabrebar/index.html',
        '/Mywebapp/materials/rebar/slabrebar/slabrings/index.html',
        '/Mywebapp/materials/rebar/index.html',
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
