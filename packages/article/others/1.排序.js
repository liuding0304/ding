// 快速排序
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pointIndex = Math.floor(arr.length - 1)
  const pointItem = arr.splice(pointIndex, 1)[0]
  const left = [];
  const right = [];
  arr.forEach((item) => {
    if (item > pointItem) {
      right.push(item)
    } else {
      left.push(item)
    }
  })

  return quickSort(left).concat(pointItem).concat(quickSort(right))
}


// 3.1 冒泡排序
function sort(arr) {
  if (!Array.isArray(arr)) {
   throw new Error('xx');
  }

  if ([0, 1].includes(arr.length))  {
   return arr;
  }

  for (let i = 0; i < arr.length; i++) {
    const max = arr[i];
    for (let j = i + 1; j < arr.length; j++) {
      const item = arr[j];
       if(item < max) {
         const temp = arr[i];
         arr[i] = arr[j];
         arr[j] = temp;
       }
    }
  }
  return arr;
 }

const arr = [5,6,2,1,4,9,7,67,4,4,3,2,4,5,76,4,3]
console.log(quickSort(arr))
