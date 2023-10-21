export const cons = () => {
    let btn = document.querySelector('.consult-sub');
    let check = document.getElementById("cons_check");
    let form = document.getElementById("sect7-log");
    btn.onclick = function() {
        "use strict"
        
        if(check.checked){

            async function formSend(e){
                e.preventDefault();
                let error = formValidate(form);
                let formData = new FormData(form);

                if(error === 0){
                    form.classList.add('_sending');
                    // let response = await fetch('sendmail.php', {
                    //     method: 'POST',
                    //     body: formData
                    // });
                    // if(response.ok){
                    //     let result = await response.json();
                    //     alert(result.message);
                    //     form.reset();
                    // }else{
                    //     alert("Error of response")
                    // }
                }else{
                    alert("fill all inputs");
                }
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

    };
}