# jqf

[![Build Status](https://travis-ci.org/kamataryo/jqf.svg?branch=master)](https://travis-ci.org/kamataryo/jqf)
[![npm version](https://badge.fury.io/js/jqf.svg)](https://badge.fury.io/js/jqf)

Process stdin JSON string with JavaScript function.

## Prerequisites

Node.js > 8

## install

```shell
$ npm install jqf --global
```

With `npx`:

```shell
$ echo '{"hello": "world"}' | npx jqf 'x => x.hello'
npx: installed 10 in 4.419s
"world"
```

## Usage

Basic:

```shell
$ echo '{"hello": "world"}' | jqf 'x => x.hello'
"world"
```

Array processing example:

```shell
$ echo '["apple", "orange", "banana"]' | jqf --raw-string-output '
  fruits => fruits
    .find(fruit => fruit[0] === "a")
'
apple
```

Non JSON output:

```shell
$ echo '{}' | jqf '() => (x => x)'
undefined
```

Merge stdin stream:

```shell
$ cat <(echo '{"value":1}') <(echo '{"value":2}') | jqf '(...arg) => arg[0].value + arg[1].value'
3
```

Security with sandbox:

```shell
$ echo '{}' | jqf '() => require("fs").readFileSync("/path/to/secret")'
[error] require is not defined
[error] The argument should be a valid executable JavaScript function.
```

NOTE: see also [safe-eval](https://www.npmjs.com/package/safe-eval) package for sandbox feature.

### options

```shell
$ jqf -h
Usage: jqf [options] '<JavaScript function...>'

Options:
  -V, --version            output the version number
  -r, --raw-string-output  no quotations with string output
  -m, --minify             minify output JSON
  -h, --help               output usage information
```

## development

```shell
$ git clone git@github.com:kamataryo/jqf.git
$ cd jqf
$ yarn
$ npm test
```

## contributions

Issues and Pull Requests are welcome.

## Acknowledgements

- Inspired great CLI JSON processing tool, [jq](https://stedolan.github.io/jq/)
