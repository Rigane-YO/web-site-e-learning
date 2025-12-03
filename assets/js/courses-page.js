// assets/js/courses-page.js

document.addEventListener("DOMContentLoaded", () => {

    const coursesContainer = document.getElementById("courses-container");
    const searchInput = document.getElementById("search-input");
    const filterCategory = document.getElementById("filter-category");
    const filterLevel = document.getElementById("filter-level");

    if (!coursesContainer) return; // Sécurité

    // Fonction de création d'une carte de cours
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

    // Afficher une liste de cours
    function displayCourses(list) {
        coursesContainer.innerHTML = list.map(renderCourseCard).join("");

        if (AOS) AOS.refresh();
    }

    // Affichage initial
    displayCourses(courses);


    // -------------------------
    // FONCTION DE FILTRAGE
    // -------------------------
    function filterCourses() {
        let filtered = courses;

        // Recherche texte
        if (searchInput && searchInput.value.trim() !== "") {
            const keyword = searchInput.value.toLowerCase();

            filtered = filtered.filter(course =>
                course.title.toLowerCase().includes(keyword) ||
                course.category.toLowerCase().includes(keyword) ||
                course.level.toLowerCase().includes(keyword)
            );
        }

        // Filtre catégorie
        if (filterCategory && filterCategory.value !== "") {
            filtered = filtered.filter(course =>
                course.category === filterCategory.value
            );
        }

        // Filtre niveau
        if (filterLevel && filterLevel.value !== "") {
            filtered = filtered.filter(course =>
                course.level === filterLevel.value
            );
        }

        displayCourses(filtered);
    }


    // -------------------------
    // ÉVÈNEMENTS
    // -------------------------
    if (searchInput)
        searchInput.addEventListener("input", filterCourses);

    if (filterCategory)
        filterCategory.addEventListener("change", filterCourses);

    if (filterLevel)
        filterLevel.addEventListener("change", filterCourses);

});
