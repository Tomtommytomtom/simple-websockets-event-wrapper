"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketWrapper = void 0;
var WebSocketWrapper = /** @class */ (function () {
    function WebSocketWrapper(ws) {
        var _this = this;
        this.ws = ws;
        this.callbacks = {};
        ws.onmessage = function (payload) {
            console.log('raw json:', payload);
            var parsedPayload = JSON.parse(payload.data);
            console.log("succesfully parsed JSON, calling:", parsedPayload.eventName, "with parameter:", parsedPayload.data);
            if (_this.callbacks[parsedPayload.eventName]) {
                console.log("function with key:", parsedPayload.eventName, "actually exists. All callbacks:", _this.callbacks);
                _this.callbacks[parsedPayload.eventName](parsedPayload.data);
            }
        };
    }
    WebSocketWrapper.prototype.on = function (eventName, callback) {
        this.callbacks[eventName] = callback;
    };
    WebSocketWrapper.prototype.send = function (eventName, data) {
        var payload = {
            eventName: eventName,
            data: data
        };
        this.ws.send(JSON.stringify(payload));
    };
    return WebSocketWrapper;
}());
exports.WebSocketWrapper = WebSocketWrapper;
