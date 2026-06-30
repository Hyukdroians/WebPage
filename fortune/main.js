const contentElem = document.querySelector('.content');
const fortuneElem = document.querySelector('.fortune');
const dateElem = document.querySelector('.title-date');
const itemElem = document.querySelector('.btm-item');
const alphaElem = document.querySelector('.btm-alpha');

// 날짜 정보
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const date = String(today.getDate()).padStart(2, '0');

// 초성 배열
const consonants = [
  'ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ',
  'ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'
];

// 배경 랜덤
function randomNum() {
  return Math.floor(Math.random() * 256);
}
function randomRGB() {
  let red = randomNum();
  let green = randomNum();
  let blue = randomNum();
  let luma = 0.2126 * red + 0.7152 * green + 0.0722 * blue; // 밝기 계산
  while (luma < 70 || luma > 230) {
    red = randomNum();
    green = randomNum();
    blue = randomNum();
    luma = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
  }
  return [red, green, blue];
}

function setRandomBgColor() {
  const rgb = randomRGB();
  const colorString = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  contentElem.style.backgroundColor = colorString;
}

// 날짜 표시
function setDate() {
  dateElem.innerText = `${year}${month}${date}`;
}

// 랜덤 초성 표시
function setRandomConsonants() {
  const first = consonants[Math.floor(Math.random() * consonants.length)];
  const second = consonants[Math.floor(Math.random() * consonants.length)];
  alphaElem.innerText = `${first}${second}`;
}

// 행운, 음식 데이터 불러오기
async function load() {
  const response1 = await fetch('./fortune.json');
  const response2 = await fetch('./item.json');
  const json1 = await response1.json();
  const json2 = await response2.json();
  const ranNum1 = Math.floor(Math.random() * json1.length);
  const ranNum2 = Math.floor(Math.random() * json2.length);
  fortuneElem.innerText = json1[ranNum1].fortune;
  itemElem.innerText = json2[ranNum2].item;
}

// opacity 효과
function setOpacity() {
  const wrapElem = document.querySelector('.content .wrap');
  wrapElem.style.opacity = 1;
}

// 페이지 전환 오버레이 exit
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

// 초기화
window.addEventListener('DOMContentLoaded', () => {
  setDate();
  setRandomConsonants();
  load();

  const storedColor = sessionStorage.getItem('pt_color');
  if (storedColor) {
    sessionStorage.removeItem('pt_color');
    contentElem.style.backgroundColor = storedColor;
    setOpacity();
    runTransitionExit(storedColor);
  } else {
    setRandomBgColor();
  }

  document.addEventListener('mousedown', () => {
    setOpacity();
    setRandomBgColor();
  }, { once: true });
  document.addEventListener('touchstart', () => {
    setOpacity();
    setRandomBgColor();
  }, { once: true });
});
