
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

// lodash 라이브러리 필요
// throttle을 사용하여 스크롤을 0.3초마다 반응하게해서 웹에 무리가 가지않게 하고
// 스크롤이 500 이상이면 배지를 숨기기 그게 아니면 다시 나오게
window.addEventListener('scroll', _.throttle(function(){
    console.log(window.scrollY);
    if(window.scrollY > 500){
        //배지 숨기기
        // gsap.to(요소, 지속시간, 옵션);
        gsap.to(badgeEl, .6, {
            opacity: 0,
            display: 'none'
        });
        // 업 버튼 보이기
        gsap.to(toTopEl, .2, {
            x: 0
        })
    }else {
        //배지 보이기
        // gsap.to(요소, 지속시간, 옵션);
        gsap.to(badgeEl, .6, {
            opacity: 1,
            display: 'block'
        });
        // 업 버튼 숨기기
        gsap.to(toTopEl, .2, {
            x: 100,
        })
    }
}),3000);
// _.throttle(함수, 시간)

toTopEl.addEventListener('click', function () {
    gsap.to(window, .7, {
        scrollTo: 0
    })
});

// visual 부분에 있는 image를 화면에 .7초 동안 하나씩 나오게 하는 로직
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl, index) {
    // gsap.to(요소, 지속시간, 옵션);
    gsap.to(fadeEl, 1, {
        delay: (index + 1)*.7,
        opacity: 1,
    });
});

// notice swiper
// new Swiper(선택자,옵션)
new Swiper('.notice-line .swiper-container', {
    direction: 'vertical',
    autoplay:true, // 자동으로 넘어감
    loop:true, // 끝까지 넘어가면 처음부터 다시
});

// promotion swiper
new Swiper('.promotion .swiper-container', {
    slidesPerView:3, // 한번에 보여줄 슬라이드 개수
    spaceBetween: 10, // 슬라이드 사이 여백
    centeredSlides: true, // 1번 슬라이드 중앙 배치
    autoplay:{ // autoplay는 객체 타입으로 옵션을 지정해줄 수 있음
        delay: 5000,
    },
    loop:true,
    pagination: {
        el:'.promotion .swiper-pagination', //페이지 번호 요소 선택자
        clickable: true, // 사용자의 페이지 번호 요소 제어
    },
    navigation: {
        prevEl: '.promotion .swiper-prev',
        nextEl:'.promotion .swiper-next',
    }
});

// awards swiper
new Swiper('.awards .swiper-container', {
    autoplay: true,
    loop: true,
    spaceBetween: 30,
    slidesPerView: 5,
    navigation: {
        prevEl : '.awards .swiper-prev',
        nextEl : '.awards .swiper-next'
    }
});

// promotion 클릭시 promotion swiper가 닫히거나 열리게
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
const promotionIcon = document.querySelector('.notice .notice-line .inner__right .toggle-promotion .material-icons')

let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function(){
    isHidePromotion = !isHidePromotion
    if(isHidePromotion) {
        //숨김 처리
        promotionEl.classList.add('hide');
        promotionIcon.classList.add('hide');
    }else {
        //보임 처리
        promotionEl.classList.remove('hide');
        promotionIcon.classList.remove('hide');
    }
})

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
    // `.toFixed()`를 통해 반환된 문자 데이터를,
    // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
  }

function floatingObject(selector, delay, size) {
    // gsap.to(요소, 시간, 옵션);
    gsap.to(selector, random(1.5, 2.5), {
        y: size,
        repeat: -1,
        yoyo: true, // repeat만 하면 애니메이션이 처음부터 돌아가지만 yoyo는 애니메이션이 매끄럽게 진행됨 여기서는 위아래로 반복
        ease: Power1.easeInOut,
        delay: random(0,delay)
    });
}
floatingObject('.floating1',1, 15);
floatingObject('.floating2',.5, 15);
floatingObject('.floating3',1.5, 20);

// scrollmagic
const spyEls = document.querySelectorAll('section.scroll-spy');

spyEls.forEach(function(spyEl){
    new ScrollMagic
        .Scene({
            triggerElement: spyEl, // 보여짐 여부를 감시할 요소를
            triggerHook: .8
        })
        .setClassToggle(spyEl, 'show')
        .addTo(new ScrollMagic.Controller());
});


