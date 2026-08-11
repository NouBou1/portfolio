import { translate } from "./i18n.js";

const DRAG_INTENT = 8;
const DRAG_COMMIT_MAX = 80;
const DRAG_COMMIT_RATIO = 0.25;

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
    bindTestimonialDrag(els, cards, state, goTo, update);
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
    setTrackOffset(els.track, trackOffset(els.viewport, cards[state.index]), animate);

    cards.forEach((c, i) => c.classList.toggle("is-active", i === state.index));
    dots.forEach((d, i) => d.classList.toggle("is-active", i === state.index % count));
}

function trackOffset(viewport, card) {
    return viewport.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2);
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

function bindTestimonialDrag(els, cards, state, goTo, update) {
    const drag = { pointerId: null, startX: 0, startY: 0, base: 0, width: 0, active: false };
    const finish = (event) => endTestimonialDrag(els, drag, event, state, goTo, update);

    els.viewport.addEventListener("pointerdown", (event) => startTestimonialDrag(els, cards, state, drag, event));
    els.viewport.addEventListener("pointermove", (event) => moveTestimonialDrag(els, drag, event));
    els.viewport.addEventListener("pointerup", finish);
    els.viewport.addEventListener("pointercancel", finish);
}

function startTestimonialDrag(els, cards, state, drag, event) {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const card = cards[state.index];
    drag.pointerId = event.pointerId;
    drag.startX = event.clientX;
    drag.startY = event.clientY;
    drag.base = trackOffset(els.viewport, card);
    drag.width = card.offsetWidth;
    drag.active = false;
}

function moveTestimonialDrag(els, drag, event) {
    if (event.pointerId !== drag.pointerId) return;

    const dx = event.clientX - drag.startX;
    if (!drag.active && !hasDragIntent(dx, event.clientY - drag.startY)) return;

    if (!drag.active) {
        drag.active = true;
        els.viewport.setPointerCapture(drag.pointerId);
        els.track.classList.add("is-dragging");
    }
    els.track.style.transform = `translateX(${drag.base + dx}px)`;
}

function hasDragIntent(dx, dy) {
    return Math.abs(dx) >= DRAG_INTENT && Math.abs(dx) > Math.abs(dy);
}

function endTestimonialDrag(els, drag, event, state, goTo, update) {
    if (event.pointerId !== drag.pointerId) return;

    const dx = event.clientX - drag.startX;
    const wasActive = drag.active;
    drag.pointerId = null;
    drag.active = false;
    els.track.classList.remove("is-dragging");
    if (!wasActive) return;

    const commit = Math.min(DRAG_COMMIT_MAX, drag.width * DRAG_COMMIT_RATIO);
    if (Math.abs(dx) < commit) {
        update(true);
        return;
    }
    goTo(state.index + (dx < 0 ? 1 : -1));
}
