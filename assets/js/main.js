document.addEventListener('DOMContentLoaded', function () {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        if (themeToggle) themeToggle.querySelector('i').classList.replace('bi-moon-stars', 'bi-sun');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');

            const icon = themeToggle.querySelector('i');
            if (isLight) {
                icon.classList.replace('bi-moon-stars', 'bi-sun');
            } else {
                icon.classList.replace('bi-sun', 'bi-moon-stars');
            }
        });
    }

    // RTL Toggle
    const rtlToggle = document.getElementById('rtl-toggle');
    const savedDir = localStorage.getItem('dir');

    function applyBootstrapRTL(dir) {
        const bootstrapLinks = document.querySelectorAll('link[href*="bootstrap.min.css"], link[href*="bootstrap.rtl.min.css"]');
        bootstrapLinks.forEach(link => {
            if (dir === 'rtl') {
                if (link.href.includes('bootstrap.min.css')) {
                    link.href = link.href.replace('bootstrap.min.css', 'bootstrap.rtl.min.css');
                }
            } else {
                if (link.href.includes('bootstrap.rtl.min.css')) {
                    link.href = link.href.replace('bootstrap.rtl.min.css', 'bootstrap.min.css');
                }
            }
        });
    }

    if (savedDir === 'rtl') {
        document.documentElement.setAttribute('dir', 'rtl');
        applyBootstrapRTL('rtl');
    }

    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const currentDir = document.documentElement.getAttribute('dir');
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            document.documentElement.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
            applyBootstrapRTL(newDir);
        });
    }

    // Pricing Billing Toggle
    const billingSwitch = document.getElementById('billingSwitch');
    if (billingSwitch) {
        billingSwitch.addEventListener('change', (e) => {
            const isWeekly = e.target.checked;
            const priceVals = document.querySelectorAll('.price-val');
            const pricePeriods = document.querySelectorAll('.price-period');
            
            priceVals.forEach(val => {
                if (isWeekly) {
                    val.textContent = val.getAttribute('data-weekly');
                } else {
                    val.textContent = val.getAttribute('data-monthly');
                }
            });
            
            pricePeriods.forEach(period => {
                if (isWeekly) {
                    period.textContent = '/wk';
                } else {
                    period.textContent = '/mo';
                }
            });
        });
    }

    // Back to Top
    let backToTopButton = document.getElementById('back-to-top');
    if (!backToTopButton) {
        backToTopButton = document.createElement('button');
        backToTopButton.type = 'button';
        backToTopButton.id = 'back-to-top';
        backToTopButton.className = 'back-to-top';
        backToTopButton.setAttribute('aria-label', 'Back to top');
        backToTopButton.innerHTML = '<i class="bi bi-arrow-up"></i>';
        document.body.appendChild(backToTopButton);
    }

    const toggleBackToTop = () => {
        if (window.scrollY > 280) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    };

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop();

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Password Visibility Toggle
    document.querySelectorAll('.toggle-password').forEach(toggle => {
        toggle.addEventListener('click', function () {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('bi-eye', 'bi-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('bi-eye-slash', 'bi-eye');
            }
        });
    });



    // Navbar Menu Scroll Lock and Auto-close
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse) {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const togglerIcon = navbarToggler ? navbarToggler.querySelector('i') : null;

        navbarCollapse.addEventListener('show.bs.collapse', () => {
            document.body.style.overflow = 'hidden';
            if (togglerIcon) {
                togglerIcon.classList.remove('bi-list');
                togglerIcon.classList.add('bi-x-lg');
            }
        });
        
        navbarCollapse.addEventListener('hidden.bs.collapse', () => {
            document.body.style.overflow = '';
            if (togglerIcon) {
                togglerIcon.classList.remove('bi-x-lg');
                togglerIcon.classList.add('bi-list');
            }
        });

        const navLinks = navbarCollapse.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    document.body.style.overflow = '';
                    if (typeof bootstrap !== 'undefined') {
                        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                        if (bsCollapse) {
                            bsCollapse.hide();
                        }
                    }
                }
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1200 && document.body.style.overflow === 'hidden') {
                document.body.style.overflow = '';
                if (typeof bootstrap !== 'undefined') {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse && navbarCollapse.classList.contains('show')) {
                        bsCollapse.hide();
                    }
                }
            }
        });
    }
});

// Helper for scroll reveal
document.addEventListener('scroll', () => {
    document.querySelectorAll('.reveal').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
});
