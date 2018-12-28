#!/usr/bin/env node

const program = require('commander')
const lib = require('./')
const { version } = require('./package.json')

program
  .version(version)
  .usage('[options] \'<JavaScript function...>\'')
  .option('-r, --raw-string-output', 'no quotations with string output')
  .parse(process.argv)

// stdin
process.stdin.resume()
process.stdin.setEncoding('utf8')
let data = ''

// arg
const functionString = program.args[0]

// options
const { rawStringOutput } = program

process.stdin.on('data', chunk => (data += chunk))
process.stdin.on('end', () => {
  const stdout = lib(data, functionString, { rawStringOutput })
  process.stdout.write(stdout)
  process.exit(0)
})
