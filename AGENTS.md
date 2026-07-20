# Repository Guidelines

## Project Structure & Module Organization

This repository is a static portfolio built with HTML, CSS, and vanilla JavaScript. `index.html` contains the page structure and content. Keep shared presentation rules in `css/style.css`, interactive behavior in `js/main.js`, and project-card data in `js/projects.js`. Store general site assets in `images/`, project thumbnails in `images/projects/`, and chart exports in `images/charts/`. Files under `images/projects/unused/` are retained references and should not be linked from the live site without review.

## Build, Test, and Development Commands

There is no dependency installation or compilation step. Serve the repository locally so relative paths behave like production:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`. A direct browser open of `index.html` is acceptable for quick content checks. Use `git diff --check` before committing to catch whitespace errors, and review `git status --short` to ensure only intended files are included. Deployment is static; changes merged or pushed to `main` are published through GitHub Pages using the custom domain in `CNAME`.

## Coding Style & Naming Conventions

Follow the existing two-space indentation in HTML, CSS, and JavaScript. Use semantic HTML, single-quoted JavaScript strings, `const`/`let`, and trailing semicolons. CSS class names use lowercase kebab-case (for example, `.project-card`); JavaScript variables and functions use camelCase. Reuse the custom properties at the top of `css/style.css` instead of duplicating colors, fonts, spacing, or transitions. Give project entries unique kebab-case `id` values and valid `finance`, `data`, or `film` categories. Prefer optimized WebP images and descriptive alt text.

## Testing Guidelines

No automated test framework or coverage target is configured. Test affected flows manually in current Chrome, Firefox, Safari, or Edge at desktop and mobile widths (notably 1024, 720, and 480 px). Verify project filters, card keyboard activation, modal focus trapping and Escape dismissal, navigation, external links, image loading, and visible focus states. Check the browser console for errors and preserve WCAG AA contrast.

## Commit & Pull Request Guidelines

Recent commits use short, imperative, outcome-focused subjects, such as `Update FP&A experience and consulting positioning` or `Bug audit: ... fixes`. Keep each commit scoped to one coherent change. Pull requests should explain the user-facing result, identify files or sections changed, list manual checks performed, and link related issues. Include before/after screenshots for layout, content presentation, or responsive changes. Do not commit private notes, credentials, or personal data; `.private/` remains local-only.
