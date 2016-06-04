var myssid = "";
var language = "";
var centerX = 0.0;
var centerY = 0.0;
var nowx = 0.0;
var nowy = 0.0;
var succorW = 0.0;
var left7 = 0;
var right7 = 0;
var top7 = 0;
var bottom7 = 0;
var left6 = 0;
var right6 = 0;
var top6 = 0;
var bottom6 = 0;
var left5 = 0;
var right5 = 0;
var top5 = 0;
var bottom5 = 0;
var left4 = 0;
var right4 = 0;
var top4 = 0;
var bottom4 = 0;
var left3 = 0;
var right3 = 0;
var top3 = 0;
var bottom3 = 0;
var left2 = 0;
var right2 = 0;
var top2 = 0;
var bottom2 = 0;
var left1 = 0;
var right1 = 0;
var top1 = 0;
var bottom1 = 0;

function alertDismissed() {
    // do something
}

function getCenter()
{
	var top = $("#seven").css("top");
    var left = $("#seven").css("left");
    var width = $("#seven").css("width");
    var height = $("#seven").css("height");
	top7 = parseInt( top.substr(0, top.indexOf("px")) );
	var height7 = parseInt( height.substr(0, height.indexOf("px")) );
	bottom7 = top7 + height7; 
	left7 = parseInt( left.substr(0, left.indexOf("px")) );
	var width7 = parseInt( width.substr(0, width.indexOf("px")) );
	right7 = left7 + width7;
	centerY = top7 + height7 / 2;
	centerX = left7 + width7 / 2;
}

function getSuccorW()
{
	var width = $("#xy").css("width");
    succorW = parseInt( width.substr(0, width.indexOf("px")) ) / 2;
}

function getBoardary()
{
	var top = $("#six").css("top");
    var left = $("#six").css("left");
    var width = $("#six").css("width");
    var height = $("#six").css("height");
	top6 = parseInt( top.substr(0, top.indexOf("px")) );
	var height6 = parseInt( height.substr(0, height.indexOf("px")) );
	bottom6 = top6 + height6; 
	left6 = parseInt( left.substr(0, left.indexOf("px")) );
	var width6 = parseInt( width.substr(0, width.indexOf("px")) );
	right6 = left6 + width6;

	top = $("#five").css("top");
    left = $("#five").css("left");
    width = $("#five").css("width");
    height = $("#five").css("height");
	top5 = parseInt( top.substr(0, top.indexOf("px")) );
	var height5 = parseInt( height.substr(0, height.indexOf("px")) );
	bottom5 = top5 + height5; 
	left5 = parseInt( left.substr(0, left.indexOf("px")) );
	var width5 = parseInt( width.substr(0, width.indexOf("px")) );
	right5 = left5 + width5;

	top = $("#four").css("top");
    left = $("#four").css("left");
    width = $("#four").css("width");
    height = $("#four").css("height");
	top4 = parseInt( top.substr(0, top.indexOf("px")) );
	var height4 = parseInt( height.substr(0, height.indexOf("px")) );
	bottom4 = top4 + height4; 
	left4 = parseInt( left.substr(0, left.indexOf("px")) );
	var width4 = parseInt( width.substr(0, width.indexOf("px")) );
	right4 = left4 + width4;

	top = $("#three").css("top");
    left = $("#three").css("left");
    width = $("#three").css("width");
    height = $("#three").css("height");
	top3 = parseInt( top.substr(0, top.indexOf("px")) );
	var height3 = parseInt( height.substr(0, height.indexOf("px")) );
	bottom3 = top3 + height3; 
	left3 = parseInt( left.substr(0, left.indexOf("px")) );
	var width3 = parseInt( width.substr(0, width.indexOf("px")) );
	right3 = left3 + width3;

	top = $("#two").css("top");
    left = $("#two").css("left");
    width = $("#two").css("width");
    height = $("#two").css("height");
	top2 = parseInt( top.substr(0, top.indexOf("px")) );
	var height2 = parseInt( height.substr(0, height.indexOf("px")) );
	bottom2 = top2 + height2; 
	left2 = parseInt( left.substr(0, left.indexOf("px")) );
	var width2 = parseInt( width.substr(0, width.indexOf("px")) );
	right2 = left2 + width2;

	top = $("#one").css("top");
    left = $("#one").css("left");
    width = $("#one").css("width");
    height = $("#one").css("height");
	top1 = parseInt( top.substr(0, top.indexOf("px")) );
	var height1 = parseInt( height.substr(0, height.indexOf("px")) );
	bottom1 = top1 + height1; 
	left1 = parseInt( left.substr(0, left.indexOf("px")) );
	var width1 = parseInt( width.substr(0, width.indexOf("px")) );
	right1 = left1 + width1;
    
}

function processMove()
{
	var candraw = true;
	if ( nowx > left1 && nowx < right1 && nowy > top1  && nowy < bottom1 )
	    $("#note").text("1");
	else if ( nowx > left2 && nowx < right2 && nowy > top2  && nowy < bottom2 )
		$("#note").text("2");
	else if ( nowx > left3 && nowx < right3 && nowy > top3  && nowy < bottom3 )
	    $("#note").text("3");
	else if ( nowx > left4 && nowx < right4 && nowy > top4  && nowy < bottom4 )
		$("#note").text("4");
	else if ( nowx > left5 && nowx < right5 && nowy > top5  && nowy < bottom5 )
	    $("#note").text("5");
	else if ( nowx > left6 && nowx < right6 && nowy > top6  && nowy < bottom6 )
	    $("#note").text("6");
	else if ( nowx > left7 && nowx < right7 && nowy > top7  && nowy < bottom7 )
	    $("#note").text("7");
    else
	    candraw = false;
	if (true == candraw)
	    boxSet.setAttribute('style', 'left: ' + (parseInt(nowx)-succorW).toString() + 'px; top: ' + (parseInt(nowy)-succorW).toString() + 'px;');
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
	else if (language == "zh-TW")
        navigator.notification.alert("您沒連上電路板的wifi" + err, alertDismissed, '', '確定');
    else if (language == "zh-CN")
        navigator.notification.alert("您没连上电路板的wifi" + err, alertDismissed, '', '确定');
    else
        navigator.notification.alert("You haven't connected to motherboard's wifi." + err, alertDismissed, '', 'OK');
	/*
    else if (document.getElementById("already").value == "0")
    {
        id3();
    }
	*/
}

var boxSet = document.getElementById('xy');

var boxTi = document.getElementById('seven');

boxTi.addEventListener('touchstart', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
	    //boxTi.setAttribute('style', 'background-color:#CA27D3;');
    e.preventDefault();
	var touch = e.touches[0];
	nowx = touch.pageX;
	nowy = touch.pageY;
		boxSet.setAttribute('style', 'left: ' + (parseInt(nowx)-succorW).toString() + 'px; top: ' + (parseInt(nowy)-succorW).toString() + 'px;');
}, false);

boxTi.addEventListener('touchmove', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
	e.preventDefault();
	var touch = e.touches[0];
	nowx = touch.pageX;
	nowy = touch.pageY;
	processMove();
}, false);

boxTi.addEventListener('touchend', function (e) {
    //if (document.getElementById("already").value == "1")
        //boxTi.setAttribute('style', 'background-color:transparent;');
    //sendto("223", finalcountdown.toString());
    e.preventDefault();
	nowx = centerX;
    nowy = centerY;
		boxSet.setAttribute('style', 'left: ' + (parseInt(nowx)-succorW).toString() + 'px; top: ' + (parseInt(nowy)-succorW).toString() + 'px;');
}, false);

var boxLa = document.getElementById('six');

boxLa.addEventListener('touchstart', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
        //boxLa.setAttribute('style', 'background-color:#233AB9;');
    e.preventDefault();
	var touch = e.touches[0];
	nowx = touch.pageX;
	nowy = touch.pageY;
		boxSet.setAttribute('style', 'left: ' + (parseInt(nowx)-succorW).toString() + 'px; top: ' + (parseInt(nowy)-succorW).toString() + 'px;');
}, false);

boxLa.addEventListener('touchmove', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
    e.preventDefault();
	var touch = e.touches[0];
	nowx = touch.pageX;
	nowy = touch.pageY;
	processMove();
}, false);

boxLa.addEventListener('touchend', function (e) {
    //if (document.getElementById("already").value == "1")
        //boxLa.setAttribute('style', 'background-color:transparent;');
    //sendto("207", finalcountdown.toString());
    e.preventDefault();
	nowx = centerX;
    nowy = centerY;
		boxSet.setAttribute('style', 'left: ' + (parseInt(nowx)-succorW).toString() + 'px; top: ' + (parseInt(nowy)-succorW).toString() + 'px;');
}, false);

var boxSo = document.getElementById('five');

boxSo.addEventListener('touchstart', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
        //boxSo.setAttribute('style', 'background-color:#2CC8C7;');
    e.preventDefault();
	var touch = e.touches[0];
	nowx = touch.pageX;
	nowy = touch.pageY;
		boxSet.setAttribute('style', 'left: ' + (parseInt(nowx)-succorW).toString() + 'px; top: ' + (parseInt(nowy)-succorW).toString() + 'px;');
}, false);

boxSo.addEventListener('touchmove', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
    e.preventDefault();
	var touch = e.touches[0];
	nowx = touch.pageX;
	nowy = touch.pageY;
	processMove();
}, false);

boxSo.addEventListener('touchend', function (e) {
    //if (document.getElementById("already").value == "1")
        //boxSo.setAttribute('style', 'background-color:transparent;');
    //sendto("191", finalcountdown.toString());
    e.preventDefault();
	nowx = centerX;
    nowy = centerY;
		boxSet.setAttribute('style', 'left: ' + (parseInt(nowx)-succorW).toString() + 'px; top: ' + (parseInt(nowy)-succorW).toString() + 'px;');
}, false);

var boxFa = document.getElementById('four');

boxFa.addEventListener('touchstart', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
        //boxFa.setAttribute('style', 'background-color:#3CD12F;');
    e.preventDefault();
	var touch = e.touches[0];
	nowx = touch.pageX;
	nowy = touch.pageY;
		boxSet.setAttribute('style', 'left: ' + (parseInt(nowx)-succorW).toString() + 'px; top: ' + (parseInt(nowy)-succorW).toString() + 'px;');
}, false);

boxFa.addEventListener('touchmove', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
    e.preventDefault();
	var touch = e.touches[0];
	nowx = touch.pageX;
	nowy = touch.pageY;
	processMove();
}, false);

boxFa.addEventListener('touchend', function (e) {
    //if (document.getElementById("already").value == "1")
        //boxFa.setAttribute('style', 'background-color:transparent;');
    //sendto("175", finalcountdown.toString());
    e.preventDefault();
	nowx = centerX;
    nowy = centerY;
		boxSet.setAttribute('style', 'left: ' + (parseInt(nowx)-succorW).toString() + 'px; top: ' + (parseInt(nowy)-succorW).toString() + 'px;');
}, false);

var boxMi = document.getElementById('three');

boxMi.addEventListener('touchstart', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
        //boxMi.setAttribute('style', 'background-color:#D1D62E;');
    e.preventDefault();
	var touch = e.touches[0];
	nowx = touch.pageX;
	nowy = touch.pageY;
		boxSet.setAttribute('style', 'left: ' + (parseInt(nowx)-succorW).toString() + 'px; top: ' + (parseInt(nowy)-succorW).toString() + 'px;');
}, false);

boxMi.addEventListener('touchmove', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
    e.preventDefault();
	var touch = e.touches[0];
	nowx = touch.pageX;
	nowy = touch.pageY;
	processMove();
}, false);

boxMi.addEventListener('touchend', function (e) {
    //if (document.getElementById("already").value == "1")
        //boxMi.setAttribute('style', 'background-color:transparent;');
    //sendto("159", finalcountdown.toString());
    e.preventDefault();
	nowx = centerX;
    nowy = centerY;
		boxSet.setAttribute('style', 'left: ' + (parseInt(nowx)-succorW).toString() + 'px; top: ' + (parseInt(nowy)-succorW).toString() + 'px;');
}, false);

var boxRe = document.getElementById('two');

boxRe.addEventListener('touchstart', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
        //boxRe.setAttribute('style', 'background-color:#D5922E;');
    e.preventDefault();
	var touch = e.touches[0];
	nowx = touch.pageX;
	nowy = touch.pageY;
		boxSet.setAttribute('style', 'left: ' + (parseInt(nowx)-succorW).toString() + 'px; top: ' + (parseInt(nowy)-succorW).toString() + 'px;');
}, false);

boxRe.addEventListener('touchmove', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
    e.preventDefault();
	var touch = e.touches[0];
	nowx = touch.pageX;
	nowy = touch.pageY;
	processMove();
}, false);

boxRe.addEventListener('touchend', function (e) {
    //if (document.getElementById("already").value == "1")
        //boxRe.setAttribute('style', 'background-color:transparent;');
    //sendto("143", finalcountdown.toString());
    e.preventDefault();
	nowx = centerX;
    nowy = centerY;
		boxSet.setAttribute('style', 'left: ' + (parseInt(nowx)-succorW).toString() + 'px; top: ' + (parseInt(nowy)-succorW).toString() + 'px;');
}, false);

var boxDo = document.getElementById('one');

boxDo.addEventListener('touchstart', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
        //boxDo.setAttribute('style', 'background-color:#BE2E2B;');
    e.preventDefault();
	var touch = e.touches[0];
	nowx = touch.pageX;
	nowy = touch.pageY;
		boxSet.setAttribute('style', 'left: ' + (parseInt(nowx)-succorW).toString() + 'px; top: ' + (parseInt(nowy)-succorW).toString() + 'px;');
}, false);

boxDo.addEventListener('touchmove', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
    e.preventDefault();
	var touch = e.touches[0];
	nowx = touch.pageX;
	nowy = touch.pageY;
	processMove();
}, false);

boxDo.addEventListener('touchend', function (e) {
    //if (document.getElementById("already").value == "1")
        //boxDo.setAttribute('style', 'background-color:transparent;');
    //sendto("127", finalcountdown.toString());
    e.preventDefault();
	nowx = centerX;
    nowy = centerY;
		boxSet.setAttribute('style', 'left: ' + (parseInt(nowx)-succorW).toString() + 'px; top: ' + (parseInt(nowy)-succorW).toString() + 'px;');
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

        getCenter();
		getSuccorW();
        getBoardary();
		
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
