const callback = Symbol('callback')

const main = (input, functionString, { rawStringOutput }) => {
  const argument = JSON.parse(input)
  eval(`global[callback] = ${functionString}`)

  const result = global[callback](argument)

  let output
  if (rawStringOutput && typeof result === 'string') {
    output = result
  } else {
    output = JSON.stringify(result)
  }

  return output
}

module.exports = main
