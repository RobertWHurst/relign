import { parallel } from './parallel'
import { UnExec } from './exec'

export function parallelMap<V, R>(
  items: V[],
  fn: (item: V, index: number, items: { [k: string]: V }) => UnExec<R>
): Promise<R[]>
export function parallelMap<V, R>(
  items: { [k: string]: V },
  fn: (item: V, prop: string, items: { [k: string]: V }) => UnExec<R>
): Promise<{ [k: string]: R }>
export function parallelMap (items: any, fn: any): any {
  const isArray = typeof items.length === 'number'
  const tasks: any = isArray ? [] : {}
  const props = isArray ? items.map((_: any, index: number) => index) : Object.keys(items)
  for (const prop of props) {
    tasks[prop] = (): any => fn(items[prop], prop, items)
  }
  return parallel(tasks)
};

export default parallelMap
