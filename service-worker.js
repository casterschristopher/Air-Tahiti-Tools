const CACHE_NAME = "air-tahiti-tools-v1.0.0";

const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/manifest.json",

    "/css/variables.css",
    "/css/layout.css",
    "/css/style.css",
    "/css/components.css",
    "/css/ui.css",

    "/js/ui.js",
    "/js/fuel.js",
    "/js/torque.js",
    "/js/settings.js",

    "/pages/fuel.html",
    "/pages/torque.html",
    "/pages/settings.html",

    "/assets/icons/icon-192.png",
    "/assets/icons/icon-512.png",

    "/assets/icons/fuel.svg",
    "/assets/icons/torque.svg",
    "/assets/icons/settings.svg",

    "/assets/images/C418D666-5680-4A2E-A41E-5C0A447B786A.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
    );
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        )
    );

    self.clients.claim();
});

self.addEventListener("fetch", event => {
    if (event.request.method !== "GET") {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
