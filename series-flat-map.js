"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var series_1 = require("./series");
function seriesFlatMap(items, fn) {
    var isArray = typeof items.length === 'number';
    var props = isArray ? items.map(function (_, i) { return i; }) : Object.keys(items);
    var tasks = props.map(function (prop) { return fn(items[prop], prop, items); });
    var results = isArray ? [] : {};
    return series_1.series(tasks).then(function (resultSets) {
        for (var _i = 0, resultSets_1 = resultSets; _i < resultSets_1.length; _i++) {
            var resultSet = resultSets_1[_i];
            if (resultSet) {
                isArray ? results.push.apply(results, resultSet) : Object.assign(results, resultSet);
            }
        }
        return results;
    });
}
exports.seriesFlatMap = seriesFlatMap;
;
exports.default = seriesFlatMap;
