const callback = Symbol('callback')

const main = (input, functionString, { rawStringOutput } = {}) => {
  let json
  try {
    json = JSON.parse(input)
  } catch (e) {
    throw new Error(`\`${input.replace('\n', '\\n')}\` is not parsable.`)
  }

  let result
  try {
    eval(`global[callback] = ${functionString}`)
    result = global[callback](json)
  } catch (e) {
    throw new Error('The argument should be valid JavaScript function.')
  }

  let output
  if (rawStringOutput && typeof result === 'string') {
    output = result
  } else if (result === void 0) {
    output = 'undefined'
  } else {
    output = JSON.stringify(result)
  }

  return output
}

module.exports = main
