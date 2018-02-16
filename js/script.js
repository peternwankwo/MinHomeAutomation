// Global variables
var piStatusObject;
var switch1;
var switchConstants = {
    status : {
        on: 'ON',
        off: 'OFF'
    },
    apiBaseUrl : 'http://192.168.43.172:9988'
};

// Functions
function getStatus(sw) {
    var status = sw.getAttribute('status');
    if (status === switchConstants.status.off) {
        sw.setAttribute('status', switchConstants.status.on);

    } else {
        sw.setAttribute('status', switchConstants.status.off);
    }
    // Send status to API
    setStatusToApi(status);

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
function setStatusToApi(st) {
    var status = (st == switchConstants.status.on) ? 1 : 0;
    var apiUrl = switchConstants.apiBaseUrl + "/MinHomeAutomation/phpapi/api.php/v1/cOjxzK4vGc7310/services/Light/" + status;
    $.ajax({
        url: apiUrl,
        type: "GET",
        success: function (result) {
            // Make settings globaly available
            piStatusObject = JSON.parse(result);
            updateContols();
            alert('check if switch needs to be updated based on the response of the API');
        },
        error: function (error) {
            alert("Peters mobile network is not available, so also the API is not available!");
        }
    }, this);
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
            alert("Peters mobile network is not available, so also the API is not available!");
        }
    }, this);
}
function updateContols() {
    // Controls on the page should reflect the truth (from API)
    if (piStatusObject) {
        var aaa = piStatusObject.resultObj.serviceDetail;
        for (var obj in aaa) {
            var apiSettings = aaa[obj];
            var statusFromApi = (apiSettings.status === '0') ? switchConstants.status.off : switchConstants.status.on;
            var sw = document.getElementById('switch1');
            if (sw) {
                var statusFromControl = sw.getAttribute('status');
                if (statusFromControl != statusFromApi) {
                    // Updating the status of the switch control is needed
                    setSwitch(sw, statusFromApi);
                }
            }
        }

    }
}

// Event Listener
document.addEventListener("DOMContentLoaded", function(event) {
    switch1 = document.getElementById('switch1');
    if (switch1) {
        // Call to API (to retrieve status)
        getStatusFromApi();
    }
    var sw = document.getElementById('switch1');
    if (sw){
        sw.addEventListener("click", function(event) {
            getStatus(sw);
        });
    }
});
