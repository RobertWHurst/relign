"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var exec_1 = require("./exec");
var TimeoutPromise = /** @class */ (function (_super) {
    __extends(TimeoutPromise, _super);
    function TimeoutPromise(fn, duration) {
        var _this = this;
        if (typeof fn === 'number') {
            duration = fn;
            fn = undefined;
        }
        var timeoutData = null;
        _this = _super.call(this, function (resolve, reject) {
            timeoutData = { resolve: resolve, reject: reject, fn: fn, duration: duration };
            if (typeof duration === 'number') {
                timeoutData.timeoutId = global.setTimeout(function () {
                    exec_1.exec(fn).then(resolve).catch(reject);
                }, duration);
            }
            else {
                fn(resolve, reject);
            }
        }) || this;
        _this._parent = null;
        _this._timeoutData = timeoutData;
        return _this;
    }
    Object.defineProperty(TimeoutPromise.prototype, "_timeoutData", {
        get: function () {
            return this._parent ? this._parent._timeoutData : this.__timeoutData;
        },
        set: function (timeoutData) {
            this.__timeoutData = timeoutData;
        },
        enumerable: true,
        configurable: true
    });
    TimeoutPromise.prototype.then = function (onfulfilled, onrejected) {
        var promise = _super.prototype.then.call(this, onfulfilled, onrejected);
        promise._parent = this;
        return promise;
    };
    TimeoutPromise.prototype.clear = function (val) {
        var timeoutData = this._timeoutData;
        global.clearTimeout(timeoutData.timeoutId);
        timeoutData.resolve(val);
        return this;
    };
    TimeoutPromise.prototype.reset = function () {
        var timeoutData = this._timeoutData;
        global.clearTimeout(timeoutData.timeoutId);
        timeoutData.timeoutId = global.setTimeout(function () {
            exec_1.exec(timeoutData.fn).then(timeoutData.resolve).catch(timeoutData.reject);
        }, timeoutData.duration);
        return this;
    };
    return TimeoutPromise;
}(Promise));
var setTimeout = function (fn, d) {
    if (d === void 0) { d = 0; }
    return new TimeoutPromise(fn, d);
};
exports = module.exports = setTimeout;
exports.TimeoutPromise = TimeoutPromise;
