// =======================
// Datos de proyectos
// =======================
const projects = [
    {
        title: "🧟‍♀️ ​Ruinas de Skersher ",
        videoSrc: "assets/video/Ruinas.mp4", 
        genre: "Acción y Puzzles narrativos.",
        engine: "Unity / Google Drive.",
        role: "I served as the Game, Narrative and Level Designer.",
        description:"I was responsible for the full narrative, core gameplay systems, and level design of the project, all developed from scratch, while also coordinating with the art team to ensure consistent visual direction and smooth cross-team communication.",
        images: [
            "assets/img/ruinas_1.png",
            "assets/img/ruinas_2.png",
            "assets/img/ruinas_3.png",
        ],
    },
    {
        title: "🏃 Gaucho Runner",
        videoSrc: "assets/video/gauchrun.mp4",
        genre: "Endless Runner, FPS.",
        engine: "Unreal Engine 5.",
        role: "Designer.",
        description:
            "Designed core mechanics, obstacle patterns, and difficulty scaling.",
        images: [
            "assets/img/gauchorunner1.png",
            "assets/img/gauchorunner2.png",
            "assets/img/gauchorunner3.png",
        ],
    },
    {
        title: "🏆 The Nameless",
        videoSrc: "assets/video/thenameless.mp4",
        genre: "3D first-person shooter with procedural dungeons.",
        engine: "Unreal Engine 5 Blueprints.",
        role: "Designer and Developer.",
        description:
            "Represented Brinca – Campus de Videojuegos in the official Unreal championship.",
        images: [
            "assets/img/nameles1.png",
            "assets/img/nameles2.png",
            "assets/img/nameles3.png",
        ],
    },
    {
        title: "🎨 Box Boy (Game Jam – 48h Project)",
        videoSrc: "assets/video/boxboy.mp4",
        genre: "3D puzzle platformer.",
        engine: "Unreal Engine 5 Blueprints.",
        role: "Narrative & Level Designer.",
        description:
            "Developed in under 48 hours during a game jam.",
        images: [
            "assets/img/boxboy1.png",
            "assets/img/boxboy.png",
            "assets/img/boxboy3.png",
        ],
    },
    {
        title: "😼 Pawling's Inferno (2DVer.)",
        videoSrc: "assets/video/transformicevdo.mp4",
        genre: "Platformer.",
        engine: "Construct 2.",
        role: "Designer, Artist and Developer.",
        description:
            "Designed the mechanics, levels and art approach.",
        images: [
            "assets/img/transformice1png.png",
            "assets/img/transformice2.png",
            "assets/img/transformice3.png",
        ],
    },
];

// =======================
// Slider logic
// =======================
document.addEventListener('DOMContentLoaded', function() {
    let currentIndex = 0;
    const slider = document.getElementById("slider");
    const indicatorsContainer = document.getElementById("sliderIndicators");
    
    if (!slider) {
        console.error('Slider element not found!');
        return;
    }

    // Touch/swipe handling
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;

    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                // Swipe right - go to previous
                navigateTo('prev');
            } else {
                // Swipe left - go to next
                navigateTo('next');
            }
        }
    }

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    // Create indicators
    function createIndicators() {
        if (!indicatorsContainer) return;
        
        indicatorsContainer.innerHTML = '';
        
        projects.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('slider-indicator');
            if (index === currentIndex) {
                indicator.classList.add('active');
            }
            
            indicator.addEventListener('click', () => {
                currentIndex = index;
                renderSlide();
                updateIndicators();
            });
            
            indicatorsContainer.appendChild(indicator);
        });
    }

    // Update active indicator
    function updateIndicators() {
        if (!indicatorsContainer) return;
        
        const indicators = indicatorsContainer.querySelectorAll('.slider-indicator');
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    function navigateTo(direction) {
        if (direction === 'prev') {
            currentIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
        } else {
            currentIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
        }
        renderSlide();
        updateIndicators();
    }

    function renderSlide() {
        const p = projects[currentIndex];
        console.log('Rendering slide:', currentIndex);

        slider.innerHTML = `
        <div class="slide">
            <div class="video-section">
                <video controls autoplay muted>
                    <source src="${p.videoSrc}" type="video/mp4" />
                    Tu navegador no soporta video.
                </video>
                <b>${p.title}</b>
                <pre>
Genre: ${p.genre}
Engine: ${p.engine}
Role: ${p.role}
                </pre>
                <p>${p.description}</p>
            </div>

            <div class="images-section">
                ${p.images
                    .map(
                        (imgSrc, idx) =>
                            `<img src="${imgSrc}" alt="Screenshot ${idx + 1} of ${p.title}" loading="lazy" />`
                    )
                    .join("")}
            </div>
        </div>
        `;
    }

    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            navigateTo('prev');
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            navigateTo('next');
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && prevBtn) {
            navigateTo('prev');
        } else if (e.key === 'ArrowRight' && nextBtn) {
            navigateTo('next');
        }
    });

    // Initialize
    console.log('Initializing slider');
    createIndicators();
    renderSlide();
});

