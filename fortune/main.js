const contentElem = document.querySelector('.content');
const fortuneElem = document.querySelector('.fortune');
const dateElem = document.querySelector('.title-date');
const itemElem = document.querySelector('.btm-item');
const alphaElem = document.querySelector('.btm-alpha');

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const date = String(today.getDate()).padStart(2, '0');

const consonants = [
  'ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ',
  'ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'
];

function randomNum() {
  return Math.floor(Math.random() * 256);
}

function randomRGB() {
  let r = randomNum(), g = randomNum(), b = randomNum();
  let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  while (luma < 70 || luma > 200) {
    r = randomNum(); g = randomNum(); b = randomNum();
    luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
  return [r, g, b];
}

function setDate() {
  dateElem.innerText = `${year}${month}${date}`;
}

function setRandomConsonants() {
  const first = consonants[Math.floor(Math.random() * consonants.length)];
  const second = consonants[Math.floor(Math.random() * consonants.length)];
  alphaElem.innerText = `${first}${second}`;
}

async function load() {
  const [r1, r2] = await Promise.all([fetch('./fortune.json'), fetch('./item.json')]);
  const [json1, json2] = await Promise.all([r1.json(), r2.json()]);
  fortuneElem.innerText = json1[Math.floor(Math.random() * json1.length)].fortune;
  itemElem.innerText = json2[Math.floor(Math.random() * json2.length)].item;
}

function runTransitionExit(color) {
  const isMobile = window.innerWidth <= 768;
  const overlay = document.getElementById('pt-overlay') || (() => {
    const o = document.createElement('div');
    o.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:9999;pointer-events:none;background:' + color;
    document.body.appendChild(o);
    return o;
  })();
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.style.transition = 'transform .55s cubic-bezier(.76,0,.24,1)';
      overlay.style.transform = isMobile ? 'translateY(-100%)' : 'translateX(-100%)';
      setTimeout(() => overlay.remove(), 600);
    });
  });
}

function initScratchCard() {
  document.querySelector('.content .wrap').style.opacity = '1';

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;z-index:100;cursor:crosshair;touch-action:none;';
  document.body.appendChild(canvas);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  // 은색 스크래치 코팅
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0,   '#888');
  grad.addColorStop(0.3, '#ccc');
  grad.addColorStop(0.7, '#ccc');
  grad.addColorStop(1,   '#888');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // 긁어요 안내 텍스트
  const fontSize = Math.max(14, Math.min(W, H) * 0.038);
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = 'rgba(0,0,0,0.22)';
  ctx.font = `${fontSize}px Pretendard, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('긁어서 확인하세요', W / 2, H / 2);

  const radius = Math.max(40, Math.min(W, H) * 0.07);
  let isDrawing = false;
  let checkPending = false;
  let done = false;

  function scratchAt(positions) {
    ctx.globalCompositeOperation = 'destination-out';
    positions.forEach(({ x, y }) => {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function tryComplete() {
    if (done || checkPending) return;
    checkPending = true;
    requestAnimationFrame(() => {
      checkPending = false;
      const step = 16;
      const data = ctx.getImageData(0, 0, W, H).data;
      let cleared = 0, total = 0;
      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          if (data[(y * W + x) * 4 + 3] < 128) cleared++;
          total++;
        }
      }
      if (cleared / total > 0.35) {
        done = true;
        canvas.style.transition = 'opacity 0.55s ease';
        canvas.style.opacity = '0';
        setTimeout(() => canvas.remove(), 600);
      }
    });
  }

  function pts(e) {
    const r = canvas.getBoundingClientRect();
    if (e.touches) {
      return Array.from(e.touches).map(t => ({ x: t.clientX - r.left, y: t.clientY - r.top }));
    }
    return [{ x: e.clientX - r.left, y: e.clientY - r.top }];
  }

  canvas.addEventListener('mousedown', e => { isDrawing = true; scratchAt(pts(e)); });
  canvas.addEventListener('mousemove', e => { if (!isDrawing) return; scratchAt(pts(e)); tryComplete(); });
  canvas.addEventListener('mouseup', () => { isDrawing = false; tryComplete(); });
  canvas.addEventListener('mouseleave', () => { isDrawing = false; });

  canvas.addEventListener('touchstart', e => { e.preventDefault(); isDrawing = true; scratchAt(pts(e)); }, { passive: false });
  canvas.addEventListener('touchmove', e => { e.preventDefault(); if (!isDrawing) return; scratchAt(pts(e)); tryComplete(); }, { passive: false });
  canvas.addEventListener('touchend', () => { isDrawing = false; tryComplete(); });
}

window.addEventListener('DOMContentLoaded', async () => {
  setDate();
  setRandomConsonants();
  await load();

  const storedColor = sessionStorage.getItem('pt_color');
  if (storedColor) {
    sessionStorage.removeItem('pt_color');
    contentElem.style.backgroundColor = storedColor;
    runTransitionExit(storedColor);
  } else {
    const [r, g, b] = randomRGB();
    contentElem.style.backgroundColor = `rgb(${r},${g},${b})`;
  }

  initScratchCard();
});

window.addEventListener('pageshow', e => {
  if (e.persisted) {
    const o = document.getElementById('pt-overlay');
    if (o) o.remove();
  }
});
