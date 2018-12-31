const test = require('ava')
const lib = require('./')

test('with linebreak inputs', t => {
  const result = lib(
    `{
    "a": "hello\\nworld" }
    `,
    'x => x.a',
    {}
  )
  t.true(result === '"hello\\nworld"')
})
