#!/usr/bin/env node

const program = require('commander')
const lib = require('./')
const { version } = require('./package.json')

program
  .version(version)
  .usage('[options] \'<JavaScript function...>\'')
  .option('-r, --raw-string-output', 'no quotations with string output')
  .option('-m, --minify', 'minify output JSON')
  .option('-c, --color', 'pretty print JSON with colors')
  .parse(process.argv)

// stdin
process.stdin.resume()
process.stdin.setEncoding('utf8')
let data = ''

// arg
const functionString = program.args[0]

// options
const { rawStringOutput, minify, color } = program

process.stdin.on('data', chunk => (data += chunk))
process.stdin.on('end', () => {
  let stdout
  try {
    stdout = lib(data, functionString, { rawStringOutput, minify, color })
  } catch (e) {
    process.stdout.write(e.message)
    process.exit(1)
  }

  process.stdout.write(stdout)
  process.exit(0)
})
