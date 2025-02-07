const letters = document.querySelectorAll(".rotate span");
const text = document.getElementById("text");

// 컬러 피커를 미리 생성
const colorPicker = document.createElement("input");
colorPicker.type = "color";
colorPicker.value = "#ffffff";
colorPicker.style.display = "none"; // 처음에는 숨김
document.body.appendChild(colorPicker); // body에 추가

function animateLetters() {
letters.forEach((letter, index) => {
    setTimeout(() => {
        letter.style.fontWeight = "900"; // 굵게 변경
        setTimeout(() => {
            letter.style.fontWeight = "100"; // 다시 원래대로
        }, 1000); // 0.3초 후 원래 굵기로
    }, index * 100); // 각 글자의 애니메이션을 0.15초 간격으로 실행
});
}

// 일정 간격으로 반복 실행
setInterval(animateLetters, 2000); // 2초마다 반복 실행

text.addEventListener("dblclick", () => {
    // 컬러 피커를 토글로 바꿈
    if (colorPicker.style.display === "none") {
      colorPicker.style.display = "block";
    } else {
      colorPicker.style.display = "none";
    }
  });
  
  // 컬러 피커에서 색상을 선택했을 때 실행할 이벤트 리스너 추가
  colorPicker.addEventListener("change", (event) => {
    text.style.color = event.target.value;
    colorPicker.style.display = "none"; // 색상 선택 후 컬러 피커를 숨김
  });