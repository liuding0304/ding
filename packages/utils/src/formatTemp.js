import getValueByPath from './getValueByPath'

/**
 * 模板字符串解析
 * @param {*} str
 * @param {*} obj
 */
export function formatTemp(str, obj) {
  return str.replace(/\$\{([\w.]+)\}/g, ($0, $1) => getValueByPath(obj, $1))
}
