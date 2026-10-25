# Mikhael Adriel Pratama Gana — Personal Portfolio Website

[![Website](https://img.shields.io/badge/Website-mikhaeladrielpg.github.io-blue?style=flat-square&logo=github)](https://mikhaeladrielpg.github.io/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.3-7952B3?style=flat-square&logo=bootstrap)](https://getbootstrap.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

Source code for the personal portfolio website of **Mikhael Adriel Pratama Gana**, Software QA Automation Engineer / SDET and Backend Developer specializing in QA automation, backend systems, and CI/CD pipelines.

🌐 **Live Website:** [https://mikhaeladrielpg.github.io](https://mikhaeladrielpg.github.io/)

---

## 🚀 Key Features

* **Modern & Clean UI/UX:** Responsive portfolio layout built with Bootstrap 5.3.3 and custom modular CSS.
* **Dark / Light Mode:**
  * System preference detection (`prefers-color-scheme`).
  * Manual toggle button with persistent state stored in `localStorage`.
  * Pre-render script in `<head>` to prevent Flash of Unstyled Content (FOUC).
* **Interactive Components:** Modular ES6 JavaScript for expandable sections (*Show More / Show Less*), mobile navbar auto-close, and accessible UI interactions.
* **Accessibility & SEO First:**
  * Semantic HTML5 structure with ARIA attributes (`aria-expanded`, `aria-label`, `aria-pressed`).
  * OpenGraph and Twitter Card metadata for rich social previews.
  * Schema.org Structured Data (`JSON-LD`) for search engines.
  * Subresource Integrity (SRI) hashes applied to external CDN assets for supply chain security.

---

## 🛠️ Tech Stack

* **Markup:** HTML5 (Semantic, SEO & OpenGraph tags, JSON-LD)
* **Styling:** CSS3, [Bootstrap 5.3.3](https://getbootstrap.com/), [Bootstrap Icons 1.11.3](https://icons.getbootstrap.com/)
* **Typography:** Google Fonts (Plus Jakarta Sans, Inter)
* **Scripting:** Vanilla JavaScript (ES Modules: `config.js`, `theme.js`, `toggle.js`, `main.js`)
* **Hosting:** GitHub Pages

---

## 📁 Project Structure

```text
mikhaeladrielpg.github.io/
├── css/
│   └── style.css          # Modular CSS and custom styling tokens
├── js/
│   ├── config.js          # Centralized configuration & constants
│   ├── theme.js           # Dark/Light theme manager & event listeners
│   ├── toggle.js          # Content visibility toggle logic
│   └── main.js            # Main application bootstrap and entrypoint
├── img/                   # Image assets (avatar, project previews, certifications)
├── index.html             # Primary single-page portfolio layout
├── robots.txt             # Search engine crawler directives
├── sitemap.xml            # XML sitemap for SEO indexing
└── README.md              # Project documentation
```

---

## 💻 Local Development

Since this is a lightweight static website, you do not need to install complex dependencies or build tooling.

### 1. Clone the repository
```bash
git clone https://github.com/mikhaeladrielpg/mikhaeladrielpg.github.io.git
cd mikhaeladrielpg.github.io
```

### 2. Run locally

You can use any local HTTP server (required for ES Modules to load without CORS issues):

Using **Python 3**:
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

Using **VS Code**:
Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension and click **"Go Live"**.

Using **Node.js (`npx serve`)**:
```bash
npx serve .
```

---

## 🔒 Security & Best Practices

* **CDN Integrity (SRI):** All CDN assets (Bootstrap CSS & JS) use SHA-384 cryptographic integrity hashes to prevent tampering.
* **Safe External Links:** All external links include `target="_blank"` with `rel="noopener noreferrer"` to prevent reverse tabnabbing vulnerabilities.
* **No Server Footprint:** Pure static architecture hosted on GitHub Pages ensures no exposure to server-side injection vectors.

---

## 📬 Connect

* **Website:** [mikhaeladrielpg.github.io](https://mikhaeladrielpg.github.io)
* **LinkedIn:** [linkedin.com/in/mikhaeladriel](https://linkedin.com/in/mikhaeladriel)
* **GitHub:** [@mikhaeladrielpg](https://github.com/mikhaeladrielpg)
* **Email:** [mikhael.adriel.pratama.gana@gmail.com](mailto:mikhael.adriel.pratama.gana@gmail.com)
