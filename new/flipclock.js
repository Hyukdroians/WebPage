
// Flip Clock (Big HH / Big MM / Small SS) - single-init safe
(function () {
  if (window.__flipClockInitialized) return;
  window.__flipClockInitialized = true;

  const root = document.getElementById('flipClock');
  if (!root) return;

  // Clear any pre-existing content
  root.innerHTML = '';

  // Build structure: [H-panel] [M-panel] [S-panel small]
  const panelHours = document.createElement('div');
  panelHours.className = 'panel hours';
  const panelMinutes = document.createElement('div');
  panelMinutes.className = 'panel minutes';
  const panelSeconds = document.createElement('div');
  panelSeconds.className = 'panel seconds small';

  // Helpers
  const pad2 = (n) => n.toString().padStart(2, '0');

  function createFlip(initial = '0') {
    const wrap = document.createElement('div');
    wrap.className = 'flip';
    const top = mk('div','top',initial);
    const bottom = mk('div','bottom',initial);
    wrap.append(top, bottom);

    function flipTo(next) {
      const current = top.textContent;
      if (current === next) return;
      const topFlip = mk('div','top-flip', current);
      const bottomFlip = mk('div','bottom-flip', next);

      topFlip.addEventListener('animationstart', () => { top.textContent = next; });
      topFlip.addEventListener('animationend', () => topFlip.remove());
      bottomFlip.addEventListener('animationend', () => {
        bottom.textContent = next;
        bottomFlip.remove();
      });
      wrap.append(topFlip, bottomFlip);
    }
    return { el: wrap, set: flipTo };
  }

  function mk(tag, cls, text) {
    const el = document.createElement(tag);
    el.className = cls;
    if (text != null) el.textContent = text;
    return el;
  }

  // Create digits
  const H1 = createFlip('0');
  const H2 = createFlip('0');
  const M1 = createFlip('0');
  const M2 = createFlip('0');
  const S1 = createFlip('0');
  const S2 = createFlip('0');

  // AM/PM badge
  const badge = mk('div','badge','AM');

  // Compose panels
  panelHours.append(H1.el, H2.el, badge);
  panelMinutes.append(M1.el, M2.el);
  panelSeconds.append(S1.el, S2.el);

  root.append(panelHours, panelMinutes, panelSeconds);

  function render() {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();

    // 12-hour with AM/PM
    const isPM = h >= 12;
    const h12 = ((h + 11) % 12) + 1; // 0 -> 12
    const hs = pad2(h12).split('');
    const ms = pad2(m).split('');
    const ss = pad2(s).split('');

    H1.set(hs[0]); H2.set(hs[1]);
    M1.set(ms[0]); M2.set(ms[1]);
    S1.set(ss[0]); S2.set(ss[1]);
    badge.textContent = isPM ? 'PM' : 'AM';
  }

  render();
  if (window.__flipClockTimer) clearInterval(window.__flipClockTimer);
  window.__flipClockTimer = setInterval(render, 1000);
})();
