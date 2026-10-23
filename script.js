
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");
const typingText = document.getElementById("typingText");
const backToTop = document.getElementById("backToTop");

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = navbar.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close menu after selecting a section
navbar.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

// Typing animation
const roles = [
  "Aspiring Web Developer",
  "UI/UX Designer",
  "Computer Science Student"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeRole() {
  const currentRole = roles[roleIndex];

  if (!deleting) {
    typingText.textContent = currentRole.slice(0, characterIndex + 1);
    characterIndex++;

    if (characterIndex === currentRole.length) {
      deleting = true;
      setTimeout(typeRole, 1400);
      return;
    }
  } else {
    typingText.textContent = currentRole.slice(0, characterIndex - 1);
    characterIndex--;

    if (characterIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeRole, deleting ? 45 : 85);
}

typeRole();

// Automatically show the current year
document.getElementById("year").textContent = new Date().getFullYear();

// Highlight the navigation link for the current section
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".navbar a");

function updateActiveLink() {
  let currentSection = "home";

  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 160) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${currentSection}`
    );
  });

  backToTop.classList.toggle("visible", window.scrollY > 400);
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();

// Back to top
backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
