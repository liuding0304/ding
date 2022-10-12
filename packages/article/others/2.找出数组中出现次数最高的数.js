// 2 找出数组中出现次数最高的数
function findMaxTime(arr) {
  const timesObj = {}
  let maxTime = 0;
  let maxItems = [];

  if (!Array.isArray(arr)) {
    return;
  }

  if (arr.length === 1) {
    return {
      maxTime: 1,
      maxItems: arr,
    }
  }

  arr.forEach((item) => {
    if (timesObj[item]) {
      timesObj[item]++;
    } else {
      timesObj[item] = 1;
    }

    if (maxTime < timesObj[item]) {
      maxTime = timesObj[item]
      maxItems = [item]
    } else if (maxTime === timesObj[item]){
      maxItems.push(item)
    }

  })
  return {
    maxTime,
    maxItems,
  }
}

const arr = [1,3,4,5,1,123,123,123,123,1,1,3,4,5,5]

console.log(findMaxTime(arr))
