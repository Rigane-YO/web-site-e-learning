/* =======================================================
   progress.js — Version centralisée
   Gestion complète de la progression des cours et quiz
======================================================= */

// ---------------------------------------------
// 1. Chargement et sauvegarde
// ---------------------------------------------
function getUserProgress() {
    return JSON.parse(localStorage.getItem("userProgress")) || {
        courses: {},      // ex: { 1: { chapter: 2, progress: 40, totalChapters: 3 } }
        bestScore: 0
    };
}

function saveUserProgress(data) {
    localStorage.setItem("userProgress", JSON.stringify(data));
}

// ---------------------------------------------
// 2. Mise à jour progression d’un cours
// ---------------------------------------------
function updateCourseProgress(courseId, chapter, totalChapters) {
    const progressData = getUserProgress();
    const percent = Math.round((chapter / totalChapters) * 100);

    progressData.courses[courseId] = {
        chapter,
        totalChapters,
        progress: percent
    };

    saveUserProgress(progressData);
}

// ---------------------------------------------
// 3. Mise à jour meilleur score quiz
// ---------------------------------------------
function updateBestQuizScore(score) {
    const progressData = getUserProgress();
    if (score > progressData.bestScore) {
        progressData.bestScore = score;
        saveUserProgress(progressData);
    }
}

// ---------------------------------------------
// 4. Affichage sur profile.html
// ---------------------------------------------
function renderProfileProgress() {
    const progressData = getUserProgress();
    const totalCourses = Object.keys(progressData.courses).length;
    const coursesContainer = document.getElementById("course-progress-list");

    const totalCoursesElement = document.getElementById("total-courses");
    const bestScoreElement = document.getElementById("best-score");
    const globalProgressElement = document.getElementById("global-progress");
    const globalProgressPercent = document.getElementById("progress-percent");

    if (totalCoursesElement) totalCoursesElement.textContent = totalCourses;
    if (bestScoreElement) bestScoreElement.textContent = progressData.bestScore + "%";

    // Calcul progression globale
    let global = 0;
    if (totalCourses > 0) {
        Object.values(progressData.courses).forEach(c => global += c.progress);
        global = Math.round(global / totalCourses);
    }
    if (globalProgressElement) globalProgressElement.style.width = global + "%";
    if (globalProgressPercent) globalProgressPercent.textContent = global + "%";

    // Liste détaillée des cours suivis
    if (coursesContainer) {
        coursesContainer.innerHTML = "";
        Object.entries(progressData.courses).forEach(([courseId, data]) => {
            const course = courses.find(c => c.id == courseId);
            if (!course) return;
            const card = document.createElement("div");
            card.classList.add("course-progress-card");
            card.innerHTML = `
                <h4>${course.title}</h4>
                <p>Chapitre : ${data.chapter}/${data.totalChapters}</p>
                <div class="progress-bar">
                    <div class="progress" style="width:${data.progress}%"></div>
                </div>
                <p class="percent">${data.progress}%</p>
            `;
            coursesContainer.appendChild(card);
        });
    }
}

// ---------------------------------------------
// 5. Initialisation page course-view
// ---------------------------------------------
function initCourseView(courseId) {
    const course = courses.find(c => c.id == courseId);
    if (!course) {
        console.error("Cours introuvable :", courseId);
        return;
    }

    // Sélecteurs
    const courseTitle = document.getElementById("course-title");
    const courseDescription = document.getElementById("course-description");
    const courseVideo = document.getElementById("course-video");
    const chapterList = document.getElementById("chapter-list");
    const progressBar = document.getElementById("course-progress");
    const progressPercent = document.getElementById("progress-percent");

    // Injection infos
    courseTitle.textContent = course.title;
    courseDescription.textContent = course.description;
    courseVideo.src = course.video;
    document.getElementById("course-category").textContent = `Catégorie : ${course.category}`;
    document.getElementById("course-level").textContent = `Niveau : ${course.level}`;

    // Chapitres par défaut
    if (!course.chapters) course.chapters = ["Introduction", "Contenu principal", "Conclusion"];

    // Récupération progression
    const progressData = getUserProgress();
    let savedProgress = progressData.courses[courseId] || { chapter: 1, progress: 0, totalChapters: course.chapters.length };
    let currentChapter = savedProgress.chapter;

    function renderChapters() {
        chapterList.innerHTML = "";
        course.chapters.forEach((chapter, index) => {
            const li = document.createElement("li");
            li.textContent = chapter;
            li.dataset.index = index + 1;
            if ((index + 1) === currentChapter) li.classList.add("active-chapter");

            li.addEventListener("click", () => {
                currentChapter = index + 1;
                updateProgress();
                renderChapters();
            });

            chapterList.appendChild(li);
        });
    }

    function updateProgress() {
        const totalChapters = course.chapters.length;
        const percent = Math.round((currentChapter / totalChapters) * 100);
        progressBar.style.width = percent + "%";
        progressPercent.textContent = percent + "%";
        updateCourseProgress(courseId, currentChapter, totalChapters);
    }

    renderChapters();

    // Progression vidéo
    courseVideo.addEventListener("timeupdate", () => {
        const videoPercent = Math.round((courseVideo.currentTime / courseVideo.duration) * 100);
        progressBar.style.width = videoPercent + "%";
        progressPercent.textContent = videoPercent + "%";

        if (videoPercent >= 100) {
            currentChapter = course.chapters.length;
            updateProgress();
        }
    });

    // Démarrer quiz
    const startQuizBtn = document.getElementById("start-quiz-btn");
    if (startQuizBtn) {
        startQuizBtn.addEventListener("click", () => {
            window.location.href = `quiz.html?id=${courseId}`;
        });
    }
}

// ---------------------------------------------
// 6. Auto-render profile.html
// ---------------------------------------------
if (window.location.pathname.includes("profile.html")) {
    document.addEventListener("DOMContentLoaded", renderProfileProgress);
}

// ---------------------------------------------
// 7. Export global pour quiz et course-view
// ---------------------------------------------
window.updateCourseProgress = updateCourseProgress;
window.updateBestQuizScore = updateBestQuizScore;
window.initCourseView = initCourseView;
window.renderProfileProgress = renderProfileProgress;



// ---------------------------------------------
// Réinitialiser la progression de l'utilisateur
// ---------------------------------------------
function resetUserProgress() {
    const initialData = {
        courses: {},   // plus aucun cours suivi
        bestScore: 0   // si tu veux remettre le quiz aussi à zéro
    };
    localStorage.setItem("userProgress", JSON.stringify(initialData));
    renderProfileProgress();  // met à jour l'affichage immédiatement
}
