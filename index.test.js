const test = require('ava')
const lib = require('./')

test('Throws error with non JSON input', t => t.throws(() => lib(void 0)))

test('Throws error without 2nd functional string argument', t =>
  t.throws(() => lib('{}', 'non functional string input')))

test('raw string output', t => {
  const result = lib('{ "hello": "world" }', 'x => x.hello', {
    rawStringOutput: true
  })
  t.true(result === 'world')
})

test('quoted string output', t => {
  const result = lib('{ "hello": "world" }', 'x => x.hello', {
    rawStringOutput: false
  })
  t.true(result === '"world"')
})

test('`undefined` output', t => {
  const result = lib('{}', '() => void 0', {})
  t.true(result === 'undefined')
})

test('boolean `true` output', t => {
  const result = lib('{}', '() => true', {})
  t.true(result === 'true')
})

test('boolean `false` output', t => {
  const result = lib('{}', '() => false', {})
  t.true(result === 'false')
})

test('`null` output', t => {
  const result = lib('{}', '() => null', {})
  t.true(result === 'null')
})

test('function output', t => {
  const result = lib('{}', '() => x => x', {})
  t.true(result === 'undefined')
})

test('Node.js object should not be accessible', t => {
  t.throws(() => lib('{}', '() => require("fs")', {}))
})

test('without minify option', t => {
  const result = lib('{"a":1,"b":2}', 'x => x', { minify: false })
  t.true(
    result ===
      `{
  "a": 1,
  "b": 2
}`
  )
})

test('with minify option', t => {
  const result = lib('{ "a": 1, "b": 2 }', 'x => x', { minify: true })
  t.true(result === '{"a":1,"b":2}')
})

test('with multiple inputs', t => {
  const result = lib('{ "a": 1 }\n{ "a": 2 }', '(x, y) => x.a + y.a', {})
  t.true(result === '3')
})

test('with linebreak inputs', t => {
  const result = lib('{ "a": "hello\\nworld" }', 'x => x.a', {})
  t.true(result === '"hello\\nworld"')
})
