// Global variables
var piStatusObject;
var switchConstants = {
    status : {
        on: 'ON',
        off: 'OFF'
    },
    switches: {
        light: 'switch1',
        water: 'switch2',
        motion: 'switch3'
    },
    types: {
        light: 'Light',
        water: 'Water',
        motion: 'Motion'
    },
    apiBaseUrl : 'http://192.168.101.149/MIN',
    navigation:{
        lighting: 'lighting.html',
        security: 'security.html',
        watering: 'watering.html',
        settings: 'settings.html',
        statistics: 'statistics.html',
        profile: 'profile.html'
    },
    cameraUrls: {
        testUrl: 'https://daveismyname.com',
        camera1: 'http://192.168.101.170:3000/',
        camera2: 'https://www.youtube.com/embed/qy13FavwqPo?autoplay=1',
        liveAmsterdamCamera: 'https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com'
    }
};

// Functions
function getStatus(sw) {
    var status = sw.getAttribute('status');
    if (status === switchConstants.status.off) {
        sw.setAttribute('status', switchConstants.status.off);
    } else {
        sw.setAttribute('status', switchConstants.status.on);
    }
    console.log(sw.id + ':' + sw.getAttribute('status'));
}

function toggleSwitch(sw) {
    var status = sw.getAttribute('status');
    var previousStatus = status;
    status = (status === 'OFF') ? switchConstants.status.on : switchConstants.status.off;
    var type = getType(sw.id);

    setSwitch(sw, status);
    setStatusToApi(status, type);
    console.log('toggleSwitch:' + sw.id + '|previous status:' + previousStatus + '|current status:' + status);
}

function setSwitch(sw, prefferdStatus) {
    var status = sw.getAttribute('status');
    status = prefferdStatus;
    sw.checked = (prefferdStatus === switchConstants.status.on) ? true : false;
    sw.setAttribute('status', prefferdStatus);
    console.log('setSwitch:' + sw.id + '|' + status);
}

function setStatusToApi(st, type) {
    console.log('setStatusToApi method:' + type);
    var status = (st == switchConstants.status.on) ? 1 : 0;
    var apiUrl = switchConstants.apiBaseUrl + "/MinHomeAutomation/phpapi/api.php/v1/cOjxzK4vGc7310/services/" + type + "/" + status;

    $.ajax({
        url: apiUrl,
        type: "GET",
        sendStatus: status,
        success: function (result, xhr, settings) {
            // Make settings globaly available
            piStatusObject = JSON.parse(result);
            isValidService(this.sendStatus.toString(), piStatusObject.resultObj.serviceDetail[0].status);
            updateContols();
        },
        error: function (error) {
            console.log("Peters mobile network is not available, so also the API is not available!");
        }
    }, this);
}
function isValidService(sendStatus, retrievedStatus) {
    if (sendStatus !== retrievedStatus) {
        alert('Server is busy and can\'t execute the request. Please try again.' + '[' + sendStatus + '|' + retrievedStatus + ']');
    }
}
function getStatusFromApi(type) {
    console.log('getStatusFromApi method:' + type);
    var apiUrl = switchConstants.apiBaseUrl + "/MinHomeAutomation/phpapi/api.php/v1/cOjxzK4vGc7310/services/" + type;
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
            console.log("Peters mobile network is not available, so also the API is not available!");
        }
    }, this);
}
function updateContols() {
    // Controls on the page should reflect the truth (from API)
    if (piStatusObject) {
        var aaa = piStatusObject.resultObj.serviceDetail;

        // Currently it is still only one object
        for (var obj in aaa) {
            var apiSettings = aaa[obj];
            var statusFromApi = (apiSettings.status === '0') ? switchConstants.status.off : switchConstants.status.on;

            /*toggle the image of the lighting based on status*/
            if(document.getElementById("light-on-status")){
                if(statusFromApi === switchConstants.status.on){
                    document.getElementById("light-on-status").src = "assets/light-bulb-green.svg";
                }else{
                    document.getElementById("light-on-status").src = "assets/light-bulb-grey.svg";
                }
            }

            /*toggle the image of the watering based on status*/
            if(document.getElementById("water-on-status")){
                if(statusFromApi === switchConstants.status.on){
                    document.getElementById("water-on-status").src = "assets/watering_green.svg";
                }else{
                    document.getElementById("water-on-status").src = "assets/watering_grey.svg";
                }
            }

            var switchSelector = (apiSettings.type === 'Light') ? 'switch1' : 'switch2';

            var switchSelector;
            if (apiSettings.type === switchConstants.types.light) {
                switchSelector = 'switch1';
            } else if (apiSettings.type === switchConstants.types.water) {
                switchSelector = 'switch2';
            } else if (apiSettings.type === switchConstants.types.motion) {
                switchSelector = 'switch3';
            }

            var sw = document.getElementById(switchSelector);
            if (sw) {
                var statusFromControl = sw.getAttribute('status');
                if (statusFromControl !== statusFromApi) {
                    // Updating the status of the switch control is needed
                    setSwitch(sw, statusFromApi);
                }
            }
            var notification = $('#notification');
            if (notification && apiSettings.timeOn !== '0000-00-00 00:00:00' && apiSettings.type == switchConstants.types.water) {
                notification.empty();
                var dateObject = new Date(apiSettings.timeOn);
                var format = "YYYY-MMM-DD DDD";

                notification.append('<span>Last watered:</span> <span>' + formatDate(dateObject) + '</span>');
                notification.removeClass('d-none');
            } else if (notification && apiSettings.timeOff !== '0000-00-00 00:00:00' && apiSettings.type == switchConstants.types.water) {
                notification.empty();
                var dateObject = new Date(apiSettings.timeOff);
                notification.append('<span>Last watered:</span> <span>' + formatDate(dateObject) + '</span>');
                notification.removeClass('d-none');
            }

        }

    }
}
function formatDate(date) {
    var monthNames = [
        "Januari", "Februari", "Maart",
        "April", "Mei", "Juni", "Juli",
        "Augustus", "September", "Oktober",
        "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var miniseconds = date.getMilliseconds();

    return day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' + hours + ':' + minutes + ':' + seconds;
}
function selectActiveNavigationItem(){
    // add class active to LI
    var activePage = getActivePage();
    try{
        $('#' + activePage).addClass(' active');
    }
    catch(err){}
}
function getActivePage(){
    var url = $(location).attr('href'),
        parts = url.split("/"),
        last_part = parts[parts.length-2];
    return parts[parts.length-1].replace('.html','');
}
function getType(selector) {
    var type;
    if (selector === switchConstants.switches.light) {
        type = switchConstants.types.light
    } else if (selector === switchConstants.switches.water) {
        type = switchConstants.types.water
    } else if (selector === switchConstants.switches.motion) {
        type = switchConstants.types.motion
    }
    return type;
}
function activateListener(switchSelector, type){
    //  Listener that constantly checks the lights and this should be visible via the switch controls
    var i = 0;
    function listenToApi() {
        setInterval(function() { // this code is executed every 5 seconds:
            getStatusFromApi(type);
            i++;
        }, 5000);
    }
    $(listenToApi);
}

function checkForValidResponse(url) {
    ////192.168.101.170:3000/
    var abc = $.ajax({
        url: url,
        dataType: 'jsonp',
        crossDomain: true,
        timeout: 5000,
        complete: function( e, xhr, settings) {
            switch( e.status ) {
                case 200:
                    $("#itemcontent iframe").attr({'src':url});
                    break;
                default:
                    alert('Security camera unavailable or can\'t be iframed:' + url);
                    return false;
                    break;
            }
        }
    }, this);
}


// Event Listener
document.addEventListener("DOMContentLoaded", function(event) {
    // Load the navigation-code-snippet into the placeholder
    $( "#navbarTogglerDemo02" ).load("./html/navigation.html",function() {
        selectActiveNavigationItem();
    });

    var arrSwitches = [switchConstants.switches.light, switchConstants.switches.water, switchConstants.switches.motion];
    var activePage = getActivePage();
    arrSwitches.forEach(function(switchSelector) {
        sw = document.getElementById(switchSelector);
        // Only continue if: watering.html => water
        // Only continue if: lighting.html => light and motion

        var isLightingPage = ((switchConstants.navigation.lighting.indexOf(activePage) > -1) && (switchSelector === switchConstants.switches.light));
        var isWateringPage = ((switchConstants.navigation.watering.indexOf(activePage) > -1) && (switchSelector === switchConstants.switches.water));
        var isMotionPage = ((switchConstants.navigation.lighting.indexOf(activePage) > -1) && (switchSelector === switchConstants.switches.motion));



        if (sw && (isWateringPage || isLightingPage || isMotionPage)) {
            // Call to API (to retrieve status)
            var type = getType(switchSelector);
            getStatusFromApi(type);
            activateListener(switchSelector, type);
        }

    });

    // Activate Security Camera
    var isSecurityPage = ((switchConstants.navigation.security.indexOf(activePage) > -1));
    if (isSecurityPage) {
        var isValidUrl = checkForValidResponse(switchConstants.cameraUrls.camera1);
    }


});

