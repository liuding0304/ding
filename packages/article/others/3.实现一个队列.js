// 3.实现一个队列.js


function Queue() {
  const list = []
  this.push = function (...args) {
    list.push(args)
  }
  this.pop = function () {
    return arr.shift()
  }

  this.clear = function() {
    list = []
  }
}
