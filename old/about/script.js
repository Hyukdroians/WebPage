function randomNum() {
    return Math.floor(Math.random() * 256);
}

function randomRGB() {
    let red = randomNum();
    let green = randomNum();
    let blue = randomNum();
    let rgb;
    let luma = 0.2126 * red + 0.7152 * green + 0.0722 * blue; // per ITU-R BT.709
    
    while (luma < 70 || luma > 230) {
        red = randomNum();
        green = randomNum();
        blue = randomNum();
        luma = 0.2126 * red + 0.7152 * green + 0.0722 * blue; // per ITU-R BT.709
    }
    
    rgb = [red, green, blue];
    return rgb;
}

function getContrastColor(rgb) {
    const [r, g, b] = rgb;
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luma > 128 ? '#000000' : '#ffffff';
}

function applyRandomColor(element) {
    let rgbVals = randomRGB();
    let tempColor = "rgb(" + rgbVals[0] + ", " + rgbVals[1] + ", " + rgbVals[2] + ")";
    element.style.backgroundColor = tempColor;
    
    const content = element.querySelector('.content');
    content.style.color = getContrastColor(rgbVals);
    
    const menuItems = element.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.style.color = getContrastColor(rgbVals);
        item.style.borderColor = getContrastColor(rgbVals);
    });
}

function createVariableWeightTitle() {
    const titleElement = document.getElementById('titleText');
    const text = titleElement.textContent;
    const weights = [450, 450, 450, 450, 450, 450, 450, 450, 450, 450, 450];
    
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
    applyRandomColor(leftSection);
    applyRandomColor(rightSection);
document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
            event.preventDefault();
            applyRandomColor(leftSection);
            applyRandomColor(rightSection);
        }
    });
});
