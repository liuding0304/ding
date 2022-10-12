// 5.实现单例
function getSingle(fn) {
  let obj;
  return function () {
    if (obj) {
      return obj;
    }

    obj = fn.call(this, ...arguments)
    return obj;
  }
}
