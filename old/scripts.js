// main.js의 색상 시스템 적용
const contentElem = document.querySelector('.content');

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
    console.log(luma);
    return rgb;
}

function applyRandomColor(element) {
    let rgbVals = randomRGB();
    let tempColor = "rgb(" + rgbVals[0] + ", " + rgbVals[1] + ", " + rgbVals[2] + ")";
    element.style.backgroundColor = tempColor;
}

// 페이지 로드 시 랜덤 컬러 적용
document.addEventListener('DOMContentLoaded', function() {
    const leftSection = document.getElementById('leftSection');
    const rightSection = document.getElementById('rightSection');
    
    // main.js 색상 시스템으로 초기 색상 설정
    applyRandomColor(leftSection);
    applyRandomColor(rightSection);
    
    // 섹션 클릭 시 색상 변경
    leftSection.addEventListener('click', function() {
        applyRandomColor(this);
    });
    
    rightSection.addEventListener('click', function() {
        applyRandomColor(this);
    });
    
    // 키보드 이벤트 (스페이스바로 색상 랜덤 변경)
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
            event.preventDefault();
            applyRandomColor(leftSection);
            applyRandomColor(rightSection);
        }
    });
});
