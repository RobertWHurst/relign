import { parallelLimit } from './parallel-limit'

export function parallelMapLimit (items: any, fn: any, limit: number): any {
  const isArray = typeof items.length === 'number'
  const tasks: any = isArray ? [] : {}
  const props = isArray ? items.map((_: any, i: number) => i) : Object.keys(items)
  for (const prop of props) {
    tasks[prop] = (): any => fn(items[prop], prop, items)
  }
  return parallelLimit(tasks, limit)
};

export default parallelMapLimit
