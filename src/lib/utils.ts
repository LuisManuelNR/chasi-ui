export function watch<T>(dependency: T, fn: (v: T) => void) {
  new Proxy({ dep: dependency }, {
    set: function (target, key, value) {
      console.log(`${key} set to ${value}`)
      return value
    }
  })
}