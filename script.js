const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function handleScrollAnimation() {
    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < window.innerHeight - 120) {
            element.classList.add("visible");
        }
    });
}

function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            e.preventDefault();

            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: reduceMotion ? "auto" : "smooth",
            });

            closeMenu();
        });
    });
}

function enhanceBackground() {
    if (reduceMotion) return;
    const background = document.querySelector(".background");
    if (!background) return;

    document.addEventListener("mousemove", (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        background.style.backgroundPosition = `${x * 100}% ${y * 100}%, ${(1 - x) * 100}% ${(1 - y) * 100}%, ${x * 100}% ${(1 - y) * 100}%`;
    });
}

function addTiltEffect() {
    if (reduceMotion) return;
    const cards = document.querySelectorAll(".project-card, .paper-item, .document-category");

    cards.forEach((card) => {
        card.classList.add("is-tilting");
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const offsetY = e.clientY - rect.top;
            const rotateY = ((offsetX / rect.width) - 0.5) * 8;
            const rotateX = ((offsetY / rect.height) - 0.5) * -8;
            card.style.transform = `translateY(-6px) perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });
}

function closeMenu() {
    const navbar = document.querySelector(".navbar");
    const toggle = document.querySelector(".menu-toggle");
    if (!navbar || !toggle) return;
    navbar.classList.remove("open");
    document.body.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
}

function setupResponsiveNav() {
    const navbar = document.querySelector(".navbar");
    const toggle = document.querySelector(".menu-toggle");
    if (!navbar || !toggle) return;

    toggle.addEventListener("click", () => {
        const isOpen = navbar.classList.toggle("open");
        document.body.classList.toggle("menu-open", isOpen);
        toggle.setAttribute("aria-expanded", String(isOpen));
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    document.addEventListener("click", (e) => {
        if (!navbar.contains(e.target)) {
            closeMenu();
        }
    });
}

function applyRevealClasses() {
    const sections = document.querySelectorAll(".section > .container");
    const cards = document.querySelectorAll(".project-card, .paper-item, .document-category");

    sections.forEach((section, index) => {
        section.classList.add("fade-in", `delay-${Math.min(index + 1, 4)}`);
    });

    cards.forEach((card, index) => {
        card.classList.add("fade-in", `delay-${(index % 4) + 1}`);
    });
}

function init() {
    applyRevealClasses();
    setupSmoothScroll();
    setupResponsiveNav();
    enhanceBackground();
    addTiltEffect();

    window.addEventListener("scroll", handleScrollAnimation, { passive: true });
    handleScrollAnimation();
}

window.addEventListener("DOMContentLoaded", init);
