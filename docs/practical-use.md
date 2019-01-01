---
id: practical-use
title: Practical Use
---

## With JSON API

You can process JSON value obtained from JSON API with jqf.

First, let's check the example.

```shell
$ curl 'https://raw.githubusercontent.com/kamataryo/jqf/master/examples/students.json'
[
  { "id": 1, "name": "Adams", "score": 70 },
  { "id": 2, "name": "Baker", "score": 58 },
  { "id": 3, "name": "Clark", "score": 82 },
  { "id": 4, "name": "Davis", "score": 93 },
  { "id": 5, "name": "Evans", "score": 61 }
]
```

Then let's pick the scores of them.

```shell
$ curl 'https://raw.githubusercontent.com/kamataryo/jqf/master/examples/students.json' | \
  jqf 'students => students.map(student => student.score)'
[
  70,
  58,
  82,
  93,
  61
]
```

Or you can use shorthand.

```shell
$ curl 'https://raw.githubusercontent.com/kamataryo/jqf/master/examples/students.json' | \
  jqf map 'student => student.score'
[
  70,
  58,
  82,
  93,
  61
]
```
