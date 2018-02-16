
var switchConstants = {
    status : {
        on: 'ON',
        off: 'OFF'
    }
};

function getStatus(sw) {
    if (sw.getAttribute('status') === switchConstants.status.off) {
        sw.setAttribute('status', switchConstants.status.on);
    } else {
        sw.setAttribute('status', switchConstants.status.off);
    }
    console.log(sw.id + ':' + sw.getAttribute('status'));
}
function toggleSwitch(sw) {
    var status = sw.getAttribute('status');
    var previousStatus = status;
    status = (status === 'OFF') ? switchConstants.status.on : switchConstants.status.off;
    console.log('toggleSwitch:' + sw.id + '|previous status:' + previousStatus + '|current status:' + status);
}
function setSwitch(sw, prefferdStatus) {
    var status = sw.getAttribute('status');
    status = prefferdStatus;
    sw.checked = (status == switchConstants.status.on) ? true : false;
    console.log('setSwitch:' + sw.id + '|' + status);
}


// YES BELOW CODE IS UGLY, but it WORKS!!!  I will refine it tomorrow...zzzz
document.addEventListener("DOMContentLoaded", function(event) {

    // Call to API (to retrieve status)
    var statusOfSwitch1FromAPI = switchConstants.status.off;
    var statusOfSwitch2FromAPI = switchConstants.status.on;

    var switch1 = document.getElementById('switch1');
    var switch2 = document.getElementById('switch2');
    var switch3 = document.getElementById('switch3');
    if (switch1 && switch2 && switch3) {

        setSwitch(switch1, statusOfSwitch1FromAPI);
        setSwitch(switch2, statusOfSwitch2FromAPI);

        //toggleSwitch(switch1);
    }
});

