// 大整数求和
export default function add(a, b) {
  let i = a.length - 1;
  let j = b.length - 1;

  let carry = 0
  let ret = '';

  while(i >= 0 || j>=0 ) {
    let x = 0;
    let y = 0;
    let sum;

    if (i >= 0) {
      x = +a[i]
    }
    if (j >= 0) {
      y = +b[j]
    }
    sum = x + y + carry
    carry = sum >= 10 ? 1: 0
    sum = sum % 10
    ret = sum + ret
    i--;
    j--;
  }

  if (carry) {
    ret = carry + ret
  }

  return ret;
}
