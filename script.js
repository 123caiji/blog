(function () {
    "use strict";

    var FILTER_STATE = { year: "" };

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function getFilterableArticles() {
        var root = document.getElementById("resume-root");
        if (!root) return [];
        return Array.prototype.slice.call(
            root.querySelectorAll(".resume-experience-item, .resume-education-item")
        );
    }

    function collectYears() {
        var set = {};
        getFilterableArticles().forEach(function (el) {
            var y = (el.getAttribute("data-year") || "").trim();
            if (y) set[y] = true;
        });
        return Object.keys(set).sort(function (a, b) {
            return Number(b) - Number(a);
        });
    }

    function applyYearVisibility() {
        var year = FILTER_STATE.year || "";
        getFilterableArticles().forEach(function (el) {
            var dy = (el.getAttribute("data-year") || "").trim();
            if (!dy) {
                el.removeAttribute("hidden");
                return;
            }
            if (!year) {
                el.removeAttribute("hidden");
                return;
            }
            if (dy === year) el.removeAttribute("hidden");
            else el.setAttribute("hidden", "hidden");
        });
    }

    function bindChipClicks(container) {
        container.addEventListener("click", function (e) {
            var btn = e.target.closest(".resume-filter-chip");
            if (!btn || !container.contains(btn)) return;
            var y = btn.getAttribute("data-year") || "";
            FILTER_STATE.year = y;
            Array.prototype.forEach.call(container.querySelectorAll(".resume-filter-chip"), function (b) {
                b.classList.toggle("is-active", (b.getAttribute("data-year") || "") === y);
            });
            applyYearVisibility();
        });
    }

    function buildYearChips() {
        var wrap = document.getElementById("resume-year-filter");
        if (!wrap) return;
        var years = collectYears();
        if (!years.length) {
            wrap.innerHTML = "";
            wrap.setAttribute("hidden", "hidden");
            FILTER_STATE.year = "";
            return;
        }
        wrap.removeAttribute("hidden");
        var current = FILTER_STATE.year;
        if (current && years.indexOf(current) === -1) {
            FILTER_STATE.year = "";
            current = "";
        }
        var parts = [
            '<button type="button" class="resume-filter-chip' +
                (!current ? " is-active" : "") +
                '" data-year="">' +
                escapeHtml("全部") +
                "</button>"
        ];
        years.forEach(function (y) {
            parts.push(
                '<button type="button" class="resume-filter-chip' +
                    (current === y ? " is-active" : "") +
                    '" data-year="' +
                    escapeHtml(y) +
                    '">' +
                    escapeHtml(y) +
                    "</button>"
            );
        });
        wrap.innerHTML = parts.join("");
        bindChipClicks(wrap);
        applyYearVisibility();
    }

    window.TechBlogFilters = {
        applyFilter: function () {
            buildYearChips();
        }
    };

    document.addEventListener("DOMContentLoaded", function () {
        if (window.TechBlogResume && typeof window.TechBlogResume.init === "function") {
            window.TechBlogResume.init();
        }
    });
})();
