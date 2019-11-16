import { setTimeout } from '../set-timeout'

describe('setTimeout(fn() -> promise(val), duration) -> timeoutPromise(val)', () => {
  it('executes the fn once the duration elapses then resolves the value resolved by the fn', async () => {
    const executor = jest.fn(() => Promise.resolve('val'))

    jest.useFakeTimers()
    const promise = setTimeout(executor, 10).then(v => `{${v}}`)
    jest.advanceTimersToNextTimer()
    jest.useRealTimers()
    const val = await promise

    expect(val).toBe('{val}')
  })
})

describe('setTimeout(fn() -> val, duration) -> timeoutPromise(val)', () => {
  it('executes the fn once the duration elapses then resolves the value returned by the fn', async () => {
    const executor = jest.fn(() => 'val')

    jest.useFakeTimers()
    const promise = setTimeout(executor, 10).then(v => `{${v}}`)
    jest.advanceTimersToNextTimer()
    jest.useRealTimers()
    const val = await promise

    expect(val).toBe('{val}')
  })
})

describe('setTimeout(val, duration) -> timeoutPromise(val)', () => {
  it('resolves the value given after the duration elapses', async () => {
    jest.useFakeTimers()
    const promise = setTimeout('val', 10).then(v => `{${v}}`)
    jest.advanceTimersToNextTimer()
    jest.useRealTimers()
    const val = await promise

    expect(val).toBe('{val}')
  })
})

describe('setTimeout(duration) -> timeoutPromise()', () => {
  it('resolves after the duration elapses', async () => {
    jest.useFakeTimers()
    const promise = setTimeout(10)
    jest.advanceTimersToNextTimer()
    jest.useRealTimers()
    const val = await promise

    expect(val).toBe(undefined)
  })
})

describe('new TimeoutPromise(fn, duration)', () => {
  describe('#clear(newVal) -> this', () => {
    it('prevents the timeout fn from being called and causes the timeoutPromise to resolve newVal immediately', async () => {
      jest.useFakeTimers()
      const promise = setTimeout('val', 10)
      promise.clear('newVal')
      jest.advanceTimersToNextTimer()
      jest.useRealTimers()

      const val = await promise

      expect(val).toBe('newVal')
    })
  })

  describe('#clear() -> this', () => {
    it('prevents the timeout fn from being called and causes the timeoutPromise to resolve immediately', async () => {
      jest.useFakeTimers()
      const promise = setTimeout('val', 10)
      promise.clear()
      jest.advanceTimersToNextTimer()
      jest.useRealTimers()

      const val = await promise

      expect(val).toBe(undefined)
    })
  })

  describe('#reset() -> this', () => {
    it('pospones the execution of the timeout fn', (done) => {
      const cb = jest.fn(v => v)

      const promise = setTimeout('val', 10).then(cb)
      promise.reset(20)

      setTimeout(() => {
        expect(cb).not.toBeCalled()

        setTimeout(() => {
          jest.useRealTimers()

          expect(cb).toBeCalled()
          expect(cb).toBeCalledWith('val')

          done()
        }, 10)
      }, 15)
    })
  })
})
