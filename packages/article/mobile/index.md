# 移动端

## 兼容性问题

1. 在iOS App下的webview点击后出现阴影处理。
  ```scss
    // 解决 ios App 下点击阴影的问题
    * {
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      -webkit-tap-highlight-color:transparent;
    }
  ```



## 微信浏览器（小程序、微信、企业微信环境，公众号开发）

### 小程序webview

小程序官方webview文档[https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html](https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html)

微信jssdk使用文档[https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#0](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#0)

1. 小程序并不会实时接收到webview中的postMessage事件，只会在特定时机（小程序后退、组件销毁、分享）触发并收到消息。e.detail = { data }，data是多次 postMessage 的参数组成的数组
1. 单页应用的路由跳转是不会触发webview的bindload事件。
1. 在webview中，可以用微信jssdk的接口调用小程序的能力
1. 官方tips
    - 网页内 iframe 的域名也需要配置到域名白名单。
    - 开发者工具上，可以在 web-view 组件上通过右键 - 调试，打开 web-view 组件的调试。
    - 每个页面只能有一个 web-view，web-view 会自动铺满整个页面，并覆盖其他组件。
    - web-view 网页与小程序之间不支持除 JSSDK 提供的接口之外的通信。
    - 在 iOS 中，若存在JSSDK接口调用无响应的情况，可在 web-view 的 src 后面加个#wechat_redirect解决。
    - 避免在链接中带有中文字符，在 iOS 中会有打开白屏的问题，建议加一下 encodeURIComponent
