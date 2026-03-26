/* ===================================================
   main.js — Ultra-Dynamic Engineering Portfolio
   =================================================== */

/* ── 1. Preloader (Typing Intro) ── */
const preloader = document.getElementById('preloader');
const plTextEl = document.getElementById('pl-text');
const plSubtitle = document.getElementById('pl-line');
const plCursor  = document.getElementById('pl-cursor');

(function typeIntro() {
  const words = ["Namaste", "Hello", "Hola", "Kundan Kr Ray"];
  let i = 0, j = 0, isDeleting = false;

  function type() {
    if (!plTextEl) return;
    const word = words[i];

    plTextEl.textContent = isDeleting
      ? word.substring(0, j--)
      : word.substring(0, j++);

    let speed = isDeleting ? 40 : 70;

    if (!isDeleting && j === word.length + 1) {
      // Last word — trigger subtitle slide-in, then fade out
      if (i === words.length - 1) {
        // Hide cursor cleanly
        if (plCursor) plCursor.style.opacity = '0';

        // Slide in subtitle after a short pause
        setTimeout(() => {
          if (plSubtitle) plSubtitle.classList.add('visible');
        }, 300);

        // Fade out entire preloader after subtitle is visible
        setTimeout(() => {
          if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
          }
          initAllLiveSystems();
        }, 1800);
        return;
      }
      isDeleting = true;
      speed = 1000;
    } else if (isDeleting && j === -1) {
      isDeleting = false;
      i++;
      j = 0;
      speed = 300;
    }

    setTimeout(type, speed);
  }

  type();
})();

/* ── 2. Custom Cursor ── */
const cur = document.getElementById('cursor');
let mx = window.innerWidth / 2, my = window.innerHeight / 2;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function curLoop() {
  if (cur) {
    cur.style.left = mx + 'px';
    cur.style.top = my + 'px';
  }
  requestAnimationFrame(curLoop);
}
curLoop();
document.querySelectorAll('a, button, .proj-card, .ml-proj-card, .topic-card').forEach(el => {
  el.addEventListener('mouseenter', () => cur && (cur.style.transform = 'translate(-50%,-50%) scale(2)'));
  el.addEventListener('mouseleave', () => cur && (cur.style.transform = 'translate(-50%,-50%) scale(1)'));
});

/* ── 3. Navbar Shrink & Mobile Menu ── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar')?.classList.toggle('shrink', window.scrollY > 60);
});
const hamburger = document.getElementById('hamburger');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    const nl = document.querySelector('.nav-links');
    if (!nl) return;
    const isFlex = nl.style.display === 'flex';
    nl.style.display = isFlex ? 'none' : 'flex';
    if (!isFlex) {
      nl.style.flexDirection = 'column';
      nl.style.position = 'absolute';
      nl.style.top = '60px'; nl.style.left = '0'; nl.style.right = '0';
      nl.style.background = 'rgba(10,12,14,0.95)';
      nl.style.padding = '1.5rem 6%';
      nl.style.borderBottom = '1px solid rgba(0,255,102,0.2)';
    }
  });
}

/* ── 4. Scroll Reveal ── */
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      /* Trigger specific animations based on class */
      e.target.querySelectorAll('.pcb-fill').forEach(f => f.classList.add('animated'));
      e.target.querySelectorAll('.tc-fill').forEach(f => f.classList.add('animated'));
      e.target.querySelectorAll('.skbf').forEach(f => {
        if (f.dataset.w) f.style.setProperty('--w', f.dataset.w);
        f.classList.add('animated');
      });
      observer.unobserve(e.target);
    }
  });
}, observerOptions);
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

/* ── 5. Continuous Live Counters (Never stop moving) ── */
const LIVE_STATS = {
  lc: { easy: 180, med: 95, hard: 25 },
  topics: { graphs: 45, trees: 35, dp: 45, sort: 60, ll: 35, heap: 30 }
};

function initLiveCounters() {
  /* Hero Main Counters */
  const cProb = document.getElementById('ctr-problems');
  const cProj = document.getElementById('ctr-projects');
  const cGpa = document.getElementById('ctr-gpa');

  let pVal = 0;
  if (cProb) setInterval(() => { pVal++; if (pVal > 350) pVal = 350 + Math.floor(Math.random() * 10); cProb.textContent = pVal; }, 50);

  if (cProj) { let prVal = 0; const iv = setInterval(() => { prVal++; cProj.textContent = prVal + '+'; if (prVal >= 15) clearInterval(iv); }, 80); }
  if (cGpa) { let gVal = 0.0; const iv = setInterval(() => { gVal += 0.1; if (gVal >= 8.45) { gVal = 8.5; clearInterval(iv); } cGpa.textContent = gVal.toFixed(1); }, 40); }

  /* DSA Platform Stats */
  const lct = document.getElementById('lc-total');
  if (lct) {
    let v = 0; setInterval(() => { if (v < 250) v += 5; else v = 250; lct.textContent = v + '+'; }, 20);
  }
  const gfgt = document.getElementById('gfg-total');
  if (gfgt) {
    let v = 0; setInterval(() => { if (v < 100) v += 2; else v = 100; gfgt.textContent = v + '+'; }, 20);
  }

  /* Topic Stats */
  document.querySelectorAll('.tcc').forEach(el => {
    const top = el.dataset.top;
    let v = 0, target = LIVE_STATS.topics[top] || 20;
    setInterval(() => { if (v < target) v++; else if (Math.random() > 0.95) v++; el.textContent = v; }, 60 + Math.random() * 40);
  });

  /* Pipeline Data Stream */
  document.querySelectorAll('.pf-count').forEach(el => {
    const base = parseInt(el.dataset.target, 10);
    setInterval(() => {
      const wobble = Math.floor(base + (Math.random() * 200 - 100));
      el.textContent = wobble.toLocaleString();
    }, 500);
  });
}

/* ── 6. Hero Terminal Auto-Runner ── */
const heroTermLines = [
  '<span class="t-cyan">git</span> fetch origin main',
  '<span class="t-muted">Fast-forwarding to latest...</span>',
  '<span class="t-green">g++</span> -O3 solver.cpp -o solver',
  '<span class="t-muted">Compiled successfully in 120ms</span>',
  './solver < data.in',
  '<span class="t-green">Output: Optimal path found (dist=42)</span>',
  '<span class="t-cyan">node</span> train_model.js',
  '<span class="t-muted">Epoch 1/100: Loss = 1.042...</span>',
  '<span class="t-pink">Deploying to staging...</span>',
  '<span class="t-green">Engine loaded and stable.</span>'
];
const heroTerm = document.getElementById('hero-term-body');
let htIdx = 0;
function runHeroTerm() {
  if (!heroTerm) return;
  const line = document.createElement('div');
  line.className = 't-line';
  line.innerHTML = heroTermLines[htIdx];
  heroTerm.appendChild(line);
  if (heroTerm.children.length > 5) heroTerm.removeChild(heroTerm.firstChild);
  htIdx = (htIdx + 1) % heroTermLines.length;
  setTimeout(runHeroTerm, 800 + Math.random() * 1500);
}

/* ── 7. System Monitor Live Updates ── */
function runSysMon() {
  const cpuVal = document.getElementById('cpu-val'), cpuBar = document.getElementById('cpu-bar');
  const memVal = document.getElementById('mem-val'), memBar = document.getElementById('mem-bar');
  const dskVal = document.getElementById('disk-val'), dskBar = document.getElementById('disk-bar');
  const netVal = document.getElementById('net-val'), netBar = document.getElementById('net-bar');
  const upTime = document.getElementById('uptime-disp');
  const c1 = document.getElementById('proc1-cpu'), c2 = document.getElementById('proc2-cpu');

  let seconds = 0;

  setInterval(() => {
    /* Randomize resources */
    const cv = Math.floor(Math.random() * 25 + 15);
    const mv = Math.floor(Math.random() * 15 + 40);
    const dv = Math.floor(Math.random() * 40 + 5);
    const nv = Math.floor(Math.random() * 1500 + 100);

    if (cpuVal) { cpuVal.textContent = cv + '%'; cpuBar.style.width = cv + '%'; }
    if (memVal) { memVal.textContent = mv + '%'; memBar.style.width = mv + '%'; }
    if (dskVal) { dskVal.textContent = dv + '%'; dskBar.style.width = dv + '%'; }
    if (netVal) { netVal.textContent = nv + ' KB/s'; netBar.style.width = (nv / 20) + '%'; }

    if (c1) c1.textContent = Math.floor(Math.random() * 10 + 5) + '%';
    if (c2) c2.textContent = Math.floor(Math.random() * 20 + 20) + '%';

    /* Uptime */
    seconds++;
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    if (upTime) upTime.textContent = `${h}:${m}:${s}`;
  }, 1000);

  /* Sparkline Canvas */
  const sc = document.getElementById('spark-canvas');
  if (sc) {
    const ctx = sc.getContext('2d');
    let pts = Array(40).fill(10);
    setInterval(() => {
      pts.push(Math.random() * 30 + 10);
      pts.shift();
      ctx.clearRect(0, 0, sc.width, sc.height);
      ctx.beginPath();
      ctx.moveTo(0, sc.height);
      for (let i = 0; i < pts.length; i++) {
        ctx.lineTo(i * (sc.width / 40), sc.height - pts[i]);
      }
      ctx.lineTo(sc.width, sc.height);
      ctx.fillStyle = 'rgba(0,255,102,0.1)';
      ctx.fill();
      ctx.strokeStyle = '#00ff66';
      ctx.stroke();
    }, 500);
  }

  /* Live Logs Stream */
  const lStream = document.getElementById('log-stream');
  const lm = [
    '<span class="t-cyan">[INFO]</span> Incoming request to /predict (status: 200)',
    '<span class="t-muted">[DEBUG]</span> Redis cache hit for key: graph_data_99',
    '<span class="t-green">[OK]</span> DB Query executed in 12ms',
    '<span class="t-yellow">[WARN]</span> Memory usage spiked to 65%',
    '<span class="t-cyan">[INFO]</span> Model checkpoint saved successfully',
    '<span class="t-pink">[ML]</span> Batch 402 processed. Loss: 0.812'
  ];
  if (lStream) {
    setInterval(() => {
      const l = document.createElement('div');
      l.className = 'ls-line';
      l.innerHTML = lm[Math.floor(Math.random() * lm.length)];
      lStream.appendChild(l);
      if (lStream.children.length > 8) lStream.removeChild(lStream.firstChild);
      lStream.scrollTop = lStream.scrollHeight;
    }, 1500);
  }
}

/* ── 8. ML Lab Live Charts (Vanilla Canvas JS) ── */
function initMLCharts() {
  /* Accuracy Chart */
  const accC = document.getElementById('acc-chart');
  if (accC) {
    const actx = accC.getContext('2d');
    let ep = 0, trainAcc = 0.5, valAcc = 0.48;
    const tEl = document.getElementById('train-acc'), vEl = document.getElementById('val-acc'), eEl = document.getElementById('epoch-n');
    let tPts = [], vPts = [];

    setInterval(() => {
      ep = (ep % 100) + 1;
      if (ep === 1) { tPts = []; vPts = []; trainAcc = 0.5; valAcc = 0.48; }

      trainAcc += (1.0 - trainAcc) * 0.05 + (Math.random() * 0.02 - 0.01);
      valAcc += (0.95 - valAcc) * 0.04 + (Math.random() * 0.03 - 0.015);
      if (trainAcc > 0.99) trainAcc = 0.99; if (valAcc > 0.95) valAcc = 0.95;

      tPts.push(trainAcc);
      vPts.push(valAcc);
      if (tPts.length > 50) { tPts.shift(); vPts.shift(); }

      tEl.textContent = (trainAcc * 100).toFixed(1) + '%';
      vEl.textContent = (valAcc * 100).toFixed(1) + '%';
      eEl.textContent = ep;
      document.getElementById('pipe-epoch').textContent = ep;

      /* Draw */
      actx.clearRect(0, 0, accC.width, accC.height);
      const w = accC.width, h = accC.height, len = tPts.length;

      /* Train Line */
      actx.beginPath();
      actx.strokeStyle = '#00ff66'; actx.lineWidth = 2;
      for (let i = 0; i < len; i++) actx.lineTo(i * (w / 50), h - (tPts[i] * h));
      actx.stroke();

      /* Val Line */
      actx.beginPath();
      actx.strokeStyle = '#00e5ff'; actx.lineWidth = 2;
      for (let i = 0; i < len; i++) actx.lineTo(i * (w / 50), h - (vPts[i] * h));
      actx.stroke();
    }, 300);
  }

  /* Loss Bar Chart simulates bouncing loss */
  const lossC = document.getElementById('loss-chart');
  if (lossC) {
    const lctx = lossC.getContext('2d');
    let bars = Array(20).fill(1);
    const cL = document.getElementById('cur-loss');
    setInterval(() => {
      const nv = Math.max(0.1, bars[bars.length - 1] * 0.95 + (Math.random() * 0.4 - 0.2));
      bars.push(nv);
      bars.shift();
      if (cL) cL.textContent = nv.toFixed(3);

      lctx.clearRect(0, 0, lossC.width, lossC.height);
      const bw = (lossC.width / 20) - 2;
      for (let i = 0; i < bars.length; i++) {
        const bh = (bars[i] / 2.0) * lossC.height;
        lctx.fillStyle = `rgba(255, 0, 85, ${0.4 + (i / 40)})`;
        lctx.fillRect(i * (bw + 2), lossC.height - Math.min(bh, lossC.height), bw, Math.min(bh, lossC.height));
      }
    }, 400);
  }

  /* Neural Net Visualization Matrix */
  const nnC = document.getElementById('nn-canvas');
  if (nnC) {
    const nctx = nnC.getContext('2d');
    const layers = [4, 6, 6, 2];
    const nodes = [];
    const w = nnC.width, h = nnC.height;

    layers.forEach((count, lIdx) => {
      const x = (w / (layers.length + 1)) * (lIdx + 1);
      for (let i = 0; i < count; i++) {
        const y = (h / (count + 1)) * (i + 1);
        nodes.push({ x, y, layer: lIdx });
      }
    });

    setInterval(() => {
      nctx.clearRect(0, 0, w, h);

      /* Edges */
      nctx.lineWidth = 1;
      nodes.forEach(n1 => {
        nodes.forEach(n2 => {
          if (n2.layer === n1.layer + 1) {
            nctx.beginPath();
            nctx.moveTo(n1.x, n1.y);
            nctx.lineTo(n2.x, n2.y);
            nctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.15})`;
            nctx.stroke();

            /* Active pulse */
            if (Math.random() > 0.95) {
              nctx.beginPath();
              nctx.moveTo(n1.x, n1.y);
              nctx.lineTo(n2.x, n2.y);
              nctx.strokeStyle = '#ff0055';
              nctx.stroke();
            }
          }
        });
      });

      /* Nodes */
      nodes.forEach(n => {
        nctx.beginPath();
        nctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
        nctx.fillStyle = Math.random() > 0.7 ? '#00e5ff' : '#6b7a8f';
        nctx.fill();
        if (Math.random() > 0.9) {
          nctx.shadowColor = '#00e5ff';
          nctx.shadowBlur = 10;
          nctx.fill();
          nctx.shadowBlur = 0;
        }
      });
    }, 150);
  }
}

/* ── 9. Code Tabs Logic ── */
document.querySelectorAll('.cstab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cstab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.cscode').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');

    const id = btn.dataset.tab;
    const target = document.getElementById('tab-' + id);
    if (target) target.classList.add('active');

    const fn = document.getElementById('cs-fname');
    const lng = document.getElementById('cs-lang');
    if (id === 'll') { fn.textContent = 'linked_list.cpp'; lng.textContent = 'C++'; }
    if (id === 'graph') { fn.textContent = 'bfs.cpp'; lng.textContent = 'C++'; }
    if (id === 'dp') { fn.textContent = 'lcs.js'; lng.textContent = 'JavaScript'; }
    if (id === 'bst') { fn.textContent = 'tree.js'; lng.textContent = 'JavaScript'; }
  });
});

/* ── 10. Interactive CLI (Working) ── */
const cliIn = document.getElementById('cli-in');
const cliOut = document.getElementById('cli-out');
const cmds = {
  help: 'Available: about, skills, dsa, ml, projects, contact, clear',
  about: 'Kundan Kr Ray — CS Eng. Systems + ML. Love optimization.',
  skills: 'C++, Python, SQL, Redis, FastAPI, Docker, OpenCV.',
  dsa: '300+ Solved. LeetCode Top 15%. Codeforces 1400.',
  ml: 'PyTorch, Sklearn. Built NN from scratch + Object Tracker.',
  projects: 'Graph Engine, Custom STL, ML Pipeline, Chat Server.',
  contact: 'Email: kundan@example.com | GitHub: /kundankrray',
};

if (cliIn && cliOut) {
  cliIn.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const val = cliIn.value.trim().toLowerCase();
      cliIn.value = '';
      if (!val) return;

      const p = document.createElement('div');
      p.className = 'cline';
      p.innerHTML = `<span class="t-green">kundan@portfolio</span><span class="t-muted">:~$ </span>${val}`;
      cliOut.appendChild(p);

      if (val === 'clear') {
        cliOut.innerHTML = '';
      } else {
        const r = document.createElement('div');
        r.className = 'cline t-cyan';
        r.style.paddingLeft = '1rem';
        r.textContent = cmds[val] || `command not found: ${val}. Type 'help'.`;
        cliOut.appendChild(r);
      }
      cliOut.scrollTop = cliOut.scrollHeight;
    }
  });
}

/* ── 11. Core Boot Sequence ── */
function initAllLiveSystems() {
  initLiveCounters();
  runHeroTerm();
  runSysMon();
  initMLCharts();
}

/* ── Neural BG Setup (Subtle matrix/nodes) ── */
const bgCanvas = document.getElementById('neural-bg');
if (bgCanvas) {
  const ctx = bgCanvas.getContext('2d');
  let w = bgCanvas.width = window.innerWidth;
  let h = bgCanvas.height = window.innerHeight;
  let particles = [];

  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5
    });
  }

  window.addEventListener('resize', () => {
    w = bgCanvas.width = window.innerWidth;
    h = bgCanvas.height = window.innerHeight;
  });

  function drawBG() {
    ctx.clearRect(0, 0, w, h);
    ctx.lineWidth = 0.5;

    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 255, 102, 0.3)';
      ctx.fill();
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 255, 102, ${0.1 - (dist / 150) * 0.1})`;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawBG);
  }
  drawBG();
}


/* ── 12. Vanilla JS Parallax Tilt ── */
const tiltElements = document.querySelectorAll('.tilt-card');
tiltElements.forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize to -1 to 1
    const xNorm = (x / rect.width) * 2 - 1;
    const yNorm = (y / rect.height) * 2 - 1;

    const maxRotate = 6; // degrees

    // Calculate rotation
    const rotX = -yNorm * maxRotate;
    const rotY = xNorm * maxRotate;

    el.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
    el.style.zIndex = 10;
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    el.style.zIndex = 1;

    // Reset any delayed transitions
    setTimeout(() => {
      el.style.transition = 'all 0.4s ease';
      requestAnimationFrame(() => {
        el.style.transition = 'transform 0.1s';
      });
    }, 400);
  });
});

/* ── 13. Radar Chart (Skills) ── */
function initRadarChart() {
  const c = document.getElementById('radar-chart');
  if (!c) return;
  const ctx = c.getContext('2d');
  const w = c.width, h = c.height;
  const cx = w / 2, cy = h / 2;
  const r = Math.min(cx, cy) - 50;

  const skills = [
    { name: 'Core CS / DSA', val: 0.95 },
    { name: 'Machine Learning', val: 0.90 },
    { name: 'System Design', val: 0.85 },
    { name: 'Web Dev', val: 0.80 },
    { name: 'Databases', val: 0.85 },
    { name: 'C++ / Python', val: 0.95 }
  ];
  const num = skills.length;

  let currentVals = skills.map(() => 0); // for animation

  function drawRadar() {
    ctx.clearRect(0, 0, w, h);

    // Draw background polygon
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let level = 1; level <= 5; level++) {
      ctx.beginPath();
      for (let i = 0; i < num; i++) {
        const ang = (Math.PI * 2 / num) * i - Math.PI / 2;
        const rad = r * (level / 5);
        const x = cx + Math.cos(ang) * rad;
        const y = cy + Math.sin(ang) * rad;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // Draw Axes & Labels
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillStyle = '#6b7a8f';
    ctx.font = '13px "JetBrains Mono"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < num; i++) {
      const ang = (Math.PI * 2 / num) * i - Math.PI / 2;
      const x = cx + Math.cos(ang) * r;
      const y = cy + Math.sin(ang) * r;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x, y);
      ctx.stroke();

      const lx = cx + Math.cos(ang) * (r + 30);
      const ly = cy + Math.sin(ang) * (r + 20);
      ctx.fillText(skills[i].name, lx, ly);
    }

    // Draw Skill Polygon
    ctx.beginPath();
    ctx.strokeStyle = '#00ff66';
    ctx.fillStyle = 'rgba(0, 255, 102, 0.2)';
    ctx.lineWidth = 2;
    for (let i = 0; i < num; i++) {
      const ang = (Math.PI * 2 / num) * i - Math.PI / 2;
      const x = cx + Math.cos(ang) * (r * currentVals[i]);
      const y = cy + Math.sin(ang) * (r * currentVals[i]);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw dots
    ctx.fillStyle = '#00e5ff';
    for (let i = 0; i < num; i++) {
      const ang = (Math.PI * 2 / num) * i - Math.PI / 2;
      const x = cx + Math.cos(ang) * (r * currentVals[i]);
      const y = cy + Math.sin(ang) * (r * currentVals[i]);
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00e5ff';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // Animate
  let step = 0;
  function animateRadar() {
    step += 0.03;
    let finished = true;
    for (let i = 0; i < num; i++) {
      if (currentVals[i] < skills[i].val) {
        currentVals[i] += (skills[i].val - currentVals[i]) * 0.08;
        finished = false;
      }
    }
    drawRadar();
    if (!finished || step < Math.PI) requestAnimationFrame(animateRadar);
  }

  // Trigger animation when scrolled into view
  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateRadar();
      obs.disconnect();
    }
  });
  obs.observe(c);
}
initRadarChart();


/* --- Matrix Tabs Logic --- */
document.querySelectorAll('.mtab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.mtab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.mcontent').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    const target = document.getElementById('mod-' + tab.dataset.mod);
    if (target) target.classList.add('active');
  });
});


/* --- Module Live Animations --- */

/* --- 10 Full Module Live Animations --- */
function initSkillAnimations() {
  const configs = [
    { id: 'sk-lang-cvs', mod: 'lang' },
    { id: 'sk-core-cvs', mod: 'core' }, // Wait, old one was sk-cs-cvs. Let's adapt inside.
    { id: 'sk-dl-cvs', mod: 'dl' },
    { id: 'sk-ml-cvs', mod: 'ml' },
    { id: 'sk-cv-cvs', mod: 'cv' },
    { id: 'sk-lib-cvs', mod: 'lib' },
    { id: 'sk-web-cvs', mod: 'web' },
    { id: 'sk-back-cvs', mod: 'back' },
    { id: 'sk-data-cvs', mod: 'data' },
    { id: 'sk-tools-cvs', mod: 'tools' }
  ];

  /* Shared State & Logic */
  let time = 0;

  // Specific states
  let langDrops = [];
  let dlNodes = [];
  let mlPts = [];
  let csGraph = [];
  let csEdges = [];
  let cvT = { bx: 150, by: 150, tx: 150, ty: 150 };
  let libCubes = [];
  let webGrid = [];
  let backPackets = [];
  let dataBars = [];
  let toolsGears = [{ x: 200, y: 200, r: 80, s: 1 }, { x: 340, y: 250, r: 60, s: -1 }];

  // Init Data once
  for (let i = 0; i < 80; i++) langDrops.push({ x: Math.random(), y: Math.random(), s: Math.random() * 0.02 + 0.01 });
  for (let i = 0; i < 30; i++) mlPts.push({ x: i / 30, y: Math.random() });
  for (let i = 0; i < 40; i++) csGraph.push({ x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.005, vy: (Math.random() - 0.5) * 0.005 });
  for (let i = 0; i < 25; i++) csEdges.push([Math.floor(Math.random() * 40), Math.floor(Math.random() * 40)]);
  for (let i = 0; i < 15; i++) libCubes.push({ x: Math.random(), y: Math.random(), s: Math.random() * 50 + 20, a: Math.random() * Math.PI * 2 });
  for (let i = 0; i < 20; i++) backPackets.push({ p: Math.random(), l: Math.floor(Math.random() * 3) });
  for (let i = 0; i < 20; i++) dataBars.push(Math.random());

  setInterval(() => {
    time += 0.05;

    // 1. Languages: Matrix Rain
    const langC = document.getElementById('sk-lang-cvs');
    if (langC && langC.parentElement.classList.contains('active')) {
      const p = langC.parentElement; langC.width = p.clientWidth; langC.height = p.clientHeight;
      const ctx = langC.getContext('2d');
      ctx.fillStyle = 'rgba(0, 255, 102, 0.4)';
      ctx.font = '20px "JetBrains Mono"';
      langDrops.forEach(d => {
        d.y += d.s; if (d.y > 1) d.y = 0;
        ctx.fillText(Math.random() > 0.5 ? '1' : '0', d.x * langC.width, d.y * langC.height);
      });
    }

    // 2. Core CS (sk-cs-cvs): Graph Traversal
    const csC = document.getElementById('sk-cs-cvs');
    if (csC && csC.parentElement.classList.contains('active')) {
      const p = csC.parentElement; csC.width = p.clientWidth; csC.height = p.clientHeight;
      const ctx = csC.getContext('2d');
      const w = csC.width, h = csC.height;
      ctx.lineWidth = 1;
      csEdges.forEach((e, i) => {
        const u = csGraph[e[0]], v = csGraph[e[1]];
        ctx.beginPath(); ctx.moveTo(u.x * w, u.y * h); ctx.lineTo(v.x * w, v.y * h);
        ctx.strokeStyle = (Math.floor(time * 10 + i) % 20 === 0) ? '#00d4ff' : 'rgba(0, 212, 255, 0.1)';
        ctx.stroke();
      });
      csGraph.forEach((n, i) => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > 1) n.vx *= -1; if (n.y < 0 || n.y > 1) n.vy *= -1;
        ctx.beginPath(); ctx.arc(n.x * w, n.y * h, 4, 0, Math.PI * 2);
        ctx.fillStyle = (Math.floor(time * 10 + i) % 15 === 0) ? '#fff' : 'rgba(0, 212, 255, 0.5)';
        ctx.fill();
      });
    }

    // 3. ML (sk-ml-cvs): Regression
    const mlC = document.getElementById('sk-ml-cvs');
    if (mlC && mlC.parentElement.classList.contains('active')) {
      const p = mlC.parentElement; mlC.width = p.clientWidth; mlC.height = p.clientHeight;
      const ctx = mlC.getContext('2d');
      const w = mlC.width, h = mlC.height;
      const m = -0.4 + Math.sin(time) * 0.2, b = h * 0.8 + Math.cos(time) * h * 0.1;

      mlPts.forEach((pt, i) => {
        const px = pt.x * w, py = pt.y * h + Math.sin(time * 2 + i) * 10;
        ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 170, 0, 0.6)'; ctx.fill();
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, b + px * m);
        ctx.strokeStyle = 'rgba(255, 170, 0, 0.15)'; ctx.stroke();
      });

      ctx.beginPath(); ctx.moveTo(0, b); ctx.lineTo(w, b + w * m);
      ctx.strokeStyle = '#ffaa00'; ctx.lineWidth = 3; ctx.stroke();
    }

    // 4. DL (sk-dl-cvs): Neural Net
    const dlC = document.getElementById('sk-dl-cvs');
    if (dlC && dlC.parentElement.classList.contains('active')) {
      const p = dlC.parentElement; dlC.width = p.clientWidth; dlC.height = p.clientHeight;
      const ctx = dlC.getContext('2d');
      const w = dlC.width, h = dlC.height;

      if (dlNodes.length === 0) {
        const lyr = [4, 7, 7, 3];
        lyr.forEach((c, idx) => {
          for (let i = 0; i < c; i++) dlNodes.push({ x: (idx + 1) / (lyr.length + 1), y: (i + 1) / (c + 1), l: idx });
        });
      }

      ctx.lineWidth = 1.5;
      dlNodes.forEach(n1 => {
        dlNodes.forEach(n2 => {
          if (n2.l === n1.l + 1) {
            ctx.beginPath(); ctx.moveTo(n1.x * w, n1.y * h); ctx.lineTo(n2.x * w, n2.y * h);
            ctx.strokeStyle = Math.random() > 0.95 ? '#ff0055' : 'rgba(255, 0, 85, 0.1)';
            ctx.stroke();
          }
        });
      });
      dlNodes.forEach(n => {
        ctx.beginPath(); ctx.arc(n.x * w, n.y * h, 5, 0, Math.PI * 2);
        ctx.fillStyle = Math.random() > 0.9 ? '#fff' : '#ff0055';
        ctx.fill();
      });
    }

    // 5. CV (sk-cv-cvs): Object Tracking
    const cvC = document.getElementById('sk-cv-cvs');
    if (cvC && cvC.parentElement.classList.contains('active')) {
      const p = cvC.parentElement; cvC.width = p.clientWidth; cvC.height = p.clientHeight;
      const ctx = cvC.getContext('2d');
      const w = cvC.width, h = cvC.height;

      ctx.fillStyle = 'rgba(0, 255, 102, 0.05)';
      for (let i = 0; i < w; i += 40) for (let j = 0; j < h; j += 40) { ctx.beginPath(); ctx.arc(i, j, 2, 0, Math.PI * 2); ctx.fill(); }

      cvT.tx += (Math.random() * 40 - 20); cvT.ty += (Math.random() * 40 - 20);
      if (cvT.tx < 40) cvT.tx = 40; if (cvT.tx > w - 40) cvT.tx = w - 40; if (cvT.ty < 40) cvT.ty = 40; if (cvT.ty > h - 40) cvT.ty = h - 40;

      cvT.bx += (cvT.tx - cvT.bx) * 0.05; cvT.by += (cvT.ty - cvT.by) * 0.05;

      ctx.strokeStyle = '#00ff66'; ctx.lineWidth = 3;
      ctx.strokeRect(cvT.bx - 80, cvT.by - 80, 160, 160);

      const sl = (cvT.by - 80) + ((Date.now() % 2000) / 2000) * 160;
      ctx.beginPath(); ctx.moveTo(cvT.bx - 80, sl); ctx.lineTo(cvT.bx + 80, sl);
      ctx.strokeStyle = 'rgba(0, 255, 102, 0.8)'; ctx.stroke();
    }

    // 6. Libraries (sk-lib-cvs): Rotating Cubes
    const libC = document.getElementById('sk-lib-cvs');
    if (libC && libC.parentElement.classList.contains('active')) {
      const p = libC.parentElement; libC.width = p.clientWidth; libC.height = p.clientHeight;
      const ctx = libC.getContext('2d');
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.4)'; ctx.lineWidth = 2;
      libCubes.forEach((c, i) => {
        c.a += 0.02; c.y -= 0.002; if (c.y < -0.2) c.y = 1.2;
        ctx.save();
        ctx.translate(c.x * libC.width, c.y * libC.height);
        ctx.rotate(c.a);
        ctx.strokeRect(-c.s / 2, -c.s / 2, c.s, c.s);
        ctx.restore();
      });
    }

    // 7. Web (sk-web-cvs): Glowing Nodes
    const webC = document.getElementById('sk-web-cvs');
    if (webC && webC.parentElement.classList.contains('active')) {
      const p = webC.parentElement; webC.width = p.clientWidth; webC.height = p.clientHeight;
      const ctx = webC.getContext('2d');
      ctx.fillStyle = 'rgba(255, 170, 0, 0.2)';
      ctx.font = 'bold 120px "JetBrains Mono"';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      const s = Math.sin(time) * 0.5 + 1;
      ctx.save(); ctx.translate(webC.width / 2, webC.height / 2); ctx.scale(s, s);
      ctx.fillText('< />', 0, 0);
      ctx.restore();
    }

    // 8. Backend (sk-back-cvs): Server Packets
    const backC = document.getElementById('sk-back-cvs');
    if (backC && backC.parentElement.classList.contains('active')) {
      const p = backC.parentElement; backC.width = p.clientWidth; backC.height = p.clientHeight;
      const ctx = backC.getContext('2d');
      const w = backC.width, h = backC.height;
      const lines = [h * 0.3, h * 0.5, h * 0.7];

      lines.forEach(y => {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y);
        ctx.strokeStyle = 'rgba(255, 0, 85, 0.2)'; ctx.lineWidth = 4; ctx.stroke();
      });

      backPackets.forEach(pk => {
        pk.p += 0.02; if (pk.p > 1) pk.p = 0;
        ctx.fillStyle = '#ff0055';
        ctx.fillRect(pk.p * w, lines[pk.l] - 8, 30, 16);
      });
    }

    // 9. Data (sk-data-cvs): Bar Visualizer
    const dataC = document.getElementById('sk-data-cvs');
    if (dataC && dataC.parentElement.classList.contains('active')) {
      const p = dataC.parentElement; dataC.width = p.clientWidth; dataC.height = p.clientHeight;
      const ctx = dataC.getContext('2d');
      const w = dataC.width, h = dataC.height;
      const bw = w / 20;
      dataBars.forEach((b, i) => {
        dataBars[i] += (Math.random() - 0.5) * 0.1;
        if (dataBars[i] < 0) dataBars[i] = 0; if (dataBars[i] > 1) dataBars[i] = 1;
        ctx.fillStyle = `rgba(0, 255, 102, ${0.2 + (i / 40)})`;
        ctx.fillRect(i * bw, h - dataBars[i] * h, bw - 4, dataBars[i] * h);
      });
    }

    // 10. Tools (sk-tools-cvs): Gears
    const toolsC = document.getElementById('sk-tools-cvs');
    if (toolsC && toolsC.parentElement.classList.contains('active')) {
      const p = toolsC.parentElement; toolsC.width = p.clientWidth; toolsC.height = p.clientHeight;
      const ctx = toolsC.getContext('2d');
      const cx = toolsC.width / 2, cy = toolsC.height / 2;

      toolsGears.forEach(g => {
        ctx.save(); ctx.translate(g.x, g.y); ctx.rotate(time * g.s);
        ctx.beginPath();
        for (let i = 0; i < 12; i++) {
          ctx.lineTo(Math.cos(i * Math.PI / 6) * g.r, Math.sin(i * Math.PI / 6) * g.r);
        }
        ctx.closePath();
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.5)'; ctx.lineWidth = 4; ctx.stroke();
        ctx.beginPath(); ctx.arc(0, 0, g.r / 2, 0, Math.PI * 2); ctx.stroke();
        ctx.restore();
      });
    }

  }, 50);
}
setTimeout(initSkillAnimations, 1000);

/* ── 14. Contact Form Submission ── */
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // UI Loading State
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Transmitting...';

      // Get form data
      const formData = {
        name: document.getElementById('form-name').value,
        email: document.getElementById('form-email').value,
        subject: document.getElementById('form-subject').value,
        message: document.getElementById('form-message').value
      };

      // console.log(formData);
      try {
        const response = await fetch('https://portfolio-zrr7.onrender.com/sendmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
          formStatus.textContent = result.message || 'Transmission successful.';
          formStatus.classList.add('success');
          formStatus.style.display = 'block';
          contactForm.reset();
        } else {
          throw new Error(result.message || 'Internal relay failure.');
        }
      }
      catch (error) {
        console.error(error);
        formStatus.textContent = error.message || 'Connectivity failure. Check backend.';
        formStatus.classList.add('error');
        formStatus.style.display = 'block';
      }
      finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  }
});

