var finalcountdown = 1;
var myssid = "";
var entry = "";

var success = function (message) {
    if (document.getElementById("already").value == "0") {
        document.getElementById("already").value = "1";
    }
    navigator.notification.alert("網路初步成功" + message, alertDismissed, '', '確定');
}

var successid = function (message) {
    myssid = message;
    if (strcmp(myssid, "bellclass_")) {
        hello.initialize("192.168.4.1", 8888, success, failure);
    }
    else {
        networkinterface.getIPAddress(
            function (ip) {
                myssid = ip.substring(0, ip.lastIndexOf(".") + 1);
            }
        );
        navigator.notification.prompt('電路板上面貼的標籤寫幾號', onPrompt, '', ['確定', '取消'], '');
    }
}

var failure = function (err) {
    document.getElementById("already").value = "0";
    navigator.notification.alert("網路設定失敗" + err, alertDismissed, '', '確定');
}

var boxRec = document.getElementById('REC');

boxRec.addEventListener('touchstart', function (e) {
    //var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
    //startx = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
    if (document.getElementById("already").value == "0")
        readyet();
    else if (document.getElementById("record").value == "0") {
        boxRec.setAttribute('style', 'background: url(img/2-iphone-layout_iphone.png);');
        sendto("R", finalcountdown.toString(), myssid + entry);
        document.getElementById("record").value = "1";
        finalcountdown = 510;
    }
    else {
        finalboxRec();
    }
    e.preventDefault();
}, false);

var finalboxRec = function () {
    document.getElementById("record").value = "0";
    boxRec.setAttribute('style', 'background: none;');
    sendto("Q", finalcountdown.toString(), myssid + entry);
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
    sendto("239", finalcountdown.toString(), myssid + entry);
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
    sendto("223", finalcountdown.toString(), myssid + entry);
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
    sendto("207", finalcountdown.toString(), myssid + entry);
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
    sendto("191", finalcountdown.toString(), myssid + entry);
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
    sendto("175", finalcountdown.toString(), myssid + entry);
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
    sendto("159", finalcountdown.toString(), myssid + entry);
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
    sendto("143", finalcountdown.toString(), myssid + entry);
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
    sendto("127", finalcountdown.toString(), myssid + entry);
    e.preventDefault();
}, false);

var boxSet = document.getElementById('SET');

boxSet.addEventListener('touchstart', function (e) {
    if (document.getElementById("record").value == "1")
        finalboxRec();
    WifiWizard.getCurrentSSID(successid, failure);
    e.preventDefault();
}, false);

// example of a callback method
var successCallback = function (result) {
    if (result.type === 'sleep') {
        finalboxRec();
        navigator.notification.alert("不好意思板子的記憶體有限", alertDismissed, '', '確定');
    } else if (result.type === 'countdown') {
        console.log('time until sleep: ' + result.timeLeft + ' seconds');
    } else {
        console.log('unhandled type (' + result.type + ')');
    }
};

// example of a callback method
var errorCallback = function (error) {
    navigator.notification.alert(error, alertDismissed, '', '確定');
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

        var addevt = $('#runner').runner();
        addevt.on('runnerStop', function (eventObject, info) {
            if (document.getElementById("record").value == "1") {
                var noway = $('#runner').runner('lap');
                var iflarge8 = parseFloat(noway);
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
                        successCallback,
                        errorCallback,
                        {
                            'sleep': 1, // sleep in 5 minutes/300 seconds
                            'countdown': false // if true, send time-to-sleep countdown from native to javascript
                        }
                    );
                }
            }
        });

        //document.addEventListener("offline", onOffline, false);
        //document.addEventListener("online", onOnline, false);
        keepscreenon.enable();

        anyscreen([''], function () { //(['./css/index.css'],function() {

        });

        window.screen.lockOrientation('landscape');

        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:none;');

        console.log('Received Event: ' + id);
    }

};

var success2 = function (message) {
    console.log("傳送音符成功" + message);
}

var failure2 = function (err) {
    navigator.notification.alert("傳送音符失敗" + err, alertDismissed, '', '確定');
}

function sendto(mystr, mynote, theip) {
    //if ( theip.charAt(theip.length-1) == "." )
    //document.getElementById("already").value = "0";
    //else
    if (document.getElementById("already").value == "1") {
        mycountdown(mystr);
        if (document.getElementById("record").value == "1")
            $('#runner').runner('start');
    }
    $("#note").text(mynote);
}

function mycountdown(mystr) {
    hello.sendMessage(mystr, success2, failure2);
    finalcountdown = finalcountdown - 1;
}

function readyet() {
    if (document.getElementById("already").value == "0")
        navigator.notification.alert("您尚未設置電路板上之標籤號\n請按右上設定", alertDismissed, '', '確定');
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
            hello.initialize(myssid + entry, 8888, success, failure);
        }
    }
    //alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
}

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]);
}

function onOffline() {
    document.getElementById("already").value = "0";
}

function onOnline() {
    document.getElementById("already").value = "0";
}

app.initialize();