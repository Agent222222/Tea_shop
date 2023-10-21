import * as home from "../js/home.js"
import * as shop from "../js/shop.js"
import * as contact from "../js/contact.js"

home.home();
shop.shop();
contact.contact();
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

let btn = document.querySelector('.consult-sub');
let check = document.getElementById("cons_check");
btn.onclick = function() {
    if(check.checked){
        
    }else{
        alert("You have not accepted the terms!");
    }
};

