export type Exec<V> =
  V extends () => PromiseLike<infer R> ? R :
  V extends () => infer R ? R :
  V extends PromiseLike<infer R> ? R :
  V;

export type UnExec<E> = 
  (() => PromiseLike<E>) |
  (() => E) |
  PromiseLike<E> |
  E;

export function exec<
  V,
  R,
  E extends Exec<R>,
  C extends {}
>(fn: (this: C) => R, fnCtx: C): Promise<E>;
export function exec<V, R, E extends Exec<R>>(fn: () => R): Promise<E>;
export function exec<V, E extends Exec<V>>(value: V): Promise<E>;
export function exec(): Promise<void>;
export function exec(fn?: any, fnCtx?: object) {
  try {
    const val = typeof fn === 'function' ? fn.call(fnCtx) : fn;
    if (typeof val !== 'object' || typeof val.then !== 'function') {
      return Promise.resolve(val);
    }
    return val;
  } catch (err) {
    return Promise.reject(err);
  }
};

export default exec;
