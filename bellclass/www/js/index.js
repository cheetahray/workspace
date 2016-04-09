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
        var myssid = "";
		var success = function(message) {
			myssid = message;
	        console.log("網路設定成功" + message);
	    }
	
	    var failure = function(err) {
	        alert("網路設定失敗" + err);
	    }

		WifiWizard.getCurrentSSID(success, failure);

		if(myssid == "bellclass")
		{
			hello.initialize("192.168.4.1", 8888, success, failure);
		}
        else
		{

		}
		
		var boxRec = document.getElementById('REC');
        
		boxRec.addEventListener('touchstart', function(e){
			//var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
			//startx = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
			if  ( document.getElementById("play").value == "1" ) {
				boxRec.setAttribute('style', 'background: url(img/2-iphone-layout_iphone4.png);');
				hello.sendMessage("R", success2, failure2);
				document.getElementById("play").value = "0";
			}
			else
			{
				boxRec.setAttribute('style', 'background: none;');
				hello.sendMessage("Q", success2, failure2);
				document.getElementById("play").value = "1";
			}
			e.preventDefault();
		}, false);
		
        var boxDoo = document.getElementById('DOO');
    
		boxDoo.addEventListener('touchstart', function(e){
			//var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
			//startx = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
			hello.sendMessage("239", success2, failure2);
			boxDoo.setAttribute('style', 'background-color:#BE2E2B;');
			e.preventDefault();
		}, false);
		
		boxDoo.addEventListener('touchend', function(e){
			//var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
			//startx = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
			boxDoo.setAttribute('style', 'background-color:transparent;');
			e.preventDefault();
		}, false);
		
		var boxTi = document.getElementById('TI');
    
		boxTi.addEventListener('touchstart', function(e){
			//var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
			//startx = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
			hello.sendMessage("223", success2, failure2);
			boxTi.setAttribute('style', 'background-color:#D5922E;');
			e.preventDefault();
		}, false);
		
		boxTi.addEventListener('touchend', function(e){
			//var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
			//startx = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
			boxTi.setAttribute('style', 'background-color:transparent;');
			e.preventDefault();
		}, false);
		
		var boxLa = document.getElementById('LA');
    
		boxLa.addEventListener('touchstart', function(e){
			//var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
			//startx = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
			hello.sendMessage("207", success2, failure2);
			boxLa.setAttribute('style', 'background-color:#D1D62E;');
			e.preventDefault();
		}, false);
		
		boxLa.addEventListener('touchend', function(e){
			//var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
			//startx = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
			boxLa.setAttribute('style', 'background-color:transparent;');
			e.preventDefault();
		}, false);
		
		var boxSo = document.getElementById('SO');
    
		boxSo.addEventListener('touchstart', function(e){
			//var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
			//startx = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
			hello.sendMessage("191", success2, failure2);
			boxSo.setAttribute('style', 'background-color:#3CD12F;');
			e.preventDefault();
		}, false);
		
		boxSo.addEventListener('touchend', function(e){
			//var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
			//startx = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
			boxSo.setAttribute('style', 'background-color:transparent;');
			e.preventDefault();
		}, false);
		
		var boxFa = document.getElementById('FA');
    
		boxFa.addEventListener('touchstart', function(e){
			//var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
			//startx = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
			hello.sendMessage("175", success2, failure2);
			boxFa.setAttribute('style', 'background-color:#2CC8C7;');
			e.preventDefault();
		}, false);
		
		boxFa.addEventListener('touchend', function(e){
			//var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
			//startx = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
			boxFa.setAttribute('style', 'background-color:transparent;');
			e.preventDefault();
		}, false);
		
		var boxMi = document.getElementById('MI');
    
		boxMi.addEventListener('touchstart', function(e){
			//var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
			//startx = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
			hello.sendMessage("159", success2, failure2);
			boxMi.setAttribute('style', 'background-color:#233AB9;');
			e.preventDefault();
		}, false);
		
		boxMi.addEventListener('touchend', function(e){
			//var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
			//startx = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
			boxMi.setAttribute('style', 'background-color:transparent;');
			e.preventDefault();
		}, false);
		
		var boxRe = document.getElementById('RE');
    
		boxRe.addEventListener('touchstart', function(e){
			//var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
			//startx = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
			hello.sendMessage("143", success2, failure2);
			boxRe.setAttribute('style', 'background-color:#CA27D3;');
			e.preventDefault();
		}, false);
		
		boxRe.addEventListener('touchend', function(e){
			//var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
			//startx = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
			boxRe.setAttribute('style', 'background-color:transparent;');
			e.preventDefault();
		}, false);
		
		var boxDo = document.getElementById('DO');
    
		boxDo.addEventListener('touchstart', function(e){
			//var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
			//startx = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
			hello.sendMessage("127", success2, failure2);
			boxDo.setAttribute('style', 'background-color:#B6221E;');
			e.preventDefault();
		}, false);
		
		boxDo.addEventListener('touchend', function(e){
			//var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
			//startx = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
			boxDo.setAttribute('style', 'background-color:transparent;');
			e.preventDefault();
		}, false);
		
		var boxSet = document.getElementById('SET');
    
		boxSet.addEventListener('touchstart', function(e){
			//var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
			//startx = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
			entry=prompt('電路板上面貼的標籤寫幾號','');
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
    console.log("傳送音符成功" + message);
}
	
var failure2 = function(err) {
	alert("傳送音符失敗" + err);
}
        
app.initialize();
