const carousel = document.getElementById('carousel');
const cards = Array.from(carousel.children);
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const indicatorsContainer = document.getElementById('indicators');
const contentArea = document.getElementById('content-area');

const contents = [
  {title:'Project Page', desc:'오른쪽으로 카드를 넘겨 내용을 확인하세요', link:'#'},
  {title:'LINE UX Writing', desc:'라인이 네이버에서 운영하는 서비스였다면?', link:'naverline.html'},
  {title:'준비중', desc:'', link:'#'},
  {title:'준비중', desc:'', link:'#'}
];

let index = 0; // 중앙 카드 시작

function updateCarousel() {
  const carouselWidth = carousel.offsetWidth;
  const cardWidth = cards[0].offsetWidth;

  cards.forEach((card,i)=>{
    card.style.transition = 'transform 0.5s, z-index 0.5s, opacity 0.5s';
    
    if(i < index){
      const offset = - (cardWidth * (index - i));
      card.style.transform = `translateX(${offset}px) translateZ(-50px) rotateY(20deg)`;
      card.style.zIndex = 5;
      card.style.opacity = 1;
    } else if(i === index){
      const centerOffset = (carouselWidth / 2 - cardWidth / 2);
      card.style.transform = `translateX(${centerOffset}px) translateZ(80px) rotateY(0deg)`;
      card.style.zIndex = 10;
      card.style.opacity = 1;
    } else {
      const offset = (cardWidth * (i - index)) + carouselWidth/2 + cardWidth/2;
      card.style.transform = `translateX(${offset}px) translateZ(-100px) rotateY(-20deg)`;
      card.style.zIndex = 1;
      card.style.opacity = 0;
    }
  });

  // 내용 업데이트
  const content = contents[index];
  contentArea.querySelector('h2').textContent = content.title;
  contentArea.querySelector('p').textContent = content.desc;
  const link = contentArea.querySelector('a');
  link.href = content.link;
  link.textContent = "자세히 보기";

  updateIndicators();
}

function createIndicators() {
  indicatorsContainer.innerHTML = '';
  cards.forEach((card,i)=>{
    const dot = document.createElement('div');
    dot.className='indicator';
    if(i===index) dot.classList.add('active');
    dot.addEventListener('click', ()=>{ changeIndex(i); });
    indicatorsContainer.appendChild(dot);
  });
}

function updateIndicators() {
  Array.from(indicatorsContainer.children).forEach((dot,i)=>{
    dot.classList.toggle('active', i===index);
  });
}

function changeIndex(newIndex) {
  if(newIndex===index) return;

  contentArea.classList.add('fade-out');
  setTimeout(()=>{
    index=newIndex;
    updateCarousel();
    contentArea.classList.remove('fade-out');
    contentArea.classList.add('fade-in');
    setTimeout(()=> contentArea.classList.remove('fade-in'), 500);
  }, 250);
}

prev.addEventListener('click', ()=>{ if(index>0) changeIndex(index-1); });
next.addEventListener('click', ()=>{ if(index<cards.length-1) changeIndex(index+1); });

let startX = null;
carousel.addEventListener('mousedown', e=>{ startX=e.clientX; });
carousel.addEventListener('mousemove', e=>{
  if(startX!==null){
    const diff=e.clientX-startX;
    if(diff>50 && index>0){ changeIndex(index-1); startX=null; }
    else if(diff<-50 && index<cards.length-1){ changeIndex(index+1); startX=null; }
  }
});
carousel.addEventListener('mouseup', e=>{ startX=null; });
carousel.addEventListener('mouseleave', e=>{ startX=null; });
carousel.addEventListener('touchstart', e=>{ startX=e.touches[0].clientX; });
carousel.addEventListener('touchmove', e=>{
  if(startX!==null){
    const diff=e.touches[0].clientX-startX;
    if(diff>50 && index>0){ changeIndex(index-1); startX=null; }
    else if(diff<-50 && index<cards.length-1){ changeIndex(index+1); startX=null; }
  }
});
carousel.addEventListener('touchend', e=>{ startX=null; });

window.addEventListener('resize', updateCarousel);

createIndicators();
updateCarousel();
