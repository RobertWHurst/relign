import { exec, Exec } from './exec'

export function series <V1>(tasks: [V1]): Promise<[Exec<V1>]>
export function series <V1, V2>(tasks: [V1, V2]): Promise<[Exec<V1>, Exec<V2>]>
export function series <V1, V2, V3>(tasks: [V1, V2, V3]): Promise<[Exec<V1>, Exec<V2>, Exec<V3>]>
export function series <V1, V2, V3, V4>(
  tasks: [V1, V2, V3, V4]
): Promise<[Exec<V1>, Exec<V2>, Exec<V3>, Exec<V4>]>
export function series <V1, V2, V3, V4, V5>(
  tasks: [V1, V2, V3, V4, V5]
): Promise<[Exec<V1>, Exec<V2>, Exec<V3>, Exec<V4>, Exec<V5>]>
export function series <V1, V2, V3, V4, V5, V6>(
  tasks: [V1, V2, V3, V4, V5, V6]
): Promise<[Exec<V1>, Exec<V2>, Exec<V3>, Exec<V4>, Exec<V5>, Exec<V6>]>
export function series <V1, V2, V3, V4, V5, V6, V7>(
  tasks: [V1, V2, V3, V4, V5, V6, V7]
): Promise<[Exec<V1>, Exec<V2>, Exec<V3>, Exec<V4>, Exec<V5>, Exec<V6>, Exec<V7>]>
export function series <V1, V2, V3, V4, V5, V6, V7, V8>(
  tasks: [V1, V2, V3, V4, V5, V6, V7, V8]
): Promise<[Exec<V1>, Exec<V2>, Exec<V3>, Exec<V4>, Exec<V5>, Exec<V6>, Exec<V7>, Exec<V8>]>
export function series <V1, V2, V3, V4, V5, V6, V7, V8, V9>(
  tasks: [V1, V2, V3, V4, V5, V6, V7, V8, V9]
): Promise<[
  Exec<V1>,
  Exec<V2>,
  Exec<V3>,
  Exec<V4>,
  Exec<V5>,
  Exec<V6>,
  Exec<V7>,
  Exec<V8>,
  Exec<V9>
]>
export function series <V1, V2, V3, V4, V5, V6, V7, V8, V9, T10>(
  tasks: [V1, V2, V3, V4, V5, V6, V7, V8, V9, T10]
): Promise<[
  Exec<V1>,
  Exec<V2>,
  Exec<V3>,
  Exec<V4>,
  Exec<V5>,
  Exec<V6>,
  Exec<V7>,
  Exec<V8>,
  Exec<V9>,
  Exec<T10>
]>
export function series <V extends {}>(tasks: V): Promise<{ [K in keyof V]: Exec<V[K]> }>
export function series (tasks: any): any {
  const isArray = typeof tasks.length === 'number'
  const props = isArray
    ? tasks.map((_: any, i: number) => i)
    : Object.keys(tasks)

  let i = 0
  const results: any = isArray ? [] : {}
  const rec = (): any => {
    const prop = props[i++]
    const fn = tasks[prop]
    return prop !== undefined
      ? exec(fn).then((v: any) => { results[prop] = v }).then(rec)
      : Promise.resolve(results)
  }

  return rec()
};

export default series
