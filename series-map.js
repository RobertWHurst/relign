"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var series_1 = require("./series");
function seriesMap(items, fn) {
    var isArray = typeof items.length === 'number';
    var tasks = isArray ? [] : {};
    var props = isArray ? items.map(function (_, i) { return i; }) : Object.keys(items);
    var _loop_1 = function (prop) {
        tasks[prop] = function () { return fn(items[prop], prop, items); };
    };
    for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
        var prop = props_1[_i];
        _loop_1(prop);
    }
    return series_1.series(tasks);
}
exports.seriesMap = seriesMap;
;
exports.default = seriesMap;
