document.addEventListener("DOMContentLoaded", () => {
    initLangToggle();
    initScrollIndicator();
    initProjectsPreview();
    initProjectModal();
    initTestimonialsCarousel();
});

function initLangToggle() {
    const buttons = document.querySelectorAll(".lang-toggle__btn");
    buttons.forEach((button) => {
        button.addEventListener("click", () => activateLangButton(buttons, button));
    });
}

function activateLangButton(buttons, button) {
    buttons.forEach((btn) => btn.classList.remove("is-active"));
    button.classList.add("is-active");
    document.documentElement.setAttribute("lang", button.dataset.lang);
}

function initScrollIndicator() {
    const indicator = document.querySelector(".scroll-indicator");
    if (!indicator) return;

    indicator.addEventListener("click", () => {
        const target = document.querySelector(indicator.dataset.scrollTarget);
        target?.scrollIntoView({ behavior: "smooth" });
    });
}

function initProjectsPreview() {
    const list = document.querySelector(".projects__list");
    const preview = document.querySelector(".projects__preview");
    const image = document.getElementById("projectsPreviewImage");
    if (!list || !preview || !image) return;

    const setPreview = createPreviewSetter(image, preview);
    const hidePreview = () => preview.classList.remove("is-visible");

    bindProjectPreviewLinks(list, setPreview);
    bindProjectPreviewDismiss(list, hidePreview);
}

function createPreviewSetter(image, preview) {
    return (src) => {
        if (image.getAttribute("src") !== src) {
            image.setAttribute("src", src);
        }
        preview.classList.add("is-visible");
    };
}

function bindProjectPreviewLinks(list, setPreview) {
    const links = list.querySelectorAll(".project__link[data-preview]");
    links.forEach((link) => {
        const src = link.dataset.preview;
        link.addEventListener("mouseenter", () => setPreview(src));
        link.addEventListener("focus", () => setPreview(src));
    });
}

function bindProjectPreviewDismiss(list, hidePreview) {
    list.addEventListener("mouseleave", hidePreview);
    list.addEventListener("focusout", (event) => {
        if (!list.contains(event.relatedTarget)) hidePreview();
    });
}

const TECH_ICONS = {
    html: "assets/icons/skills/html-logo.svg",
    css: "assets/icons/skills/css-logo.svg",
    javascript: "assets/icons/skills/javascript-icon.svg",
    firebase: "assets/icons/skills/firebase.svg",
    angular: "assets/icons/skills/angular.svg",
    typescript: "assets/icons/skills/typescript.svg",
};

function initProjectModal() {
    const modal = document.getElementById("projectModal");
    const links = Array.from(document.querySelectorAll(".project__link[data-index]"));
    if (!modal || !links.length) return;

    const els = getProjectModalEls(modal);
    const projects = links.map(getProjectDataFromLink);
    const state = { currentIndex: 0 };
    const render = (i) => renderProjectModal(els, projects, state, i);

    bindProjectModalLinks(links, modal, render);
    bindProjectModalControls(modal, els, projects, state, render);
}

function getProjectModalEls(modal) {
    return {
        index: document.getElementById("projectModalIndex"),
        title: document.getElementById("projectModalTitle"),
        desc: document.getElementById("projectModalDesc"),
        stack: document.getElementById("projectModalStack"),
        image: document.getElementById("projectModalImage"),
        github: document.getElementById("projectModalGithub"),
        live: document.getElementById("projectModalLive"),
        next: document.getElementById("projectModalNext"),
        close: modal.querySelector("[data-modal-close]"),
    };
}

function getProjectDataFromLink(link) {
    return {
        index: link.dataset.index,
        title: link.querySelector(".project__name").firstChild.textContent.trim(),
        desc: link.dataset.desc,
        github: link.dataset.github,
        live: link.dataset.live,
        preview: link.dataset.preview,
        stack: link.querySelector(".project__stack").textContent.split("|").map((s) => s.trim()),
    };
}

function renderProjectModal(els, projects, state, i) {
    state.currentIndex = i;
    const project = projects[i];

    els.index.textContent = project.index;
    els.title.textContent = project.title;
    els.desc.textContent = project.desc;
    els.image.setAttribute("src", project.preview);
    els.image.setAttribute("alt", `${project.title} preview`);
    els.github.setAttribute("href", project.github);
    els.live.setAttribute("href", project.live);

    renderProjectModalStack(els.stack, project.stack);
}

function renderProjectModalStack(stackEl, stack) {
    stackEl.innerHTML = "";
    stack.forEach((tech) => {
        const icon = TECH_ICONS[tech.toLowerCase()];
        const li = document.createElement("li");
        if (icon) li.appendChild(createStackIcon(icon));
        li.appendChild(document.createTextNode(tech));
        stackEl.appendChild(li);
    });
}

function createStackIcon(icon) {
    const iconEl = document.createElement("span");
    iconEl.className = "project-modal__stack-icon";
    iconEl.style.webkitMaskImage = `url(${icon})`;
    iconEl.style.maskImage = `url(${icon})`;
    return iconEl;
}

function bindProjectModalLinks(links, modal, render) {
    links.forEach((link, i) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            render(i);
            modal.showModal();
        });
    });
}

function bindProjectModalControls(modal, els, projects, state, render) {
    els.next.addEventListener("click", () => render((state.currentIndex + 1) % projects.length));
    els.close.addEventListener("click", () => modal.close());
    modal.addEventListener("click", (event) => {
        if (event.target === modal) modal.close();
    });
}

function initTestimonialsCarousel() {
    const els = getTestimonialsEls();
    if (!els) return;

    const cards = Array.from(els.track.children);
    const dots = createTestimonialDots(els.dotsEl, cards.length);
    const state = { currentIndex: 0 };
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
        dot.setAttribute("aria-label", `Go to testimonial ${i + 1}`);
        dotsEl.appendChild(dot);
    }
    return Array.from(dotsEl.children);
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
