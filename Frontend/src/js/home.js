export const home = () => {
    const hom = document.querySelector('.home');
    const sect = document.querySelector('.section7');
    var mainEl = document.querySelector('.main_desk');
    hom.onclick = function() {
        sect.style.display = 'none';
        mainEl.style.display = 'block';
    };
}



