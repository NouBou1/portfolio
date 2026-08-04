import { translate } from "./i18n.js";

export function initTestimonialsCarousel() {
    const els = getTestimonialsEls();
    if (!els) return;

    const cards = Array.from(els.track.children);
    const dots = createTestimonialDots(els.dotsEl, cards.length);
    const state = { currentIndex: Math.floor((cards.length - 1) / 2) };
    const update = () => updateTestimonials(els, cards, dots, state);
    const goTo = (i) => goToTestimonial(cards.length, state, i, update);

    bindTestimonialDots(dots, goTo);
    bindTestimonialControls(els, state, goTo, update);
    update();
}

function getTestimonialsEls() {
    const viewport = document.querySelector(".testimonials__viewport");
    const track = document.getElementById("testimonialsTrack");
    const dotsEl = document.getElementById("testimonialsDots");
    const prevBtn = document.getElementById("testimonialsPrev");
    const nextBtn = document.getElementById("testimonialsNext");
    if (!viewport || !track || !dotsEl || !prevBtn || !nextBtn) return null;
    return { viewport, track, dotsEl, prevBtn, nextBtn };
}

function createTestimonialDots(dotsEl, count) {
    for (let i = 0; i < count; i++) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "testimonials__dot";
        dotsEl.appendChild(dot);
    }
    const dots = Array.from(dotsEl.children);
    updateTestimonialDotLabels(dots);
    document.addEventListener("languagechange", () => updateTestimonialDotLabels(dots));
    return dots;
}

function updateTestimonialDotLabels(dots) {
    dots.forEach((dot, i) => {
        dot.setAttribute("aria-label", translate("testimonialDotAria").replace("{n}", i + 1));
    });
}

function bindTestimonialDots(dots, goTo) {
    dots.forEach((dot, i) => dot.addEventListener("click", () => goTo(i)));
}

function updateTestimonials(els, cards, dots, state) {
    const card = cards[state.currentIndex];
    const offset = els.viewport.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2);
    els.track.style.transform = `translateX(${offset}px)`;

    cards.forEach((c, i) => c.classList.toggle("is-active", i === state.currentIndex));
    dots.forEach((d, i) => d.classList.toggle("is-active", i === state.currentIndex));
}

function goToTestimonial(count, state, i, update) {
    state.currentIndex = (i + count) % count;
    update();
}

function bindTestimonialControls(els, state, goTo, update) {
    els.prevBtn.addEventListener("click", () => goTo(state.currentIndex - 1));
    els.nextBtn.addEventListener("click", () => goTo(state.currentIndex + 1));
    window.addEventListener("resize", update);
}
