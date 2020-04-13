---
title: New Version 1.6.0
author: Kamata Ryo
authorURL: http://twitter.com/kamataryo_
---

# jqf New minor version released!

![hello! new version!](/img/2020-04-14/01.jpg)

Yeah! Jqf@1.6.0 supports default function string argument of `'x => x'`.

In other word, `jqf` has been equivalent with `jqf 'x => x'`.

```
$ echo '{"hello":"world"}' | jqf
{
  "hello": "world"
}
```

We can use the `jqf` as a simplest JSON formatter!
