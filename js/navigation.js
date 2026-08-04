import { translate } from "./i18n.js";

export function initMobileMenu() {
    const burger = document.getElementById("burger");
    const menu = document.getElementById("mobileMenu");
    if (!burger || !menu) return;

    const setOpen = (open) => setMobileMenuState(burger, menu, open);

    burger.addEventListener("click", () => setOpen(!menu.classList.contains("is-open")));
    menu.querySelectorAll(".mobile-menu__link").forEach((link) => {
        link.addEventListener("click", () => setOpen(false));
    });
    bindMobileMenuDismiss(burger, menu, setOpen);
}

function setMobileMenuState(burger, menu, open) {
    menu.classList.toggle("is-open", open);
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.dataset.i18nAriaLabel = open ? "menuCloseAria" : "menuOpenAria";
    burger.setAttribute("aria-label", translate(burger.dataset.i18nAriaLabel));
    document.body.classList.toggle("has-menu-open", open);
}

function bindMobileMenuDismiss(burger, menu, setOpen) {
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") setOpen(false);
    });
    document.addEventListener("click", (event) => {
        if (!menu.contains(event.target) && !burger.contains(event.target)) setOpen(false);
    });
    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) setOpen(false);
    });
}

export function initScrollIndicator() {
    const indicator = document.querySelector(".scroll-indicator");
    if (!indicator) return;

    indicator.addEventListener("click", () => {
        const target = document.querySelector(indicator.dataset.scrollTarget);
        target?.scrollIntoView({ behavior: "smooth" });
    });
}
