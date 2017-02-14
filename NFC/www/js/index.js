language = "";
tagid = "";

function alertError() {
}

function alertDismissed() {
    
}

function parseINIString(data){
    var regex = {
        section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
        param: /^\s*([\w\.\-\_]+)\s*=\s*(.*?)\s*$/,
        comment: /^\s*;.*$/
    };
    var value = {};
    var lines = data.split(/\r\n|\r|\n/);
    var section = null;
    lines.forEach(function(line){
        if(regex.comment.test(line)){
            return;
        }else if(regex.param.test(line)){
            var match = line.match(regex.param);
            if(section){
                value[section][match[1]] = match[2];
            }else{
                value[match[1]] = match[2];
            }
        }else if(regex.section.test(line)){
            var match = line.match(regex.section);
            value[match[1]] = {};
            section = match[1];
        }else if(line.length == 0 && section){
            section = null;
        };
    });
    return value;
}

var app = {
/*
   Application constructor
*/

   initialize: function() {
      this.bindEvents();
      console.log("Starting NDEF Events app");
   },
/*
   bind any events that are required on startup to listeners:
*/
   bindEvents: function() {
      document.addEventListener('deviceready', this.onDeviceReady, false);
   },

/*
   this runs when the device is ready for user interaction:
*/
   onDeviceReady: function() {

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
      ratio = app.deviceHeight / app.deviceWidth;
      /*
	  if (ratio < 1.55 && window.location.href.indexOf("second") < 0)
         window.location.assign("second.html");
      else
      {
         if (ratio < 1.55)
         {
            leftbar = 270;
            rightbar = 1040;
            document.getElementById('APP').setAttribute('style', 'background: url(img/1440p.png);');
         }
         else
            document.getElementById('APP').setAttribute('style', 'background: url(img/1080p.png);');
         WifiWizard.getCurrentSSID(successInit, failureSSID);
      }
	  */
      anyscreen([''], function () { //(['./css/index.css'],function() {
              
              });
										 
      window.screen.lockOrientation('portrait');
    
      nfc.addTagDiscoveredListener(
         app.onNonNdef,           // tag successfully scanned
         function (status) {      // listener successfully initialized
            app.display("Listening for NFC tags.");
         },
         function (error) {       // listener fails to initialize
            app.display("NFC reader failed to initialize "
               + JSON.stringify(error));
         }
      );

      nfc.addNdefFormatableListener(
         app.onNonNdef,           // tag successfully scanned
         function (status) {      // listener successfully initialized
            app.display("Listening for NDEF Formatable tags.");
         },
         function (error) {       // listener fails to initialize
            app.display("NFC reader failed to initialize "
               + JSON.stringify(error));
         }
      );

      nfc.addNdefListener(
         app.onNfc,               // tag successfully scanned
         function (status) {      // listener successfully initialized
            app.display("Listening for NDEF messages.");
         },
         function (error) {       // listener fails to initialize
            app.display("NFC reader failed to initialize "
               + JSON.stringify(error));
         }
      );

      nfc.addMimeTypeListener(
         "text/plain",
         app.onNfc,               // tag successfully scanned
         function (status) {      // listener successfully initialized
            app.display("Listening for plain text MIME Types.");
         },
         function (error) {       // listener fails to initialize
            app.display("NFC reader failed to initialize "
               + JSON.stringify(error));
         }
      );

      app.display("Tap a tag to read data.");
      
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
   },
   /*
      appends @message to the message div:
   */
   display: function(message) {
      var label = document.createTextNode(message),
         lineBreak = document.createElement("br");
      messageDiv4.appendChild(lineBreak);         // add a line break
      messageDiv4.appendChild(label);             // add the text
   },
   /*
      appends @message to the message div:
   */
   display2: function(message) {
      var label = document.createTextNode(message), createA = document.createElement('a'), 
         lineBreak = document.createElement("br");
		createA.setAttribute('href', "next.html");
	  createA.appendChild(label);
	  messageDiv2.appendChild(createA);             // add the text 
   },
   /*
      appends @message to the message div:
   */
   display3: function(message) {
      var label = document.createTextNode(message), createA = document.createElement('a'),
         lineBreak = document.createElement("br");
    	createA.setAttribute('href', "next.html");
	  createA.appendChild(label);
	  messageDiv3.appendChild(createA);             // add the text
   },
   /*
      clears the message div:
   */
   clear: function() {
       messageDiv4.innerHTML = "";
   },
   /*
      clears the message div:
   */
   clear2: function() {
       messageDiv2.innerHTML = "";
   },
/*
      clears the message div:
   */
   clear3: function() {
       messageDiv3.innerHTML = "";
   },

   /*
      Process NDEF tag data from the nfcEvent
   */
   onNfc: function(nfcEvent) {
      app.clear();              // clear the message div
      // display the event type:
      app.display(" Event Type: " + nfcEvent.type);
      app.showTag(nfcEvent.tag);   // display the tag details
   },
   
   /*
      Process non-NDEF tag data from the nfcEvent
      This includes 
       * Non NDEF NFC Tags
       * NDEF Formatable Tags
       * Mifare Classic Tags on Nexus 4, Samsung S4 
       (because Broadcom doesn't support Mifare Classic)
   */
   onNonNdef: function(nfcEvent) {
      app.clear();              // clear the message div
      // display the event type:
      app.display("Event Type: " + nfcEvent.type);
      var tag = nfcEvent.tag;
      app.display("Tag ID: " + nfc.bytesToHexString(tag.id));
      app.display("Tech Types: ");
      for (var i = 0; i < tag.techTypes.length; i++) {
         app.display("  * " + tag.techTypes[i]);
      }
	  
   },

/*
   writes @tag to the message div:
*/

   showTag: function(tag) {
      // display the tag properties:
      tagid = nfc.bytesToHexString(tag.id);
      app.display("Tag ID: " + tagid);
      app.display("Tag Type: " +  tag.type);
      app.display("Max Size: " +  tag.maxSize + " bytes");
      app.display("Is Writable: " +  tag.isWritable);
      app.display("Can Make Read Only: " +  tag.canMakeReadOnly);
      
	  var raystr = "http://nfc.tagallover.com/NFC/checkajax.php?tagid=" + tagid;
      $.ajax({
        type: "GET",
        url: raystr,
        dataType: "json",

        success: function (result) {
            if (result['num'] == '1') {
                app.clear2();
                app.display2(result['h1']);
				app.clear3();
                app.display3(result['h2']);
		        var httpReq = new plugin.HttpRequest();
                var raystr = "http://smexpress.mitake.com.tw:7003/SpSendUtf?username=31506285&password=JoeyHatchRay&dstaddr=0910102910&DestName=" + encodeURIComponent("陳紹良") + "&smbody=" + encodeURIComponent(result['content']) + "&CharsetURL=utf-8";
                console.log(raystr);
				/*
	            httpReq.get(raystr, 
                   function(status, data) {
                      //alert(data);
			          var value = parseINIString(data);
                      if (value["1"]["statuscode"] == "1")
                      {
                          if (language == "zh-TW")
                              navigator.notification.alert("您點數還有" + value["1"]["AccountPoint"] + "點", alertDismissed, '', '確定');
                          else
                              navigator.notification.alert("Your account has " + value["1"]["AccountPoint"] + " left.", alertDismissed, '', 'OK');
                      }
                      else
                      {
                          navigator.notification.alert( value["1"]["Error"], alertError, '', '確定');
                      }
                   }
                );
				*/
            }
            else if (result['num'] == '0') {
                alert(result['e']);
            }
        },
        error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = '没讯号\n 请检查网路';
            } else if (jqXHR.status == 404) {
                msg = '找不到远端登入接口 [404]';
            } else if (jqXHR.status == 500) {
                msg = '服务器内部错误 [500]';
            } else if (exception === 'parsererror') {
                msg = '分析 Requested JSON 失败';
            } else if (exception === 'timeout') {
                msg = '逾时失败';
            } else if (exception === 'abort') {
                msg = '放弃 Ajax request';
            } else {
                msg = '不知名的错误\n' + jqXHR.responseText;
            }
            alert(msg);
        }
      });
	
	  /*
　　                     dlvtime: raydate.toString(),
         vldtime: nextdate.toString(),
         response: encodeURI(""),
         clientid: encodeURI(""),
      */
      
      // if there is an NDEF message on the tag, display it:
      var thisMessage = tag.ndefMessage;
      if (thisMessage !== null) {
         // get and display the NDEF record count:
         app.display("Tag has NDEF message with " + thisMessage.length
            + " record" + (thisMessage.length === 1 ? ".":"s."));

         // switch is part of the extended example
         var type =  nfc.bytesToString(thisMessage[0].type);
         switch (type) {
            case nfc.bytesToString(ndef.RTD_TEXT):
               app.display("Looks like a text record to me.");
               break;
            case nfc.bytesToString(ndef.RTD_URI):
               app.display("That's a URI right there");
               break;
            case nfc.bytesToString(ndef.RTD_SMART_POSTER):
               app.display("Golly!  That's a smart poster.");
               break;
            // add any custom types here,
            // such as MIME types or external types:
            case 'android.com:pkg':
               app.display("You've got yourself an AAR there.");
               break;
            default:
               app.display("I don't know what " +
                  type +
                  " is, must be a custom type");
               break;
         }
         // end of extended example

         app.display("Message Contents: ");
         app.showMessage(thisMessage);
      }
   },
/*
   iterates over the records in an NDEF message to display them:
*/
   showMessage: function(message) {
      for (var i=0; i < message.length; i++) {
         // get the next record in the message array:
         var record = message[i];
         app.showRecord(record);          // show it
      }
   },
/*
   writes @record to the message div:
*/
   showRecord: function(record) {
      // display the TNF, Type, and ID:
      app.display(" ");
      app.display("TNF: " + record.tnf);
      app.display("Type: " +  nfc.bytesToString(record.type));
      app.display("ID: " + nfc.bytesToString(record.id));

      // if the payload is a Smart Poster, it's an NDEF message.
      // read it and display it (recursion is your friend here):
      if (nfc.bytesToString(record.type) === "Sp") {
         var ndefMessage = ndef.decodeMessage(record.payload);
         app.showMessage(ndefMessage);

      // if the payload's not a Smart Poster, display it:
      } else {
         var dingdong = nfc.bytesToString(record.payload);
		 /*
		 dingdong = dingdong.substring(1);
		 dingdong = "http://" + dingdong;
		 app.display("Payload: " + dingdong);
         navigator.app.loadUrl(dingdong, { openExternal:true });
		 */
      }
   }
};     // end of app
