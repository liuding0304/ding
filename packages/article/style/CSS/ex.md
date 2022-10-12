## 纯css实现高度与宽度固定比例

原理: padding的百分比计算是根据父元素的宽度来计算。

1. 因此我们可以为子元素的`padding-bottom`设置为`50%`，然后设置高度为0， 宽度设置为`100%`，这样就我们就得到了一个高度为宽度的`50%`的div， 但是因为这个盒子的高度是0,如果我们在这个div里直接写内容， 就会出现各种问题(比如`flex`布局不能用)，
2. 所以加了一个绝对定位的div， 设置`top: 0; bottom: 0; left: 0; right: 0;`使这个div的高度和宽度是父元素的100%， 到此就获得了一个高度为宽度一半的div,并且可以正常的布局了。
3. 改`padding-bottom`的百分比, 就可以获得想要的比例了。

```html
<html>
	<head>
	<style>
	.parent {
		width: 800px;
	}
	.child {
		height: 0;
		padding-bottom: 50%;
		position: relative;
	}
	.content {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: pink;
	}
	</style>
	</head>
	<body> 
	<div class="parent">
		<div class="child">
			<div class="content">
			</div>
		</div>
	</div>
	</body>
</html>
```

