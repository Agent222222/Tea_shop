export const cons = () => {
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
}