const test = require('ava')
const jsonPipeline = require('./')

test('Throws error with non JSON input', t =>
  t.throws(() => jsonPipeline(void 0)))

test('Throws error without 2nd functional string argument', t =>
  t.throws(() => jsonPipeline('{}', 'non functional string input')))

test('call 2nd argument as function with 1st argument', t => {
  const result = jsonPipeline('{ "hello": "world" }', 'x => x.hello')
  t.true(result === 'world')
})
