import test from 'ava'
import { promisify } from 'util'
import child_process from 'child_process'
import outdent from '@kamataryo/outdent'

const exec = command =>
  promisify(child_process.exec)(command.replace('jqf', './cli.js'))

test('non json input', async t => {
  const cmd = `echo aaa | jqf 'x => x'`
  const error = await t.throwsAsync(async () => await exec(cmd))
  t.is(error.code, 1)
})

test('invalid JavaScript function', async t => {
  const cmd = `echo '{}' | jqf 'aaa'`
  const error = await t.throwsAsync(async () => await exec(cmd))
  t.is(error.code, 1)
})

test('show help', async t => {
  const cmd = 'jqf -h'
  const { stdout } = await exec(cmd)
  t.true(stdout.includes('Usage') && stdout.includes('Examples'))
})

test('string output', async t => {
  const cmd = `echo '{"hello":"world"}' | jqf 'x => x.hello'`
  const { stdout } = await exec(cmd)
  t.is(stdout, '"world"')
})

test('raw string output option 1', async t => {
  const cmd = `echo '{"hello":"world"}' | jqf -r 'x => x.hello'`
  const { stdout } = await exec(cmd)
  t.is(stdout, 'world')
})

test('raw string output option 2', async t => {
  const cmd = `echo '{"hello":"world"}' | jqf --raw-string-output 'x => x.hello'`
  const { stdout } = await exec(cmd)
  t.is(stdout, 'world')
})

test('json output', async t => {
  const cmd = `echo '[1,2,3]' | jqf 'x => x.map(y => y + 1)'`
  const { stdout } = await exec(cmd)
  t.is(
    stdout,
    `
    [
      2,
      3,
      4
    ]
  `[outdent]
  )
})

test('minified json output 1', async t => {
  const cmd = `echo '[1,2,3]' | jqf -m 'x => x.map(y => y + 1)'`
  const { stdout } = await exec(cmd)
  t.is(stdout, '[2,3,4]')
})

test('minified json output 2', async t => {
  const cmd = `echo '[1,2,3]' | jqf --minify 'x => x.map(y => y + 1)'`
  const { stdout } = await exec(cmd)
  t.is(stdout, '[2,3,4]')
})

test('non json output', async t => {
  const cmd = `echo '{}' | jqf 'x => function(){}'`
  const { stdout } = await exec(cmd)
  t.is(stdout, 'undefined')
})

test.skip('multiple inputs with named pipes', async t => {
  const cmd = `cat <(echo '{"val":1}') <(echo '{"val":2}') | jqf '(x, y) => x.val + y.val'`
  const { stdout } = await exec(cmd)
  t.is(stdout, '3')
})

test.skip('linebreak', async t => {
  const cmd = `echo '"\n"' | jqf -r 'x => x'`
  const { stdout } = await exec(cmd)
  t.is(stdout, '"\n"')
})

test('multiple inputs with line break', async t => {
  const cmd = `echo '{ "a": 1 }\n{ "a": 2 }' | jqf '(x, y) => x.a + y.a'`
  const { stdout } = await exec(cmd)
  t.is(stdout, '3')
})

test('map subcommand', async t => {
  const cmd = `echo '[1,2,3]' | jqf map --minify 'x => x + 1'`
  const { stdout } = await exec(cmd)
  t.is(stdout, '[2,3,4]')
})
