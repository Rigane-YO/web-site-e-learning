// assets/js/courses.js

// S'assurer que 'courses' est disponible (depuis course.js)
const coursesContainer = document.getElementById("popular-courses");
const searchInput = document.getElementById("search-input");

// Fonction pour créer le HTML d'une carte de cours
function renderCourseCard(course) {
    return `
        <div class="category-card course-card" data-aos="fade-up">
            <img src="${course.image}" alt="${course.title}" class="course-img">
            <h3>${course.title}</h3>
            <p>Niveau : ${course.level}</p>
            <p>${course.description}</p>
            <a href="course-view.html?id=${course.id}" class="btn btn-primary">Voir le cours</a>
        </div>
    `;
}

// Affichage initial de tous les cours
function displayCourses(courseList) {
    coursesContainer.innerHTML = courseList.map(course => renderCourseCard(course)).join('');
    // Réinitialiser AOS après injection dynamique
    if (AOS) AOS.refresh();
}

// Recherche dynamique
searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(keyword) ||
        course.category.toLowerCase().includes(keyword) ||
        course.level.toLowerCase().includes(keyword)
    );
    displayCourses(filteredCourses);
});

// Affichage initial
displayCourses(courses);



// ===============================
// FILTRE PAR CATÉGORIE
// ===============================
const categoryButtons = document.querySelectorAll(".category-card");

categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const selectedCategory = btn.dataset.category;

        // Filtrer les cours selon la catégorie sélectionnée
        const filtered = courses.filter(course => course.category === selectedCategory);

        // Afficher les cours filtrés
        displayCourses(filtered);

        // Optionnel : style visuel du bouton actif
        categoryButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
    });
});
