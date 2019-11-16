import { exec, UnExec } from './exec'

export function seriesReduce <V, R>(
  items: V[],
  fn: (memo: R, item: V, index: number, items: V[]) => UnExec<R>,
  memo?: R
): Promise<R>;
export function seriesReduce <V, R>(
  items: { [s: string]: V },
  fn: (memo: R, item: V, prop: string, items: { [s: string]: V }) => UnExec<R>,
  memo?: R
): Promise<R>;
export function seriesReduce (items: any, fn: any, memo: any): any {
  const isArray = typeof items.length === 'number'
  const props = isArray ? items.map((_: any, i: number) => i) : Object.keys(items)
  const tasks: any = isArray ? [] : {}
  for (const prop of props) {
    tasks[prop] = (previousValue: any): any => fn(previousValue, items[prop], prop, items)
  }
  let i = 0
  let result = memo
  const rec = (): Promise<any> => {
    const prop = props[i++]
    const fn = tasks[prop]
    return prop !== undefined
      ? exec(fn(result)).then(v => { result = v }).then(rec)
      : Promise.resolve(result)
  }
  return rec()
};

export default seriesReduce
