/* Römers Küche – Offline-Speicher
   Bei jeder neuen App-Version VERSION hochzählen, dann holen sich alle Geräte die neue Fassung. */
const VERSION = "rk-2026-11-18c";
const CORE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./favicon.svg",
  "./favicon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== "rk-fonts").map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Google Fonts: einmal laden, dann aus dem Speicher
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(caches.open("rk-fonts").then(c => c.match(req).then(hit => hit || fetch(req).then(res => { c.put(req, res.clone()); return res; }))));
    return;
  }
  if (url.origin !== location.origin) return;

  // App-Seite: zuerst Netz (immer neueste Version), offline aus dem Speicher
  if (req.mode === "navigate" || url.pathname.endsWith("/index.html")) {
    e.respondWith(
      fetch(req).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put("./index.html", copy)); return res; })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Icons und Manifest: zuerst Speicher
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
