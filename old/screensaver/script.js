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
            letter.style.fontWeight = "920";
            setTimeout(() => {
                letter.style.fontWeight = "100";
            }, 1000);
        }, index * 100);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const leftSection = document.getElementById('leftSection');
    const rightSection = document.getElementById('rightSection');
    createVariableWeightTitle();
    setInterval(animateTitle, 1800);
});

/ Coloris 위젯 관련 코드 /
const colorPicker = document.createElement("input");
colorPicker.type = "text";
colorPicker.setAttribute("data-coloris", "");
colorPicker.value = "#c7f5ffff";
colorPicker.style.position = "absolute";
colorPicker.style.top = "10px";
colorPicker.style.right = "10px";
colorPicker.style.width = "40px";
colorPicker.style.height = "40px";
colorPicker.style.opacity = "0";
document.body.appendChild(colorPicker);

// 배경색 선택기 추가
const colorPickerBg = document.createElement("input");
colorPickerBg.type = "text";
colorPickerBg.setAttribute("data-coloris", "");
colorPickerBg.value = "#000000";
colorPickerBg.style.position = "absolute";
colorPickerBg.style.top = "60px";
colorPickerBg.style.right = "10px";
colorPickerBg.style.width = "40px";
colorPickerBg.style.height = "40px";
colorPickerBg.style.opacity = "0";
document.body.appendChild(colorPickerBg);

Coloris({
  el: colorPicker,
  theme: 'default',
  themeMode: 'dark',
  alpha: true,
  closeButton: true,
  format: 'hex',
  swatches: ['#2b3346', '#12463f', '#4c4021', '#4e290b', '#561d0e'],
  inline: false,
  defaultColor: '#c7f5ffff',
  bound: false,
});

Coloris({
  el: colorPickerBg,
  theme: 'default',
  themeMode: 'dark',
  alpha: true,
  closeButton: true,
  format: 'hex',
  swatches: ['#000000', '#949494ff', '#8897baff', '#2b3346', '#12463f'],
  inline: false,
  defaultColor: '#000000ff',
  bound: false,
});


// 텍스트 터치 영역 버튼으로 색상 선택기 오픈
const textTouchBtn = document.getElementById('textTouchBtn');
if (textTouchBtn) {
  textTouchBtn.addEventListener('click', () => {
    colorPicker.click();
  });
}

// 배경 더블클릭 시 배경색 선택기 오픈 (텍스트 영역 제외)
document.body.addEventListener("dblclick", (e) => {
  if (e.target !== text) {
    colorPickerBg.click();
  }
});

colorPicker.addEventListener("change", (event) => {
  text.style.color = event.target.value;
});

colorPickerBg.addEventListener("change", (event) => {
  document.body.style.backgroundColor = event.target.value;
});
