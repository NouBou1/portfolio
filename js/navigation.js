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

export function initHeaderScrollState() {
    const header = document.querySelector(".header");
    if (!header) return;

    const update = () => header.classList.toggle("is-scrolled", window.scrollY > 24);

    update();
    window.addEventListener("scroll", update, { passive: true });
}

export function initScrollSpy() {
    if (!("IntersectionObserver" in window)) return;

    const links = Array.from(document.querySelectorAll(".nav__link, .mobile-menu__link"));
    const sections = collectSpySections(links);
    if (!sections.length) return;

    const visible = new Set();
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) visible.add(entry.target);
            else visible.delete(entry.target);
        });
        setActiveSpyLink(links, sections, visible);
    }, { rootMargin: "-45% 0px -45% 0px" });

    sections.forEach((section) => observer.observe(section));
}

function collectSpySections(links) {
    const seen = new Set();
    const sections = [];

    links.forEach((link) => {
        const id = link.hash.slice(1);
        const section = id && !seen.has(id) ? document.getElementById(id) : null;
        if (!section) return;
        seen.add(id);
        sections.push(section);
    });

    return sections;
}

function setActiveSpyLink(links, sections, visible) {
    const active = sections.find((section) => visible.has(section));
    links.forEach((link) => {
        const isActive = Boolean(active) && link.hash === `#${active.id}`;
        link.classList.toggle("is-active", isActive);
        if (isActive) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
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
