const questions = document.querySelectorAll('.section6-part2-question');

function resetAllElements() {
    questions.forEach((question) => {
        const image = question.querySelector('.section6-part2-question-img');
        const answer = question.querySelector('.hidden');
        const parent = image.parentElement;

        image.style.border = "0px";
        image.style.transform = "rotate(0deg)";
        answer.style.height = '0';
        parent.style.height = 'auto';
    });
}

questions.forEach((question) => {
    let clickCount = 0;
    const image = question.querySelector('.section6-part2-question-img');
    const answer = question.querySelector('.hidden');
    const parent = image.parentElement;

    image.addEventListener("click", (event) => {
        resetAllElements();

        if (clickCount === 0) {
            event.target.style.border = "1px solid #4f9e00";
            event.target.style.transition = "0.5s";
            event.target.style.transform = "rotate(135deg)";
            answer.style.height = '30px';
            parent.style.height = '130px';
            clickCount++;
        } else {
            clickCount = 0;
        }
    });
});