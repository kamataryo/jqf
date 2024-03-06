---
id: install
title: Install Guide
---

## Prerequisites

Node.js > 16 required.

## Install to global

You can install `jqf` command with bun, npm or yarn.

### with bun

```shell
$ bun install jqf --global
```

### with npm

```shell
$ npm install jqf --global
```

### with yarn

```shell
$ yarn global add jqf
```

## Instant execution with `npx`

```shell
$ npx jqf -h
```

## Quick Start with `npx`

You can try jqf instantly with `npx`.

```shell
$ echo '{"hello": "world"}' | npx jqf 'obj => obj.hello'
"world"
```
