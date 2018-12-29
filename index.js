const safeEval = require('safe-eval')

const main = (input, functionString, { rawStringOutput, minify } = {}) => {
  let json
  try {
    json = JSON.parse(input)
  } catch (e) {
    throw new Error('[Error] The Given string is not parsable as JSON.')
  }

  let result
  try {
    result = safeEval(`${functionString}`)(json)
  } catch (e) {
    throw new Error(
      '[Error] The argument should be valid JavaScript and callable function object.'
    )
  }
  if (rawStringOutput && typeof result === 'string') {
    return result
  } else if (result === void 0) {
    return 'undefined'
  } else {
    const output = minify
      ? JSON.stringify(result)
      : JSON.stringify(result, null, 2)
    if (output === void 0) {
      return 'undefined'
    } else {
      return output
    }
  }
}

module.exports = main
