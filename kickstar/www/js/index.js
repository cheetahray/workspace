var myssid = "";
var language = "";

function alertDismissed() {
    // do something
}

var failureSet = function (err) {
    //document.getElementById("already").value = "0";
    if (language == "zh-TW")
        navigator.notification.alert("網路設定失敗" + err, alertDismissed, '', '確定');
    else if (language == "zh-CN")
        navigator.notification.alert("网路设定失败" + err, alertDismissed, '', '确定');
    else
        navigator.notification.alert("Network fails." + err, alertDismissed, '', 'OK');
}

var successInternal = function (message) {
    /*
	if (document.getElementById("already").value == "0") {
        document.getElementById("already").value = "1";
    }
	*/
    if (language == "zh-TW")
        console.log("網路初步成功" + message);
    else if (language == "zh-CN")
        console.log("网路初步成功" + message);
    else
        console.log("Network seems ready." + message);
}


var failureSSID = function (err) {
    //document.getElementById("already").value = "0";
    if (language == "zh-TW")
        navigator.notification.alert("抓取網路名稱失敗" + err, alertDismissed, '', '確定');
    else if (language == "zh-CN")
        navigator.notification.alert("抓取网路名称失败" + err, alertDismissed, '', '确定');
    else
        navigator.notification.alert("Get Wifi SSID fails." + err, alertDismissed, '', 'OK');
}

function strcmp(a, b) {
    return a.indexOf(b) >= 0;
}

var successInit = function (message) {
    myssid = message;
    if (strcmp(myssid, "bellclass_"))
    {
        hello.initialize("192.168.4.1", 8888, successInternal, failureSet);
    }
	/*
    else if (document.getElementById("already").value == "0")
    {
        id3();
    }
	*/
}

var boxTi = document.getElementById('seven');

boxTi.addEventListener('touchstart', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
        boxTi.setAttribute('style', 'background-color:#CA27D3;');
    e.preventDefault();
}, false);

boxTi.addEventListener('touchend', function (e) {
    //if (document.getElementById("already").value == "1")
        boxTi.setAttribute('style', 'background-color:transparent;');
    //sendto("223", finalcountdown.toString());
    e.preventDefault();
}, false);

var boxLa = document.getElementById('six');

boxLa.addEventListener('touchstart', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
        boxLa.setAttribute('style', 'background-color:#233AB9;');
    e.preventDefault();
}, false);

boxLa.addEventListener('touchend', function (e) {
    //if (document.getElementById("already").value == "1")
        boxLa.setAttribute('style', 'background-color:transparent;');
    //sendto("207", finalcountdown.toString());
    e.preventDefault();
}, false);

var boxSo = document.getElementById('five');

boxSo.addEventListener('touchstart', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
        boxSo.setAttribute('style', 'background-color:#2CC8C7;');
    e.preventDefault();
}, false);

boxSo.addEventListener('touchend', function (e) {
    //if (document.getElementById("already").value == "1")
        boxSo.setAttribute('style', 'background-color:transparent;');
    //sendto("191", finalcountdown.toString());
    e.preventDefault();
}, false);

var boxFa = document.getElementById('four');

boxFa.addEventListener('touchstart', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
        boxFa.setAttribute('style', 'background-color:#3CD12F;');
    e.preventDefault();
}, false);

boxFa.addEventListener('touchend', function (e) {
    //if (document.getElementById("already").value == "1")
        boxFa.setAttribute('style', 'background-color:transparent;');
    //sendto("175", finalcountdown.toString());
    e.preventDefault();
}, false);

var boxMi = document.getElementById('three');

boxMi.addEventListener('touchstart', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
        boxMi.setAttribute('style', 'background-color:#D1D62E;');
    e.preventDefault();
}, false);

boxMi.addEventListener('touchend', function (e) {
    //if (document.getElementById("already").value == "1")
        boxMi.setAttribute('style', 'background-color:transparent;');
    //sendto("159", finalcountdown.toString());
    e.preventDefault();
}, false);

var boxRe = document.getElementById('two');

boxRe.addEventListener('touchstart', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
        boxRe.setAttribute('style', 'background-color:#D5922E;');
    e.preventDefault();
}, false);

boxRe.addEventListener('touchend', function (e) {
    //if (document.getElementById("already").value == "1")
        boxRe.setAttribute('style', 'background-color:transparent;');
    //sendto("143", finalcountdown.toString());
    e.preventDefault();
}, false);

var boxDo = document.getElementById('one');

boxDo.addEventListener('touchstart', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
        boxDo.setAttribute('style', 'background-color:#BE2E2B;');
    e.preventDefault();
}, false);

boxDo.addEventListener('touchend', function (e) {
    //if (document.getElementById("already").value == "1")
        boxDo.setAttribute('style', 'background-color:transparent;');
    //sendto("127", finalcountdown.toString());
    e.preventDefault();
}, false);

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		/* the larger side ALWAYS is called 'height' */
        navigator.globalization.getLocaleName(
            function (locale) { language = locale.value; },
            function () { navigator.nofification.alert('Error getting locale\n'); }
        );

        if (screen.width > screen.height) {
            app.deviceHeight = screen.width;
            app.deviceWidth = screen.height;
        }
        else {
            app.deviceHeight = screen.height;
            app.deviceWidth = screen.width;
        }
        var ratio = app.deviceHeight / app.deviceWidth;
        if (ratio < 1.55 && window.location.href.indexOf("second") < 0)
            window.location.assign("second.html");
        else
            WifiWizard.getCurrentSSID(successInit, failureSSID);
		
		anyscreen([''], function () { //(['./css/index.css'],function() {

        });

        window.screen.lockOrientation('landscape');
			
		cordova.plugins.backgroundMode.enable();

        // Called when background mode has been activated
        cordova.plugins.backgroundMode.ondeactivate = function () {
            WifiWizard.getCurrentSSID(successInit, failureSSID);
        }
		
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
