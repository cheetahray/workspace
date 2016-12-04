var myssid = "";
var language = "";
var centerX = 0.0;
var centerY = 0.0;
var nowx = 0.0;
var nowy = 0.0;
var succorW = 0.0;
var succorW2 = 0.0;
var now2x = 0.0;
var now2y = 0.0;
var leftAngle = 0;
var rightAngle = 0;
var topAngle = 0;
var bottomAngle = 0;
var leftAngle2 = 0;
var rightAngle2 = 0;
var topAngle2 = 0;
var bottomAngle2 = 0;
var bottom1 = 0;
var lastret = "0x00";
var last2ret = "0x80";
var ret1 = lastret;
var ret2 = last2ret;
var Angle128 = 0;
var Angle1282 = 0;
var divider = 1285;
var leftbar = 140;
var rightbar = 860;
var whiteglowalpha = 0.0;

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

function getCenter() {
	var top = $("#angle").css("top");
    var left = $("#angle").css("left");
    var width = $("#angle").css("width");
    var height = $("#angle").css("height");
    topAngle = parseInt(top.substr(0, top.indexOf("px")));
    var heightAngle = parseInt(height.substr(0, height.indexOf("px")));
    bottomAngle = topAngle + heightAngle;
    leftAngle = parseInt(left.substr(0, left.indexOf("px")));
    var widthAngle = parseInt(width.substr(0, width.indexOf("px")));
    rightAngle = leftAngle + widthAngle;
	Angle128 = ( (bottomAngle - topAngle) >> 7);
	top = $("#angle2").css("top");
    left = $("#angle2").css("left");
    width = $("#angle2").css("width");
    height = $("#angle2").css("height");
    topAngle2 = parseInt(top.substr(0, top.indexOf("px")));
    var heightAngle2 = parseInt(height.substr(0, height.indexOf("px")));
    bottomAngle2 = topAngle2 + heightAngle2;
    leftAngle2 = parseInt(left.substr(0, left.indexOf("px")));
    var widthAngle2 = parseInt(width.substr(0, width.indexOf("px")));
    rightAngle2 = leftAngle2 + widthAngle2;
	Angle1282 = ( (bottomAngle2 - topAngle2) >> 7);
}

function getSuccorW() {
    var width = $("#xy").css("width");
    succorW = parseInt(width.substr(0, width.indexOf("px"))) / 2;
	width = $("#kick").css("width");
    succorW2 = parseInt(width.substr(0, width.indexOf("px"))) / 2;
}

function getBoardary() {
    var top = $("#angle2").css("top");
    var left = $("#angle2").css("left");
    var width = $("#angle2").css("width");
    var height = $("#angle2").css("height");
    top2 = parseInt(top.substr(0, top.indexOf("px")));
    var height2 = parseInt(height.substr(0, height.indexOf("px")));
    bottom2 = top2 + height2;
    left2 = parseInt(left.substr(0, left.indexOf("px")));
    var width2 = parseInt(width.substr(0, width.indexOf("px")));
    right2 = left2 + width2;
    top = $("#angle").css("top");
    left = $("#angle").css("left");
    width = $("#angle").css("width");
    height = $("#angle").css("height");
    top1 = parseInt(top.substr(0, top.indexOf("px")));
    var height1 = parseInt(height.substr(0, height.indexOf("px")));
    bottom1 = top1 + height1;
    left1 = parseInt(left.substr(0, left.indexOf("px")));
    var width1 = parseInt(width.substr(0, width.indexOf("px")));
    right1 = left1 + width1;
}

function clearAll() {
    if (document.getElementById("already").value == "1")
    {
        ret1 = "0x00";
    }
	boxAngle.setAttribute('style', 'background-color:transparent;');
}

function clear2All() {
    if (document.getElementById("already").value == "1")
    {
        ret2 = "0x80";
    }
    boxAngle2.setAttribute('style', 'background-color:transparent;');
}

function whiteyellowalpha()
{
	document.getElementById("yellowglow").setAttribute('style', 'opacity: ' + ( ( (nowx - leftbar) / (rightbar - leftbar) ) * ( 1 - whiteglowalpha / 2.0 ) ).toString() + ';');
    document.getElementById("whiteglow").setAttribute('style', 'opacity: ' + whiteglowalpha.toString() + ';');
}

function processMove() {
    var candraw = true;
    //var mycos = tryX / nowr2sqrt;
    var ret="";
	if (nowx > leftAngle && nowx < rightAngle && nowy > topAngle && nowy < bottomAngle )
    {
		if( nowx > rightbar )
		    nowx = rightbar;
		else if( nowx < leftbar ) 
		    nowx = leftbar;
		ret = "0x" + ConvertBase.dec2hex(Math.floor( (nowx - leftbar) / 5.65 ).toString());		
    }
    else
        candraw = false;
    if(ret1 != ret)
    {
        ret1 = ret;
    }
    if (true == candraw)
    {
		whiteyellowalpha();
		boxSet.setAttribute('style', 'left: ' + (parseInt(nowx)).toString() + 'px;');
    }
}

function process2Move() {
    var candraw = true;
    //var mycos = tryX / nowr2sqrt;
    var ret="";
    if (now2x > leftAngle2 && now2x < rightAngle2 && now2y > topAngle2 && now2y < bottomAngle2 )
    {
		if( now2x > rightbar )
		    now2x = rightbar;
		else if( now2x < leftbar ) 
		    now2x = leftbar;
		ret = "0x" + ConvertBase.dec2hex( ( 128 + Math.floor( (now2x - leftbar) / 5.65 ) ).toString());
    }
    else
        candraw = false;
    if(ret2 != ret)
    {
        ret2 = ret;
    }
    if (true == candraw)
    {
		whiteglowalpha = (now2x - leftbar) / (rightbar - leftbar);
		whiteyellowalpha();
		boxKick.setAttribute('style', 'left: ' + (parseInt(now2x)).toString() + 'px;');
    }
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

var boxSet = document.getElementById('xy');

var boxKick = document.getElementById('kick');

var boxWifi = document.getElementById('wifi');

boxWifi.addEventListener('touchstart', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
    e.preventDefault();
    window.location.href = "try.htm";
}, false);

boxSet.addEventListener('touchmove', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
    e.preventDefault();
    var touch = e.touches[e.touches.length-1];
    if(touch.pageX > divider)
        touch = e.touches[e.touches.length-2];
    nowx = touch.pageX;
    nowy = touch.pageY;
    processMove();
}, false);

boxSet.addEventListener('touchend', function (e) {
    //if (document.getElementById("already").value == "1")
    //sendto("127", finalcountdown.toString());
    e.preventDefault();
	var touch = e.touches[e.touches.length-1];
    if(touch.pageY > divider)
        touch = e.touches[e.touches.length-2];
    nowx = touch.pageX;
    nowy = touch.pageY;
    processMove();
    //clearAll();
    //boxSet.setAttribute('style', 'left: 1355px;');
}, false);

boxKick.addEventListener('touchmove', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
    e.preventDefault();
    var touch = e.touches[e.touches.length-1];
    if(touch.pageX > divider)
        touch = e.touches[e.touches.length-2];
    now2x = touch.pageX;
    now2y = touch.pageY;
    process2Move();
}, false);

boxKick.addEventListener('touchend', function (e) {
    //if (document.getElementById("already").value == "1")
    //sendto("127", finalcountdown.toString());
    e.preventDefault();
	var touch = e.touches[e.touches.length-1];
    if(touch.pageY > divider)
        touch = e.touches[e.touches.length-2];
    now2x = touch.pageX;
    now2y = touch.pageY;
    process2Move();
    //clear2All();
    //boxSet.setAttribute('style', 'left: 1355px;');
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
            window.location.assign("second.html");
        else
            WifiWizard.getCurrentSSID(successInit, failureSSID);

        anyscreen([''], function () { //(['./css/index.css'],function() {

        });

        getCenter();
        //getSuccorW();
        getBoardary();

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
        setInterval("clock()",100);
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
