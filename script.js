// Cache common elements for performance
const navbar = document.getElementById('navbar');
const header = document.getElementById('header');
const navLinks = document.querySelectorAll('.nav-link');
const hamburgerBtn = document.getElementById('hamburger-btn');
const hamburgerIcon = document.getElementById('hamburger-icon');
const closeBtn = document.getElementById('close-btn');
const closeIcon = document.getElementById('close-icon');
const mobileMenuPanel = document.getElementById('mobile-menu-panel');

/* Smooth Scroll */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

/* IntersectionObserver for Section Fade-In */
const sections = document.querySelectorAll('.section');
const observerOptions = { threshold: 0.05 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);
sections.forEach(section => observer.observe(section));

/* Unified Scroll Handler for Navbar */
function updateNavbar() {
  const scrollPosition = window.scrollY;
  const headerHeight = header.offsetHeight;
  const opacity = Math.min(scrollPosition / headerHeight, 1);

  if (scrollPosition > headerHeight - 100) {
    navbar.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
    navLinks.forEach(link => {
      link.style.color = `rgba(0, 0, 0, ${opacity})`;
      link.style.textShadow = 'none';
    });
    hamburgerIcon.style.color = '#333';
  } else {
    navbar.style.backgroundColor = 'transparent';
    navLinks.forEach(link => {
      link.style.color = 'white';
      link.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.75)';
    });
    hamburgerIcon.style.color = 'white';
  }
}

window.addEventListener('scroll', updateNavbar);

/* Close mobile menu on scroll if open */
window.addEventListener('scroll', () => {
  if (mobileMenuPanel.classList.contains('translate-x-0')) {
    mobileMenuPanel.classList.remove('translate-x-0');
    hamburgerIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
});

/* Mobile Menu Toggle */
function toggleMobileMenu() {
  mobileMenuPanel.classList.toggle('translate-x-0');
  hamburgerIcon.classList.toggle('hidden');
  closeIcon.classList.toggle('hidden');
  document.body.classList.toggle('overflow-hidden');
}

hamburgerBtn.addEventListener('click', toggleMobileMenu);
mobileMenuPanel.querySelectorAll('a').forEach(link => link.addEventListener('click', toggleMobileMenu));

document.addEventListener('click', (event) => {
  if (!mobileMenuPanel.contains(event.target) && !hamburgerBtn.contains(event.target)) {
    if (mobileMenuPanel.classList.contains('translate-x-0')) {
      toggleMobileMenu();
    }
  }
});

closeBtn.addEventListener('click', () => {
  mobileMenuPanel.classList.remove('translate-x-0');
  hamburgerIcon.classList.remove('hidden');
  closeIcon.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
});

/* Skill Filter Toggle */
document.querySelectorAll('.skill-filter').forEach(skill => {
  skill.addEventListener('click', function () {
    const skillName = this.dataset.skill;
    const isActive = this.classList.contains('active');

    document.querySelectorAll('.skill-filter').forEach(s => s.classList.remove('active'));
    if (!isActive) this.classList.add('active');

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(project => {
      project.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      project.style.opacity = 0;
      project.style.transform = 'translateY(20px)';
    });

    setTimeout(() => {
      projectCards.forEach(project => {
        if (!isActive && !project.dataset.skill.includes(skillName)) {
          project.style.display = 'none';
        } else {
          project.style.display = 'block';
          requestAnimationFrame(() => {
            project.style.opacity = 1;
            project.style.transform = 'translateY(0)';
          });
        }
      });
    }, 500);
  });
});

function toggleCode(button) {
  const codeBlock = button.nextElementSibling;
  const isVisible = codeBlock.style.display === 'block';
  codeBlock.style.display = isVisible ? 'none' : 'block';
  button.textContent = isVisible ? 'Show Code' : 'Hide Code';
}


// ───────────────────────────────────────────────────────
// Project data array: add/remove/edit entries here

const projects = [


  {
    id: 'scaleup-expenses',
    title: ' FP&A Business Case - FinTech Scaleup',
    description: `This business case replicates the real-life responsibilities of an FP&A Expenses Manager in a FinTech scaleup.
    It covers P&L modeling, 
     cost-to-serve analysis, management reporting, budget planning, and exec-ready slides.`,
    skills: ['Financial Modeling', 'Data Analysis'],
    thumb: 'images/projects/businesscase_thumb.webp',
    hover: 'images/projects/businesscase_hover.webp',
    link: 'https://better-lobster-21e.notion.site/Business-Case-Strategic-Workforce-Planning-for-a-Hypergrowth-Fintech-239a918b45eb8089a6c6fdb737f6cd5f',
    linkLabel: 'Explore Business Case on Notion'
  },
  {
    id: 'fpa-dashboard',
    title: 'Power BI - FP&A Dashboard',
    description: 'A Power BI dashboard I built while working as FP&A Manager at a major event company. It connects business and payroll databases to track performance and support decision-making for senior leadership and operational managers.',
    skills: ['Power BI', 'Data Analysis', 'Financial Modeling'],
    thumb: 'images/projects/fpadash.webp',
    hover: 'images/projects/pbi_fpa.webp',
    link: 'https://app.powerbi.com/view?r=eyJrIjoiM2VjMmRkMjItN2IxYS00MDliLWIxM2QtYmIzYjAzNmMxMWVkIiwidCI6Ijg5NTkwMmNlLTUzMWMtNDJjNi05YTMwLTA3YjRkZjUxYzNiMyJ9',
    linkLabel: 'Explore Power BI Dashboard'
  },
    {
    id: 'sql-tech',
    title: 'SQL - Tech Layoffs Analysis',
    description: 'Using SQL, I explored public datasets on recent tech layoffs to surface trends around workforce shifts. The project sheds light on how companies adapt their staffing strategies during periods of change.',
    skills: ['SQL', 'Data Analysis', 'Financial Modeling'],
    thumb: 'images/projects/sql-tech.webp',
    hover: 'images/projects/sql2.webp',
    link: 'https://better-lobster-21e.notion.site/SQL-Data-Cleaning-EDA-Layoffs-data-dbd0891e61454310901253c8faa767d3',
    linkLabel: 'Explore Notion Page'
  },
    {
    id: 'retail-forecast',
    title: 'Time Series Forecasting',
    description: 'A forecasting project based on real retail sales data, walking through methods from simple trend models to machine learning hybrids. It shows how businesses can identify patterns and forecast sales to make more informed decisions.',
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'Financial Modeling'],
    thumb: 'images/projects/forecast.webp',
    hover: 'images/projects/forecast2.webp',
    link: 'https://medium.com/@alan.vourch/forecasting-a-practical-guide-6173f421c1ed',
    linkLabel: 'Explore Medium Article'
  },
    {
    id: 'hr-predictor',
    title: 'HR Insights & Predictive Model',
    description: 'A project that uses machine learning to predict employee turnover and identify the main factors behind it. It shows how predictive analytics can be applied to real HR challenges.',
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'Financial Modeling'],
    thumb: 'images/projects/hr.webp',
    hover: 'images/projects/hr2.webp',
    link: 'https://www.kaggle.com/code/alanvourch/salifort-motors-hr-analysis',
    linkLabel: 'Explore HR Insights Notebook'
  },
  {
    id: 'moviemate',
    title: 'MovieMate: Movie Web App',
    description: 'I made a React web app built from my own custom database of 50,000 movies. Users can filter titles, check box office results, see upcoming releases, and read the latest movie news.',
    skills: ['Web Development', 'Data Analysis'],
    thumb: 'images/projects/moviemate-thumb.webp',
    hover: 'images/projects/moviemate_hover.webp',
    link: 'https://themoviemate.vercel.app/',
    linkLabel: 'Explore MovieMate'
  },
  {
    id: 'netflix',
    title: 'Netflix Content Strategy Analysis',
    description: 'An analysis of Netflix’s movie catalog exploring how audience trends, genres, and regional preferences shape its content strategy. Through data visualizations, the project uncovers patterns in what people watch and how that guides investment decisions.',
    skills: ['Data Analysis', 'Data Visualization', 'Python'],
    thumb: 'images/projects/netflix.jpg',
    hover: 'images/projects/netflix-verso.png',
    link: 'https://medium.com/@alan.vourch/netflix-by-the-numbers-a-content-strategy-perspective-4fb88789f476',
    linkLabel: 'Explore Medium Article'
  },

  {
    id: 'sql-remote',
    title: 'SQL - Top Paying Remote Data Jobs',
    description: 'A SQL-based analysis of the current job market to identify top-paying remote data roles. The project highlights salary ranges, key skills, and hiring trends to help analysts better navigate career opportunities.',
    skills: ['SQL', 'Data Analysis'],
    thumb: 'images/projects/sql-remote.webp',
    hover: 'images/projects/job_salaries_chart.png',
    link: 'https://github.com/alanvourch/SQL-Project',
    linkLabel: 'Explore GitHub Repository'
  },
  {
    id: 'movies-dataset',
    title: 'Ultimate Movies Dataset',
    description: 'A daily-updated dataset of 1 million movies, tracking global trends, box office results, and production strategies. Built to support deep film analysis and demonstrate large-scale data handling.',
    skills: ['Python', 'Data Analysis'],
    thumb: 'images/projects/moviedataset.webp',
    hover: 'images/projects/dataset4.webp',
    link: 'https://www.kaggle.com/datasets/alanvourch/tmdb-movies-daily-updates/data',
    linkLabel: 'Explore Kaggle Dataset'
  },
  {
    id: 'tableau-boxoffice',
    title: 'Tableau - Box Office & IMDb Trends',
    description: 'A Tableau report exploring box office hits by genre and decade, comparing revenues and IMDb ratings to reveal how audience preferences and market trends have evolved over time.',
    skills: ['Tableau', 'Data Analysis'],
    thumb: 'images/projects/tableaucine.webp',
    hover: 'images/projects/tableaubo2.webp',
    link: 'https://public.tableau.com/app/profile/alan.vourch/viz/BoxOfficeHitsbyGenreandDecade/Dashboard',
    linkLabel: 'Explore Tableau Report'
  },
  {
    id: 'pbi-cinema',
    title: 'Power BI - Cinema Dashboard',
    description: 'An interactive Power BI dashboard built on my movie dataset, combining live box office and IMDb data. It highlights key trends, studio performance, and genre breakdowns through clear, dynamic visuals.',
    skills: ['Power BI', 'Data Analysis'],
    thumb: 'images/projects/pbi-movie.webp',
    hover: 'images/projects/pbi_cinema.webp',
    link: 'https://app.powerbi.com/view?r=eyJrIjoiN2MzZjI5OTgtNmI2OC00ZDkzLWJjM2YtMWZmYmIyYzQzMWMzIiwidCI6Ijg5NTkwMmNlLTUzMWMtNDJjNi05YTMwLTA3YjRkZjUxYzNiMyJ9',
    linkLabel: 'Explore Power BI Dashboard'
  },
  {
    id: 'a24-analysis',
    title: 'A24 Movies Analysis',
    description: "An analysis of A24’s distinctive movie portfolio, uncovering patterns and insights about the studio's strategy, creative direction, and market positioning using extensive data analysis.",
    skills: ['Python', 'Data Analysis', 'Financial Modeling', 'Data Visualization'],
    thumb: 'images/projects/a24.jpg',
    hover: 'images/projects/a241.webp',
    link: 'https://www.kaggle.com/code/alanvourch/a24-movies-analysis',
    linkLabel: 'Explore A24 Movies Notebook'
  },

  {
    id: 'movies-update',
    title: 'Movies Dataset Daily Update',
    description: 'I built an automated Python pipeline that updates my movie dataset daily with the latest IMDb ratings and new releases, keeping it ready for up-to-date analysis.',
    skills: ['Python', 'Data Analysis'],
    thumb: 'images/projects/update.webp',
    hover: 'images/projects/update1.webp',
    link: 'https://www.kaggle.com/code/alanvourch/tmdb-movies-daily-update/notebook',
    linkLabel: 'Explore Update Project Notebook'
  },
  {
    id: 'movies-extraction',
    title: 'Movies Data Extraction',
    description: 'This is the process behind the Ultimate Movies Dataset, collecting 1 million movies across 30 fields with a focus on accuracy, detail, and easy analysis.',
    skills: ['Python', 'Data Analysis'],
    thumb: 'images/projects/extraction.webp',
    hover: 'images/projects/extraction1.webp',
    link: 'https://www.kaggle.com/code/alanvourch/tmdb-movies-data-extraction/notebook',
    linkLabel: 'Explore Movies Extraction Notebook'
  }
];

// Render function: populates #projects-grid
function renderProjects() {
  const container = document.getElementById('projects-grid');
  container.innerHTML = projects.map(p => `
    <article id="proj-${p.id}"
             class="project-card h-full flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
             data-skill="${p.skills.join(',')}">
      <div class="project-image-container relative w-full pt-[56.25%] overflow-hidden">
        <img src="${p.thumb}" alt="${p.title} Thumbnail"
             class="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500">
        <img src="${p.hover}" alt="${p.title} Hover"
             class="absolute top-0 left-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 hover:opacity-100">
      </div>
      <div class="p-6 flex flex-col flex-1">
        <h3 class="text-xl font-semibold mb-2">${p.title}</h3>
        <p class="text-gray-700 mb-4 flex-grow">${p.description}</p>
        <a href="${p.link}" target="_blank" rel="noopener noreferrer"
           class="text-blue-600 font-semibold hover:underline mt-auto">${p.linkLabel}</a>
      </div>
    </article>
  `).join('');
}

// Call on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
});
