const CACHE_NAME = 'book-library-v3'

self.addEventListener('install', (event) => {
  console.log('[SW] Install event')
  self.skipWaiting()

  const urlsToCache = [
    '/',
    '/my/library',
    '/offline.html',
    '/favicon.svg',
    '/icons/icon-128x128.png',
    '/icons/icon-256x256.png',
  ]

  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const url of urlsToCache) {
        try {
          const res = await fetch(url)
          if (!res.ok) throw new Error(`Status ${res.status}`)
          await cache.put(url, res.clone())
          // console.log(`[SW] ✅ Cached: ${url}`)
        } catch (err) {
          // console.warn(`[SW] ❌ Failed to cache ${url}:`, err)
        }
      }
    }),
  )
})

self.addEventListener('activate', (event) => {
  console.log('[SW] Activate event')
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log(`[SW] Deleting old cache: ${key}`)
            return caches.delete(key)
          }
        }),
      ),
    ),
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return response
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          return cachedResponse || caches.match('/offline.html')
        })
      }),
  )
})
