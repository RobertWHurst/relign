import { exec } from './exec'

export function parallelLimit (tasks: any, limit: number): any {
  const isArray = typeof tasks.length === 'number'
  const results: any = isArray ? [] : {}
  const props = isArray ? tasks.map((_: any, i: number) => i) : Object.keys(tasks)
  const firstProps = props.splice(0, limit)

  const promises = firstProps.map((firstProp: any) => {
    return exec(tasks[firstProp]).then((val) => {
      results[firstProp] = val
      const nextProp = props.shift()
      return nextProp !== undefined
        ? exec(tasks[nextProp]).then(v => { results[nextProp] = v })
        : Promise.resolve()
    })
  })

  return Promise.all(promises).then(() => results)
};

export default parallelLimit
