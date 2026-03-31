(function () {
    const cfg = () => window.TechBlogConfig || {};

    const repoCachePrefix = "techblog_github_repo_cache_";
    const TTL_MS = 24 * 60 * 60 * 1000;

    function getSettings() {
        if (window.TechBlogSettings && typeof window.TechBlogSettings.getConfig === "function") {
            return window.TechBlogSettings.getConfig();
        }
        return { githubMetrics: true };
    }

    function fmtNumber(n) {
        try {
            return new Intl.NumberFormat("en-US").format(Number(n) || 0);
        } catch {
            return String(n);
        }
    }

    async function fetchJson(url) {
        const res = await fetch(url, { method: "GET", headers: { "Accept": "application/vnd.github+json" } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    }

    function getRepoCacheKey(repoFullName) {
        return `${repoCachePrefix}${repoFullName}`;
    }

    function loadRepoCache(repoFullName) {
        try {
            const raw = localStorage.getItem(getRepoCacheKey(repoFullName));
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            if (Date.now() - parsed.ts > TTL_MS) return null;
            return parsed.data || null;
        } catch {
            return null;
        }
    }

    function saveRepoCache(repoFullName, data) {
        try {
            localStorage.setItem(getRepoCacheKey(repoFullName), JSON.stringify({ ts: Date.now(), data }));
        } catch {
            // ignore
        }
    }

    function fillProfile() {
        const c = cfg();
        const p = c.profile || {};

        const nameEl = document.getElementById("profile-name");
        if (nameEl && p.name) nameEl.textContent = p.name;

        const avatarWrap = document.querySelector(".avatar");
        const avatarImg = document.getElementById("avatar-img");
        if (avatarWrap && p.githubUser && !avatarWrap.getAttribute("data-github-user")) {
            avatarWrap.setAttribute("data-github-user", p.githubUser);
        }

        if (avatarImg) {
            if (p.avatarUrl) {
                avatarImg.src = p.avatarUrl;
                avatarImg.style.display = "block";
            } else if (p.githubUser) {
                // 通过 GitHub 拉取头像（无需额外配置）
                fetchJson(`https://api.github.com/users/${encodeURIComponent(p.githubUser)}`)
                    .then((u) => {
                        avatarImg.src = u.avatar_url;
                        avatarImg.style.display = "block";
                    })
                    .catch(() => {
                        // ignore: 保留原有渐变头像底纹
                    });
            }
        }

        const socialLinks = document.querySelectorAll(".social-link[data-social]");
        socialLinks.forEach((a) => {
            const key = a.getAttribute("data-social");
            let href = "";
            if (key === "github") href = p.githubUrl || (p.githubUser ? `https://github.com/${p.githubUser}` : "");
            if (key === "linkedin") href = p.linkedinUrl || "";
            if (key === "twitter") href = p.twitterUrl || "";
            if (href) {
                a.href = href;
                a.style.display = "";
            } else {
                // 避免占位符链接破坏视觉
                a.style.display = "none";
            }
        });
    }

    function fillProjectLinks() {
        const c = cfg();
        const repos = c.repos || {};

        const cards = document.querySelectorAll(".project-card[data-repo-key]");
        cards.forEach((card) => {
            const repoKey = card.getAttribute("data-repo-key");
            const fullName = repos[repoKey] || "";
            if (!fullName) return;

            const links = card.querySelectorAll("a.project-link");
            links.forEach((a) => {
                if (a.textContent && a.textContent.trim() === "GitHub") {
                    a.href = `https://github.com/${fullName}`;
                    a.style.display = "";
                }
            });
        });
    }

    function fillPapers() {
        const c = cfg();
        const papers = c.papers || {};
        const paperItems = document.querySelectorAll(".paper-item[data-paper-id]");
        paperItems.forEach((item) => {
            const id = item.getAttribute("data-paper-id");
            const paper = papers[id];
            const doiEl = item.querySelector(".paper-doi");
            if (!doiEl || !paper) return;

            const doiUrl = paper.doiUrl || "";
            const doiText = paper.doiText || "";

            if (!doiUrl) {
                doiEl.style.display = "none";
                return;
            }

            doiEl.href = doiUrl;
            doiEl.textContent = doiText ? `DOI：${doiText}` : "DOI：查看论文";
            doiEl.style.display = "inline-flex";
        });
    }

    async function updateRepoMetricsForCard(card) {
        const repoKey = card.getAttribute("data-repo-key") || "";
        if (!repoKey) return;

        const fullName = (cfg().repos && cfg().repos[repoKey]) || card.getAttribute("data-repo") || "";
        const repoMetrics = card.querySelector(".repo-metrics");
        if (!repoMetrics || !fullName) return;

        const starsEl = card.querySelector('.metric-value[data-metric="stars"]');
        const forksEl = card.querySelector('.metric-value[data-metric="forks"]');
        if (!starsEl || !forksEl) return;

        starsEl.textContent = "--";
        forksEl.textContent = "--";

        const cached = loadRepoCache(fullName);
        if (cached) {
            starsEl.textContent = fmtNumber(cached.stars);
            forksEl.textContent = fmtNumber(cached.forks);
            return;
        }

        try {
            const data = await fetchJson(`https://api.github.com/repos/${encodeURIComponent(fullName)}`);
            const stars = data.stargazers_count;
            const forks = data.forks_count;
            starsEl.textContent = fmtNumber(stars);
            forksEl.textContent = fmtNumber(forks);
            saveRepoCache(fullName, { stars, forks });
        } catch {
            // 失败则保持 --
        }
    }

    function resetRepoMetrics(cards) {
        cards.forEach((card) => {
            const starsEl = card.querySelector('.metric-value[data-metric="stars"]');
            const forksEl = card.querySelector('.metric-value[data-metric="forks"]');
            if (starsEl) starsEl.textContent = "--";
            if (forksEl) forksEl.textContent = "--";
        });
    }

    async function updateAllRepoMetrics() {
        const { githubMetrics } = getSettings();
        const cards = document.querySelectorAll(".project-card[data-repo-key]");
        if (!cards.length) return;

        if (!githubMetrics) {
            resetRepoMetrics(Array.from(cards));
            return;
        }

        for (const card of cards) {
            await updateRepoMetricsForCard(card);
        }
    }

    function init() {
        fillProfile();
        fillProjectLinks();
        fillPapers();
        updateAllRepoMetrics();

        document.addEventListener("techblog:settings-change", () => {
            updateAllRepoMetrics();
        });
    }

    window.TechBlogGitHub = { init, updateAllRepoMetrics };
})();

