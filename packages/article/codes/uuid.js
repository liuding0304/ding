/*
 * @Author: liuding
 * @Date: 2020-02-15 10:56:24
 * @Last Modified by: liuding
 * @Last Modified time: 2020-02-15 11:00:25
 */

/**
 * 生成UUID
 * @param {Number} len 生成的uuid的长度
 * @param {Number} radix 进制： 2 | 8 | 10 | 16
 * @returns
 */
function uuid(len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  var uuid = [],
    i
  radix = radix || chars.length

  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
  } else {
    var r
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }

  return uuid.join('')
}

export default uuid
