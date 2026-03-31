(function () {
    const LS_KEY = "techblog_settings_v1";
    const REPO_CACHE_PREFIX = "techblog_github_repo_cache_";

    const systemReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const defaultUi = {
        bgMotion: true,
        typingEnabled: true,
        particlesEnabled: false,
        reduceMotion: false, // user toggle, system preference 会在 effective 中叠加
        githubMetrics: true,
        neonHigh: false,
    };

    let uiState = loadUiState();

    function loadUiState() {
        try {
            const raw = localStorage.getItem(LS_KEY);
            if (!raw) return { ...defaultUi };
            const parsed = JSON.parse(raw);
            return { ...defaultUi, ...parsed };
        } catch {
            return { ...defaultUi };
        }
    }

    function saveUiState() {
        try {
            localStorage.setItem(LS_KEY, JSON.stringify(uiState));
        } catch {
            // ignore
        }
    }

    function getEffectiveConfig() {
        const reduceMotion = !!(uiState.reduceMotion || systemReduceMotion);
        return {
            reduceMotion,
            bgMotion: !!(uiState.bgMotion && !reduceMotion),
            typingEnabled: !!(uiState.typingEnabled && !reduceMotion),
            particlesEnabled: !!(uiState.particlesEnabled && !reduceMotion),
            githubMetrics: !!uiState.githubMetrics,
            neonHigh: !!uiState.neonHigh,
        };
    }

    function applyConfigToDom(cfg) {
        document.body.classList.toggle("reduce-motion", cfg.reduceMotion);
        document.body.classList.toggle("bg-motion-off", !cfg.bgMotion);
        document.body.classList.toggle("neon-high", !!cfg.neonHigh);
    }

    function dispatchChange(cfg) {
        document.dispatchEvent(new CustomEvent("techblog:settings-change", { detail: cfg }));
    }

    function setCheckboxState(id, checked) {
        const el = document.getElementById(id);
        if (!el) return;
        el.checked = !!checked;
    }

    function syncUiFromState() {
        setCheckboxState("setting-bg-motion", uiState.bgMotion);
        setCheckboxState("setting-typing", uiState.typingEnabled);
        setCheckboxState("setting-particles", uiState.particlesEnabled);
        setCheckboxState("setting-reduce-motion", uiState.reduceMotion || systemReduceMotion);
        setCheckboxState("setting-github-metrics", uiState.githubMetrics);
        setCheckboxState("setting-neon-high", uiState.neonHigh);
    }

    function updateUiStateFromDom() {
        const read = (id) => {
            const el = document.getElementById(id);
            return el ? !!el.checked : false;
        };
        uiState.bgMotion = read("setting-bg-motion");
        uiState.typingEnabled = read("setting-typing");
        uiState.particlesEnabled = read("setting-particles");
        uiState.reduceMotion = read("setting-reduce-motion");
        uiState.githubMetrics = read("setting-github-metrics");
        uiState.neonHigh = read("setting-neon-high");
        saveUiState();
    }

    function clearGithubCaches() {
        try {
            for (let i = 0; i < localStorage.length; i++) {
                const k = localStorage.key(i);
                if (k && k.startsWith(REPO_CACHE_PREFIX)) {
                    localStorage.removeItem(k);
                }
            }
        } catch {
            // ignore
        }
    }

    function openPanel() {
        const panel = document.getElementById("settings-panel");
        if (!panel) return;
        panel.setAttribute("aria-hidden", "false");
        const toggleBtn = document.querySelector(".settings-toggle");
        if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "true");
    }

    function closePanel() {
        const panel = document.getElementById("settings-panel");
        if (!panel) return;
        panel.setAttribute("aria-hidden", "true");
        const toggleBtn = document.querySelector(".settings-toggle");
        if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "false");
    }

    function initPanelUi() {
        const panel = document.getElementById("settings-panel");
        const toggleBtn = document.querySelector(".settings-toggle");
        const closeBtn = document.querySelector(".settings-close");

        if (!panel || !toggleBtn || !closeBtn) return;

        toggleBtn.addEventListener("click", () => {
            const isHidden = panel.getAttribute("aria-hidden") !== "false";
            if (isHidden) openPanel();
            else closePanel();
        });

        closeBtn.addEventListener("click", closePanel);

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") closePanel();
        });

        document.addEventListener("click", (e) => {
            const target = e.target;
            const isPanelOpen = panel.getAttribute("aria-hidden") === "false";
            if (!isPanelOpen) return;
            if (panel.contains(target)) return;
            if (toggleBtn.contains(target)) return;
            closePanel();
        });
    }

    function init() {
        syncUiFromState();
        initPanelUi();

        const cfg = getEffectiveConfig();
        applyConfigToDom(cfg);
        dispatchChange(cfg);

        const ids = [
            "setting-bg-motion",
            "setting-typing",
            "setting-particles",
            "setting-reduce-motion",
            "setting-github-metrics",
            "setting-neon-high",
        ];

        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            el.addEventListener("change", () => {
                updateUiStateFromDom();
                const nextCfg = getEffectiveConfig();
                applyConfigToDom(nextCfg);
                dispatchChange(nextCfg);
            });
        });

        const resetBtn = document.getElementById("setting-reset-cache");
        if (resetBtn) {
            resetBtn.addEventListener("click", () => {
                clearGithubCaches();
                // 重新触发一次，方便 github 组件刷新
                const nextCfg = getEffectiveConfig();
                dispatchChange(nextCfg);
            });
        }
    }

    window.TechBlogSettings = {
        init,
        getConfig: getEffectiveConfig,
    };
})();

