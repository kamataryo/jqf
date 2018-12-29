# jqf

[![Build Status](https://travis-ci.org/kamataryo/jqf.svg?branch=master)](https://travis-ci.org/kamataryo/jqf)
[![npm version](https://badge.fury.io/js/jqf.svg)](https://badge.fury.io/js/jqf)

Process stdin JSON string with JavaScript function.

## install and usage

```shell
$ npm install jqf --global
$ echo '{"hello": "world"}' | jqf 'x => x.hello'
world
```

Try with `npx`:

```shell
$ echo '{"hello": "world"}' | npx jqf 'x => x.hello'
world
```

array processing example:

```shell
$ echo '["apple", "orange", "banana"]' | jqf --raw-string-output '
  fruits => fruits
    .find(fruit => fruit[0] === "a")
'
apple
```

Non-JSON output will be undefined:

```shell
$ echo '{}' | jqf '() => (x => x)'
undefined
```

### options

```shell
$ jqf -h
Usage: jqf [options] '<JavaScript function...>'

Options:
  -V, --version            output the version number
  -r, --raw-string-output  no quotations with string output
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
