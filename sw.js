const CACHE_NAME = "fvs-obras-tergos-v38";
const ARQUIVOS_APP = [
  "./",
  "./index.html",
  "./manifest.json",
  "./scripts/catalogo-fvs.js",
  "./scripts/subchecks-fvs.js",
  "./scripts/nomes-comodo.js",
  "./scripts/firebase-config.js",
  "./scripts/firebase-sync.js",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/icon-192-maskable.png",
  "./assets/icons/icon-512-maskable.png"
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

// Arquivos do próprio app: "rede primeiro". Com internet, sempre busca a versão mais
// nova no site (assim uma atualização publicada no GitHub aparece no próximo
// carregamento, sem depender de trocar a versão deste arquivo) e guarda uma cópia.
// Sem internet, usa a cópia guardada — o app continua funcionando offline.
// Qualquer outra coisa (ex.: PDF.js/dxf-parser de CDN, Firebase) vai direto pra rede.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request, { cache: "no-cache" })
      .then((rede) => {
        if (rede && rede.ok) {
          const copia = rede.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copia));
        }
        return rede;
      })
      .catch(() =>
        caches.match(event.request).then((resposta) =>
          resposta || (event.request.mode === "navigate" ? caches.match("./index.html") : Response.error())
        )
      )
  );
});
