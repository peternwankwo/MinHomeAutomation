function getStatus(obj) {
    if (obj.getAttribute('status') === 'OFF') {
        obj.setAttribute('status', 'ON');
    } else {
        obj.setAttribute('status', 'OFF');
    }
    console.log(obj.id + ':' + obj.getAttribute('status'));
}
function toggleSwitch(sw) {
    var status = sw.getAttribute('status');
    var previousStatus = status;
    status = (status === 'OFF') ? 'ON' : 'OFF';
    console.log('toggleSwitch:' + sw.id + '|previous status:' + previousStatus + '|current status:' + status);
}
function setSwitch(sw, prefferdStatus) {
    var status = sw.getAttribute('status');
    status = prefferdStatus;
    sw.checked = (status == 'ON') ? true : false;
    console.log('setSwitch:' + sw.id + '|' + status);
}


// YES BELOW CODE IS UGLY, but it WORKS!!!  I will refine it tomorrow...zzzz
document.addEventListener("DOMContentLoaded", function(event) {

    // Call to API (to retrieve status)
    var statusOfSwitch1FromAPI = 'ON';
    var statusOfSwitch2FromAPI = 'ON';

    var switch1 = document.getElementById('switch1');
    var switch2 = document.getElementById('switch2');
    var switch3 = document.getElementById('switch3');
    if (switch1 && switch2 && switch3) {

        setSwitch(switch1, statusOfSwitch1FromAPI);
        setSwitch(switch2, statusOfSwitch2FromAPI);

        //toggleSwitch(switch1);
    }
});
