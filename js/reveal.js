const REVEAL_GROUPS = [
    { selector: ".about__media, .about__content" },
    { selector: ".skills__inner > .section__eyebrow, .skills__card" },
    { selector: ".skill", stagger: true },
    { selector: ".projects__header" },
    { selector: ".project", stagger: true },
    { selector: ".projects__preview" },
    { selector: ".testimonials__header, .testimonials__carousel" },
    { selector: ".contact__intro, .contact__form" },
];

export function initScrollReveal() {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = collectRevealTargets();
    if (!targets.length) return;

    document.documentElement.classList.add("has-reveal");
    targets.forEach((el) => el.classList.add("reveal"));

    const observer = new IntersectionObserver(onReveal, {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.15,
    });
    targets.forEach((el) => observer.observe(el));
}

function collectRevealTargets() {
    const targets = [];

    REVEAL_GROUPS.forEach((group) => {
        const els = Array.from(document.querySelectorAll(group.selector));
        els.forEach((el, i) => {
            if (group.stagger) el.style.setProperty("--reveal-index", i);
            targets.push(el);
        });
    });

    return targets;
}

function onReveal(entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            return;
        }
        setRevealDirection(entry);
        entry.target.classList.remove("is-revealed");
    });
}

function setRevealDirection(entry) {
    const entersFromBottom = entry.boundingClientRect.top > 0;
    entry.target.style.setProperty("--reveal-from", entersFromBottom ? "28px" : "-28px");
}
