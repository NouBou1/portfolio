const TECH_ICONS = {
    html: "assets/icons/skills/html-logo.svg",
    css: "assets/icons/skills/css-logo.svg",
    javascript: "assets/icons/skills/javascript-icon.svg",
    firebase: "assets/icons/skills/firebase.svg",
    angular: "assets/icons/skills/angular.svg",
    typescript: "assets/icons/skills/typescript.svg",
    "rest api": "assets/icons/skills/rest-api.svg",
    capacitor: "assets/icons/skills/capacitor.svg",
};

export function initProjectsPreview() {
    const list = document.querySelector(".projects__list");
    const preview = document.querySelector(".projects__preview");
    const image = document.getElementById("projectsPreviewImage");
    if (!list || !preview || !image) return;

    const setPreview = createPreviewSetter(image, preview);
    const hidePreview = () => preview.classList.remove("is-visible");

    bindProjectPreviewLinks(list, preview, setPreview);
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

function positionPreview(list, preview, row) {
    const rowTop = row.getBoundingClientRect().top - list.getBoundingClientRect().top;
    const rowCenter = rowTop + row.offsetHeight / 2;
    const maxTop = Math.max(0, list.offsetHeight - preview.offsetHeight);
    const top = Math.min(Math.max(rowCenter - preview.offsetHeight / 2, 0), maxTop);
    preview.style.transform = `translateY(${top}px)`;
}

function bindProjectPreviewLinks(list, preview, setPreview) {
    const links = list.querySelectorAll(".project__link[data-preview]");
    links.forEach((link) => {
        const src = link.dataset.preview;
        const activate = () => {
            setPreview(src);
            positionPreview(list, preview, link);
        };
        link.addEventListener("mouseenter", activate);
        link.addEventListener("focus", activate);
    });
}

function bindProjectPreviewDismiss(list, hidePreview) {
    list.addEventListener("mouseleave", hidePreview);
    list.addEventListener("focusout", (event) => {
        if (!list.contains(event.relatedTarget)) hidePreview();
    });
}

export function initProjectModal() {
    const modal = document.getElementById("projectModal");
    const links = Array.from(document.querySelectorAll(".project__link[data-index]"));
    if (!modal || !links.length) return;

    const els = getProjectModalEls(modal);
    const projects = links.map(getProjectDataFromLink);
    const state = { currentIndex: 0 };
    const render = (i) => renderProjectModal(els, projects, state, i);

    bindProjectModalLinks(links, modal, render);
    bindProjectModalControls(modal, els, projects, state, render);
    document.addEventListener("languagechange", () => {
        if (modal.open) render(state.currentIndex);
    });
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
        descEn: link.dataset.desc,
        descDe: link.dataset.descDe,
        github: link.dataset.github,
        live: link.dataset.live,
        preview: link.dataset.preview,
        stack: link.querySelector(".project__stack").textContent.split("|").map((s) => s.trim()),
    };
}

function renderProjectModal(els, projects, state, i) {
    state.currentIndex = i;
    const project = projects[i];
    const lang = document.documentElement.lang || "en";

    els.index.textContent = project.index;
    els.title.textContent = project.title;
    els.desc.textContent = lang === "de" && project.descDe ? project.descDe : project.descEn;
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
            document.body.classList.add("has-modal-open");
        });
    });
}

function bindProjectModalControls(modal, els, projects, state, render) {
    els.next.addEventListener("click", () => render((state.currentIndex + 1) % projects.length));
    els.close.addEventListener("click", () => modal.close());
    modal.addEventListener("click", (event) => {
        if (event.target === modal) modal.close();
    });
    modal.addEventListener("close", () => document.body.classList.remove("has-modal-open"));
}
