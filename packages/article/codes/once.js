/**
 * [once 执行一次的函数]
 * @param  {Function} fn [要执行的函数]
 * @return {[function]}  [返回无论条用多少次都执行一次的函数]
 */
export default function once(fn, context) {
  var run = false
  return (...arg) => {
    !run && ((run = !run), fn.apply(context || null, arg))
  }
}
