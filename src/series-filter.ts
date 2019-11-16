import seriesMap from './series-map'
import { UnExec } from './exec'

export function seriesFilter <V>(
  items: V[],
  testFn: (item: V, prop: number, items: V[]) => UnExec<unknown>
): Promise<V>;
export function seriesFilter <V>(
  items: { [k: string]: V },
  testFn: (item: V, prop: string, items: { [k: string]: V }) => UnExec<unknown>
): Promise<V>;
export function seriesFilter (items: any, testFn: any): any {
  const isArray = typeof items.length === 'number'
  const results: any = isArray ? [] : {}
  return seriesMap(items, testFn).then((testResults: any) => {
    for (const prop in testResults) {
      if (testResults[prop]) {
        if (isArray) {
          results.push(items[prop])
        } else {
          results[prop] = items[prop]
        }
      }
    }
    return results
  })
}

export default seriesFilter
