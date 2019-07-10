import * as safeEval from 'safe-eval'
import chalk from 'chalk'

declare interface JqfOptions {
  rawStringOutput?: boolean
  minify?: boolean
  method?: string
}

const ERROR = chalk.red('[error]')

const methodList = [
  'map',
  'reduce',
  'filter',
  'reduceRight',
  'some',
  'every',
  'find',
]

export default (
  inputs: string,
  functionString: string,
  secondArg: string,
  options: JqfOptions = {},
): string => {
  const { rawStringOutput = false, minify = false, method } = options

  const jsons = []

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

  let parsedSecondArg = void 0
  if (secondArg) {
    try {
      parsedSecondArg = JSON.parse(secondArg)
    } catch (e) {
      throw new Error(`${ERROR} \`reduce\` 2nd argument should be valid JSON.`)
    }
  }

  let result: any

  if (jsons.length === 0) {
    throw new Error(`${ERROR} The Given string is not parsable as JSON.`)
  } else {
    try {
      // @ts-ignore
      const func: Function = safeEval(`${functionString}`)
      if (method && methodList.includes(method) && jsons.length === 1) {
        // apply preprocessors if specified
        result = jsons[0][method](func, parsedSecondArg)
      } else {
        if (method && !methodList.includes(method)) {
          throw new Error('Invalid subcommand detected.')
        }
        result = func(...jsons)
      }
    } catch (e) {
      throw new Error(
        e.message
          .split('\n')
          .map((line: string) => `${ERROR} ${line}`)
          .join('\n') +
          '\n' +
          `${ERROR} The argument should be a valid executable JavaScript function.`,
      )
    }
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
