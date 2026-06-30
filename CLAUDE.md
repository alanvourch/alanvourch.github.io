# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **static portfolio website** for Alan Vourc'h, an FP&A professional. Built with vanilla HTML/CSS/JavaScript (no frameworks, no build process). Deployed via GitHub Pages to `alanvourch.com`.

**Tech stack:**
- Pure HTML5, CSS3, Vanilla JavaScript
- Google Fonts: Plus Jakarta Sans (nav logo, weight 700), Inter (body), Playfair Display (headings/hero)
- No npm, no build tools, no transpilation
- Direct deployment: `git push` to `main` → live on GitHub Pages

## Development Workflow

**Local development:**
1. Edit HTML/CSS/JS files directly
2. Open `index.html` in browser to test
3. Commit and push to deploy

**Deployment:**
- Push to `main` branch → auto-deployed to GitHub Pages
- Custom domain configured via `CNAME` file (alanvourch.com)
- No build step, no CI/CD pipeline

**Git workflow:**
- Main branch: `main`
- Active v2 branch: `claude/notion-portfolio-access-3l6if8`
- Create PRs targeting `main`

**Vercel preview (v2 only):**
- Preview URL: `https://alan-portfolio-preview-sigma.vercel.app` (private, robots.txt blocks crawlers)
- Deploy command: `vercel deploy --prod --yes` (must use `--prod` to update the stable alias)
- ⚠️ **CRITICAL:** `robots.txt` at repo root blocks all crawlers. DELETE it before merging to `main`, or alanvourch.com will be deindexed by Google.

## Architecture & File Structure

**Core files:**
- `index.html` — Main portfolio page (1000+ lines)
- `resume-en.html` / `resume-fr.html` — Standalone resume pages
- `css/style.css` — All styles in one monolithic file (~1080 lines)
- `js/main.js` — Interactive behavior (~150 lines)
- `js/projects.js` — Project data array (~275 lines, 15 projects)

**Key sections in index.html:**
1. **Navigation** — Fixed nav with hamburger menu (mobile)
2. **Hero** — CTA section with photo, tags, resume links
3. **About** — 3-card grid layout (Finance depth, Data fluency, AI fluency)
4. **Skills** — 3-column skill groups
5. **Projects** — Filterable grid (tabs: All, Finance, Data, Film) — Finance tab active by default
6. **Experience** — Timeline layout (work history + education)
7. **Contact** — 3-column link cards (Email, LinkedIn, GitHub) + resume downloads

**Project filtering system:**
- Projects stored as object array in `js/projects.js`
- Each project: `{ id, category, title, shortDesc, fullDesc, highlights[], skills[], thumb, hover, link, linkLabel }`
- Categories: `finance`, `data`, `film`
- Tab-based filtering in UI, instant re-render on click
- Modal system for detailed project view

## CSS Architecture

**Structure:**
- CSS custom properties for theming (colors, spacing, shadows, transitions)
- Color scheme:
  - Primary: Navy (`#1a2744`), Navy Light (`#243460`)
  - Accent: Amber (`#c9922a`), Amber Light (`#e8b84b`)
  - Neutrals: white, off-white, grays
- Responsive breakpoints: `1024px`, `720px`, `480px`
- Mobile-first approach with progressive enhancement

**Key patterns:**
- Reusable button/card components
- Flexbox and grid layouts throughout
- CSS transitions for hover states
- Backdrop filters and shadows for depth

## JavaScript Behavior

**main.js responsibilities:**
1. **Navigation**: Scroll shadow effect, mobile hamburger toggle, auto-close on link click
2. **Project filtering**: Render cards based on active tab (All/Finance/Data/Film)
3. **Modal system**: Click card → open modal with full details, close on ESC/overlay click, body scroll lock
4. **Film note**: Show/hide contextual note when Film tab is active
5. **Mobile enhancements**: Touch device detection, card flip animation on tap

**Event handling:**
- Keyboard accessibility: Enter/Space to open project modals
- Passive scroll listeners for performance
- Touch event handling for mobile flip animations

## Content Management

**Adding/editing projects:**
1. Edit `js/projects.js`
2. Add new object to `projects` array with required fields:
   - `id` (unique string)
   - `category` (finance/data/film)
   - `title`, `shortDesc`, `fullDesc`
   - `highlights` (array of bullet points, optional)
   - `skills` (array of skill tags)
   - `thumb`, `hover` (image paths)
   - `link`, `linkLabel`
3. Add project images to `images/projects/`
4. No rebuild required — refresh browser to see changes

**Updating resume:**
- Edit `resume-en.html` or `resume-fr.html` directly
- These are standalone HTML files with inline styles
- Update both versions when changing structure

## Notion Integration

The portfolio has Notion workspace integration via MCP (Model Context Protocol):
- Configuration: `.vscode/mcp.json`
- Endpoint: `https://mcp.notion.com/mcp`
- Use for content management, todo tracking, project tracking
- Notion page: "Alan Vourc'h Portfolio" contains todo list for portfolio updates

## Image Assets

**Organization:**
- `images/alan.jpg` — Hero photo
- `images/background.webp` — Gradient backgrounds
- `images/favicon.png` — Site icon
- `images/projects/` — Project thumbnails and hover images
- `images/charts/` — Embedded charts (Tableau/Power BI screenshots)

**Optimization:**
- Use `.webp` format when possible for smaller file sizes
- Lazy loading enabled: `<img loading="lazy">`
- Include both `thumb` and `hover` images for project cards

## Responsive Design

**Breakpoints:**
- Desktop: default (>1024px)
- Tablet: 1024px
- Mobile landscape: 720px
- Mobile portrait: 480px

**Mobile considerations:**
- Hamburger menu for navigation
- Touch-optimized tap-to-flip on project cards
- Hero photo hidden on small screens
- Single-column layouts below 720px
- Font size adjustments for readability

## Accessibility

- Semantic HTML throughout (`<nav>`, `<section>`, `<article>`)
- ARIA labels on interactive elements (`aria-label`, `role="button"`)
- Keyboard navigation: Tab, Enter, Space, Escape
- Focus management in modals (auto-focus close button)
- Color contrast meets WCAG AA standards
- Alt text on all images

## Bilingual Content

The portfolio supports English and French:
- Main page (index.html): English
- Resume links: Both EN and FR versions
- Some hero content includes French characters (e.g., Société Générale, Montréal)
- Use proper HTML entities for accents: `&eacute;` for é, `&euro;` for €

## Version Control

**Backup strategy:**
- Timestamped snapshots in dated folders (e.g., `28.02.2026/`)
- Includes full copy of HTML/CSS/JS from that version
- Useful for reverting major changes or comparing iterations

**Git practices:**
- `.gitignore` excludes `.private/` folder (interview prep, personal notes)
- `.vscode/` and `.claude/` tracked for editor consistency
- Recent commits show iterative refinement (bug fixes, mobile improvements, content updates)

## Common Modifications

**Change color scheme:**
Edit CSS custom properties at top of `css/style.css`:
```css
--navy: #1a2744;
--amber: #c9922a;
/* etc. */
```

**Add new section:**
1. Add `<section>` in `index.html` after existing sections
2. Update nav links if needed
3. Add corresponding styles in `css/style.css`
4. Follow existing BEM-like naming: `.section`, `.section-header`, `.section-title`

**Modify fonts:**
1. Update Google Fonts link in `<head>`
2. Change font-family in CSS custom properties:
   ```css
   --font-body: 'Inter', sans-serif;
   --font-heading: 'Playfair Display', serif;
   ```

**Update hero content:**
Edit lines 33-66 in `index.html` — change title, subtitle, tags, CTAs, resume links.

## External Links & Embeds

Projects link to various platforms:
- **Power BI**: Embedded dashboards (iframe)
- **Tableau**: Public visualizations (iframe)
- **Notion**: Business case documents
- **Kaggle**: Notebooks and datasets
- **Medium**: Blog articles
- **GitHub**: Code repositories
- **Vercel**: Deployed applications (e.g., MovieMate)

When adding project links, use `target="_blank"` and `rel="noopener"` for security.

## Performance Considerations

- No framework overhead (vanilla JS)
- Minimal HTTP requests (one CSS, two JS files)
- Lazy-loaded images below the fold
- Passive event listeners for scroll
- Static deployment (no server-side processing)
- Optimized image formats (webp)

## Browser Support

Targets modern browsers (Chrome, Firefox, Safari, Edge):
- CSS Grid and Flexbox
- CSS custom properties
- ES6 JavaScript (const/let, arrow functions, template literals)
- Lazy loading attributes
- No polyfills included

## Portfolio Content Strategy

**Positioning (v2):**
- "FP&A modernisé" — owns the full financial planning cycle, drives business decisions, partners with CFO and executive teams, builds scalable processes
- Data skills (SQL, Python, Power BI, AI) are framed as tools in service of the FP&A function — not the main identity
- Target: FP&A Manager / Finance Manager roles, ideally at scale-ups, PE-backed companies, SaaS/fintech, mid-cap international groups
- CFO track long-term aspiration

**Key credentials to keep prominent:**
- Head of FP&A title (Auditoire, TBWA Group) — direct CFO/CEO reporting
- CFA Level 3 candidate (Private Markets pathway)
- Société Générale IB division — cost consolidation, NOT direct CFO reporting (financial direction + investor relations)
- 7+ years FP&A

**Writing rules (enforced in v2):**
- No em dashes (—) — AI writing signal
- No "I build X that Y" structure
- No "Experienced in", "Up to date on", "The emphasis was on"
- Always frame data skills as serving finance outcomes, not standalone

**Geographic context:**
- Based in Montréal since early 2026 (Working Holiday Visa until 2028)
- Tag: "Work-authorized in Canada (until 2028)"
- Open to on-site and remote FP&A/Finance Manager roles
- Bilingual (French native, English fluent)

**Timeline structure (v2):**
- Jan 2026–Present: Freelance FP&A & Data Analytics | Montréal
- Jun 2023–Jan 2026: Freelance FP&A Consultant | Paris
- Nov 2020–Jun 2023: Head of FP&A | Auditoire (TBWA Group)
- Jan 2019–Nov 2020: Career break (travel + CFA Level 1)
- Apr 2015–Jan 2019: FP&A Analyst | Société Générale IBD
- Sep 2014–Apr 2015: FP&A Analyst | Newedge

**Project categories:**
- Finance & FP&A: Business cases, dashboards, financial models (default tab)
- Data & Analytics: Forecasting, data visualization, SQL/Python projects
- Film & Entertainment: Passion projects — deprioritised, appears last
