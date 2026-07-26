/* ==========================================
   Air Tahiti Tools v1.0
   Main Application
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadTheme();

    animateCards();

});

/* ==========================================
   THEME
========================================== */

function loadTheme() {

    const theme = localStorage.getItem("theme");

    if (theme === "dark") {

        document.body.classList.add("dark");

    }

}

function setTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add("dark");

    } else {

        document.body.classList.remove("dark");

    }

    localStorage.setItem("theme", theme);

}

/* ==========================================
   CARD ANIMATION
========================================== */

function animateCards() {

    const cards = document.querySelectorAll(".card");

    cards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";

        setTimeout(() => {

            card.style.transition = "0.45s ease";

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }, index * 120);

    });

}

/* ==========================================
   FUTURE FEATURES
========================================== */

// Language
// Wake Lock
// Fuel Settings
// PWA
// Notifications
