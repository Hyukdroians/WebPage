class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// --- Organic 3D Network Background ---
class OrganicNetworkBackground {
    constructor() {
        this.container = document.getElementById('canvas-container');
        this.container.innerHTML = '';
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.targetRotation = { x: 0, y: 0 };
        this.rotation = { x: 0, y: 0 };

        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            // Normalize mouse position -1 to 1
            this.mouse.x = (e.clientX / this.width) * 2 - 1;
            this.mouse.y = (e.clientY / this.height) * 2 - 1;
        });
    }

    init() {
        this.resize();
        this.createParticles();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.createParticles(); // Recreate on resize for better distribution
    }

    createParticles() {
        this.particles = [];
        const count = Math.floor((this.width * this.height) / 15000); // Density

        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: (Math.random() - 0.5) * 2000, // Wide spread
                y: (Math.random() - 0.5) * 2000,
                z: (Math.random() - 0.5) * 2000,
                baseX: (Math.random() - 0.5) * 2000,
                baseY: (Math.random() - 0.5) * 2000,
                baseZ: (Math.random() - 0.5) * 2000,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                vz: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }
    }

    project(p) {
        // Simple 3D Projection
        const fov = 800;
        const scale = fov / (fov + p.z);
        return {
            x: p.x * scale + this.width / 2,
            y: p.y * scale + this.height / 2,
            scale: scale
        };
    }

    rotate(p, angleX, angleY) {
        // Rotate Y
        let x = p.x * Math.cos(angleY) - p.z * Math.sin(angleY);
        let z = p.x * Math.sin(angleY) + p.z * Math.cos(angleY);
        let y = p.y;

        // Rotate X
        let y2 = y * Math.cos(angleX) - z * Math.sin(angleX);
        let z2 = y * Math.sin(angleX) + z * Math.cos(angleX);

        return { x: x, y: y2, z: z2 };
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Smooth rotation based on mouse
        this.targetRotation.y = this.mouse.x * 0.5; // Max rotation angle
        this.targetRotation.x = -this.mouse.y * 0.5;

        this.rotation.x += (this.targetRotation.x - this.rotation.x) * 0.05;
        this.rotation.y += (this.targetRotation.y - this.rotation.y) * 0.05;

        // Update and Draw Particles
        const projectedParticles = [];

        this.particles.forEach(p => {
            // Organic Movement
            p.x += p.vx;
            p.y += p.vy;
            p.z += p.vz;

            // Boundary Check (Wrap around)
            const limit = 1000;
            if (p.x > limit) p.x = -limit; if (p.x < -limit) p.x = limit;
            if (p.y > limit) p.y = -limit; if (p.y < -limit) p.y = limit;
            if (p.z > limit) p.z = -limit; if (p.z < -limit) p.z = limit;

            // Apply Rotation
            const rotated = this.rotate(p, this.rotation.x, this.rotation.y);

            // Zoom effect (Mouse Y moves camera Z slightly or scales)
            // Let's add a subtle "breathing" zoom
            const time = Date.now() * 0.001;
            rotated.z += Math.sin(time * 0.5) * 100;

            const proj = this.project(rotated);

            // Only store if visible (in front of camera)
            if (rotated.z > -700) {
                projectedParticles.push({ ...proj, z: rotated.z, orig: p });

                // Draw Dot
                const alpha = Math.max(0, (1 - Math.abs(rotated.z) / 1000) * 0.5); // Fade by depth
                this.ctx.beginPath();
                this.ctx.arc(proj.x, proj.y, p.size * proj.scale, 0, Math.PI * 2);

                // Theme Color
                const isLight = document.body.classList.contains('light-theme');
                const color = isLight ? `rgba(0, 0, 0, ${alpha})` : `rgba(255, 255, 255, ${alpha})`;

                this.ctx.fillStyle = color;
                this.ctx.fill();
            }
        });

        // Draw Curved Connections
        const isLight = document.body.classList.contains('light-theme');
        const baseStrokeAlpha = 0.15;
        this.ctx.strokeStyle = isLight ? `rgba(0, 0, 0, ${baseStrokeAlpha})` : `rgba(255, 255, 255, ${baseStrokeAlpha})`;
        this.ctx.lineWidth = 0.5;

        for (let i = 0; i < projectedParticles.length; i++) {
            const p1 = projectedParticles[i];

            let connections = 0;
            for (let j = i + 1; j < projectedParticles.length; j++) {
                const p2 = projectedParticles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    // Calculate Control Point for Curve
                    const midX = (p1.x + p2.x) / 2;
                    const midY = (p1.y + p2.y) / 2;
                    const offset = 20;
                    const cx = midX + (Math.random() - 0.5) * offset;
                    const cy = midY + (Math.random() - 0.5) * offset;

                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.quadraticCurveTo(cx, cy, p2.x, p2.y);

                    // Fade line by distance and depth
                    const depthAlpha = Math.min(p1.orig.size, p2.orig.size) * 0.1;
                    const distAlpha = 1 - (dist / 150);

                    const strokeColor = isLight ? `rgba(0, 0, 0, ${depthAlpha * distAlpha})` : `rgba(255, 255, 255, ${depthAlpha * distAlpha})`;
                    this.ctx.strokeStyle = strokeColor;
                    this.ctx.stroke();

                    connections++;
                    if (connections > 3) break; // Limit connections per particle
                }
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Add Theme Support to OrganicNetworkBackground
OrganicNetworkBackground.prototype.setTheme = function (isLight) {
    this.isLight = isLight;
};

// --- 3D Perspective Tilt ---
class PerspectiveTilt {
    constructor(el) {
        this.el = el;
        this.height = el.clientHeight;
        this.width = el.clientWidth;

        // Mouse tracking
        this.mouse = { x: 0, y: 0 };

        // Bind events
        document.addEventListener('mousemove', (e) => this.handleMove(e));
        window.addEventListener('resize', () => this.handleResize());

        this.update();
    }

    handleResize() {
        this.height = this.el.clientHeight;
        this.width = this.el.clientWidth;
    }

    handleMove(e) {
        // Calculate mouse position relative to window center
        const x = e.clientX - window.innerWidth / 2;
        const y = e.clientY - window.innerHeight / 2;

        this.mouse.x = x;
        this.mouse.y = y;
    }

    update() {
        // Max rotation angles (Reduced intensity)
        const maxRotateX = 5;
        const maxRotateY = 5;

        // Calculate rotation based on mouse position
        const rotateY = (this.mouse.x / (window.innerWidth / 2)) * maxRotateY;
        const rotateX = -(this.mouse.y / (window.innerHeight / 2)) * maxRotateX;

        // Apply Transform
        this.el.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale3d(1.02, 1.02, 1.02)
        `;

        // Dynamic Shadow for depth
        const shadowX = -rotateY * 1.5;
        const shadowY = rotateX * 1.5;
        const isLight = document.body.classList.contains('light-theme');
        const shadowColor = isLight ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.5)';
        const glowColor = isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)';

        this.el.style.textShadow = `
            ${shadowX}px ${shadowY}px 20px ${shadowColor},
            0 0 30px ${glowColor}
        `;

        requestAnimationFrame(() => this.update());
    }
}

// --- Main Logic ---

// 1. Header Scramble
const headerEl = document.getElementById('header-name');
const headerFx = new TextScramble(headerEl);
window.addEventListener('load', () => {
    headerFx.setText('kenchoi.xyz'); // KEN CHOI로 설정
    const bg = new OrganicNetworkBackground(); // Start Organic Network Background
    new PerspectiveTilt(headerEl); // Start 3D Tilt

    // Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            themeBtn.innerText = isLight ? 'Light' : 'Dark';
            bg.setTheme(isLight);
        });
    }

    // Role Cycling Animation Start (페이지 로드 후 바로 시작)
    setTimeout(nextRole, 2000);
});

// 2. Role Cycling (Header Role 텍스트에 적용)
const roles = [
    { text: 'UI-UX Design' },
    { text: 'Front-end Junior'},
    { text: 'Video Editing' },
    { text: 'Graphic Design' }
];

// span.ko를 직접 타깃으로 사용
const roleEl = document.querySelector('#role-scramble-target .ko');
const roleFx = new TextScramble(roleEl);
let roleIndex = 0;

function nextRole() {
    roleIndex = (roleIndex + 1) % roles.length;
    const role = roles[roleIndex];

    // 텍스트 스크램블
    roleFx
        .setText(role.text.replace(/\s+/g, ' ').trim())
        .then(() => {
            // 줄바꿈 복원
            roleEl.innerHTML = role.text.replace(/\n/g, '<br>');
            setTimeout(nextRole, 4000); // 4초마다 다음 롤
        });
}


// Global Scramble on Reveal Observer (Role Scramble을 제외한 나머지 요소만 관찰)
const scrambleObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const scrambleObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Check if already scrambled to avoid re-running
            if (!entry.target.classList.contains('scrambled-done')) {
                // Ensure it's visible first
                entry.target.style.opacity = 1;

                const fx = new TextScramble(entry.target);
                fx.setText(entry.target.innerText);
                entry.target.classList.add('scrambled-done');
                observer.unobserve(entry.target); // 한 번만 실행
            }
        }
    });
}, scrambleObserverOptions);

// Observe all elements with class 'scramble-scroll'
document.querySelectorAll('.scramble-scroll').forEach(el => {
    scrambleObserver.observe(el);
});

// Reveal Animation Observer (Blur Fade)
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});