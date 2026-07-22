document.addEventListener("DOMContentLoaded", () => {
    initLangToggle();
    initScrollIndicator();
    initProjectsPreview();
    initProjectModal();
    initTestimonialsCarousel();
});

const TRANSLATIONS = {
    en: {
        navAbout: "About me",
        navSkills: "Skills",
        navProjects: "Projects",
        langToggleAria: "Language switch",
        role: "Frontend Developer",
        ctaCheckWork: "Check my work",
        ctaContactMe: "Contact me",
        ctaLetsTalk: "Let's Talk",
        scrollAria: "Scroll to next section",
        marqueeAvailable: "Available for remote work",
        marqueeBasedIn: "Based in Cologne",
        marqueeOpenToWork: "Open to work",
        aboutEyebrow: "Who I Am",
        aboutTitle: "About me",
        aboutText: "Aspiring Frontend Developer looking for my first junior role. As a former HVAC technician, I bring a strong background in technical systems and structured problem-solving. Right now, my main focus is on writing clean code and deepening my hands-on experience with modern web tools every day.",
        aboutItem1: "Based in Cologne, Germany — open to remote work.",
        aboutItem2: "Continuous learning — I dive into new technologies hands-on to consistently sharpen my stack.",
        aboutItem3: "Analytical approach — I systematically track down issues and implement logical, clean solutions.",
        skillsEyebrow: "Technologies",
        skillsTitle: "Skill Set",
        skillsText: "A quick look at the technologies and practices I work with day to day — from core web fundamentals to modern frameworks and workflows. I keep expanding this toolkit as new projects demand.",
        skillsSubtitle: 'You need <span class="skills__highlight">another skill?</span>',
        skillsMuted: "Feel free to contact me. I look forward to expanding on my previous knowledge.",
        skillGrowthLabel: "Growth mindset",
        skillGrowthTooltip: "I have a special interest in learning",
        projectsEyebrow: "Portfolio",
        projectsTitle: "Featured Projects",
        projectsIntro: "Explore a selection of my work here — interact with projects to see my skills in action.",
        modalLabel: "What is this project about?",
        modalGithub: "GitHub",
        modalLiveTest: "Live Test",
        modalNext: "Next project",
        modalCloseAria: "Close",
        testimonialsTitle: "What my colleagues say about me",
        testimonial1Text: "Noureddin has proven to be a reliable group partner. His technical skills and proactive approach were crucial to the success of our project.",
        testimonial1Author: "H.Janisch - Team Partner",
        testimonial2Text: "I had the good fortune of working with Noureddin in a group project at the Developer Akademie that involved a lot of effort. He always stayed calm, cool, and focused, and made sure our team was set up for success. He's super knowledgeable, easy to work with, and I'd happily work with him again given the chance.",
        testimonial2Author: "A. Fischer - Team Partner",
        testimonial3Text: "Our project benefited enormously from Noureddin's efficient way of working.",
        testimonial3Author: "T.Schulz - Frontend Developer",
        testimonialsPrevAria: "Previous testimonial",
        testimonialsNextAria: "Next testimonial",
        testimonialDotAria: "Go to testimonial {n}",
        contactEyebrow: "Contact me",
        contactTitle: "Let's work<br>together",
        contactSubtitle: "Got a problem to solve?",
        contactText: "Encourage people to contact you and describe what role you are interested in. Show that you will add value to their projects through your work.",
        contactCta: 'Need a Frontend developer? <a class="contact__link" href="#contactForm">Let\'s talk!</a>',
        formNameLabel: "What's your name?",
        formEmailLabel: "What's your email?",
        formMessageLabel: "How can I help you?",
        formNamePlaceholder: "Your name goes here",
        formEmailPlaceholder: "youremail@email.com",
        formMessagePlaceholder: "Hello Noureddin, I am interested in...",
        consentText: 'I\'ve read the <a class="contact__link" href="legal-notice.html">privacy policy</a> and agree to the processing of my data as outlined.',
        formSubmit: "Say Hello ;)",
        formSending: "Sending...",
        formSent: "Message sent!",
        formError: "Something went wrong",
        footerLocation: "Cologne, Germany",
        footerEmail: "Email",
        footerLegal: "Legal Notice",
    },
    de: {
        navAbout: "Über mich",
        navSkills: "Skills",
        navProjects: "Projekte",
        langToggleAria: "Sprachumschalter",
        role: "Frontend-Entwickler",
        ctaCheckWork: "Meine Arbeiten ansehen",
        ctaContactMe: "Kontaktiere mich",
        ctaLetsTalk: "Lass uns reden",
        scrollAria: "Zum nächsten Abschnitt scrollen",
        marqueeAvailable: "Verfügbar für Remote-Arbeit",
        marqueeBasedIn: "Ansässig in Köln",
        marqueeOpenToWork: "Offen für neue Herausforderungen",
        aboutEyebrow: "Wer ich bin",
        aboutTitle: "Über mich",
        aboutText: "Angehender Frontend-Entwickler auf der Suche nach meiner ersten Junior-Stelle. Als ehemaliger Anlagenmechaniker für Heizungs-, Klima- und Lüftungstechnik bringe ich einen soliden Hintergrund in technischen Systemen und strukturierter Problemlösung mit. Mein Fokus liegt aktuell darauf, sauberen Code zu schreiben und meine praktische Erfahrung mit modernen Web-Tools täglich zu vertiefen.",
        aboutItem1: "Ansässig in Köln, Deutschland — offen für Remote-Arbeit.",
        aboutItem2: "Kontinuierliches Lernen — ich eigne mir neue Technologien praxisnah an, um mein Stack stetig zu erweitern.",
        aboutItem3: "Analytischer Ansatz — ich gehe Fehlern systematisch auf den Grund und setze logische, saubere Lösungen um.",
        skillsEyebrow: "Technologien",
        skillsTitle: "Skill Set",
        skillsText: "Ein kurzer Überblick über die Technologien und Methoden, mit denen ich täglich arbeite — von den Grundlagen des Webs bis hin zu modernen Frameworks und Workflows. Dieses Toolkit erweitere ich stetig, je nach Anforderung neuer Projekte.",
        skillsSubtitle: 'Du brauchst <span class="skills__highlight">einen weiteren Skill?</span>',
        skillsMuted: "Kontaktiere mich gerne. Ich freue mich darauf, mein bisheriges Wissen weiter auszubauen.",
        skillGrowthLabel: "Wachstumsdenken",
        skillGrowthTooltip: "Ich habe ein besonderes Interesse am Lernen von",
        projectsEyebrow: "Portfolio",
        projectsTitle: "Ausgewählte Projekte",
        projectsIntro: "Entdecke hier eine Auswahl meiner Arbeiten — interagiere mit den Projekten, um meine Fähigkeiten in Aktion zu sehen.",
        modalLabel: "Worum geht es in diesem Projekt?",
        modalGithub: "GitHub",
        modalLiveTest: "Live-Test",
        modalNext: "Nächstes Projekt",
        modalCloseAria: "Schließen",
        testimonialsTitle: "Was meine Kollegen über mich sagen",
        testimonial1Text: "Noureddin hat sich als zuverlässiger Teampartner erwiesen. Seine technischen Fähigkeiten und sein proaktives Vorgehen waren entscheidend für den Erfolg unseres Projekts.",
        testimonial1Author: "H.Janisch - Teampartner",
        testimonial2Text: "Ich hatte das Glück, mit Noureddin in einem aufwendigen Gruppenprojekt an der Developer Akademie zusammenzuarbeiten. Er blieb stets ruhig, besonnen und fokussiert und sorgte dafür, dass unser Team für den Erfolg gerüstet war. Er ist super kompetent, angenehm in der Zusammenarbeit, und ich würde jederzeit wieder mit ihm arbeiten.",
        testimonial2Author: "A. Fischer - Teampartner",
        testimonial3Text: "Unser Projekt hat enorm von Noureddins effizienter Arbeitsweise profitiert.",
        testimonial3Author: "T.Schulz - Frontend-Entwickler:in",
        testimonialsPrevAria: "Vorheriges Testimonial",
        testimonialsNextAria: "Nächstes Testimonial",
        testimonialDotAria: "Zu Testimonial {n} wechseln",
        contactEyebrow: "Kontakt",
        contactTitle: "Lass uns<br>zusammenarbeiten",
        contactSubtitle: "Hast du ein Problem zu lösen?",
        contactText: "Ermutige Menschen, dich zu kontaktieren, und beschreibe, an welcher Rolle du interessiert bist. Zeige, dass du mit deiner Arbeit einen Mehrwert für ihre Projekte schaffst.",
        contactCta: 'Suchst du einen Frontend-Entwickler? <a class="contact__link" href="#contactForm">Lass uns reden!</a>',
        formNameLabel: "Wie heißt du?",
        formEmailLabel: "Wie lautet deine E-Mail-Adresse?",
        formMessageLabel: "Wie kann ich dir helfen?",
        formNamePlaceholder: "Dein Name",
        formEmailPlaceholder: "deine.email@beispiel.de",
        formMessagePlaceholder: "Hallo Noureddin, ich interessiere mich für...",
        consentText: 'Ich habe die <a class="contact__link" href="legal-notice.html">Datenschutzerklärung</a> gelesen und stimme der beschriebenen Verarbeitung meiner Daten zu.',
        formSubmit: "Hallo sagen ;)",
        formSending: "Wird gesendet...",
        formSent: "Nachricht gesendet!",
        formError: "Etwas ist schiefgelaufen",
        footerLocation: "Köln, Deutschland",
        footerEmail: "E-Mail",
        footerLegal: "Impressum",
    },
};

function translate(key) {
    const lang = document.documentElement.lang || "en";
    return TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.en[key];
}

function applyLanguage(lang) {
    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const value = TRANSLATIONS[lang]?.[el.dataset.i18n];
        if (value !== undefined) el.textContent = value;
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
        const value = TRANSLATIONS[lang]?.[el.dataset.i18nHtml];
        if (value !== undefined) el.innerHTML = value;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
        const value = TRANSLATIONS[lang]?.[el.dataset.i18nPlaceholder];
        if (value !== undefined) el.setAttribute("placeholder", value);
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
        const value = TRANSLATIONS[lang]?.[el.dataset.i18nAriaLabel];
        if (value !== undefined) el.setAttribute("aria-label", value);
    });

    document.dispatchEvent(new CustomEvent("languagechange", { detail: { lang } }));
}

function initLangToggle() {
    const buttons = document.querySelectorAll(".lang-toggle__btn");
    const initialLang = document.querySelector(".lang-toggle__btn.is-active")?.dataset.lang || "en";

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            activateLangButton(buttons, button);
            applyLanguage(button.dataset.lang);
        });
    });

    applyLanguage(initialLang);
}

function activateLangButton(buttons, button) {
    buttons.forEach((btn) => btn.classList.remove("is-active"));
    button.classList.add("is-active");
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
