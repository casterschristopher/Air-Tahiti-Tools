/* ==========================================================
   AIR TAHITI TOOLS
   SETTINGS.JS
========================================================== */

(function () {
    "use strict";

    const options = document.querySelectorAll("[data-theme]");

    function refreshSelection() {
        const current = window.ATTools?.getThemePreference?.() || "system";

        options.forEach(option => {
            const selected = option.dataset.theme === current;
            option.classList.toggle("is-selected", selected);
            option.setAttribute("aria-pressed", String(selected));
        });
    }

    options.forEach(option => {
        option.addEventListener("click", () => {
            window.ATTools?.setThemePreference?.(option.dataset.theme);
            refreshSelection();
        });
    });

    refreshSelection();
})();
