/* ==========================================================
   Air Tahiti Tools
   ui.js
   Version : 0.1.0
   Description : Fonctions UI communes
========================================================== */

/**
 * Affiche un toast temporaire.
 * @param {string} message
 */
function showToast(message = "Copié !") {

    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);

}

/**
 * Active un bouton d'un contrôle segmenté.
 * @param {HTMLElement} button
 */
function activateSegment(button) {

    const container = button.parentElement;

    container.querySelectorAll(".segment").forEach(segment => {
        segment.classList.remove("active");
    });

    button.classList.add("active");

}

/**
 * Copie un texte dans le presse-papiers.
 * @param {string} text
 */
async function copyToClipboard(text) {

    try {

        await navigator.clipboard.writeText(text);

        showToast("Copié !");

    } catch (error) {

        console.error(error);

        showToast("Erreur de copie");

    }

}

/**
 * Formate un nombre avec 3 décimales.
 * @param {number|string} value
 * @returns {string}
 */
function formatNumber(value) {

    const number = Number(value);

    if (Number.isNaN(number)) {

        return "0.000";

    }

    return number.toFixed(3);

}

/**
 * Vide tous les champs possédant la classe .input
 */
function clearInputs() {

    document.querySelectorAll(".input").forEach(input => {

        input.value = "";

    });

}

/**
 * Initialise les composants UI.
 */
document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".segment").forEach(button => {

        button.addEventListener("click", () => {

            activateSegment(button);

        });

    });

});
