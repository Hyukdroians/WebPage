(function () {
  const root = document.getElementById('root');
  const stage = root.querySelector('[data-stage]');
  const hud = root.querySelector('[data-hud]');
  const counter = root.querySelector('[data-counter]');
  const dotsWrap = root.querySelector('[data-dots]');
  const scenes = [...root.querySelectorAll('[data-scene]')];

  const dots = scenes.map((_, i) => {
    const d = document.createElement('span');
    d.style.cssText = 'width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,0.35);transition:background .3s ease,transform .3s ease;';
    dotsWrap.appendChild(d);
    return d;
  });

  let saved = 0;
  try { saved = parseInt(localStorage.getItem('kenchoiWallpaperIdx') || '0', 10) || 0; } catch (e) {}
  let idx = Math.min(Math.max(saved, 0), scenes.length - 1);

  function fit() {
    const s = Math.max(window.innerWidth / 2560, window.innerHeight / 1440);
    stage.style.transform = `translate(-50%,-50%) scale(${s})`;
  }
  fit();
  window.addEventListener('resize', fit);

  function show(n) {
    scenes.forEach((sc, i) => {
      sc.style.opacity = i === n ? '1' : '0';
      sc.style.pointerEvents = i === n ? 'auto' : 'none';
    });
    counter.textContent = String(n + 1).padStart(2, '0') + ' / ' + String(scenes.length).padStart(2, '0');
    dots.forEach((d, i) => {
      d.style.background = i === n ? '#fff' : 'rgba(255,255,255,0.35)';
      d.style.transform = i === n ? 'scale(1.25)' : 'scale(1)';
    });
  }

  let hudTimer;
  function armHud() {
    hud.style.opacity = '1';
    clearTimeout(hudTimer);
    hudTimer = setTimeout(() => { hud.style.opacity = '0'; }, 3200);
  }

  function cycle(dir) {
    idx = (idx + dir + scenes.length) % scenes.length;
    show(idx);
    try { localStorage.setItem('kenchoiWallpaperIdx', String(idx)); } catch (e) {}
  }

  show(idx);
  armHud();

  const timers = [];
  const intervals = [];

  function animateWord(w) {
    const letters = w.children;
    for (let i = 0; i < letters.length; i++) {
      const letter = letters[i];
      const t1 = setTimeout(() => {
        letter.style.fontWeight = '920';
        const t2 = setTimeout(() => { letter.style.fontWeight = '100'; }, 1000);
        timers.push(t2);
      }, i * 100);
      timers.push(t1);
    }
  }

  root.querySelectorAll('[data-varword]').forEach((w) => {
    if (!w.dataset.text) w.dataset.text = w.textContent;
    w.textContent = '';
    [...w.dataset.text].forEach((ch) => {
      const s = document.createElement('span');
      s.textContent = ch;
      s.style.display = 'inline-block';
      s.style.fontWeight = '450';
      s.style.transition = 'font-weight 0.6s ease-in-out';
      w.appendChild(s);
    });
    w.style.letterSpacing = '-0.06em';

    const startDelay = parseFloat(w.dataset.delay || '0');
    const kickoff = setTimeout(() => {
      animateWord(w);
      const iv = setInterval(() => animateWord(w), 1700);
      intervals.push(iv);
    }, startDelay);
    timers.push(kickoff);
  });

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') { e.preventDefault(); cycle(1); armHud(); }
    else if (e.code === 'ArrowRight' || e.code === 'ArrowDown') { e.preventDefault(); cycle(1); armHud(); }
    else if (e.code === 'ArrowLeft' || e.code === 'ArrowUp') { e.preventDefault(); cycle(-1); armHud(); }
  });

  root.addEventListener('click', () => { cycle(1); armHud(); });
  window.addEventListener('mousemove', armHud, { passive: true });
})();
