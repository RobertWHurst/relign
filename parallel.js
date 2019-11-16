"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exec_1 = require("./exec");
function parallel(tasks) {
    var results = tasks instanceof Array ? [] : {};
    var props = Object.keys(tasks);
    var promises = props.map(function (p) { return exec_1.exec(tasks[p]).then(function (v) { results[p] = v; }); });
    return Promise.all(promises).then(function () { return results; });
}
exports.parallel = parallel;
;
exports.default = parallel;
