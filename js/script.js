var piStatusObject;
var switch1;

var switchConstants = {
    status : {
        on: 'ON',
        off: 'OFF'
    },
    apiBaseUrl : 'http://192.168.43.172:9988'
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

function getStatusFromApi() {
    var apiUrl = switchConstants.apiBaseUrl + "/MinHomeAutomation/phpapi/api.php/v1/cOjxzK4vGc7310/services/Light";
    //var apiUrl = 'http://localhost/MinHomeAutomation/phpapi/api.php/v1/cOjxzK4vGc7310/status';
    $.ajax({
        url: apiUrl,
        type: "GET",
        success: function (result) {
            // Make settings globaly available
            piStatusObject = JSON.parse(result);
            updateContols();
        },
        error: function (error) {
            alert("error" + this.url);
        }
    }, this);
}
function updateContols() {
    // Controls on the page should reflect the truth (from API)
    if (piStatusObject) {
        var aaa = piStatusObject.resultObj.serviceDetail;
        for (var obj in aaa) {
            var apiSettings = aaa[obj];
            var status = (apiSettings.Status === '0') ? switchConstants.status.off : switchConstants.status.on;
            var sw = document.getElementById('switch1');
            if (sw) {
                setSwitch(sw, status);
            }
        }

    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    switch1 = document.getElementById('switch1');
    if (switch1) {
        // Call to API (to retrieve status)
        getStatusFromApi();
    }
});
