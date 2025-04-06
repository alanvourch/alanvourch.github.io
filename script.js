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

/* iOS-specific: Conditionally add bg-fixed to header on non-iOS devices */
(function () {
  const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (!isiOS && header && !header.classList.contains('bg-fixed')) {
    header.classList.add('bg-fixed');
  }
})();
