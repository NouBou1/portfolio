import { registerTranslations } from "./i18n.js";

const PRIVACY_TRANSLATIONS = {
    en: {
        privacyTitle: "Privacy Policy",

        privacyControllerTitle: "Controller",
        privacyControllerText: "The controller responsible for the processing of personal data on this website is:",
        privacyControllerName: "Noureddin Boussaada",
        privacyControllerStreet: "Ordensstr. 19",
        privacyControllerCity: "50129 Bergheim, Germany",
        privacyControllerMail: 'Email: <a href="mailto:n.boussaada92@gmail.com">n.boussaada92@gmail.com</a>',

        privacyHostingTitle: "Hosting and server log files",
        privacyHostingText1: "This website is hosted by <strong>ALL-INKL.COM — Neue Medien Münnich</strong>, Hauptstraße 68, 02742 Friedersdorf, Germany. The provider processes personal data on my behalf on the basis of a data processing agreement pursuant to Art. 28 GDPR.",
        privacyHostingText2: "Every time this website is accessed, the web server automatically records information in log files: your IP address, the date and time of the request, the page requested, the referrer URL, browser type and version, and your operating system. This data is required for the technically secure and stable delivery of the website and is processed on the basis of my legitimate interest pursuant to Art. 6(1)(f) GDPR. It is not merged with other data sources and is deleted after a short retention period.",

        privacyTlsTitle: "TLS encryption",
        privacyTlsText: "All connections to this website are TLS encrypted. Requests made over HTTP are automatically redirected to HTTPS. You can recognise an encrypted connection by the \"https://\" prefix in your browser's address bar.",

        privacyFormTitle: "Contact form",
        privacyFormText1: "If you use the contact form, the name, email address and message you enter are transmitted to my server and forwarded from there to my email inbox. The data is not stored in a database and is not passed on to any third party beyond the hosting and email provider named above.",
        privacyFormText2: "Processing is based on your consent pursuant to Art. 6(1)(a) GDPR, which you give by ticking the consent box, and — where your enquiry concerns a potential working relationship — on Art. 6(1)(b) GDPR. You may withdraw your consent at any time with effect for the future; the lawfulness of the processing carried out up to that point remains unaffected. I keep your enquiry until it has been dealt with in full and any statutory retention periods have expired.",

        privacyContactTitle: "Contact by email and social networks",
        privacyContactText: "If you contact me by email or through the profiles linked on this website, the details you provide are processed solely for the purpose of handling your enquiry. The legal basis is Art. 6(1)(f) GDPR or, in the case of a potential working relationship, Art. 6(1)(b) GDPR.",

        privacyStorageTitle: "Cookies and local storage",
        privacyStorageText: "This website does not set any cookies and does not use tracking, analytics or advertising tools. The only information stored on your device is the language you select (EN/DE), saved in your browser's local storage under the key <strong>portfolio-lang</strong>. It is strictly necessary to provide the function you requested (§ 25(2) No. 2 TDDDG), contains no personal data, and can be deleted at any time via your browser settings.",

        privacyFontsTitle: "Fonts and external content",
        privacyFontsText: "All fonts, icons and images are hosted locally on my own server. Visiting this website establishes no connection to external providers such as Google Fonts or a content delivery network, so no data is transferred to third parties.",

        privacyLinksTitle: "External links",
        privacyLinksText: "This website links to external sites such as GitHub, LinkedIn and the live demos of my projects. As soon as you follow such a link, the operator of the target site receives your IP address. I have no influence on how those providers process your data; their own privacy policies apply.",

        privacyRightsTitle: "Your rights",
        privacyRightsText: "Under the GDPR you have the following rights regarding your personal data:",
        privacyRight1: "Right of access to the data stored about you (Art. 15 GDPR)",
        privacyRight2: "Right to rectification of inaccurate data (Art. 16 GDPR)",
        privacyRight3: "Right to erasure (Art. 17 GDPR)",
        privacyRight4: "Right to restriction of processing (Art. 18 GDPR)",
        privacyRight5: "Right to data portability (Art. 20 GDPR)",
        privacyRight6: "Right to object to processing (Art. 21 GDPR)",
        privacyRight7: "Right to withdraw consent at any time (Art. 7(3) GDPR)",

        privacyComplaintTitle: "Right to lodge a complaint",
        privacyComplaintText: "If you believe that the processing of your data infringes data protection law, you have the right to lodge a complaint with a supervisory authority. The authority responsible for me is:",
        privacyAuthorityName: "Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen",
        privacyAuthorityStreet: "Kavalleriestr. 2–4",
        privacyAuthorityCity: "40213 Düsseldorf, Germany",

        privacyChangesTitle: "Changes to this privacy policy",
        privacyChangesText: "I update this privacy policy whenever changes to this website or to the legal situation make it necessary. The version published here always applies.",

        privacyQuestions: 'For any questions about data protection, please contact me at <a href="mailto:n.boussaada92@gmail.com">n.boussaada92@gmail.com</a>.',
        privacyDate: "Date: August 6, 2026",
        privacyBackAria: "Back to the homepage",
    },

    de: {
        privacyTitle: "Datenschutzerklärung",

        privacyControllerTitle: "Verantwortlicher",
        privacyControllerText: "Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website ist:",
        privacyControllerName: "Noureddin Boussaada",
        privacyControllerStreet: "Ordensstr. 19",
        privacyControllerCity: "50129 Bergheim, Deutschland",
        privacyControllerMail: 'E-Mail: <a href="mailto:n.boussaada92@gmail.com">n.boussaada92@gmail.com</a>',

        privacyHostingTitle: "Hosting und Server-Logfiles",
        privacyHostingText1: "Diese Website wird gehostet bei <strong>ALL-INKL.COM — Neue Medien Münnich</strong>, Hauptstraße 68, 02742 Friedersdorf, Deutschland. Der Anbieter verarbeitet personenbezogene Daten in meinem Auftrag auf Grundlage eines Auftragsverarbeitungsvertrags gemäß Art. 28 DSGVO.",
        privacyHostingText2: "Bei jedem Aufruf dieser Website erfasst der Webserver automatisch Informationen in Logfiles: Ihre IP-Adresse, Datum und Uhrzeit der Anfrage, die aufgerufene Seite, die Referrer-URL, Browsertyp und -version sowie Ihr Betriebssystem. Diese Daten sind für den technisch sicheren und stabilen Betrieb der Website erforderlich und werden auf Grundlage meines berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO verarbeitet. Sie werden nicht mit anderen Datenquellen zusammengeführt und nach kurzer Speicherdauer gelöscht.",

        privacyTlsTitle: "TLS-Verschlüsselung",
        privacyTlsText: "Sämtliche Verbindungen zu dieser Website sind TLS-verschlüsselt. Aufrufe über HTTP werden automatisch auf HTTPS umgeleitet. Eine verschlüsselte Verbindung erkennen Sie am Präfix „https://“ in der Adresszeile Ihres Browsers.",

        privacyFormTitle: "Kontaktformular",
        privacyFormText1: "Wenn Sie das Kontaktformular nutzen, werden die von Ihnen eingegebenen Daten — Name, E-Mail-Adresse und Nachricht — an meinen Server übermittelt und von dort an mein E-Mail-Postfach weitergeleitet. Eine Speicherung in einer Datenbank findet nicht statt. Eine Weitergabe an Dritte über den oben genannten Hosting- und E-Mail-Anbieter hinaus erfolgt nicht.",
        privacyFormText2: "Die Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO, die Sie durch das Setzen des Häkchens erteilen, sowie — soweit Ihre Anfrage eine mögliche Zusammenarbeit betrifft — auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO. Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen; die Rechtmäßigkeit der bis dahin erfolgten Verarbeitung bleibt davon unberührt. Ihre Anfrage bewahre ich auf, bis sie vollständig bearbeitet ist und etwaige gesetzliche Aufbewahrungsfristen abgelaufen sind.",

        privacyContactTitle: "Kontaktaufnahme per E-Mail und über soziale Netzwerke",
        privacyContactText: "Wenn Sie mich per E-Mail oder über die auf dieser Website verlinkten Profile kontaktieren, werden Ihre Angaben ausschließlich zur Bearbeitung Ihrer Anfrage verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO bzw. bei Anbahnung einer Zusammenarbeit Art. 6 Abs. 1 lit. b DSGVO.",

        privacyStorageTitle: "Cookies und lokale Speicherung",
        privacyStorageText: "Diese Website setzt keine Cookies und verwendet keine Tracking-, Analyse- oder Werbe-Tools. Auf Ihrem Endgerät wird lediglich die von Ihnen gewählte Sprache (EN/DE) im Local Storage Ihres Browsers unter dem Schlüssel <strong>portfolio-lang</strong> gespeichert. Sie ist für die von Ihnen gewünschte Funktion unbedingt erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG), enthält keine personenbezogenen Daten und kann jederzeit über Ihre Browsereinstellungen gelöscht werden.",

        privacyFontsTitle: "Schriften und externe Inhalte",
        privacyFontsText: "Sämtliche Schriften, Icons und Bilder werden lokal auf meinem eigenen Server gehostet. Beim Besuch dieser Website wird keine Verbindung zu externen Anbietern wie Google Fonts oder einem Content Delivery Network aufgebaut, es werden also keine Daten an Dritte übertragen.",

        privacyLinksTitle: "Externe Links",
        privacyLinksText: "Diese Website verlinkt auf externe Seiten wie GitHub, LinkedIn und die Live-Demos meiner Projekte. Sobald Sie einem solchen Link folgen, erhält der Betreiber der Zielseite Ihre IP-Adresse. Auf die Datenverarbeitung dieser Anbieter habe ich keinen Einfluss; es gelten deren eigene Datenschutzerklärungen.",

        privacyRightsTitle: "Ihre Rechte",
        privacyRightsText: "Nach der DSGVO stehen Ihnen bezüglich Ihrer personenbezogenen Daten folgende Rechte zu:",
        privacyRight1: "Recht auf Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO)",
        privacyRight2: "Recht auf Berichtigung unrichtiger Daten (Art. 16 DSGVO)",
        privacyRight3: "Recht auf Löschung (Art. 17 DSGVO)",
        privacyRight4: "Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)",
        privacyRight5: "Recht auf Datenübertragbarkeit (Art. 20 DSGVO)",
        privacyRight6: "Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)",
        privacyRight7: "Recht auf jederzeitigen Widerruf einer erteilten Einwilligung (Art. 7 Abs. 3 DSGVO)",

        privacyComplaintTitle: "Beschwerderecht bei der Aufsichtsbehörde",
        privacyComplaintText: "Sind Sie der Ansicht, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt, haben Sie das Recht, sich bei einer Aufsichtsbehörde zu beschweren. Die für mich zuständige Behörde ist:",
        privacyAuthorityName: "Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen",
        privacyAuthorityStreet: "Kavalleriestr. 2–4",
        privacyAuthorityCity: "40213 Düsseldorf, Deutschland",

        privacyChangesTitle: "Änderungen dieser Datenschutzerklärung",
        privacyChangesText: "Ich passe diese Datenschutzerklärung an, sobald Änderungen an dieser Website oder der Rechtslage dies erforderlich machen. Es gilt jeweils die hier veröffentlichte Fassung.",

        privacyQuestions: 'Bei Fragen zum Datenschutz erreichen Sie mich unter <a href="mailto:n.boussaada92@gmail.com">n.boussaada92@gmail.com</a>.',
        privacyDate: "Stand: 6. August 2026",
        privacyBackAria: "Zurück zur Startseite",
    },
};

registerTranslations(PRIVACY_TRANSLATIONS);
