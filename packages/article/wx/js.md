# js
小程序的js最终会运行在jsCore中

## 小程序增加在API

1. APP 方法，用于程序注册

```js
// app.js
App({
  onLaunch (options) {
    // Do something initial when launch.
  },
  onShow (options) {
    // Do something when show.
  },
  onHide () {
    // Do something when hide.
  },
  onError (msg) {
    console.log(msg)
  },
  globalData: 'I am global data'
})
```

1. Page方法， 用于页面注册

1. getApp方法，用于获取App实例

1. getCurrentPage，用于获取页面栈



## 无法使用的API

`window`、`document`





