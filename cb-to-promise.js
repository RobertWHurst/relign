"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
function cbToPromise(cbFn) {
    if (!(cbFn instanceof Function)) {
        throw new Error('cbFn must be a function');
    }
    if (cbFn.length < 1) {
        throw new Error('cbFn must take a callback');
    }
    var pfn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            cbFn.apply(void 0, __spreadArrays(args, [function (err) {
                    var results = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        results[_i - 1] = arguments[_i];
                    }
                    if (err) {
                        return reject(err);
                    }
                    if (results.length === 0) {
                        return resolve();
                    }
                    resolve(results.length === 1 ? results[0] : results);
                }]));
        });
    };
    return pfn;
}
exports.cbToPromise = cbToPromise;
;
var foo = cbToPromise(function (foo, cb) { return cb(null, foo, 1); });
exports.default = cbToPromise;
