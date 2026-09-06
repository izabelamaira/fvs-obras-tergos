const CACHE_NAME = "fvs-obras-tergos-v1";
const ARQUIVOS_APP = [
  "./",
  "./index.html",
  "./manifest.json",
  "./scripts/catalogo-fvs.js",
  "./scripts/subchecks-fvs.js",
  "./scripts/nomes-comodo.js",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ARQUIVOS_APP))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((nomes) =>
      Promise.all(nomes.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

// Cache-first pros arquivos do próprio app; qualquer outra coisa (ex.: PDF.js/dxf-parser
// de CDN, usados só na importação de planta) vai direto pra rede, sem passar pelo cache.
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((resposta) => {
      if (resposta) return resposta;
      return fetch(event.request).then((rede) => {
        const copia = rede.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copia));
        return rede;
      });
    }).catch(() => caches.match("./index.html"))
  );
});
