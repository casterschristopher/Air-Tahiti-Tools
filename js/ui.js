/*==========================================================
 AIR TAHITI TOOLS
 UI / PWA
 Version 2.0
==========================================================*/

"use strict";

/*==========================================================
LOCAL STORAGE KEYS
==========================================================*/

const STORAGE = {
    theme: "att_theme",
    language: "att_language",
    density: "att_density"
};

/*==========================================================
APPLY THEME
==========================================================*/

function applyTheme() {

    const theme =
        localStorage.getItem(STORAGE.theme) || "red";

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
DEFAULT SETTINGS
==========================================================*/

function initializeSettings() {

    if (!localStorage.getItem(STORAGE.theme)) {

        localStorage.setItem(STORAGE.theme, "red");

    }

    if (!localStorage.getItem(STORAGE.language)) {

        localStorage.setItem(STORAGE.language, "en");

    }

    if (!localStorage.getItem(STORAGE.density)) {

        localStorage.setItem(STORAGE.density, "0.800");

    }

    applyTheme();

}

/*==========================================================
REGISTER SERVICE WORKER
==========================================================*/

async function registerServiceWorker() {

    if (!("serviceWorker" in navigator))
        return;

    try {

        const registration =
            await navigator.serviceWorker.register(
                "../service-worker.js"
            );

        registration.update();

        console.log("Service Worker registered");

    }

    catch (error) {

        console.error(error);

    }

}

/*==========================================================
CHECK UPDATE
==========================================================*/

if ("serviceWorker" in navigator) {

    navigator.serviceWorker.addEventListener(
        "controllerchange",
        () => {

            console.log("Application updated.");

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
