let user_data = {};

export const active = () => {
    
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
}

export default user_data;