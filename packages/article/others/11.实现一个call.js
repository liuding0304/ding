// 实现一个call

Function.prototype._call = function (obj, ...args) {
  // 0. 检验参数
  if (!(obj instanceof Object)) {
    obj = {}
  }

  // 1. 设置该函数为obj的一个属性
  let res;
  const KEY = Symbol();
  obj[KEY] = this;

  //  2. 调用
  res = obj[KEY](...args);

  // 3. 删除属性
  delete obj[KEY]

  return res;
}
