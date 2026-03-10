// ══════════════════════════════════════
//  Bunpou JLPT — Service Worker
//  Cache-first strategy for offline use
// ══════════════════════════════════════

const CACHE = 'bunpou-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './js/app.js',
  './js/browse.js',
  './js/quiz.js',
  './js/fillin.js',
  './js/srs.js',
  './data/n3-w1.js',
  './data/dummy.js',
  './data/bank-soal.js',
  './data/index.js',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
