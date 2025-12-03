// assets/js/app.js

// ================================
// MODE SOMBRE GLOBAL
// ================================
const themeButton = document.getElementById("theme-toggle");

if (themeButton) {
    // Charger le thème sauvegardé au démarrage
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-theme");
        themeButton.textContent = "☀️";
    }

    // Basculer le thème au clic
    themeButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        if (document.body.classList.contains("dark-theme")) {
            themeButton.textContent = "☀️";
            localStorage.setItem("theme", "dark");
        } else {
            themeButton.textContent = "🌙";
            localStorage.setItem("theme", "light");
        }
    });
}

// ================================
// MENU RESPONSIVE (OPTIONNEL)
// ================================
// Exemple de menu toggle pour mobile
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav ul");

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}

// ================================
// INITIALISATION AOS
// ================================
if (AOS) {
    AOS.init({
        duration: 1200,
        once: true
    });
}

// ================================
// FONCTIONS UTILES GLOBALES
// ================================

// Scroll vers le haut
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Exemple : bouton "back to top" si nécessaire
const backToTopBtn = document.getElementById("back-to-top");
if (backToTopBtn) {
    backToTopBtn.addEventListener("click", scrollToTop);
}

// ================================
// AUTRES FONCTIONS GLOBALES
// ================================
// Tu peux ajouter ici des fonctions réutilisables dans toutes les pages
