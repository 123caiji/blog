const canvasContainer = document.createElement('div');
canvasContainer.id = 'art-background';
canvasContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    opacity: 0.4;
`;
document.body.appendChild(canvasContainer);

const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js';
document.head.appendChild(script);

script.onload = function() {
    new p5(function(p) {
        let particles = [];
        let flowField = [];
        let cols, rows;
        let scl = 20;
        
        const params = {
            seed: 42,
            particleCount: 300,
            flowSpeed: 0.02,
            noiseScale: 0.003,
            trailLength: 3,
            colors: ['#c9a962', '#e94560', '#6a9bcc']
        };

        p.setup = function() {
            let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.parent('art-background');
            canvas.style.display = 'block';
            
            p.randomSeed(params.seed);
            p.noiseSeed(params.seed);
            
            cols = p.floor(p.width / scl);
            rows = p.floor(p.height / scl);
            
            generateFlowField();
            initializeParticles();
        };

        function generateFlowField() {
            flowField = [];
            for (let y = 0; y < rows; y++) {
                flowField[y] = [];
                for (let x = 0; x < cols; x++) {
                    let angle = p.noise(x * params.noiseScale, y * params.noiseScale) * p.TWO_PI * 4;
                    let v = p.createVector(p.cos(angle), p.sin(angle));
                    flowField[y][x] = v;
                }
            }
        }

        function initializeParticles() {
            particles = [];
            for (let i = 0; i < params.particleCount; i++) {
                particles.push(new Particle());
            }
        }

        p.draw = function() {
            p.background(0, 0, 0, 0);
            
            for (let particle of particles) {
                particle.follow();
                particle.update();
                particle.edges();
                particle.show();
            }
        };

        p.windowResized = function() {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
            cols = p.floor(p.width / scl);
            rows = p.floor(p.height / scl);
            generateFlowField();
        };

        class Particle {
            constructor() {
                this.pos = p.createVector(p.random(p.width), p.random(p.height));
                this.vel = p.createVector(0, 0);
                this.acc = p.createVector(0, 0);
                this.maxSpeed = 2;
                this.size = p.random(1, 3);
                this.color = params.colors[p.floor(p.random(params.colors.length))];
                this.alpha = p.random(50, 150);
            }

            follow() {
                let x = p.floor(this.pos.x / scl);
                let y = p.floor(this.pos.y / scl);
                
                if (x >= 0 && x < cols && y >= 0 && y < rows) {
                    let force = flowField[y][x];
                    force.mult(params.flowSpeed * 50);
                    this.applyForce(force);
                }
            }

            applyForce(force) {
                this.acc.add(force);
            }

            update() {
                this.vel.add(this.acc);
                this.vel.limit(this.maxSpeed);
                this.pos.add(this.vel);
                this.acc.mult(0);
            }

            edges() {
                if (this.pos.x < 0) this.pos.x = p.width;
                if (this.pos.x > p.width) this.pos.x = 0;
                if (this.pos.y < 0) this.pos.y = p.height;
                if (this.pos.y > p.height) this.pos.y = 0;
            }

            show() {
                p.stroke(this.color);
                p.strokeWeight(this.size);
                p.line(
                    this.pos.x - this.vel.x * params.trailLength,
                    this.pos.y - this.vel.y * params.trailLength,
                    this.pos.x,
                    this.pos.y
                );
            }
        }
    });
};