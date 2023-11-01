import * as from from "../js/from.js"
import * as shop from "../js/shop.js"
import * as cart from "../js/cart.js"
var currentPath = window.location.pathname;
const homenav = document.querySelector('.home');
const shopnav = document.querySelector('.shop');
const contactnav = document.querySelector('.contact');
const cartnav = document.querySelector('.head_btn');

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

    shop.work();
    shopnav.style.color = '#4f9e00'; 
    shopnav.style.textShadow = '1px 5px 6px #dadada';
    shopnav.style.transition = '0.5s';

}else if(currentPath === '/index.html'){

    homenav.style.color = '#4f9e00'; 
    homenav.style.textShadow = '1px 5px 6px #dadada';
    homenav.style.transition = '0.5s';

}

const questions = document.querySelectorAll('.section6-part2-question');

function resetAllElements() {
    questions.forEach((question) => {
        const image = question.querySelector('.section6-part2-question-img');
        var tabWidth = document.documentElement.clientWidth;
        const answer = question.querySelector('.hidden');
        const parent = image.parentElement;
        image.style.border = "0px";
        image.style.transform = "rotate(0deg)";
        answer.style.height = '0';
        if(tabWidth < 1500){
            parent.style.height = '60px';
        }else{
            parent.style.height = '100px';
        }
    });
}

questions.forEach((question) => {
    const image = question.querySelector('.section6-part2-question-img');
    var tabWidth = document.documentElement.clientWidth;
    const answer = question.querySelector('.hidden');
    const parent = image.parentElement;
    let clickCount = 0;
    image.addEventListener("click", (event) => {
        resetAllElements();

        if (clickCount === 0) {
            event.target.style.border = "1px solid #4f9e00";
            event.target.style.transition = "0.5s";
            event.target.style.transform = "rotate(135deg)";
            answer.style.height = '30px';
            if(tabWidth < 1500){
                parent.style.height = '90px';
            }else{
                parent.style.height = '130px';
            }
            clickCount++;
        } else {
            clickCount = 0;
        }
    });
});

