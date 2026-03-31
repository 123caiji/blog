(function () {
    const canvas = () => document.getElementById("particle-canvas");
    const ctx = () => canvas()?.getContext("2d");

    let animationId = null;
    let particles = [];
    let lastW = 0;
    let lastH = 0;

    // 计算量控制：自动按视口面积生成有限数量点
    function clamp(n, min, max) {
        return Math.max(min, Math.min(max, n));
    }

    function rand(min, max) {
        return min + Math.random() * (max - min);
    }

    function getCfg() {
        const s = window.TechBlogSettings && window.TechBlogSettings.getConfig && window.TechBlogSettings.getConfig();
        return s || { particlesEnabled: false, reduceMotion: true };
    }

    function resizeIfNeeded() {
        const c = canvas();
        const x = ctx();
        if (!c || !x) return false;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = Math.floor(window.innerWidth);
        const h = Math.floor(window.innerHeight);

        if (w === lastW && h === lastH) return true;
        lastW = w;
        lastH = h;

        c.width = Math.floor(w * dpr);
        c.height = Math.floor(h * dpr);
        c.style.width = w + "px";
        c.style.height = h + "px";

        x.setTransform(dpr, 0, 0, dpr, 0, 0);
        return true;
    }

    function initParticles() {
        const c = canvas();
        const x = ctx();
        if (!c || !x) return;

        if (!resizeIfNeeded()) return;

        particles = [];
        const area = window.innerWidth * window.innerHeight;
        const count = clamp(Math.floor(area / 30000), 35, 95);

        for (let i = 0; i < count; i++) {
            particles.push({
                x: rand(0, window.innerWidth),
                y: rand(0, window.innerHeight),
                vx: rand(-0.35, 0.35),
                vy: rand(-0.35, 0.35),
                r: rand(0.7, 1.7),
            });
        }
    }

    function draw() {
        const x = ctx();
        if (!x) return;

        const w = window.innerWidth;
        const h = window.innerHeight;

        // 清屏（用轻微透明度模拟拖影，但减少抖动）
        x.clearRect(0, 0, w, h);

        // 线条阈值：越大连线越密
        const threshold = 120;
        const threshold2 = threshold * threshold;

        // 粒子移动
        for (const p of particles) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;
        }

        // 画线
        for (let i = 0; i < particles.length; i++) {
            const a = particles[i];
            for (let j = i + 1; j < particles.length; j++) {
                const b = particles[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const d2 = dx * dx + dy * dy;
                if (d2 > threshold2) continue;

                const d = Math.sqrt(d2);
                const alpha = 1 - d / threshold; // 0~1

                x.strokeStyle = `rgba(0, 240, 255, ${alpha * 0.25})`;
                x.lineWidth = 1;
                x.beginPath();
                x.moveTo(a.x, a.y);
                x.lineTo(b.x, b.y);
                x.stroke();
            }
        }

        // 画点
        for (const p of particles) {
            x.fillStyle = "rgba(156, 239, 255, 0.9)";
            x.beginPath();
            x.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            x.fill();
        }

        animationId = requestAnimationFrame(draw);
    }

    function start() {
        if (animationId) return;
        initParticles();
        animationId = requestAnimationFrame(draw);
    }

    function stop() {
        if (!animationId) return;
        cancelAnimationFrame(animationId);
        animationId = null;
        particles = [];
        const c = canvas();
        if (c) {
            const x = ctx();
            if (x) x.clearRect(0, 0, window.innerWidth, window.innerHeight);
        }
    }

    function onSettingsChange(cfg) {
        if (cfg && cfg.particlesEnabled && !cfg.reduceMotion) start();
        else stop();
    }

    function init() {
        window.addEventListener("resize", () => {
            // 尺寸变化后重新生成粒子（在下一次 start 时会重建）
            if (animationId) initParticles();
        });
        document.addEventListener("techblog:settings-change", (e) => onSettingsChange(e.detail));
        onSettingsChange(getCfg());
    }

    window.TechBlogParticles = { init, start, stop };
})();

