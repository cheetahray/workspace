/*global cordova, module*/

module.exports = {
    initialize: function (name, port, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "Hello", "initialize", [name, port]);
    },
    sendMessage: function (msg, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "Hello", "sendMessage", [msg]);
    },
    listenForPackets: function (successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "Hello", "listenForPackets", []);
    },
    playmidi: function (meg, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "Hello", "playmidi", [msg]);
    }
};
