# BOM对象

BOM即浏览器对象模型，通过BOM，js代码可以实现与浏览器的交互，比如操作浏览器历史、地址、窗口等, `window`就是最顶层的BOM对象


window:
1. window.document 文档对象
1. window.frames 框架对象
1. window.navigator 浏览器对象
1. window.history 浏览器历史对象
1. window.location 浏览器URL对象
1. window.screen 显示器对象
1. window.localStorage/sessionStorage/indexedDB等等

## document文档对象
DOM中文档操作相关对象，Node、Document、Element等DOM节点类型对象

document是window的一个属性，通过document对象可以操作页面所有的节点

## frames 框架对象

frames对象是一个集合，表示当前页面中的所有子框架，

## navigator对象

navigator是指浏览器对象，该对象提供了当前正在使用的浏览器的信息。navigator属性都是只读的

- Navigator.battery 电池信息
- Navigator.geolocation 地理位位置信息
- Navigator.keyboard 键盘功能
- NavigatorOnLine.onLine 是否联网
- NavigatorID.userAgent 浏览器的用户代理


## history对象
history对象来保存浏览器历史记录信息，并可以做相关的操作，回退，前进等

- history.length 会话历史中的个数
- history.back() 回退到上一页
- history.go(num) 根据num的数值进行回退或前进， 如果num为0， 这重载当前页面
- history.pushState() 向会话历史栈push进入一条记录
- history.replaceState() 更新历史栈中当前的记录
- history.forward() 前往下一页

## location对象

location是对当前窗口URL地址的解析。提供了可以访问URL中不同部分的信息属性，也可以通过location对象也可以实现页面或锚点跳转等功能。

- location.href 完成的url，对他进行赋值可以实现页面跳转
- location.protocol URL的协议， 'https:'
- location.host 域名，如有端口号也会带上
- location.hostname 域名， 不会带端口
- location.port 端口号
- location.pathname url中的路径
- location.search url参数，开发会带上`?`
- location.hash url的哈希，开头带上`#`。
- location.username 用户名
- location.password 密码
- location.origin 页面来源的域名


## screen对象

screen对象中包含了用户显示器屏幕相关信息。通过该对象，可以访问用户显示器屏幕宽、高、色深等信息

- screen.width 屏幕宽
- screen.height 屏幕高
