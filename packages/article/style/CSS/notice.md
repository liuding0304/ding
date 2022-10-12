# css遇坑指南

1. 盒子，图片等宽度设置首选百分比，次而选择rem，高度可以是固定值

1. 字体可以不用rem，误差太大了，且不能满足任何屏幕下字体大小相同,所以建议标题类用rem，要求字体大小相同的部分还是用px；

1. 遇到内容排列显示的布局，建议放弃float，可以直接使用display:inline-block。

1. 慎用position属性；absolute会脱离文档流，relative则不会

1. 如何解决盒子边框溢出？当你把元素宽度设为 width:100%时，有时可能会遇到元素的宽度超出了屏幕，这时可对元素加box-sizing:border-box属性，用来指定盒子大小包含边框和内边距

1. 去除button在ios上的默认样式
```css
-webkit-appearance: none; border-radius: 0;
```

1. 不想让按钮touch时有蓝色的边框
``` css
outline:none;
```

1. 去除webkit的滚动条
```css
element::-webkit-scrollbar{  
    display: none;
}
```

1. 遇到过一个问题就是，当手机端点击input弹出键盘，整个视窗的高度就会变为减去键盘的高度，页面底部样式会乱，当时解决方法是用js获取整个页面高度赋值给body，等于说在不同的设备下写死不同的body高度值，底部就不会乱了
``` js
$("body").css("height",parseInt($(".wrap").height())+parseInt($(".icon-main").height()));
```



1. 如果想改变 placeholder里的文字，需要用c伪类
```css
::-webkit-input-placeholder {
    color:#ccc
}
```


div包裹img div下面有留白 ， 设置div lint-height最够小 或者img dispaly: block; 

vertical-align: middle; 
font-size: 0