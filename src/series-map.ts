import { series } from './series'
import { UnExec } from './exec'

export function seriesMap <V, R>(
  items: V[],
  fn: (value: V, index: number, items: V[]) => UnExec<R>
): Promise<R>
export function seriesMap <V, R>(
  items: { [k: string]: V },
  fn: (value: V, prop: string, items: { [k: string]: V }) => UnExec<R>
): Promise<R>
export function seriesMap (items: any, fn: any): any {
  const isArray = typeof items.length === 'number'
  const tasks: any = isArray ? [] : {}
  const props = isArray ? items.map((_: any, i: number) => i) : Object.keys(items)
  for (const prop of props) {
    tasks[prop] = (): any => fn(items[prop], prop, items)
  }
  return series(tasks)
};

export default seriesMap
