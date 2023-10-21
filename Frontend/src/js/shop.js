export const shop = () => {
    const sh = document.querySelector('.shop');
    const sect = document.querySelector('.section7');
    var mainEl = document.querySelector('.main_desk');
    sh.onclick = function() {
        sect.style.display = 'none';
        mainEl.style.display = 'none';
    };
}