(function () {
    "use strict";

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function safeHttpUrl(raw) {
        if (raw == null) return "";
        const s = String(raw).trim();
        if (!s) return "";
        try {
            const u = new URL(s, window.location.href);
            if (u.protocol === "http:" || u.protocol === "https:") return u.href;
        } catch (e) {
            return "";
        }
        return "";
    }

    function displayName(resumeCfg, profile) {
        const n = resumeCfg && resumeCfg.name ? String(resumeCfg.name).trim() : "";
        if (n) return n;
        const p = profile && typeof profile === "object" ? profile : {};
        return p.name ? String(p.name).trim() : "";
    }

    function normalizeTags(tags) {
        if (!tags) return "";
        if (Array.isArray(tags)) {
            return tags.map((t) => String(t).trim().toLowerCase()).filter(Boolean).join(",");
        }
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
        const base =
            resumeCfg && resumeCfg.contact && typeof resumeCfg.contact === "object"
                ? { ...resumeCfg.contact }
                : {};
        const p = profile && typeof profile === "object" ? profile : {};
        if (!base.email && p.email) base.email = p.email;
        if (!base.phone && p.phone) base.phone = p.phone;
        if (!base.location && p.location) base.location = p.location;
        return base;
    }

    function renderContact(c) {
        if (!c || typeof c !== "object") return "";
        const parts = [];
        if (c.email) {
            parts.push(
                `<a class="resume-contact-a" href="mailto:${escapeHtml(c.email)}">${escapeHtml(c.email)}</a>`
            );
        }
        if (c.phone) parts.push(`<span>${escapeHtml(c.phone)}</span>`);
        if (c.location) parts.push(`<span>${escapeHtml(c.location)}</span>`);
        if (c.website) {
            const href = safeHttpUrl(c.website);
            if (href) {
                parts.push(
                    `<a class="resume-contact-a" href="${escapeHtml(href)}" target="_blank" rel="noreferrer noopener">${escapeHtml(c.website)}</a>`
                );
            } else {
                parts.push(`<span>${escapeHtml(c.website)}</span>`);
            }
        }
        if (!parts.length) return "";
        return `<p class="resume-contact">${parts.join('<span class="resume-contact-sep"> · </span>')}</p>`;
    }

    function renderExperience(list) {
        if (!Array.isArray(list) || !list.length) return "";
        const blocks = list
            .map((job) => {
                const company = escapeHtml(job.company || "");
                const role = escapeHtml(job.role || "");
                const period = escapeHtml(job.period || "");
                const loc = job.location
                    ? ` <span class="resume-entry-loc">${escapeHtml(job.location)}</span>`
                    : "";
                const year = escapeHtml(job.year != null ? String(job.year) : "");
                const tags = normalizeTags(job.tags);
                const highlights = renderHighlights(job.highlights);
                return `
                    <article class="resume-entry resume-experience-item" data-year="${year}" data-tags="${escapeHtml(tags)}">
                        <div class="resume-entry__meta">
                            <span class="resume-entry__period">${period}</span>
                        </div>
                        <div class="resume-entry__main">
                            <h3 class="resume-entry__title">${role}</h3>
                            <p class="resume-entry__org">${company}${loc}</p>
                            ${highlights}
                        </div>
                    </article>
                `;
            })
            .join("");
        return `
            <section class="resume-sec resume-sec--experience" aria-labelledby="resume-sec-exp">
                <h2 id="resume-sec-exp" class="resume-sec-title">工作经历</h2>
                <div class="resume-sec-body">${blocks}</div>
            </section>
        `;
    }

    function renderEducation(list) {
        if (!Array.isArray(list) || !list.length) return "";
        const blocks = list
            .map((ed) => {
                const school = escapeHtml(ed.school || "");
                const degree = escapeHtml(ed.degree || "");
                const period = escapeHtml(ed.period || "");
                const extra = ed.extra ? `<p class="resume-entry-extra">${escapeHtml(ed.extra)}</p>` : "";
                const year = escapeHtml(ed.year != null ? String(ed.year) : "");
                const tags = normalizeTags(ed.tags);
                return `
                    <article class="resume-entry resume-education-item" data-year="${year}" data-tags="${escapeHtml(tags)}">
                        <div class="resume-entry__meta">
                            <span class="resume-entry__period">${period}</span>
                        </div>
                        <div class="resume-entry__main">
                            <h3 class="resume-entry__title">${degree}</h3>
                            <p class="resume-entry__org">${school}</p>
                            ${extra}
                        </div>
                    </article>
                `;
            })
            .join("");
        return `
            <section class="resume-sec resume-sec--education" aria-labelledby="resume-sec-edu">
                <h2 id="resume-sec-edu" class="resume-sec-title">教育背景</h2>
                <div class="resume-sec-body">${blocks}</div>
            </section>
        `;
    }

    function renderSkillGroups(groups) {
        if (!Array.isArray(groups) || !groups.length) return "";
        const blocks = groups
            .map((g) => {
                const title = escapeHtml(g.title || "技能");
                const line = (Array.isArray(g.skills) ? g.skills : [])
                    .map((s) => String(s).trim())
                    .filter(Boolean)
                    .map((s) => escapeHtml(s))
                    .join(" · ");
                if (!line) return "";
                return `
                    <div class="resume-skill-block">
                        <h3 class="resume-skill-label">${title}</h3>
                        <p class="resume-skill-text">${line}</p>
                    </div>
                `;
            })
            .filter(Boolean)
            .join("");
        if (!blocks) return "";
        return `
            <section class="resume-sec resume-sec--skills" aria-labelledby="resume-sec-skills">
                <h2 id="resume-sec-skills" class="resume-sec-title">技能</h2>
                <div class="resume-sec-body resume-sec-body--compact">${blocks}</div>
            </section>
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
                const safe = safeHttpUrl(url);
                const meta = [issuer, year].filter(Boolean).join(" · ");
                const link = safe
                    ? `<a class="resume-cert-link" href="${escapeHtml(safe)}" target="_blank" rel="noreferrer noopener">查看</a>`
                    : "";
                return `
                    <li class="resume-cert-item">
                        <div class="resume-cert-core">
                            <span class="resume-cert-name">${name}</span>
                            ${meta ? `<span class="resume-cert-meta">${meta}</span>` : ""}
                        </div>
                        ${link}
                    </li>
                `;
            })
            .join("");
        return `
            <section class="resume-sec resume-sec--certs" aria-labelledby="resume-sec-certs">
                <h2 id="resume-sec-certs" class="resume-sec-title">证书与奖项</h2>
                <ul class="resume-cert-list">${rows}</ul>
            </section>
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
                const safe = safeHttpUrl(url);
                if (safe) {
                    pdf.href = safe;
                    pdf.removeAttribute("hidden");
                } else {
                    pdf.setAttribute("hidden", "hidden");
                }
            } else {
                pdf.setAttribute("hidden", "hidden");
            }
        }

        const printBtn = document.getElementById("resume-print-btn");
        if (printBtn) {
            printBtn.addEventListener("click", function () {
                window.print();
            });
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

        const nm = displayName(r, cfg.profile);
        const nameBlock = nm ? `<h1 class="resume-doc-name">${escapeHtml(nm)}</h1>` : "";
        const headline = r.headline ? `<p class="resume-headline">${escapeHtml(r.headline)}</p>` : "";
        const summary = r.summary ? `<p class="resume-summary">${escapeHtml(r.summary)}</p>` : "";
        const contact = renderContact(mergeContact(r, cfg.profile));

        const experienceHtml = renderExperience(r.experience);
        const educationHtml = renderEducation(r.education);
        const skillsHtml = renderSkillGroups(r.skillGroups);
        const certificatesHtml = renderCertificates(r.certificates);
        const asideHtml = [skillsHtml, certificatesHtml].filter(Boolean).join("");
        const asideEmpty = !asideHtml;

        root.innerHTML = `
            <div class="resume-doc">
                <header class="resume-doc-header">
                    ${nameBlock}
                    ${headline}
                    ${summary}
                    ${contact}
                </header>
                <div class="resume-doc-body${asideEmpty ? " resume-doc-body--single" : ""}">
                    <div class="resume-doc-col resume-doc-col--main">
                        ${experienceHtml}
                        ${educationHtml}
                    </div>
                    ${asideEmpty ? "" : `<div class="resume-doc-col resume-doc-col--side">${asideHtml}</div>`}
                </div>
            </div>
        `.trim();

        bindToolbar(r);
        setNavVisible(true);

        if (window.TechBlogFilters && typeof window.TechBlogFilters.applyFilter === "function") {
            window.TechBlogFilters.applyFilter();
        }
    }

    window.TechBlogResume = { init: init };
})();
