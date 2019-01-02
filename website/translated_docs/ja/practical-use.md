---
id: practical-use
title: 実用的な利用方法
---

## JSON API を処理する

Jqf を使って、 JSON API から得られた JSON を処理することができます。

最初に JSON API の例を確認してみます。

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

それでは、学生のスコアをリストとしてピックアップしてみます。

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

ショートハンド記法を使うこともできます。

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
