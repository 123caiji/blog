(function () {
    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    /**
     * 从 TechBlogConfig.site 写入页面：导航标题、首屏、打字机 data-*、指标、页脚、meta。
     * 需在 TechBlogTyping.init 之前执行。
     */
    function applySiteConfig() {
        const c = window.TechBlogConfig || {};
        const site = c.site || {};
        if (!site || typeof site !== "object") return;

        if (site.pageTitle) document.title = site.pageTitle;

        const metaDesc = document.getElementById("techblog-meta-desc");
        if (metaDesc && site.metaDescription) metaDesc.setAttribute("content", site.metaDescription);

        const ogTitle = document.getElementById("techblog-meta-og-title");
        if (ogTitle && site.pageTitle) ogTitle.setAttribute("content", site.pageTitle);

        const ogDesc = document.getElementById("techblog-meta-og-desc");
        const ogDescText = site.ogDescription || site.metaDescription || "";
        if (ogDesc && ogDescText) ogDesc.setAttribute("content", ogDescText);

        const logo = document.querySelector(".logo");
        if (logo && site.logoText) logo.textContent = site.logoText;

        const kicker = document.querySelector(".hero-kicker");
        if (kicker && site.heroKicker) kicker.textContent = site.heroKicker;

        const subtitle = document.querySelector(".hero-subtitle");
        if (subtitle && site.heroSubtitle) subtitle.textContent = site.heroSubtitle;

        const statusSpan = document.querySelector(".hero-status span:last-child");
        if (statusSpan && site.heroStatus) statusSpan.textContent = site.heroStatus;

        const typingEl = document.getElementById("typing-text");
        if (typingEl) {
            if (site.typingFallback) {
                typingEl.setAttribute("data-typing-fallback", site.typingFallback);
                typingEl.textContent = site.typingFallback;
            }
            let linesAttr = "";
            if (Array.isArray(site.typingLines) && site.typingLines.length) {
                linesAttr = site.typingLines.map((s) => String(s).trim()).filter(Boolean).join("|");
            } else if (typeof site.typingLines === "string" && site.typingLines.trim()) {
                linesAttr = site.typingLines.trim();
            }
            if (linesAttr) typingEl.setAttribute("data-typing-lines", linesAttr);
        }

        const focusUl = document.querySelector(".hero-side .hero-panel:not(.hero-metrics) ul");
        if (focusUl && Array.isArray(site.focusAreas) && site.focusAreas.length) {
            focusUl.innerHTML = site.focusAreas.map((t) => `<li>${escapeHtml(t)}</li>`).join("");
        }

        const metricRows = document.querySelectorAll(".hero-metrics .hero-metric");
        if (site.heroMetrics && Array.isArray(site.heroMetrics) && site.heroMetrics.length) {
            site.heroMetrics.forEach((m, i) => {
                const row = metricRows[i];
                if (!row || !m) return;
                const val = row.querySelector(".hero-metric-value");
                const lab = row.querySelector(".hero-metric-label");
                if (val && m.value != null && m.value !== "") val.textContent = String(m.value);
                if (lab && m.label) lab.textContent = m.label;
            });
        }

        const footerP = document.querySelector(".footer p");
        if (footerP && site.footerCopyright) {
            const year = new Date().getFullYear();
            footerP.textContent = String(site.footerCopyright).replace(/\{year\}/g, String(year));
        }
    }

    function getSettings() {
        if (window.TechBlogSettings && typeof window.TechBlogSettings.getConfig === "function") {
            return window.TechBlogSettings.getConfig();
        }
        return { reduceMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches, bgMotion: true };
    }

    function isReducedMotion() {
        return !!getSettings().reduceMotion;
    }

    function closeMenu() {
        const navbar = document.querySelector(".navbar");
        const toggle = document.querySelector(".menu-toggle");
        if (!navbar || !toggle) return;
        navbar.classList.remove("open");
        document.body.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
    }

    function handleScrollAnimation() {
        if (isReducedMotion()) return;
        const elements = document.querySelectorAll(".fade-in:not(.visible)");
        elements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 120) {
                element.classList.add("visible");
            }
        });
    }

    function syncRevealMode() {
        const elements = document.querySelectorAll(".fade-in");
        if (isReducedMotion()) {
            elements.forEach((el) => el.classList.add("visible"));
        } else {
            elements.forEach((el) => el.classList.remove("visible"));
            handleScrollAnimation();
        }
    }

    function setupRevealClasses() {
        const sections = document.querySelectorAll(".section > .container");
        const cards = document.querySelectorAll(".project-card, .paper-item, .document-category, .resume-doc");

        sections.forEach((section, index) => {
            section.classList.add("fade-in", `delay-${Math.min(index + 1, 4)}`);
        });

        cards.forEach((card, index) => {
            card.classList.add("fade-in", `delay-${(index % 4) + 1}`);
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
                    behavior: isReducedMotion() ? "auto" : "smooth",
                });

                closeMenu();
            });
        });
    }

    function enhanceBackground() {
        const background = document.querySelector(".background");
        if (!background) return;

        document.addEventListener("mousemove", (e) => {
            const { bgMotion } = getSettings();
            if (!bgMotion) return;

            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            background.style.backgroundPosition = `${x * 100}% ${y * 100}%, ${(1 - x) * 100}% ${(1 - y) * 100}%, ${x * 100}% ${(1 - y) * 100}%`;
        });
    }

    function addTiltEffect() {
        const cards = document.querySelectorAll(".project-card, .paper-item, .document-category");
        if (!cards.length) return;

        cards.forEach((card) => {
            card.classList.add("is-tilting");
            card.addEventListener("mousemove", (e) => {
                if (isReducedMotion()) return;
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

    function setupResponsiveNav() {
        const navbar = document.querySelector(".navbar");
        const toggle = document.querySelector(".menu-toggle");
        const settingsPanel = document.getElementById("settings-panel");
        const settingsToggle = document.querySelector(".settings-toggle");
        if (!navbar || !toggle) return;

        toggle.addEventListener("click", () => {
            const isOpen = navbar.classList.toggle("open");
            document.body.classList.toggle("menu-open", isOpen);
            toggle.setAttribute("aria-expanded", String(isOpen));
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) closeMenu();
        });

        document.addEventListener("click", (e) => {
            const target = e.target;
            if (settingsPanel && settingsPanel.contains(target)) return;
            if (settingsToggle && settingsToggle.contains(target)) return;
            if (!navbar.contains(target)) closeMenu();
        });
    }

    function init() {
        applySiteConfig();

        window.TechBlogSettings && window.TechBlogSettings.init && window.TechBlogSettings.init();

        window.TechBlogResume && window.TechBlogResume.init && window.TechBlogResume.init();

        setupRevealClasses();
        syncRevealMode();

        setupSmoothScroll();
        setupResponsiveNav();
        enhanceBackground();
        addTiltEffect();

        window.addEventListener("scroll", handleScrollAnimation, { passive: true });
        handleScrollAnimation();

        document.addEventListener("techblog:settings-change", () => {
            syncRevealMode();
            handleScrollAnimation();
        });

        // 初始化其他组件（由设置面板控制是否运行）
        window.TechBlogTyping && window.TechBlogTyping.init && window.TechBlogTyping.init();
        window.TechBlogParticles && window.TechBlogParticles.init && window.TechBlogParticles.init();
        window.TechBlogGitHub && window.TechBlogGitHub.init && window.TechBlogGitHub.init();
        window.TechBlogFilters && window.TechBlogFilters.init && window.TechBlogFilters.init();
    }

    window.addEventListener("DOMContentLoaded", init);
})();
