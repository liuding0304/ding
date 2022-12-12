---
title: 代理与反射（Proxy 和 Reflect）
description: 代理与反射（Proxy 和 Reflect）
open: true
---

# 代理与反射（Proxy 和 Reflect）

> ECMAScript 6 新增的代理和反射为开发者提供了拦截并向基本操作嵌入额外行为的能力。具体地说，可以给目标对象定义一个关联的代理对象，而这个代理对象可以作为抽象的目标对象来使用。在对目标对象的各种操作影响目标对象之前，可以在代理对象中对这些操作加以控制。

在 vue2 中是使用了 Object.defineProperty 实现了响应式，在 Vue3 的实现就是使用了 Proxy。Object.defineProperty 和 Proxy 有什么区别呢?

1. Object.defineProperty 无法监听数组，在 vue2 中，监听数组的变化是通过重写了数组原型上的方法实现的
1. Object.defineProperty 需要给每个属性都添加 defineProperty，Proxy 则是可以对整个对象进行拦截，不需要遍历每个属性
1. Proxy 的监听更加丰富，不仅只有 set 和 get
1. Object.defineProperty 是对对象本事做修改，Proxy 是在原来对象的基础上增加拦截，不会改动到原来对象

## Proxy

- 语法

```js
// target : 需要被Proxy拦截的目标对象
// handler : 定制拦截行为的对象，
const proxy = new Proxy(target, handler)
```

- 使用

```js
const target = {
  name: 'dean',
  age: 28,
  getName() {
    return this.name
  },
  addAge() {
    this.age++
  },
}
const handler = {
  get(trapTarget, property, receiver) {
    console.log(`get property: ${property}`)
    if (property === 'age') {
      return 18
    }
    return Reflect.get(...arguments)
  },
  set(target, property, value, receiver) {
    console.log(`set property: ${property}`)
    if (property === 'age') {
      console.log('can not set age')
      return
    }
    return Reflect.set(...arguments)
  },
}
const proxy = new Proxy(target, handler)

proxy.age // => 18, get中拦截了age，获取到的年龄永远都是18，永远年轻
proxy.age = 29 // => can not set age
target.age // => 28 年龄无法主观修改，主通过时间的流失而增加
```

Proxy 一共可以捕获 13 种基本操作。上面的例子拦截了 get 和 set，其实可以拦截还有 has、defineProperty、getOwnPropertyDescriptor、deleteProperty、ownKeys、getPrototypeOf、setPrototypeOf、isExtensible、preventExtensions；如果目标对象是函数，还可以拦截 apply 和 construct。

- 可撤销代理，通过 Proxy.revocable 方法创建的代理支持撤销代理对象和目标对象的关联，撤销之后，通过代理对象去操作都会抛出 TypeError

```js
const target = {
  name: 'dean',
  age: 28,
}
const handler = {
  get() {
    console.log('get property')
    return Reflect.get(...arguments)
  },
}
const { proxy, revoke } = Proxy.revocable(target, handler)
proxy.name // dean
revoke()
proxy.name // TypeError
```

## Reflect

上节的例子中有用到 Reflect，Reflect 是一个内置的对象，它把 JavaScript 的基本操作封装成了方法，开发者可以通过调用它的方法来实现 JavaScript 的基本操作。上节中提到的 13 中基本操作在 Reflect 中都有对应的方法，这样我们在使用 Proxy 的时候就不需要给每一个属性去写一个拦截，直接用 Reflect 提供的方法就可以了。

Reflect 的使用

```js
const dean = {
  name: 'dean',
  age: 28,
}
Reflect.set(dean, 'age', 29) // 赋值操作
dean.age // 29
Reflect.get(dean, 'name') // dean 取值操作
```

## 兼容性

Proxy 和 Reflect 是 es6 新的基本能力，之前的 es 版本不能通过 polyfill 来实现代理。可以才[can i use](https://caniuse.com/?search=Proxy) 查看兼容性
