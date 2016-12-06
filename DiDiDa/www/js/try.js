var myssid = "";
var language = "";
var nowx = 0.0;
var nowy = 0.0;
var now2x = 0.0;
var now2y = 0.0;

var successScan = function (message) {
    if (language == "zh-TW")
        console.log("傳送掃描請求" + message);
    else if (language == "zh-CN")
        console.log("传送扫描请求" + message);
    else
        console.log("Send scan request." + message);
}

var failureScan = function (message) {
    if (language == "zh-TW")
        navigator.notification.alert("傳送掃描失敗" + message, alertDismissed, '', '確定');
    else if (language == "zh-CN")
        navigator.notification.alert("传送扫描失败" + message, alertDismissed, '', '确定');
    else
        navigator.notification.alert("Send scan failed." + message, alertDismissed, '', 'OK');
}

function alertDismissed() {
    // do something
}

function clearAll() {
    if (document.getElementById("already").value == "1")
    {
        ;
    }
}

function clear2All() {
    if (document.getElementById("already").value == "1")
    {
        ;
    }
}

function processMove() {
    
}

function process2Move() {
    
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
    if (document.getElementById("already").value == "0") {
        document.getElementById("already").value = "1";
    }
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
	networkinterface.getIPAddress(
        function (ip) {
            myip = ip.substring(0, ip.lastIndexOf(".") + 1);
            //app.scanEvent('deviceready');
	        hello.initialize(myip + "255", 8008, successInternal, failureSet);
        }
    );
	/*
	ssidshould = "DiDiDa";
    if (strcmp(myssid, ssidshould)) {
        hello.initialize("192.168.4.255", 8008, successInternal, failureSet);
    }
    else if (language == "zh-TW")
        navigator.notification.alert("您沒連上 wifi " + ssidshould, alertDismissed, '', '確定');
    else if (language == "zh-CN")
        navigator.notification.alert("您没连上 wifi " + ssidshould, alertDismissed, '', '确定');
    else
        navigator.notification.alert("You haven't connected wifi " + ssidshould, alertDismissed, '', 'OK');
    else if (document.getElementById("already").value == "0")
    {
       ; //id3();
    }
    */
}

var boxName = document.getElementById('name');
var boxPass = document.getElementById('pass');
var boxSave = document.getElementById('save');
var boxTest = document.getElementById('test');
var boxReset = document.getElementById('reset');

boxName.addEventListener('touchstart', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
    e.preventDefault();
    Keyboard.show();
}, false);

boxPass.addEventListener('touchstart', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
    e.preventDefault();
    Keyboard.show();
}, false);

boxSave.addEventListener('touchstart', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
    e.preventDefault();
    
}, false);

boxTest.addEventListener('touchstart', function (e) {
    //if (document.getElementById("already").value == "1")
    //sendto("127", finalcountdown.toString());
    e.preventDefault();
	
}, false);

boxReset.addEventListener('touchstart', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
    e.preventDefault();
}, false);

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        /* the larger side ALWAYS is called 'height' */
        navigator.globalization.getLocaleName(
            function (locale) {
                language = locale.value;
            },
            function () {
                navigator.nofification.alert('Error getting locale\n');
            }
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
            window.location.assign("trytry.html");
        else
            WifiWizard.getCurrentSSID(successInit, failureSSID);

        anyscreen([''], function () { //(['./css/index.css'],function() {

        });

        window.screen.lockOrientation('portrait');
        
        cordova.plugins.backgroundMode.enable();

        // Called when background mode has been activated
        cordova.plugins.backgroundMode.ondeactivate = function () {
            WifiWizard.getCurrentSSID(successInit, failureSSID);
        }
        
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        window.navigationbar.setUp(true);
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:none;');
        //setInterval("clock()",100);
        console.log('Received Event: ' + id);
    }
};

function clock()
{
    if (document.getElementById("already").value == "1") {
        var isleft = false;
        if(lastret != ret1) {
            hello.sendMessage(ret1, successScan, failureScan);
            //$("#note").text(ConvertBase.dec2bin(parseInt(ret1).toString()));
            lastret = ret1;
			isleft = true;
        }
        if(last2ret != ret2 && false == isleft) {
            //for(ii = 0; ii < 5; ii++)
            hello.sendMessage(ret2, successScan, failureScan);
            //$("#note").text(ConvertBase.dec2bin(parseInt(ret2).toString()));
            last2ret = ret2;
        }
    }
}

app.initialize();
