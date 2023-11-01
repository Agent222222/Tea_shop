export const active = () => {
    
    const payform = document.querySelector('.online_paymentform');
    const sections = document.querySelectorAll('.Payment_sect');
    const onl_check = document.getElementById('online_check');
    const rec_check = document.getElementById('reciep_check');
    const call_check = document.getElementById('call_check');
    const remind_check = document.getElementById('remind_check');

    
    sections.forEach(section => {
        const labels = section.querySelectorAll('.payment_check_txt');
        const groups = section.querySelectorAll('.payment_check');
        
        groups.forEach((group, index) => {
            const label = group.querySelector('.payment_check_txt');
            const check = group.querySelector('.payment-checkbox');
            
            check.addEventListener('change', function() {
                if (check.checked) {
                    
                    labels.forEach(label2 => {
                        label2.style.color = '#a0a0a0';
                        console.log(label2.outerHTML);
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
}