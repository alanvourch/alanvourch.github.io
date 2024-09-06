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

    // Get elements
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeBtn = document.getElementById('close-btn');
    const mobileMenuPanel = document.getElementById('mobile-menu-panel');
    const navbar = document.getElementById('navbar');
    const header = document.getElementById('header');

    // Toggle the mobile menu panel
    function toggleMobileMenu() {
      mobileMenuPanel.classList.toggle('show');
      document.body.classList.toggle('overflow-hidden');
    }

    // Add event listeners to the hamburger and close buttons
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
    closeBtn.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking on a link
    mobileMenuPanel.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', toggleMobileMenu);
    });

    // Change hamburger color on scroll
    window.addEventListener('scroll', function () {
      const scrollPosition = window.scrollY;
      const headerHeight = header.offsetHeight;

      if (scrollPosition > headerHeight - 100) {
        navbar.style.backgroundColor = `rgba(255, 255, 255, ${Math.min(scrollPosition / headerHeight, 1)})`;
        hamburgerBtn.style.color = '#333'; // Dark gray when scrolled past header
      } else {
        navbar.style.backgroundColor = 'transparent';
        hamburgerBtn.style.color = 'white'; // White when in header
      }
    });

    // Ensure proper color when mobile menu is open
    function updateButtonColors() {
      if (mobileMenuPanel.classList.contains('show')) {
        hamburgerBtn.style.display = 'none';
        closeBtn.style.display = 'flex';
        closeBtn.style.color = '#333'; // Always dark gray
      } else {
        hamburgerBtn.style.display = 'flex';
        closeBtn.style.display = 'none';
        // Set hamburger color based on scroll position
        const scrollPosition = window.scrollY;
        const headerHeight = header.offsetHeight;
        hamburgerBtn.style.color = scrollPosition > headerHeight - 100 ? '#333' : 'white';
      }
    }

    // Call updateButtonColors when toggling menu and on scroll
    hamburgerBtn.addEventListener('click', updateButtonColors);
    closeBtn.addEventListener('click', updateButtonColors);
    window.addEventListener('scroll', updateButtonColors);

    // Initial call to set correct colors
    updateButtonColors();

});
