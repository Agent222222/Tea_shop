export const nav = () => {
    const burger = document.querySelector('.sec2_head_menu');
    const nav_btn = document.querySelector('.img_hedbtn3');

    nav_btn.addEventListener('click', function() {
        if(!burger.classList.contains("visible")){
            burger.classList.add("visible");
        }else {
            burger.classList.remove("visible");
            
        }
        
    })
}