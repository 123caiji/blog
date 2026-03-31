(function () {
    function qs(selector) {
        return document.querySelector(selector);
    }
    function qsa(selector) {
        return Array.from(document.querySelectorAll(selector));
    }

    function applyFilter() {
        const yearChip = qs('.filter-chips[data-filter-type="year"] .filter-chip.is-active');
        const tagChip = qs('.filter-chips[data-filter-type="tag"] .filter-chip.is-active');
        const year = yearChip ? yearChip.getAttribute("data-year") : "all";
        const tag = tagChip ? tagChip.getAttribute("data-tag") : "all";

        const papers = qsa(".paper-item");
        const projects = qsa(".project-card");
        let visibleCount = 0;

        function matchItem(el) {
            const itemYear = el.getAttribute("data-year") || "";
            const tags = (el.getAttribute("data-tags") || "").split(",").map((t) => t.trim()).filter(Boolean);

            const yearOk = year === "all" || itemYear === year;
            const tagOk = tag === "all" || tags.includes(tag);
            return yearOk && tagOk;
        }

        [...papers, ...projects].forEach((el) => {
            if (matchItem(el)) {
                el.classList.remove("is-hidden");
                visibleCount += 1;
            } else {
                el.classList.add("is-hidden");
            }
        });

        const summary = qs("#filter-summary");
        if (summary) {
            const yearText = year === "all" ? "全部年份" : year;
            const tagText =
                tag === "all"
                    ? "全部标签"
                    : {
                          ai: "AI",
                          blockchain: "区块链",
                          iot: "物联网",
                      }[tag] || tag;
            summary.textContent = `当前：${yearText} · ${tagText} · 共 ${visibleCount} 条记录`;
        }
    }

    function bindChips() {
        const chipGroups = qsa(".filter-chips");
        chipGroups.forEach((group) => {
            group.addEventListener("click", (e) => {
                const target = e.target;
                if (!(target instanceof HTMLElement)) return;
                if (!target.classList.contains("filter-chip")) return;

                const chips = Array.from(group.querySelectorAll(".filter-chip"));
                chips.forEach((c) => c.classList.remove("is-active"));
                target.classList.add("is-active");

                applyFilter();
            });
        });
    }

    function init() {
        bindChips();
        applyFilter();
    }

    window.TechBlogFilters = { init, applyFilter };
})();

