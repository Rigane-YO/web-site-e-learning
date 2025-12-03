// assets/js/data/course.js
// Base locale des cours pour la plateforme e-learning

const courses = [
    {
        id: 1,
        title: "Développement Web pour Débutants",
        category: "Développement Web",
        level: "Débutant",
        image: "assets/img/courses/web-dev.jpg",
        description: "Apprenez les bases du HTML, CSS et JavaScript pour créer vos premières pages web.",
        video: "assets/video/web-dev-intro.mp4"
    },
    {
        id: 2,
        title: "Data Science avec Python",
        category: "Data Science",
        level: "Intermédiaire",
        image: "assets/img/courses/data-science.jpg",
        description: "Découvrez l'analyse de données et les fondamentaux de la Data Science avec Python.",
        video: "assets/video/data-science.mp4"
    },
    {
        id: 3,
        title: "Design Graphique pour Débutants",
        category: "Design",
        level: "Débutant",
        image: "assets/img/courses/design.jpg",
        description: "Apprenez les principes du design graphique et comment utiliser les outils de création visuelle.",
        video: "assets/video/design.mp4"
    },
    {
        id: 4,
        title: "Marketing Digital",
        category: "Marketing",
        level: "Intermédiaire",
        image: "assets/img/courses/marketing.jpg",
        description: "Maîtrisez les stratégies de marketing digital et les réseaux sociaux pour booster votre business.",
        video: "assets/video/marketing.mp4"
    },
    {
        id: 5,
        title: "JavaScript Avancé",
        category: "Développement Web",
        level: "Avancé",
        image: "assets/img/courses/javascript.jpg",
        description: "Approfondissez vos connaissances en JavaScript et créez des applications web interactives.",
        video: "assets/video/javascript-avance.mp4"
    },
    {
        id: 6,
        title: "Machine Learning pour Débutants",
        category: "Data Science",
        level: "Débutant",
        image: "assets/img/courses/machine-learning.jpg",
        description: "Introduction aux concepts de Machine Learning et aux algorithmes simples avec Python.",
        video: "assets/video/machine-learning.mp4"
    }
];

// Export pour pouvoir utiliser cette variable dans d'autres scripts si nécessaire
// (si vous utilisez ES Modules, sinon vous pouvez simplement inclure ce fichier avant courses.js)
