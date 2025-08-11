self.addEventListener('install', (e)=> self.skipWaiting());
self.addEventListener('activate', (e)=> self.clients.claim());
const CACHE = 'babyfeed-gh-v1';
const ASSETS = ['.', 'index.html', 'manifest.json', 'icons/icon-192.png', 'icons/icon-512.png'];
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(event.request).then(resp => resp || fetch(event.request).then(r => {
        cache.put(event.request, r.clone());
        return r;
      }).catch(()=> cache.match('./')))
    )
  );
});
