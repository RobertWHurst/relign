"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exec_1 = require("./exec");
function seriesReduce(items, fn, initialValue) {
    var isArray = typeof items.length === 'number';
    var props = isArray ? items.map(function (_, i) { return i; }) : Object.keys(items);
    var tasks = isArray ? [] : {};
    var _loop_1 = function (prop) {
        tasks[prop] = function (previousValue) { return fn(previousValue, items[prop], prop, items); };
    };
    for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
        var prop = props_1[_i];
        _loop_1(prop);
    }
    var i = 0;
    var result = initialValue;
    var rec = function () {
        var prop = props[i++];
        var fn = tasks[prop];
        return prop !== undefined ?
            exec_1.exec(fn(result)).then(function (v) { result = v; }).then(rec) :
            Promise.resolve(result);
    };
    return rec();
}
exports.seriesReduce = seriesReduce;
;
exports.default = seriesReduce;
