<!-- Smooth Scroll Script -->
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });


<!-- IntersectionObserver for Section Fade-In -->
    const sections = document.querySelectorAll('.section');
    const options = {
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, options);
    sections.forEach(section => {
        observer.observe(section);
    });

// nav bar script

    window.addEventListener('scroll', function() {
      var navbar = document.getElementById('navbar');
      var navLinks = document.querySelectorAll('.nav-link');
      var scrollPosition = window.scrollY;
      var headerHeight = document.getElementById('header').offsetHeight;

      if (scrollPosition > headerHeight - 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, ' + Math.min(scrollPosition / headerHeight, 1) + ')';
        navLinks.forEach(function(link) {
          link.style.color = 'rgba(0, 0, 0, ' + Math.min(scrollPosition / headerHeight, 1) + ')';
        });
      } else {
        navbar.style.backgroundColor = 'transparent';
        navLinks.forEach(function(link) {
          link.style.color = 'white';
        });
      }
    });

    // Select the hamburger button and the mobile menu
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');
    const header = document.getElementById('header');

    // Function to toggle the mobile menu visibility
    function toggleMobileMenu() {
      if (mobileMenu.style.display === 'none' || mobileMenu.style.display === '') {
        mobileMenu.style.display = 'block';
      } else {
        mobileMenu.style.display = 'none';
      }
    }

    // Add event listener to the hamburger button
    hamburgerBtn.addEventListener('click', toggleMobileMenu);

    // Change navbar background on scroll
    window.addEventListener('scroll', function () {
      const scrollPosition = window.scrollY;

      if (scrollPosition > header.offsetHeight) {
        navbar.classList.add('navbar-opaque');
      } else {
        navbar.classList.remove('navbar-opaque');
      }
    });
