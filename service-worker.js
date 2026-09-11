/* Air Tahiti Tools — SERVICE WORKER V11 */
const CACHE_NAME = "air-tahiti-tools-v11";
const APP_SHELL = [
"./","./index.html","./manifest.json",
"./css/variables.css?v=11","./css/themes.css?v=11","./css/components.css?v=11","./css/home.css?v=11","./css/alpha-callup.css","./css/outillage-magasin.css","./css/fuel.css","./css/torque.css","./css/settings.css",
"./js/app.js?v=11","./js/home.js?v=11","./js/fuel.js","./js/torque.js","./js/settings.js",
"./pages/fuel.html","./pages/torque.html","./pages/settings.html","./pages/alpha-callup.html","./pages/outillage-magasin.html",
"./assets/icons/logo.png","./assets/icons/fuel.png","./assets/icons/torque.png","./assets/icons/settings.png","./assets/hero-aircraft.svg"
];
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_SHELL)).then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",event=>{
if(event.request.method!=="GET")return;
if(event.request.mode==="navigate"){
event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put("./index.html",copy));return response}).catch(()=>caches.match("./index.html")));return;
}
event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{if(!response||response.status!==200||response.type==="opaque")return response;const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy));return response})).catch(()=>caches.match("./index.html")));
});