import { setTimeout } from '../set-timeout'
import { seriesMap } from '../series-map'

describe('seriesMap(items, worker(item) -> promise(val)) -> promise(val)', () => {
  it('processes item arrays, executing the worker on each item and resolves the mapped results', () => {
    const items = [1, 2, 3, 4]
    return seriesMap(items, i => setTimeout(() => i + 1, 10)).then(d =>
      expect(d).toEqual([2, 3, 4, 5]))
  })

  it('processes item objects, executing the worker on each item and resolves the mapped results', () => {
    const items = { a: 1, b: 2, c: 3, d: 4 }
    return seriesMap(items, i => setTimeout(() => i + 1, 10)).then(d =>
      expect(d).toEqual({ a: 2, b: 3, c: 4, d: 5 }))
  })

  it('can handle empty items array', () => {
    const items: any[] = []
    return seriesMap(items, i => i).then(r =>
      expect(r).toEqual([]))
  })

  it('can handle empty items object', () => {
    const items = {}
    return seriesMap(items, i => i).then(r =>
      expect(r).toEqual({}))
  })

  it('passes the itemIndex and items array as a second and third argument', () => {
    const items = [0, 1, 2]
    return seriesMap(items, (item, index, _items) => {
      expect(item).toBe(index)
      expect(items).toBe(_items)
    })
  })
})
