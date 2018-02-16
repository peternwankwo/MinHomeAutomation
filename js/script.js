function mySwitch(obj) {
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
    alert(sw.id + '|previous status:' + previousStatus + '|current status:' + status);
}


// YES BELOW CODE IS UGLY, but it WORKS!!!  I will refine it tomorrow...zzzz
document.addEventListener("DOMContentLoaded", function(event) {

    // Call to API (to retrieve status)

    var switch1 = document.getElementById('switch1');
    var switch2 = document.getElementById('switch2');
    var switch3 = document.getElementById('switch3');
    if (switch1 && switch2 && switch3) {
        toggleSwitch(switch1);
    }
});
