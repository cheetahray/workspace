﻿var language = "";
var tagid = "";
var phonenum = "";
var rayfile;
var iab;
var tagtxt = "tag.txt";
//var catetxt = "cate.txt";
var phonetxt = "phone.txt";
var cert;

function alertDismissed() {
        
}

function makeid()
{
    var text = "";
    var possible = "0123456789";//"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    cert = text;
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

function onPrompt(results) {
    if ( results.buttonIndex == 1)
    {
        makeid();
        
        var httpReq = new plugin.HttpRequest();
        var raystr = "http://smexpress.mitake.com.tw:7003/SpSendUtf?username=31506285&password=JoeyHatchRay&dstaddr=" + $.trim(results.input1) + "&DestName=" + encodeURIComponent("貌似無用") + "&smbody=" + encodeURIComponent("您好，驗證碼是" + cert ) + "&CharsetURL=utf-8";
        
        httpReq.get(raystr, 
            function(status, data) {
                var value = parseINIString(data);
                if (value["1"]["statuscode"] == "1")
                {
                    phonenum = $.trim(results.input1);
                    certprompt();
                }
                else
                {
                    navigator.notification.alert( value["1"]["Error"], alertError, '', '確定');
                }
            }
        );
        //alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);    
    }
        
}

function onPrompt2(results) {
    if ( results.buttonIndex == 1 )
    {
        if (results.input1.trim() == cert)
        {
			//alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
            var dataObj = new Blob([phonenum], { type: 'text/plain' });
            rayfile.name = phonetxt;
            rayfile.fullPath = "/" + phonetxt;
            writeFile(rayfile, dataObj, false);
			
            var raystr = "http://nfc.tagallover.com/NFC/page0.php?phone=" + phonenum;
            //alert(raystr);
            $.ajax({
                type: "GET",
                url: raystr,
                dataType: "json",
    
                success: function (result) {
                    navigator.notification.alert(result["e"], alertDismissed, '', 'OK');
                },
                error: function (jqXHR, exception) {
                    readext(jqXHR, exception);
                }
            });
            
        }
        else
        {
            certprompt2();
        }
    }
}

function alertError() {

}

function alertDismissed() {
        
}

//文件创建失败回调
function  onErrorCreateFile(error){
   alert(error);
}
            
//FileSystem加载失败回调
function onErrorLoadFs(error){
   alert(error);
}

//读取文件失败响应
function onErrorReadFile(){
   alert("文件读取失败!");
}

function createFile(dirEntry, fileName, isAppend) {
    
    // Creates a new file or returns the file if it already exists.
    dirEntry.getFile(fileName, {create: true, exclusive: false}, function(fileEntry) {
        rayfile = fileEntry;
        if(fileEntry.name == phonetxt)
            readFile(fileEntry);
        //alert(fileEntry.fullPath);
        //alert(fileEntry.name);
    }, onErrorCreateFile);

}

function writeFile(fileEntry, dataObj, isAppend) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function() {
            console.log("Successful file read...");
        };

        fileWriter.onerror = function (e) {
            alert("Failed file read: " + e.toString());
        };

        // If we are appending data to file, go to the end of the file.
        if (isAppend) {
            try {
                fileWriter.seek(fileWriter.length);
            }
            catch (e) {
                alert("file doesn't exist!");
            }
        }
        fileWriter.write(dataObj);
    });
}

function phoneprompt()
{
    if (language == "zh-TW")
        navigator.notification.prompt('請輸入手機號碼',  // message
            onPrompt,  // callback to invoke
            '獲取驗證碼',            // title
            ['確定','取消'],             // buttonLabels
            '' // defaultText
        );
    else
        navigator.notification.prompt('Please input your cell number',  // message
            onPrompt,  // callback to invoke
            'Get Certification Code',            // title
            ['Ok','Exit'],             // buttonLabels
            '' // defaultText
        );
}

function certprompt()
{
    if (language == "zh-TW")
        navigator.notification.prompt('請輸入驗證碼',  // message
            onPrompt2,  // callback to invoke
            '就差一步',            // title
            ['確定'],             // buttonLabels
            '' // defaultText
        );
    else
        navigator.notification.prompt('Please input your certification code',  // message
            onPrompt2,  // callback to invoke
            'One step more',            // title
            ['Ok'],             // buttonLabels
            '' // defaultText
        );
}

function certprompt2()
{
    if (language == "zh-TW")
        navigator.notification.prompt('請輸入驗證碼',  // message
            onPrompt2,  // callback to invoke
            '不對喔',            // title
            ['確定'],             // buttonLabels
            '' // defaultText
        );
    else
        navigator.notification.prompt('Please input your certification code',  // message
            onPrompt2,  // callback to invoke
            'Wrong!',            // title
            ['Ok'],             // buttonLabels
            '' // defaultText
        );
}


function readFile(fileEntry) {

    fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function() {
            console.log("Successful file read: " + this.result);
            if(fileEntry.name == phonetxt)
            {
                if( this.result.length > 0)
                {
                    phonenum = this.result;
                }
                else
                {
                    phoneprompt();    
                }
            }
        };

        reader.readAsText(file);

    }, onErrorReadFile);
}

function mygod(tagid)
{   
    if (phonenum.length == 0)
        phoneprompt();
    else
    {  
        var raystr = "http://nfc.tagallover.com/NFC/page1.php?tagid=" + tagid + "&phone=" + phonenum;
        $.ajax({
            type: "GET",
            url: raystr,
            dataType: "json",

            success: function (result) {
                if (result['num'] == '1') {
                    var dataObj = new Blob([tagid], { type: 'text/plain' });
                    rayfile.name = tagtxt;
                    rayfile.fullPath = "/" + tagtxt;
                    writeFile(rayfile, dataObj, false);
                    //dataObj = new Blob([result['catid']], { type: 'text/plain' });
                    //rayfile.name = catetxt;
                    //rayfile.fullPath = "/" + catetxt;
                    //writeFile(rayfile, dataObj, false);
                    setInterval(function(){ window.location.assign("second.html"); }, 100);
                }
                else if (result['num'] == '0') {
                    //alert(result['e']);
                    /*
                    if (language == "zh-TW")
                        navigator.notification.alert("你遇到詐騙集團了", alertDismissed, '', '確定');
                    else
                        navigator.notification.alert("HoHoHo you meet the fraud group.", alertDismissed, '', 'OK');
                    */
                    iab.open('http://nfc.tagallover.com/NFC/barcode.php?tagid=' + tagid, 'random_string', 'location=no'); // loads in the InAppBrowser, no location bar
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
    }
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
      /*
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

          console.log('file system open: ' + fs.name);
          fs.root.getFile("newPersistentFile.txt", { create: true, exclusive: false }, function (fileEntry) {

              console.log("fileEntry is file?" + fileEntry.isFile.toString());
              // fileEntry.name == 'someFile.txt'
              // fileEntry.fullPath == '/someFile.txt'
              rayfile = fileEntry;
              
          }, onErrorCreateFile);

      }, onErrorLoadFs);
      */
      
      window.requestFileSystem(window.TEMPORARY, 1024, function (fs) {

         console.log('file system open: ' + fs.name);
         createFile(fs.root, phonetxt, false);
         //createFile(fs.root, catetxt, false);
         createFile(fs.root, tagtxt, false);
         
      }, onErrorLoadFs);
      
      iab = cordova.InAppBrowser;

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
        $(document).ready(function(){
            $('.touch-img').each(function(){
                $(this).find('.owl-carousel').outerWidth($(this).closest('.touch-img').innerWidth());
            });
            $('.owl-carousel').owlCarousel({
                animateOut: 'slideOutDown',
                animateIn: 'flipInX',
                items: 1,
                autoplayTimeout: 2000,
                autoplay: true,
                loop: true
            });
        });
        listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');
        
        console.log('Received Event: ' + id);
   },
   /*
      appends @message to the message div:
   */
   display: function(message) {
      /*
      var label = document.createTextNode(message),
      lineBreak = document.createElement("br");
      messageDiv4.appendChild(lineBreak);         // add a line break
      messageDiv4.appendChild(label);             // add the text
      */
   },
   /*
      clears the message div:
   */
   clear: function() {
       messageDiv4.innerHTML = "";
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
      mygod(nfc.bytesToHexString(tag.id));
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
      
      mygod(tagid);
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
