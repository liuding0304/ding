---
title: 继承
description: 继承
open: true
---

## 继承

1. 原型链

父类的一个实例当做为子类的原型，

```js
function Super() {
  this.name = 'Super'
  this.age = 12
}
Super.prototype.getName = function () {
  return this.name
}

function Sub() {
  this.name = 'sub'
}
Sub.prototype = new Super()
Sub.prototype.constructor = Sub
```

缺点：

> 无法向父类传参

> 通过子类创建的实例，实例本身没有父类的属性（如案例中的 age 属性），父类的属性存在于原型上

2. 借用构造函数

在子类的构造函数上调用父类, 原理是把父类的构造函数的`this`指向子类的实例并调用，父类的构造函数中通过`this.xxx`添加的属性都会被添加到子类的实例上，从而达到继承的效果。

```js
function Super() {
  this.name = 'dean'
  this.getName = function () {
    return this.name
  }
}
function Sub() {
  // 这里也可以用apply，原理是修改this指向
  Super.call(this)
  this.age = 12
}
```

缺点：

> 无法继承父类原型上的属性或方法。

> 通过该方式继承，所有的属性和方法都要挂载在实例上，无法复用，

3. 组合继承（组合原型链和借用构造函数）

原型通过父类创建，并在构造函数中调用父类，

```js
function Super(name) {
  this.name = name
}
Super.prototype.getName = function () {
  return this.name
}
function Sub(name, age) {
  Super.call(this, name)
  this.age = age
}
Sub.prototype = new Super()
Sub.prototype.constructor = Sub
```

缺点：

> 父类执行两次，创建原型一次，新建实例一次

> 部分本应存在实例上的属性，原型上也有。（案例中 name 属性， 不仅子类实例上有，子类的原型上也有该属性）

4. 原型式继承

直接将一个对象作为另一个对象的原型， 无构造函数。

```js
Object.create()
// 等同于
function objectCreate(pro) {
  function Fn() {}
  Fn.prototype = pro
  return new Fn()
}

var SuperObj = {
  name: '',
  getName: function () {
    return this.name
  },
  tags: [1, 2, 3],
}

var SubObj = Object.create(SuperObj)
SubObj.age = 12
```

缺点：

> 只适用于需要某一个对象能够复用另一个对象的属性或方法

> 无法统一给子类的实例本身添加方法或属性，

5. 寄生式继承

在原型式的基础上，在`objectCreate`函数中统一为子类实例添加属性或方法

```js
function create(pro) {
  const obj = Object.create(pro)
  obj.getName = function () {
    return this.name
  }
  obj.name = ''
  return obj
}
```

缺点：

> 在`objectCreate`中给实例添加的属性和方法， 都存在于实例上，

6. 寄生组合式继承（优秀的解决方案）

构造函数中调用父类，实现属性挂载在实例上，通过调用 Object.create 并传入父类的原型，生成一个无任何自己的属性的空对象，但是这个对象的原型是父类的原型然后把子类的方法挂载在该对象上

```js
function Super(name) {
  this.name = name
}
Super.prototype.getName = function () {
  return this.name
}
Super.prototype.a = {}
function Sub(name, age) {
  Super.call(this, name)
  this.age = age
}

var subPro = Object.create(Super.prototype)
subPro.constructor = Sub
Sub.prototype = subPro
Sub.prototype.constructor = Sub
```

总结：

继承方法很多，名称也比较怪异，记忆起来非常不方便，其实一个好的继承应该有以下两个特点：

1. 父类中给实例添加的属性或方法，继承后，这些属性和方法，也是应当在子类的实例上。
1. 父类原型上的属性或方法，继承后，应当是在子类的原型链上

寄生组合式继承就很好的解决了这两个问题，当然也可以直接使用 es6 的继承。寄生组合式和 es6 继承的最终结果都是一致的，甚至可以使用寄生组合式继承来 polyfill es6 的继承
