// assets/js/data/quiz-data.js

const quizQuestions = [
    // 🔹 Cours 1 : Développement Web
    {
        id: 1,
        courseId: 1,
        question: "Quelle balise HTML est utilisée pour créer un lien hypertexte ?",
        choices: ["<link>", "<a>", "<href>", "<url>"],
        answer: "<a>"
    },
    {
        id: 2,
        courseId: 1,
        question: "Quel attribut est obligatoire pour une balise <img> ?",
        choices: ["src", "href", "alt", "title"],
        answer: "src"
    },

    // 🔹 Cours 2 : Data Science
    {
        id: 3,
        courseId: 2,
        question: "Quel langage est le plus utilisé en Data Science ?",
        choices: ["Java", "Python", "C++", "PHP"],
        answer: "Python"
    },
    {
        id: 4,
        courseId: 2,
        question: "Quel format de fichier est utilisé pour stocker des DataFrames ?",
        choices: ["MP4", "CSV", "JPG", "EXE"],
        answer: "CSV"
    },

    // 🔹 Cours 3 : Design
    {
        id: 5,
        courseId: 3,
        question: "Quel logiciel est le plus utilisé en design graphique ?",
        choices: ["Photoshop", "Excel", "Premiere Pro", "Chrome"],
        answer: "Photoshop"
    },
    {
        id: 6,
        courseId: 3,
        question: "Quel élément est essentiel dans une charte graphique ?",
        choices: ["Le code source", "Les polices", "Les API", "Les drivers"],
        answer: "Les polices"
    },

    // 🔹 Cours 4 : Marketing Digital
    {
        id: 7,
        courseId: 4,
        question: "Quel réseau social est le plus utilisé pour le marketing ?",
        choices: ["LinkedIn", "TikTok", "Facebook", "Snapchat"],
        answer: "Facebook"
    },
    {
        id: 8,
        courseId: 4,
        question: "Quel terme signifie l’optimisation pour les moteurs de recherche ?",
        choices: ["SEM", "API", "DNS", "SEO"],
        answer: "SEO"
    }
];

// (optionnel)
export { quizQuestions };
