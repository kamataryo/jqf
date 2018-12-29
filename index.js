const safeEval = require('safe-eval')
const chalk = require('chalk')
const ERROR = chalk.red('[error]')

const main = (inputs, functionString, options = {}) => {
  const { rawStringOutput = false, minify = false, color = false } = options

  const jsons = []

  let data
  inputs.split('\n').reduce((prev, line) => {
    const target = prev + line
    let json
    try {
      json = JSON.parse(target)
    } catch (e) {
      return target
    }
    jsons.push(json)
    return ''
  }, '')

  if (jsons.length === 0) {
    throw new Error(`${ERROR} The Given string is not parsable as JSON.`)
  }

  let result
  try {
    result = safeEval(`${functionString}`)(...jsons)
  } catch (e) {
    throw new Error(
      e.message
        .split('\n')
        .map(line => `${ERROR} ${line}`)
        .join('\n') +
        '\n' +
        `${ERROR} The argument should be a valid executable JavaScript function.`
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

module.exports = main
