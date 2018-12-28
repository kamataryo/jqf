#!/usr/bin/env node

const program = require('commander')
const lib = require('./')
const { version } = require('./package.json')

program
  .version(version)
  .option('-r, --raw-string-output', 'no quotations with string output')
  .parse(process.argv)

// stdin
process.stdin.resume()
process.stdin.setEncoding('utf8')
let data = ''

// arg
const functionString = program.args[0]

process.stdin.on('data', chunk => (data += chunk))
process.stdin.on('end', () => {
  const result = lib(data, functionString)
  let output
  if (program.rawStringOutput && typeof result === 'string') {
    output = result
  } else {
    output = JSON.stringify(result)
  }
  process.stdout.write(output)
})
