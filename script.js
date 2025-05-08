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
    id: 'moviemate',
    title: 'MovieMate: Movie Web App',
    description: 'A responsive React web app built from scratch, featuring a customized database of 50,000 movies. Users can easily filter films, track the latest box office hits, preview upcoming releases, and get the latest news, providing an immersive movie-browsing experience.',
    skills: ['Web Development', 'Data Analysis'],
    thumb: 'images/projects/moviemate_thumb.png',
    hover: 'images/projects/moviemate_hover.png',
    link: 'https://themoviemate.vercel.app/',
    linkLabel: 'Explore MovieMate'
  },
  {
    id: 'netflix',
    title: 'Netflix Content Strategy Analysis',
    description: 'A detailed exploration of Netflix’s movie catalogue, uncovering audience trends and strategic insights using advanced data visualization techniques. This analysis provides clarity on how genres, regions, and viewer preferences shape Netflix’s global strategy.',
    skills: ['Data Analysis', 'Data Visualization', 'Python'],
    thumb: 'images/projects/netflix.jpg',
    hover: 'images/projects/netflix-verso.png',
    link: 'https://medium.com/@alan.vourch/netflix-by-the-numbers-a-content-strategy-perspective-4fb88789f476',
    linkLabel: 'Explore Medium Article'
  },
  {
    id: 'fpa-dashboard',
    title: 'Power BI - FP&A Dashboard',
    description: 'A comprehensive FP&A dashboard made during my tenure as an FP&A Manager at a leading event management firm. Using structured financial data visualization, it clearly demonstrates performance monitoring and supports informed decision-making.',
    skills: ['Power BI', 'Data Analysis', 'Financial Modeling'],
    thumb: 'images/projects/imitationgame.webp',
    hover: 'images/projects/pbi_fpa.png',
    link: 'https://app.powerbi.com/view?r=eyJrIjoiM2VjMmRkMjItN2IxYS00MDliLWIxM2QtYmIzYjAzNmMxMWVkIiwidCI6Ijg5NTkwMmNlLTUzMWMtNDJjNi05YTMwLTA3YjRkZjUxYzNiMyJ9',
    linkLabel: 'Explore Power BI Dashboard'
  },
  {
    id: 'hr-predictor',
    title: 'HR Insights & Predictive Model',
    description: 'This project utilizes machine learning to predict employee turnover, pinpointing key factors influencing retention. It effectively demonstrates the practical application of predictive analytics to HR challenges.',
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'Financial Modeling'],
    thumb: 'images/projects/hr.jpg',
    hover: 'images/projects/hr2.png',
    link: 'https://www.kaggle.com/code/alanvourch/salifort-motors-hr-analysis',
    linkLabel: 'Explore HR Insights Notebook'
  },
  {
    id: 'tech-layoffs',
    title: 'SQL - Tech Layoffs Analysis',
    description: 'Using SQL, I performed data cleaning and analysis on public datasets detailing recent tech layoffs. The results reveal critical trends and insights into workforce management during industry shifts.',
    skills: ['SQL', 'Data Analysis', 'Financial Modeling'],
    thumb: 'images/projects/sql_tech.jpg',
    hover: 'images/projects/sql2.png',
    link: 'https://better-lobster-21e.notion.site/SQL-Data-Cleaning-EDA-Layoffs-data-dbd0891e61454310901253c8faa767d3',
    linkLabel: 'Explore Notion Page'
  },
  {
    id: 'retail-forecast',
    title: 'Time Series Forecasting',
    description: 'A practical forecasting project employing real retail sales data. I used both classical methods and machine learning techniques to accurately predict sales, clearly illustrating how businesses can optimize resources by anticipating market trends.',
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'Financial Modeling'],
    thumb: 'images/projects/forecast.webp',
    hover: 'images/projects/forecast2.png',
    link: 'https://medium.com/@alan.vourch/forecasting-a-practical-guide-6173f421c1ed',
    linkLabel: 'Explore Medium Article'
  },
  {
    id: 'remote-data-salary',
    title: 'SQL - Top Paying Remote Data Jobs',
    description: 'Leveraging SQL analysis on current job market data, this project identifies high-paying remote data analyst roles. It highlights salary trends, in-demand skills, and industry demand to help analysts strategically target career opportunities.',
    skills: ['SQL', 'Data Analysis'],
    thumb: 'images/projects/remote.jpg',
    hover: 'images/projects/job_salaries_chart.png',
    link: 'https://github.com/alanvourch/SQL-Project',
    linkLabel: 'Explore GitHub Repository'
  },
  {
    id: 'movies-dataset',
    title: 'Ultimate Movies Dataset',
    description: 'A 1 Million movies daily updated dataset capturing key trends, box office performances, and production strategies across the global film industry. Demonstrates my capability in managing and analyzing large-scale data efficiently.',
    skills: ['Python', 'Data Analysis'],
    thumb: 'images/projects/dataset1.jpg',
    hover: 'images/projects/dataset4.png',
    link: 'https://www.kaggle.com/datasets/alanvourch/tmdb-movies-daily-updates/data',
    linkLabel: 'Explore Kaggle Dataset'
  },
  {
    id: 'boxoffice-tableau',
    title: 'Tableau - Box Office & IMDb Trends',
    description: 'This Tableau report visualizes top box office hits by genre and decade, comparing revenues and IMDb ratings to highlight evolving audience tastes and market dynamics over time.',
    skills: ['Tableau', 'Data Analysis'],
    thumb: 'images/projects/cinemas_boxoffice.jpg',
    hover: 'images/projects/tableaubo2.png',
    link: 'https://public.tableau.com/app/profile/alan.vourch/viz/BoxOfficeHitsbyGenreandDecade/Dashboard',
    linkLabel: 'Explore Tableau Report'
  },
  {
    id: 'cinema-dashboard',
    title: 'Power BI - Cinema Dashboard',
    description: 'An interactive Power BI dashboard that integrates live box office and IMDb data from my movies dataset. It offers dynamic visuals highlighting trends, studio performances, and detailed genre analyses.',
    skills: ['Power BI', 'Data Analysis'],
    thumb: 'images/projects/popcorn.jpg',
    hover: 'images/projects/pbi_cinema.png',
    link: 'https://app.powerbi.com/view?r=eyJrIjoiN2MzZjI5OTgtNmI2OC00ZDkzLWJjM2YtMWZmYmIyYzQzMWMzIiwidCI6Ijg5NTkwMmNlLTUzMWMtNDJjNi05YTMwLTA3YjRkZjUxYzNiMyJ9',
    linkLabel: 'Explore Power BI Dashboard'
  },
  {
    id: 'a24-analysis',
    title: 'A24 Movies Analysis',
    description: "A targeted analysis of A24’s distinctive movie portfolio, uncovering patterns and insights about the studio's strategy, creative direction, and market positioning using extensive data analysis.",
    skills: ['Python', 'Data Analysis', 'Financial Modeling', 'Data Visualization'],
    thumb: 'images/projects/a24.jpg',
    hover: 'images/projects/a241.png',
    link: 'https://www.kaggle.com/code/alanvourch/a24-movies-analysis',
    linkLabel: 'Explore A24 Movies Notebook'
  },
  {
    id: 'movies-update',
    title: 'Movies Dataset Daily Update',
    description: 'Developed an automated Python pipeline that updates my comprehensive movies dataset daily, incorporating the latest IMDb ratings and movie releases to support timely, accurate analyses.',
    skills: ['Python', 'Data Analysis'],
    thumb: 'images/projects/update.jpg',
    hover: 'images/projects/update1.png',
    link: 'https://www.kaggle.com/code/alanvourch/tmdb-movies-daily-update/notebook',
    linkLabel: 'Explore Update Project Notebook'
  },
  {
    id: 'movies-extraction',
    title: 'Movies Data Extraction',
    description: 'Developed a process to build the Ultimate Movies Dataset, detailing 1 million movies across 30 fields, optimized for depth, accuracy, and ease of analysis.',
    skills: ['Python', 'Data Analysis'],
    thumb: 'images/projects/extraction.jpg',
    hover: 'images/projects/extraction1.png',
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
