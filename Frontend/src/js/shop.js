let filter = {};

export const work = () => {
    const frominpt = document.getElementById('from_cost');
    const toinpt = document.getElementById('to_cost');
    const fromran = document.getElementById('a');
    const toran = document.getElementById('b');
    const groups = document.querySelectorAll('.sub_section8_status-sect');
    const find_req = document.querySelector('.find_btn');
   

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

    find_req.addEventListener("click", (event) => {
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
                            case 0:
                                if(ch_index == 0){
                                    filter.in_stock = true;
                                }
                                else if(ch_index == 1){
                                    filter.expired = true;
                                }
                                break;

                            case 2:
                                if(ch_index == 0){
                                    filter.instrument = true;
                                }
                                else if(ch_index == 1){
                                    filter.tea = true;
                                }
                                break;
                          
                            case 3:
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
        filter.from_cost = Number.parseFloat(frominpt.value)
        filter.to_cost = Number.parseFloat(toinpt.value)
        console.table(filter);
    });

}

export default filter;