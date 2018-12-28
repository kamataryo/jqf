# jqf

Process stdin JSON string with JavaScript function.

Try it with `npx`!

```shell
$ echo '{"hello": "world"}' | npx jqf 'x => x.hello'
world
```

## usage

```shell
$ npm install jqf --global
$ echo '{"hello": "world"}' | jqf 'x => x.hello'
world
```

## **ATTENTION**

It is highly recommended not to pass unreliable user inputs to `jqf`, because it can cause malicious code injection easy. `jqf` is simply a developer tool to process JSON instantly.

## development

```shell
$ git clone git@github.com:kamataryo/jqf.git
$ cd jqf
$ yarn
$ npm test
```
