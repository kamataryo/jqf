const safeEval = require('safe-eval')

const main = (input, functionString, { rawStringOutput } = {}) => {
  let json
  try {
    json = JSON.parse(input)
  } catch (e) {
    throw new Error(`[Error]\`${input.replace('\n', '\\n')}\` is not parsable.`)
  }

  let result
  try {
    result = safeEval(`${functionString}`)(json)
  } catch (e) {
    throw new Error('[Error] The argument should be valid JavaScript function.')
  }
  if (rawStringOutput && typeof result === 'string') {
    return result
  } else if (result === void 0) {
    return 'undefined'
  } else {
    const output = JSON.stringify(result)
    if (output === void 0) {
      return 'undefined'
    } else {
      return output
    }
  }
}

module.exports = main
