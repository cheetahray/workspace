var Trssi;
var objadd = "";

function logger(message) {
    console.log(message);
}

function isInitialized() {
    logger("Is Initialized");

    bluetoothle.isInitialized(isInitializedSuccess);

    return false;
}

function isInitializedSuccess(obj) {
    logger("Is Initialized Success : " + JSON.stringify(obj));

    if (obj.isInitialized)
    {
        logger("Is Initialized : true");
    }
    else
    {
        initialize();//logger("Is Initialized : false");
    }
}

function initialize() {
    var paramsObj = {request:true};

    logger("Initialize : " + JSON.stringify(paramsObj));

    bluetoothle.initialize(initializeSuccess, initializeError, paramsObj);

    return false;
}

function initializeSuccess(obj) {
    logger("Initialize Success : " + JSON.stringify(obj));

    if (obj.status == "enabled")
    {
        isScanning(); //logger("Enabled");
    }
    else
    {
        logger("Unexpected Initialize Status");
    }
}

function initializeError(obj) {
    logger("Initialize Error : " + JSON.stringify(obj));
}

function isScanning() {
    logger("Is Scanning");

    bluetoothle.isScanning(isScanningSuccess);

    return false;
}

function isScanningSuccess(obj) {
    logger("Is Scanning Success : " + JSON.stringify(obj));

    if (obj.isScanning)
    {
        logger("Is Scanning : true");
    }
    else
    {
        startScan();
        //ifScan = true;
        logger("Is Scanning : false");
    }
}

function startScan() {
    //TODO Disconnect / Close all addresses and empty

    var paramsObj = {serviceUuids:[], allowDuplicates: false};

    logger("Start Scan : " + JSON.stringify(paramsObj));

    bluetoothle.startScan(startScanSuccess, startScanError, paramsObj);

    return false;
}

function startScanSuccess(obj) {
    logger("Start Scan Success : " + JSON.stringify(obj));

    if (obj.status == "scanResult")
    {
        logger("Scan Result");
		
		if(obj.name == "SimpleBLEPeripheral") //"CT")
        {
			stopScan();
			if(objadd == "")
                connect(obj.address);
            else
                reconnect(obj.address);
        }
		
		//addDevice(obj.address, obj.name);
    }
    else if (obj.status == "scanStarted")
    {
        logger("Scan Started");
    }
    else
    {
        logger("Unexpected Start Scan Status");
    }
}

function startScanError(obj) {
    logger("Start Scan Error : " + JSON.stringify(obj));
}

function stopScan() {
    logger("Stop Scan");

    bluetoothle.stopScan(stopScanSuccess, stopScanError);

    return false;
}

function stopScanSuccess(obj) {
    logger("Stop Scan Success : " + JSON.stringify(obj));

    if (obj.status == "scanStopped")
    {
        logger("Scan Stopped");
    }
    else
    {
        logger("Unexpected Stop Scan Status");
    }
}

function stopScanError(obj) {
    logger("Stop Scan Error : " + JSON.stringify(obj));
}

function connect(address) {
    var paramsObj = {address:address};

    logger("Connect : " + JSON.stringify(paramsObj));

    bluetoothle.connect(connectSuccess, connectError, paramsObj);

    return false;
}

function connectSuccess(obj) {
    logger("Connect Success : " + JSON.stringify(obj));

    if (obj.status == "connected")
    {
        logger("Connected");
		objadd = obj.address;
        Trssi = setInterval(function () {
            rssi(objadd);
        }, 1000);
		discover(obj.address);
    }
    else if (obj.status == "connecting")
    {
        logger("Connecting");
    }
    else
    {
        logger("Unexpected Connect Status");
    }
}

function connectError(obj) {
    clearInterval(Trssi);
    logger("Connect Error : " + JSON.stringify(obj));
}

function reconnect(address) {
    var paramsObj = {address:address};

    logger("Reconnect : " + JSON.stringify(paramsObj));

    bluetoothle.reconnect(reconnectSuccess, reconnectError, paramsObj);

    return false;
}

function reconnectSuccess(obj) {
    logger("Reconnect Success : " + JSON.stringify(obj));

    if (obj.status == "connected")
    {
        logger("Connected");
        objadd = obj.address;
        Trssi = setInterval(function () {
            rssi(objadd);
        }, 1000);
        discover(obj.address);
    }
    else if (obj.status == "connecting")
    {
        logger("Connecting");
    }
    else
    {
        logger("Unexpected Reconnect Status");
    }
}

function reconnectError(obj) {
    clearInterval(Trssi);
    logger("Reconnect Error : " + JSON.stringify(obj));
}

function discover(address) {
    var paramsObj = {address:address};

    logger("Discover : " + JSON.stringify(paramsObj));

    bluetoothle.discover(discoverSuccess, discoverError, paramsObj);

    return false;
}

function discoverSuccess(obj) {
    logger("Discover Success : " + JSON.stringify(obj));

    if (obj.status == "discovered")
    {
        logger("Discovered");

        var address = obj.address;

        var services = obj.services;

        for (var i = 0; i < services.length; i++)
        {
            var service = services[i];

            //addService(address, service.serviceUuid);

            var characteristics = service.characteristics;

            for (var j = 0; j < characteristics.length; j++)
            {
                var characteristic = characteristics[j];
                
				//addCharacteristic(address, service.serviceUuid, characteristic.characteristicUuid);
                /*
				if("fff7" == characteristic.characteristicUuid) {
                    subscribe(address, service.serviceUuid, characteristic.characteristicUuid);
                }
				*/
				
				if("fff6" == characteristic.characteristicUuid) {
				    
					var bytes = new Uint8Array(5);
					/*
					for (var ii = 0; ii < 5 ; ii++)
					    bytes[ii] = ii+6;
					*/
					bytes[0] = 119;
					bytes[1] = 116;
					bytes[2] = 102;
					bytes[3] = 63;
					bytes[4] = 33;
                    var value = bluetoothle.bytesToEncodedString(bytes);
                    write(address, service.serviceUuid, characteristic.characteristicUuid, value);
					
					//read(address, service.serviceUuid, characteristic.characteristicUuid);
                }
				
				/*
                var descriptors = characteristic.descriptors;

                for (var k = 0; k < descriptors.length; k++)
                {
                    var descriptor = descriptors[k];

                    //addDescriptor(address, service.serviceUuid, characteristic.characteristicUuid, descriptor.descriptorUuid);
                }
                */
            }
        }
    }
    else
    {
        logger("Unexpected Discover Status");
    }
}

function discoverError(obj) {
    logger("Discover Error : " + JSON.stringify(obj));
}

function rssi(address) {
    var paramsObj = {address:address};

    logger("RSSI : " + JSON.stringify(paramsObj));

    bluetoothle.rssi(rssiSuccess, rssiError, paramsObj);

    return false;
}

function rssiSuccess(obj) {
    logger("RSSI Success : " + JSON.stringify(obj));

    if (obj.status == "rssi")
    {
        logger("RSSI");
        //$("#rayh1").text(obj.rssi);
        if(obj.rssi < -85)
        {
            clearInterval(Trssi);
            disconnect(obj.address);
            isScanning();
        }
    }
    else
    {
        logger("Unexpected RSSI Status");
    }
}

function rssiError(obj) {
    logger("RSSI Error : " + JSON.stringify(obj));
}

function disconnect(address) {
    var paramsObj = {address:address};

    logger("Disconnect : " + JSON.stringify(paramsObj));

    bluetoothle.disconnect(disconnectSuccess, disconnectError, paramsObj);

    return false;
}

function disconnectSuccess(obj) {
    logger("Disconnect Success : " + JSON.stringify(obj));

    if (obj.status == "disconnected")
    {
        logger("Disconnected");
    }
    else if (obj.status == "disconnecting")
    {
        logger("Disconnecting");
    }
    else
    {
        logger("Unexpected Disconnect Status");
    }
}

function disconnectError(obj) {
    logger("Disconnect Error : " + JSON.stringify(obj));
}

function subscribe(address, serviceUuid, characteristicUuid) {
    var paramsObj = {address:address, serviceUuid:serviceUuid, characteristicUuid:characteristicUuid};
    logger("Subscribe : " + JSON.stringify(paramsObj));
    bluetoothle.subscribe(subscribeSuccess, subscribeError, paramsObj);
    return false;
}

function subscribeSuccess(obj) {
    logger("Subscribe Success : " + JSON.stringify(obj));

    if (obj.status == "subscribedResult")
    {
        logger("Subscribed Result");
		var bytes = bluetoothle.encodedStringToBytes(obj.value);
        var string = bluetoothle.bytesToString(bytes);
        $("#rayh1").text(string);
    }
    else if (obj.status == "subscribed")
    {
        logger("Subscribed");
    }
    else
    {
        logger("Unexpected Subscribe Status");
    }
}

function subscribeError(obj) {
    logger("Subscribe Error : " + JSON.stringify(obj));
}

function unsubscribe(address, serviceUuid, characteristicUuid) {
    var paramsObj = {address:address, serviceUuid:serviceUuid, characteristicUuid:characteristicUuid};

    logger("Unsubscribe : " + JSON.stringify(paramsObj));

    bluetoothle.unsubscribe(unsubscribeSuccess, unsubscribeError, paramsObj);

    return false;
}

function unsubscribeSuccess(obj) {
    logger("Unsubscribe Success : " + JSON.stringify(obj));

    if (obj.status == "unsubscribed")
    {
        logger("Unsubscribed");
    }
    else
    {
        logger("Unexpected Unsubscribe Status");
    }
}

function unsubscribeError(obj) {
    logger("Unsubscribe Error : " + JSON.stringify(obj));
}

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

        isInitialized();
        
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function read(address, serviceUuid, characteristicUuid) {
  var paramsObj = {address:address, serviceUuid:serviceUuid, characteristicUuid:characteristicUuid};

  logger("Read : " + JSON.stringify(paramsObj));

  bluetoothle.read(readSuccess, readError, paramsObj);

  return false;
}

function readSuccess(obj) {
  logger("Read Success : " + JSON.stringify(obj));

  if (obj.status == "read")
  {
    var bytes = bluetoothle.encodedStringToBytes(obj.value);
    logger("Read : " + bytes[0]);
	var string = bluetoothle.bytesToString(bytes);
    $("#rayh1").text(string); 
    //logger("Read");
  }
  else
  {
    logger("Unexpected Read Status");
  }
}

function readError(obj) {
  logger("Read Error : " + JSON.stringify(obj));
}

function write(address, serviceUuid, characteristicUuid, value) {
  var paramsObj = {address:address, serviceUuid:serviceUuid, characteristicUuid:characteristicUuid, value:value};

  logger("Write : " + JSON.stringify(paramsObj));

  bluetoothle.write(writeSuccess, writeError, paramsObj);

  return false;
}

function writeSuccess(obj) {
  logger("Write Success : " + JSON.stringify(obj));

  if (obj.status == "written")
  {
    logger("Written");
  }
  else
  {
    logger("Unexpected Write Status");
  }
}

function writeError(obj) {
  logger("Write Error : " + JSON.stringify(obj));
}

app.initialize();
