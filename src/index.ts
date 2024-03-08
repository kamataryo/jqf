// @ts-ignore
import safeEval from 'safe-eval'
import * as pico from 'picocolors'

declare interface JqfOptions {
  rawStringOutput?: boolean
  minify?: boolean
  method?: string
}

const ERROR = pico.red('[error]')

const logics = {
  default: (jsons: any[], func: Function) => func(...jsons),
  // Array with callback
  map: (jsons: any[], func: Function) => jsons[0].map(func),
  flatMap: (jsons: any[], func: Function) => jsons[0].flatMap(func),
  reduce: (jsons: any[], func: Function, secondArg: any) =>
    jsons[0].reduce(func, secondArg),
  reduceRight: (jsons: any[], func: Function, secondArg: any) =>
    jsons[0].reduceRight(func, secondArg),
  find: (jsons: any[], func: Function) => jsons[0].find(func),
  filter: (jsons: any[], func: Function) => jsons[0].filter(func),
  some: (jsons: any[], func: Function) => jsons[0].some(func),
  every: (jsons: any[], func: Function) => jsons[0].every(func),
  // Object
  keys: (jsons: any[], func: any) =>
    (func === void 0 ? (x: any) => x : func)(Object.keys(jsons[0])),
  values: (jsons: any[], func: any) =>
    (func === void 0 ? (x: any) => x : func)(Object.values(jsons[0])),
  entries: (jsons: any[], func: any) =>
    (func === void 0 ? (x: any) => x : func)(Object.entries(jsons[0])),
  fromEntries: (jsons: any[], func: any) =>
    (func === void 0 ? (x: any) => x : func)(Object.fromEntries(jsons[0])),
  // Array
  flat: (jsons: any[], func: any) =>
    (func === void 0 ? (x: any) => x : func)(jsons[0].flat()),
}

export const allowedMethods = Object.keys(logics)

export default (
  inputs: string,
  functionString: string,
  secondArg: string,
  options: JqfOptions = {},
): string => {
  const { rawStringOutput = false, minify = false, method } = options

  const jsons: any[] = []
  inputs.split('\n').reduce((prev, line) => {
    const target = prev + line
    let json: object
    try {
      json = JSON.parse(target)
    } catch (e) {
      return target
    }
    jsons.push(json)
    return ''
  }, '')

  const func: Function = safeEval(functionString || 'x => x')

  let parsedSecondArg = void 0
  if (secondArg) {
    try {
      parsedSecondArg = JSON.parse(secondArg)
    } catch (e) {
      throw new Error(
        `${ERROR} \`${method}\` 2nd argument \`${secondArg}\` should be valid JSON.`,
      )
    }
  }

  let result: any
  try {
    if (jsons.length === 0) {
      throw new Error(`${ERROR} The Given string is not parsable as JSON.`)
    } else {
      result = logics[(method || 'default') as keyof typeof logics](jsons, func, parsedSecondArg)
    }
  } catch (e: unknown) {
    const message = (e as Error).message
    throw new Error(
      message
        .split('\n')
        .map((line: string) => `${ERROR} ${line}`)
        .join('\n') +
        '\n' +
        `${ERROR} The argument should be a valid executable JavaScript function.`,
    )
  }

  if (rawStringOutput && typeof result === 'string') {
    return result
  } else if (result === void 0) {
    return 'undefined'
  } else {
    const output = minify
      ? JSON.stringify(result, null)
      : JSON.stringify(result, null, 2)
    if (output === void 0) {
      return 'undefined'
    } else {
      return output
    }
  }
}
