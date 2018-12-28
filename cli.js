#!/usr/bin/env node

const functionPipeline = require('./')

// stdin
process.stdin.resume()
process.stdin.setEncoding('utf8')
let data = ''

// arg
const functionString = process.argv[2]

process.stdin.on('data', chunk => (data += chunk))
process.stdin.on('end', () =>
  process.stdout.write(functionPipeline(data, functionString))
)
