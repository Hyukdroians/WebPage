const letters = document.querySelectorAll(".rotate span");
const text = document.getElementById("text");

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
setInterval(animateLetters, 2000); // 2초마다 애니메이션 실행

// Coloris 위젯 관련 코드
// Coloris가 적용될 input 요소 생성
const colorPicker = document.createElement("input");
colorPicker.type = "text";
colorPicker.setAttribute("data-coloris", "");
colorPicker.value = "#2b3346";

// input 요소가 실제 렌더링되도록 하면서 눈에 보이지 않게 설정
colorPicker.style.position = "absolute";
colorPicker.style.top = "10px";      // 원하는 위치 (예: 화면 상단)
colorPicker.style.right = "10px";    // 원하는 위치 (예: 화면 우측)
colorPicker.style.width = "40px";    // 최소한의 크기
colorPicker.style.height = "40px";
colorPicker.style.opacity = "0";     // 눈에 띄지 않게 처리
document.body.appendChild(colorPicker);

// Coloris 옵션 설정 (필요에 따라 옵션 수정 가능)
Coloris({
  el: colorPicker,
  theme: 'pill',           // 'default', 'large', 'polaroid', 'pill' 중 선택 가능
  themeMode: 'dark',          // 'light' 또는 'dark'
  alpha: false,                // 불투명도 조절 기능 여부
 loseButton: true,
  clearButton: true,
  format: 'hex',               // 색상 포맷: 'hex', 'rgb', 'hsl' 등
  swatches: ['#2b3346', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'],
  inline: false,               // 인라인 모드 여부
  defaultColor: '#2b3346'
  
});

// 텍스트를 더블클릭하면 Coloris 위젯이 열리도록 이벤트 설정
text.addEventListener("dblclick", () => {
  colorPicker.click();
});

// Coloris로 색상 선택 후, 텍스트의 색상을 업데이트
colorPicker.addEventListener("change", (event) => {
  text.style.color = event.target.value;
});
