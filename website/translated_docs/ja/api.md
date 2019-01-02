---
id: api
title: API リファレンス
---

## はじめに

コマンドオプションとサブコマンドのリストを `--help` オプションで表示することができます。

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

## 基本的な使い方

### 単一の JSON の入力を処理する

```shell
$ コマンド | jqf [オプション] <JavaScript 関数>
```

- `コマンド` は実行可能で、JSON 文字列を出力するものである必要があります
- `<JavaScript 関数>` は正しい JavaScript の関数である必要があり、標準入力から与えられた JSON 文字列をオブジェクトとして受け取り、関数を実行して結果を標準出力に与えます
- jqf の実行結果は次のような JSON 文字列になります
  - `{"key": "value"}`
  - `[1,2,3]`
  - `true`
  - `0`
  - `"string"`
  - etc.
- `[オプション]`のリストは次の通りです

  | オプション          | 省略 | 概要                                                               |
  | :------------------ | :--- | :----------------------------------------------------------------- |
  | --raw-string-output | -r   | 結果が文字列の JSON だった時、クオーテーション `""` を取り除きます |
  | --minify            | -m   | 出力される JSON 文字列を最小化します                               |

#### 例

##### オブジェクトを処理する

```shell
$ echo '{"hello":"world"}' | jqf 'obj => obj.hello'
"world"
```

##### 文字列の結果からクオーテーションを取り除く

```shell
$ echo '{"hello":"world"}' | jqf --raw-string-output 'obj => obj.hello'
world
```

##### 配列の map メソッドを使用する

```shell
$ echo '[1,2,3]' | jqf 'nums => nums.map(n => n * 2)'
[
  2,
  4,
  6
]
```

##### minify オプション

```shell
$ echo '[1,2,3]' | jqf --minify 'nums => nums.map(n => n * 2)'
[2,4,6]
```

### 配列のショートハンド記法

`Array.prototype` が持ついくつかのメソッドに対してサブコマンドを使ったショートハンド記法があります。

```shell
$ コマンド | jqf [メソッド] [オプション] <JavaScript 関数>
```

#### 各メソッドの例

##### `Array.prototype.find`

```shell
# 最初に出現する偶数を探す
$ echo '[1,2,3]' | jqf find 'n => n % 2 === 0'
2
```

##### `Array.prototype.every`

```shell
# 全ての数字が10未満であるかを確認する
$ echo '[1,2,5,7,9]' | jqf every 'n => n < 10'
true
```

##### `Array.prototype.some`

```shell
# 少なくとも1つの偶数が含まれているかを確認する
$ echo '[1,3,5,7,9]' | jqf some 'n => n % 2 === 0'
false
```

##### `Array.prototype.map`

```shell
# 全ての要素を3乗した値を計算する
$ echo '[1,2,3]' | jqf map --minify 'n => Math.pow(n, 3)'
```

##### `Array.prototype.filter`

```shell
# 偶数をピックアップする
$ echo '[1,2,3,5,7,8,10]' | jqf filter --minify 'n => n % 2 === 0'
[2,8,10]
```

##### `Array.prototype.reduce`

`reduce` メソッドの初期値は第 2 引数として与えることができますが、正しい JSON 文字列である必要があります。
文字列の場合はクオーテーション `""`が必要なことに留意してください。例えばこんな感じです: `'"string value"'`

```shell
# 合計値を計算する
$ echo '[1,2,3,4,5,6,7,8,9,10]' | jqf reduce '(prev, n) => prev + n' '0'
55
```

```shell
# 文字列を結合する
$ echo '["a", "b", "c"]' | jqf reduce '(prev, str) => prev + str' '"word: "'
"word: abc"
```

##### `Array.prototype.reduceRight`

```shell
# 文字列を逆方向に結合する
$ echo '["a", "b", "c"]' | jqf reduceRight '(prev, str) => prev + str' '"word: "'
"word: cba"
```

## 応用例 (β 版の機能)

### 複数のストリーム入力を処理する

標準出力から複数のストリーム入力を与えることができます。

```shell
$ cat <(echo '{"val": 1}') <(echo '{"val": 2}') | jqf '(x, y) => x.val + y.val'
3
```
