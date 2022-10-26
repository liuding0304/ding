---
title: Tips
description: Tips
open: true
---

记录一些小知识

## 对象的属性赋值注意点

属性的取值，当在对象本身上找不到该属性时，会取原型链上查找；属性的赋值操作是作用于对象本身

```js
var Person = function (name) {
  this.name = name
}
Person.prototype.attrs = {
  attr1: '1',
  attr2: '2',
}
Person.prototype.tags = ['tag1', 'tag2']

var people = new Person('小李')

// 赋值
people.age = 18 // people  { age: 18, name: '小李' }

// 这里看上去是一个赋值操作，其实这里会先对attrs或tags取值，然后对attrs或tags进行操作，
// 这种情况就无意间就修改到了对象的原型，
people.attrs.attr3 = '3'
people.tags.push('tag3')

// 此时原型为
{
  attrs: {
    attr1: '1',
    attr1: '2',
    attr1: '3',
  },
  tags: ['tag1', 'tag2']
}
```

## 函数的参数解构

1. 隐藏的 TypeError

```js
function query(keyword, { namespace = 'root' }) {
  // do something
}

query('不想努力了') // TypeError: Cannot read property 'namespace' of undefined
```

这里本意是 namespace 需要默认为 root，在 query 调用的时候，并没有传入第二个参数，默认会为 undefined，query 函数执行的时候，第二参数会有解构操作，对 undefined 进行解构操作，导致了 TypeError。可以修改为：

```js
// 1. 方法调用者，默认给第二参数传空对象，但对调用者不够友好
query('不想努力了', {})

// 2. query方法给第二参数做默认值处理
function query(keyword, { namespace = 'root' } = {}) {
  // do something
}
// 或者
function query(keyword, { namespace } = { namespace: 'root' }) {
  // do something
}
```

2. 不经意的属性

```js
function query({ keyword, extra }) {
  // do something

  request({ keyword, extra })
}

function request(params) {
  if (hasOwnProperty(params, extra)) {
    console.log('hasOwnProperty extra: ', extra)
  }
}

// 虽然调用query的时候我们并没有传入extra参数，但是在query函数解构的时候，
// extra 被给了默认值undefined, 并将这个值传递到了request中
query({ keyword: '不想努力了' }) //  => hasOwnProperty extra: undefined
```

## NaN 的 JSON 序列化

NaN（Not a Number） 是一个 IEEE754 浮点数标准明确定义的值。在 js 中，NaN 表示非数值,它是 Number 类型，对它执行 typeof 会返回 number。

介绍完了， 来讲讲 NaN 的 JSON 序列化的问题；JSON 的简单值支持字符串、数值、布尔值和 null，并没有 NaN，那么在 JS 中对 NaN 执行序列化会怎么样？

```js
JSON.stringify(NaN) // => "null"
```

可以看到打印出了"null"，也就是说 NaN 被序列化为 null 了， 那么问题就来了，当对"null"进行反序列化，毫无疑问结果就是 null，这会有什么影响呢？

1. 数据类型变了，从 Number 类型变为了 Null 类型，如果代码中有对它进行类型判断可能会出现意料之外的结果
2. NaN 表示非数值，null 是可以被转为为数值 0 的。序列化之前和反序列化之后进行逻辑运算的话结果会不同。
3. 对 NaN 执行 isNaN 会返回 true，但是对 null 执行 isNaN 返回的是 false，

顺路提一下 undefined 的 JSON 序列化。需要注意的是一个对象有值为 undefined 的属性时，在序列化然后再反序列化之后，值为 undefined 的属性就没有了，因此执行 hasOwnProperty 时会有差异。

```
JSON.stringify(undefined) // => undefined
JSON.stringify({ a: undefined}) // => "{}"
JSON.stringify({ a: undefined, b: 1}) // => {"b":1}

var obj = {a: undefined, b: 1}
obj.hasOwnProperty('a') // => true
var objCopy = JSON.parse(JSON.stringify(a))
objCopy.hasOwnProperty(a) // => false
```

JSON 序列化还有很多需要留意的点，这里不一一提及了。总而言之：JSON 的语法支持 6 种类型的值（字符串、数值、布尔值、null、对象、数组），对非这 6 种中的数据进行 JSON 序列化都需要留意其行为。

## 赋值语句遇见了 return

在 js 中， 所有的语句执行后其实都是有一个返回值， 如果语句没有显式的返回值，那他的返回值默认是 undefined。把语句放到 chrome 的控制台，控制台就会打印出语句执行的结果。 图中可以看到 var 声明语句的结果是 undefined，第一条赋值语句的结果 23，相加操作语句的结果是相加的结果。

这里我主要想讨论下赋值语句中的返回结果是语句的左值还是右值的问题。通常情况下，赋值语句执行完毕之后，左值和右值的结果是一致的，不过在不通常的情况下赋值语句执行之后左值和右值的结果可能是不一样的。

```js
// 通常情况
let a
a = 1

// 不通常情况
const int8 = new Int8Array(2)
int8[0] = 190
int8[0] // -66
```

不理解上面例子中不通常情况的同学，可以看下我关于 ArrayBuffer 的这篇文章。赋值语句执行后，毫无疑问右值是 190，但是我们查看到左值是-66，这里是赋值时产生了上溢。这种情况下赋值语句的左值和右值就不相等了，那就有必要讨论下赋值语句的返回值是左值还是右值的问题了。

把之前例子中`int8[0] = 190`在浏览器中跑一下，可以看到打印出了 190，可以确认赋值语句的返回值是右值,但是实际`int8[0]`的值是`-66`;看下面的代码：

```js
function sum1(obj) {
  const int8 = new Int8Array(2)
  return (int8[0] = 190)
}

function sum2(obj) {
  const int8 = new Int8Array(2)
  int8[0] = 190
  return int8[0]
}
sum1() // 190
sum2() // -66
```

sum1 中 return 后面直接跟了赋值语句，sum2 则是先赋值，后返回`int8[0]`的值。经常看到有同学会用 sum1 的写法，其实这种写法我个人是不推荐的，建议用`sum2`的写法

#### 再拓展一下连续赋值

连续赋值语句中每一次赋值都是独立，赋值会从右到左依次执行，新的赋值操作会把上一次的赋值语句执行结果当作右值，而不是把上次的赋值语句的左值当作右值。

```js
const int8 = new Int8Array(2)
const num = (int8[0] = 190)
int8[0] // -66
num // 190   这里不是把int8[0]赋值给num， 而是把语句(int8[0] = 190)的执行结果赋值给num
```

## switch 的 case 判断

下面代码段执行发现并不会打印出`12`，原因是 switch 在做判断的时候是使用的全等号`===`。

```js
const num = 12
switch (num) {
  case '12':
    console.log('12')
    break
}

var undefined = 12
console.log(undefined)
```

### undefined 变量

单词`undefined`并不是 javascript 的保留关键字，使用 undefined 作为变量名代码也是能跑的，但是千万不要这样做，

```js
var undefined = 12
console.log(undefined) // => 12
```

平常很容易看到直接用 undefined 来做 if 判断的代码，

```js
var name

// something

if (name === undefined) {
  // something
}
```

如果有一些恶意的代码给全局声明变量`undefined`，就会导致代码出现异常，为了保证获取到正确的`undefined`,可以使用其他技巧：

1. 使用`void 0`代替

```js
if (name === void 0) {
  // something
}
```

1. 利用函数的形参: 一个函数在调用时，如果没有给形参赋值，那么形参的值就会是`undefined`

```js
;(function (w, u) {
  var name
  // something
  if (name === u) {
    // 这里的u就是准确的undefined
    // something
  }
})(window)
```

1. `typeof undefined`会返回字符串的`undefined`

### 渲染树

dom 树和 css 树合并生成 render 树后，render 树只会包括可见的节点
