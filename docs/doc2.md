---
id: doc2
title: API
---

## general

You can see list of options and sub commands with `--help` option.

```shell
$ jqf -h
Usage: jqf [method] [options] "<JavaScript function>"

Process stdin JSON string with JavaScript function.

Options:
  -V, --version            output the version number
  -r, --raw-string-output  no quotations with string output
  -m, --minify             minify output JSON
  -h, --help               output usage information

Examples:
  $ jqf        'obj => obj.value'
  $ jqf map    'arr => arr.id'
  $ jqf find   'arr => arr.id === 1'
  $ jqf reduce '(prev, item) => /* reduce */' '"value"'
```

## basic Usage

### process single JSON input

```shell
$ command | jqf [options] <JavaScript function>
```

- `command` should be executable and its output should be valid JSON string
- `<JavaScript function>` should be valid JavaScript function, which takes an object parsed from the given JSON string via stdin, processes and returns its result
- Result will be a stringified JSON, i.e. `{"key": "value"}`, `[1,2,3]`, `true`, `0` or `"string"`
- You can pass some `[options]`:

  | options             | abbr. | descriptions                            |
  | :------------------ | :---- | :-------------------------------------- |
  | --raw-string-output | -r    | strip quotation `""` from string result |
  | --minify            | -m    | minify output JSON string               |

#### examples

##### process object

```shell
$ echo '{"hello":"world"}' | jqf 'obj => obj.hello'
"world"
```

##### strip quotation from string result

```shell
$ echo '{"hello":"world"}' | jqf --raw-string-output 'obj => obj.hello'
world
```

##### array map

```shell
$ echo '[1,2,3]' | jqf 'nums => nums.map(n => n * 2)'
[
  2,
  4,
  6
]
```

##### minify output array

```shell
$ echo '[1,2,3]' | jqf --minify 'nums => nums.map(n => n * 2)'
[2,4,6]
```

### Array shorthands

We provide shorthand notations for `Array.prototype` methods.

```shell
$ command | jqf [method] [options] <JavaScript function>
```

#### methods with examples

##### `Array.prototype.find`

```shell
# find the first even number.
$ echo '[1,2,3]' | jqf find 'n => n % 2 === 0'
2
```

##### `Array.prototype.every`

```shell
# check if all the number is under 10.
$ echo '[1,2,5,7,9]' | jqf every 'n => n < 10'
true
```

##### `Array.prototype.some`

```shell
# check if some even numbers are included.
$ echo '[1,3,5,7,9]' | jqf some 'n => n % 2 === 0'
false
```

##### `Array.prototype.map`

```shell
# calculate cubic values for all the elements
$ echo '[1,2,3]' | jqf map --minify 'n => Math.pow(n, 3)'
```

##### `Array.prototype.filter`

```shell
# pick even numbers
$ echo '[1,2,3,5,7,8,10]' | jqf filter --minify 'n => n % 2 === 0'
[2,8,10]
```

##### `Array.prototype.reduce`

You can provide `reduce` initial value as 2nd argument, which should be valid JSON string.
Be careful that string values require quotations `""`, i.e. `'"string value"'`.

```shell
# calculate sum
$ echo '[1,2,3,4,5,6,7,8,9,10]' | jqf reduce '(prev, n) => prev + n' '0'
```

```shell
# concatenate strings
$ echo '["a", "b", "c"]' | jqf reduce '(prev, str) => prev + str' '"word: "'
"word: abc"
```

##### `Array.prototype.reduceRight`

```shell
# concatenate strings
$ echo '["a", "b", "c"]' | jqf reduceRight '(prev, str) => prev + str' '"word: "'
"word: cba"
```

## advanced Usage (β features)

### multiple stream inputs

You can pass multiple stream inputs via stdin:

```shell
$ cat <(echo '{"val": 1}') <(echo '{"val": 2}') | jqf '(x, y) => x.val + y.val'
3
```
