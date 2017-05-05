var finalcountdown = 1;
var myssid = "";
var entry = 0;
var language = "";
var myip = "";
var arewescan = false;
var successSet = function (message) {
    if (document.getElementById("already").value == "0") {
        document.getElementById("already").value = "1";
    }
    if (language == "zh-TW")
        navigator.notification.alert("網路初步成功" + message, alertDismissed, '', '確定');
    else if (language == "zh-CN")
        navigator.notification.alert("网路初步成功" + message, alertDismissed, '', '确定');
    else
        navigator.notification.alert("Network seems ready." + message, alertDismissed, '', 'OK');
}

var successFor = function (message) {
    /*
    if (document.getElementById("already").value == "0") {
        document.getElementById("already").value = "1";
    }
     */
    hello.listenForPackets(successListen, failureListen);
    hello.sendMessage("WHO", successScan, failureScan);
    if (language == "zh-TW")
        console.log("網路初步成功" + message);
    else if (language == "zh-CN")
        console.log("网路初步成功" + message);
    else
        console.log("Network seems ready." + message);
}

var successScan = function (message) {
    if (language == "zh-TW")
        console.log("傳送掃描請求" + message);
    else if (language == "zh-CN")
        console.log("传送扫描请求" + message);
    else
        console.log("Send scan request." + message);
}

var successListen = function (message) {
    if (message == "bell")
    {
        app.receivedEvent('deviceready');
        if (document.getElementById("already").value == "0") {
            document.getElementById("already").value = "1";
        }
        //hello.initialize(myip + entry, 8888, successInternal, failureSet);
    }
    else if (entry < 254)
    {
        entry = entry + 1;
        if (language == "zh-TW")
            $("#note").text("掃描 " + entry);
        else if (language == "zh-CN")
            $("#note").text("扫描 " + entry);
        else
            $("#note").text("Scan " + entry);
        hello.initialize(myip + entry, 8888, successFor, failureSet);
    }
    else {
        app.receivedEvent('deviceready');
        if (language == "zh-TW")
            navigator.notification.alert("掃描IP失敗" + message, alertDismissed, '', '確定');
        else if (language == "zh-CN")
            navigator.notification.alert("扫描IP失败" + message, alertDismissed, '', '确定');
        else
            navigator.notification.alert("Scan network failed." + message, alertDismissed, '', 'OK');
    }
}

var failureScan = function (message) {
    if (language == "zh-TW")
        navigator.notification.alert("傳送掃描失敗" + message, alertDismissed, '', '確定');
    else if (language == "zh-CN")
        navigator.notification.alert("传送扫描失败" + message, alertDismissed, '', '确定');
    else
        navigator.notification.alert("Send scan failed." + message, alertDismissed, '', 'OK');
}

var failureListen = function (message) {
    if (entry < 254)
    {
        entry = entry + 1;
        if (language == "zh-TW")
            $("#note").text("掃描 " + entry);
        else if (language == "zh-CN")
            $("#note").text("扫描 " + entry);
        else
            $("#note").text("Scan " + entry);
        hello.initialize(myip + entry, 8888, successFor, failureSet);
    }
    else {
        app.receivedEvent('deviceready');
        if (language == "zh-TW")
            navigator.notification.alert("掃描IP失敗" + message, alertDismissed, '', '確定');
        else if (language == "zh-CN")
            navigator.notification.alert("扫描IP失败" + message, alertDismissed, '', '确定');
        else
            navigator.notification.alert("Scan network failed." + message, alertDismissed, '', 'OK');
    }
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

var successInit = function (message) {
    myssid = message;
    if (strcmp(myssid, "bellclass_"))
    {
        hello.initialize("192.168.4.1", 8888, successInternal, failureSet);
    }
    else if (document.getElementById("already").value == "0")
    {
        id3();
    }
}

function id3()
{
    networkinterface.getIPAddress(
        function (ip) {
            myip = ip.substring(0, ip.lastIndexOf(".") + 1);
            if (strcmp(myssid, "bellclass") == true) {
                //app.scanEvent('deviceready');
                entry = 255;
                hello.initialize(myip + entry, 8888, successSet, failureSet);
            }
            else {
                if (language == "zh-TW")
				    navigator.notification.alert("沒連上廣場的wifi bellclass", alertDismissed, '', '確定');
                else if (language == "zh-CN")
                    navigator.notification.alert("没连上广场的wifi bellclass", alertDismissed, '', '確定');
                else
                    navigator.notification.alert("Not connected to wifi bellclass in this square?", alertDismissed, '', '確定');
            }
        }
    );
}

var successOpen = function (message) {
    myssid = message;
    if (strcmp(myssid, "bellclass_"))
    {
        cordova.InAppBrowser.open('http://192.168.4.1', '_blank', 'location=yes');
    }
    else if (arewescan == false){
        id3();
    }
}

var failureSet = function (err) {
    document.getElementById("already").value = "0";
    if (language == "zh-TW")
        navigator.notification.alert("網路設定失敗" + err, alertDismissed, '', '確定');
    else if (language == "zh-CN")
        navigator.notification.alert("网路设定失败" + err, alertDismissed, '', '确定');
    else
        navigator.notification.alert("Network fails." + err, alertDismissed, '', 'OK');
}

var failureSSID = function (err) {
    document.getElementById("already").value = "0";
    if (language == "zh-TW")
        navigator.notification.alert("抓取網路名稱失敗" + err, alertDismissed, '', '確定');
    else if (language == "zh-CN")
        navigator.notification.alert("抓取网路名称失败" + err, alertDismissed, '', '确定');
    else
        navigator.notification.alert("Get Wifi SSID fails." + err, alertDismissed, '', 'OK');
}

var boxRec = document.getElementById('REC');

boxRec.addEventListener('touchstart', function (e) {
    //var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
    //startx = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
    if (document.getElementById("record").value == "0") {
        readyet();
        if (document.getElementById("already").value == "1")
        {
            boxRec.setAttribute('style', 'background: url(img/2-iphone-layout_iphone.png);');
            sendto("R", finalcountdown.toString());
            document.getElementById("record").value = "1";
            finalcountdown = 478;
        }
    }
    else {
        finalboxRec();
    }
    e.preventDefault();
}, false);

var finalboxRec = function () {
    document.getElementById("record").value = "0";
    boxRec.setAttribute('style', 'background: none;');
    //readyet();
    sendto("Q", finalcountdown.toString());
    $('#runner').runner('reset', true);
}

var boxDoo = document.getElementById('DOO');

boxDoo.addEventListener('touchstart', function (e) {
    readyet();
    if (document.getElementById("already").value == "1")
        boxDoo.setAttribute('style', 'background-color:#B6221E;');
    e.preventDefault();
}, false);

boxDoo.addEventListener('touchend', function (e) {
    if (document.getElementById("already").value == "1")
        boxDoo.setAttribute('style', 'background-color:transparent;');
    sendto("239", finalcountdown.toString());
    e.preventDefault();
}, false);

var boxTi = document.getElementById('TI');

boxTi.addEventListener('touchstart', function (e) {
    readyet();
    if (document.getElementById("already").value == "1")
        boxTi.setAttribute('style', 'background-color:#CA27D3;');
    e.preventDefault();
}, false);

boxTi.addEventListener('touchend', function (e) {
    if (document.getElementById("already").value == "1")
        boxTi.setAttribute('style', 'background-color:transparent;');
    sendto("223", finalcountdown.toString());
    e.preventDefault();
}, false);

var boxLa = document.getElementById('LA');

boxLa.addEventListener('touchstart', function (e) {
    readyet();
    if (document.getElementById("already").value == "1")
        boxLa.setAttribute('style', 'background-color:#233AB9;');
    e.preventDefault();
}, false);

boxLa.addEventListener('touchend', function (e) {
    if (document.getElementById("already").value == "1")
        boxLa.setAttribute('style', 'background-color:transparent;');
    sendto("207", finalcountdown.toString());
    e.preventDefault();
}, false);

var boxSo = document.getElementById('SO');

boxSo.addEventListener('touchstart', function (e) {
    readyet();
    if (document.getElementById("already").value == "1")
        boxSo.setAttribute('style', 'background-color:#2CC8C7;');
    e.preventDefault();
}, false);

boxSo.addEventListener('touchend', function (e) {
    if (document.getElementById("already").value == "1")
        boxSo.setAttribute('style', 'background-color:transparent;');
    sendto("191", finalcountdown.toString());
    e.preventDefault();
}, false);

var boxFa = document.getElementById('FA');

boxFa.addEventListener('touchstart', function (e) {
    readyet();
    if (document.getElementById("already").value == "1")
        boxFa.setAttribute('style', 'background-color:#3CD12F;');
    e.preventDefault();
}, false);

boxFa.addEventListener('touchend', function (e) {
    if (document.getElementById("already").value == "1")
        boxFa.setAttribute('style', 'background-color:transparent;');
    sendto("175", finalcountdown.toString());
    e.preventDefault();
}, false);

var boxMi = document.getElementById('MI');

boxMi.addEventListener('touchstart', function (e) {
    readyet();
    if (document.getElementById("already").value == "1")
        boxMi.setAttribute('style', 'background-color:#D1D62E;');
    e.preventDefault();
}, false);

boxMi.addEventListener('touchend', function (e) {
    if (document.getElementById("already").value == "1")
        boxMi.setAttribute('style', 'background-color:transparent;');
    sendto("159", finalcountdown.toString());
    e.preventDefault();
}, false);

var boxRe = document.getElementById('RE');

boxRe.addEventListener('touchstart', function (e) {
    readyet();
    if (document.getElementById("already").value == "1")
        boxRe.setAttribute('style', 'background-color:#D5922E;');
    e.preventDefault();
}, false);

boxRe.addEventListener('touchend', function (e) {
    if (document.getElementById("already").value == "1")
        boxRe.setAttribute('style', 'background-color:transparent;');
    sendto("143", finalcountdown.toString());
    e.preventDefault();
}, false);

var boxDo = document.getElementById('DO');

boxDo.addEventListener('touchstart', function (e) {
    readyet();
    if (document.getElementById("already").value == "1")
        boxDo.setAttribute('style', 'background-color:#BE2E2B;');
    e.preventDefault();
}, false);

boxDo.addEventListener('touchend', function (e) {
    if (document.getElementById("already").value == "1")
        boxDo.setAttribute('style', 'background-color:transparent;');
    sendto("127", finalcountdown.toString());
    e.preventDefault();
}, false);

var boxSet = document.getElementById('SET');

boxSet.addEventListener('touchstart', function (e) {
    if (document.getElementById("record").value == "1")
        finalboxRec();
    WifiWizard.getCurrentSSID(successOpen, failureSSID);
    e.preventDefault();
}, false);

// example of a callback method
var successCountdown = function (result) {
    if (result.type === 'sleep') {
        finalboxRec();
        if (language == "zh-TW")
            navigator.notification.alert("不好意思板子的記憶體有限", alertDismissed, '', '確定');
        else if (language == "zh-CN")
            navigator.notification.alert("不好意思板子的记忆模块有限", alertDismissed, '', '确定');
        else
            navigator.notification.alert("We are sorry that memory size is limited.", alertDismissed, '', 'OK');
    } else if (result.type === 'countdown') {
        console.log('time until sleep: ' + result.timeLeft + ' seconds');
    } else {
        console.log('unhandled type (' + result.type + ')');
    }
};

// example of a callback method
var errorCountdown = function (error) {
    if (language == "zh-TW")
        navigator.notification.alert(error, alertDismissed, '', '確定');
    else if (language == "zh-CN")
        navigator.notification.alert(error, alertDismissed, '', '确定');
    else
        navigator.notification.alert(error, alertDismissed, '', 'OK');
};

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
        if (ratio > 1.55 && window.location.href.indexOf("index") > 0)
            window.location.assign("second.html");
        else
            WifiWizard.getCurrentSSID(successInit, failureSSID);

        var addevt = $('#runner').runner();
        addevt.on('runnerStop', function (eventObject, info) {
            var noway = $('#runner').runner('lap');
            var iflarge8 = parseFloat(noway);
            iflarge8 = iflarge8.toFixed(1);
            while (iflarge8 > 8.0) {
                mycountdown("121");
                iflarge8 = iflarge8 - 8;
            }
            noway = iflarge8.toString();
            var pointpos = noway.indexOf(".");
            if (pointpos > -1) {
                var first = parseInt(noway.substring(0, pointpos)) << 4;
                var second = parseInt(noway.substring(pointpos + 1, pointpos + 2)) + first;
                mycountdown(second.toString());
            }
            if (finalcountdown <= 0) {
                finalcountdown = 1;
                window.sleeptimer.sleep(
                    successCountdown,
                    errorCountdown,
                    {
                        'sleep': 1, // sleep in 5 minutes/300 seconds
                        'countdown': false // if true, send time-to-sleep countdown from native to javascript
                    }
                );
            }
        });

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
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:none;');
        arewescan = false;
        console.log('Received Event: ' + id);
    },

    scanEvent: function (id) {
        var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        arewescan = true;
        console.log('Received Event: ' + id);
    }

};

var successNote = function (message) {
    console.log("傳送音符成功" + message);
}

var failureNote = function (err) {
    if (language == "zh-TW")
        navigator.notification.alert("傳送音符失敗" + err, alertDismissed, '', '確定');
    else if (language == "zh-CN")
        navigator.notification.alert("传送音符失败" + err, alertDismissed, '', '确定');
    else
        navigator.notification.alert("Melody plays unsuccessfully." + err, alertDismissed, '', 'OK');
}

var successMidi = function (message) {
    console.log("播放音樂成功" + message);
}

var failureMidi = function (err) {
    if (language == "zh-TW")
        navigator.notification.alert("音樂正在播出" + err, alertDismissed, '', '確定');
    else if (language == "zh-CN")
        navigator.notification.alert("音乐正在播出" + err, alertDismissed, '', '确定');
    else
        navigator.notification.alert("Midi is playing now." + err, alertDismissed, '', 'OK');
}

function sendto(mystr, mynote) {
    /*
    if ( theip.charAt(theip.length-1) == "." )
        document.getElementById("already").value = "0";
    else
    */
    if (document.getElementById("already").value == "1") {
        hello.playmidi(mystr, successMidi, failureMidi); 
        //mycountdown(mystr);
        if (document.getElementById("record").value == "1")
            $('#runner').runner('start');
    }
}

function mycountdown(mystr) {
    hello.sendMessage(mystr, successNote, failureNote);
    finalcountdown = finalcountdown - 1;
}

function readyet(mystr) {
    if (document.getElementById("already").value == "0")
    {
        if (language == "zh-TW")
            navigator.notification.alert("沒連上廣場的wifi bellclass", alertDismissed, '', '確定');
        else if (language == "zh-CN")
            navigator.notification.alert("没连上广场的wifi bellclass", alertDismissed, '', '確定');
        else
            navigator.notification.alert("Not connected to wifi bellclass in this square?", alertDismissed, '', '確定');
    }
    else if (document.getElementById("record").value == "1") {
        $('#runner').runner('reset', true);
    }
}

function strcmp(a, b) {
    return a.indexOf(b) >= 0;
}

function alertDismissed() {
    // do something
}

function onPrompt(results) {
    if (results.buttonIndex == 1) {
        entry = parseInt(results.input1);
        if (entry != NaN && entry < 255) {
            hello.initialize(myip + entry, 8888, successSet, failureSet);
        }
    }
}

app.initialize();