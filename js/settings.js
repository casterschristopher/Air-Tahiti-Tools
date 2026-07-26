/*==========================================================
 AIR TAHITI TOOLS
 Settings Engine
 Version 1.0
==========================================================*/

"use strict";

/*==========================================================
 STORAGE KEYS
==========================================================*/

const STORAGE = {

    theme: "att_theme",
    language: "att_language",
    density: "att_density"

};

/*==========================================================
 DEFAULT VALUES
==========================================================*/

const DEFAULT_THEME = "red";
const DEFAULT_LANGUAGE = "en";
const DEFAULT_DENSITY = "0.800";

/*==========================================================
 DOM
==========================================================*/

const themeSelect = document.getElementById("theme");
const languageSelect = document.getElementById("language");
const densityInput = document.getElementById("densityDefault");

const saveButton = document.getElementById("saveButton");
const resetButton = document.getElementById("resetButton");

/*==========================================================
 LOAD SETTINGS
==========================================================*/

function loadSettings() {

    themeSelect.value =
        localStorage.getItem(STORAGE.theme) ?? DEFAULT_THEME;

    languageSelect.value =
        localStorage.getItem(STORAGE.language) ?? DEFAULT_LANGUAGE;

    densityInput.value =
        localStorage.getItem(STORAGE.density) ?? DEFAULT_DENSITY;

}

/*==========================================================
 APPLY THEME
==========================================================*/

function applyTheme(theme) {

    document.body.classList.remove(
        "theme-red",
        "theme-black"
    );

    if (theme === "black") {

        document.body.classList.add("theme-black");

    } else {

        document.body.classList.add("theme-red");

    }

}

/*==========================================================
 SAVE SETTINGS
==========================================================*/

function saveSettings() {

    let density = parseFloat(densityInput.value);

    if (isNaN(density))
        density = 0.800;

    density = Math.max(0.700, Math.min(0.850, density));

    densityInput.value = density.toFixed(3);

    localStorage.setItem(
        STORAGE.theme,
        themeSelect.value
    );

    localStorage.setItem(
        STORAGE.language,
        languageSelect.value
    );

    localStorage.setItem(
        STORAGE.density,
        density.toFixed(3)
    );

    applyTheme(themeSelect.value);

    alert("Settings saved.");

}

/*==========================================================
 RESET SETTINGS
==========================================================*/

function resetSettings() {

    themeSelect.value = DEFAULT_THEME;
    languageSelect.value = DEFAULT_LANGUAGE;
    densityInput.value = DEFAULT_DENSITY;

    saveSettings();

}

/*==========================================================
 EVENTS
==========================================================*/

themeSelect.addEventListener("change", () => {

    applyTheme(themeSelect.value);

});

saveButton.addEventListener(
    "click",
    saveSettings
);

resetButton.addEventListener(
    "click",
    resetSettings
);

/*==========================================================
 INIT
==========================================================*/

loadSettings();

applyTheme(themeSelect.value);
