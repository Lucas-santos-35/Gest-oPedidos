
/**
 * Service Worker para a aplicação Gestão de Balcão
 * Este ficheiro permite que a app funcione offline e seja instalada no telemóvel.
 */

const CACHE_NAME = 'balcao-v3-cache';

// Ficheiros para colocar em cache para acesso offline
const assetsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/lucide@latest'
];

// Evento de Instalação: Guarda os ficheiros essenciais no cache do navegador
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

// Evento de Ativação: Limpa caches antigos de versões anteriores
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Evento de Fetch: Serve os ficheiros do cache quando estiver offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retorna o ficheiro do cache ou faz a requisição na rede
      return response || fetch(event.request);
    })
  );
});
