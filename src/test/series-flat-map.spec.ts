import { setTimeout } from '../set-timeout'
import { seriesFlatMap } from '../series-flat-map'

describe('seriesFlatMap(items, worker(item) -> promise([vals])) -> promise([vals])', () => {
  it('processes item arrays, executing the worker on each item and resolves the flat mapped results', () => {
    const items = [1, 2, 3, 4]
    return seriesFlatMap(items, i => setTimeout(() => [i, i + 1], 10)).then(d =>
      expect(d).toEqual([1, 2, 2, 3, 3, 4, 4, 5]))
  })

  it('processes item objects, executing the worker on each item and resolves the flat mapped results', () => {
    const items = { a: 1, b: 2, c: 3, d: 4 }
    return seriesFlatMap(items, (i, k) => setTimeout(() => ({
      [k]: i,
      [k + '1']: i + 1
    }), 10)).then(d =>
      expect(d).toEqual({ a: 1, a1: 2, b: 2, b1: 3, c: 3, c1: 4, d: 4, d1: 5 }))
  })

  it('can handle empty items array', () => {
    const items: any[] = []
    return seriesFlatMap(items, i => [i, i + 1]).then(r =>
      expect(r).toEqual([]))
  })

  it('can handle empty items object', () => {
    const items = {}
    return seriesFlatMap(items, (i, k) => ({
      [k]: i,
      [k + '1']: i
    })).then(r =>
      expect(r).toEqual({}))
  })

  it('passes the itemIndex and items array as a second and third argument', () => {
    const items = [0, 1, 2]
    return seriesFlatMap(items, (item, index, _items) => {
      expect(item).toBe(index)
      expect(items).toEqual(_items)
      return []
    })
  })
})
