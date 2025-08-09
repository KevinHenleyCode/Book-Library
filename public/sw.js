const CACHE_NAME = 'book-library-v4'

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
        await cache.put(
          new URL(url, self.location.origin).toString(),
          res.clone(),
        )
      } catch (err) {}
    }
  })()

  self.skipWaiting()
  event.waitUntil(precache)
})

self.addEventListener('activate', (event) => {
  const cleanup = (async () => {
    const keys = await caches.keys()
    await Promise.all(
      keys.map((key) =>
        key !== CACHE_NAME ? caches.delete(key) : Promise.resolve(),
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

function normalized(url) {
  return new URL(url, self.location.origin).toString()
}

self.addEventListener('fetch', (event) => {
  const { request } = event

  if (request.method !== 'GET') return

  // 1: Navigations - network-first, then offline fallbacks
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const preload =
            'preloadResponse' in event ? await event.preloadResponse : null
          if (preload) return preload
          const online = await fetch(request)
          return online
        } catch {
          const cache = await caches.open(CACHE_NAME)
          // Try specific page, then app shell, then offline page
          const fromCache =
            (await cache.match(normalized('/my/library'))) ||
            (await cache.match(normalized('/'))) ||
            (await cache.match(normalized('/offline.html')))
          return (
            fromCache ||
            new Response('Offline', { status: 503, statusText: 'Offline' })
          )
        }
      })(),
    )
    return
  }

  // 2: Static assets (cache-first) - Next.js build files and common static types
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
          // Last resort, try offline shell for CSS/JS requests to avoid blank screen
          const fallback = await cache.match(normalized('/offline.html'))
          return fallback || new Response('', { status: 504 })
        }
      })(),
    )
    return
  }

  // 3: Everything else (API/etc.) - network-first with cache fallback for same-origin
  if (isSameOrigin(request.url)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME)
        try {
          const res = await fetch(request)
          if (res && res.ok) await cache.put(request, res.clone())
          return res
        } catch {
          const fallback = await cache.match(request)
          return fallback || new Response('Offline', { status: 503 })
        }
      })(),
    )
  }
})
