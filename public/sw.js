const CACHE_NAME = 'book-library-v5'
const PRECACHE_URLS = [
  '/',
  '/my/library',
  '/offline.html',
  '/favicon.svg',
  '/icons/icon-128x128.png',
  '/icons/icon-256x256.png',
]

self.addEventListener('install', (event) => {
  const precache = (async () => {
    const cache = await caches.open(CACHE_NAME)
    for (const url of PRECACHE_URLS) {
      try {
        const res = await fetch(new Request(url, { cache: 'reload' }))
        if (!res.ok) throw new Error(`Status ${res.status}`)
        const absolute = new URL(url, self.location.origin).toString()
        await cache.put(absolute, res.clone())
        if (url === '/') {
          await cache.put(self.location.origin + '/', res.clone())
        }
      } catch {}
    }
  })()

  self.skipWaiting()
  event.waitUntil(precache)
})

self.addEventListener('activate', (event) => {
  const cleanup = (async () => {
    const keys = await caches.keys()
    await Promise.all(
      keys.map((k) =>
        k !== CACHE_NAME ? caches.delete(k) : Promise.resolve(),
      ),
    )
    if ('navigationPreload' in self.registration) {
      try {
        await self.registration.navigationPreload.enable()
      } catch {}
    }
  })()

  event.waitUntil(cleanup)
  self.clients.claim()
})

function isSameOrigin(url) {
  try {
    return new URL(url).origin === self.location.origin
  } catch {
    return false
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  // Navigations: network-first, offline fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const preload =
            'preloadResponse' in event ? await event.preloadResponse : null
          if (preload) return preload
          return await fetch(request)
        } catch {
          const cache = await caches.open(CACHE_NAME)
          const exact = await cache.match(request, { ignoreSearch: true })
          if (exact) return exact
          const root = await cache.match(
            new URL('/', self.location.origin).toString(),
          )
          if (root) return root
          return await cache.match(
            new URL('/offline.html', self.location.origin).toString(),
          )
        }
      })(),
    )
    return
  }

  // Static assets: cache-first
  const url = new URL(request.url)
  const isNextStatic =
    isSameOrigin(request.url) && url.pathname.startsWith('/_next/static/')
  const isStaticExt =
    /\.(?:png|jpg|jpeg|webp|svg|gif|ico|css|js|woff2?|ttf|map)$/i.test(
      url.pathname,
    )

  if (isNextStatic || (isSameOrigin(request.url) && isStaticExt)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME)
        const cached = await cache.match(request)
        if (cached) return cached
        try {
          const res = await fetch(request)
          if (res && res.ok) await cache.put(request, res.clone())
          return res
        } catch {
          return await cache.match(
            new URL('/offline.html', self.location.origin).toString(),
          )
        }
      })(),
    )
    return
  }

  // Same-origin runtime: network-first with cache fallback
  if (isSameOrigin(request.url)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME)
        try {
          const res = await fetch(request)
          if (res && res.ok) await cache.put(request, res.clone())
          return res
        } catch {
          return await cache.match(request, { ignoreSearch: true })
        }
      })(),
    )
  }
})
