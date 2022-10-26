# vue性能优化

针对vue的性能优化从4个角度出发，template，script，style，组件，打包

## template优化

1. 合理的使用v-show、v-if。涉及到权限的内容，无疑需要使用v-if,对于展示切换频繁的内容，优先使用v-show。v-show只是切换元素的display属性，v-if则会删除和重新渲染元素，v-if可以减少DOM元素，缩减首屏渲染时间。
2. 模板中不要使用太多的表达式，会使得template难以维护。必要的话，可以封装为method和computed。
3. 为列表渲染的每一项都添加key属性，diff算法更快的找对该列表数据，不添加key属性，会出现元素复用的情况。key必须是唯一值， 不能重复。

## script

1. 少用watch，性能开销大。
2. 灵活利用computed的缓存特性。
3. data里面数据维护清晰
4. 理解生命周期，在组件销毁的时候，需要销毁组件内注册的事件，例如: 定时器，window.onresize，eventBus或其他自定义的事件等。


## style


## 组件

1. 组件细化，当组件庞大的时候，vue的数据变更，数据驱动试图更新，会造成试图更新慢，渲染慢的问题。



