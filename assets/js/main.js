import { Navigation } from './navigation.js';
import { ProjectSlider } from './projectSlider.js';
import { projects } from './data/projects.js';
import { TypeWriter } from './typeWriter.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    const navigation = new Navigation();
    
    // Initialize project slider
    const slider = new ProjectSlider(projects);
    
    // Initialize TypeWriter
    const typeWriter = new TypeWriter(
        document.querySelector('.typed-text'),
        [
            'Game Designer',
            'Narrative Designer',
            'Level Designer',
            'UI/UX Designer',
            'Creative Developer'
        ],
        3000
    );
    
    // Inicializar efectos de desplazamiento
    const scrollElements = document.querySelectorAll('.scroll-fade');
    
    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 100)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    
    // Add smooth scroll to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Lazy load images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
    
    // Event Listeners
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Initial check for elements in view
    handleScrollAnimation();
});