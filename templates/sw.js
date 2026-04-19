const CACHE_NAME = 'macrum-v5';

// Caminhos ajustados partindo de dentro da pasta /templates
const urlsToCache = [
  './login.html',           // Página inicial do PWA
  './admin.html',
  './paciente.html',
  './nutricionista.html',
  '../static/css/login.css',
  '../static/js/app.js',
  '../manifest.json',       // Se o manifesto estiver na raiz
  '../static/img/192.png',
  '../static/img/512.png'
];

// INSTALAR
self.addEventListener('install', event => {
  console.log('SW instalado');
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Arquivos em cache');
        return cache.addAll(urlsToCache);
      })
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
  self.clients.claim();
});

// FETCH (Estratégia Cache First, falling back to Network)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna o cache ou busca na rede
        return response || fetch(event.request);
      })
      .catch(() => {
        // Se ambos falharem (offline), redireciona para o login do PWA
        return caches.match('./login.html');
      })
  );
});
