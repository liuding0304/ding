/**
 * 通过key路径在对象（包括数组）中获取值
 * @export
 * @param {Array | Object} object  数据源
 * @param {String} prop 属性名 | 属性名路径
 * @returns
 */
export default function getValueByPath(object, prop) {
  prop = prop || ''
  const paths = prop.split('.')
  let current = object
  let result = null
  for (let i = 0, j = paths.length; i < j; i++) {
    const path = paths[i]
    if (!current) break

    if (i === j - 1) {
      result = current[path]
      break
    }
    current = current[path]
  }
  return result
}
