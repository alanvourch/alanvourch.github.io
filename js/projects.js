const projects = [
  // ── FINANCE & FP&A ──────────────────────────────────
  {
    id: 'scaleup-expenses',
    category: 'finance',
    title: 'FP&A Business Case: FinTech Scaleup',
    shortDesc: 'End-to-end business case replicating an FP&A Expenses Manager role at a hypergrowth FinTech: P&L modeling, cost-to-serve, budget planning, and exec slides.',
    fullDesc: 'This business case replicates the real-life responsibilities of an FP&A Expenses Manager in a FinTech scaleup. It covers the full analytical lifecycle: from raw data to board-ready presentations. Built as a showcase of what modern FP&A looks like when done rigorously.',
    highlights: [
      'Full P&L model with scenario analysis and sensitivity tables',
      'Cost-to-serve framework breaking down unit economics by product line',
      'Budget planning with actuals-vs-budget variance tracking',
      'Workforce planning model for headcount and compensation forecasting',
      'Exec-ready slide deck with clear storytelling and visual clarity'
    ],
    skills: ['Financial Modeling', 'P&L Analysis', 'Budgeting', 'PowerPoint', 'Excel'],
    thumb: 'images/projects/businesscase_thumb.webp',
    hover: 'images/projects/businesscase_hover.webp',
    link: 'https://better-lobster-21e.notion.site/Business-Case-Strategic-Workforce-Planning-for-a-Hypergrowth-Fintech-239a918b45eb8089a6c6fdb737f6cd5f',
    linkLabel: 'Open on Notion'
  },
  {
    id: 'fpa-dashboard',
    category: 'finance',
    title: 'Power BI: FP&A Dashboard',
    shortDesc: 'A Power BI dashboard I built as FP&A Manager at Auditoire. Connects business and payroll databases for live performance tracking used by senior leadership.',
    fullDesc: 'Built in production during my time as FP&A Manager at Auditoire. This dashboard pulls from multiple data sources, business operations and payroll, to give leadership a real-time view of company performance. It became a core reporting tool for both the CFO and operational managers.',
    highlights: [
      'Live connection to business and payroll databases',
      'Multi-page report: P&L summary, headcount, project margins, and trends',
      'Role-level filtering, different views for CFO, HR, and ops managers',
      'Used monthly for executive reporting and budget review sessions',
      'Built to replace manual Excel reporting, cut prep time significantly'
    ],
    skills: ['Power BI', 'DAX', 'Financial Reporting', 'Data Modeling', 'SQL'],
    thumb: 'images/projects/fpadash.webp',
    hover: 'images/projects/pbi_fpa.webp',
    link: 'https://app.powerbi.com/view?r=eyJrIjoiM2VjMmRkMjItN2IxYS00MDliLWIxM2QtYmIzYjAzNmMxMWVkIiwidCI6Ijg5NTkwMmNlLTUzMWMtNDJjNi05YTMwLTA3YjRkZjUxYzNiMyJ9',
    linkLabel: 'Open in Power BI'
  },
  {
    id: 'retail-forecast',
    category: 'finance',
    title: 'Time Series Forecasting',
    shortDesc: 'A forecasting deep dive on real retail sales data, from simple trend models through machine learning hybrids. Practical guide to getting forecasts that actually hold up.',
    fullDesc: 'Forecasting is the core of FP&A. This project walks through the full forecasting toolkit on real retail sales data: decomposition, ARIMA, exponential smoothing, and finally ML hybrid models. Written as a practical guide, not a theory paper, every method is benchmarked on real data.',
    highlights: [
      'Seasonal decomposition and trend isolation on 3 years of retail data',
      'Classical methods: ARIMA, Holt-Winters, moving averages, compared head-to-head',
      'ML hybrid: XGBoost with lag features and calendar variables',
      'Error analysis: MAE, RMSE, and visual residual inspection',
      'Published on Medium, practical, readable, finance-oriented'
    ],
    skills: ['Python', 'Time Series', 'Machine Learning', 'Pandas', 'Scikit-learn'],
    thumb: 'images/projects/forecast.webp',
    hover: 'images/projects/forecast2.webp',
    link: 'https://medium.com/@alan.vourch/forecasting-a-practical-guide-6173f421c1ed',
    linkLabel: 'Read on Medium'
  },
  {
    id: 'hr-predictor',
    category: 'finance',
    title: 'HR Insights & Predictive Model',
    shortDesc: 'Machine learning applied to employee turnover prediction, identifying drivers and building a classification model. The kind of analysis modern HR finance teams actually need.',
    fullDesc: 'Turnover is expensive. This project quantifies it. Starting from a real HR dataset, I built a classification model to predict which employees are at risk of leaving, and surfaced the key variables driving churn. Goes beyond the model to include business recommendations and cost impact estimates.',
    highlights: [
      'Exploratory analysis of 14,000+ employee records across departments',
      'Feature engineering: satisfaction scores, tenure, workload proxies',
      'Compared Logistic Regression, Random Forest, and XGBoost',
      'Final model: 94% accuracy on holdout set with strong precision/recall',
      'Translated model outputs into actionable HR and cost recommendations'
    ],
    skills: ['Python', 'Machine Learning', 'Classification', 'Pandas', 'Matplotlib'],
    thumb: 'images/projects/hr.webp',
    hover: 'images/projects/hr2.webp',
    link: 'https://www.kaggle.com/code/alanvourch/salifort-motors-hr-analysis',
    linkLabel: 'Open on Kaggle'
  },

  // ── DATA & ANALYTICS ─────────────────────────────────
  {
    id: 'sql-tech',
    category: 'data',
    title: 'SQL: Tech Layoffs Analysis',
    shortDesc: 'SQL deep dive on public tech layoffs data. Data cleaning, EDA, and trend analysis across companies, sectors, and geographies.',
    fullDesc: 'Used raw public data on tech layoffs to explore workforce shift patterns across the 2022-2024 cycle. Full pipeline from messy raw data to clean analytical views, all in SQL. No Python, no Excel, just good query design.',
    highlights: [
      'Multi-step data cleaning: deduplication, null handling, standardization',
      'Company and sector-level ranking by total layoffs',
      'Rolling 3-month trends using window functions',
      'Geographic breakdowns: US vs international layoff patterns',
      'Written up with annotated SQL for readability'
    ],
    skills: ['SQL', 'Data Cleaning', 'EDA', 'Window Functions', 'CTEs'],
    thumb: 'images/projects/sql-tech.webp',
    hover: 'images/projects/sql2.webp',
    link: 'https://better-lobster-21e.notion.site/SQL-Data-Cleaning-EDA-Layoffs-data-dbd0891e61454310901253c8faa767d3',
    linkLabel: 'Open on Notion'
  },
  {
    id: 'sql-remote',
    category: 'data',
    title: 'SQL: Top Paying Remote Data Jobs',
    shortDesc: 'A job market analysis using SQL to surface the highest-paying remote data roles, required skills, and salary patterns by title and tech stack.',
    fullDesc: 'Analyzed a public dataset of 2024 data job postings to identify the best-paying remote opportunities. Focused on what actually drives salary, the specific skills, tools, and titles that command premium compensation.',
    highlights: [
      'Filtered and ranked top 100 remote data roles by median salary',
      'Skill demand matrix: which tools appear most in high-salary postings',
      'Role-level comparison: Data Analyst vs Engineer vs Scientist pay gaps',
      'Multi-table joins to link job postings with skills and salary bands',
      'Insights documented on GitHub with clean, readable SQL'
    ],
    skills: ['SQL', 'JOINs', 'Aggregation', 'Data Analysis', 'GitHub'],
    thumb: 'images/projects/sql-remote.webp',
    hover: 'images/projects/job_salaries_chart.png',
    link: 'https://github.com/alanvourch/SQL-Project',
    linkLabel: 'View on GitHub'
  },

  // ── FILM & ENTERTAINMENT ─────────────────────────────
  {
    id: 'moviemate',
    category: 'film',
    title: 'MovieMate: Movie Web App',
    shortDesc: 'A React web app I built from scratch using my own 50k-movie database. Browse, filter, check box office results, upcoming releases, and movie news.',
    fullDesc: 'MovieMate started as a personal project to make sense of my movie dataset and turned into a fully functional web app. Users can search and filter movies, track box office performance, follow upcoming releases, and read curated movie news, all from a clean, fast interface.',
    highlights: [
      'Built with React, component architecture, hooks, routing',
      'Powered by my own TMDB-sourced 50k+ movie database',
      'Live box office data and upcoming release tracking',
      'Movie news aggregation from film media sources',
      'Deployed on Vercel, live and accessible'
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
    shortDesc: 'Analyzed Netflix\'s movie catalog to surface how genre trends, regional preferences, and audience ratings shape content investment decisions.',
    fullDesc: 'An analytical deep dive into Netflix\'s movie strategy through the lens of data. What genres dominate? Which regions are prioritized? How do audience ratings align with volume and investment patterns? Published as a data storytelling piece on Medium.',
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
    shortDesc: 'A daily-updated Kaggle dataset of 1 million movies, tracking box office, ratings, production data, and global trends at scale.',
    fullDesc: 'The backbone of most of my film projects. A comprehensive, daily-refreshed dataset of 1 million+ movies sourced from TMDB. Covers revenue, ratings, genres, languages, cast, crew, and production company, 30+ fields per title. Used by data analysts worldwide on Kaggle.',
    highlights: [
      '1 million+ movie records, updated daily via automated pipeline',
      '30+ data fields: revenue, budget, cast, crew, genres, ratings, languages',
      'Built the extraction and update pipeline from scratch (Python + TMDB API)',
      'One of the most comprehensive public movie datasets on Kaggle',
      'Used by the film data community for research and visualization projects'
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
    shortDesc: 'Tableau dashboard exploring box office performance by genre and decade, comparing revenues, IMDb ratings, and how audience taste has shifted over 60 years.',
    fullDesc: 'A visual deep dive into how movie genres have performed at the box office across six decades, and how audience ratings have tracked (or diverged from) commercial success. Built to show Tableau fluency and data storytelling together.',
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
    shortDesc: 'Interactive Power BI dashboard combining live box office and IMDb data, studio rankings, genre breakdowns, trend tracking across years.',
    fullDesc: 'A Power BI dashboard built on top of my movie dataset, combining live box office and IMDb data for dynamic, interactive analysis. Designed with an executive audience in mind, clear visuals, smart filtering, and fast drill-down.',
    highlights: [
      'Studio performance ranking by revenue, volume, and average rating',
      'Genre breakdowns with year-over-year trend comparisons',
      'Live IMDb rating integration alongside commercial performance',
      'Cross-filtering across all visuals, fully interactive',
      'Clean, executive-style layout'
    ],
    skills: ['Power BI', 'DAX', 'Data Modeling', 'Visualization'],
    thumb: 'images/projects/pbi-movie.webp',
    hover: 'images/projects/pbi_cinema.webp',
    link: 'https://app.powerbi.com/view?r=eyJrIjoiN2MzZjI5OTgtNmI2OC00ZDkzLWJjM2YtMWZmYmIyYzQzMWMzIiwidCI6Ijg5NTkwMmNlLTUzMWMtNDJjNi05YTMwLTA3YjRkZjUxYzNiMyJ9',
    linkLabel: 'Open in Power BI'
  },
  {
    id: 'a24-analysis',
    category: 'film',
    title: 'A24 Movies Analysis',
    shortDesc: "Deep analytical look at A24's film portfolio, what makes their strategy different, how their films perform, and what the data reveals about their creative and commercial formula.",
    fullDesc: "A24 is the most interesting studio of the last decade. This analysis digs into why, using data. Genre mix, budget strategy, box office vs critical reception, international performance, and talent patterns. Built as a serious analytical project, not a fan piece.",
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
    shortDesc: 'Automated Python pipeline that refreshes the Ultimate Movies Dataset daily with new releases and updated IMDb ratings. Set it up once, it runs itself.',
    fullDesc: 'Keeping a 1M+ movie dataset fresh requires automation. This pipeline runs daily, pulls new releases and rating updates from TMDB, and merges them into the master dataset without duplication or data loss. Designed for reliability over cleverness.',
    highlights: [
      'Automated scheduling via Kaggle notebooks, zero infrastructure overhead',
      'Incremental update logic: only processes changes, not full re-scrapes',
      'Deduplication and merge logic with conflict resolution',
      'Error handling and logging for pipeline reliability monitoring',
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
    shortDesc: 'The extraction engine behind the Ultimate Movies Dataset, collecting 1 million movies across 30 fields from the TMDB API with rate limiting and data quality controls.',
    fullDesc: 'This is the foundation of the entire movie data project. Pulling 1 million records from an API cleanly requires more than a simple loop, rate limiting, pagination, partial failure recovery, field normalization, and quality validation. All of that is handled here.',
    highlights: [
      'API-first design with rate limit handling and retry logic',
      'Paginated extraction covering 1M+ titles across all TMDB categories',
      '30 fields per movie: revenue, budget, cast, crew, genres, ratings, languages, production',
      'Field normalization and type validation built into the pipeline',
      'Designed to run once for the full extract, then the update pipeline takes over'
    ],
    skills: ['Python', 'API Engineering', 'Data Extraction', 'Pandas', 'Error Handling'],
    thumb: 'images/projects/extraction.webp',
    hover: 'images/projects/extraction1.webp',
    link: 'https://www.kaggle.com/code/alanvourch/tmdb-movies-data-extraction/notebook',
    linkLabel: 'View on Kaggle'
  }
];
