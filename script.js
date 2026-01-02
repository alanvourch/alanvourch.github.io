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
