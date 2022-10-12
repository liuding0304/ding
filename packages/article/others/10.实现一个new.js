
// 实现一个new
function _new(Fn, ...args) {
  if (typeof Fn !== 'function') {
    throw new Error('参数Fn应该为一个构造函数')
  }
  const obj = Object.create(Fn.prototype)
  const res = Fn.apply(obj, args)
  return res instanceof Object ? res : obj;
}
