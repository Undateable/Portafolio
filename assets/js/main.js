document.addEventListener('DOMContentLoaded', function() {
    const root = document.documentElement;
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const themeOptions = document.querySelectorAll('.theme-option');
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const textArray = ['Game Designer', 'Narrative Designer', 'Level Designer', 'Mechanics Designer'];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function applyTheme(view) {
        const safeView = view === 'black' ? 'black' : 'white';

        if (safeView === 'black') {
            root.setAttribute('data-view', 'black');
        } else {
            root.removeAttribute('data-view');
        }

        if (themeColorMeta) {
            themeColorMeta.setAttribute('content', safeView === 'black' ? '#050505' : '#8a603b');
        }

        themeOptions.forEach((button) => {
            const isActive = button.dataset.view === safeView;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });
    }

    function setMenuState(isOpen) {
        if (!menuIcon || !navbar) {
            return;
        }

        navbar.classList.toggle('active', isOpen);
        menuIcon.classList.toggle('bx-x', isOpen);
        menuIcon.classList.toggle('bx-menu', !isOpen);
        menuIcon.setAttribute('aria-expanded', String(isOpen));
    }

    function type() {
        if (!typedTextSpan || !cursorSpan) {
            return;
        }

        if (charIndex < textArray[textArrayIndex].length) {
            cursorSpan.classList.add('typing');
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (!typedTextSpan || !cursorSpan) {
            return;
        }

        if (charIndex > 0) {
            cursorSpan.classList.add('typing');
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            textArrayIndex = (textArrayIndex + 1) % textArray.length;
            setTimeout(type, typingDelay + 1100);
        }
    }

    function updateActiveSection() {
        const scrollY = window.scrollY;

        document.querySelectorAll('section[id]').forEach((section) => {
            const offset = section.offsetTop - 180;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= offset && scrollY < offset + height) {
                navLinks.forEach((link) => link.classList.remove('active'));

                const activeLink = document.querySelector(`.nav-link[data-section="${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    if (themeOptions.length > 0) {
        const savedView = localStorage.getItem('page-view') || 'white';
        applyTheme(savedView);

        themeOptions.forEach((button) => {
            button.addEventListener('click', () => {
                const nextView = button.dataset.view === 'black' ? 'black' : 'white';
                applyTheme(nextView);
                localStorage.setItem('page-view', nextView);
            });
        });
    }

    if (menuIcon && navbar) {
        menuIcon.setAttribute('aria-expanded', 'false');
        menuIcon.setAttribute('aria-label', 'Toggle navigation menu');

        menuIcon.addEventListener('click', () => {
            setMenuState(!navbar.classList.contains('active'));
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') {
                return;
            }

            const target = document.querySelector(href);
            if (!target) {
                return;
            }

            e.preventDefault();
            target.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth',
                block: 'start'
            });
            setMenuState(false);
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            setMenuState(false);
        }
    });

    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (header) {
            header.classList.toggle('sticky', window.scrollY > 100);
        }

        updateActiveSection();
    });

    if (typedTextSpan && cursorSpan && !prefersReducedMotion) {
        setTimeout(type, 1000);
    } else if (typedTextSpan) {
        typedTextSpan.textContent = textArray[0];
    }

    updateActiveSection();
});