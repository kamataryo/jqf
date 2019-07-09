#!/usr/bin/env node

import * as program from 'commander'
import lib from './'
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
        $ jqf reduce      '(prev, item) => /* reduce */' '"value"'
        $ jqf reduceRight '(prev, item) => /* reduce */' '"value"'
  `[outdent as string],
  )
})

program.parse(process.argv)

// hight order method
const method = program.args[1] && program.args[0]

// arg
const functionString = program.args[1] || program.args[0]
const secondArg =
  method === 'reduce' || method === 'reduceRight' ? program.args[2] : void 0

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
