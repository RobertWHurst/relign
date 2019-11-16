"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exec_1 = require("./exec");
var IntervalPromise = /** @class */ (function () {
    function IntervalPromise(executorOrPromise) {
        this._promise = executorOrPromise instanceof Promise
            ? executorOrPromise
            : new Promise(executorOrPromise);
    }
    IntervalPromise.prototype.then = function (onfulfilled, onrejected) {
        var p = new IntervalPromise(this._promise.then(onfulfilled, onrejected));
        p._intervalData = this._intervalData;
        return p;
    };
    IntervalPromise.prototype.catch = function (onrejected) {
        var p = new IntervalPromise(this._promise.catch(onrejected));
        p._intervalData = this._intervalData;
        return p;
    };
    IntervalPromise.prototype.finally = function (onfinally) {
        var p = new IntervalPromise(this._promise.finally(onfinally));
        p._intervalData = this._intervalData;
        return p;
    };
    IntervalPromise.prototype.reset = function (duration) {
        clearInterval(this._intervalData.intervalId);
        this._intervalData.intervalId = global.setInterval(this._intervalData.intervalHandler, duration !== undefined
            ? duration
            : this._intervalData.duration);
        return this;
    };
    IntervalPromise.prototype.clear = function (fn) {
        clearInterval(this._intervalData.intervalId);
        exec_1.exec(fn, this)
            .then(this._intervalData.resolve)
            .catch(this._intervalData.reject);
        return this;
    };
    return IntervalPromise;
}());
exports.IntervalPromise = IntervalPromise;
function setInterval(fn, duration) {
    var intervalData;
    var intervalPromise = new IntervalPromise(function (resolve, reject) {
        var intervalId;
        var intervalHandler = function () {
            try {
                fn.call(intervalPromise);
            }
            catch (err) {
                clearInterval(intervalId);
                reject(err);
            }
        };
        intervalId = global.setInterval(intervalHandler, duration);
        intervalData = {
            resolve: resolve,
            reject: reject,
            intervalHandler: intervalHandler,
            intervalId: intervalId,
            duration: duration
        };
    });
    intervalPromise._intervalData = intervalData;
    return intervalPromise;
}
exports.setInterval = setInterval;
exports.default = setInterval;
