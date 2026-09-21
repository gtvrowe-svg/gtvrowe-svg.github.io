// Service worker: guarda o app para abrir rápido e funcionar sem internet.
const CACHE = "financas-v1";
const ASSETS = ["./", "./index.html", "./manifest.json", "./firebase-config.js", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Arquivos do próprio app: tenta a rede primeiro (pega atualizações), senão usa o cache.
  if (url.origin === location.origin) {
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(CACHE).then(k => k.put(req, c)); return r; })
      .catch(() => caches.match(req).then(r => r || caches.match("./index.html"))));
    return;
  }
  // Biblioteca do Firebase e fontes: usa o cache se já tiver.
  if (url.host === "www.gstatic.com" || url.host.endsWith("fonts.googleapis.com") || url.host === "fonts.gstatic.com") {
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => { const c = res.clone(); caches.open(CACHE).then(k => k.put(req, c)); return res; })));
  }
  // Demais pedidos (banco de dados do Firebase) passam direto.
});
