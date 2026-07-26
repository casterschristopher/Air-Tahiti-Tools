/*==========================================================
 AIR TAHITI TOOLS
 UI / PWA
 Version 3.0
==========================================================*/

"use strict";

/*==========================================================
LOCAL STORAGE
==========================================================*/

const STORAGE = {

    theme: "att_theme",
    language: "att_language",
    density: "att_density"

};

/*==========================================================
DEFAULT SETTINGS
==========================================================*/

const DEFAULT_SETTINGS = {

    theme: "red",
    language: "en",
    density: "0.800"

};

/*==========================================================
INITIALIZE SETTINGS
==========================================================*/

function initializeSettings() {

    Object.keys(DEFAULT_SETTINGS).forEach(key => {

        if (!localStorage.getItem(STORAGE[key])) {

            localStorage.setItem(
                STORAGE[key],
                DEFAULT_SETTINGS[key]
            );

        }

    });

    applyTheme();

}

/*==========================================================
THEME
==========================================================*/

function applyTheme() {

    const theme =
        localStorage.getItem(STORAGE.theme);

    document.body.classList.remove(
        "theme-red",
        "theme-black"
    );

    document.body.classList.add(
        theme === "black"
            ? "theme-black"
            : "theme-red"
    );

}

/*==========================================================
SERVICE WORKER
==========================================================*/

async function registerServiceWorker() {

    if (!("serviceWorker" in navigator))
        return;

    try {

        const swPath =
            `${location.origin}${location.pathname.includes("/pages/")
                ? "/service-worker.js"
                : "./service-worker.js"}`;

        const registration =
            await navigator.serviceWorker.register(
                swPath,
                {
                    scope: "./"
                }
            );

        console.log("Service Worker Ready");

        registration.update();

    }

    catch (error) {

        console.error(error);

    }

}

/*==========================================================
ONLINE / OFFLINE
==========================================================*/

window.addEventListener("online", () => {

    console.log("Online");

});

window.addEventListener("offline", () => {

    console.log("Offline");

});

/*==========================================================
APP UPDATE
==========================================================*/

if ("serviceWorker" in navigator) {

    navigator.serviceWorker.addEventListener(
        "controllerchange",
        () => {

            window.location.reload();

        }

    );

}

/*==========================================================
INIT
==========================================================*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeSettings();

        registerServiceWorker();

    }
);
