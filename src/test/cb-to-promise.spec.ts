import {cbToPromise} from '../cb-to-promise';


describe('cbToPromise(cbFn(...args, cb)) -> pFn(...args) -> promise', () => {

  it('accepts a function that expects a callback, and wraps it with a function that converts the callback to a returned promise', () =>
    cbToPromise((cb: (err: null, val: string) => void) => cb(null, 'val'))()
      .then(v => { expect(v).toBe('val') }));

  it('will cause the promise to reject with a give error if passed as the callback\'s first argument', () =>
    cbToPromise((cb: (err: Error, val: string) => void) => cb(new Error('err'), 'val'))()
      .catch((err: Error) => { expect(err.message).toBe('err') }));

  it('collect callback arguments into an array if more than one is supplied', () =>
    cbToPromise((cb: (err: null, val1: string, val2: string) => void) => cb(null, 'val1', 'val2'))()
      .then(([val1, val2]) => { expect(val1).toBe('val1'); expect(val2).toBe('val2') }));
    
  it('pass function arguments through correctly', () =>
    cbToPromise((a1: number, cb: (err: null, val1: number, val2: string) => void) => cb(null, a1, 'val2'))(30)
      .then(([val1, val2]) => { expect(val1).toBe(30); expect(val2).toBe('val2') }));
});
