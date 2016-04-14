var finalcountdown = 1;
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
        
		var success = function(message) {
		    if ( document.getElementById("already").value == "0" )
		    {
			    document.getElementById("already").value = "1";
			    var addevt = $('#runner').runner();
                addevt.on('runnerStop', function(eventObject, info) {
                    if (document.getElementById("record").value == "1")
                    {
                        var noway = $('#runner').runner('lap') ;
	                    var iflarge8 = parseFloat( noway );
	                    while (iflarge8 > 8.0)
	                    {
	                        mycountdown("121");
	                        iflarge8 = iflarge8 - 8;
	                    }
	                    noway = iflarge8.toString();
	                    var pointpos = noway.indexOf(".");
	                    if (pointpos > -1)
	                    {
	                        var first = parseInt( noway.substring(0, pointpos) ) << 4;
	                        var second = parseInt( noway.substring(pointpos + 1, pointpos + 2 ) ) + first;
	                        mycountdown( second.toString() );
	                    }
	                    
                        if ( finalcountdown <= 0 )
	                    {
	                        finalcountdown = 1;
	                        window.sleeptimer.sleep(
                                successCallback,
                                errorCallback,
                                {
                                    'sleep' : 1, // sleep in 5 minutes/300 seconds
								    'countdown' : false // if true, send time-to-sleep countdown from native to javascript
							    }
							);
	                    }
	                }
                });
            }
            notification.alert("網路初步成功" + message, alertCallback, "");
		}

		var successid = function(message) {
			myssid = message;
			if(strncmp(myssid,"bellclass_",10))
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
		}

		var failure = function(err) {
			document.getElementById("already").value = "0";
			notification.alert("網路設定失敗" + err, alertCallback, "");
	    }

		WifiWizard.getCurrentSSID(successid, failure);
        
		var boxRec = document.getElementById('REC');
        
		boxRec.addEventListener('touchstart', function(e){
			//var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
			//startx = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
			if (document.getElementById("already").value == "0")
			    readyet();
			else if  ( document.getElementById("record").value == "0" ) 
			{
				boxRec.setAttribute('style', 'background: url(img/2-iphone-layout_iphone.png);');
				sendto("R", "開錄了", myssid + entry);
				document.getElementById("record").value = "1";
				finalcountdown = 510;
			}
			else
			{
			    finalboxRec();    
			}
			e.preventDefault();
		}, false);

        var finalboxRec = function() {
            document.getElementById("record").value = "0";
		    boxRec.setAttribute('style', 'background: none;');
			sendto("Q", "錄完了", myssid + entry);
			$('#runner').runner('reset', true);
        }
        
		var boxDoo = document.getElementById('DOO');
    
		boxDoo.addEventListener('touchstart', function(e){
		    readyet();
			if(document.getElementById("already").value == "1")
			    boxDoo.setAttribute('style', 'background-color:#B6221E;');
			e.preventDefault();
		}, false);
		
		boxDoo.addEventListener('touchend', function(e){
		    if(document.getElementById("already").value == "1")
			    boxDoo.setAttribute('style', 'background-color:transparent;');
			sendto("239", "DO", myssid + entry);
		    e.preventDefault();
		}, false);
		
		var boxTi = document.getElementById('TI');
    
		boxTi.addEventListener('touchstart', function(e){
			readyet();
			if(document.getElementById("already").value == "1")
			    boxTi.setAttribute('style', 'background-color:#CA27D3;');
			e.preventDefault();
		}, false);
		
		boxTi.addEventListener('touchend', function(e){
			if(document.getElementById("already").value == "1")
			    boxTi.setAttribute('style', 'background-color:transparent;');
			sendto("223", "Ti" , myssid + entry);
			e.preventDefault();
		}, false);
		
		var boxLa = document.getElementById('LA');
    
		boxLa.addEventListener('touchstart', function(e){
			readyet();
			if(document.getElementById("already").value == "1")
			    boxLa.setAttribute('style', 'background-color:#233AB9;');
			e.preventDefault();
		}, false);
		
		boxLa.addEventListener('touchend', function(e){
			if(document.getElementById("already").value == "1")
			    boxLa.setAttribute('style', 'background-color:transparent;');
			sendto("207", "La", myssid + entry);
			e.preventDefault();
		}, false);
		
		var boxSo = document.getElementById('SO');
    
		boxSo.addEventListener('touchstart', function(e){
			readyet();
			if(document.getElementById("already").value == "1")
			    boxSo.setAttribute('style', 'background-color:#2CC8C7;');
			e.preventDefault();
		}, false);
		
		boxSo.addEventListener('touchend', function(e){
			if(document.getElementById("already").value == "1")
			    boxSo.setAttribute('style', 'background-color:transparent;');
			sendto("191", "So", myssid + entry);
			e.preventDefault();
		}, false);
		
		var boxFa = document.getElementById('FA');
    
		boxFa.addEventListener('touchstart', function(e){
			readyet();
			if(document.getElementById("already").value == "1")
			    boxFa.setAttribute('style', 'background-color:#3CD12F;');
			e.preventDefault();
		}, false);
		
		boxFa.addEventListener('touchend', function(e){
			if(document.getElementById("already").value == "1")
			    boxFa.setAttribute('style', 'background-color:transparent;');
			sendto("175", "Fa", myssid + entry);
			e.preventDefault();
		}, false);
		
		var boxMi = document.getElementById('MI');
    
		boxMi.addEventListener('touchstart', function(e){
			readyet();
			if(document.getElementById("already").value == "1")
			    boxMi.setAttribute('style', 'background-color:#D1D62E;');
			e.preventDefault();
		}, false);
		
		boxMi.addEventListener('touchend', function(e){
			if(document.getElementById("already").value == "1")
			    boxMi.setAttribute('style', 'background-color:transparent;');
			sendto("159", "Mi", myssid + entry);
			e.preventDefault();
		}, false);
		
		var boxRe = document.getElementById('RE');
    
		boxRe.addEventListener('touchstart', function(e){
			readyet();
			if(document.getElementById("already").value == "1")
			    boxRe.setAttribute('style', 'background-color:#D5922E;');
			e.preventDefault();
		}, false);
		
		boxRe.addEventListener('touchend', function(e){
			if(document.getElementById("already").value == "1")
			    boxRe.setAttribute('style', 'background-color:transparent;');
			sendto("143", "Re", myssid + entry);
			e.preventDefault();
		}, false);
		
		var boxDo = document.getElementById('DO');
    
		boxDo.addEventListener('touchstart', function(e){
			readyet();
			if(document.getElementById("already").value == "1")
			    boxDo.setAttribute('style', 'background-color:#BE2E2B;');
			e.preventDefault();
		}, false);
		
		boxDo.addEventListener('touchend', function(e){
			if(document.getElementById("already").value == "1")
			    boxDo.setAttribute('style', 'background-color:transparent;');
			sendto("127", "Do", myssid + entry);
			e.preventDefault();
		}, false);
		
		var boxSet = document.getElementById('SET');
    
		boxSet.addEventListener('touchstart', function(e){
			if(strncmp(myssid,"bellclass_",10) == false)
    		{
			    entry = parseInt( notification.prompt('電路板上面貼的標籤寫幾號', promptCallback, "") );
			    if (entry != NaN && entry < 255)
			    {
				    hello.initialize(myssid + entry, 8888, success, failure);
                }
            }
            else
                notification.alert("您已經是在家用模式，想設定請改外部 Wifi", alertCallback, "");
			e.preventDefault();
		}, false);
		
		// example of a callback method
		var successCallback = function(result) {
		  if (result.type==='sleep') {
		    finalboxRec();
			notification.alert("歐 板子的記憶體有限", alertCallback, "");
		  } else if (result.type==='countdown') {
		    console.log('time until sleep: ' + result.timeLeft + ' seconds');
		  } else {
		    console.log('unhandled type (' + result.type + ')');
		  }
		}; 
		
		// example of a callback method
		var errorCallback = function(error) {
		  notification.alert(error, alertCallback, "");
		}; 

		anyscreen([''],function() { //(['./css/index.css'],function() {

		});

        window.screen.lockOrientation('landscape');
	
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

var success2 = function(message) {
    console.log("傳送音符成功" + message);
}
	
var failure2 = function(err) {
	notification.alert("傳送音符失敗" + err, alertCallback, "");
}

function sendto(mystr, mynote, theip)
{
	//if ( theip.charAt(theip.length-1) == "." )
		//document.getElementById("already").value = "0";
	//else 
	if (document.getElementById("already").value == "1")
	{
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

function readyet()
{
    if (document.getElementById("already").value == "0")
	    notification.alert("您尚未設置電路板上之標籤號\n請按右上設定", alertCallback, "");
	else if (document.getElementById("record").value == "1")
	{    
	    $('#runner').runner('reset', true);
    }
}

function strncmp(a, b, n){
    return a.substring(0, n) == b.substring(0, n);
}

function alertDismissed() {
    // do something
}

function onPrompt(results) {
    //alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
}

app.initialize();