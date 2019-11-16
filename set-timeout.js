"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exec_1 = require("./exec");
var TimeoutPromise = /** @class */ (function () {
    function TimeoutPromise(executorOrPromise) {
        this._promise = executorOrPromise instanceof Promise
            ? executorOrPromise
            : new Promise(executorOrPromise);
    }
    TimeoutPromise.prototype.then = function (onfulfilled, onrejected) {
        var p = new TimeoutPromise(this._promise.then(onfulfilled, onrejected));
        p._timeoutData = this._timeoutData;
        return p;
    };
    TimeoutPromise.prototype.catch = function (onrejected) {
        var p = new TimeoutPromise(this._promise.catch(onrejected));
        p._timeoutData = this._timeoutData;
        return p;
    };
    TimeoutPromise.prototype.finally = function (onfinally) {
        var p = new TimeoutPromise(this._promise.finally(onfinally));
        p._timeoutData = this._timeoutData;
        return p;
    };
    TimeoutPromise.prototype.reset = function (duration) {
        clearTimeout(this._timeoutData.timeoutId);
        this._timeoutData.timeoutId = global.setTimeout(this._timeoutData.timeoutHandler, duration !== undefined
            ? duration
            : this._timeoutData.duration);
        return this;
    };
    TimeoutPromise.prototype.clear = function (fn) {
        clearTimeout(this._timeoutData.timeoutId);
        exec_1.exec(fn, this)
            .then(this._timeoutData.resolve)
            .catch(this._timeoutData.reject);
        return this;
    };
    return TimeoutPromise;
}());
exports.TimeoutPromise = TimeoutPromise;
function setTimeout(fn, duration) {
    if (typeof fn === "number") {
        duration = fn;
        fn = undefined;
    }
    var timeoutData;
    var timeoutPromise = new TimeoutPromise(function (resolve, reject) {
        var timeoutHandler = function () {
            exec_1.exec(fn, timeoutPromise).then(resolve).catch(reject);
        };
        timeoutData = {
            resolve: resolve,
            reject: reject,
            timeoutHandler: timeoutHandler,
            timeoutId: global.setTimeout(timeoutHandler, duration),
            duration: duration
        };
    });
    timeoutPromise._timeoutData = timeoutData;
    return timeoutPromise;
}
exports.setTimeout = setTimeout;
exports.default = setTimeout;
