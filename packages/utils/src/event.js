export default class Event {
  constructor() {
    this._events = {}
  }
  on(name, fn) {
    const evt = this._events[name] || (this._events = [])
    typeof fn === 'function' && evt.push(fn)
    return this
  }
  emit(name, context, ...arg) {
    const evt = this._events[name]
    if (evt && evt.length) {
      evt.forEach((fn) => {
        fn.call(context || null, ...arg)
      })
    }
    return this
  }
  once(name, fn) {
    const onceFn = (...args) => {
      fn(...args)
      this.off(name, onceFn)
    }
    this.on(name, onceFn)
  }

  off(name, fn) {
    if (name) {
      const evt = this._events[name]
      if (typeof fn === 'function') {
        this._events = this._events.filter((f) => f !== fn)
      } else {
        this._events[name] = []
      }
    } else {
      this._events = {}
    }
  }
}
