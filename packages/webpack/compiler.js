const {
  SyncHook,
  AsyncSeriesHook
} = require('tapable')

module.exports = class Compiler {
  constructor() {
    this.hooks = {
      accelerate: new SyncHook(['newspeed']),
      break: new SyncHook(),
      calculateRoutes: new AsyncSeriesHook(['source', 'target', 'routesList']),
    }
  }

  run() {
    this.accelerate(10)
    this.break()
    this.calculateRoutes('Async', 'hook', 'demo')
  }
  // 加速
  accelerate(speed) {
    this.hooks.accelerate.call(speed)
  }
  // 刹车
  break () {
    this.hooks.break.call()
  }
  // 计算路线
  calculateRoutes() {
    this.hooks.calculateRoutes.promise(...arguments).then(() => {

    }).catch((err) => {
      console.log(err)
    })
  }
}