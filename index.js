const callback = Symbol('callback')

const main = (input, functionString) => {
  const argument = JSON.parse(input)
  eval(`global[callback] = ${functionString}`)
  return global[callback](argument)
}

module.exports = main
