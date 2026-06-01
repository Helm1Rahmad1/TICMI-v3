// Minimal service worker — cache shell for offline / PWA install
const CACHE = 'ticmi-v1';
const ASSETS = ['./','./index.html','./styles.css','./manifest.webmanifest','./icon-192.svg','./icon-512.svg'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(()=>{}));
  self.skipWaiting();
});
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(()=> caches.match('./index.html')))
  );
});
