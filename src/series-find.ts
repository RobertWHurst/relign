import { exec, UnExec } from './exec'

export function seriesFind <V>(
  items: V[],
  testFn: (item: V, prop: number, items: V[]) => UnExec<unknown>
): Promise<V | undefined>;
export function seriesFind <V>(
  items: { [k: string]: V },
  testFn: (item: V, prop: string, items: { [k: string]: V }) => UnExec<unknown>
): Promise<V | undefined>;
export function seriesFind (items: any, testFn: any): any {
  const isArray = typeof items.length === 'number'
  const props = isArray ? items.map((_: any, i: number) => i) : Object.keys(items)
  let i = 0
  const rec = (): any => {
    const prop = props[i++]
    const item = items[prop]
    if (!item) { return Promise.resolve() }
    return exec(testFn(item, prop, items)).then((ok: boolean) => {
      if (!ok) { return rec() }
      return item
    })
  }

  return rec()
};

export default seriesFind
