/* =======================================================
   quiz.js — Gestion des quiz
======================================================= */

// 1️⃣ Récupération ID du cours depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const courseId = parseInt(urlParams.get("id"));

// 2️⃣ Sélecteurs DOM
const quizContainer = document.getElementById("quiz-container");
const quizResult = document.getElementById("quiz-result");
const scoreText = document.getElementById("score-text");
const retryBtn = document.getElementById("retry-btn");

// 3️⃣ Vérifier si l'ID est manquant
if (!courseId) {
    quizContainer.innerHTML = `
        <div class="quiz-error">
            <h3>⚠️ Quiz introuvable</h3>
            <p>Aucun cours sélectionné.<br>Pour lancer un quiz, retournez sur un cours.</p>
            <a href="courses.html" class="btn btn-primary">Voir les cours</a>
        </div>
    `;
    throw new Error("Aucun courseId trouvé dans l'URL");
}

// 4️⃣ Filtrer les questions selon le cours
const courseQuestions = quizQuestions.filter(q => q.courseId === courseId);

// Aucun quiz pour ce cours ?
if (!courseQuestions.length) {
    quizContainer.innerHTML = `
        <div class="quiz-error">
            <h3>😕 Pas de questions pour ce cours</h3>
            <p>Le quiz n’est pas encore disponible.</p>
            <a href="courses.html" class="btn btn-primary">Retour</a>
        </div>
    `;
    throw new Error("Aucune question trouvée pour ce courseId");
}

// 5️⃣ Variables quiz
let currentQuestionIndex = 0;
let score = 0;

// 6️⃣ Afficher une question
function showQuestion() {
    // Fin du quiz
    if (currentQuestionIndex >= courseQuestions.length) {
        showResult();
        return;
    }

    const questionObj = courseQuestions[currentQuestionIndex];

    // Injecter HTML de base
    quizContainer.innerHTML = `
        <div class="quiz-question">
            <h3>Question ${currentQuestionIndex + 1} / ${courseQuestions.length}</h3>
            <p class="question-text"></p>
            <div class="quiz-choices"></div>
        </div>
    `;

    // Texte de la question
    quizContainer.querySelector(".question-text").textContent = questionObj.question;

    // Boutons pour les choix
    const choicesContainer = quizContainer.querySelector(".quiz-choices");
    questionObj.choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.classList.add("quiz-choice", "btn");
        btn.dataset.choice = choice;
        btn.textContent = choice;
        choicesContainer.appendChild(btn);

        btn.addEventListener("click", () => {
            if (choice === questionObj.answer) {
                score++;
                btn.classList.add("correct");
            } else {
                btn.classList.add("wrong");
            }

            setTimeout(() => {
                currentQuestionIndex++;
                showQuestion();
            }, 400);
        });
    });
}

// 7️⃣ Afficher le résultat
function showResult() {
    quizContainer.style.display = "none";
    quizResult.style.display = "block";

    const percent = Math.round((score / courseQuestions.length) * 100);
    scoreText.textContent = `Vous avez obtenu ${score} / ${courseQuestions.length} (${percent}%)`;

    // 🔥 Sauvegarde du meilleur score dans userProgress
    if (typeof window.updateBestQuizScore === "function") {
        window.updateBestQuizScore(percent);
    } else {
        console.warn("updateBestQuizScore() n'est pas défini. Vérifiez progress.js");
    }

    // 🔗 Optionnel : marquer le cours comme terminé si score >= 50%
    if (typeof window.updateCourseProgress === "function") {
        if (percent >= 50) {
            const course = courses.find(c => c.id === courseId);
            if (course) {
                window.updateCourseProgress(courseId, course.chapters.length, course.chapters.length);
            }
        }
    }
}

// 8️⃣ Recommencer le quiz
retryBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;

    quizContainer.style.display = "block";
    quizResult.style.display = "none";
    showQuestion();
});

// 9️⃣ Lancer le quiz
showQuestion();
