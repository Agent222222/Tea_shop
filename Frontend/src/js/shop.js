let filter = {};

export const work = () => {
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

}

export default filter;