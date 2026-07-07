# Portfolio Audit — 2026-07-07

Baseline: every file in the repo read in full; site rendered with Playwright (Chromium) at
1440x900 desktop and 390x844 mobile, plus both resume pages; all 17 external links tested
with real HTTP requests; contrast ratios computed with the WCAG formula. Each finding below
cites the file/line, screenshot, or test that produced it.

Verdict up front: the content is strong and honest, the copy is mostly clean (previous
passes worked), and there are no broken links or JS errors. What holds the site back:
(1) the single best project is missing, (2) the first screen has zero numbers on it,
(3) the visual design is a tasteful template with no point of view and emoji icons that
undercut a CFO audience, (4) the accent color fails WCAG contrast everywhere it's used
as text, and (5) a title inconsistency between the site and the English resume that a
recruiter who reads both will notice.

---

## 1. Content: what undersells, what's filler

### The flagship project is missing (directed, and confirmed)
`js/projects.js` has 15 projects; none is the FP&A agent-team pipeline. Read the local
repo (`c:/Users/snip1/Documents/GitHub/fpa-project/README.md`): a five-agent monthly
close pipeline for a EUR100M organization with genuinely differentiated results — the
FY2025 budget-to-actual walk reconciles to the euro, a planted 10x data-entry trap was
caught at ingestion instead of being narrated as a business story, 16 of 20 material
variances are honestly reported as "no clear driver identified", every figure in the
LLM-drafted commentary is traced back to source within 0.5% and EUR15k, and the pipeline
always stops at a human sign-off gate. This is the only project that proves the "AI
fluency" claim in the About card (index.html:87) and it's the one a CFO would actually
lean forward for.

**Blocker found while verifying:** `https://github.com/alanvourch/fpa-project` returns
**404** (tested with curl; also absent from the GitHub API's public repo list for
alanvourch). The repo exists locally with that remote, so it is private or unpushed.
The project link will be broken for every visitor until the repo is made public. Only
you can flip that switch.

### The "All" projects tab reads as a film portfolio
Screenshot of the All tab (rendered): 9 of 15 cards are film projects, including the
entire bottom half of the grid. The Finance-first default tab mitigates this, but any
recruiter who clicks "All" sees two rows of movie posters. The film work is real
engineering and should stay, but the flagship project plus tightened ordering should
push finance mass above the fold of that grid.

### Undersold achievements (site vs resume diff)
- "Stepped in as acting Finance Director during the annual close and audit, delivering
  on time with no team overtime" appears in resume-en.html:129 but **not** in the
  Auditoire timeline entry on the site (index.html:218-225). That is a
  one-sentence-from-a-CFO's-perspective highlight and it's missing from the page
  recruiters actually browse.
- The Kaggle dataset's traction numbers (25k views, 7k downloads, index.html:186) don't
  appear on the dataset's own project card, which instead says "Used by data analysts
  worldwide" (js/projects.js:164) — the vague version of a claim he has real numbers for.

### Vague claims with no number behind them
- js/projects.js:33 — "cut prep time significantly" (the Power BI dashboard card).
  Everything around it is quantified; this one dangles.
- js/projects.js:164/170 — "Used by data analysts worldwide", "Used by the film data
  community" (numbers exist, see above).

### Filler sentences (say nothing a CFO would pay for)
- js/projects.js:8 — "Built as a showcase of what modern FP&A looks like when done
  rigorously."
- js/projects.js:14 — "Exec-ready slide deck with clear storytelling and visual clarity."
- js/projects.js:52 — "Published on Medium, practical, readable, finance-oriented."
- js/projects.js:64 — "The kind of analysis modern HR finance teams actually need."
- js/projects.js:145 — "through the lens of data."
- index.html:70 — "so the FP&A function can focus on what matters" ("what matters" is
  filler even when the list that follows is good).
- index.html:149 — "All built from scratch." Two of the projects are Medium articles;
  the claim is loose and "from scratch" is a tech-portfolio cliché.
- index.html:38 — "Known for owning..." is vague attribution (known by whom?). State it
  directly: "I own..." / "Seven years owning...".

---

## 2. Visual design: does it have a point of view?

Checked against the three generic AI-design defaults, from rendered screenshots:
- Warm cream / serif / terracotta: **no** (white/off-white, navy, amber).
- Near-black / acid-green: **no**.
- Broadsheet hairline-rule layout: **no**.

So it dodges the flagged clichés. But it lands in a fourth bucket: **polished template
with no signature**. Specifically:

- **Playfair Display + Inter** (style.css:27-28) is the single most common "elegant
  personal site" pairing of the last five years. Combined with centered uppercase amber
  eyebrows, card grids, pill tags, and a dotted timeline, the anatomy is
  indistinguishable from thousands of template portfolios. Nothing in the visual system
  says "this person does finance with data".
- **Emoji as icons** — About cards use 🏢 📊 🤖 (index.html:75-85), skills headers use
  💼 📈 🤖 (index.html:102-130), contact uses ✉️ 🔗 💻 (index.html:331-341), resume links
  use 📄 (index.html:48-49, 349-350). On a CFO-facing site emoji read as a slide deck
  from someone who hasn't decided if they're serious, and they render differently on
  every OS (verified: Windows Segoe UI Emoji rendering in screenshots is notably
  flatter than macOS, where most recruiters will view it).
- **Off-palette color**: the film category badge is purple, rgba(120,60,120)
  (style.css:518) — a fourth hue unrelated to the navy/amber system.
- **The hero wastes its proof**: rendered fold screenshot shows eyebrow "HEAD OF FP&A",
  name, an 8-line paragraph, two visa tags, photo. All the numbers (€7B consolidated,
  €100M P&L, 1.5% forecast error, -40% close time) sit below the fold. The one thing a
  finance leader's landing screen should have is figures.

**What a point of view looks like for this profile:** the visual language of financial
reporting itself — tabular numerals, a budget-vs-actual style metrics strip, mono-spaced
figures, favorable/unfavorable color semantics used sparingly. Keep the navy/amber
identity (it's his, and it avoids the clichés) but let numbers, not decoration, carry the
distinctiveness. Concrete plan in §6.

---

## 3. Technical health

### Tested and passing
- **All 17 external links return 200** (curl, followed redirects, desktop UA). LinkedIn
  returns 999, which is LinkedIn's standard bot-block, not a broken link.
- **No console errors, no page errors, no failed network requests** on index (desktop
  and mobile emulation), resume-en, resume-fr (Playwright listeners on all four).
- Lazy loading present on card images (js/main.js:47-48), passive scroll listener
  (js/main.js:9), two JS files, one CSS file. Static perf posture is fine.

### Failing: accessibility
- **Amber text fails WCAG AA everywhere it appears on light backgrounds.** Computed:
  #c9922a on white = **2.75:1**, on off-white = 2.57:1 (AA requires 4.5:1; even
  large-text AA requires 3:1). Affected: every section eyebrow (.section-eyebrow),
  timeline company lines (.timeline-company), "Details" buttons (.project-more-btn),
  hero resume links (.resume-link), modal eyebrows (.modal-eyebrow), resume h2 headings
  (resume-en.html:29). Hover state #e8b84b on white = **1.84:1**. CLAUDE.md's claim
  that "color contrast meets WCAG AA" is false today. Fix: a darker text-amber
  (#8f6512 = 5.20:1, computed) for text roles; keep bright amber for borders/decoration.
- **Modal is focusable while closed and has no focus trap.** .modal-overlay hides with
  opacity/pointer-events only (style.css:755-772), so the close button stays in the Tab
  order when invisible; when open, Tab walks out of the dialog into the page behind it
  (js/main.js:82-117 has no trap). Needs visibility:hidden when closed + a minimal trap.
- **Space on a focused project card scrolls the page** while opening the modal —
  keydown handler doesn't preventDefault (js/main.js:62).
- **Tabs announce nothing**: role="tab" with no aria-selected updates and no
  role="tablist"/tabpanel wiring (index.html:151-156, js/main.js:69-75).

### Dead / broken code
- **Tap-to-flip is dead code that never worked as shipped**: the CSS targets
  .project-front/.project-back (style.css:1084-1088) which do not exist in the card
  markup renderCards generates (js/main.js:45-59). The JS half also only binds to the
  cards present at load (js/main.js:139), so re-rendered tabs lose it. On touch devices
  the card click already opens the modal, so the correct fix is deletion, plus removing
  the "tap-to-flip" claims from CLAUDE.md.
- Invalid CSS property `min-font-size` (style.css:685).
- .project-desc is declared twice with identical clamp rules (style.css:535-545 and
  1062-1070).
- Inline styles hardcode colors on the film note div (index.html:158) instead of using
  the CSS variables.

### Repo / deployment hygiene
- **robots.txt at root blocks all crawlers** (`Disallow: /`, verified). Correct for the
  Vercel preview branch; must be deleted before merging to main or alanvourch.com gets
  deindexed. (Restating the CLAUDE.md warning because it's the highest-stakes item in
  the repo.)
- **37MB of tracked, unreferenced files in images/charts/** (9 Plotly HTML files + png;
  zero references from index.html/css/js, grep-verified) and **13MB in
  images/projects/unused/** — all deployed to GitHub Pages on every push. Caution: the
  chart HTMLs may be embedded by the Medium articles; verify before deleting, so this
  audit flags but does not act.
- favicon.png is 112KB (images/favicon.png) — a favicon should be a few KB.
- Untracked strays at root: `index 15.06.26.html`, `28.02.2026/`, `test-results/`
  (empty). Not deployed (untracked), but one accidental `git add -A` away from shipping
  a stale duplicate homepage. Should be gitignored or moved out.
- Unused tracked images: businesscase_hover(1).webp, hr2.png, images/background.webp
  (grep: no references).

### Missing for a link-shared portfolio
- **No Open Graph / Twitter meta tags** (index.html head, lines 1-13). When the URL is
  pasted into LinkedIn, Slack, or iMessage — which is how a portfolio travels between a
  recruiter and a hiring manager — there is no preview card at all. Needs og:title,
  og:description, og:image, twitter:card.

### Documentation drift (CLAUDE.md)
- "Hero photo hidden on small screens" — false; it renders at 220px/160px (style.css:913,
  942; confirmed in mobile screenshot).
- "Touch-optimized tap-to-flip" — see dead code above.
- "Color contrast meets WCAG AA" — see contrast failures above.

---

## 4. The 5-second scan: does finance credibility register?

From the rendered 1440x900 fold: a scanner sees **HEAD OF FP&A** (small amber eyebrow),
the name in large serif, a dense paragraph, two location tags, a photo. So yes — the role
registers. But the employers (Société Générale, TBWA) are buried mid-paragraph in body
text, and there is not a single number on the screen. For a profile whose whole pitch is
"I make numbers legible to executives", the first screen contains zero evidence of that.

On mobile (390x844 fold screenshot): photo first, then eyebrow, name, and the paragraph;
the CTA buttons and both credibility tags are **below the fold**.

Fix: a compact metrics strip on the first screen (7 yrs FP&A · €7B costs consolidated ·
€100M P&L owned · CFA L3 in progress), employers pulled out of the paragraph, shorter
subtitle. This doubles as the design signature (§2).

---

## 5. Copy quality scan

- **Em dashes: zero** in index.html, projects.js, both resumes, style.css
  (grep for U+2014 and &mdash;: no matches). Previous passes cleaned them, **but** the
  removal left comma-splice scars where the dash was swapped for a comma and the
  sentence never re-written:
  - js/projects.js:27 — "pulls from multiple data sources, business operations and
    payroll, to give leadership..."
  - js/projects.js:46 — "Written as a practical guide, not a theory paper, every method
    is benchmarked..." (dangling)
  - js/projects.js:52 — "Published on Medium, practical, readable, finance-oriented"
  - js/projects.js:164 — "cast, crew, and production company, 30+ fields per title"
  - js/projects.js:202 — "Designed with an executive audience in mind, clear visuals,
    smart filtering, and fast drill-down."
  - js/projects.js:240 — "This pipeline runs daily, pulls new releases and rating
    updates from TMDB, and merges them..." (fine) vs js/projects.js:259 — "requires more
    than a simple loop, rate limiting, pagination, partial failure recovery..." (the
    comma after "loop" was a dash; as written it's a list that contradicts itself).
- **Buzzwords**: one word from the flagged list survives — "synergy realization"
  (index.html:273 and resume-en.html:156; "synergies réalisées" resume-fr.html:156).
  It's legitimate M&A vocabulary, but it's replaceable with plainer words ("tracked
  integration costs and merger cost savings") at zero information loss.
  No leverage/streamline/unlock/seamless/robust/cutting-edge/game-changer/holistic
  anywhere (grep-verified).
- **Title inconsistency**: hero eyebrow and site timeline say **Head of FP&A**
  (index.html:36, 216); the English resume's own tagline says Head of FP&A
  (resume-en.html:75) but its Auditoire entry says **FP&A Manager** (resume-en.html:120),
  and one project card says "as FP&A Manager at Auditoire" (js/projects.js:26-27).
  A recruiter reading both documents sees a discrepancy on the single most important
  line of the CV. Per the positioning doc (CLAUDE.md), Head of FP&A is the credential.
  All instances should agree.

---

## 6. Fix plan (checkpoint 2 scope)

1. **Add the flagship project** as the first Finance card with a featured treatment.
   Outcome-led description (close cycle run end-to-end, reconciles to the euro, catches
   the planted data trap, refuses to invent causes, human sign-off), architecture as
   supporting detail. Real chart images from the repo's docs/ as thumb/hover. Link to
   GitHub as directed, with the caveat above that the repo must be made public.
2. **Hero proof strip + copy tightening**: metrics on first screen, employers legible,
   shorter subtitle, "Known for" removed. Mobile: strip visible near the fold.
3. **Design pass with a stated POV** (finance-report language): tabular/mono numerals
   for all figures (IBM Plex Mono accent), replace every emoji with small inline SVG
   line icons, retire Playfair for a sharper editorial serif or lean fully into the
   modern-finance sans look (decision recorded in the design plan before touching CSS),
   film badge recolored into the palette, keep navy/amber.
4. **Contrast fixes**: introduce --amber-text (#8f6512 or similar ≥4.5:1) for all text
   roles listed in §3; resume h2s included.
5. **A11y/JS fixes**: modal visibility + focus trap, Space preventDefault, aria-selected
   on tabs, delete dead flip code.
6. **CSS cleanup**: remove min-font-size, duplicate .project-desc block, inline film-note
   styles → class.
7. **Copy fixes**: every comma-splice scar, filler sentence, vague claim, and the
   synergy phrasing, per §1/§5 lists; align Auditoire title to Head of FP&A in
   resume-en.html and projects.js; add acting-FD bullet to the site timeline; put the
   Kaggle traction numbers on the dataset card.
8. **Meta**: Open Graph + Twitter card tags with a real preview image.
9. **Hygiene**: gitignore the stray backup files; note (not delete) the images/charts
   question; shrink favicon. robots.txt stays until merge day and is called out in the
   PR description.

Not in scope (would be a rebuild, not a quality pass): restructuring sections, adding
features, dark mode, deleting the film category, converting resumes to PDF.
