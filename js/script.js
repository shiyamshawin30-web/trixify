// --- GLOBAL OBSERVER FOR SCROLL ANIMATIONS ---
const observerOptions = { threshold: 0.05, rootMargin: "0px 0px 50px 0px" };
window.observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // --- PRELOADER LOGIC ---
    const preloader = document.getElementById('preloader');
    const body = document.body;

    if (preloader) {
        // Wait 2 seconds before starting the transition
        setTimeout(() => {
            body.classList.remove('loading');
            body.classList.add('loaded');
            
            // Additional delay to allow the CSS transition to complete before removing from DOM
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }, 2000);
    }

    // Observe initial static elements
    document.querySelectorAll('.section-title, .scroll-fade, .service-card, .portfolio-item, .process-step, .testimonial-card, .faq-item, .domain-ticker-section').forEach(el => {
        if (window.observer) window.observer.observe(el);
    });

    // Navbar Scroll Effect
    const nav = document.querySelector('.main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Hero Text Fade Out on Scroll
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            if (scrollPos > 100) { 
                heroContent.classList.add('fade-out');
            } else {
                heroContent.classList.remove('fade-out');
            }
        });
    }

    // Smooth Scroll for Nav Links
    document.querySelectorAll('.nav-menu a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
