// =======================
// Datos de proyectos
// =======================
const projects = [
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
            "assets/img/transformice1.png",
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
    
    if (!slider) {
        console.error('Slider element not found!');
        return;
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
            currentIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
            renderSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            currentIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
            renderSlide();
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && prevBtn) {
            prevBtn.click();
        } else if (e.key === 'ArrowRight' && nextBtn) {
            nextBtn.click();
        }
    });

    // Initialize first slide
    console.log('Initializing first slide');
    renderSlide();
});

