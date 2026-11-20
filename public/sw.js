// SUGGI CLUB Service Worker
// Caches public static assets only.
// CRITICAL: NEVER cache private API responses, customer balances, QR redemption secrets, or admin records.

const CACHE_NAME = 'suggi-club-v1';
const STATIC_ASSETS = [
  '/',
  '/about',
  '/how-it-works',
  '/cafes',
  '/plans',
  '/faq',
  '/offline',
  '/globals.css',
];

self.addEventListener('install', (event) => {
  // @ts-expect-error SW event
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  // @ts-expect-error SW self
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // @ts-expect-error SW event
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  // @ts-expect-error SW self
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // @ts-expect-error SW event
  const url = new URL(event.request.url);

  // NEVER cache API, QR tokens, payments, auth, or admin routes
  if (
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/app/pass') ||
    url.pathname.startsWith('/partner/scanner') ||
    url.pathname.startsWith('/admin')
  ) {
    // Network only with zero cache
    return;
  }

  // Cache-first for public static assets with network fallback
  // @ts-expect-error SW event
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        // Return offline fallback page for navigation requests
        // @ts-expect-error SW event
        if (event.request.mode === 'navigate') {
          return caches.match('/offline');
        }
      });
    })
  );
});
