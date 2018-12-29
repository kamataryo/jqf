#!/usr/bin/env node

const program = require('commander')
const lib = require('./')
const { version } = require('./package.json')
const isatty = require('tty').isatty(0)

program
  .version(version)
  .usage('[options] \'<JavaScript function...>\'')
  .option('-r, --raw-string-output', 'no quotations with string output')
  .option('-m, --minify', 'minify output JSON')
  .parse(process.argv)

// arg
const functionString = program.args[0]

// options
const { rawStringOutput, minify } = program

// stdin
process.stdin.resume()
process.stdin.setEncoding('utf8')
let data = ''
const onEnd = () => {
  let stdout
  try {
    stdout = lib(data, functionString, { rawStringOutput, minify })
  } catch (e) {
    process.stdout.write(e.message)
    process.exit(1)
  }

  process.stdout.write(stdout)
  process.exit(0)
}

if (isatty) {
  onEnd()
} else {
  process.stdin.on('data', chunk => (data += chunk))
  process.stdin.on('end', onEnd)
}
