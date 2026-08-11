# Portfolio — Noureddin Boussaada

Personal portfolio website of Noureddin Boussaada, Frontend Developer based in Cologne, Germany.
Built from scratch with vanilla HTML, CSS and JavaScript — no framework, no build step.

**Live:** [n-boussaada.de](https://n-boussaada.de)

## Features

- **Bilingual (EN / DE)** — language toggle powered by a custom `data-i18n` translation layer
- **Project showcase** — hover previews on desktop and a `<dialog>` based detail modal with GitHub / live links
- **Testimonials carousel** — quotes from project partners
- **Contact form** — sends mail through a small PHP endpoint, with client-side validation
- **Responsive & accessible** — mobile menu, keyboard-operable components, ARIA labels
- **Self-hosted fonts** — Karla & Fira Code as variable WOFF2, no external requests

## Tech stack

HTML5 · CSS3 (custom properties, Flexbox, Grid) · JavaScript (ES Modules) · PHP (contact endpoint) · Apache `.htaccess` (HTTPS redirect)

## Project structure

```
├── index.html            # Single-page site
├── legal-notice.html     # Impressum / legal notice
├── css/                  # One stylesheet per section + reset, variables, fonts
├── js/
│   ├── main.js           # Entry point, initialises all modules
│   ├── i18n.js           # Translations & language toggle
│   ├── navigation.js     # Mobile menu, scroll indicator
│   ├── projects.js       # Project preview & modal
│   ├── testimonials.js   # Carousel
│   └── components/       # Contact form
├── php/contact.php       # Mail endpoint for the contact form
└── assets/               # Fonts, icons, images
```

## Getting started

The site uses ES modules, so it needs to be served over HTTP — opening `index.html` directly from the file system will not work.

```bash
git clone https://github.com/NouBou1/portfolio.git
cd portfolio

# Any static server works, e.g.:
python -m http.server 8000
```

Then open <http://localhost:8000>.

To test the contact form locally you need PHP, since `php/contact.php` handles the submission:

```bash
php -S localhost:8000
```

Sender and recipient address are configured at the top of [php/contact.php](php/contact.php).

## Featured projects

| Project | Stack |
| --- | --- |
| [Join](https://join.n-boussaada.de) — Kanban style task manager with drag & drop | JavaScript, HTML, CSS, Firebase |
| [El Pollo Loco](https://el-pollo-loco.n-boussaada.de) — object-oriented jump, run & throw game | HTML, CSS, JavaScript |
| [Pokédex](https://pokedex.n-boussaada.de) — Pokémon browser built on the PokéAPI | HTML, CSS, JavaScript, REST API |

## Contact

[LinkedIn](https://www.linkedin.com/in/noureddin-boussaada/) · [GitHub](https://github.com/NouBou1)
