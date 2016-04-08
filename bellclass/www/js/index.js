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
        var success = function(message) {
	        console.log(message);
	    }
	
	    var failure = function(err) {
	        console.log(err);
	    }

        hello.initialize("192.168.11.40", 12345, success, failure);
		
		var box1 = document.getElementById('DO');
    
		box1.addEventListener('touchstart', function(e){
			//var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
			//startx = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
			hello.sendMessage("DO", success2, failure2);
			box1.setAttribute('style', 'background-color:#B6221E;');
			e.preventDefault();
		}, false);
		
		box1.addEventListener('touchend', function(e){
			//var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
			//startx = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
			box1.setAttribute('style', 'background-color:transparent;');
			e.preventDefault();
		}, false);
		
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
        //hello.sendMessage("Fa", success2, failure2)
    }
	
};

var success2 = function(message) {
    console.log(message);
}
	
var failure2 = function(err) {
	console.log(err);
}
        
app.initialize();
