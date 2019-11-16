import { exec, Exec } from './exec';

type PrevIndex<I extends number> = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99][I];
type Length<T extends any[]> = T extends { length: infer L } ? L : never

export type Tasks = { [key: string]: [any, ...any[]] };
export type TaskFn<T extends any[]> = T[PrevIndex<Length<T>>];
export type TaskValue<T extends any[]> = Exec<TaskFn<T>>;
export type TaskValues<T extends Tasks> = { [K in keyof T]: TaskValue<T[K]> }

export function auto<T extends Tasks>(tasks: T): Promise<TaskValues<T>> {
  const results: TaskValues<T> = {} as any;

  const executeNextTasks = (): Promise<TaskValues<T>> => {
    const nextTaskNames = Object.keys(tasks)
      .filter(n => tasks[n] && typeof tasks[n][0] === 'function');

    if (nextTaskNames.length < 0) {
      return Promise.resolve({} as any);
    }

    const promises = nextTaskNames.map((nextTaskName) => {
      const task = tasks[nextTaskName];
      delete tasks[nextTaskName];

      return exec(task[0])
        .then((value) => {
          (results as any)[nextTaskName] = value;
        })
        .then(() => {
          for (const taskName in tasks) {
            const task = tasks[taskName];
            const i    = task.indexOf(nextTaskName);
            if (i > -1) { task.splice(i, 1); }
          }
        })
        .then(executeNextTasks);
    });

    return Promise.all(promises).then(() => results);
  }

  const checkDep = (parentTaskName: string, taskName: string): Promise<TaskValues<T>> | void => {
    if (!tasks[taskName]) {
      return Promise.reject(new Error(
        `The task ${parentTaskName} is depends upon a task named ${taskName}, ` +
        `but ${taskName} does not exist`
      ));
    }
    for (const depTaskName of tasks[taskName]) {
      if (typeof depTaskName === 'string') {
        if (depTaskName === parentTaskName) {
          return Promise.reject(new Error(
            `${parentTaskName} has a circular dependency on ${taskName}`
          ));
        }
        checkDep(parentTaskName, depTaskName);
      }
    }
  };

  const taskNames = Object.keys(tasks);
  for (const taskName of taskNames) {
    for (const depTaskName of tasks[taskName]) {
      if (typeof depTaskName === 'string') {
        const rejectedPromise = checkDep(taskName, depTaskName);
        if (rejectedPromise) {
          return rejectedPromise;
        }
      }
    }
  }

  return executeNextTasks();
};

export default auto;
