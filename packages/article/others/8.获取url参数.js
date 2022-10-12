// 获取url参数
function getQuery(search) {
  search = search || location.search;
  const queryStr = search ? search.substr(1): '';
  const queryArr = queryStr.split('&');
  const res = {};

  queryArr.forEach((str) => {
    const charIndex = str.indexOf('=')
    if (charIndex > 0) {
      const key = str.substr(0, charIndex);
      const value = decodeURIComponent(str.substr(charIndex + 1));

      if (res[key]) {
        res[key] = Array.isArray(res[key]) ? res[key] : [res[key]];
        res[key].push(value)
      } else {
        res[key] = value
      }
    }
  })

  return res;
}


console.log(getQuery('?sdf=1&b=23&b=%3D876*12%26123sd%E6%92%92%E6%97%A6%E6%B3%95'));
