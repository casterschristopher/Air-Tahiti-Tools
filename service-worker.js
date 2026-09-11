/* ==========================================================
   AIR TAHITI TOOLS — SERVICE WORKER
========================================================== */
const CACHE_NAME = "air-tahiti-tools-v4";
const APP_SHELL = [
    "./","./index.html","./manifest.json",
    "./css/variables.css?v=4","./css/themes.css?v=4","./css/components.css?v=4","./css/home.css?v=4","./css/alpha-callup.css",
    "./css/fuel.css","./css/torque.css","./css/settings.css",
    "./js/app.js?v=4","./js/home.js?v=4","./js/fuel.js","./js/torque.js","./js/settings.js",
    "./pages/fuel.html","./pages/torque.html","./pages/settings.html","./pages/alpha-callup.html",
    "./assets/icons/logo.png","./assets/icons/fuel.png","./assets/icons/torque.png","./assets/icons/settings.png",
    "./assets/hero-aircraft.svg"
];
self.addEventListener("install", event => {event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));});
self.addEventListener("activate", event => {event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));});
self.addEventListener("fetch", event => {if(event.request.method !== "GET") return;event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {if(!response || response.status !== 200 || response.type === "opaque") return response;const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy));return response;})).catch(()=>caches.match("./index.html")));});
