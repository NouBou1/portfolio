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

function initProjectsPreview() {
    const list = document.querySelector(".projects__list");
    const preview = document.querySelector(".projects__preview");
    const image = document.getElementById("projectsPreviewImage");
    if (!list || !preview || !image) return;

    const links = list.querySelectorAll(".project__link[data-preview]");

    const setPreview = (src) => {
        if (image.getAttribute("src") !== src) {
            image.setAttribute("src", src);
        }
        preview.classList.add("is-visible");
    };

    const hidePreview = () => preview.classList.remove("is-visible");

    links.forEach((link) => {
        const src = link.dataset.preview;
        link.addEventListener("mouseenter", () => setPreview(src));
        link.addEventListener("focus", () => setPreview(src));
    });

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

    const indexEl = document.getElementById("projectModalIndex");
    const titleEl = document.getElementById("projectModalTitle");
    const descEl = document.getElementById("projectModalDesc");
    const stackEl = document.getElementById("projectModalStack");
    const imageEl = document.getElementById("projectModalImage");
    const githubEl = document.getElementById("projectModalGithub");
    const liveEl = document.getElementById("projectModalLive");
    const nextBtn = document.getElementById("projectModalNext");
    const closeBtn = modal.querySelector("[data-modal-close]");

    const projects = links.map((link) => ({
        index: link.dataset.index,
        title: link.querySelector(".project__name").firstChild.textContent.trim(),
        desc: link.dataset.desc,
        github: link.dataset.github,
        live: link.dataset.live,
        preview: link.dataset.preview,
        stack: link.querySelector(".project__stack").textContent.split("|").map((s) => s.trim()),
    }));

    let currentIndex = 0;

    const render = (i) => {
        currentIndex = i;
        const project = projects[i];

        indexEl.textContent = project.index;
        titleEl.textContent = project.title;
        descEl.textContent = project.desc;
        imageEl.setAttribute("src", project.preview);
        imageEl.setAttribute("alt", `${project.title} preview`);
        githubEl.setAttribute("href", project.github);
        liveEl.setAttribute("href", project.live);

        stackEl.innerHTML = "";
        project.stack.forEach((tech) => {
            const icon = TECH_ICONS[tech.toLowerCase()];
            const li = document.createElement("li");
            if (icon) {
                const iconEl = document.createElement("span");
                iconEl.className = "project-modal__stack-icon";
                iconEl.style.webkitMaskImage = `url(${icon})`;
                iconEl.style.maskImage = `url(${icon})`;
                li.appendChild(iconEl);
            }
            li.appendChild(document.createTextNode(tech));
            stackEl.appendChild(li);
        });
    };

    links.forEach((link, i) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            render(i);
            modal.showModal();
        });
    });

    nextBtn.addEventListener("click", () => render((currentIndex + 1) % projects.length));
    closeBtn.addEventListener("click", () => modal.close());

    modal.addEventListener("click", (event) => {
        if (event.target === modal) modal.close();
    });
}

function initTestimonialsCarousel() {
    const viewport = document.querySelector(".testimonials__viewport");
    const track = document.getElementById("testimonialsTrack");
    const dotsEl = document.getElementById("testimonialsDots");
    const prevBtn = document.getElementById("testimonialsPrev");
    const nextBtn = document.getElementById("testimonialsNext");
    if (!viewport || !track || !dotsEl || !prevBtn || !nextBtn) return;

    const cards = Array.from(track.children);
    let currentIndex = 0;

    cards.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "testimonials__dot";
        dot.setAttribute("aria-label", `Go to testimonial ${i + 1}`);
        dot.addEventListener("click", () => goTo(i));
        dotsEl.appendChild(dot);
    });
    const dots = Array.from(dotsEl.children);

    const update = () => {
        const card = cards[currentIndex];
        const offset = viewport.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2);
        track.style.transform = `translateX(${offset}px)`;

        cards.forEach((c, i) => c.classList.toggle("is-active", i === currentIndex));
        dots.forEach((d, i) => d.classList.toggle("is-active", i === currentIndex));
    };

    const goTo = (i) => {
        currentIndex = (i + cards.length) % cards.length;
        update();
    };

    prevBtn.addEventListener("click", () => goTo(currentIndex - 1));
    nextBtn.addEventListener("click", () => goTo(currentIndex + 1));
    window.addEventListener("resize", update);

    update();
}
