import { nextTick } from '../next-tick'
import { series } from '../series'

describe('series(tasks) -> promise(results)', () => {
  it('runs an array of promise returning functions and resolves with all of the results', () =>
    series([
      1,
      (): number => 2,
      (): Promise<number> => new Promise(resolve => setTimeout(() => resolve(3), 100))
    ]).then(results => expect(results).toEqual([1, 2, 3])))

  it('runs an object of promise returning functions and resolves with all of the results', () =>
    series({
      a: 1,
      b: (): number => 2,
      c: (): Promise<number> => new Promise(resolve => setTimeout(() => resolve(3), 100))
    }).then(results => expect(results).toEqual({ a: 1, b: 2, c: 3 })))

  it('runs all the functions in series', () => {
    let count = 0
    return series([
      (): Promise<void> => { count += 1; return nextTick(() => { count -= 1 }) },
      (): Promise<void> => { count += 1; return nextTick(() => { count -= 1 }) },
      (): Promise<void> => { count += 1; return nextTick(() => { count -= 1 }) },
      (): void => { expect(count).toBe(0) }
    ]).then(() => expect(count).toBe(0))
  })

  it('captures a thrown error', () =>
    series({
      a: 1,
      b: (): number => 2,
      c: (): number => { throw new Error('error') }
    }).catch(err => expect(err.message).toBe('error')))

  it('can handle an empty tasks array', () =>
    series([]).then(r => expect(r).toEqual([])))

  it('can handle an empty tasks object', () =>
    series({}).then(r => expect(r).toEqual({})))
})
