import { UnExec } from './exec'
import { seriesMap } from './series-map'

export function seriesConcat <V, R>(
  items: V[],
  fn: (item: V, index: number, items: V[]) => UnExec<R | R[]>
): Promise<R[]>;
export function seriesConcat <V, R>(
  items: { [k: string]: V },
  fn: (item: V, prop: string, items: { [k: string]: V }
  ) => UnExec<R | R[]>): Promise<R[]>;
export function seriesConcat (items: any, fn: any): any {
  return seriesMap(items, fn).then((results: any) => {
    results = Object.values(results)
    return results[0] ? results[0].concat(...results.slice(1)) : results
  })
};

export default seriesConcat
