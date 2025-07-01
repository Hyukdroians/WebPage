// rotate 애니메이션 로직
const letters = document.querySelectorAll(".rotate span");

function animateLetters() {
  letters.forEach((letter, index) => {
    setTimeout(() => {
      letter.style.fontWeight = "900";
      setTimeout(() => {
        letter.style.fontWeight = "100";
      }, 1000);
    }, index * 100);
  });
}

setInterval(animateLetters, 2000);

// 🎨 랜덤 배경색 관련 함수
function randomNum() {
  return Math.floor(Math.random() * 256);
}

function randomRGB() {
  let red = randomNum();
  let green = randomNum();
  let blue = randomNum();
  let luma = 0.2126 * red + 0.7152 * green + 0.0722 * blue;

  while (luma < 70 || luma > 230) {
    red = randomNum();
    green = randomNum();
    blue = randomNum();
    luma = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
  }

  return [red, green, blue];
}

// 배경색 및 텍스트 색 설정
window.addEventListener("DOMContentLoaded", () => {
  const contentArea = document.querySelector(".content-area");
  const rotateElem = document.querySelector(".rotate");
  const lnbElem = document.querySelector(".lnb");

  const rgb = randomRGB();
  const color = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;

  if (contentArea) {
    contentArea.style.backgroundColor = color;
  }

  // 밝기에 따라 텍스트 색 자동 조절
  const luma = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  const textColor = luma < 150 ? "#ffffff" : "#111111";

  if (rotateElem) {
    rotateElem.style.color = textColor;
  }

  if (lnbElem) {
    lnbElem.style.color = textColor;

    // 링크에도 적용
    const links = lnbElem.querySelectorAll("a");
    links.forEach(link => {
      link.style.color = textColor;
    });
  }
});
