// 랜덤 색상 관련 함수들
function randomNum() {
    return Math.floor(Math.random() * 256);
}

function randomRGB() {
    let red = randomNum();
    let green = randomNum();
    let blue = randomNum();
    let luma = 0.2126 * red + 0.7152 * green + 0.0722 * blue; // per ITU-R BT.709
    
    // 너무 밝거나 어두운 색상 제외
    while (luma < 70 || luma > 230) {
        red = randomNum();
        green = randomNum();
        blue = randomNum();
        luma = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
    }
    
    return [red, green, blue];
}

function applyRandomColors() {
    const rgbVals = randomRGB();
    const backgroundColor = `rgb(${rgbVals[0]}, ${rgbVals[1]}, ${rgbVals[2]})`;
    
    // 전체 페이지 배경색 적용 - html과 body 모두에 적용
    document.documentElement.style.backgroundColor = backgroundColor;
    document.body.style.backgroundColor = backgroundColor;
    
    // 텍스트 색상은 배경색과 대비되도록 설정
    const avgBrightness = (rgbVals[0] + rgbVals[1] + rgbVals[2]) / 3;
    const textColor = avgBrightness > 127 ? '#000000' : '#ffffff';
    
    // 제목 텍스트 색상 적용
    const titleElement = document.querySelector('.rotate');
    if (titleElement) {
        titleElement.style.color = textColor;
    }
    
    // 메뉴 링크 색상 적용
    const links = document.querySelectorAll('.lnb a');
    links.forEach(link => {
        link.style.color = textColor;
    });
    
    console.log(`Applied colors - Background: ${backgroundColor}, Text: ${textColor}, Brightness: ${avgBrightness}`);
}

// 페이지 로드 시 즉시 실행 (로딩 화면과 상관없이)
document.addEventListener('DOMContentLoaded', function() {
    applyRandomColors();
});