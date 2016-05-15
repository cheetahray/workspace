var language = "";

var boxRec = document.getElementById('REC');

boxRec.addEventListener('touchstart', function (e) {
    if (window.location.href.indexOf("index3") > 0)
        window.location.assign("index.html");
    else if (window.location.href.indexOf("second3") > 0)
        window.location.assign("second.html");
    else if (window.location.href.indexOf("second.") > 0)
        window.location.assign("second3.html");
    else if (window.location.href.indexOf("index.") > 0)
        window.location.assign("index3.html");
    else if (window.location.href.indexOf("second5") > 0)
        window.location.assign("second7.html");
    else if (window.location.href.indexOf("index5") > 0)
        window.location.assign("index7.html");
    else if (window.location.href.indexOf("second7") > 0)
        window.location.assign("second5.html");
    else if (window.location.href.indexOf("index7") > 0)
        window.location.assign("index5.html");
    e.preventDefault();
}, false);

var boxSet = document.getElementById('SET');

boxSet.addEventListener('touchstart', function (e) {
    if (window.location.href.indexOf("index2") > 0)
        window.location.assign("index.html");
    else if (window.location.href.indexOf("second2") > 0)
        window.location.assign("second.html");
    else if (window.location.href.indexOf("second.") > 0)
        window.location.assign("second2.html");
    else if (window.location.href.indexOf("index.") > 0)
        window.location.assign("index2.html");
    else if (window.location.href.indexOf("second3") > 0)
        window.location.assign("second5.html");
    else if (window.location.href.indexOf("index3") > 0)
        window.location.assign("index5.html");
    else if (window.location.href.indexOf("second5") > 0)
        window.location.assign("second3.html");
    else if (window.location.href.indexOf("index5") > 0)
        window.location.assign("index3.html");
    else if (window.location.href.indexOf("second6") > 0)
        window.location.assign("second5.html");
    else if (window.location.href.indexOf("index6") > 0)
        window.location.assign("index5.html");
    else if (window.location.href.indexOf("second7") > 0)
        window.location.assign("second5.html");
    else if (window.location.href.indexOf("index7") > 0)
        window.location.assign("index5.html");
    e.preventDefault();
}, false);

var boxQR = document.getElementById('QR');

boxQR.addEventListener('touchstart', function (e) {
    if (window.location.href.indexOf("index5") > 0)
        window.location.assign("index6.html");
    else if (window.location.href.indexOf("second5") > 0)
        window.location.assign("second6.html");
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
        if (ratio > 1.55 && window.location.href.indexOf("index.") > 0)
            window.location.assign("second.html");

        anyscreen([''], function () { //(['./css/index.css'],function() {

        });

        window.screen.lockOrientation('portrait');

        if (window.location.href.indexOf("6.html") > 0) {

            $(".qrcode").qrcode({
                "size": 500,
                "text": "http://larsjung.de/qrcode"
            });

            var colors = ['#fc0', '#6c0', '#60f', '#f00']; //設定顏色(不限數量)，最後一個顏色須跟上面style裡的相同
            var step = 0;
            window.setInterval(function () {
                $(".color-box").css('background-color', colors[step]);
                if (step == colors.length - 1)
                    step = 0;
                else
                    step += 1;
            }, 500); //設定間隔時間
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
        console.log('Received Event: ' + id);
    },

    scanEvent: function (id) {
        var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
    }

};

app.initialize();