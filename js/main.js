import { initLangToggle } from "./i18n.js";
import { initMobileMenu, initScrollIndicator, initScrollSpy, initHeaderScrollState } from "./navigation.js";
import { initProjectsPreview, initProjectModal } from "./projects.js";
import { initTestimonialsCarousel } from "./testimonials.js";
import { initScrollReveal } from "./reveal.js";

document.addEventListener("DOMContentLoaded", () => {
    initLangToggle();
    initMobileMenu();
    initScrollIndicator();
    initScrollSpy();
    initHeaderScrollState();
    initProjectsPreview();
    initProjectModal();
    initTestimonialsCarousel();
    initScrollReveal();
});
