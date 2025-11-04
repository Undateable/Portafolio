// Navigation functionality
export class Navigation {
    constructor() {
        this.menuIcon = document.getElementById("menu-icon");
        this.navbar = document.getElementById("navbar");
        this.navLinks = document.querySelectorAll(".nav-link");
        
        this.init();
    }
    
    init() {
        this.setupMobileMenu();
        this.setupScrollSpy();
    }
    
    setupMobileMenu() {
        this.menuIcon.addEventListener("click", () => {
            this.navbar.classList.toggle("active");
            this.toggleMenuIcon();
        });
    }
    
    toggleMenuIcon() {
        if (this.menuIcon.classList.contains("bx-menu")) {
            this.menuIcon.classList.replace("bx-menu", "bx-x");
        } else {
            this.menuIcon.classList.replace("bx-x", "bx-menu");
        }
    }
    
    setupScrollSpy() {
        window.addEventListener("scroll", () => {
            const scrollY = window.scrollY;
            
            document.querySelectorAll("section").forEach((sec) => {
                const offset = sec.offsetTop - 150;
                const height = sec.offsetHeight;
                const id = sec.getAttribute("id");
                
                if (scrollY >= offset && scrollY < offset + height) {
                    this.navLinks.forEach((link) => link.classList.remove("active"));
                    
                    const activeLink = document.querySelector(
                        `.nav-link[data-section="${id}"]`
                    );
                    if (activeLink) activeLink.classList.add("active");
                }
            });
        });
    }
}