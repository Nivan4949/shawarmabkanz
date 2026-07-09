const CACHE_NAME = "kanz-cache-v1";
const ASSETS = [
  "/",
  "/assets/logo.png",
  "/assets/hero_shawarma.png",
  "/assets/spit_burger.png",
  "/assets/baguette_sub.png",
  "/assets/lemonade_drink.png",
  "/assets/pomegranate_drink.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request).catch(() => {
        // Return index.html or cached home if network fails
        return caches.match("/");
      });
    })
  );
});
