const CACHE_NAME = 'book-library-v1'

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll([
        '/',
        '/offline.html',
        '/favicon.ico',
        '/icon-192x192.png',
        '/icon-512x512.png',
        '/_next/static/...', // Add relevant assets if needed
      ]),
    ),
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then((response) => {
        return response || caches.match('/offline.html')
      })
    }),
  )
})
