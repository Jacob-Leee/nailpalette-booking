/* ══════════════════════════════════════════════
   nailpalette.syd — Service Worker
   Enables offline support & PWA installability
   ══════════════════════════════════════════════ */

const CACHE_NAME = 'nailpalette-v3';

// Files to cache — use scope as base so paths work on GitHub Pages subfolders
const BASE = self.registration ? self.registration.scope : '/';
const STATIC_ASSETS = [
  BASE,
  BASE + 'index.html',
  BASE + 'css/style.css',
  BASE + 'js/app.js',
  BASE + 'js/firebase-config.js',
  BASE + 'manifest.json'
];

// ── INSTALL: cache static assets ─────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('SW: some assets could not be cached', err);
      });
    })
  );
  self.skipWaiting();
});

// ── ACTIVATE: clean old caches ────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ── FETCH: network-first, fallback to cache ───────
self.addEventListener('fetch', event => {
  // Skip Firebase / Google Fonts / cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache successful GET responses
        if (event.request.method === 'GET' && response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
