---
id: install
title: インストールガイド
---

## 必要条件

Node.js > 8 が必要です。

## グローバルインストール

npm または Yarn を使って `jqf` コマンドをインストールできます。

### npm でインストールする

```shell
$ npm install jqf --global
```

### yarn でインストールする

```shell
$ yarn global add jqf
```

## `npx` で即時実行する

```shell
$ npx jqf -h
```

<a name="quick-start-with-npx"></a>

## `npx` を使ったクイックスタート

`npx` コマンドを使って jqf を即座に試すことができます。

```shell
$ echo '{"hello": "world"}' | npx jqf 'obj => obj.hello'
"world"
```
