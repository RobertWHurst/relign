import { nextTick } from '../next-tick'
import { parallel } from '../parallel'

describe('parallel(tasks) -> promise(results)', () => {
  it('runs an array of promise returning functions and resolves with all of the results', () =>
    parallel([
      1,
      () => 2,
      () => new Promise<number>(r => setTimeout(() => r(3), 100))
    ]).then(results => expect(results).toEqual([1, 2, 3])))

  it('runs an object of promise returning functions and resolves with all of the results', () =>
    parallel({
      a: 1,
      b: () => 2,
      c: () => new Promise(r => setTimeout(() => r(3), 100))
    }).then(results => expect(results).toEqual({ a: 1, b: 2, c: 3 })))

  it('runs all the functions in parallel', () => {
    let count = 0
    return parallel([
      () => { count += 1; return nextTick(() => { count -= 1 }) },
      () => { count += 1; return nextTick(() => { count -= 1 }) },
      () => { count += 1; return nextTick(() => { count -= 1 }) },
      () => { expect(count).toBe(3) }
    ]).then(() => expect(count).toBe(0))
  })

  it('captures a thrown error', () =>
    parallel({
      a: 1,
      b: () => 2,
      c: () => { throw new Error('error') }
    }).catch(err => expect(err.message).toBe('error')))

  it('can handle an empty tasks array', () =>
    parallel([]).then(r => expect(r).toEqual([])))

  it('can handle an empty tasks object', () =>
    parallel({}).then(r => expect(r).toEqual({})))

  it('aborts early if a promise is rejected', () => {
    let bDone = false
    parallel({ a: Promise.reject(1), b: () => nextTick(() => { bDone = true }) })
      .catch(err => {
        expect(err).toBe(1)
        expect(bDone).toBe(false)
      })
  })
})
