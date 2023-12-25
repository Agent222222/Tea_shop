import * as from from "../js/from.js"
import * as shop from "../js/shop.js"
import * as cart from "../js/cart.js"
import filter from "../js/shop.js";
import user_data from "../js/cart.js";

var currentPath = window.location.pathname;
const homenav = document.querySelector('.home');
const shopnav = document.querySelector('.shop');
const contactnav = document.querySelector('.contact');
const cartnav = document.querySelector('.head_btn');
const inst = document.querySelector('.footer_contact_img');
if(currentPath === '/contact.html'){

    from.cons(); 
    contactnav.style.color = '#4f9e00'; 
    contactnav.style.textShadow = '1px 5px 6px #dadada';
    contactnav.style.transition = '0.5s';

}else if(currentPath === '/cart.html'){

    cart.active();
    cartnav.style.boxShadow = '0px 2px 10px rgba(14, 168, 0, 0.372)';
    cartnav.style.transition = '0.5s';

}else if(currentPath === '/shop.html'){

    // inst.addEventListener("click", (event) => {  /// check whether we can interact with filters here
    //     if(filter.instrument){
    //         alert("good");
    //     }else{
    //         alert("bad")
    //     }
    // });
    shop.work();
    shopnav.style.color = '#4f9e00'; 
    shopnav.style.textShadow = '1px 5px 6px #dadada';
    shopnav.style.transition = '0.5s';
   

}else if(currentPath === '/index.html'){

    homenav.style.color = '#4f9e00'; 
    homenav.style.textShadow = '1px 5px 6px #dadada';
    homenav.style.transition = '0.5s';

        
    var swiper = new Swiper(".swiper", {
        slidesPerView: 3,
        spaceBetween: 60,
        speed: 500,
        direction: 'horizontal',

        effect: 'coverflow',

        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 30,
            slideShadows: false,
            //shadow: 5,
        },

        loop: true,
        loopedSlides: 3,

        grabCursor: true,
        centeredSlides: true,
    // watchOverflow: true, if we have less slides then slidesPerView slider won't show up

        navigation: {
            nextEl: ".section5-part2-right",
            prevEl: ".section5-part2-left",
        },

        hashNavigation: {
            watchState: true,
        },

        keyboard: {
            enabled: true,
            onlyInViewport: true,
            pageUpDown: true,
        },

        mousewheel: {
            sensitivity: 1,
            eventsTarget: ".swiper-wrapper"
        },

        //lazyload
        preloadImages: false,
        lazy: {
            loadOnTransitionStart: true,
            loadPrevNext: false,
        },
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
    });

    const questions = document.querySelectorAll('.section6-part2-question');

    function resetAllElements() {
        questions.forEach((question) => {
            const image = question.querySelector('.section6-part2-question-img');
            let tabWidth = document.documentElement.clientWidth;
            const answer = question.querySelector('.hidden');
            const parent = image.parentElement;
            image.style.border = "0px";
            image.style.transform = "rotate(0deg)";
            answer.style.display = 'none';
            if(tabWidth < 1500){
                parent.style.height = '70px';
            }else{
                parent.style.height = '110px';
            }
        });
    }

    questions.forEach((question) => {
        const image = question.querySelector('.section6-part2-question-img');
        let tabWidth = document.documentElement.clientWidth;
        const answer = question.querySelector('.hidden');
        const parent = image.parentElement;
        let clickCount = 0;
        image.addEventListener("click", (event) => {
            resetAllElements();

            if (clickCount === 0) {
                event.target.style.border = "1px solid #4f9e00";
                event.target.style.transition = "0.5s";
                event.target.style.transform = "rotate(135deg)";
                answer.style.display = 'block';
                console.log("1 "+ tabWidth);
                if(tabWidth < 1500){
                    parent.style.height = '100px';
                }else{
                    parent.style.height = '140px';
                }
                clickCount++;
            } else {
                clickCount = 0;
            }
        });
    });

}
