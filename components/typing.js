(function () {
    const el = () => document.getElementById("typing-text");

    let running = false;
    let timer = null;
    let caretEl = null;

    let lines = [];
    let fallbackText = "";
    let lineIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function clearTimer() {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    }

    function getCfg() {
        const s = window.TechBlogSettings && window.TechBlogSettings.getConfig && window.TechBlogSettings.getConfig();
        return s || { typingEnabled: false, reduceMotion: true };
    }

    function ensureCaret(target) {
        if (caretEl && caretEl.parentElement === target) return caretEl;
        caretEl = document.createElement("span");
        caretEl.className = "typing-caret";
        target.appendChild(caretEl);
        return caretEl;
    }

    function renderText(target, text) {
        // 目标 span 只保留文本节点 + caret
        if (!target) return;
        const childNodes = Array.from(target.childNodes);
        childNodes.forEach((n) => {
            if (n !== caretEl) target.removeChild(n);
        });
        const textNode = document.createTextNode(text);
        target.insertBefore(textNode, caretEl);
    }

    function start() {
        const target = el();
        if (!target) return;
        if (running) return;

        running = true;
        timer = null;

        fallbackText = target.getAttribute("data-typing-fallback") || target.textContent || "";
        const rawLines = target.getAttribute("data-typing-lines") || fallbackText;
        lines = rawLines
            .split("|")
            .map((s) => s.trim())
            .filter(Boolean);
        if (!lines.length) lines = [fallbackText];

        caretEl = null;
        ensureCaret(target);

        lineIndex = 0;
        charIndex = 0;
        deleting = false;

        tick();
    }

    function stop() {
        const target = el();
        if (!target) return;
        running = false;
        clearTimer();

        if (caretEl && caretEl.parentElement === target) {
            target.removeChild(caretEl);
        }
        caretEl = null;
        target.textContent = fallbackText || target.getAttribute("data-typing-fallback") || "技术探索者";
    }

    function schedule(ms, fn) {
        clearTimer();
        timer = setTimeout(fn, ms);
    }

    function tick() {
        if (!running) return;
        const target = el();
        if (!target) return;

        const currentLine = lines[lineIndex % lines.length];

        if (!deleting) {
            charIndex += 1;
            const shown = currentLine.slice(0, charIndex);
            renderText(target, shown);

            if (charIndex >= currentLine.length) {
                deleting = true;
                schedule(900, tick);
                return;
            }

            schedule(60, tick);
            return;
        }

        // deleting
        charIndex -= 1;
        const shown = currentLine.slice(0, Math.max(0, charIndex));
        renderText(target, shown);

        if (charIndex <= 0) {
            deleting = false;
            lineIndex += 1;
            schedule(260, tick);
            return;
        }

        schedule(35, tick);
    }

    function onSettingsChange(cfg) {
        if (cfg && cfg.typingEnabled && !cfg.reduceMotion) start();
        else stop();
    }

    function init() {
        document.addEventListener("techblog:settings-change", (e) => onSettingsChange(e.detail));
        const cfg = getCfg();
        onSettingsChange(cfg);
    }

    window.TechBlogTyping = { init, start, stop };
})();

