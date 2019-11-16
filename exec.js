"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function exec(fn, fnCtx) {
    try {
        var val = typeof fn === 'function' ? fn.call(fnCtx) : fn;
        if (typeof val !== 'object' || typeof val.then !== 'function') {
            return Promise.resolve(val);
        }
        return val;
    }
    catch (err) {
        return Promise.reject(err);
    }
}
exports.exec = exec;
;
exports.default = exec;
