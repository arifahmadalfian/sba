// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Active navigation highlighting on scroll + navbar glass effect
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; //-100 untuk offset karena header fixed
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-blue-600');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-blue-600');
        }
    });

    // Toggle glass nav when scrolled
    const topnav = document.getElementById('topnav');
    if (topnav) {
        if (window.scrollY > 0) {
            topnav.classList.add('glass-nav');
        } else {
            topnav.classList.remove('glass-nav');
        }
    }
});

// Hero background slider (3 backgrounds, text stays static)
(function initHeroSlider() {
    const bg = document.getElementById('hero-bg');
    const prevBtn = document.getElementById('hero-prev');
    const nextBtn = document.getElementById('hero-next');
    if (!bg || !prevBtn || !nextBtn) return;

    const total = 3;
    let index = 0;

    function apply() {
        // Remove any existing hero-slide-* class
        for (let i = 0; i < total; i++) {
            bg.classList.remove(`hero-slide-${i}`);
        }
        bg.classList.add(`hero-slide-${index}`);
    }

    function next() {
        index = (index + 1) % total;
        apply();
    }

    function prev() {
        index = (index - 1 + total) % total;
        apply();
    }

    // Button events + reset autoplay timer
    const AUTO_MS = 6000;
    let timer = setInterval(next, AUTO_MS);

    function resetTimer() {
        clearInterval(timer);
        timer = setInterval(next, AUTO_MS);
    }

    prevBtn.addEventListener('click', () => {
        prev();
        resetTimer();
    });

    nextBtn.addEventListener('click', () => {
        next();
        resetTimer();
    });
})();