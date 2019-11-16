"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exec_1 = require("./exec");
function series(tasks) {
    var isArray = typeof tasks.length === 'number';
    var props = isArray
        ? tasks.map(function (_, i) { return i; })
        : Object.keys(tasks);
    var i = 0;
    var results = isArray ? [] : {};
    var rec = function () {
        var prop = props[i++];
        var fn = tasks[prop];
        return prop !== undefined ?
            exec_1.exec(fn).then(function (v) { results[prop] = v; }).then(rec) :
            Promise.resolve(results);
    };
    return rec();
}
exports.series = series;
;
exports.default = series;
