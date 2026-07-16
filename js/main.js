document.addEventListener("DOMContentLoaded", () => {
    initLangToggle();
    initScrollIndicator();
});

function initLangToggle() {
    const buttons = document.querySelectorAll(".lang-toggle__btn");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            buttons.forEach((btn) => btn.classList.remove("is-active"));
            button.classList.add("is-active");
            document.documentElement.setAttribute("lang", button.dataset.lang);
        });
    });
}

function initScrollIndicator() {
    const indicator = document.querySelector(".scroll-indicator");
    if (!indicator) return;

    indicator.addEventListener("click", () => {
        const target = document.querySelector(indicator.dataset.scrollTarget);
        target?.scrollIntoView({ behavior: "smooth" });
    });
}
