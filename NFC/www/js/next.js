language = "";
tagid = "";
var rayfile;

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
			
			var raystr = "http://nfc.tagallover.com/NFC/checkajax.php?tagid=" + this.result;
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
					  
					  document.getElementById('imageFile').src = result['photo'];
					
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
      anyscreen([''], function () { //(['./css/index.css'],function() {
              
              });
										 
      window.screen.lockOrientation('portrait');
	  
	  window.requestFileSystem(window.TEMPORARY, 1024, function (fs) {

         console.log('file system open: ' + fs.name);
         createFile(fs.root, "newTempFile.txt", false);

      }, onErrorLoadFs);
      
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
   display2: function(message) {
      var label = document.createTextNode(message), createA = document.createElement('a'), 
         lineBreak = document.createElement("br");
		createA.setAttribute('href', "next.html");
	  createA.appendChild(label);
	  messageDiv2.appendChild(label);             // add the text 
   },
   /*
      appends @message to the message div:
   */
   display3: function(message) {
      var label = document.createTextNode(message), createA = document.createElement('a'),
         lineBreak = document.createElement("br");
    	createA.setAttribute('href', "next.html");
	  createA.appendChild(label);
	  messageDiv3.appendChild(label);             // add the text
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
   }

};     // end of app
