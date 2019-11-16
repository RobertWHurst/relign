"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exec_1 = require("./exec");
function nextTick(fn) {
    return new Promise(function (resolve, reject) {
        return process.nextTick(function () {
            return exec_1.exec(fn).then(resolve).catch(reject);
        });
    });
}
exports.nextTick = nextTick;
exports.default = nextTick;
