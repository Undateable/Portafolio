// ========== TYPED TEXT ANIMATION ==========
document.addEventListener('DOMContentLoaded', function() {
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');

    if (!typedTextSpan || !cursorSpan) {
        console.error('Typed text elements not found!');
        console.log('typedTextSpan:', typedTextSpan);
        console.log('cursorSpan:', cursorSpan);
        return;
    }

    console.log('Animation elements found - Starting animation...');

    const textArray = ['Game Designer', 'Narrative Designer', 'Level Designer', 'Mechanics Designer'];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
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
        if (charIndex > 0) {
            cursorSpan.classList.add('typing');
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) {
                textArrayIndex = 0;
            }
            setTimeout(type, typingDelay + 1100);
        }
    }

    // Start the animation
    setTimeout(type, 1000);
});

// ========== MENU TOGGLE ==========
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('active');
        menuIcon.classList.toggle('bx-x');
    });
}

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (navbar && navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                    if (menuIcon) menuIcon.classList.remove('bx-x');
                }
            }
        }
    });
});

// ========== SCROLL REVEAL EFFECT ==========
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        header.classList.toggle('sticky', window.scrollY > 100);
    }
});

console.log('Main.js loaded successfully');