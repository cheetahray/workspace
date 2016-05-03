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
        keepscreenon.enable();
        isInitialized();
        count = parseInt( $("#1circle").attr('data-percent') );
        $("#1circle").percircle();
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
    console.log('do something like stop audio playback');
  } else if (result.type==='countdown') {
    console.log('time until sleep: ' + result.timeLeft + ' seconds');
  } else {
    console.log('unhandled type (' + result.type + ')');
  }
}; 

// example of a callback method
var errorCallback = function (error) {
    navigator.notification.alert(error, alertDismissed, '', '確定');
};

function isInitialized() {
    console.log("Is Initialized");

    bluetoothle.isInitialized(isInitializedSuccess);

    return false;
}

function isInitializedSuccess(obj) {
    console.log("Is Initialized Success : " + JSON.stringify(obj));

    if (obj.isInitialized)
    {
        console.log("Is Initialized : true");
    }
    else
    {
        initialize();//logger("Is Initialized : false");
    }
}

function initialize() {
    var paramsObj = {request:true};

    console.log("Initialize : " + JSON.stringify(paramsObj));

    bluetoothle.initialize(initializeSuccess, initializeError, paramsObj);

    return false;
}

function initializeSuccess(obj) {
    console.log("Initialize Success : " + JSON.stringify(obj));

    if (obj.status == "enabled")
    {
        isScanning(); //logger("Enabled");
    }
    else
    {
        navigator.notification.alert("Unexpected Initialize Status", alertDismissed, '', '確定');
    }
}

function initializeError(obj) {
    console.log("Initialize Error : " + JSON.stringify(obj));
}

function isScanning() {
    console.log("Is Scanning");

    bluetoothle.isScanning(isScanningSuccess);

    return false;
}

function isScanningSuccess(obj) {
    console.log("Is Scanning Success : " + JSON.stringify(obj));

    if (obj.isScanning)
    {
        console.log("Is Scanning : true");
    }
    else
    {
        startScan(); //logger("Is Scanning : false");
    }
}

function startScan() {
    //TODO Disconnect / Close all addresses and empty

    var paramsObj = {serviceUuids:[], allowDuplicates: false};

    console.log("Start Scan : " + JSON.stringify(paramsObj));

    bluetoothle.startScan(startScanSuccess, startScanError, paramsObj);

    return false;
}

function startScanSuccess(obj) {
    console.log("Start Scan Success : " + JSON.stringify(obj));

    if (obj.status == "scanResult")
    {
        console.log("Scan Result");
        if(obj.name == "CT")
        {
            connect(obj.address);
            stopScan();
        }
        //addDevice(obj.address, obj.name);
    }
    else if (obj.status == "scanStarted")
    {
        console.log("Scan Started");
    }
    else
    {
        navigator.notification.alert("Unexpected Start Scan Status", alertDismissed, '', '確定');
    }
}

function startScanError(obj) {
    navigator.notification.alert("Start Scan Error : " + JSON.stringify(obj), alertDismissed, '', '確定');
}

function addDevice(address, name) {
    var $devices = $(".devices");

    var $check = $devices.find("li[data-address='{0}']".format(address));
    if ($check.length > 0)
    {
        return;
    }

    var template = $("#device").text().format(address, name);

    $devices.append(template);
}

function stopScan() {
    console.log("Stop Scan");

    bluetoothle.stopScan(stopScanSuccess, stopScanError);

    return false;
}

function stopScanSuccess(obj) {
    console.log("Stop Scan Success : " + JSON.stringify(obj));

    if (obj.status == "scanStopped")
    {
        console.log("Scan Stopped");
    }
    else
    {
        console.log("Unexpected Stop Scan Status");
    }
}

function stopScanError(obj) {
    navigator.notification.alert("Stop Scan Error : " + JSON.stringify(obj), alertDismissed, '', '確定');
}

function isConnected(address) {
    var paramsObj = {address:address};

    console.log("Is Connected : " + JSON.stringify(paramsObj));

    bluetoothle.isConnected(isConnectedSuccess, paramsObj);
    return false;
}

function isConnectedSuccess(obj) {
    alert("Is Connected Success : " + JSON.stringify(obj));

    if (obj.isConnected)
    {
        console.log("Is Connected : true");
    }
    else
    {
        console.log("Is Connected : false");
    }
}

function connect(address) {
    var paramsObj = {address:address};

    console.log("Connect : " + JSON.stringify(paramsObj));

    bluetoothle.connect(connectSuccess, connectError, paramsObj);

    return false;
}

function connectSuccess(obj) {
    console.log("Connect Success : " + JSON.stringify(obj));

    if (obj.status == "connected")
    {
        console.log("Connected");
        discover(obj.address)
    }
    else if (obj.status == "connecting")
    {
        console.log("Connecting");
    }
    else
    {
        navigator.notification.alert("Unexpected Connect Status", alertDismissed, '', '確定');
    }
}

function connectError(obj) {
    navigator.notification.alert("Connect Error : " + JSON.stringify(obj), alertDismissed, '', '確定');
}

function isDiscovered(address) {
    var paramsObj = {address:address};

    console.log("Is Discovered : " + JSON.stringify(paramsObj));

    bluetoothle.isDiscovered(isDiscoveredSuccess, paramsObj);

    return false;
}

function isDiscoveredSuccess(obj) {
    alert("Is Discovered Success : " + JSON.stringify(obj));

    if (obj.isDiscovered)
    {
        console.log("Is Discovered : true");
    }
    else
    {
        console.log("Is Discovered : false");
    }
}

function discover(address) {
    var paramsObj = {address:address};

    console.log("Discover : " + JSON.stringify(paramsObj));

    bluetoothle.discover(discoverSuccess, discoverError, paramsObj);

    return false;
}

function discoverSuccess(obj) {
    console.log("Discover Success : " + JSON.stringify(obj));

    if (obj.status == "discovered")
    {
        console.log("Discovered");

        var address = obj.address;

        var services = obj.services;

        for (var i = 0; i < services.length; i++)
        {
            var service = services[i];

            addService(address, service.serviceUuid);

            var characteristics = service.characteristics;

            for (var j = 0; j < characteristics.length; j++)
            {
                var characteristic = characteristics[j];

                addCharacteristic(address, service.serviceUuid, characteristic.characteristicUuid);

                var descriptors = characteristic.descriptors;

                for (var k = 0; k < descriptors.length; k++)
                {
                    var descriptor = descriptors[k];

                    addDescriptor(address, service.serviceUuid, characteristic.characteristicUuid, descriptor.descriptorUuid);
                }
            }
        }
    }
    else
    {
        navigator.notification.alert("Unexpected Discover Status", alertDismissed, '', '確定');
    }
}

function discoverError(obj) {
    navigator.notification.alert("Discover Error : " + JSON.stringify(obj), alertDismissed, '', '確定');
}


app.initialize();
