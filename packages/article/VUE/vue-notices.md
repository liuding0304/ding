# Vue开发注意事项

1. 细读vue风格指南(https://cn.vuejs.org/v2/style-guide/)
1. 只有当实例初始化时data中存在的数据才是响应式的。（$set方法添加的属性除外）
1. 不要在选项属性或回调上使用箭头函数，比如 created: () => console.log(this.a) 或 vm.$watch('a', newValue => this.myMethod())。因为箭头函数并没有 this，this 会作为变量一直向上级词法作用域查找，直至找到为止，经常导致 Uncaught TypeError: Cannot read property of undefined 或 Uncaught TypeError: this.myMethod is not a function 之类的错误。
1. 慎用v-html，防止XSS攻击。
1. 模板中仅支持javascript表达式，不支持语句，并且只能访问实例上的数据， 不要在模板中使用Math、Date等全局变量。
1. 每当触发重新渲染时，template中的所有调用方法总会再次执行函数。
1. 不要在computed的getter方法里面去修改其他值，计算属性默认的是getter方法
1. 熟知key属性的原理(https://cn.vuejs.org/v2/api/#key)
1. 熟知数组更新检测，变异方法：push、pop、shift、unshift、splice、sort、reverse；对数组项直接赋值和修改数组长度时，Vue不能检测到数组的变化。必须的情况下可以使用`$set`。
1. 慎用reject与provide, 会使代码不易于维护
1. 理解单向数据流，不要在子组件中修改props
1. 使用`Object.assign`为对象赋值多个属性时， 需要使用`this.obj = Object.assgin({}, this.obj, {a: 1})`, 如果使用`Object.assgin(this.obj, {a: 1})`,则新加属性a将不具备响应式
1. 使用vue-router的hash模式时，query参数可能同时出现在#号前面和后面，比如：http://www.ab.com/cas/index.html?a=1&b=2#/index?a=1&c=3, 在发送请求的时候，请求地址上是不会带上url的hash部分的，这可能导致请求地址需要重定向的时候链接的hash部分丢失，综上原因，建议使用vue-router的history模式。

