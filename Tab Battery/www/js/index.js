var nowid = "";
var count = 0;
var myVar;
var objadd = "";
var objserv = "";
var objchar = "";
var Trssi;
var ifScan = false;
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

        logger('Received Event: ' + id);
    }
};

function alertDismissed() {
    // do something
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
        var db = window.openDatabase("Test", "1.0", "TestDB", 1 * 1024);
        var successFn = function(json, count){
            objadd = json.data.inserts.Bluetooth[0].address;
            objserv = json.data.inserts.Bluetooth[0].serviceUuid;
            objchar = json.data.inserts.Bluetooth[0].characteristicUuid;
            logger("Exported JSON: "+ JSON.stringify(obj) );
            logger("Exported JSON contains equivalent of "+count+" SQL statements");
            subscribe(objadd, objserv, objchar); //reconnect(objadd);
        };
        cordova.plugins.sqlitePorter.exportDbToJson(db, {
            successFn: successFn
        });
        //logger("Is Initialized : true");
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
        navigator.notification.alert("Unexpected Initialize Status", alertDismissed, '', '確定');
    }
}

function initializeError(obj) {
    navigator.notification.alert("Initialize Error : " + JSON.stringify(obj), alertDismissed, '', '確定');
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
        ifScan = true;
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
    logger("Stop Scan");

    bluetoothle.stopScan(stopScanSuccess, stopScanError);

    return false;
}

function stopScanSuccess(obj) {
    logger("Stop Scan Success : " + JSON.stringify(obj));

    if (obj.status == "scanStopped")
    {
        ifScan = false;
        logger("Scan Stopped");
    }
    else
    {
        navigator.notification.alert("Unexpected Stop Scan Status", alertDismissed, '', '確定');
    }
}

function stopScanError(obj) {
    navigator.notification.alert("Stop Scan Error : " + JSON.stringify(obj), alertDismissed, '', '確定');
}

function isConnected(address) {
    var paramsObj = {address:address};

    logger("Is Connected : " + JSON.stringify(paramsObj));

    bluetoothle.isConnected(isConnectedSuccess, paramsObj);
    return false;
}

function isConnectedSuccess(obj) {
    alert("Is Connected Success : " + JSON.stringify(obj));

    if (obj.isConnected)
    {
        logger("Is Connected : true");
    }
    else
    {
        logger("Is Connected : false");
    }
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
        navigator.notification.alert("Unexpected Connect Status", alertDismissed, '', '確定');
    }
}

function connectError(obj) {
    clearInterval(Trssi);
    navigator.notification.alert("Connect Error : " + JSON.stringify(obj), alertDismissed, '', '確定');
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
        navigator.notification.alert("Unexpected Reconnect Status", alertDismissed, '', '確定');
    }
}

function reconnectError(obj) {
    clearInterval(Trssi);
    navigator.notification.alert("Reconnect Error : " + JSON.stringify(obj), alertDismissed, '', '確定');
}

function isDiscovered(address) {
    var paramsObj = {address:address};

    logger("Is Discovered : " + JSON.stringify(paramsObj));

    bluetoothle.isDiscovered(isDiscoveredSuccess, paramsObj);

    return false;
}

function isDiscoveredSuccess(obj) {
    alert("Is Discovered Success : " + JSON.stringify(obj));

    if (obj.isDiscovered)
    {
        logger("Is Discovered : true");
    }
    else
    {
        logger("Is Discovered : false");
    }
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
                if("fff7" == characteristic.characteristicUuid) {
                    subscribe(address, service.serviceUuid, characteristic.characteristicUuid);
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
        navigator.notification.alert("Unexpected Discover Status", alertDismissed, '', '確定');
    }
}

function discoverError(obj) {
    navigator.notification.alert("Discover Error : " + JSON.stringify(obj), alertDismissed, '', '確定');
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
        //$("#note").text(obj.rssi);
        if(obj.rssi < -85)
        {
            clearInterval(Trssi);
            disconnect(objadd);
            isScanning();
        }
    }
    else
    {
        navigator.notification.alert("Unexpected RSSI Status", alertDismissed, '', '確定');
    }
}

function rssiError(obj) {
    navigator.notification.alert("RSSI Error : " + JSON.stringify(obj), alertDismissed, '', '確定');
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

function getAddress($item) {
    return $item.parents("li[data-address]").attr("data-address");
}

function addService(address, serviceUuid) {
    var $devices = $(".devices");

    var $services = $devices.find("li[data-address='{0}'] ul.services".format(address));

    var $check = $services.find("li[data-serviceUuid='{0}']".format(serviceUuid));
    if ($check.length > 0)
    {
        return;
    }

    var template = $("#service").text().format(serviceUuid);

    $services.append(template);
}

function getServiceUuid($item) {
    return $item.parents("li[data-serviceUuid]").attr("data-serviceUuid");
}

function addCharacteristic(address, serviceUuid, characteristicUuid) {
    var $devices = $(".devices");

    var $services = $devices.find("li[data-address='{0}'] ul.services".format(address));

    var $characteristics = $services.find("li[data-serviceUuid='{0}'] ul.characteristics".format(serviceUuid));

    var $check = $characteristics.find("li[data-characteristicUuid='{0}']".format(characteristicUuid));
    if ($check.length > 0)
    {
        return;
    }

    var template = $("#characteristic").text().format(characteristicUuid);

    $characteristics.append(template);
}

function getCharacteristicUuid($item) {
    return $item.parents("li[data-characteristicUuid]").attr("data-characteristicUuid");
}

function addDescriptor(address, serviceUuid, characteristicUuid, descriptorUuid) {
    var $devices = $(".devices");

    var $services = $devices.find("li[data-address='{0}'] ul.services".format(address));

    var $characteristics = $services.find("li[data-serviceUuid='{0}'] ul.characteristics".format(serviceUuid));

    var $descriptors = $characteristics.find("li[data-characteristicUuid='{0}'] ul.descriptors".format(characteristicUuid));

    var $check = $descriptors.find("li[data-descriptorUuid='{0}']".format(descriptorUuid));
    if ($check.length > 0)
    {
        return;
    }

    var template = $("#descriptor").text().format(descriptorUuid);

    $descriptors.append(template);
}

function getDescriptorUuid($item) {
    return $item.parents("li[data-descriptorUuid]").attr("data-descriptorUuid");
}

function subscribe(address, serviceUuid, characteristicUuid) {
    var paramsObj = {address:address, serviceUuid:serviceUuid, characteristicUuid:characteristicUuid};
    objadd = address;
    logger("Subscribe : " + JSON.stringify(paramsObj));
    objserv = serviceUuid;
    bluetoothle.subscribe(subscribeSuccess, subscribeError, paramsObj);
    objchar = characteristicUuid;
    return false;
}

function subscribeSuccess(obj) {
    logger("Subscribe Success : " + JSON.stringify(obj));

    if (obj.status == "subscribedResult")
    {
        logger("Subscribed Result");
        var bytes = bluetoothle.encodedStringToBytes(obj.value);
        var string = bluetoothle.bytesToString(bytes);
        $("#note").text(string);
    }
    else if (obj.status == "subscribed")
    {
        logger("Subscribed");
        var Terr;
        var db = window.openDatabase("Test", "1.0", "TestDB", 1 * 1024);
        //var db = window.sqlitePlugin.openDatabase({name: 'my.db', location: 'default'});
        var json = {
            "data": {
                "updates": {
                    "Bluetooth": [
                        {
                            "set": {
                                "address": objadd,
                                "serviceUuid": objserv,
                                "characteristicUuid": objchar
                            },
                            "where": {}
                        }
                    ]
                }
            }
        };
        var successFn = function (count) {
            clearInterval(Terr);
            logger("Successfully imported JSON to DB; equivalent to " + count + " SQL statements");
            if (true == ifScan)
                stopScan();
        };
        var errorFn = function (error) {
            Terr = setInterval(function () {

                json = {
                    "structure": {
                        "tables": {
                            "Artist": "([username] PRIMARY KEY, [password], [photourl])",
                            "Bluetooth": "([address],[serviceUuid],[characteristicUuid])"
                        },
                        "otherSQL": [

                        ]
                    },
                    "data": {
                        "inserts": {
                            "Bluetooth": [
                                {
                                    "address": objadd,
                                    "serviceUuid": objserv,
                                    "characteristicUuid": objchar
                                }
                            ]
                        }
                    }
                };
                cordova.plugins.sqlitePorter.importJsonToDb(db, json, {
                    successFn: successFn,
                    errorFn: errorFn,
                    progressFn: progressFn,
                    batchInsertSize: 500
                });

            }, 1000);
            logger("The following error occurred: " + error.message);
        };
        var progressFn = function(current, total){
            logger("Imported "+current+"/"+total+" statements");
        };
        cordova.plugins.sqlitePorter.importJsonToDb(db, json, {
            successFn: successFn,
            errorFn: errorFn,
            progressFn: progressFn
        });
    }
    else
    {
        navigator.notification.alert("Unexpected Subscribe Status", alertDismissed, '', '確定');
    }
}

function subscribeError(obj) {
    navigator.notification.alert("Subscribe Error : " + JSON.stringify(obj), alertDismissed, '', '確定');
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
        navigator.notification.alert("Unexpected Unsubscribe Status", alertDismissed, '', '確定');
    }
}

function unsubscribeError(obj) {
    navigator.notification.alert("Unsubscribe Error : " + JSON.stringify(obj), alertDismissed, '', '確定');
}

function logger(message) {
    console.log(message);

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
        navigator.notification.alert("Unexpected Disconnect Status", alertDismissed, '', '確定');
    }
}

function disconnectError(obj) {
    navigator.notification.alert("Disconnect Error : " + JSON.stringify(obj), alertDismissed, '', '確定');
}

function retrieveConnected() {
    var paramsObj = {serviceUuids:[objserv]};

    logger("Retrieve Connected : " + JSON.stringify(paramsObj));

    bluetoothle.retrieveConnected(retrieveConnectedSuccess, retrieveConnectedError, paramsObj);

    return false;
}

function retrieveConnectedSuccess(obj) {
    logger("Retrieve Connected Success : " + JSON.stringify(obj));

    for (var i = 0; i < obj.length; i++)
    {
        var device = obj[i];
        addDevice(device.address, device.name);
    }
}

function retrieveConnectedError(obj) {
    navigator.notification.alert("Retrieve Connected Error : " + JSON.stringify(obj), alertDismissed, '', '確定');
}

$(window).on('beforeunload', function(){
    unsubscribe(objadd,objserv,objchar); //disconnect(objadd);
});

app.initialize();
