const themeButton = document.getElementById("theme-toggle");
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
    themeButton.textContent = "☀️";
}
themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    document.body.classList.contains("dark-theme")
        ? (themeButton.textContent = "☀️", localStorage.setItem("theme", "dark"))
        : (themeButton.textContent = "🌙", localStorage.setItem("theme", "light"));
});