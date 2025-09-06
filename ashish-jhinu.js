/* check.js — vanilla JS version for your static HTML
   Safe to drop into your existing HTML that already contains sections, buttons, etc.
   Make sure you include it like: <script src="check.js" defer></script>
*/

document.addEventListener('DOMContentLoaded', () => {
  /* ===== Active nav link on scroll ===== */
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const links = Array.from(document.querySelectorAll('nav a'));

  function setActive() {
    if (!sections.length || !links.length) return;
    const y = window.scrollY + 120;
    let current = sections[0].id;
    sections.forEach(s => {
      if (y >= s.offsetTop) current = s.id;
    });
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
  }
  window.addEventListener('scroll', setActive);
  setActive(); // initial call

  /* ===== Typing effect (hero) ===== */
  const lines = [
    'I build interfaces people enjoy using.',
    'Accessibility • Performance • Clean UX.',
    'HTML • CSS • JavaScript • Java • React (learning)'
  ];
  const typingEl = document.getElementById('typing');
  let li = 0, pos = 0, forward = true;
  function typeLoop() {
    if (!typingEl) return;
    const t = lines[li];
    if (forward) {
      pos++; typingEl.textContent = t.slice(0, pos);
      if (pos === t.length) { forward = false; setTimeout(typeLoop, 1000); return; }
    } else {
      pos--; typingEl.textContent = t.slice(0, pos);
      if (pos === 0) { forward = true; li = (li + 1) % lines.length; setTimeout(typeLoop, 250); return; }
    }
    setTimeout(typeLoop, forward ? 45 : 20);
  }
  typeLoop();

  /* ===== Reveal animations + skill bars (IntersectionObserver) ===== */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // animate any skill bars inside the revealed element
        entry.target.querySelectorAll('.fill').forEach(bar => {
          const lvl = parseInt(bar.dataset.level || '70', 10);
          bar.style.width = Math.min(100, Math.max(0, lvl)) + '%';
        });
      }
    });
  }, { threshold: 0.18 });

  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

  /* ===== Simple 3D tilt (profile card) ===== */
  const tilt = document.querySelector('[data-tilt]');
  if (tilt) {
    const bound = 14;
    tilt.addEventListener('mousemove', (e) => {
      const r = tilt.getBoundingClientRect();
      const rx = ((e.clientY - r.top) / r.height - 0.5) * -bound;
      const ry = ((e.clientX - r.left) / r.width - 0.5) * bound;
      tilt.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      tilt.style.transition = 'transform 0.08s linear';
    });
    tilt.addEventListener('mouseleave', () => { tilt.style.transform = ''; });
  }

  /* ===== Theme toggle (persist in localStorage) ===== */
  const docRoot = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const stored = localStorage.getItem('theme');
  if (stored) docRoot.setAttribute('data-theme', stored);
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = docRoot.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      docRoot.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      themeToggle.setAttribute('aria-pressed', String(next === 'dark'));
    });
  }

  /* ===== Copy email helper ===== */
  const copyBtn = document.getElementById('copyEmail');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText('ashishsahani@gmail.com');
        const prev = copyBtn.textContent;
        copyBtn.textContent = 'Copied! ✅';
        setTimeout(() => { copyBtn.textContent = prev; }, 1200);
      } catch (err) {
        // fallback
        alert('Copy failed — email: ashishsahani@gmail.com');
      }
    });
  }

  /* ===== Footer year auto ===== */
  const copyrightEl = document.getElementById('copyright');
  if (copyrightEl) {
    const year = new Date().getFullYear();
    copyrightEl.textContent = `© ${year} Ashish Sahani — Designed with ♥ using HTML, CSS & JS`;
  }

  /* ===== Timeline scroll guard (optional parallax) ===== */
  const timeline = document.querySelector('.timeline');
  if (timeline) {
    timeline.addEventListener('scroll', () => {
      // small parallax example: move children slightly based on scrollLeft/top
      // (only if timeline is horizontally scrollable)
      // (leave empty if you don't need)
    });
  }

  /* ===== Optional: Chart.js integration (only if you add canvas#skillsChart & load Chart.js) ===== */
  const canvas = document.getElementById('skillsChart');
  if (canvas && window.Chart) {
    try {
      const ctx = canvas.getContext('2d');
      // eslint-disable-next-line no-undef
      new Chart(ctx, {
        type: 'radar',
        data: {
          labels: ['Frontend', 'Backend', 'Database', 'DevOps', 'UI/UX'],
          datasets: [{
            label: 'Skill Level',
            data: [90, 75, 60, 45, 80],
            backgroundColor: 'rgba(100,255,218,0.12)',
            borderColor: 'rgba(100,255,218,1)',
            pointBackgroundColor: 'rgba(100,255,218,1)'
          }]
        },
        options: {
          responsive: true,
          scales: {
            r: { beginAtZero: true, max: 100 }
          }
        }
      });
    } catch (err) {
      // Chart initialization failed
      // console.warn('Chart.js init error', err);
    }
  }
}); // DOMContentLoaded end
