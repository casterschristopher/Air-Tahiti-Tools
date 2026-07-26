/*==========================================================
 AIR TAHITI TOOLS
 Service Worker
 Version 1.0
==========================================================*/

const CACHE_NAME = "air-tahiti-tools-v1";

/*==========================================================
FILES TO CACHE
==========================================================*/

const FILES_TO_CACHE = [

    "./",
    "./index.html",
    "./manifest.json",

    "./css/variables.css",
    "./css/layout.css",
    "./css/ui.css",
    "./css/fuel.css",
    "./css/torque.css",
    "./css/settings.css",

    "./js/ui.js",
    "./js/fuel.js",
    "./js/torque.js",
    "./js/settings.js",

    "./pages/fuel.html",
    "./pages/torque.html",
    "./pages/settings.html",

    "./assets/icons/icon-192.png",
    "./assets/icons/icon-512.png"

];

/*==========================================================
INSTALL
==========================================================*/

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)

            .then(cache => cache.addAll(FILES_TO_CACHE))

    );

    self.skipWaiting();

});

/*==========================================================
ACTIVATE
==========================================================*/

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()

            .then(keys =>

                Promise.all(

                    keys.map(key => {

                        if (key !== CACHE_NAME) {

                            return caches.delete(key);

                        }

                    })

                )

            )

    );

    self.clients.claim();

});

/*==========================================================
FETCH
==========================================================*/

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)

            .then(response => {

                if (response) {

                    return response;

                }

                return fetch(event.request)

                    .then(networkResponse => {

                        if (
                            !networkResponse ||
                            networkResponse.status !== 200 ||
                            networkResponse.type !== "basic"
                        ) {

                            return networkResponse;

                        }

                        const copy = networkResponse.clone();

                        caches.open(CACHE_NAME)

                            .then(cache => {

                                cache.put(event.request, copy);

                            });

                        return networkResponse;

                    });

            })

    );

});
