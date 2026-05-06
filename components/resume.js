(function () {
    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function normalizeTags(tags) {
        if (!tags) return "";
        if (Array.isArray(tags)) return tags.map((t) => String(t).trim().toLowerCase()).filter(Boolean).join(",");
        return String(tags)
            .split(",")
            .map((t) => t.trim().toLowerCase())
            .filter(Boolean)
            .join(",");
    }

    function renderHighlights(items) {
        if (!Array.isArray(items) || !items.length) return "";
        const lis = items
            .map((t) => String(t).trim())
            .filter(Boolean)
            .map((t) => `<li>${escapeHtml(t)}</li>`)
            .join("");
        return `<ul class="resume-highlights">${lis}</ul>`;
    }

    function mergeContact(resumeCfg, profile) {
        const base = resumeCfg && resumeCfg.contact && typeof resumeCfg.contact === "object" ? { ...resumeCfg.contact } : {};
        const p = profile && typeof profile === "object" ? profile : {};
        if (!base.email && p.email) base.email = p.email;
        if (!base.phone && p.phone) base.phone = p.phone;
        if (!base.location && p.location) base.location = p.location;
        return base;
    }

    function renderContact(c) {
        if (!c || typeof c !== "object") return "";
        const bits = [];
        if (c.email) bits.push(`<a class="resume-contact-link" href="mailto:${escapeHtml(c.email)}">${escapeHtml(c.email)}</a>`);
        if (c.phone) bits.push(`<span class="resume-contact-text">${escapeHtml(c.phone)}</span>`);
        if (c.location) bits.push(`<span class="resume-contact-text">${escapeHtml(c.location)}</span>`);
        if (!bits.length) return "";
        return `<div class="resume-contact">${bits.join('<span class="resume-contact-sep">·</span>')}</div>`;
    }

    function renderExperience(list) {
        if (!Array.isArray(list) || !list.length) return "";
        const blocks = list
            .map((job) => {
                const company = escapeHtml(job.company || "");
                const role = escapeHtml(job.role || "");
                const period = escapeHtml(job.period || "");
                const loc = job.location ? `<span class="resume-meta-loc">${escapeHtml(job.location)}</span>` : "";
                const year = escapeHtml(job.year != null ? String(job.year) : "");
                const tags = normalizeTags(job.tags);
                const highlights = renderHighlights(job.highlights);
                return `
                    <article class="resume-experience-item" data-year="${year}" data-tags="${escapeHtml(tags)}">
                        <header class="resume-item-head">
                            <div>
                                <h3 class="resume-item-title">${role}</h3>
                                <p class="resume-item-sub">${company}${loc}</p>
                            </div>
                            <span class="resume-item-period">${period}</span>
                        </header>
                        ${highlights}
                    </article>
                `;
            })
            .join("");
        return `
            <div class="resume-card resume-block">
                <h3 class="resume-block-title"><span class="resume-block-icon" aria-hidden="true"></span>工作经历</h3>
                <div class="resume-timeline">${blocks}</div>
            </div>
        `;
    }

    function renderEducation(list) {
        if (!Array.isArray(list) || !list.length) return "";
        const blocks = list
            .map((ed) => {
                const school = escapeHtml(ed.school || "");
                const degree = escapeHtml(ed.degree || "");
                const period = escapeHtml(ed.period || "");
                const extra = ed.extra ? `<p class="resume-edu-extra">${escapeHtml(ed.extra)}</p>` : "";
                const year = escapeHtml(ed.year != null ? String(ed.year) : "");
                const tags = normalizeTags(ed.tags);
                return `
                    <article class="resume-education-item" data-year="${year}" data-tags="${escapeHtml(tags)}">
                        <header class="resume-item-head">
                            <div>
                                <h3 class="resume-item-title">${degree}</h3>
                                <p class="resume-item-sub">${school}</p>
                                ${extra}
                            </div>
                            <span class="resume-item-period">${period}</span>
                        </header>
                    </article>
                `;
            })
            .join("");
        return `
            <div class="resume-card resume-block">
                <h3 class="resume-block-title"><span class="resume-block-icon resume-block-icon--edu" aria-hidden="true"></span>教育背景</h3>
                <div class="resume-timeline">${blocks}</div>
            </div>
        `;
    }

    function renderSkillGroups(groups) {
        if (!Array.isArray(groups) || !groups.length) return "";
        const html = groups
            .map((g) => {
                const title = escapeHtml(g.title || "技能");
                const skills = (Array.isArray(g.skills) ? g.skills : [])
                    .map((s) => String(s).trim())
                    .filter(Boolean)
                    .map((s) => `<span class="resume-skill-pill">${escapeHtml(s)}</span>`)
                    .join("");
                if (!skills) return "";
                return `
                    <div class="resume-skill-group">
                        <h4 class="resume-skill-cat">${title}</h4>
                        <div class="resume-skill-pills">${skills}</div>
                    </div>
                `;
            })
            .join("");
        if (!html) return "";
        return `
            <div class="resume-card resume-block resume-block--skills">
                <h3 class="resume-block-title"><span class="resume-block-icon resume-block-icon--skill" aria-hidden="true"></span>技能</h3>
                <div class="resume-skills-grid">${html}</div>
            </div>
        `;
    }

    function renderCertificates(list) {
        if (!Array.isArray(list) || !list.length) return "";
        const rows = list
            .map((c) => {
                const name = escapeHtml(c.name || "");
                const issuer = escapeHtml(c.issuer || "");
                const year = escapeHtml(c.year != null ? String(c.year) : "");
                const url = c.url ? String(c.url).trim() : "";
                const link = url
                    ? `<a class="resume-cert-link" href="${escapeHtml(url)}" target="_blank" rel="noreferrer noopener">查看</a>`
                    : "";
                return `
                    <li class="resume-cert-row">
                        <span class="resume-cert-name">${name}</span>
                        <span class="resume-cert-meta">${issuer}${year ? ` · ${year}` : ""}</span>
                        ${link}
                    </li>
                `;
            })
            .join("");
        return `
            <div class="resume-card resume-block">
                <h3 class="resume-block-title"><span class="resume-block-icon resume-block-icon--cert" aria-hidden="true"></span>证书与奖项</h3>
                <ul class="resume-cert-list">${rows}</ul>
            </div>
        `;
    }

    function setNavVisible(visible) {
        const link = document.querySelector('.nav-links a[href="#resume"]');
        if (link && link.parentElement) {
            link.parentElement.style.display = visible ? "" : "none";
        }
        const quick = document.querySelector('.document-list a[href="#resume"]');
        if (quick) quick.style.display = visible ? "" : "none";
    }

    function bindToolbar(r) {
        const pdf = document.getElementById("resume-pdf-link");
        if (pdf) {
            const url = r.pdfUrl && String(r.pdfUrl).trim();
            if (url) {
                pdf.href = url;
                pdf.removeAttribute("hidden");
            } else {
                pdf.setAttribute("hidden", "hidden");
            }
        }

        const printBtn = document.getElementById("resume-print-btn");
        if (printBtn) {
            printBtn.addEventListener("click", () => window.print());
        }
    }

    function init() {
        const section = document.getElementById("resume");
        const root = document.getElementById("resume-root");
        if (!section || !root) return;

        const cfg = window.TechBlogConfig || {};
        const r = cfg.resume;

        if (!r || r.enabled === false) {
            section.setAttribute("hidden", "hidden");
            section.style.display = "none";
            setNavVisible(false);
            return;
        }

        section.removeAttribute("hidden");
        section.style.display = "";

        const headline = r.headline ? `<p class="resume-headline">${escapeHtml(r.headline)}</p>` : "";
        const summary = r.summary ? `<p class="resume-summary">${escapeHtml(r.summary)}</p>` : "";
        const contact = renderContact(mergeContact(r, cfg.profile));

        root.innerHTML = `
            <div class="resume-intro resume-card">
                ${headline}
                ${summary}
                ${contact}
            </div>
            ${renderExperience(r.experience)}
            ${renderEducation(r.education)}
            ${renderSkillGroups(r.skillGroups)}
            ${renderCertificates(r.certificates)}
        `.trim();

        bindToolbar(r);
        setNavVisible(true);

        if (window.TechBlogFilters && typeof window.TechBlogFilters.applyFilter === "function") {
            window.TechBlogFilters.applyFilter();
        }
    }

    window.TechBlogResume = { init };
})();
