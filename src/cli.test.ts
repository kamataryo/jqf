import test, { ExecutionContext } from 'ava'
import { promisify } from 'util'
import * as child_process from 'child_process'
import * as outdent from '@kamataryo/outdent'

interface CustomError extends Error {
  code: number
}

const exec = (command: string) =>
  promisify(child_process.exec)(command.replace('jqf', 'node ./dist/cli.js'))

test('non json input', async (t: ExecutionContext) => {
  const cmd = 'echo aaa | jqf \'x => x\''
  const error = await t.throwsAsync<CustomError>(async () => await exec(cmd))
  t.is(error.code, 1)
})

test('invalid JavaScript function', async (t: ExecutionContext) => {
  const cmd = 'echo \'{}\' | jqf \'aaa\''
  const error = await t.throwsAsync<CustomError>(async () => await exec(cmd))
  t.is(error.code, 1)
})

test('show help', async (t: ExecutionContext) => {
  const cmd = 'jqf -h'
  const { stdout } = await exec(cmd)
  t.true(stdout.includes('Usage') && stdout.includes('Examples'))
})

test('string output', async (t: ExecutionContext) => {
  const cmd = 'echo \'{"hello":"world"}\' | jqf \'x => x.hello\''
  const { stdout } = await exec(cmd)
  t.is(stdout, '"world"')
})

test('raw string output option 1', async (t: ExecutionContext) => {
  const cmd = 'echo \'{"hello":"world"}\' | jqf -r \'x => x.hello\''
  const { stdout } = await exec(cmd)
  t.is(stdout, 'world')
})

test('raw string output option 2', async (t: ExecutionContext) => {
  const cmd =
    'echo \'{"hello":"world"}\' | jqf --raw-string-output \'x => x.hello\''
  const { stdout } = await exec(cmd)
  t.is(stdout, 'world')
})

test('json output', async (t: ExecutionContext) => {
  const cmd = 'echo \'[1,2,3]\' | jqf \'x => x.map(y => y + 1)\''
  const { stdout } = await exec(cmd)
  t.is(
    stdout,
    `
      [
        2,
        3,
        4
      ]
    `[outdent as string],
  )
})

test('minified json output 1', async (t: ExecutionContext) => {
  const cmd = 'echo \'[1,2,3]\' | jqf -m \'x => x.map(y => y + 1)\''
  const { stdout } = await exec(cmd)
  t.is(stdout, '[2,3,4]')
})

test('minified json output 2', async (t: ExecutionContext) => {
  const cmd = 'echo \'[1,2,3]\' | jqf --minify \'x => x.map(y => y + 1)\''
  const { stdout } = await exec(cmd)
  t.is(stdout, '[2,3,4]')
})

test('non json output', async (t: ExecutionContext) => {
  const cmd = 'echo \'{}\' | jqf \'x => function(){}\''
  const { stdout } = await exec(cmd)
  t.is(stdout, 'undefined')
})

test.skip('multiple inputs with named pipes', async (t: ExecutionContext) => {
  const cmd =
    'cat <(echo \'{"val":1}\') <(echo \'{"val":2}\') | jqf \'(x, y) => x.val + y.val\''
  const { stdout } = await exec(cmd)
  t.is(stdout, '3')
})

test.skip('linebreak', async (t: ExecutionContext) => {
  const cmd = 'echo \'"\n"\' | jqf \'x => x\''
  const { stdout } = await exec(cmd)
  t.is(stdout, '"\n"')
})

test('multiple inputs with line break', async (t: ExecutionContext) => {
  const cmd = 'echo \'{ "a": 1 }\n{ "a": 2 }\' | jqf \'(x, y) => x.a + y.a\''
  const { stdout } = await exec(cmd)
  t.is(stdout, '3')
})

test('map subcommand', async (t: ExecutionContext) => {
  const cmd = 'echo \'[1,2,3]\' | jqf map --minify \'x => x + 1\''
  const { stdout } = await exec(cmd)
  t.is(stdout, '[2,3,4]')
})

test('reduce subcommand', async (t: ExecutionContext) => {
  const cmd =
    'echo \'[{"val":1},{"val":2},{"val":3}]\' | jqf reduce \'(prev, {val}) => prev + val\' \'0\''
  const { stdout } = await exec(cmd)
  t.is(stdout, '6')
})

test('reduceRight subcommand', async (t: ExecutionContext) => {
  const cmd =
    'echo \'["a","b","c"]\' | jqf reduceRight \'(prev, str) => prev + str\' \'"word: "\''
  const { stdout } = await exec(cmd)
  t.is(stdout, '"word: cba"')
})

test('filter subcommand', async (t: ExecutionContext) => {
  const cmd = 'echo \'["a","b","c"]\' | jqf filter -m \'(x) => x === "a"\''
  const { stdout } = await exec(cmd)
  t.is(stdout, '["a"]')
})

test('find subcommand', async (t: ExecutionContext) => {
  const cmd = 'echo \'["a","b","c"]\' | jqf find -m \'(x) => x === "a"\''
  const { stdout } = await exec(cmd)
  t.is(stdout, '"a"')
})

test('some subcommand', async (t: ExecutionContext) => {
  const cmd = 'echo \'["2","3","5"]\' | jqf some -m \'(x) => x % 2 === 0\''
  const { stdout } = await exec(cmd)
  t.is(stdout, 'true')
})

test('every subcommand', async (t: ExecutionContext) => {
  const cmd = 'echo \'["2","3","5"]\' | jqf every -m \'(x) => x % 2 === 0\''
  const { stdout } = await exec(cmd)
  t.is(stdout, 'false')
})

test('reduce subcommand fails with invalid JSON', async (t: ExecutionContext) => {
  const cmd =
    'echo \'[{"val":1},{"val":2},{"val":3}]\' | jqf reduce \'(prev, {val}) => prev + val\' \'{\''
  const error = await t.throwsAsync<CustomError>(async () => await exec(cmd))
  t.is(error.code, 1)
})
