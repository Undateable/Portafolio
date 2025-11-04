export class ProjectSlider {
    constructor(projects) {
        this.projects = projects;
        this.currentIndex = 0;
        this.slider = document.getElementById("slider");
        this.modal = document.getElementById("imageModal");
        this.modalImg = document.getElementById("modalImage");
        this.modalClose = document.getElementById("modalClose");
        
        this.init();
    }
    
    init() {
        this.setupControls();
        this.setupModal();
        this.renderSlide();
    }
    
    setupControls() {
        document.getElementById("prevBtn").addEventListener("click", () => this.navigate('prev'));
        document.getElementById("nextBtn").addEventListener("click", () => this.navigate('next'));
    }
    
    navigate(direction) {
        if (direction === 'prev') {
            this.currentIndex = this.currentIndex === 0 ? this.projects.length - 1 : this.currentIndex - 1;
        } else {
            this.currentIndex = this.currentIndex === this.projects.length - 1 ? 0 : this.currentIndex + 1;
        }
        this.renderSlide();
    }
    
    renderSlide() {
        const project = this.projects[this.currentIndex];
        
        this.slider.innerHTML = `
            <div class="slide">
                <div class="video-section">
                    <video controls autoplay muted>
                        <source src="${project.videoSrc}" type="video/mp4" />
                        Your browser doesn't support video playback.
                    </video>
                    <b>${project.title}</b>
                    <pre>
Genre: ${project.genre}
Engine: ${project.engine}
Role: ${project.role}
                    </pre>
                    <p>${project.description}</p>
                </div>

                <div class="images-section">
                    ${project.images
                        .map((imgSrc, idx) => 
                            `<img src="${imgSrc}" 
                                 class="expandable" 
                                 data-img="${imgSrc}" 
                                 alt="Project image ${idx + 1}"
                                 loading="lazy" />`)
                        .join("")}
                </div>
            </div>
        `;
        
        this.setupImageExpansion();
    }
    
    setupImageExpansion() {
        document.querySelectorAll(".expandable").forEach((img) => {
            img.addEventListener("click", () => this.openModal(img.dataset.img));
        });
    }
    
    setupModal() {
        this.modalClose.addEventListener("click", () => this.closeModal());
        this.modal.addEventListener("click", (e) => {
            if (e.target === this.modal) this.closeModal();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    }
    
    openModal(imgSrc) {
        this.modal.style.display = "block";
        this.modalImg.src = imgSrc;
    }
    
    closeModal() {
        this.modal.style.display = "none";
    }
}