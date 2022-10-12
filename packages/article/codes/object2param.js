/**
 * 对象转换为url参数
 * @param {*} o 需要转换的对象
 * @param {*} transVal 值编码函数
 */
export default function object2param(o, transVal = window.encodeURIComponent) {
  const r = []
  for (const k in o) {
    r.push(k + '=' + transVal(o[k]))
  }
  return t.join('&')
}
