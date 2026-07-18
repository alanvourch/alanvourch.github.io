# Portfolio review

Date: 18 July 2026  
Branch reviewed: `claude/portfolio-recruiter-updates-ptn6r0`  
Commit reviewed: `e4383a0`

## Executive assessment

This is strong raw material and already above the average personal portfolio. It establishes that Alan is a serious FP&A professional with unusually strong systems and automation skills.

However, it still tries to prove too many things at once. The result is closer to "technically advanced FP&A candidate with many projects" than "senior finance leader ready to own a function and partner with a CFO."

The next iteration should be a curation pass, not an expansion.

## Overall scorecard

| Area | Assessment | Main issue |
|---|---:|---|
| Finance credibility | 8/10 | Excellent employers and metrics, but several claims need tighter definitions |
| Positioning | 7/10 | FP&A is primary, but AI, data, freelance work and film projects compete with it |
| Recruiter scan | 7/10 | Strong hero, but the rest is long and repetitive |
| Design | 7.5/10 | Professional and finance-appropriate, but project imagery is inconsistent |
| Project selection | 5.5/10 | Too many junior or tangential projects for a senior profile |
| Resume delivery | 4/10 | Printing currently produces three poorly balanced pages |
| Technical quality | 7.5/10 | Simple and maintainable, with some accessibility and SEO gaps |
| Launch readiness | 4/10 | The latest homepage is not deployed and `robots.txt` blocks indexing |

## What is already working

- Société Générale, Auditoire/TBWA, Head of FP&A, direct CFO/CEO exposure and team leadership establish seniority quickly.
- The figures are memorable: €7B, €100M, close reduced by 40%, forecast error of 1.5%, €6M in aid and 50+ internal users.
- Canadian work authorization is prominent. Recruiters should not have to wonder about it.
- The hero is clean, confident and professional. Navy, amber, tabular figures and the portrait work well together.
- The FP&A agent case study is differentiated because it emphasizes controls, traceability, refusal to invent explanations and human approval.
- The writing is much more personal than the earlier version. It avoids most generic corporate and AI-generated phrasing.
- The implementation is lightweight and maintainable. There is no reason to rebuild this in a framework.
- Several earlier accessibility issues have already been fixed: sufficient amber contrast, modal visibility, keyboard activation, focus trapping and tab selection state.

The site gives confidence that Alan understands FP&A and can modernize it. That is the right foundation.

## The biggest positioning problems

### 1. "Seven years" no longer matches the timeline

The visible career runs from September 2014 to the present, excluding the career break. A recruiter can count roughly ten years of professional experience, depending on how the freelance periods are classified.

Repeatedly saying "seven years" now undersells the profile and creates a date inconsistency.

**Solution:** Calculate the exact defensible number once and use it everywhere. If some freelance time was not active client work, use a precise formulation such as "10 years across finance, including 7+ years in FP&A leadership and corporate roles."

### 2. The freelance periods are not credible enough yet

The site lists two consecutive freelance periods from June 2023 to the present, but most bullets describe personal projects, certifications and relocation. A recruiter may conclude that there were no real client engagements.

Calling the current period "Freelance FP&A & Data Analytics" while the description says Alan is studying, building projects and looking for work creates ambiguity.

**Solutions:**

- If there were paid engagements, include two or three anonymized examples with industry, scope, duration and result.
- If these were primarily independent projects, label the period honestly as "Independent FP&A projects and professional development."
- Avoid presenting portfolio exercises as client work.
- Explain the transition to Montréal in one line, without making relocation the substance of the role.

This is probably the single most important content issue.

### 3. Some finance claims are too broad

| Current claim | Why it may concern a finance leader | Better approach |
|---|---|---|
| "€100M P&L owned" | FP&A manages and reports a P&L, but usually does not commercially own it | "€100M revenue scope" or "FP&A lead for a €100M P&L" |
| "Runs a full monthly close" | The pipeline appears to run variance reporting after the accounting close, not postings, accruals and reconciliations | "Runs the monthly performance reporting cycle" unless it truly performs accounting close tasks |
| "€100M organization" in the agent case | The charts appear to use a synthetic EventCo dataset | State clearly that it is a synthetic €100M P&L |
| "1.5% forecast error" | The metric, period and forecast horizon are missing | Name the metric and forecasting period |
| "94% accuracy" | Accuracy can be misleading on an imbalanced HR dataset | Add baseline, recall, precision or AUC, or remove the claim |
| "Secured €6M" | May imply sole responsibility | Explain that Alan led the financial analysis or application process, if accurate |
| "Owned the €400M tax line" | Stronger than the resume's "managed €400M in tax operations" | Use the most factually precise version consistently |

These are not minor wording preferences. A CFO will recognize imprecise finance terminology immediately.

## The site says too much

The About section contains four substantial paragraphs followed by three cards that repeat the same themes. The Skills section then repeats them again. The Experience section repeats the resume.

A recruiter is unlikely to read all of this. The length makes the strongest evidence less visible.

### Recommended information architecture

1. Hero and proof figures
2. Short career snapshot or experience
3. Featured FP&A case study
4. Three to five selected projects
5. Compact capabilities section
6. Short personal perspective
7. Contact

The current About section should become "How I run FP&A" and contain no more than two short paragraphs.

The three cards could become:

- FP&A leadership
- Reporting and planning systems
- Controlled automation

"Finance depth," "Data fluency" and "AI fluency" give equal conceptual weight to finance, data and AI. That is not the desired hierarchy.

## Copy assessment

The newer copy is noticeably better. It has specific details, first-person judgment and a believable point of view.

Strong lines include:

- "A finance tool only counts if people open it."
- "SQL, Python, and Power BI came from the finance work needing them."
- The description of monthly meetings and a P&L per business unit.

However, there are still signs of copy being highly engineered:

- "clear, intuitive, built to help teams make better decisions"
- "faster closes, more accurate forecasts, dashboards executives use every week"
- "The goal stays the same: less time producing numbers, more time explaining them"
- "If your finance team is scaling faster than its processes..."
- "a seat at the table"
- "Analysts get their time back"

One or two punchy lines add personality. Several in succession make the text sound constructed.

The AI card is the weakest part. "I follow AI the way I once followed tax regulation" is memorable, but it feels written for effect and could imply that AI is a major part of the professional identity. A CFO-facing version should be more concrete: where AI is used, where it is not used, and what controls remain with humans.

## Project portfolio

The flagship case study is the right lead project. Its live URL was verified and returned HTTP 200 on 18 July 2026.

The problem is the surrounding portfolio.

### Keep prominently

- FP&A agent reporting workflow
- Auditoire Power BI dashboard
- FinTech FP&A business case
- Forecasting project, if the article is rigorous
- One consolidated data-engineering project showing the movie dataset and pipeline

### Demote or remove from the main portfolio

- Generic SQL job-market project
- Tech layoffs SQL project
- Standalone HR classification project unless its methodology is strengthened
- Separate cards for every film dataset component
- Most individual film analyses

These are acceptable learning projects, but they make a Head of FP&A profile look more junior.

The film work should not disappear. It is interesting and human. Consolidate it into one "Film data lab" project with:

- 1M+ records
- daily pipeline
- 25k views and 7k downloads
- MovieMate application
- links to the deeper work

This preserves personality and engineering credibility without letting cinema dominate the All view.

### Project imagery needs a major pass

The real FP&A charts look credible. The generic illustrated thumbnails do not.

The business-case and Power BI cover illustrations look AI-generated or template-like. They clash with the actual financial charts and can weaken trust. The Power BI hover screenshot is also blurry and visually dated.

Use real artifacts everywhere:

- Crisp dashboard screenshots
- Board-slide excerpts
- Model outputs
- Waterfall charts
- Forecast comparisons
- Anonymized tables
- Consistent browser or slide frames

For the Auditoire dashboard, the actual anonymized dashboard should be the first image, not hidden behind a colorful illustration.

The featured project should probably use a two-column layout on desktop: one chart beside three concise proof points and a visible "Read case study" link. Requiring visitors to open a modal before reaching the actual work adds friction.

## Design

The desktop hero is the best-designed part of the site. It is professional without looking like a bank template. The metrics strip gives the design a finance-specific identity.

The narrow layout is functional, but the hero is too long. At 500px wide, the first 900px contains the headline, full paragraph, four metrics, two tags, two large buttons and two resume links. The portrait only starts after that.

### Recommended mobile simplification

- Shorten the introduction by about 35%.
- Keep one primary CTA.
- Make the CTA "View FP&A case study."
- Move resume access into the navigation and contact section.
- Use a smaller portrait beside the headline or immediately after it.
- Keep the work-authorization tag visible.

The overall visual system does not need a redesign. Keep the palette, typography and mono figures. Focus on image consistency, hierarchy and reducing card repetition.

## Resumes

This is a launch blocker.

Both resume pages currently print as three A4 pages. Page one contains only the header and summary, followed by a huge empty area. Experience begins on page two.

The cause is the print rule in both resume files:

```css
section { page-break-inside: avoid; }
```

Because Experience is one large section, the browser moves the entire section to the next page.

### Required fixes

- Allow sections to split.
- Apply `break-inside: avoid` to individual jobs and education entries.
- Target two well-balanced pages.
- Shorten the summary.
- Reduce the tagline, which currently reads like a keyword list.
- Provide real PDF files rather than a button labeled "Download PDF" that actually opens the print dialog.
- Add work authorization near the contact information.
- Consider adding a phone number for recruiter use.

### French resume proofreading

- Remove spaces before commas in company and job lines.
- Use `100 M€`, not `100M€`.
- Replace "scalables" with natural French.
- Translate "Heads of Business," "board pack" and similar English remnants where appropriate.
- Standardize French finance terminology for the Montréal market.
- Correct the inconsistent "Private Market" versus "Private Markets" pathway wording.

## Code and accessibility updates

The basic JavaScript is clean, but the following should be updated:

- Return focus to the project card after closing the modal.
- Add `aria-labelledby` to the dialog.
- Update `aria-expanded` on the mobile menu button.
- Support arrow-key navigation between project tabs.
- Add `aria-controls` and a proper tab panel relationship.
- Make the project card a semantic button or link instead of a `div` with `role="button"`.
- Give hover images empty alt text because they duplicate the first image.
- Preserve the originating element when Escape closes a modal.

CSS updates:

- Add visible `:focus-visible` styling.
- Add `prefers-reduced-motion` handling.
- Add `scroll-margin-top` for anchored sections under the fixed navigation.
- Add width and height attributes to key images to reduce layout shifts.
- Review very small 0.7rem labels for mobile readability.

The static implementation itself is a strength. No framework migration is warranted.

## SEO, deployment and conversion

Before release:

- Delete or replace `robots.txt`. It currently blocks every crawler.
- Deploy the latest branch. On 18 July 2026, the public homepage was still serving the older February version, while the separate FP&A case study was live.
- Change the title from "FP&A & Data Analytics" to something closer to the target role, such as "FP&A Manager in Montréal | Alan Vourc'h."
- Add a canonical URL.
- Add Person/ProfilePage structured data.
- Create a proper 1200 x 630 social-sharing image rather than using the portrait directly.
- Use a large Twitter card.
- Add a sitemap.
- Consider replacing GitHub in the primary contact grid with a phone number or direct scheduling option. GitHub can remain secondary.
- If possible, use an `@alanvourch.com` email address for a more finished presentation.

## Recommended priority

### Must fix before merging

1. Remove the crawler block.
2. Repair the resume print layout and provide direct PDFs.
3. Reconcile the years of experience.
4. Clarify the two freelance periods.
5. Correct potentially overstated finance terminology.
6. Label the agent case as synthetic if it is synthetic.
7. Deploy the actual latest homepage.

### Highest-impact content pass

1. Reorder the site around experience and the flagship case.
2. Cut About and Skills repetition.
3. Reduce the portfolio to five or six senior-relevant projects.
4. Consolidate the film work.
5. Replace generic illustrations with real financial outputs.
6. Make the primary CTA lead directly to the FP&A case study.

### Quality pass afterward

1. French resume editing.
2. Accessibility refinements.
3. SEO and sharing metadata.
4. Image and repository cleanup.
5. Optional privacy-friendly analytics for resume and case-study clicks.

## Final recommendation

The core message is already present: senior FP&A experience, business partnering, quantified operational improvements and modern finance systems.

The work now is to remove anything that makes that message less precise or less senior.

Do not rebuild the site, add more projects or add more visual effects. Tighten the claims, clarify the freelance story, curate the project list, repair the resume output and make the strongest finance evidence easier to reach.
