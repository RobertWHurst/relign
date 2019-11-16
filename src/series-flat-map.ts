import { UnExec } from './exec'
import { series } from './series'

export function seriesFlatMap <V, R>(
  items: V[],
  fn: (item: V, index: number, items: V[]) => UnExec<R | R[]>
): Promise<R[]>;
export function seriesFlatMap <V, R>(
  items: { [k: string]: V },
  fn: (item: V, prop: string, items: { [k: string]: V }) => UnExec<R | { [k: string]: R }>
): Promise<{ [k: string]: R }>;
export function seriesFlatMap (items: any, fn: any): any {
  const isArray = typeof items.length === 'number'

  const props = isArray ? items.map((_: any, i: number) => i) : Object.keys(items)
  const tasks: any = isArray ? [] : {}
  for (const prop of props) {
    tasks[prop] = (): any => fn(items[prop], prop, items)
  }
  const flattedResults: any = isArray ? [] : {}
  return series(tasks).then((results: any) => {
    for (const prop of props) {
      const result = results[prop]
      if (result === undefined) { continue }
      result && typeof result === 'object'
        ? isArray
          ? flattedResults.push(...result)
          : Object.assign(flattedResults, result)
        : isArray
          ? flattedResults.push(result)
          : (flattedResults[prop] = result)
    }
    return flattedResults
  })
};

export default seriesFlatMap
