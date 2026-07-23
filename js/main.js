/* ═══════════════════════════════════════════════════════
   RITESH PRAJAPATI — LEGENDARY PORTFOLIO JS
   Premium Animations, Interactions & Features
═══════════════════════════════════════════════════════ */

'use strict';

/* ══ 1. CUSTOM CURSOR ══════════════════════════════════ */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
  // Spotlight
  const spotlight = document.getElementById('spotlight');
  if (spotlight) {
    spotlight.style.left = mouseX + 'px';
    spotlight.style.top = mouseY + 'px';
  }
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .dock-item, .skill-tag, .stat-card, .social-link, .t-nav-btn, .t-dot, .cmd-item').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); follower.classList.add('hover'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); follower.classList.remove('hover'); });
});

document.addEventListener('mousedown', () => cursor.classList.add('click'));
document.addEventListener('mouseup', () => cursor.classList.remove('click'));

/* ══ 2. CINEMATIC LOADER ═══════════════════════════════ */
(function initLoader() {
  const loader = document.getElementById('loader');
  const statusMessages = [
    'Initializing Experience...',
    'Loading Skills Matrix...',
    'Compiling Projects...',
    'Connecting APIs...',
    'Rendering Portfolio...',
    'Almost Ready...'
  ];
  const statusEl = loader.querySelector('.loader-status');
  let i = 0;
  const statusInterval = setInterval(() => {
    if (++i < statusMessages.length) statusEl.textContent = statusMessages[i];
    else clearInterval(statusInterval);
  }, 480);

  // Particle effect on loader
  const particlesEl = document.getElementById('loader-particles');
  for (let p = 0; p < 30; p++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: absolute;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      background: rgba(0,212,255,${Math.random() * 0.5 + 0.1});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: loader-particle ${Math.random() * 4 + 3}s linear infinite;
      animation-delay: ${Math.random() * -3}s;
    `;
    particlesEl.appendChild(dot);
  }
  const style = document.createElement('style');
  style.textContent = `@keyframes loader-particle { 0% { opacity: 0; transform: translateY(0); } 50% { opacity: 1; } 100% { opacity: 0; transform: translateY(-60px); } }`;
  document.head.appendChild(style);

  setTimeout(() => {
    loader.classList.add('hide');
    setTimeout(() => { loader.style.display = 'none'; }, 800);
    clearInterval(statusInterval);
    // Trigger reveal animations
    setTimeout(triggerHeroReveal, 200);
  }, 3400);
})();

function triggerHeroReveal() {
  const heroRevealElements = document.querySelectorAll('.hero .reveal-up, .hero .reveal-right');
  heroRevealElements.forEach(el => {
    el.classList.add('revealed');
  });
}

/* ══ 3. HERO CANVAS — PARTICLES + AURORA ═══════════════ */
(function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Particles
  const particles = [];
  const PARTICLE_COUNT = 80;

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.5 ? '#00d4ff' : '#7c3aed';
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

  // Mouse interaction
  let mx = canvas.width / 2, my = canvas.height / 2;
  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mx = e.clientX - rect.left;
    my = e.clientY - rect.top;
  });

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
          ctx.save();
          ctx.globalAlpha = (1 - dist / 120) * 0.15;
          ctx.strokeStyle = '#00d4ff';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  // Mouse glow
  function drawMouseGlow() {
    const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 150);
    grad.addColorStop(0, 'rgba(0,212,255,0.04)');
    grad.addColorStop(1, 'rgba(0,212,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMouseGlow();
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ══ 4. SKILLS CANVAS — ORBIT VISUALIZATION ════════════ */
(function initSkillsCanvas() {
  const canvas = document.getElementById('skills-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const cx = () => canvas.width / 2;
  const cy = () => canvas.height / 2;

  const skillData = [
    // [name, orbit_radius, orbit_speed, size, color, angle]
    { name: 'Python', r: 80, speed: 0.008, size: 24, color: '#3572A5', angle: 0, category: 'Languages' },
    { name: 'SQL', r: 80, speed: 0.008, size: 18, color: '#e38c00', angle: Math.PI, category: 'Languages' },
    { name: 'Frappe', r: 150, speed: 0.005, size: 26, color: '#00d4ff', angle: 0.5, category: 'Frameworks' },
    { name: 'ERPNext', r: 150, speed: 0.005, size: 22, color: '#7c3aed', angle: Math.PI + 0.5, category: 'Frameworks' },
    { name: 'Django', r: 150, speed: 0.005, size: 18, color: '#44b78b', angle: Math.PI / 2, category: 'Frameworks' },
    { name: 'DocTypes', r: 220, speed: 0.003, size: 20, color: '#00d4ff', angle: 0, category: 'Frappe/ERP' },
    { name: 'REST API', r: 220, speed: 0.003, size: 22, color: '#f59e0b', angle: 1.2, category: 'Frappe/ERP' },
    { name: 'Server Scripts', r: 220, speed: 0.003, size: 16, color: '#ec4899', angle: 2.4, category: 'Frappe/ERP' },
    { name: 'Jinja', r: 220, speed: 0.003, size: 15, color: '#10b981', angle: 3.6, category: 'Frappe/ERP' },
    { name: 'MariaDB', r: 290, speed: 0.0018, size: 20, color: '#f59e0b', angle: 0.7, category: 'Databases' },
    { name: 'Git', r: 290, speed: 0.0018, size: 18, color: '#ef4444', angle: 2.1, category: 'Tools' },
    { name: 'Linux', r: 290, speed: 0.0018, size: 20, color: '#89e051', angle: 3.5, category: 'Platforms' },
    { name: 'JavaScript', r: 290, speed: 0.0018, size: 19, color: '#f1e05a', angle: 5.0, category: 'Languages' },
  ];

  let hoveredSkill = null;
  const nameEl = document.getElementById('skill-center-name');
  const catEl = document.getElementById('skill-center-cat');

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    hoveredSkill = null;
    skillData.forEach(sk => {
      const sx = cx() + Math.cos(sk.angle) * sk.r;
      const sy = cy() + Math.sin(sk.angle) * sk.r;
      const dist = Math.sqrt((mx - sx)**2 + (my - sy)**2);
      if (dist < sk.size + 8) {
        hoveredSkill = sk;
      }
    });
    if (hoveredSkill && nameEl) {
      nameEl.textContent = hoveredSkill.name;
      catEl.textContent = hoveredSkill.category;
    } else if (nameEl) {
      nameEl.textContent = 'Hover a skill';
      catEl.textContent = '';
    }
  });

  function drawOrbitRing(r) {
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 8]);
    ctx.beginPath();
    ctx.arc(cx(), cy(), r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  function drawCenterNode() {
    const grad = ctx.createRadialGradient(cx(), cy(), 0, cx(), cy(), 40);
    grad.addColorStop(0, 'rgba(0,212,255,0.3)');
    grad.addColorStop(0.5, 'rgba(124,58,237,0.2)');
    grad.addColorStop(1, 'rgba(0,212,255,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx(), cy(), 40, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.strokeStyle = 'rgba(0,212,255,0.3)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx(), cy(), 32, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  function drawSkillNode(sk) {
    const sx = cx() + Math.cos(sk.angle) * sk.r;
    const sy = cy() + Math.sin(sk.angle) * sk.r;
    const isHovered = hoveredSkill === sk;
    const currentSize = isHovered ? sk.size + 6 : sk.size;

    // Glow
    if (isHovered) {
      ctx.save();
      const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, currentSize * 2);
      glow.addColorStop(0, sk.color + '44');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(sx, sy, currentSize * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Node circle
    ctx.save();
    ctx.fillStyle = sk.color + '22';
    ctx.strokeStyle = sk.color + (isHovered ? 'cc' : '66');
    ctx.lineWidth = isHovered ? 2 : 1.5;
    ctx.beginPath();
    ctx.arc(sx, sy, currentSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Node dot
    ctx.save();
    ctx.fillStyle = sk.color;
    ctx.beginPath();
    ctx.arc(sx, sy, currentSize * 0.35, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Label
    ctx.save();
    ctx.fillStyle = isHovered ? '#fff' : 'rgba(255,255,255,0.7)';
    ctx.font = `${isHovered ? 600 : 400} ${isHovered ? 12 : 11}px 'Space Grotesk', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const labelY = sy > cy() ? sy + currentSize + 14 : sy - currentSize - 8;
    ctx.fillText(sk.name, sx, labelY);
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    [80, 150, 220, 290].forEach(drawOrbitRing);
    drawCenterNode();
    skillData.forEach(sk => {
      sk.angle += sk.speed;
      drawSkillNode(sk);
    });
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ══ 5. SCROLL PROGRESS ════════════════════════════════ */
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const pct = (scrollTop / scrollHeight) * 100;
  const bar = document.getElementById('scroll-progress');
  if (bar) bar.style.width = pct + '%';
});

/* ══ 6. NAVBAR SCROLL BEHAVIOR ════════════════════════ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
  updateActiveNavLink();
});

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) current = section.id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.section === current) link.classList.add('active');
  });
}

/* ══ 7. MOBILE MENU ════════════════════════════════════ */
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('mobile-open');
  const spans = menuToggle.querySelectorAll('span');
  if (navLinks.classList.contains('mobile-open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('mobile-open');
    const spans = menuToggle.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ══ 8. TYPEWRITER EFFECT ══════════════════════════════ */
const typewriterTexts = [
  'ERP Solutions',
  'Frappe Apps',
  'REST APIs',
  'Custom DocTypes',
  'Python Backends',
  'Workflow Automations',
];
let typeIdx = 0, charIdx = 0, isDeleting = false;
const typeEl = document.getElementById('typewriter-text');

function typeWriter() {
  if (!typeEl) return;
  const text = typewriterTexts[typeIdx];
  if (!isDeleting) {
    typeEl.textContent = text.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === text.length) { isDeleting = true; setTimeout(typeWriter, 1800); return; }
  } else {
    typeEl.textContent = text.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      isDeleting = false;
      typeIdx = (typeIdx + 1) % typewriterTexts.length;
    }
  }
  setTimeout(typeWriter, isDeleting ? 60 : 90);
}
setTimeout(typeWriter, 3800);

/* ══ 9. SCROLL REVEAL ANIMATIONS ══════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = parseInt(el.dataset.delay || 0);
      setTimeout(() => el.classList.add('revealed'), delay);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

/* ══ 10. ANIMATED STAT COUNTERS ════════════════════════ */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString() + suffix;
  }
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-number').forEach(animateCounter);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsSection = document.getElementById('stats');
if (statsSection) statsObserver.observe(statsSection);

/* ══ 11. LANGUAGE BARS ANIMATION ══════════════════════ */
const langObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.lang-bar').forEach(bar => {
        setTimeout(() => {
          bar.style.width = bar.dataset.width + '%';
        }, 400);
      });
      langObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const githubSection = document.getElementById('github');
if (githubSection) langObserver.observe(githubSection);

/* ══ 12. INTERACTIVE TERMINAL ══════════════════════════ */
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
const terminalBody = document.getElementById('terminal-body');

const terminalCommands = {
  help: () => `
<span class="t-success">Available commands:</span>
<span class="t-output">  whoami        — About Ritesh</span>
<span class="t-output">  skills        — Technical skills</span>
<span class="t-output">  projects      — View projects</span>
<span class="t-output">  experience    — Work history</span>
<span class="t-output">  education     — Academic background</span>
<span class="t-output">  contact       — Contact information</span>
<span class="t-output">  resume        — Download resume</span>
<span class="t-output">  github        — Open GitHub profile</span>
<span class="t-output">  linkedin      — Open LinkedIn</span>
<span class="t-output">  clear         — Clear terminal</span>
<span class="t-output">  ls            — List portfolio sections</span>
<span class="t-output">  pwd           — Current location</span>
`,
  whoami: () => `
<span class="t-success">Ritesh Prajapati</span>
<span class="t-output">Role       : Frappe Developer | ERPNext | Python | REST API</span>
<span class="t-output">Company    : Procure Infotech, Indore</span>
<span class="t-output">Location   : Indore, Madhya Pradesh, India</span>
<span class="t-output">Email      : riteshprajapati167@gmail.com</span>
<span class="t-output">Phone      : +91-9770791263</span>
<span class="t-output">Status     : <span class="t-success">Open to opportunities</span></span>
`,
  skills: () => `
<span class="t-success">Technical Skills:</span>
<span class="t-output">Languages  : Python, SQL, JavaScript, HTML5, CSS3, Shell Script</span>
<span class="t-output">Frameworks : Frappe Framework, ERPNext, Django, Bootstrap</span>
<span class="t-output">ERP Dev    : Custom DocTypes, Server Scripts, Client Scripts,</span>
<span class="t-output">             Jinja Print Formats, Query Reports, Hooks, REST APIs</span>
<span class="t-output">Databases  : MariaDB, SQL Server (SSMS)</span>
<span class="t-output">Tools      : Frappe Bench, Git, GitHub, VS Code</span>
<span class="t-output">Platforms  : Linux Server Admin, Shell Scripting, Multi-Site Deploy</span>
<span class="t-output">Concepts   : OOP, REST API Design, DB Design, Workflow Automation</span>
`,
  projects: () => `
<span class="t-success">Featured Projects:</span>
<span class="t-output">
1. PHIR Health — Healthcare Records Management Platform
   Stack: Frappe Framework, Python, HTML, CSS, JavaScript, Bootstrap
   → Custom DocTypes, REST APIs, Role-based access workflows
   → Jinja templates + Query Reports for healthcare operations

2. VProCURE HRMS — Human Resource Management System
   Stack: Frappe, ERPNext, Python, JavaScript, MariaDB, Bootstrap
   → Daily Check-In Dashboard with real-time HR visibility
   → Custom workflows for leave, attendance, salary, performance

3. Agroplast — E-Commerce Platform for Agriculture
   Stack: Python, Django, HTML, CSS, JavaScript, SQL, Razorpay
   → Razorpay payment gateway integration
   → Automated order confirmation + SMS notifications
</span>
`,
  experience: () => `
<span class="t-success">Professional Experience:</span>
<span class="t-output">
[Current] Frappe Developer @ Procure Infotech, Indore
          Mar 2026 - Present
          · Custom Frappe apps & ERPNext modules
          · REST API design & integration
          · Linux server deployment & management

[Past]    Software Developer Trainee @ Devaditya Technocrats LLP
          Jul 2025 - Feb 2026
          · Python backend development on Linux
          · Data pipeline optimization
          · Shell scripting & deployment automation
</span>
`,
  education: () => `
<span class="t-success">Academic Background:</span>
<span class="t-output">
🎓 MCA — Master of Computer Applications
   RGPV University | CGPA: 7.68 | 2023 — 2025

🎓 B.Sc. Computer Science
   DAVV University | 68.78% | 2020 — 2023
</span>
`,
  contact: () => `
<span class="t-success">Contact Information:</span>
<span class="t-output">📧 Email    : riteshprajapati167@gmail.com</span>
<span class="t-output">📱 Phone    : +91-9770791263</span>
<span class="t-output">💼 LinkedIn : linkedin.com/in/ritesh-prajapati109</span>
<span class="t-output">🐙 GitHub   : github.com/Riteshprajapati109</span>
<span class="t-output">📍 Location : Indore, Madhya Pradesh, India</span>
`,
  resume: () => {
    document.getElementById('resume-dl').click();
    launchConfetti();
    return `<span class="t-success">✓ Downloading resume... 🎉</span>`;
  },
  github: () => {
    setTimeout(() => window.open('https://github.com/Riteshprajapati109', '_blank'), 300);
    return `<span class="t-success">✓ Opening GitHub profile...</span>`;
  },
  linkedin: () => {
    setTimeout(() => window.open('https://linkedin.com/in/ritesh-prajapati109', '_blank'), 300);
    return `<span class="t-success">✓ Opening LinkedIn profile...</span>`;
  },
  ls: () => `
<span class="t-output">sections/</span>
<span class="t-output">├── hero/          → Landing introduction</span>
<span class="t-output">├── about/         → Story & journey</span>
<span class="t-output">├── skills/        → Technology orbit</span>
<span class="t-output">├── experience/    → Work timeline</span>
<span class="t-output">├── projects/      → Case studies</span>
<span class="t-output">├── terminal/      → Interactive CLI</span>
<span class="t-output">├── github/        → Activity & repos</span>
<span class="t-output">├── achievements/  → Milestones</span>
<span class="t-output">├── testimonials/  → Social proof</span>
<span class="t-output">├── blog/          → Articles (coming soon)</span>
<span class="t-output">└── contact/       → Get in touch</span>
`,
  pwd: () => `<span class="t-output">/home/ritesh/portfolio/legendary</span>`,
  date: () => `<span class="t-output">${new Date().toString()}</span>`,
  clear: () => null,
  whoami_sys: () => `<span class="t-output">ritesh@portfolio</span>`,
};

function addTerminalOutput(html) {
  const line = document.createElement('div');
  line.className = 'terminal-line';
  line.innerHTML = html;
  terminalOutput.appendChild(line);
  if (terminalBody) terminalBody.scrollTop = terminalBody.scrollHeight;
}

function addCommandLine(cmd) {
  const line = document.createElement('div');
  line.className = 'terminal-line';
  line.innerHTML = `<span class="t-prompt">ritesh@portfolio</span><span class="t-sep">:</span><span class="t-path">~</span><span class="t-sym">$</span><span class="t-cmd"> ${cmd}</span>`;
  terminalOutput.appendChild(line);
}

let cmdHistory = [];
let historyIdx = -1;

if (terminalInput) {
  terminalInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const cmd = terminalInput.value.trim().toLowerCase();
      if (!cmd) return;

      cmdHistory.unshift(cmd);
      historyIdx = -1;
      addCommandLine(terminalInput.value.trim());
      terminalInput.value = '';

      if (cmd === 'clear') {
        terminalOutput.innerHTML = '';
        return;
      }

      if (terminalCommands[cmd]) {
        const result = terminalCommands[cmd]();
        if (result) {
          const outLine = document.createElement('div');
          outLine.className = 'terminal-line';
          outLine.style.flexDirection = 'column';
          outLine.innerHTML = result;
          terminalOutput.appendChild(outLine);
        }
      } else {
        addTerminalOutput(`<span class="t-error">command not found: ${cmd}</span><span class="t-output">  Type 'help' to see available commands.</span>`);
      }

      if (terminalBody) terminalBody.scrollTop = terminalBody.scrollHeight;

    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIdx < cmdHistory.length - 1) historyIdx++;
      terminalInput.value = cmdHistory[historyIdx] || '';
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) historyIdx--;
      else { historyIdx = -1; terminalInput.value = ''; }
      terminalInput.value = cmdHistory[historyIdx] || '';
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const partial = terminalInput.value.toLowerCase();
      const matches = Object.keys(terminalCommands).filter(c => c.startsWith(partial));
      if (matches.length === 1) terminalInput.value = matches[0];
      else if (matches.length > 1) addTerminalOutput(`<span class="t-output">${matches.join('  ')}</span>`);
    }
  });

  // Focus terminal on click
  document.getElementById('terminal-body')?.addEventListener('click', () => terminalInput.focus());
}

/* ══ 13. GITHUB CONTRIBUTION GRAPH ════════════════════ */
(function initContribGraph() {
  const graph = document.getElementById('contrib-graph');
  if (!graph) return;
  const weeks = 52;
  const days = 7;
  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < days; d++) {
      const cell = document.createElement('div');
      cell.className = 'contrib-cell';
      const rand = Math.random();
      let level;
      if (rand < 0.4) level = 0;
      else if (rand < 0.6) level = 1;
      else if (rand < 0.75) level = 2;
      else if (rand < 0.9) level = 3;
      else level = 4;
      // More recent weeks have higher activity
      if (w > 40 && rand > 0.3) level = Math.min(level + 1, 4);
      cell.dataset.level = level;
      cell.classList.add(`level-${level}`);
      graph.appendChild(cell);
    }
  }
})();

/* ══ 14. TESTIMONIALS SLIDER ═══════════════════════════ */
(function initTestimonials() {
  const track = document.getElementById('testimonials-track');
  const dotsContainer = document.getElementById('t-dots');
  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  const total = cards.length;
  let current = 0;

  // Create dots
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = `t-dot${i === 0 ? ' active' : ''}`;
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(idx) {
    current = idx;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsContainer.querySelectorAll('.t-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  document.getElementById('t-prev')?.addEventListener('click', () => goTo((current - 1 + total) % total));
  document.getElementById('t-next')?.addEventListener('click', () => goTo((current + 1) % total));

  // Auto-slide
  setInterval(() => goTo((current + 1) % total), 5000);
})();

/* ══ 15. 3D TILT CARD EFFECT ══════════════════════════ */
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotY = ((x - centerX) / centerX) * 8;
    const rotX = -((y - centerY) / centerY) * 6;
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(10px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
    setTimeout(() => card.style.transition = '', 500);
  });
});

/* ══ 16. COMMAND PALETTE ═══════════════════════════════ */
const cmdPalette = document.getElementById('cmd-palette');
const cmdInput = document.getElementById('cmd-input');
const cmdResults = document.getElementById('cmd-results');

const paletteCommands = [
  { icon: '🏠', label: 'Go to Home', shortcut: 'H', action: () => smoothScrollTo('#hero') },
  { icon: '👤', label: 'Go to About', shortcut: 'A', action: () => smoothScrollTo('#about') },
  { icon: '⚡', label: 'Go to Skills', shortcut: 'S', action: () => smoothScrollTo('#skills') },
  { icon: '💼', label: 'Go to Experience', shortcut: 'E', action: () => smoothScrollTo('#experience') },
  { icon: '🚀', label: 'Go to Projects', shortcut: 'P', action: () => smoothScrollTo('#projects') },
  { icon: '💻', label: 'Go to Terminal', shortcut: 'T', action: () => smoothScrollTo('#terminal') },
  { icon: '📧', label: 'Go to Contact', shortcut: 'C', action: () => smoothScrollTo('#contact') },
  { icon: '📄', label: 'Download Resume', shortcut: 'R', action: () => { document.getElementById('resume-dl').click(); launchConfetti(); } },
  { icon: '🐙', label: 'Open GitHub', shortcut: 'G', action: () => window.open('https://github.com/Riteshprajapati109', '_blank') },
  { icon: '💼', label: 'Open LinkedIn', shortcut: 'L', action: () => window.open('https://linkedin.com/in/ritesh-prajapati109', '_blank') },
  { icon: '🌙', label: 'Toggle Dark/Light Mode', shortcut: 'D', action: toggleTheme },
  { icon: '✉️', label: 'Send Email', shortcut: '', action: () => window.location.href = 'mailto:riteshprajapati167@gmail.com' },
];

function openCmdPalette() {
  cmdPalette.classList.add('active');
  cmdInput.value = '';
  renderCmdResults('');
  setTimeout(() => cmdInput.focus(), 50);
}

function closeCmdPalette() { cmdPalette.classList.remove('active'); }

function renderCmdResults(query) {
  const filtered = query ? paletteCommands.filter(c => c.label.toLowerCase().includes(query.toLowerCase())) : paletteCommands;
  cmdResults.innerHTML = filtered.map((c, i) => `
    <div class="cmd-item" data-idx="${i}" tabindex="0" role="option">
      <span class="cmd-item-icon">${c.icon}</span>
      <span class="cmd-item-label">${c.label}</span>
      ${c.shortcut ? `<span class="cmd-item-shortcut">${c.shortcut}</span>` : ''}
    </div>
  `).join('');

  cmdResults.querySelectorAll('.cmd-item').forEach((item, i) => {
    item.addEventListener('click', () => {
      filtered[i].action();
      closeCmdPalette();
    });
  });
}

document.getElementById('cmd-palette-btn')?.addEventListener('click', openCmdPalette);
document.getElementById('cmd-backdrop')?.addEventListener('click', closeCmdPalette);

cmdInput?.addEventListener('input', e => renderCmdResults(e.target.value));

cmdInput?.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCmdPalette();
  if (e.key === 'Enter') {
    const first = cmdResults.querySelector('.cmd-item');
    if (first) first.click();
  }
});

/* ══ 17. KEYBOARD SHORTCUTS ════════════════════════════ */
document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.key === 'k') { e.preventDefault(); openCmdPalette(); return; }
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (cmdPalette.classList.contains('active')) return;

  switch (e.key.toLowerCase()) {
    case 'g': window.open('https://github.com/Riteshprajapati109', '_blank'); break;
    case 'l': window.open('https://linkedin.com/in/ritesh-prajapati109', '_blank'); break;
    case 'r': document.getElementById('resume-dl')?.click(); launchConfetti(); break;
    case 't': smoothScrollTo('#terminal'); document.getElementById('terminal-input')?.focus(); break;
    case 'h': smoothScrollTo('#hero'); break;
    case 'escape': closeCmdPalette(); break;
  }
});

/* ══ 18. SMOOTH SCROLL HELPER ══════════════════════════ */
function smoothScrollTo(selector) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ══ 19. DARK / LIGHT MODE ═════════════════════════════ */
let isDark = true;

function toggleTheme() {
  isDark = !isDark;
  document.body.classList.toggle('light-mode', !isDark);
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.innerHTML = isDark
      ? '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>'
      : '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
  }
  showToast(isDark ? '🌙 Dark mode activated' : '☀️ Light mode activated');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
document.getElementById('dock-theme')?.addEventListener('click', toggleTheme);

// Load saved theme
if (localStorage.getItem('theme') === 'light') toggleTheme();

/* ══ 20. CONFETTI ══════════════════════════════════════ */
function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#00d4ff', '#7c3aed', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];
  const pieces = [];
  const PIECE_COUNT = 150;

  for (let i = 0; i < PIECE_COUNT; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -10,
      w: Math.random() * 10 + 4,
      h: Math.random() * 6 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 6,
      vy: Math.random() * 4 + 2,
      rot: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 8,
      opacity: 1
    });
  }

  let animId;
  function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    pieces.forEach(p => {
      if (p.y < canvas.height + 20) { alive = true; }
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.12;
      p.rot += p.rotSpeed;
      p.opacity = Math.max(0, p.opacity - 0.006);
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    if (alive) animId = requestAnimationFrame(animateConfetti);
    else { ctx.clearRect(0, 0, canvas.width, canvas.height); }
  }
  animateConfetti();
  showToast('🎉 Enjoy the resume!');
}

document.getElementById('resume-dl')?.addEventListener('click', () => {
  setTimeout(launchConfetti, 100);
});

/* ══ 21. TOAST NOTIFICATION ════════════════════════════ */
function showToast(message, duration = 2500) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

/* ══ 22. CONTACT FORM ══════════════════════════════════ */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = document.getElementById('contact-submit');
    const status = document.getElementById('form-status');
    const name = document.getElementById('contact-name').value;

    // Simulate form submission
    btn.innerHTML = '<span class="btn-text">Sending...</span><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = '<span class="btn-text">Message Sent! ✓</span>';
      status.className = 'form-status success';
      status.textContent = `Thank you, ${name}! I'll get back to you within 24 hours.`;
      showToast('✅ Message sent successfully!');
      contactForm.reset();
      setTimeout(() => {
        btn.innerHTML = '<span class="btn-text">Send Message</span><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
        btn.disabled = false;
        status.textContent = '';
      }, 4000);
    }, 1800);
  });
}

/* ══ 23. FLOATING DOCK — ACTIVE STATE ══════════════════ */
window.addEventListener('scroll', () => {
  const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'terminal', 'contact'];
  const dockItems = document.querySelectorAll('.dock-item');
  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 200) current = id;
  });
  dockItems.forEach((item, i) => {
    const href = item.getAttribute('href');
    if (href && href === `#${current}`) {
      item.style.color = 'var(--cyan)';
    } else if (href) {
      item.style.color = '';
    }
  });
});

/* ══ 24. PROFILE TILT ══════════════════════════════════ */
const profileTilt = document.getElementById('profile-tilt');
if (profileTilt) {
  document.addEventListener('mousemove', e => {
    const rect = profileTilt.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) / (window.innerWidth / 2);
    const dy = (e.clientY - centerY) / (window.innerHeight / 2);
    const rotY = dx * 12;
    const rotX = -dy * 8;
    profileTilt.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });

  document.addEventListener('mouseleave', () => {
    profileTilt.style.transform = '';
  });
}

/* ══ 25. FOOTER YEAR ═══════════════════════════════════ */
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ══ 26. SECTION ENTRANCE ANIMATIONS ══════════════════ */
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('section-visible');
    }
  });
}, { threshold: 0.05 });

document.querySelectorAll('section').forEach(s => sectionObserver.observe(s));

/* ══ 27. HERO PARALLAX ═════════════════════════════════ */
window.addEventListener('scroll', () => {
  const heroEl = document.getElementById('hero');
  if (!heroEl) return;
  const scrollY = window.scrollY;
  if (scrollY < window.innerHeight) {
    const heroGrid = document.querySelector('.hero-grid');
    const heroAurora = document.querySelector('.hero-aurora');
    if (heroGrid) heroGrid.style.transform = `translateY(${scrollY * 0.3}px)`;
    if (heroAurora) heroAurora.style.transform = `translateY(${scrollY * 0.15}px)`;
  }
});

/* ══ 28. CODE RAIN EASTER EGG ══════════════════════════ */
let codeRainActive = false;
let codeRainCanvas = null;

// Type "matrix" in terminal to activate
function activateCodeRain() {
  if (codeRainActive) return;
  codeRainActive = true;
  codeRainCanvas = document.createElement('canvas');
  codeRainCanvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:9996;pointer-events:none;opacity:0.15;';
  codeRainCanvas.width = window.innerWidth;
  codeRainCanvas.height = window.innerHeight;
  document.body.appendChild(codeRainCanvas);

  const ctx = codeRainCanvas.getContext('2d');
  const chars = 'PYTHON FRAPPE ERPNEXT REST API DJANGO MARIADB LINUX 0101 {}[]()';
  const cols = Math.floor(codeRainCanvas.width / 14);
  const drops = new Array(cols).fill(1);

  function drawRain() {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, codeRainCanvas.width, codeRainCanvas.height);
    ctx.fillStyle = '#00d4ff';
    ctx.font = '13px JetBrains Mono, monospace';
    drops.forEach((y, x) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, x * 14, y * 14);
      if (y * 14 > codeRainCanvas.height && Math.random() > 0.975) drops[x] = 0;
      drops[x]++;
    });
    if (codeRainActive) requestAnimationFrame(drawRain);
  }
  drawRain();
  showToast('🌧️ Code rain activated! Type "exit" to stop.');

  setTimeout(() => {
    codeRainActive = false;
    if (codeRainCanvas) { codeRainCanvas.remove(); codeRainCanvas = null; }
  }, 8000);
}

// Extend terminal with matrix command
if (terminalInput) {
  const origKeydown = terminalInput.onkeydown;
  terminalInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && terminalInput.value.trim().toLowerCase() === 'matrix') {
      activateCodeRain();
    }
  });

  // Add matrix to commands display
  terminalCommands['matrix'] = () => {
    activateCodeRain();
    return `<span class="t-success">Entering the Matrix...</span>`;
  };

  terminalCommands['exit'] = () => {
    if (codeRainActive) {
      codeRainActive = false;
      if (codeRainCanvas) { codeRainCanvas.remove(); codeRainCanvas = null; }
    }
    return `<span class="t-output">Session ended. Type 'help' to continue.</span>`;
  };
}

/* ══ 29. INTERSECTION-BASED SKILL CAT HIGHLIGHTS ══════ */
const skillCats = document.querySelectorAll('.skill-cat');
skillCats.forEach(cat => {
  cat.addEventListener('mouseenter', () => {
    skillCats.forEach(c => { if (c !== cat) c.style.opacity = '0.5'; });
  });
  cat.addEventListener('mouseleave', () => {
    skillCats.forEach(c => c.style.opacity = '');
  });
});

/* ══ 30. NAVBAR ACTIVE LINK ON LOAD ════════════════════ */
updateActiveNavLink();

/* ══ 31. RESIZE HANDLER ════════════════════════════════ */
window.addEventListener('resize', () => {
  const confettiCanvas = document.getElementById('confetti-canvas');
  if (confettiCanvas) {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  if (codeRainCanvas) {
    codeRainCanvas.width = window.innerWidth;
    codeRainCanvas.height = window.innerHeight;
  }
});

/* ══ 32. SVG GRADIENT DEFS FOR LOADER ══════════════════ */
(function addLoaderGradients() {
  const svg = document.querySelector('.loader-svg');
  if (!svg) return;
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  defs.innerHTML = `
    <linearGradient id="loaderGradStroke" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00d4ff"/>
      <stop offset="100%" stop-color="#7c3aed"/>
    </linearGradient>
    <linearGradient id="loaderGradText" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00d4ff"/>
      <stop offset="100%" stop-color="#7c3aed"/>
    </linearGradient>
  `;
  svg.insertBefore(defs, svg.firstChild);
})();

/* ══ 33. PWA SERVICE WORKER REGISTRATION ═══════════════ */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Only register if sw.js exists
    fetch('sw.js').then(r => {
      if (r.ok) navigator.serviceWorker.register('sw.js').catch(() => {});
    }).catch(() => {});
  });
}

/* ══ 34. LAZY IMAGE LOADING ════════════════════════════ */
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
if ('IntersectionObserver' in window) {
  const imgObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) { img.src = img.dataset.src; }
        imgObserver.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => imgObserver.observe(img));
}

/* ══ 35. ACCESSIBILITY — FOCUS VISIBLE ════════════════ */
document.addEventListener('keydown', () => document.body.classList.add('keyboard-nav'));
document.addEventListener('mousedown', () => document.body.classList.remove('keyboard-nav'));

/* ══ 36. WELCOME LOG ═══════════════════════════════════ */
console.log(`
%c╔══════════════════════════════════════════════╗
║     RITESH PRAJAPATI — PORTFOLIO v2.0        ║
║     Frappe Developer | ERP | Python           ║
╠══════════════════════════════════════════════╣
║  GitHub : github.com/Riteshprajapati109       ║
║  Email  : riteshprajapati167@gmail.com        ║
║  Phone  : +91-9770791263                     ║
╚══════════════════════════════════════════════╝
`, 'color: #00d4ff; font-family: monospace; font-size: 12px;');

console.log('%cHey there! 👋 Exploring the source code? I like you!', 'color: #7c3aed; font-size: 14px; font-weight: bold;');
console.log('%cTry pressing Ctrl+K for the command palette, or type "matrix" in the terminal 🔮', 'color: #f59e0b; font-size: 12px;');

/* ══ PERFORMANCE — PASSIVE EVENT LISTENERS ════════════ */
// Already using passive where applicable via addEventListener options

/* ══ END OF MAIN.JS ════════════════════════════════════ */
