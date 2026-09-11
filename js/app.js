/* ==========================================================
   AIR TAHITI TOOLS
   APP.JS
========================================================== */

(function () {
    "use strict";

    const STORAGE_KEY = "att-theme";
    const DEFAULT_THEME = "dark";

    function getStoredTheme() {
        const value = localStorage.getItem(STORAGE_KEY);
        return value === "light" || value === "dark" || value === "system"
            ? value
            : DEFAULT_THEME;
    }

    function getEffectiveTheme(theme) {
        if (theme !== "system") return theme;
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    }

    function applyTheme(theme) {
        const effective = getEffectiveTheme(theme);
        document.body.classList.remove("theme-light", "theme-dark");
        document.body.classList.add(`theme-${effective}`);
        document.documentElement.dataset.themePreference = theme;
    }

    window.ATTools = window.ATTools || {};
    window.ATTools.getThemePreference = getStoredTheme;
    window.ATTools.setThemePreference = function (theme) {
        const normalized = ["system", "light", "dark"].includes(theme)
            ? theme
            : DEFAULT_THEME;
        localStorage.setItem(STORAGE_KEY, normalized);
        applyTheme(normalized);
        window.dispatchEvent(new CustomEvent("att:themechange", {
            detail: { preference: normalized, theme: getEffectiveTheme(normalized) }
        }));
    };

    function initialize() {
        applyTheme(getStoredTheme());

        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const handleSystemThemeChange = function () {
            if (getStoredTheme() === "system") applyTheme("system");
        };

        if (media.addEventListener) {
            media.addEventListener("change", handleSystemThemeChange);
        } else if (media.addListener) {
            media.addListener(handleSystemThemeChange);
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialize, { once: true });
    } else {
        initialize();
    }
})();
