export const contact = () => {
    const cont = document.querySelector('.contact');
    const sect = document.querySelector('.section7');
    var mainEl = document.querySelector('.main_desk');
    cont.onclick = function() {
        sect.style.display = 'flex';
        mainEl.style.display = 'none';
    };
}