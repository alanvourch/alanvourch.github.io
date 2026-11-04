// Selected work appears first; earlier analyses remain available in the archive.
const projects = [
  {
    id: 'fpa-planning-model',
    category: 'finance',
    featured: true,
    title: 'SaaS hiring and cloud investment plan',
    shortDesc: 'Compared six hiring and cloud options. Recommended phased hiring with a one-year cloud commitment to meet the cash and margin limits.',
    fullDesc: 'A synthetic planning case for a USD 24M ARR software company. I compared three hiring plans and two cloud options across base, upside and downside scenarios. The recommendation balances revenue growth with an 18-month downside runway floor and a 74% forecast gross margin floor. The case includes a CFO memo, a board pack and an Excel export; Python runs the planning engine.',
    highlights: [
      'Recommended 22 planned hires from October 2026 to May 2027 and a one-year cloud commitment. Base-case ARR reaches USD 40.5M by February 2028; minimum downside runway is about 23 months',
      'Hiring 29 people up front adds USD 1.7M of ARR but misses the downside runway floor by 1.1 months',
      'On-demand cloud pricing takes gross margin down to 72.9%. The commitment saves USD 0.8M over 18 months, even after USD 178k of unused units in the downside case',
      'Phased hiring uses USD 4.5M more cash than holding hiring and produces USD 2.2M more ARR',
      'With the original 12-month runway floor, the model selects front-loaded hiring. Raising the floor to 18 months changes the answer',
      'The CFO memo, board pack and Excel workbook all use the same model. Automated checks reconcile hires, cash and the bridge'
    ],
    skills: ['Driver-Based Planning', 'Headcount Planning', 'Scenario Analysis', 'Cash Runway', 'SaaS Metrics', 'Excel', 'Python'],
    thumb: 'images/projects/fpa-planning-thumb.webp',
    hover: 'images/projects/fpa-planning-card.webp',
    link: 'https://alanvourch.com/fpa-planning-model/',
    linkLabel: 'Open the case study',
    type: 'Synthetic case study',
    archived: false,
    preview: {
      eyebrow: 'Resource allocation',
      headline: 'Phased hiring with a cloud commitment',
      metrics: [
        {
          value: '22',
          label: 'planned hires'
        },
        {
          value: '23 months',
          label: 'minimum downside runway'
        }
      ],
      note: 'Recommended plan · synthetic SaaS case'
    },
    resources: [
      {
        label: 'CFO memo (PDF)',
        url: 'https://alanvourch.com/fpa-planning-model/assets/cfo_memo.pdf'
      },
      {
        label: 'Excel workbook',
        url: 'https://alanvourch.com/fpa-planning-model/assets/northlight_planning_model.xlsx'
      }
    ]
  },
  {
    id: 'fpa-agent-team',
    category: 'finance',
    featured: true,
    title: 'Budget vs actual review and forecast',
    shortDesc: 'A monthly management review with variance analysis, a provisional forecast and business-line reports. Source checks and analyst approval remain visible.',
    fullDesc: 'EventCo is a fictional events agency. The workflow combines Python calculations and checks with AI-assisted investigation and drafting. It prepares business-line reports, a provisional forecast and a management pack for analyst review. Missing source values and an unusual billings entry remain explicit: estimates are not corrected accounting amounts. Historical effects are adjusted only with evidence and approval. The published page shows a recorded agent run on synthetic data.',
    highlights: [
      'FY2025 provisional operating result of about €2.4M against a €4.8M budget comparator; both include estimated cells',
      'Nineteen historical material variances, with documented notes, illustrative analyst explanations and unresolved items kept distinct',
      'An unusual November billings entry requires source verification; the report identifies the unapproved budget placeholder',
      'A three-month provisional forecast with historical holdout comparisons and visible assumptions',
      'Business-line reviews separate payroll into headcount and rate, and billings into volume and price/mix; decompositions do not independently establish causes',
      'The management pack remains a draft pending analyst review'
    ],
    skills: ['Variance Analysis', 'Management Reporting', 'Rolling Forecast', 'Data Controls', 'Python', 'AI Workflows'],
    thumb: 'images/projects/fpa-close-thumb.webp',
    hover: 'images/projects/fpa-close-card.webp',
    link: 'https://alanvourch.com/fpa-project/',
    linkLabel: 'Open the case study',
    type: 'Synthetic case study',
    archived: false,
    preview: {
      eyebrow: 'Monthly management review',
      headline: 'Variance analysis and a provisional forecast',
      metrics: [
        {
          value: '19',
          label: 'historical material variances'
        },
        {
          value: '3 months',
          label: 'provisional forecast'
        }
      ],
      note: 'Synthetic data · reports pending analyst review'
    },
    resources: [
      {
        label: 'Business-line report (PDF)',
        url: 'https://alanvourch.com/fpa-project/assets/brand_events.pdf'
      },
      {
        label: 'Forecast and assumptions',
        url: 'https://alanvourch.com/fpa-project/reports/forecast_report.html'
      }
    ]
  },
  {
    id: 'fpa-dashboard',
    category: 'finance',
    title: 'Power BI management reporting',
    shortDesc: 'Project margin, payroll and headcount reporting, with views tailored to Finance, executives and business managers.',
    fullDesc: 'Management needed a single view of project margin and payroll across the business. I built the business and payroll databases, then the Power BI reports on top. Each manager had a restricted view of their own teams. I presented the reports to the executive and finance teams during my final months at the company, so I did not see their long-term use. The published version is a selection rebuilt with synthetic data. Some pages were added and others left out. It is best viewed on a computer.',
    highlights: [
      'Built the business and payroll databases in-house, then connected the Power BI reports',
      'Covered project margin, activity, teams and clients, with a restricted view for each manager',
      'Presented the reports to the executive and finance teams during my final months at the company',
      'Rebuilt a selection of the original dashboards with synthetic data'
    ],
    skills: ['Power BI', 'Management Reporting', 'Payroll & Headcount', 'Data Modeling', 'DAX'],
    thumb: 'images/projects/pbi-activity.webp',
    hover: 'images/projects/pbi-manager.webp',
    link: 'https://app.powerbi.com/view?r=eyJrIjoiM2VjMmRkMjItN2IxYS00MDliLWIxM2QtYmIzYjAzNmMxMWVkIiwidCI6Ijg5NTkwMmNlLTUzMWMtNDJjNi05YTMwLTA3YjRkZjUxYzNiMyJ9',
    linkLabel: 'Open in Power BI (desktop)',
    type: 'Professional work rebuilt with synthetic data',
    archived: false,
    resources: []
  },
  {
    id: 'scaleup-expenses',
    category: 'finance',
    title: 'Fintech workforce planning case',
    shortDesc: 'Rebuilt a P&L from ledger data and costed a Q3 hiring plan, including contractor savings and monthly cost to serve.',
    fullDesc: 'I prepared this business case for an FP&A Expenses Manager role at a fintech scale-up using synthetic data. I rebuilt three months of general ledger data into a monthly P&L, defined cost to serve and explained its movement. I then costed a Q3 plan to hire 50 engineers and 20 customer success representatives alongside a 20% reduction in contractors. The final page gives the leadership team a clear recommendation.',
    highlights: [
      'Rebuilt the P&L from three months of general ledger data and documented the account mapping',
      'Cost to serve down 11.8% from January to February and up 2.8% in March, explained by onboarding spend, headcount and customer growth',
      'Q3 hiring plan costed month by month, with contractor savings set against new hire costs',
      'Recommended quarterly hiring linked to customer growth and a different employee/contractor mix; implementation would require review of the skills and capacity needed'
    ],
    skills: ['Workforce Planning', 'Cost to Serve', 'P&L Build', 'Excel'],
    thumb: 'images/projects/businesscase_hover.webp',
    hover: 'images/projects/businesscase_hover.webp',
    link: 'https://better-lobster-21e.notion.site/Business-Case-Strategic-Workforce-Planning-for-a-Hypergrowth-Fintech-239a918b45eb8089a6c6fdb737f6cd5f',
    linkLabel: 'Open on Notion',
    type: 'Synthetic business case',
    archived: false
  },
  {
    id: 'retail-forecast',
    category: 'data',
    title: 'Daily retail sales forecasting',
    shortDesc: 'A practical forecasting guide using public retail data, from trend and seasonality to lag features and a linear plus XGBoost model.',
    fullDesc: 'This is a practical forecasting walkthrough using public retail data from Kaggle. The 11-minute Medium guide starts with trend and seasonality, then adds recent history, promotions and holidays. It finishes with a hybrid model and forecasts across several future periods.',
    highlights: [
      'Trend with moving averages and polynomial regression',
      'Seasonality with indicator variables and Fourier terms',
      'Lag features, promotions and holidays as regressors',
      'Linear regression and XGBoost hybrid, with forecasts across several periods using the DirRec strategy',
      'A learning walkthrough on public data, rather than a production forecast or a claim of performance in a new business'
    ],
    skills: ['Python', 'Time Series', 'XGBoost', 'Pandas', 'Scikit-learn'],
    thumb: 'images/projects/forecast.webp',
    hover: 'images/projects/forecast2.webp',
    link: 'https://medium.com/@alan.vourch/forecasting-a-practical-guide-6173f421c1ed',
    linkLabel: 'Read on Medium',
    type: 'Public-data analysis',
    archived: false
  },
  {
    id: 'hr-predictor',
    category: 'data',
    title: 'Employee attrition analysis',
    shortDesc: 'Compared classification models on a public HR dataset. The final random forest achieved 90% recall on its holdout sample.',
    fullDesc: 'I cleaned a public HR dataset, removing 3,008 duplicate rows before comparing logistic regression, a decision tree and a random forest. The final random forest excluded the self-reported satisfaction score and achieved 96% accuracy, 90% recall and 94% AUC on the holdout sample. Project count, evaluation score and tenure were associated with departures. These results describe this dataset: they do not establish why employees left or validate individual employment decisions.',
    highlights: [
      'All 145 records with seven assigned projects were departures; this association does not establish a causal workload effect',
      'The final random forest excluded satisfaction score; its collection timing would need validation before use in a prospective model',
      'Compared logistic regression and tree models on the same split',
      'Removed duplicates before fitting the models',
      'Suggested further investigation of workload, tenure and overtime expectations, rather than treating model associations as proven interventions'
    ],
    skills: ['Python', 'Machine Learning', 'Classification', 'Pandas', 'HR Analytics'],
    thumb: 'images/projects/hr2.webp',
    hover: 'images/projects/hr-feature-importance.webp',
    link: 'https://www.kaggle.com/code/alanvourch/salifort-motors-hr-analysis',
    linkLabel: 'Open on Kaggle',
    type: 'Public-data analysis',
    archived: false
  },
  {
    id: 'sql-remote',
    category: 'data',
    title: 'SQL analysis of top-paying remote data analyst jobs',
    shortDesc: 'Five SQL queries answer which remote data analyst roles paid the most in 2023, which skills commanded the highest salaries and which were most in demand.',
    fullDesc: 'I used PostgreSQL to analyse a public dataset of 2023 data analyst job postings. The queries compare remote salaries, the skills attached to the highest-paying roles and the skills employers requested most often.',
    highlights: [
      'Ranked the 10 highest-paying remote data analyst roles by average annual salary',
      'Identified the skills required for those roles',
      'Compared the most requested skills with the highest-paying ones',
      'Found the skills that combine strong demand with high salaries',
      'Used joins and CTEs across job, company and skills tables, with the queries documented on GitHub'
    ],
    skills: ['SQL', 'PostgreSQL', 'JOINs', 'CTEs', 'Data Analysis'],
    thumb: 'images/projects/sql-remote.webp',
    hover: 'images/projects/job_salaries_chart.png',
    link: 'https://github.com/alanvourch/SQL-Project',
    linkLabel: 'View on GitHub',
    type: 'Public-data analysis',
    archived: true
  },
  {
    id: 'sql-tech',
    category: 'data',
    title: 'SQL analysis of tech layoffs',
    shortDesc: 'I cleaned and analysed public tech layoff data in SQL to compare trends across companies, sectors and regions.',
    fullDesc: 'I used SQL to turn raw public layoff data into clean analytical views, then examined how workforce reductions changed across companies, sectors and regions from 2022 to 2024.',
    highlights: [
      'Cleaned duplicates, handled missing values and standardized the raw fields',
      'Ranked companies and sectors by total layoffs',
      'Rolling 3-month trends using window functions',
      'Compared layoff patterns in the US with other markets',
      'Documented the analysis with annotated SQL'
    ],
    skills: ['SQL', 'Data Cleaning', 'EDA', 'Window Functions', 'CTEs'],
    thumb: 'images/projects/sql-tech.webp',
    hover: 'images/projects/sql2.webp',
    link: 'https://better-lobster-21e.notion.site/SQL-Data-Cleaning-EDA-Layoffs-data-dbd0891e61454310901253c8faa767d3',
    linkLabel: 'Open on Notion',
    type: 'Public-data analysis',
    archived: true
  },
  {
    id: 'moviemate',
    category: 'film',
    title: 'MovieMate: film discovery app',
    shortDesc: 'Built and maintain a film discovery app with search, filters, box office results, upcoming releases and film news.',
    fullDesc: 'MovieMate began as a way to explore my movie dataset and grew into a working film discovery app. I built the interface and data integrations, then iterated on search, filters and the mobile experience. Users can explore films, follow box office results, check upcoming releases and read film news.',
    highlights: [
      'Search and filters backed by a TMDB-sourced movie database',
      'Box office results, upcoming releases and film news in one application',
      'Ongoing work on navigation, readability and mobile use',
      'React and API integrations, deployed on Vercel'
    ],
    skills: ['React', 'JavaScript', 'API Integration', 'UI/UX', 'Vercel'],
    thumb: 'images/projects/moviemate-thumb.webp',
    hover: 'images/projects/moviemate_hover.webp',
    link: 'https://themoviemate.vercel.app/',
    linkLabel: 'Open the live app',
    type: 'Personal application',
    archived: false
  },
  {
    id: 'netflix',
    category: 'film',
    title: 'Netflix catalogue analysis',
    shortDesc: 'Explored the catalogue by genre, country, release year and audience rating.',
    fullDesc: 'An exploratory analysis of Netflix catalogue composition and audience ratings. I compared title counts across genres, countries and release years. Catalogue volume does not measure content investment, and audience ratings are not a complete measure of quality or commercial success.',
    highlights: [
      'Compared more than 8,000 catalogue titles across genres, countries and release years',
      'Tracked genre shares and regional title counts',
      'Compared audience ratings with release volume',
      'Published the analysis and charts on Medium'
    ],
    skills: ['Python', 'Pandas', 'Matplotlib', 'Data Visualization', 'Storytelling'],
    thumb: 'images/projects/netflix.jpg',
    hover: 'images/projects/netflix-verso.png',
    link: 'https://medium.com/@alan.vourch/netflix-by-the-numbers-a-content-strategy-perspective-4fb88789f476',
    linkLabel: 'Read on Medium',
    type: 'Public-data analysis',
    archived: true
  },
  {
    id: 'movies-dataset',
    category: 'film',
    title: 'Movie dataset and daily pipeline',
    shortDesc: 'Built a public dataset of more than one million films, with an automated Python pipeline for extraction, updates and data checks.',
    fullDesc: 'A public TMDB-sourced dataset covering more than one million films and over 30 fields, including revenue, budgets, ratings, genres, languages, cast and crew. I built the initial extraction and the daily update pipeline in Python. The work handles rate limits, partial failures, duplicates and field validation. Current usage figures and update history are available on Kaggle.',
    highlights: [
      'More than one million film records, with a scheduled daily update pipeline',
      'Initial extraction handles pagination, API rate limits and recovery after partial failures',
      'Incremental updates process new and changed records, with merge checks and error logging',
      'Supports my film analyses and MovieMate; dataset access and current usage figures are public on Kaggle'
    ],
    skills: ['Python', 'API', 'Data Engineering', 'Kaggle', 'Pandas'],
    thumb: 'images/projects/moviedataset.webp',
    hover: 'images/projects/dataset4.webp',
    link: 'https://www.kaggle.com/datasets/alanvourch/tmdb-movies-daily-updates/data',
    linkLabel: 'Explore the dataset on Kaggle',
    type: 'Personal data project',
    archived: false,
    resources: [
      {
        label: 'Daily update code',
        url: 'https://www.kaggle.com/code/alanvourch/tmdb-movies-daily-update/notebook'
      },
      {
        label: 'Initial extraction code',
        url: 'https://www.kaggle.com/code/alanvourch/tmdb-movies-data-extraction/notebook'
      }
    ]
  },
  {
    id: 'tableau-boxoffice',
    category: 'film',
    title: 'Tableau: box office and IMDb trends',
    shortDesc: 'A Tableau dashboard comparing box office revenue and IMDb ratings by genre and decade over 60 years.',
    fullDesc: 'The dashboard follows box office performance by genre across six decades and compares commercial results with audience ratings. Box office revenue is not profit, and comparisons across decades require care with inflation and data coverage.',
    highlights: [
      'Animated view of genre revenue over the historical period covered by the dataset',
      'Comparison of IMDb ratings with box office results',
      'Genre market share by decade',
      'Interactive filters for genre, decade and budget tier',
      'Published on Tableau Public'
    ],
    skills: ['Tableau', 'Data Visualization', 'Storytelling', 'Film Data'],
    thumb: 'images/projects/tableaucine.webp',
    hover: 'images/projects/tableaubo2.webp',
    link: 'https://public.tableau.com/app/profile/alan.vourch/viz/BoxOfficeHitsbyGenreandDecade/Dashboard',
    linkLabel: 'Open in Tableau',
    type: 'Public-data analysis',
    archived: true
  },
  {
    id: 'pbi-cinema',
    category: 'film',
    title: 'Power BI cinema dashboard',
    shortDesc: 'A Power BI dashboard that ranks studios and tracks box office and IMDb results across genres and years.',
    fullDesc: 'I built this Power BI dashboard on my film dataset. It combines box office and IMDb data, with filters and drill-downs for studios, genres and years.',
    highlights: [
      'Ranks studio performance by revenue, volume and average rating',
      'Genre breakdowns with year-over-year trend comparisons',
      'IMDb ratings alongside commercial performance',
      'Cross-filters every visual on the page'
    ],
    skills: ['Power BI', 'DAX', 'Data Modeling', 'Visualization'],
    thumb: 'images/projects/pbi-movie.webp',
    hover: 'images/projects/pbi_cinema.webp',
    link: 'https://app.powerbi.com/view?r=eyJrIjoiN2MzZjI5OTgtNmI2OC00ZDkzLWJjM2YtMWZmYmIyYzQzMWMzIiwidCI6Ijg5NTkwMmNlLTUzMWMtNDJjNi05YTMwLTA3YjRkZjUxYzNiMyJ9&pageName=5981d12bcd3a65531c02',
    linkLabel: 'Open in Power BI',
    type: 'Public-data analysis',
    archived: true
  },
  {
    id: 'a24-analysis',
    category: 'film',
    title: 'A24 film analysis',
    shortDesc: 'An analysis of more than 130 A24 films, covering genres, budgets, box office, reviews and recurring talent.',
    fullDesc: 'I analysed A24\'s catalogue to understand its genre mix, budget choices, box office performance, critical reception and recurring creative talent. Revenue-to-budget multiples do not account for marketing, distribution shares or all other costs, so they are not measures of net profitability.',
    highlights: [
      'Analysed more than 130 A24 films across genres, years and budget levels',
      'Compared revenue multiples with major studios',
      'Compared critical reception with commercial performance',
      'Mapped recurring directors and actors',
      'Tracked changes in A24\'s genre mix across the dataset\'s release years'
    ],
    skills: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Data Analysis'],
    thumb: 'images/projects/a24.jpg',
    hover: 'images/projects/a241.webp',
    link: 'https://www.kaggle.com/code/alanvourch/a24-movies-analysis',
    linkLabel: 'Open on Kaggle',
    type: 'Public-data analysis',
    archived: true
  },
  {
    id: 'movies-update',
    category: 'film',
    title: 'Daily update pipeline for the movies dataset',
    shortDesc: 'A Python pipeline that refreshes about 500 film records each day with new releases and updated ratings.',
    fullDesc: 'The pipeline runs every day, pulls new releases and rating changes from TMDB, then merges them into the dataset of more than 1 million films without duplicates or lost records.',
    highlights: [
      'Runs on a schedule in Kaggle notebooks without separate infrastructure',
      'Processes only new and changed records instead of scraping the full dataset again',
      'Handles duplicates and conflicting updates during the merge',
      'Logs errors and run status',
      'Processes more than 500 new or updated records on a typical day'
    ],
    skills: ['Python', 'API', 'Pipeline Engineering', 'Automation', 'Pandas'],
    thumb: 'images/projects/update.webp',
    hover: 'images/projects/update1.webp',
    link: 'https://www.kaggle.com/code/alanvourch/tmdb-movies-daily-update/notebook',
    linkLabel: 'View the pipeline on Kaggle',
    type: 'Public-data analysis',
    archived: false,
    bundledInto: 'movies-dataset'
  },
  {
    id: 'movies-extraction',
    category: 'film',
    title: 'Movie data extraction',
    shortDesc: 'The initial extraction behind the movies dataset: more than 1 million titles and 30 fields from the TMDB API, with rate limits and data-quality checks built in.',
    fullDesc: 'This was the first full extraction for the dataset. It pulled more than 1 million records from the TMDB API and handled rate limits, pagination and recovery after partial failures. The process also standardized and validated each field.',
    highlights: [
      'Handles API rate limits and retries failed requests',
      'Uses pagination to extract more than 1 million titles across TMDB categories',
      'Collects 30 fields per film, including revenue, budget, cast, crew, genres, ratings and languages',
      'Standardizes fields and validates data types during extraction',
      'Runs once for the full extract, after which the daily update pipeline takes over'
    ],
    skills: ['Python', 'API Engineering', 'Data Extraction', 'Pandas', 'Error Handling'],
    thumb: 'images/projects/extraction.webp',
    hover: 'images/projects/extraction1.webp',
    link: 'https://www.kaggle.com/code/alanvourch/tmdb-movies-data-extraction/notebook',
    linkLabel: 'View on Kaggle',
    type: 'Public-data analysis',
    archived: false,
    bundledInto: 'movies-dataset'
  }
];
