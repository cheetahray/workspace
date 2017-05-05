var nowid = "";
var count = 0;
var myVar;

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

function alertDismissed() {
    // do something
}

// example of a callback method
var successCallback = function(result) {
    if (result.type==='sleep') {
        logger('do something like stop audio playback');
    } else if (result.type==='countdown') {
        logger('time until sleep: ' + result.timeLeft + ' seconds');
    } else {
        logger('unhandled type (' + result.type + ')');
    }
};

// example of a callback method
var errorCallback = function (error) {
    navigator.notification.alert(error, alertDismissed, '', '確定');
};

app.initialize();
