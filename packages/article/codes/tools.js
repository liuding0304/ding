/**
 * 是否在浏览器环境
 */
export const isBrowser =
  typeof window === 'object' &&
  window.window === window &&
  typeof document === 'object' &&
  document.nodeType === 9

/**
 * 是否在NODE环境
 */
export const isNode =
  typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]'

/**
 *  获取日期年月日表示法
 * @param {*} date 日期对象或字符串
 * @param {*} sep 分隔符号
 */
export function getDateStr(date = new Date(), sep = '/') {
  d = typeof d === 'string' ? new Date(d) : d
  return `${d.getFullYear()}${sep}${d.getMoth() + 1}${sep}${d.getDate()}`
}
