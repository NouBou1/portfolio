const LANG_STORAGE_KEY = "portfolio-lang";

const TRANSLATIONS = {
    en: {
        navAbout: "About me",
        navSkills: "Skills",
        navProjects: "Projects",
        langToggleAria: "Language switch",
        menuOpenAria: "Open menu",
        menuCloseAria: "Close menu",
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
        testimonial1Text: "I had the pleasure of collaborating with Noureddin on two projects: Kochwelt, a simple recipe website, and Join, a Kanban board for project management. For Kochwelt, he developed the recipe and start pages. For Join, he was primarily responsible for the contact page – logic, styling, and the login area animations. Noureddin is a reliable partner. When problems arise, he helps immediately and always has good tips ready. He's curious and enjoys experimenting with new technologies – which makes collaboration exciting and pushes you forward.",
        testimonial1Author: "M.Tausch - Team Partner",
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
        formErrorName: "Please enter a valid name",
        formErrorEmail: "Please enter a valid email address",
        formErrorMessage: "Please enter a message of at least 10 characters",
        formErrorConsent: "Please accept the privacy policy",
        footerLocation: "Cologne, Germany",
        footerEmail: "Email",
        footerLegal: "Legal Notice",
    },
    de: {
        navAbout: "Über mich",
        navSkills: "Skills",
        navProjects: "Projekte",
        langToggleAria: "Sprachumschalter",
        menuOpenAria: "Menü öffnen",
        menuCloseAria: "Menü schließen",
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
        testimonial1Text: "Mit Noureddin habe ich an zwei Projekten zusammengearbeitet: Kochwelt, eine kleine Rezept-Webseite, und Join, einem Kanban-Board für Projektmanagement. Bei Kochwelt hat er die Rezept- und Startseite entwickelt. Bei Join war er hauptsächlich für die Kontakt-Seite zuständig – Logik, Styling und die Animationen im Login-Bereich. Noureddin ist ein zuverlässiger Partner. Wenn es Probleme gibt, hilft er sofort und hat immer gute Tipps parat. Er ist neugierig und experimentiert gerne mit neuen Technologien – das macht die Zusammenarbeit spannend und bringt einen selbst voran.",
        testimonial1Author: "M.Tausch - Teampartner",
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
        formErrorName: "Bitte geben Sie einen gültigen Namen ein",
        formErrorEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
        formErrorMessage: "Bitte geben Sie eine Nachricht mit mindestens 10 Zeichen ein",
        formErrorConsent: "Bitte akzeptieren Sie die Datenschutzerklärung",
        footerLocation: "Köln, Deutschland",
        footerEmail: "E-Mail",
        footerLegal: "Impressum",
    },
};

// Lets page specific modules (e.g. the legal notice) add their own strings to
// the shared dictionary before the toggle is initialised.
export function registerTranslations(translations) {
    Object.entries(translations).forEach(([lang, strings]) => {
        if (TRANSLATIONS[lang]) Object.assign(TRANSLATIONS[lang], strings);
    });
}

export function translate(key) {
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

function selectLanguage(buttons, lang) {
    buttons.forEach((btn) => btn.classList.toggle("is-active", btn.dataset.lang === lang));
    applyLanguage(lang);
}

function readStoredLang() {
    try {
        const stored = localStorage.getItem(LANG_STORAGE_KEY);
        return TRANSLATIONS[stored] ? stored : null;
    } catch {
        // Storage can be blocked (private mode, cookie settings) — fall back to the default language.
        return null;
    }
}

function storeLang(lang) {
    try {
        localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
        // Remembering the choice is a nice-to-have, so a failed write must not break the toggle.
    }
}

export function initLangToggle() {
    const buttons = document.querySelectorAll(".lang-toggle__btn");
    const defaultLang = document.querySelector(".lang-toggle__btn.is-active")?.dataset.lang || "en";

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            selectLanguage(buttons, button.dataset.lang);
            storeLang(button.dataset.lang);
        });
    });

    selectLanguage(buttons, readStoredLang() || defaultLang);
}
