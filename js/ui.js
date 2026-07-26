/*==========================================================
 AIR TAHITI TOOLS
 UI / PWA
 Version 4.0
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

const DEFAULTS = {

    theme: "red",
    language: "en",
    density: "0.800"

};

/*==========================================================
INITIALIZATION
==========================================================*/

function initializeSettings() {

    Object.keys(DEFAULTS).forEach(key => {

        if (!localStorage.getItem(STORAGE[key])) {

            localStorage.setItem(
                STORAGE[key],
                DEFAULTS[key]
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

        const registration =
            await navigator.serviceWorker.register(
                "/service-worker.js"
            );

        await registration.update();

        console.log(
            "✔ Service Worker registered"
        );

    }

    catch (error) {

        console.error(
            "Service Worker error:",
            error
        );

    }

}

/*==========================================================
ONLINE STATUS
==========================================================*/

window.addEventListener("online", () => {

    console.log("Online");

});

window.addEventListener("offline", () => {

    console.log("Offline");

});

/*==========================================================
AUTO UPDATE
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
