// service-worker.js for BiteShare
const CACHE_NAME = "biteshare-cache-v1";

// Static assets to cache (the "app shell")
// Use Set to automatically remove duplicates if any
const urlsToCache = Array.from(new Set([
  "/",
  "../index.html",
  "/manifest.json",
  "/capstone-logo.svg",
  "/icons/biteshare-logo-192.png",
  "/icons/biteshare-logo-512.png"
]));

// Install service worker & cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[BiteShare SW] Caching app shell");
      // Cache each URL individually to handle failures gracefully
      return Promise.all(
        urlsToCache.map((url) =>
          cache.add(url).catch((err) => {
            console.warn(`[BiteShare SW] Failed to cache ${url}:`, err);
          })
        )
      );
    })
  );
});

// Activate & clean up old caches if version changes
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log("[BiteShare SW] Deleting old cache:", name);
            return caches.delete(name);
          }
        })
      )
    )
  );
});

// Fetch handler: cache-first for static assets, network-first for API
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Avoid caching your API (adjust URL if needed)
  if (request.url.includes("/api/")) {
    event.respondWith(
      fetch(request).catch(() => caches.match("/offline.html"))
    );
    return;
  }

  // For everything else: try cache first, then network
  event.respondWith(
    caches.match(request).then((response) => response || fetch(request))
  );
});
