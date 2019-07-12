if (!Array.prototype.flat) {
  Object.defineProperty(Array.prototype, 'flat', {
    configurable: true,
    value: function flat() {
      let depth = isNaN(arguments[0]) ? 1 : Number(arguments[0])

      return depth
        ? Array.prototype.reduce.call(
          this,
          function(acc: any, cur: any) {
            if (Array.isArray(cur)) {
              acc.push.apply(acc, flat.call(cur, depth - 1))
            } else {
              acc.push(cur)
            }

            return acc
          },
          [],
        )
        : Array.prototype.slice.call(this)
    },
    writable: true,
  })
}

if (!Array.prototype.flatMap) {
  Object.defineProperty(Array.prototype, 'flatMap', {
    configurable: true,
    value: function flatMap() {
      return Array.prototype.map.apply(this, arguments).flat()
    },
    writable: true,
  })
}

// developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries#Polyfill
if (!Object.entries) {
  Object.entries = function(obj: any) {
    let ownProps = Object.keys(obj),
      i = ownProps.length,
      resArray = new Array(i) // preallocate the Array
    while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]]

    return resArray
  }
}
