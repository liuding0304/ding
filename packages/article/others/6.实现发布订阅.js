// 实现一个发布订阅
function Event() {
  this.events = {}
}

Event.prototype.on = function (eventKey, callback) {
  if (callback === undefined && callback === null) {
    return;
  }
  this.events[eventKey] =  this.events[eventKey] || [];

  if (typeof callback === 'function') {
    this.events[eventKey].push(eventKey)
  }
}


Event.prototype.emit = function (eventKey) {
  const args = Array.prototype.slice.call(arguments, 1)
  const fns = this.events[eventKey]
  if (fns) {
    fns.forEach((callback) => {
      callback.apply(null, args)
    })
  }
}


Event.prototype.del = function (eventKey) {
  if (callback === undefined && callback === null) {
    this.events = {}
  } else if(this.events[eventKey]){
    this.events[eventKey] = [];
  }
}

// class EventES6 {
//   constructor() {
//     this.events = {};
//   }
// }
