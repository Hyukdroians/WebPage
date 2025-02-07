const fullscreen = element => {
  element.requestFullscreen()
}

const letters = document.querySelectorAll(".rotate span");

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
