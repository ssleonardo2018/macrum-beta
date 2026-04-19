
const CACHE_NAME = 'macrum-v5';

const urlsToCache = [
  './',
  '../static/css/login.css',
  
  '../static/js/app.js',
  '../manifest.json',
  '../static/img/192.png',
  '../static/img/512.png'
];

// INSTALAR
self.addEventListener('install', event => {
  console.log('SW instalado');

  self.skipWaiting(); // força ativação imediata

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// ATIVAR
self.addEventListener('activate', event => {
  console.log('SW ativado');

  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim(); // assume controle imediato
});

// FETCH (offline)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
      .catch(() => {
        return caches.match('./index.html');
      })
  );
});
