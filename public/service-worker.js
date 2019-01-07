var CACHE = 'cache'

self.addEventListener('install', function (evt) {
  evt.waitUntil(precache())
  console.log('[Service Worker] Install');
})

self.addEventListener('fetch', function (evt) {
  evt.respondWith(fromCache(evt.request))
  evt.waitUntil(update(evt.request))
})

function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll([
      './',
      '/assets/MWA.png',
      '/assets/global.css',
      '/assets/favicon.ico',
      '/robots.txt'
    ])
  })
}

async function fromCache(request) {
  const cache = await caches.open(CACHE);
  const matching = await cache.match(request);
  return matching || null;
}

async function update(request) {
  const cache = await caches.open(CACHE);
  const response = await fetch(request);
  return cache.put(request, response);
}
