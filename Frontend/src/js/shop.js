export const work = () => {
    const frominpt = document.getElementById('from_cost');
    const toinpt = document.getElementById('to_cost');
    const fromran = document.getElementById('a');
    const toran = document.getElementById('b');
    const groups = document.querySelectorAll('.sub_section8_status-sect');

    groups.forEach(group => {
        const checkboxes = group.querySelectorAll('.section7-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                checkboxes.forEach(otherCheckbox => {
                    if (otherCheckbox !== checkbox && otherCheckbox.checked) {
                        otherCheckbox.checked = false;
                    }
                });
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

}