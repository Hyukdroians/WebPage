const letters = document.querySelectorAll(".h1");
const text = document.getElementById("titleText");

function createVariableWeightTitle() {
    const titleElement = document.getElementById('titleText');
    const text = titleElement.textContent;
    const weights = [450, 450, 450, 450, 450, 450, 450, 450, 450, 450, 450]; // 10개 글자에 대한 weight
    
    titleElement.innerHTML = '';
    
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i];
        span.className = 'char';
        span.style.fontWeight = weights[i] || 400;
        titleElement.appendChild(span);
    }
}

function animateTitle() {
    const letters = document.querySelectorAll("#titleText .char");
    
    letters.forEach((letter, index) => {
        setTimeout(() => {
            letter.style.fontWeight = "920"; // 최대 굵기로 변경
            setTimeout(() => {
                letter.style.fontWeight = "100";
            }, 1000);
        }, index * 100);
    });
}

// 페이지 로드 시 초기 설정
document.addEventListener('DOMContentLoaded', function() {
    const leftSection = document.getElementById('leftSection');
    const rightSection = document.getElementById('rightSection');
    
    // Variable 폰트 Weight 적용
    createVariableWeightTitle();
    
    // 타이틀 애니메이션 시작
    setInterval(animateTitle, 1800); // 2초마다 애니메이션 실행
});

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