language = "";
tagid = "";
var rayfile;
//var iab;

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
		readFile(fileEntry);
		//writeFile(fileEntry, null, isAppend);
        //rayfile = fileEntry;  
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

function readFile(fileEntry) {

    fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function() {
            console.log("Successful file read: " + this.result);
			//alert(this.result);
			
			var raystr = "http://nfc.tagallover.com/NFC/checkajax.php?tagid=" + this.result;
            $.ajax({
              type: "GET",
              url: raystr,
              dataType: "json",

              success: function (result) {
                  if (result['num'] == '1') {
                      document.getElementById('logo').src = result['logo'];
      	  			  app.clear2();
                      app.display2(result['h1']);
					  document.getElementById('photo').src = result['photo'];
					  document.getElementById('stamp').src = result['thatsright'];
					  
					  app.clear3();
                      app.display3("您為第" + result['howmany'] + "位擁有者");
					  
					  app.clear4();
                      app.display4(result['h2']);
					  app.clear5();
                      app.display5(result['h3']);
					  app.clear6();
                      app.display6(result['h4']);
					  app.clear7();
                      app.display7(result['h5']);
					  //document.getElementById('imageFile').src = result['photo'];
			
					  /*
		      		  var httpReq = new plugin.HttpRequest();
                      var raystr = "http://smexpress.mitake.com.tw:7003/SpSendUtf?username=31506285&password=JoeyHatchRay&dstaddr=0910102910&DestName=" + encodeURIComponent("陳紹良") + "&smbody=" + encodeURIComponent(result['content']) + "&CharsetURL=utf-8";
                      console.log(raystr);
				
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
			
			//displayFileData(fileEntry.fullPath + ": " + this.result);
        };

        reader.readAsText(file);

    }, onErrorReadFile);
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
	  /*
      anyscreen([''], function () { //(['./css/index.css'],function() {
              
              });
      */									 
      window.screen.lockOrientation('portrait');
	  
	  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

          console.log('file system open: ' + fs.name);
          fs.root.getFile("newPersistentFile.txt", { create: false, exclusive: false }, function (fileEntry) {

              console.log("fileEntry is file?" + fileEntry.isFile.toString());
              //fileEntry.name == 'someFile.txt'
              //fileEntry.fullPath == '/someFile.txt'
              readFile(fileEntry, null);

          }, onErrorCreateFile);

      }, onErrorLoadFs);
	  
	  /*
	  window.requestFileSystem(window.TEMPORARY, 1024, function (fs) {

         console.log('file system open: ' + fs.name);
         createFile(fs.root, "newTempFile.txt", false);

      }, onErrorLoadFs);
      */
	  
      //iab = cordova.InAppBrowser;
      /*
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
      */
      app.receivedEvent('deviceready');
   },
   
   // Update DOM on a Received Event
   receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');
        
        console.log('Received Event: ' + id);
   },
   /*
      appends @message to the message div:
   */
   display: function(message) {
      var label = document.createTextNode(message), createA = document.createElement('a'), 
         lineBreak = document.createElement("br");
		createA.setAttribute('href', "next.html");
	  createA.appendChild(label);
	  messageDiv.appendChild(createA);             // add the text 
   },
   /*
      appends @message to the message div:
   */
   display2: function(message) {
	  var label = document.createTextNode(message);
         lineBreak = document.createElement("br");
      messageDiv2.appendChild(lineBreak);         // add a line break
      messageDiv2.appendChild(label);             // add the text
   },
   /*
      appends @message to the message div:
   */
   display3: function(message) {
      var label = document.createTextNode(message);
         lineBreak = document.createElement("br");
      messageDiv3.appendChild(lineBreak);         // add a line break
      messageDiv3.appendChild(label);             // add the text
   },
   /*
      appends @message to the message div:
   */
   display4: function(message) {
      var label = document.createTextNode(message);
         lineBreak = document.createElement("br");
      messageDiv4.appendChild(lineBreak);         // add a line break
      messageDiv4.appendChild(label);             // add the text
   },
   /*
      appends @message to the message div:
   */
   display5: function(message) {
      var label = document.createTextNode(message);
         lineBreak = document.createElement("br");
      messageDiv5.appendChild(lineBreak);         // add a line break
      messageDiv5.appendChild(label);             // add the text
   },
   /*
      appends @message to the message div:
   */
   display6: function(message) {
      var label = document.createTextNode(message);
         lineBreak = document.createElement("br");
      messageDiv6.appendChild(lineBreak);         // add a line break
      messageDiv6.appendChild(label);             // add the text
   },
   /*
      appends @message to the message div:
   */
   display7: function(message) {
      var label = document.createTextNode(message);
         lineBreak = document.createElement("br");
      messageDiv7.appendChild(lineBreak);         // add a line break
      messageDiv7.appendChild(label);             // add the text
   },
   /*
      clears the message div:
   */
   clear: function() {
       messageDiv.innerHTML = "";
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
   clear4: function() {
       messageDiv4.innerHTML = "";
   },
   /*
      clears the message div:
   */
   clear5: function() {
       messageDiv5.innerHTML = "";
   },
   clear6: function() {
       messageDiv6.innerHTML = "";
   },
   clear7: function() {
       messageDiv6.innerHTML = "";
   }
   
};     // end of app
