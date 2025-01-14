
var currentPath = window.location.pathname;
const homenavs = document.querySelectorAll('.home');
const shopnavs = document.querySelectorAll('.shop');
const contactnavs = document.querySelectorAll('.contact');
const cartnav = document.querySelector('.head_btn');
const inst = document.querySelector('.footer_contact_img');

const burger = document.querySelector('.sec2_head_menu');
const nav_btn = document.querySelector('.img_hedbtn3');

nav_btn.addEventListener('click', function() {
    if(!burger.classList.contains("visible")){
        burger.classList.add("visible");
    }else {
        burger.classList.remove("visible");
        
    }
    
})

if(currentPath.includes('/contact.html')){

  const btn = document.querySelector('.consult-sub');
  let check = document.getElementById("cons_check");
  let form = document.getElementById("sect7-log");
  btn.addEventListener("click", (event) => {
      "use strict"
      if(check.checked){
          let error = formValidate(form);
          if(error === 0){
          
          let params = {
              from_name: document.getElementById('FromName').value,
              from_email: document.getElementById('FromMail').value,
          }    
          emailjs.send("service_a7q9xqb","template_zg22rz3", params).then(function(res){
              alert('Successfully sent' + res.status);
          })
          }else{
              alert("fill all inputs");
          }

      }else{
          alert("You have not accepted the terms!");
      }
      function formValidate(form) {
          let error = 0;
          let formReq = document.querySelectorAll('._req');
          for(let i = 0; i < formReq.length; i++){
              const input = formReq[i];
              formRemoveError(input);

              if(input.classList.contains('_email')){
                  if(emailTest(input)){
                      formAddError(input);
                      error++;
                  }
              }else if(input.value === ''){
                  formAddError(input);
                      error++;
              }
          }
          return error;
      }
      function formAddError(input) {
          input.parentElement.classList.add('_error');
          input.classList.add('_error');
      }
      function formRemoveError(input) {
          input.parentElement.classList.remove('_error');
          input.classList.remove('_error');
      }

      function emailTest(input) {
         return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
      }
  });
    contactnavs.forEach((contactnav) => {
        contactnav.style.color = '#4f9e00'; 
        contactnav.style.textShadow = '1px 5px 6px #dadada';
        contactnav.style.transition = '0.5s';
    })
    

}else if(currentPath.includes('/cart.html')){

    let user_data = {};
    
    const payform = document.querySelector('.online_paymentform');
    const sections = document.querySelectorAll('.Payment_sect');
    const onl_check = document.getElementById('online_check');
    const rec_check = document.getElementById('reciep_check');
    const call_check = document.getElementById('call_check');
    const remind_check = document.getElementById('remind_check');

    const confirm_btn = document.querySelector('.cart-title-btn');
    const promo_btn = document.querySelector('.cart-title-btn2');
    const promo_container = document.querySelector('.main-title-btn_sec');

    sections.forEach(section => {
        const labels = section.querySelectorAll('.payment_check_txt');
        const groups = section.querySelectorAll('.payment_check');
        
        groups.forEach((group) => {
            const label = group.querySelector('.payment_check_txt');
            const check = group.querySelector('.payment-checkbox');
            
            check.addEventListener('change', function() {
                if (check.checked) {
                    
                    labels.forEach(label2 => {
                        label2.style.color = '#a0a0a0';
                    });
                    if (check == onl_check && onl_check.checked) {
                        rec_check.checked = false;
                        payform.style.display = 'flex';
                        label.style.color = 'black';
                    }
                    
                    if (check == rec_check && rec_check.checked) {
                        onl_check.checked = false;
                        payform.style.display = 'none';
                        label.style.color = 'black';
                    }
        
                    if (check == call_check && call_check.checked) {
                        remind_check.checked = false;
                        label.style.color = 'black';
                    }
        
                    if (check == remind_check && remind_check.checked) {
                        call_check.checked = false;
                        label.style.color = 'black';
                    }
                    
                }else{
                    if (!onl_check.checked ) {
                        payform.style.display = 'none';
                    }
                    label.style.color = '#a0a0a0';
                }
            });
        });
    });

    function copyStyles(source, target) {
        const computedStyles = window.getComputedStyle(source);
    
        for (let i = 0; i < computedStyles.length; i++) {
          const styleName = computedStyles[i];
          const styleValue = computedStyles.getPropertyValue(styleName);
          target.style.setProperty(styleName, styleValue);
        }
    }

    let rotationDegree = 0;

    promo_btn.addEventListener('click', () => {
        rotationDegree += 90; 

        const input = document.createElement('input');
        input.className = 'input';
        input.id = 'promo_ID';
        copyStyles(promo_btn, input);
        
        input.style.transform = `rotateY(${270}deg)`;
        promo_btn.style.transform = `rotateY(${rotationDegree}deg)`;

        setTimeout(function() {
            promo_container.removeChild(promo_btn);
            promo_container.insertBefore(input, promo_container.firstChild);

            setTimeout(() => {
                input.style.transform = `rotateY(${360}deg)`;
              }, 0);
        }, 500)

    });

    confirm_btn.addEventListener('click', () => {

        const check = document.querySelector('.payment-checkbox');

        user_data.Name = document.getElementById('FName').value;
        user_data.Name += " " + document.getElementById('SName').value;
        user_data.Email = document.getElementById('Mail').value;
        user_data.Phone = document.getElementById('Phone').value;
        user_data.City = document.getElementById('city').value;
        user_data.Street = document.getElementById('adr').value;
        user_data.House = Number.parseInt(document.getElementById('house').value);
        user_data.Apartment = document.getElementById('apartment').value;
        if(document.getElementById('online_check').checked){
            
            user_data.Card_name = document.getElementById('cname').value;
            user_data.Card_number = Number.parseInt(document.getElementById('ccnum').value);
            user_data.Card_date = document.getElementById('expdate').value;
            user_data.Card_CVV2 = Number.parseInt(document.getElementById('CVV2').value);
        }else if(document.getElementById('reciep_check').checked){
            user_data.Reciept = true;
        }
        
        if(document.getElementById('call_check').checked){
            user_data.D_callback = true;
        }else if(document.getElementById('remind_check').checked){
            user_data.Remember_me = true;
        }
        user_data.PROMO = document.getElementById('promo_ID').value;
        console.table(user_data);
    });

    cartnav.style.boxShadow = '0px 2px 10px rgba(14, 168, 0, 0.372)';
    cartnav.style.transition = '0.5s';

}else if(currentPath.includes('/shop.html')){
    let filter = {};

    const frominpt = document.getElementById('from_cost');
    const toinpt = document.getElementById('to_cost');
    const fromran = document.getElementById('a');
    const toran = document.getElementById('b');
    const groups = document.querySelectorAll('.sub_section8_status-sect');
    const shop_section = document.querySelector('.sub_section8_show');
    const filter_form = document.querySelector('.sub_section8_status');
    const close = document.querySelector('.close_img');
    const filter_menu = document.querySelector('.img_hedbtn4');
    const search_img = document.querySelector('.img_input_search');
    const form_btn = document.getElementById('submit_form_btn');
    let tabWidth = document.documentElement.clientWidth;

    filter_menu.addEventListener("click", (event) => {
        filter_form.style.display = 'flex';
        search_img.style.display = 'none';
        shop_section.style.height = '0px';
    });

    close.addEventListener("click", (event) => {
        filter_form.style.display = 'none';
        search_img.style.display = 'block';
        shop_section.style.height = '500px';
    });

    async function RequestPOST(data) {
        const errorDisplay = document.querySelector('.error');
        const response = await fetch("server/server.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data
        });
        const responseData = await response.json();
        if(responseData.status){
            return true;
        }else{
            return false;
        }
    }

    groups.forEach(group => {
        const checkboxes = group.querySelectorAll('.section7-checkbox');
        const labels = group.querySelectorAll('.sub_section8_status-ch');
        checkboxes.forEach((checkbox, index) => {
            checkbox.addEventListener('change', function() {
                if(checkbox.checked){
                    labels[index].style.color = 'black';
                }else{
                    labels[index].style.color = "#a0a0a0";
                }
            });
        });
    });
    
    addEventListener('input', e => {
        let _t = e.target;
        _t.parentNode.style.setProperty(`--${_t.id}`, +_t.value);
        if(_t.id === 'a'){
            if(_t.value == 100){
                toinpt.value =  _t.value;
            }else if((_t.value < toran.value) || _t.value == 9 || _t.value == 8 || _t.value == 7 || _t.value == 6 || _t.value == 5 || _t.value == 4 || _t.value == 3 || _t.value == 2 || _t.value == 1){
                frominpt.value =  _t.value;
            }else if((_t.value > toran.value) || _t.value != 9 || _t.value != 8 ){
                toinpt.value =  _t.value;
            }
        }else if(_t.id === 'b'){
            if(_t.value == 100){
                toinpt.value =  _t.value;
            }else if(_t.value < fromran.value || _t.value == 9 || _t.value == 8 || _t.value == 7 || _t.value == 6 || _t.value == 5 || _t.value == 4 || _t.value == 3 || _t.value == 2 || _t.value == 1){
                frominpt.value =  _t.value;
            }else if(_t.value > fromran.value || _t.value != 9 || _t.value != 8 || _t.value != 7 || _t.value != 6 || _t.value != 5 || _t.value != 4 || _t.value != 3 || _t.value != 2 || _t.value != 1){
                toinpt.value =  _t.value;
            }
        }
       
    }, false);

    form_btn.addEventListener("click", (event) => {
        
        filter.in_stock = false
        filter.expired = false
        filter.from_cost = 0;
        filter.to_cost = 0;
        filter.instrument = false
        filter.tea = false
        filter.blue_tea = false
        filter.pink_tea = false
        filter.green_tea = false
        groups.forEach((group, index) => {
            
            if(group.classList.contains("price") == false){
                const checkboxes = group.querySelectorAll('.section7-checkbox');
                const caption = group.querySelectorAll('.sub_section8_status-caption');
                checkboxes.forEach((checkbox, ch_index)=> {
                    if (checkbox.checked == true) {
                        switch (index) {
                            case 1:
                                if(ch_index == 0){
                                    filter.in_stock = true;
                                }
                                else if(ch_index == 1){
                                    filter.expired = true;
                                }
                                break;

                            case 3:
                                if(ch_index == 0){
                                    filter.instrument = true;
                                }
                                else if(ch_index == 1){
                                    filter.tea = true;
                                }
                                break;
                          
                            case 4:
                                if(ch_index == 0){
                                    filter.blue_tea = true;
                                }
                                else if(ch_index == 1){
                                    filter.pink_tea = true;
                                }
                                else if(ch_index == 2){
                                    filter.green_tea = true;
                                }
                                break;
                          
                            default:
                              console.log("Error of group index!")
                          }
                        console.log("group = "+ index + " checkbox ="+ ch_index);
                    }
                   
                });
            }
            
        });
        if(tabWidth < 500){
            filter_form.style.display = 'none';
            search_img.style.display = 'block';
            shop_section.style.height = '500px';
        }
        
        filter.from_cost = Number.parseFloat(frominpt.value)
        filter.to_cost = Number.parseFloat(toinpt.value)
        console.table(filter);
        const jsonString = JSON.stringify(filter, null, 2);
        const result = RequestPOST(jsonString);

    });

    
    shopnavs.forEach((shopnav) => {
        shopnav.style.color = '#4f9e00'; 
        shopnav.style.textShadow = '1px 5px 6px #dadada';
        shopnav.style.transition = '0.5s';
    })
    
   

}else if(currentPath.includes('/index.html') || currentPath === '/'){
    homenavs.forEach((homenav) => {
        homenav.style.color = '#4f9e00'; 
        homenav.style.textShadow = '1px 5px 6px #dadada';
        homenav.style.transition = '0.5s';
    })
    

        
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