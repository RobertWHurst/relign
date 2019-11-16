import { exec, Exec } from './exec'

export function parallel <T1>(tasks: [T1]): Promise<[Exec<T1>]>
export function parallel <T1, T2>(tasks: [T1, T2]): Promise<[Exec<T1>, Exec<T2>]>
export function parallel <T1, T2, T3>(tasks: [T1, T2, T3]): Promise<[Exec<T1>, Exec<T2>, Exec<T3>]>
export function parallel <T1, T2, T3, T4>(
  tasks: [T1, T2, T3, T4]
): Promise<[Exec<T1>, Exec<T2>, Exec<T3>, Exec<T4>]>
export function parallel <T1, T2, T3, T4, T5>(
  tasks: [T1, T2, T3, T4, T5]
): Promise<[Exec<T1>, Exec<T2>, Exec<T3>, Exec<T4>, Exec<T5>]>
export function parallel <T1, T2, T3, T4, T5, T6>(
  tasks: [T1, T2, T3, T4, T5, T6]
): Promise<[Exec<T1>, Exec<T2>, Exec<T3>, Exec<T4>, Exec<T5>, Exec<T6>]>
export function parallel <T1, T2, T3, T4, T5, T6, T7>(
  tasks: [T1, T2, T3, T4, T5, T6, T7]
): Promise<[Exec<T1>, Exec<T2>, Exec<T3>, Exec<T4>, Exec<T5>, Exec<T6>, Exec<T7>]>
export function parallel <T1, T2, T3, T4, T5, T6, T7, T8>(
  tasks: [T1, T2, T3, T4, T5, T6, T7, T8]
): Promise<[Exec<T1>, Exec<T2>, Exec<T3>, Exec<T4>, Exec<T5>, Exec<T6>, Exec<T7>, Exec<T8>]>
export function parallel <T1, T2, T3, T4, T5, T6, T7, T8, T9>(
  tasks: [T1, T2, T3, T4, T5, T6, T7, T8, T9]
): Promise<[Exec<T1>, Exec<T2>, Exec<T3>, Exec<T4>, Exec<T5>, Exec<T6>, Exec<T7>, Exec<T8>, Exec<T9>]>
export function parallel <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
  tasks: [T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]
): Promise<[
  Exec<T1>,
  Exec<T2>,
  Exec<T3>,
  Exec<T4>,
  Exec<T5>,
  Exec<T6>,
  Exec<T7>,
  Exec<T8>,
  Exec<T9>,
  Exec<T10>
]>
export function parallel <T extends {}>(tasks: T): Promise<{ [K in keyof T]: Exec<T[K]> }>
export function parallel (tasks: any): any {
  const results: any = tasks instanceof Array ? [] : {}
  const props = Object.keys(tasks)
  const promises = props.map(p => exec(tasks[p]).then(v => { results[p] = v }))
  return Promise.all(promises).then(() => results)
};

export default parallel
