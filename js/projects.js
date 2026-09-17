const projects = [
  // ── FINANCE & FP&A ──────────────────────────────────
  // Two flagships, in the order of the FP&A cycle: plan first, then report.
  {
    id: 'fpa-planning-model',
    category: 'finance',
    featured: true,
    title: 'Hiring and Cloud Decision for a USD 24M ARR SaaS Company',
    shortDesc: 'Recommendation: hire in phases and sign a one-year cloud commitment. Front-loading adds USD 1.7M of ARR but leaves 16.9 months of downside runway against an 18-month floor.',
    fullDesc: 'Northlight is a fictional software company at USD 24M of ARR, growing 41% a year and burning USD 762k a month, with teams in Montréal, Paris and Austin. Gross margin has slipped two points below budget because customers of its data add-on use a third more compute than planned. The CFO has to decide how fast to hire and whether to commit on cloud. I compared three hiring plans and two cloud options under base, upside and downside cases against two board guardrails: at least 18 months of runway in the downside and gross margin never below 74%. The phased plan with a cloud commitment is the fastest-growing option that passes both. Every hire is costed by role and location, and new revenue comes from sales capacity after ramp, so moving a start date moves the cash. The output is a one-page CFO memo, a five-slide board pack and an Excel workbook with live formulas. The data is synthetic.',
    highlights: [
      'Recommended: 22 planned hires from October 2026 to May 2027 and a one-year cloud commitment. USD 40.5M of ARR by February 2028 in the base case, runway never below 23 months in the downside',
      'Rejected: front-loading 29 planned hires plus contractors. It adds USD 1.7M of ARR and breaks the runway floor by 1.1 months in the downside',
      'Rejected: cloud on demand. Gross margin bottoms at 72.9% against the 74% floor; the commitment saves USD 0.8M over 18 months and strands USD 178k of units in the downside',
      'The trade-off to defend: the phased plan burns USD 4.5M more than holding hiring for USD 2.2M more ARR',
      'Under the budget\'s original 12-month runway floor the model picks the front-loaded plan; the board\'s move to 18 months changed the answer',
      'CFO memo, board pack and Excel workbook generated from the same model; tests check that hires, cash and the bridge reconcile'
    ],
    skills: ['Driver-Based Planning', 'Headcount Planning', 'Scenario Analysis', 'Cash Runway', 'SaaS Metrics', 'Excel', 'Python'],
    thumb: 'images/projects/fpa-planning-card.webp',
    hover: 'images/projects/fpa-planning-scenarios.webp',
    link: 'https://alanvourch.com/fpa-planning-model/',
    linkLabel: 'Open the Case Study'
  },
  {
    id: 'fpa-agent-team',
    category: 'finance',
    featured: true,
    title: 'Monthly Budget vs Actual Pack: Variances, Forecast, Board Commentary',
    shortDesc: 'FY2025 came in €2.4M under budget. A €1.64M project overrun explains most of it, and a billings entry ten times too large was caught before the board pack.',
    fullDesc: 'EventCo is a fictional events agency with about €100M of annual net billings and four business lines, modelled on the monthly reporting I ran as Head of FP&A. The pipeline takes a messy monthly export and flags a billings figure ten times too large as an entry error instead of a growth story. It runs 1,320 budget-versus-actual tests and keeps 19 material variances: 4 explained by a dated business note, 13 by the analyst after follow-up, and 2 left open and labelled as such. It refreshes next quarter\'s forecast with one-off events taken out, builds a one-page review for each business line and assembles a draft board pack that stops at a sign-off block. One step uses a language model to word the executive summary, and a check traces every figure in that text back to the variance tables. The data and the analyst explanations are written for the demo.',
    highlights: [
      'FY2025 walk from a €4.8M budgeted operating result to €2.4M actual, reconciled to the euro: €1.64M cost-of-sales overrun on one client project, €197k currency effect on a USD contract, €69k in-housing savings',
      'Gross margin slipped €956k below plan in months that never cleared a materiality test: 3.6% of budgeted gross margin, and a fifth of the year\'s planned operating result',
      '19 material variances: 4 backed by a business note, 13 explained by the analyst, 2 still open, each labelled with its source',
      'A €52M billings entry in a €5M month flagged as a typo at ingestion and kept out of every figure and sentence',
      'One-page review per business line splitting payroll into headcount and rate, and billings into volume and price',
      'Draft board pack ends at a sign-off block; nothing is sent automatically'
    ],
    skills: ['Variance Analysis', 'Board Reporting', 'Rolling Forecast', 'Data Controls', 'Python', 'AI (one step)'],
    thumb: 'images/projects/fpa-close-card.webp',
    hover: 'images/projects/fpa-agents-bridge.webp',
    link: 'https://alanvourch.com/fpa-project/',
    linkLabel: 'Open the Case Study'
  },
  {
    id: 'fpa-dashboard',
    category: 'finance',
    title: 'Auditoire Management Reporting in Power BI',
    shortDesc: 'The management reporting I ran as Head of FP&A at Auditoire, rebuilt with synthetic data: project margin, payroll and headcount by team, and a manager view.',
    fullDesc: 'Management at Auditoire needed one view of project margin and payroll across a 150-person business. As Head of FP&A I built the business and payroll databases and the Power BI reporting on top, including a restricted version so each business unit manager saw only their own perimeter. The core views were used and reviewed by the CFO, the CEO and the finance team. This published version is a rebuild on synthetic data: it keeps the structure of what was used, adds a few pages and leaves others out. Best viewed on a computer.',
    highlights: [
      'Business and payroll databases built in-house, with the Power BI reporting on top',
      'Project margin, activity, team and client views, plus a restricted manager view',
      'The core views were used and reviewed by the CFO, the CEO and the finance team',
      'The payroll base behind the 25% improvement in payroll forecast accuracy',
      'Published as a rebuild on synthetic data, eight pages'
    ],
    skills: ['Power BI', 'Management Reporting', 'Payroll & Headcount', 'Data Modeling', 'DAX'],
    thumb: 'images/projects/pbi-activity.webp',
    hover: 'images/projects/pbi-manager.webp',
    link: 'https://app.powerbi.com/view?r=eyJrIjoiM2VjMmRkMjItN2IxYS00MDliLWIxM2QtYmIzYjAzNmMxMWVkIiwidCI6Ijg5NTkwMmNlLTUzMWMtNDJjNi05YTMwLTA3YjRkZjUxYzNiMyJ9',
    linkLabel: 'Open in Power BI (desktop)'
  },
  {
    id: 'scaleup-expenses',
    category: 'finance',
    title: 'Workforce Plan for a FinTech Scale-Up: Q3 Hiring and Cost to Serve',
    shortDesc: 'Cost to serve fell €1.5 per customer from January to March. Recommendation: hire quarterly, favour junior and mid-level roles, and convert recurring contractor work to employees.',
    fullDesc: 'A business case for an FP&A Expenses Manager role at a fintech scale-up, on synthetic data. Three months of general ledger rebuilt into a monthly P&L, a definition of cost to serve and its monthly movement, the cost of a Q3 plan to hire 50 engineers and 20 customer success reps against a 20% cut in contractors, and a one-page recommendation for the leadership team.',
    highlights: [
      'P&L rebuilt from three months of general ledger, with the account mapping documented',
      'Cost to serve down 11.8% from January to February and up 2.8% in March, explained by onboarding spend, headcount and customer growth',
      'Q3 hiring plan costed month by month, with contractor savings set against new hire costs',
      'Recommendation: quarterly hiring against customer growth, a junior and mid-level hiring mix, and contractors converted to employees at about €150 a day less'
    ],
    skills: ['Workforce Planning', 'Cost to Serve', 'P&L Build', 'Excel'],
    thumb: 'images/projects/businesscase_hover.webp',
    hover: 'images/projects/businesscase_hover.webp',
    link: 'https://better-lobster-21e.notion.site/Business-Case-Strategic-Workforce-Planning-for-a-Hypergrowth-Fintech-239a918b45eb8089a6c6fdb737f6cd5f',
    linkLabel: 'Open on Notion'
  },

  // ── DATA & ANALYTICS ─────────────────────────────────
  {
    id: 'retail-forecast',
    category: 'data',
    title: 'Forecasting Daily Sales: From Trend to a Hybrid Model',
    shortDesc: 'Daily sales forecast for an Ecuadorian grocery chain (Kaggle Store Sales data), built up from trend and seasonality to lag features and a linear plus XGBoost hybrid.',
    fullDesc: 'A step-by-step forecasting walkthrough on public retail data, written up as an 11-minute guide on Medium. Each step adds one piece a finance forecast also needs: trend, seasonality, the effect of recent history, promotions and holidays, then a hybrid model and multi-step forecasts.',
    highlights: [
      'Trend with moving averages and polynomial regression',
      'Seasonality with indicator variables and Fourier terms',
      'Lag features, promotions and holidays as regressors',
      'Linear regression and XGBoost hybrid, with multi-step forecasts using the DirRec strategy'
    ],
    skills: ['Python', 'Time Series', 'XGBoost', 'Pandas', 'Scikit-learn'],
    thumb: 'images/projects/forecast.webp',
    hover: 'images/projects/forecast2.webp',
    link: 'https://medium.com/@alan.vourch/forecasting-a-practical-guide-6173f421c1ed',
    linkLabel: 'Read on Medium'
  },
  {
    id: 'hr-predictor',
    category: 'data',
    title: 'HR Insights & Predictive Model',
    shortDesc: 'Employee turnover model: which staff are at risk of leaving, what drives it, and what the churn costs HR and finance.',
    fullDesc: 'Starting from an HR dataset, I built a classification model to predict which employees are at risk of leaving and identified the variables driving churn, then turned the results into business recommendations and cost impact estimates.',
    highlights: [
      'Exploratory analysis of 14,000+ employee records across departments',
      'Feature engineering: satisfaction scores, tenure, workload proxies',
      'Compared Logistic Regression, Random Forest, and XGBoost',
      'Final model: 94% accuracy on the holdout set',
      'Model outputs turned into HR and cost recommendations'
    ],
    skills: ['Python', 'Machine Learning', 'HR', 'Financial Modeling', 'Classification', 'Pandas', 'Matplotlib'],
    thumb: 'images/projects/hr.webp',
    hover: 'images/projects/hr2.webp',
    link: 'https://www.kaggle.com/code/alanvourch/salifort-motors-hr-analysis',
    linkLabel: 'Open on Kaggle'
  },
  {
    id: 'sql-remote',
    category: 'data',
    title: 'SQL: Top Paying Remote Data Analyst Jobs',
    shortDesc: 'Five SQL questions on 2023 data analyst job postings: the top-paying remote roles, the highest-paying skills and the most in-demand ones.',
    fullDesc: 'A PostgreSQL analysis of a public dataset of 2023 data analyst job postings, asking which remote roles pay the most and which skills go with the highest salaries and the most demand.',
    highlights: [
      'Top 10 highest-paying remote data analyst jobs by average yearly salary',
      'Skills required by those top-paying roles',
      'Most in-demand skills and highest-paying skills across data analyst postings',
      'Skills that combine high demand with high salary',
      'Joins and CTEs across job, company and skills tables, documented on GitHub'
    ],
    skills: ['SQL', 'PostgreSQL', 'JOINs', 'CTEs', 'Data Analysis'],
    thumb: 'images/projects/sql-remote.webp',
    hover: 'images/projects/job_salaries_chart.png',
    link: 'https://github.com/alanvourch/SQL-Project',
    linkLabel: 'View on GitHub'
  },
  {
    id: 'sql-tech',
    category: 'data',
    title: 'SQL: Tech Layoffs Analysis',
    shortDesc: 'SQL cleaning and analysis of public tech layoffs data: trends across companies, sectors and geographies.',
    fullDesc: 'Used raw public data on tech layoffs to explore workforce shift patterns across the 2022–2024 cycle, from messy raw data to clean analytical views, all in SQL.',
    highlights: [
      'Multi-step data cleaning: deduplication, null handling, standardization',
      'Company and sector-level ranking by total layoffs',
      'Rolling 3-month trends using window functions',
      'Geographic breakdowns: US vs international layoff patterns',
      'Written up with annotated SQL'
    ],
    skills: ['SQL', 'Data Cleaning', 'EDA', 'Window Functions', 'CTEs'],
    thumb: 'images/projects/sql-tech.webp',
    hover: 'images/projects/sql2.webp',
    link: 'https://better-lobster-21e.notion.site/SQL-Data-Cleaning-EDA-Layoffs-data-dbd0891e61454310901253c8faa767d3',
    linkLabel: 'Open on Notion'
  },

  // ── FILM & ENTERTAINMENT ─────────────────────────────
  {
    id: 'moviemate',
    category: 'film',
    title: 'MovieMate: Movie Web App',
    shortDesc: 'A React web app built on my own 50k-movie database: browse and filter films, box office results, upcoming releases and movie news.',
    fullDesc: 'MovieMate started as a way to explore my movie dataset and became a working web app. Users can search and filter movies, track box office performance, follow upcoming releases, and read movie news.',
    highlights: [
      'Built with React, component architecture, hooks, routing',
      'Powered by my own TMDB-sourced 50k+ movie database',
      'Live box office data and upcoming release tracking',
      'Movie news aggregation from film media sources',
      'Deployed on Vercel'
    ],
    skills: ['React', 'JavaScript', 'API Integration', 'UI/UX', 'Vercel'],
    thumb: 'images/projects/moviemate-thumb.webp',
    hover: 'images/projects/moviemate_hover.webp',
    link: 'https://themoviemate.vercel.app/',
    linkLabel: 'Open Live App'
  },
  {
    id: 'netflix',
    category: 'film',
    title: 'Netflix Content Strategy Analysis',
    shortDesc: 'Netflix\'s movie catalog analysed by genre, region and audience rating, to show where the content investment goes.',
    fullDesc: 'An analysis of Netflix\'s movie strategy: which genres dominate, which regions are prioritized, and how audience ratings line up with volume and investment. Published on Medium with the charts.',
    highlights: [
      'Analysis of 8,000+ Netflix titles across genres, countries, and release years',
      'Genre market share trends over time, identifying strategic pivots',
      'Regional production breakdown: where Netflix invests and why',
      'Rating distribution analysis: the quality vs quantity trade-off',
      'Published on Medium with embedded visualizations'
    ],
    skills: ['Python', 'Pandas', 'Matplotlib', 'Data Visualization', 'Storytelling'],
    thumb: 'images/projects/netflix.jpg',
    hover: 'images/projects/netflix-verso.png',
    link: 'https://medium.com/@alan.vourch/netflix-by-the-numbers-a-content-strategy-perspective-4fb88789f476',
    linkLabel: 'Read on Medium'
  },
  {
    id: 'movies-dataset',
    category: 'film',
    title: 'Ultimate Movies Dataset',
    shortDesc: 'A daily-updated Kaggle dataset of 1 million movies with 25k views and 7k downloads: box office, ratings and production data.',
    fullDesc: 'The dataset behind most of my film projects: 1 million+ movies sourced from TMDB and refreshed daily, covering revenue, ratings, genres, languages, cast, and crew across 30+ fields per title. 25k views and 7k downloads on Kaggle.',
    highlights: [
      '1 million+ movie records, updated daily via automated pipeline',
      '30+ data fields: revenue, budget, cast, crew, genres, ratings, languages',
      'Built the extraction and update pipeline from scratch (Python + TMDB API)',
      '25k views and 7k downloads from the Kaggle data community'
    ],
    skills: ['Python', 'API', 'Data Engineering', 'Kaggle', 'Pandas'],
    thumb: 'images/projects/moviedataset.webp',
    hover: 'images/projects/dataset4.webp',
    link: 'https://www.kaggle.com/datasets/alanvourch/tmdb-movies-daily-updates/data',
    linkLabel: 'Explore Dataset on Kaggle'
  },
  {
    id: 'tableau-boxoffice',
    category: 'film',
    title: 'Tableau: Box Office & IMDb Trends',
    shortDesc: 'Tableau dashboard of box office revenue and IMDb ratings by genre and decade over 60 years.',
    fullDesc: 'How movie genres have performed at the box office across six decades, and how audience ratings have tracked or diverged from commercial success.',
    highlights: [
      'Genre revenue trends from the 1960s to present, animated timeline view',
      'IMDb ratings vs box office: the quality/profitability correlation',
      'Decade-by-decade genre market share comparison',
      'Interactive filters for genre, decade, and budget tier',
      'Published on Tableau Public'
    ],
    skills: ['Tableau', 'Data Visualization', 'Storytelling', 'Film Data'],
    thumb: 'images/projects/tableaucine.webp',
    hover: 'images/projects/tableaubo2.webp',
    link: 'https://public.tableau.com/app/profile/alan.vourch/viz/BoxOfficeHitsbyGenreandDecade/Dashboard',
    linkLabel: 'Open in Tableau'
  },
  {
    id: 'pbi-cinema',
    category: 'film',
    title: 'Power BI: Cinema Dashboard',
    shortDesc: 'Power BI dashboard of box office and IMDb data: studio rankings, genre breakdowns and trends across years.',
    fullDesc: 'A Power BI dashboard built on my movie dataset, combining box office and IMDb data, with filters and drill-down across studios, genres and years.',
    highlights: [
      'Studio performance ranking by revenue, volume, and average rating',
      'Genre breakdowns with year-over-year trend comparisons',
      'IMDb ratings alongside commercial performance',
      'Cross-filtering across all visuals'
    ],
    skills: ['Power BI', 'DAX', 'Data Modeling', 'Visualization'],
    thumb: 'images/projects/pbi-movie.webp',
    hover: 'images/projects/pbi_cinema.webp',
    link: 'https://app.powerbi.com/view?r=eyJrIjoiN2MzZjI5OTgtNmI2OC00ZDkzLWJjM2YtMWZmYmIyYzQzMWMzIiwidCI6Ijg5NTkwMmNlLTUzMWMtNDJjNi05YTMwLTA3YjRkZjUxYzNiMyJ9&pageName=5981d12bcd3a65531c02',
    linkLabel: 'Open in Power BI'
  },
  {
    id: 'a24-analysis',
    category: 'film',
    title: 'A24 Movies Analysis',
    shortDesc: "Data analysis of A24's 130+ films: genre mix, budgets, box office against critical reception, and recurring talent.",
    fullDesc: "A look at A24's catalogue with data: genre mix, budget strategy, box office against critical reception, international performance, and talent patterns.",
    highlights: [
      "Full catalog analysis: 130+ A24 films across genres, years, and budgets",
      "Budget efficiency: revenue multiples vs major studio comparisons",
      "Critical vs commercial success: the A24 pattern",
      "Director and actor network, identifying recurring talent",
      "Genre evolution: how A24's output has shifted since 2010"
    ],
    skills: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Data Analysis'],
    thumb: 'images/projects/a24.jpg',
    hover: 'images/projects/a241.webp',
    link: 'https://www.kaggle.com/code/alanvourch/a24-movies-analysis',
    linkLabel: 'Open on Kaggle'
  },
  {
    id: 'movies-update',
    category: 'film',
    title: 'Movies Dataset: Daily Update Pipeline',
    shortDesc: 'Python pipeline that refreshes the Ultimate Movies Dataset every day with new releases and updated ratings, about 500 records a run.',
    fullDesc: 'The pipeline runs daily, pulls new releases and rating updates from TMDB, and merges them into the 1M+ movie dataset without duplication or data loss.',
    highlights: [
      'Scheduled through Kaggle notebooks, with no separate infrastructure',
      'Incremental update logic: only processes changes, not full re-scrapes',
      'Deduplication and merge logic with conflict resolution',
      'Error handling and logging to monitor each run',
      'Handles 500+ new or updated records per daily run'
    ],
    skills: ['Python', 'API', 'Pipeline Engineering', 'Automation', 'Pandas'],
    thumb: 'images/projects/update.webp',
    hover: 'images/projects/update1.webp',
    link: 'https://www.kaggle.com/code/alanvourch/tmdb-movies-daily-update/notebook',
    linkLabel: 'View Pipeline on Kaggle'
  },
  {
    id: 'movies-extraction',
    category: 'film',
    title: 'Movies Data Extraction',
    shortDesc: 'The extraction behind the Ultimate Movies Dataset: 1 million movies and 30 fields from the TMDB API, with rate limiting and data quality checks.',
    fullDesc: 'The first full extract of the movie dataset: 1 million records pulled from the TMDB API with rate limiting, pagination, recovery from partial failures, field normalization, and validation.',
    highlights: [
      'Rate limit handling and retry logic',
      'Paginated extraction covering 1M+ titles across all TMDB categories',
      '30 fields per movie: revenue, budget, cast, crew, genres, ratings, languages, production',
      'Field normalization and type validation built into the pipeline',
      'Runs once for the full extract, then the update pipeline takes over'
    ],
    skills: ['Python', 'API Engineering', 'Data Extraction', 'Pandas', 'Error Handling'],
    thumb: 'images/projects/extraction.webp',
    hover: 'images/projects/extraction1.webp',
    link: 'https://www.kaggle.com/code/alanvourch/tmdb-movies-data-extraction/notebook',
    linkLabel: 'View on Kaggle'
  }
];
