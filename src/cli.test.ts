import { expect, test } from "bun:test";
import { promisify } from 'node:util'
import * as child_process from 'node:child_process'
import { outdent } from '@kamataryo/outdent'

interface CustomError extends Error {
  code: number
}

const exec = (command: string) =>
  promisify(child_process.exec)(command.replace('jqf', 'bun ./src/cli.ts'))

test('non json input', async () => {
  const cmd = 'echo aaa | jqf \'x => x\''
  try {
    await exec(cmd)
    throw null
  } catch (error) {
    expect((error as CustomError).code).toBe(1)
  }
})

test('without argument', async () => {
  const cmd = 'echo {} | jqf'
  const { stdout } = await exec(cmd)
  expect(stdout).toBe('{}')
})

test('invalid JavaScript function', async () => {
  const cmd = 'echo \'{}\' | jqf \'aaa\''
  try {
    await exec(cmd)
    throw null
  } catch (error) {
    expect((error as CustomError).code).toBe(1)
  }
})

test('show help', async () => {
  const cmd = 'jqf -h'
  const { stdout } = await exec(cmd)
  expect(stdout).toContain('Usage')
  expect(stdout).toContain('Examples')
})

test('string output', async () => {
  const cmd = 'echo \'{"hello":"world"}\' | jqf \'x => x.hello\''
  const { stdout } = await exec(cmd)
  expect(stdout).toBe('"world"')
})

test('raw string output option 1', async () => {
  const cmd = 'echo \'{"hello":"world"}\' | jqf -r \'x => x.hello\''
  const { stdout } = await exec(cmd)
  expect(stdout).toBe('world')
})

test('raw string output option 2', async () => {
  const cmd =
    'echo \'{"hello":"world"}\' | jqf --raw-string-output \'x => x.hello\''
  const { stdout } = await exec(cmd)
  expect(stdout).toBe('world')
})

test('json output', async () => {
  const cmd = 'echo \'[1,2,3]\' | jqf \'x => x.map(y => y + 1)\''
  const { stdout } = await exec(cmd)
  expect(stdout).toBe(outdent`
  [
    2,
    3,
    4
  ]
`)
})

test('minified json output 1', async () => {
  const cmd = 'echo \'[1,2,3]\' | jqf -m \'x => x.map(y => y + 1)\''
  const { stdout } = await exec(cmd)
  expect(stdout).toBe('[2,3,4]')
})

test('minified json output 2', async () => {
  const cmd = 'echo \'[1,2,3]\' | jqf --minify \'x => x.map(y => y + 1)\''
  const { stdout } = await exec(cmd)
  expect(stdout).toBe('[2,3,4]')
})

test('non json output', async () => {
  const cmd = 'echo \'{}\' | jqf \'x => function(){}\''
  const { stdout } = await exec(cmd)
  expect(stdout).toBe('undefined')
})

test.skip('multiple inputs with named pipes', async () => {
  const cmd =
    'cat <(echo \'{"val":1}\') <(echo \'{"val":2}\') | jqf \'(x, y) => x.val + y.val\''
  const { stdout } = await exec(cmd)
  expect(stdout).toBe('3')
})

test.skip('linebreak', async () => {
  const cmd = 'echo \'"\n"\' | jqf \'x => x\''
  const { stdout } = await exec(cmd)
  expect(stdout).toBe('"\n"')
})

test('multiple inputs with line break', async () => {
  const cmd = 'echo \'{ "a": 1 }\n{ "a": 2 }\' | jqf \'(x, y) => x.a + y.a\''
  const { stdout } = await exec(cmd)
  expect(stdout).toBe('3')
})

test('map subcommand', async () => {
  const cmd = 'echo \'[1,2,3]\' | jqf map --minify \'x => x + 1\''
  const { stdout } = await exec(cmd)
  expect(stdout).toBe('[2,3,4]')
})

test('reduce subcommand', async () => {
  const cmd =
    'echo \'[{"val":1},{"val":2},{"val":3}]\' | jqf reduce \'(prev, {val}) => prev + val\' \'0\''
  const { stdout } = await exec(cmd)
  expect(stdout).toBe('6')
})

test('reduceRight subcommand', async () => {
  const cmd =
    'echo \'["a","b","c"]\' | jqf reduceRight \'(prev, str) => prev + str\' \'"word: "\''
  const { stdout } = await exec(cmd)
  expect(stdout).toBe('"word: cba"')
})

test('filter subcommand', async () => {
  const cmd = 'echo \'["a","b","c"]\' | jqf filter -m \'(x) => x === "a"\''
  const { stdout } = await exec(cmd)
  expect(stdout).toBe('["a"]')
})

test('find subcommand', async () => {
  const cmd = 'echo \'["a","b","c"]\' | jqf find -m \'(x) => x === "a"\''
  const { stdout } = await exec(cmd)
  expect(stdout).toBe('"a"')
})

test('some subcommand', async () => {
  const cmd = 'echo \'["2","3","5"]\' | jqf some -m \'(x) => x % 2 === 0\''
  const { stdout } = await exec(cmd)
  expect(stdout).toBe('true')
})

test('every subcommand', async () => {
  const cmd = 'echo \'["2","3","5"]\' | jqf every -m \'(x) => x % 2 === 0\''
  const { stdout } = await exec(cmd)
  expect(stdout).toBe('false')
})

test('flatMap subcommand', async () => {
  const cmd = 'echo \'[["2"],"3","5"]\' | jqf flatMap -m \'x => x\''
  const { stdout } = await exec(cmd)
  expect(stdout).toBe('["2","3","5"]')
})

test('keys subcommand without function', async () => {
  const cmd = 'echo \'{ "a": 1, "b": 2 }\' | jqf keys -m'
  const { stdout } = await exec(cmd)
  expect(stdout).toBe('["a","b"]')
})

test('keys subcommand', async () => {
  const cmd = 'echo \'{ "a": 1, "b": 2 }\' | jqf keys -m \'x => x.join(",")\''
  const { stdout } = await exec(cmd)
  expect(stdout).toBe('"a,b"')
})

test('values subcommand without function', async () => {
  const cmd = 'echo \'{ "a": 1, "b": 2 }\' | jqf values -m'
  const { stdout } = await exec(cmd)
  expect(stdout).toBe('[1,2]')
})

test('values subcommand', async () => {
  const cmd = 'echo \'{ "a": 1, "b": 2 }\' | jqf values -m \'x => x.join(",")\''
  const { stdout } = await exec(cmd)
  expect(stdout).toBe('"1,2"')
})

test('entries subcommand without function', async () => {
  const cmd = 'echo \'{ "a": 1, "b": 2 }\' | jqf entries -m'
  const { stdout } = await exec(cmd)
  expect(stdout).toBe('[["a",1],["b",2]]')
})

test('entries subcommand', async () => {
  const cmd = 'echo \'{ "a": 1, "b": 2 }\' | jqf entries -m \'x => x\''
  const { stdout } = await exec(cmd)
  expect(stdout).toBe('[["a",1],["b",2]]')
})

test('fromEntries subcommand without function', async () => {
  const cmd = 'echo \'[["a",1],["b",2]]\' | jqf fromEntries -m'
  const { stdout } = await exec(cmd)
  expect(stdout).toBe('{"a":1,"b":2}')
})

test('fromEntries subcommand', async () => {
  const cmd = 'echo \'[["a",1],["b",2]]\' | jqf fromEntries -m \'x => x\''
  const { stdout } = await exec(cmd)
  expect(stdout).toBe('{"a":1,"b":2}')
})

test('flat subcommand without function', async () => {
  const cmd = 'echo \'[["a",1],["b",2]]\' | jqf flat -m'
  const { stdout } = await exec(cmd)
  expect(stdout).toBe('["a",1,"b",2]')
})

test('reduce subcommand fails with invalid JSON', async () => {
  const cmd =
    'echo \'[{"val":1},{"val":2},{"val":3}]\' | jqf reduce \'(prev, {val}) => prev + val\' \'{\''
  try {
    await exec(cmd)
    throw null
  } catch (error) {
    expect((error as CustomError).code).toBe(1)
  }
})
