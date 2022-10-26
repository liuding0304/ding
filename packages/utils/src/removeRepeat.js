/**
 * 对象数组去重
 * @param {*} arr 对象数组
 * @param {*} key 唯一标志key
 */
export default function removeRepeat(arr, key = 'id') {
  if (!Array.isArray(arr)) {
    throw new TypeError('arr must be a Array');
  }
  const hash = {};
  return arr.reduce((prev, next) => hash[next[key]] ? prev : prev.push(next), []);
}
