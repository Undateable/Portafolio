// =========================
// MENU RESPONSIVE
// =========================
const menuIcon = document.getElementById("menu-icon");
const navbar = document.getElementById("navbar");

menuIcon.addEventListener("click", () => {
  navbar.classList.toggle("active");

  // Alternar ícono como en React (bx-menu ↔ bx-x)
  if (menuIcon.classList.contains("bx-menu")) {
    menuIcon.classList.remove("bx-menu");
    menuIcon.classList.add("bx-x");
  } else {
    menuIcon.classList.remove("bx-x");
    menuIcon.classList.add("bx-menu");
  }
});


// =========================
// SCROLL SPY
// =========================
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  document.querySelectorAll("section").forEach((sec) => {
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");

    if (scrollY >= offset && scrollY < offset + height) {
      navLinks.forEach((link) => link.classList.remove("active"));

      const activeLink = document.querySelector(
        `.nav-link[data-section="${id}"]`
      );
      if (activeLink) activeLink.classList.add("active");
    }
  });
});
