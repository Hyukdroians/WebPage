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
colorPicker.value = "#004cff";

colorPicker.style.position = "absolute";
colorPicker.style.top = "10px";
colorPicker.style.right = "10px";
colorPicker.style.width = "40px";
colorPicker.style.height = "40px";
colorPicker.style.opacity = "0";
document.body.appendChild(colorPicker);

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
  bound: false,
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

text.addEventListener("dblclick", () => {
  colorPicker.click();
});

colorPicker.addEventListener("change", (event) => {
  text.style.color = event.target.value;
});
