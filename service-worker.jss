/*==========================================================
 AIR TAHITI TOOLS
 Service Worker
 Version 2.0
==========================================================*/

"use strict";

const CACHE_NAME = "att-v2.0.0";

/*==========================================================
STATIC FILES
==========================================================*/

const STATIC_FILES = [

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
            .then(cache => cache.addAll(STATIC_FILES))

    );

    self.skipWaiting();

});

/*==========================================================
ACTIVATE
==========================================================*/

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()

            .then(keys => Promise.all(

                keys.map(key => {

                    if (key !== CACHE_NAME) {

                        return caches.delete(key);

                    }

                })

            ))

    );

    self.clients.claim();

});

/*==========================================================
FETCH
==========================================================*/

self.addEventListener("fetch", event => {

    if (event.request.method !== "GET")
        return;

    const request = event.request;

    /*------------------------------
      HTML → Network First
    ------------------------------*/

    if (request.destination === "document") {

        event.respondWith(

            fetch(request)

                .then(response => {

                    const clone = response.clone();

                    caches.open(CACHE_NAME)

                        .then(cache => {

                            cache.put(request, clone);

                        });

                    return response;

                })

                .catch(() => caches.match(request))

        );

        return;

    }

    /*------------------------------
      CSS / JS / Images → Cache First
    ------------------------------*/

    event.respondWith(

        caches.match(request)

            .then(cacheResponse => {

                if (cacheResponse)
                    return cacheResponse;

                return fetch(request)

                    .then(networkResponse => {

                        if (
                            networkResponse &&
                            networkResponse.status === 200
                        ) {

                            const clone =
                                networkResponse.clone();

                            caches.open(CACHE_NAME)

                                .then(cache => {

                                    cache.put(
                                        request,
                                        clone
                                    );

                                });

                        }

                        return networkResponse;

                    });

            })

    );

});
