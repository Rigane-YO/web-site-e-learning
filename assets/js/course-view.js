/* ======================================================
   course-view.js  
   Page d'affichage d'un cours
====================================================== */

// -----------------------------
// 1) Récupération du paramètre ID dans l’URL
// -----------------------------
const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get("id");

// Sélecteurs
const courseTitle = document.getElementById("course-title");
const courseDescription = document.getElementById("course-description");
const courseVideo = document.getElementById("course-video");
const chapterList = document.getElementById("chapter-list");
const progressBar = document.getElementById("course-progress");
const progressPercent = document.getElementById("progress-percent");
const startQuizBtn = document.getElementById("start-quiz-btn");
const courseCategory = document.getElementById("course-category");
const courseLevel = document.getElementById("course-level");

// -----------------------------
// 2) Vérification : ID valide ?
// -----------------------------
const course = courses.find(c => c.id == courseId);
if (!course) {
    document.body.innerHTML = "<h2>Erreur : cours introuvable.</h2>";
    throw new Error("Cours introuvable");
}

// -----------------------------
// 3) Gestion des chapitres
// -----------------------------
if (!course.chapters) {
    course.chapters = ["Introduction", "Contenu principal", "Conclusion"];
}

// -----------------------------
// 4) Progression locale
// -----------------------------
function getLocalProgress() {
    return JSON.parse(localStorage.getItem("progressData")) || { courses: {} };
}

function saveLocalProgress(data) {
    localStorage.setItem("progressData", JSON.stringify(data));
}

// Récupération progression initiale
let progressData = getLocalProgress();
let savedProgress = progressData.courses[courseId] || { chapter: 1, progress: 0 };
let currentChapter = savedProgress.chapter;

// -----------------------------
// 5) Injection des infos du cours
// -----------------------------
courseTitle.textContent = course.title;
courseDescription.textContent = course.description;
courseVideo.src = course.video;
courseCategory.textContent = `Catégorie : ${course.category}`;
courseLevel.textContent = `Niveau : ${course.level}`;

// -----------------------------
// 6) Fonction pour afficher les chapitres
// -----------------------------
function renderChapters() {
    chapterList.innerHTML = "";

    course.chapters.forEach((chapter, index) => {
        const li = document.createElement("li");
        li.textContent = chapter;
        li.dataset.index = index + 1;

        if ((index + 1) === currentChapter) {
            li.classList.add("active-chapter");
        }

        li.addEventListener("click", () => {
            currentChapter = index + 1;
            updateProgress();
            renderChapters();
        });

        chapterList.appendChild(li);
    });
}

renderChapters();

// -----------------------------
// 7) Synchronisation avec userProgress global
// -----------------------------
function syncWithGlobalProgress(courseId, chapter, totalChapters) {
    if (typeof window.updateCourseProgress === "function") {
        window.updateCourseProgress(courseId, chapter, totalChapters);
    } else {
        console.warn("updateCourseProgress() non disponible");
    }
}

// -----------------------------
// 8) Mise à jour progression
// -----------------------------
function updateProgress() {
    const totalChapters = course.chapters.length;
    const percent = Math.round((currentChapter / totalChapters) * 100);

    // Mise à jour barre locale
    progressBar.style.width = percent + "%";
    progressPercent.textContent = percent + "%";

    // Sauvegarde progression locale
    progressData.courses[courseId] = { chapter: currentChapter, progress: percent };
    saveLocalProgress(progressData);

    // Synchronisation avec userProgress global
    syncWithGlobalProgress(courseId, currentChapter, totalChapters);
}

// -----------------------------
// 9) Progression basée sur la vidéo
// -----------------------------
courseVideo.addEventListener("timeupdate", () => {
    const videoPercent = Math.round((courseVideo.currentTime / courseVideo.duration) * 100);

    // Mise à jour barre locale
    progressBar.style.width = videoPercent + "%";
    progressPercent.textContent = videoPercent + "%";

    // Si vidéo terminée
    if (videoPercent >= 100) {
        currentChapter = course.chapters.length;
        updateProgress();  // Met à jour la barre, sauvegarde et synchronisation
        renderChapters();  // Active le dernier chapitre
    }
});

// -----------------------------
// 10) Bouton : démarrer le quiz
// -----------------------------
if (startQuizBtn) {
    startQuizBtn.addEventListener("click", () => {
        window.location.href = `quiz.html?id=${courseId}`;
    });
}
