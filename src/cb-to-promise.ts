export type FnWithVariaticCb<V extends [any, any, ...any[]]> =
  (cb: (err: any, ...values: V) => void) => void;
export type FnWithVariaticCb1<A1, V extends [any, any, ...any[]]> =
  (a1: A1, cb: (err: any, ...values: V) => void) => void;
export type FnWithVariaticCb2<A1, A2, V extends [any, any, ...any[]]> =
  (a1: A1, a2: A2, cb: (err: any, ...values: V) => void) => void;
export type FnWithVariaticCb3<A1, A2, A3, V extends [any, any, ...any[]]> =
  (a1: A1, a2: A2, a3: A3, cb: (err: any, ...values: V) => void) => void;
export type FnWithVariaticCb4<A1, A2, A3, A4, V extends [any, any, ...any[]]> =
  (a1: A1, a2: A2, a3: A3, a4: A4, cb: (err: any, ...values: V) => void) => void;
export type FnWithVariaticCb5<A1, A2, A3, A4, A5, V extends [any, any, ...any[]]> =
  (a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, cb: (err: any, ...values: V) => void) => void;
export type FnWithVariaticCb6<A1, A2, A3, A4, A5, A6, V extends [any, any, ...any[]]> =
  (a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, a6: A6, cb: (err: any, ...values: V) => void) => void;

export type FnWithCb<V> = (cb: (err: any, value: V) => void) => void;
export type FnWithCb1<A1, V> = (a1: A1, cb: (err: any, value: V) => void) => void;
export type FnWithCb2<A1, A2, V> = (a1: A1, a2: A2, cb: (err: any, value: V) => void) => void;
export type FnWithCb3<A1, A2, A3, V> =
  (a1: A1, a2: A2, a3: A3, cb: (err: any, value: V) => void) => void;
export type FnWithCb4<A1, A2, A3, A4, V> =
  (a1: A1, a2: A2, a3: A3, a4: A4, cb: (err: any, value: V) => void) => void;
export type FnWithCb5<A1, A2, A3, A4, A5, V> =
  (a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, cb: (err: any, value: V) => void) => void;
export type FnWithCb6<A1, A2, A3, A4, A5, A6, V> =
  (a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, a6: A6, cb: (err: any, value: V) => void) => void;

export function cbToPromise<V extends [any, any, ...any[]]>(
  cbFn: FnWithVariaticCb<V>
): () => Promise<V>;
export function cbToPromise<V>(
  cbFn: FnWithCb<V>
): () => Promise<V>;
export function cbToPromise<A1, V extends [any, any, ...any[]]>(
  cbFn: FnWithVariaticCb1<A1, V>
): (a1: A1) => Promise<V>;
export function cbToPromise<A1, V>(
  cbFn: FnWithCb1<A1, V>
): (a1: A1) => Promise<V>;
export function cbToPromise<A1, A2, V extends [any, any, ...any[]]>(
  cbFn: FnWithVariaticCb2<A1, A2, V>
): (a1: A1, a2: A2) => Promise<V>;
export function cbToPromise<A1, A2, V>(
  cbFn: FnWithCb2<A1, A2, V>
): (a1: A1, a2: A2) => Promise<V>;
export function cbToPromise<A1, A2, A3, V extends [any, any, ...any[]]>(
  cbFn: FnWithVariaticCb3<A1, A2, A3, V>
): (a1: A1, a2: A2, a3: A3) => Promise<V>;
export function cbToPromise<A1, A2, A3, V>(
  cbFn: FnWithCb3<A1, A2, A3, V>
): (a1: A1, a2: A2, a3: A3) => Promise<V>;
export function cbToPromise<A1, A2, A3, A4, V extends [any, any, ...any[]]>(
  cbFn: FnWithVariaticCb4<A1, A2, A3, A4, V>
): (a1: A1, a2: A2, a3: A3, a4: A4) => Promise<V>;
export function cbToPromise<A1, A2, A3, A4, V>(
  cbFn: FnWithCb4<A1, A2, A3, A4, V>
): (a1: A1, a2: A2, a3: A3, a4: A4) => Promise<V>;
export function cbToPromise<A1, A2, A3, A4, A5, V extends [any, any, ...any[]]>(
  cbFn: FnWithVariaticCb5<A1, A2, A3, A4, A5, V>
): (a1: A1, a2: A2, a3: A3, a4: A4, a5: A5) => Promise<V>;
export function cbToPromise<A1, A2, A3, A4, A5, V>(
  cbFn: FnWithCb5<A1, A2, A3, A4, A5, V>
): (a1: A1, a2: A2, a3: A3, a4: A4, a5: A5) => Promise<V>;
export function cbToPromise<A1, A2, A3, A4, A5, A6, V extends [any, any, ...any[]]>(
  cbFn: FnWithVariaticCb6<A1, A2, A3, A4, A5, A6, V>
): (a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, a6: A6) => Promise<V>;
export function cbToPromise<A1, A2, A3, A4, A5, A6, V>(
  cbFn: FnWithCb5<A1, A2, A3, A4, A5, V>
): (a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, a6: A6) => Promise<V>;
export function cbToPromise(cbFn: (...args: any[]) => void): (...args: any[]) => Promise<any>;

export function cbToPromise(cbFn: unknown) {
  if (!(cbFn instanceof Function)) {
    throw new Error('cbFn must be a function');
  }
  if (cbFn.length < 1) {
    throw new Error('cbFn must take a callback');
  }

  const pfn = (...args: any[]) => new Promise((resolve, reject) => {
    cbFn(...args, (err: any, ...results: any[]) => {
      if (err) { return reject(err); }
      if (results.length === 0) { return resolve(); }
      resolve(results.length === 1 ? results[0] : results);
    });
  });
  return pfn;
};

const foo = cbToPromise((foo: number, cb: (err: any, val1: number, val2: number) => void) => cb(null, foo, 1))

export default cbToPromise;