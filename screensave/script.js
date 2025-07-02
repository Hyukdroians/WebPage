const letters = document.querySelectorAll(".rotate span");
const text = document.getElementById("text");

let animationInterval; // 애니메이션 interval을 저장할 변수
let isAnimationRunning = true; // 애니메이션 상태를 추적하는 변수

function animateLetters() { 
  letters.forEach((letter, index) => {
      setTimeout(() => {
          letter.style.fontWeight = "900"; // 굵게 변경
          setTimeout(() => {
              letter.style.fontWeight = "100"; // 원래대로 복귀
          }, 1000);
      }, index * 100);
  });
}

// 애니메이션 시작 함수
function startAnimation() {
    if (!isAnimationRunning) {
        animationInterval = setInterval(animateLetters, 1850);
        isAnimationRunning = true;
    }
}

// 애니메이션 정지 함수
function stopAnimation() {
    if (isAnimationRunning) {
        clearInterval(animationInterval);
        isAnimationRunning = false;
        // 모든 글자를 기본 굵기로 되돌리기
        letters.forEach(letter => {
            letter.style.fontWeight = "450";
        });
    }
}

// 애니메이션 토글 함수
function toggleAnimation() {
    if (isAnimationRunning) {
        stopAnimation();
    } else {
        startAnimation();
    }
}

// 스페이스 키 이벤트 리스너 추가
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        event.preventDefault(); // 기본 스페이스 키 동작 방지 (페이지 스크롤 등)
        toggleAnimation();
    }
});

// 초기 애니메이션 시작
animationInterval = setInterval(animateLetters, 1850);

// Coloris 위젯 관련 코드
// Coloris가 적용될 input 요소 생성
const colorPicker = document.createElement("input");
colorPicker.type = "text";
colorPicker.setAttribute("data-coloris", "");
colorPicker.value = "#004cff";

// input 요소가 실제 렌더링되도록 하면서 눈에 보이지 않게 설정
colorPicker.style.position = "absolute";
colorPicker.style.top = "10px";      // 원하는 위치 (예: 화면 상단)
colorPicker.style.right = "10px";    // 원하는 위치 (예: 화면 우측)
colorPicker.style.width = "40px";
colorPicker.style.height = "40px";
colorPicker.style.opacity = "0";     // 눈에 띄지 않게 처리
document.body.appendChild(colorPicker);

// Coloris 옵션 설정 (필요에 따라 옵션 수정 가능)
Coloris({
  el: colorPicker,
  theme: 'default',
  themeMode: 'dark',
  alpha: true,
  closeButton: true,
  format: 'hex',
  swatches: ['#2b3346', '#12463f', '#4c4021', '#4e290b', '#561d0e'],
  inline: false,
  defaultColor: '#004cff',
  bound: false, // 기본 위치 조정을 방지
  onOpen: () => {
    setTimeout(() => {
      const picker = document.querySelector('.color-picker');
      if (picker) {
        picker.style.position = 'fixed';
        picker.style.top = '50%';
        picker.style.left = '50%';
        picker.style.transform = 'translate(-50%, -50%)';
        picker.style.zIndex = '9999';
      }
    }, 10);
  }
});

// 텍스트를 더블클릭하면 Coloris 위젯이 열리도록 이벤트 설정
text.addEventListener("dblclick", () => {
  colorPicker.click();
});

// Coloris로 색상 선택 후, 텍스트의 색상을 업데이트
colorPicker.addEventListener("change", (event) => {
  text.style.color = event.target.value;
});