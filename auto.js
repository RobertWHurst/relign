"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exec_1 = require("./exec");
function auto(tasks) {
    var results = {};
    var executeNextTasks = function () {
        var nextTaskNames = Object.keys(tasks)
            .filter(function (n) { return tasks[n] && typeof tasks[n][0] === 'function'; });
        if (nextTaskNames.length < 0) {
            return Promise.resolve({});
        }
        var promises = nextTaskNames.map(function (nextTaskName) {
            var task = tasks[nextTaskName];
            delete tasks[nextTaskName];
            return exec_1.exec(task[0])
                .then(function (value) {
                results[nextTaskName] = value;
            })
                .then(function () {
                for (var taskName in tasks) {
                    var task_1 = tasks[taskName];
                    var i = task_1.indexOf(nextTaskName);
                    if (i > -1) {
                        task_1.splice(i, 1);
                    }
                }
            })
                .then(executeNextTasks);
        });
        return Promise.all(promises).then(function () { return results; });
    };
    var checkDep = function (parentTaskName, taskName) {
        if (!tasks[taskName]) {
            return Promise.reject(new Error("The task " + parentTaskName + " is depends upon a task named " + taskName + ", " +
                ("but " + taskName + " does not exist")));
        }
        for (var _i = 0, _a = tasks[taskName]; _i < _a.length; _i++) {
            var depTaskName = _a[_i];
            if (typeof depTaskName === 'string') {
                if (depTaskName === parentTaskName) {
                    return Promise.reject(new Error(parentTaskName + " has a circular dependency on " + taskName));
                }
                checkDep(parentTaskName, depTaskName);
            }
        }
    };
    var taskNames = Object.keys(tasks);
    for (var _i = 0, taskNames_1 = taskNames; _i < taskNames_1.length; _i++) {
        var taskName = taskNames_1[_i];
        for (var _a = 0, _b = tasks[taskName]; _a < _b.length; _a++) {
            var depTaskName = _b[_a];
            if (typeof depTaskName === 'string') {
                var rejectedPromise = checkDep(taskName, depTaskName);
                if (rejectedPromise) {
                    return rejectedPromise;
                }
            }
        }
    }
    return executeNextTasks();
}
exports.auto = auto;
;
exports.default = auto;
