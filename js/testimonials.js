import { translate } from "./i18n.js";

export function initTestimonialsCarousel() {
    const els = getTestimonialsEls();
    if (!els) return;

    const originals = Array.from(els.track.children);
    if (!originals.length) return;

    const cards = buildLoopedTrack(els.track, originals);
    const count = originals.length;
    const dots = createTestimonialDots(els.dotsEl, count);
    const state = { index: count + Math.floor((count - 1) / 2) };
    const update = (animate) => updateTestimonials(els, cards, dots, count, state, animate);
    const goTo = (target) => goToTestimonial(cards.length, count, state, target, update);

    bindTestimonialDots(dots, (slide) => goTo(nearestSlideIndex(state, count, slide)));
    bindTestimonialControls(els, state, goTo, update);
    bindTestimonialLoop(els, count, state, update);
    update(false);
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

function buildLoopedTrack(track, originals) {
    const before = document.createDocumentFragment();
    const after = document.createDocumentFragment();

    originals.forEach((card) => {
        before.appendChild(cloneTestimonial(card));
        after.appendChild(cloneTestimonial(card));
    });

    track.insertBefore(before, track.firstChild);
    track.appendChild(after);
    return Array.from(track.children);
}

function cloneTestimonial(card) {
    const clone = card.cloneNode(true);
    clone.classList.remove("is-active");
    clone.setAttribute("aria-hidden", "true");
    return clone;
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

function bindTestimonialDots(dots, goToSlide) {
    dots.forEach((dot, i) => dot.addEventListener("click", () => goToSlide(i)));
}

function updateTestimonials(els, cards, dots, count, state, animate) {
    const card = cards[state.index];
    const offset = els.viewport.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2);
    setTrackOffset(els.track, offset, animate);

    cards.forEach((c, i) => c.classList.toggle("is-active", i === state.index));
    dots.forEach((d, i) => d.classList.toggle("is-active", i === state.index % count));
}

function setTrackOffset(track, offset, animate) {
    if (animate) {
        track.style.transform = `translateX(${offset}px)`;
        return;
    }
    track.style.transition = "none";
    track.style.transform = `translateX(${offset}px)`;
    void track.offsetHeight;
    track.style.transition = "";
}

function goToTestimonial(total, count, state, target, update) {
    if (target < 0 || target >= total) {
        const shift = normalizedIndex(state.index, count) - state.index;
        state.index += shift;
        target += shift;
        update(false);
    }
    state.index = target;
    update(true);
}

function nearestSlideIndex(state, count, slide) {
    const candidates = [slide, count + slide, 2 * count + slide];
    return candidates.reduce((best, candidate) => (
        Math.abs(candidate - state.index) < Math.abs(best - state.index) ? candidate : best
    ));
}

function normalizedIndex(index, count) {
    return count + ((index - count) % count + count) % count;
}

function bindTestimonialLoop(els, count, state, update) {
    els.track.addEventListener("transitionend", (event) => {
        if (event.target !== els.track || event.propertyName !== "transform") return;

        const normalized = normalizedIndex(state.index, count);
        if (normalized === state.index) return;
        state.index = normalized;
        update(false);
    });
}

function bindTestimonialControls(els, state, goTo, update) {
    els.prevBtn.addEventListener("click", () => goTo(state.index - 1));
    els.nextBtn.addEventListener("click", () => goTo(state.index + 1));
    window.addEventListener("resize", () => update(false));
}
