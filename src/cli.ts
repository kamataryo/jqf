#!/usr/bin/env node

import * as program from 'commander'
import lib, { allowedMethods } from './'
import * as fs from 'fs'
import { isatty } from 'tty'
import * as outdent from '@kamataryo/outdent'

const { version, description } = JSON.parse(
  fs.readFileSync(__dirname + '/../package.json').toString('utf-8'),
)

program
  .version(version)
  .description(description)
  .usage('[method] [options] "<JavaScript function>"')
  .option('-r, --raw-string-output', 'no quotations with string output')
  .option('-m, --minify', 'minify output JSON')

program.on('--help', () => {
  process.stdout.write(
    `
      Examples:
        $ jqf             'obj => obj.value'
        $ jqf map         'arr => arr.id'
        $ jqf find        'arr => arr.id === 1'
        $ jqf filter      'arr => !arr'
        $ jqf some        'arr => arr % 2 === 0'
        $ jqf every        'arr => arr % 2 === 0'
        $ jqf reduce      '(prev, item) => /* reduce */' '"value"'
        $ jqf reduceRight '(prev, item) => /* reduce */' '"value"'
        $ jqf flatMap     'arr => arr'
        $ jqf keys
        $ jqf values
        $ jqf entries
        $ jqf fromEntries
        $ jqf flat
  `[outdent as string],
  )
})

program.parse(process.argv)

const args = [...program.args]
const method = allowedMethods.includes(program.args[0]) ? args.shift() : void 0
const functionString = args.shift()
const secondArg = args.shift()

// options
const { rawStringOutput, minify } = program

// stdin
process.stdin.resume()
process.stdin.setEncoding('utf8')
let data = ''
const onEnd = () => {
  let stdout = ''
  try {
    stdout = lib(data, functionString, secondArg, {
      rawStringOutput,
      minify,
      method,
    })
  } catch (e) {
    process.stdout.write(e.message)
    process.exit(1)
  }

  process.stdout.write(stdout)
  process.exit(0)
}

if (isatty(0)) {
  onEnd()
} else {
  process.stdin.on('data', chunk => (data += chunk))
  process.stdin.on('end', onEnd)
}
