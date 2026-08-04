import { initLangToggle } from "./i18n.js";
import { initMobileMenu, initScrollIndicator } from "./navigation.js";
import { initProjectsPreview, initProjectModal } from "./projects.js";
import { initTestimonialsCarousel } from "./testimonials.js";

document.addEventListener("DOMContentLoaded", () => {
    initLangToggle();
    initMobileMenu();
    initScrollIndicator();
    initProjectsPreview();
    initProjectModal();
    initTestimonialsCarousel();
});
