export const active = () => {
 const groups = document.querySelectorAll('.payment_check');
 const payform = document.querySelector('.online_paymentform');
 const section = document.querySelector('.Payment_sect');
 const onl_check = document.getElementById('online_check');
 const rec_check = document.getElementById('reciep_check');

 groups.forEach((group, index) => {
    const label = group.querySelector('.payment_check_txt');
    const check = group.querySelector('.payment-checkbox');
    const labels = section.querySelectorAll('.payment_check_txt');
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
            
        }else{
            if (!onl_check.checked ) {
                payform.style.display = 'none';
            }
        }
        });
    });
}