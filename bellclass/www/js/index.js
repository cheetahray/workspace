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
		var entry = "";

		var successid = function(message) {
			myssid = message;
	        console.log("網路抓取成功" + message);
	    }

		var success = function(message) {
			document.getElementById("already").value = "1";
			alert("網路設定成功" + message);
		}

		var failure = function(err) {
	        alert("網路設定失敗" + err);
	    }

		WifiWizard.getCurrentSSID(successid, failure);

		if(myssid == "bellclass")
		{
			hello.initialize("192.168.4.1", 8888, success, failure);
		}
        else
		{
			networkinterface.getIPAddress(
				function (ip) {
					myssid = ip.substring( 0, ip.lastIndexOf(".") + 1 );
				});
		}
		
		var boxRec = document.getElementById('REC');
        
		boxRec.addEventListener('touchstart', function(e){
			//var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
			//startx = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
			if (false == readyet())
			    ;
			else if  ( document.getElementById("play").value == "1" ) {
				boxRec.setAttribute('style', 'background: url(img/2-iphone-layout_iphone4.png);');
				sendto("R", myssid + entry);
				document.getElementById("play").value = "0";
			}
			else
			{
				boxRec.setAttribute('style', 'background: none;');
				sendto("Q", myssid + entry);
				document.getElementById("play").value = "1";
			}
			e.preventDefault();
		}, false);

		var boxDoo = document.getElementById('DOO');
    
		boxDoo.addEventListener('touchstart', function(e){
			sendto("239", myssid + entry);
			boxDoo.setAttribute('style', 'background-color:#BE2E2B;');
			e.preventDefault();
		}, false);
		
		boxDoo.addEventListener('touchend', function(e){
			boxDoo.setAttribute('style', 'background-color:transparent;');
			readyet();
			e.preventDefault();
		}, false);
		
		var boxTi = document.getElementById('TI');
    
		boxTi.addEventListener('touchstart', function(e){
			sendto("223", myssid + entry);
			boxTi.setAttribute('style', 'background-color:#D5922E;');
			e.preventDefault();
		}, false);
		
		boxTi.addEventListener('touchend', function(e){
			boxTi.setAttribute('style', 'background-color:transparent;');
			readyet();
			e.preventDefault();
		}, false);
		
		var boxLa = document.getElementById('LA');
    
		boxLa.addEventListener('touchstart', function(e){
			sendto("207", myssid + entry);
			boxLa.setAttribute('style', 'background-color:#D1D62E;');
			e.preventDefault();
		}, false);
		
		boxLa.addEventListener('touchend', function(e){
			boxLa.setAttribute('style', 'background-color:transparent;');
			readyet();
			e.preventDefault();
		}, false);
		
		var boxSo = document.getElementById('SO');
    
		boxSo.addEventListener('touchstart', function(e){
			sendto("191", myssid + entry);
			boxSo.setAttribute('style', 'background-color:#3CD12F;');
			e.preventDefault();
		}, false);
		
		boxSo.addEventListener('touchend', function(e){
			boxSo.setAttribute('style', 'background-color:transparent;');
			readyet();
			e.preventDefault();
		}, false);
		
		var boxFa = document.getElementById('FA');
    
		boxFa.addEventListener('touchstart', function(e){
			sendto("175", myssid + entry);
			boxFa.setAttribute('style', 'background-color:#2CC8C7;');
			e.preventDefault();
		}, false);
		
		boxFa.addEventListener('touchend', function(e){
			boxFa.setAttribute('style', 'background-color:transparent;');
			readyet();
			e.preventDefault();
		}, false);
		
		var boxMi = document.getElementById('MI');
    
		boxMi.addEventListener('touchstart', function(e){
			sendto("159", myssid + entry);
			boxMi.setAttribute('style', 'background-color:#233AB9;');
			e.preventDefault();
		}, false);
		
		boxMi.addEventListener('touchend', function(e){
			boxMi.setAttribute('style', 'background-color:transparent;');
			readyet();
			e.preventDefault();
		}, false);
		
		var boxRe = document.getElementById('RE');
    
		boxRe.addEventListener('touchstart', function(e){
			sendto("143", myssid + entry);
			boxRe.setAttribute('style', 'background-color:#CA27D3;');
			e.preventDefault();
		}, false);
		
		boxRe.addEventListener('touchend', function(e){
			boxRe.setAttribute('style', 'background-color:transparent;');
			readyet();
			e.preventDefault();
		}, false);
		
		var boxDo = document.getElementById('DO');
    
		boxDo.addEventListener('touchstart', function(e){
			sendto("127", myssid + entry);
			boxDo.setAttribute('style', 'background-color:#B6221E;');
			e.preventDefault();
		}, false);
		
		boxDo.addEventListener('touchend', function(e){
			boxDo.setAttribute('style', 'background-color:transparent;');
			readyet();
			e.preventDefault();
		}, false);
		
		var boxSet = document.getElementById('SET');
    
		boxSet.addEventListener('touchstart', function(e){
			entry = parseInt( prompt('電路板上面貼的標籤寫幾號','') );
			if (entry != NaN && entry < 255)
			{
				hello.initialize(myssid + entry, 8888, success, failure);
            }
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
        receivedElement.setAttribute('style', 'display:none;');

        console.log('Received Event: ' + id);
    }
	
};

var success2 = function(message) {
    console.log("傳送音符成功" + message);
}
	
var failure2 = function(err) {
	alert("傳送音符失敗" + err);
}

function sendto(mystr, theip)
{
	if ( theip.charAt(theip.length-1) == "." )
	{
		document.getElementById("already").value = "0";
	}
	else
	{
		hello.sendMessage(mystr, success2, failure2);
	}
}

function readyet()
{
	if (document.getElementById("already").value == "0") {
		alert("您尚未設置電路板上之標籤號\n請按右上設定");
		return false;
	}
	return true;
}

app.initialize();
