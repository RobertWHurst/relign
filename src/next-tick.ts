import { exec, Exec } from './exec'

export function nextTick <V>(fn: V): Promise<Exec<V>>;
export function nextTick (): Promise<undefined>;
export function nextTick (fn?: any): any {
  return new Promise((resolve, reject) =>
    process.nextTick(() =>
      exec(fn).then(resolve).catch(reject)))
}

export default nextTick
