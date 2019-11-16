"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exec_1 = require("./exec");
function seriesFind(items, tester) {
    var isArray = typeof items.length === 'number';
    var props = Object.keys(items).map(function (p, i) { return isArray ? i : p; });
    var i = 0;
    var rec = function () {
        var prop = props[i++];
        var item = items[prop];
        if (!item) {
            return Promise.resolve();
        }
        return exec_1.exec(tester(item, prop, items)).then(function (ok) {
            if (!ok) {
                return rec();
            }
            return item;
        });
    };
    return rec();
}
exports.seriesFind = seriesFind;
;
exports.default = seriesFind;
