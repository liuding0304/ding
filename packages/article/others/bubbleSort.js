/**
 * 改良版冒泡排序
 * @param {*} arr
 * @param {*} cmp
 */
function bubbleSort(arr, cmp) {
  cmp = typeof cmp === 'function' || compare;
  for (let i = 0, len = arr.length; i < len; i++) {
    let j = i;
    for (; j > 0; j--) {
      if (cmp(arr[j], arr[j - 1]) < 0) {
        const temp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = temp;
      } else {
        break;
      }
    }
  }
  return arr;
}

function compare(a, b) {
  return a - b;
}

