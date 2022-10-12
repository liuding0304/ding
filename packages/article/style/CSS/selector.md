# CSS 选择器

`E`表示标签名，`S`表示一个选择器

## 基本选择器

|名称            |选择器        |    用法         |
|-               |:-:          |     -         |
|通配符          |*             | 匹配任何元素|
|标签选择器       | E           | 匹配所有E标签元素|
|class选择器     | .className   | 匹配具有类名为className的所有元素|
|id选择器        | #idName      | 匹配id属性为idName的所有元素|


## 属性选择器

|    选择器       |      用法       |
|      -         |       -        |
|    S[attr]     | 匹配具有attr属性的所有S元素|
|    S[attr=val] | 匹配attr属性值为val的所有S元素|
|   S[attr~=val] | 匹配attr属性值具有多个空格分开的值，其中一个值为val的所有S元素|
|   S[attr|=val] | 匹配attr属性值有多个连字号分隔的值，其中一个值以val开头的所有S元素|
|   S[attr^=val] | 匹配attr属性值以val开头的元素|
|   S[attr$=val] | 匹配attr属性值以val结尾的元素|
|   S[attr*=val] | 匹配attr属性值包含val字符串的元素|

## 伪类

伪类选择器在组合使用的时候， 需要将伪类选择放在最后。伪类选择器比较多，完整的移步[https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Selectors](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Selectors)

|    选择器             |      用法       |
|      -               |       -        |
|    :hover           | 匹配鼠标悬停的元素 |
|    :focus           | 匹配获得焦点的元素 |
|    :active          | 匹配鼠标点击还没有松开的元素 |
|    :checked          | 匹配鼠标点击还没有松开的元素 |
|    :link            | 匹配未被点击的链接 |
|    :visited          | 匹配已被点击过的链接 |
|    :first-child     | 匹配同级元素中的第一个元素 |
|    :first-of-type     | 匹配同级元素中的同标签的元素中的第一个元素（相比于first-child增加了标签名的隔离） |
|    :last-child      | 匹配同级元素中的最后个元素 |
|    :last-of-type     | 匹配同级元素中的同标签的元素中的最后一个元素（相比于last-child增加了标签名的隔离） |
|    :nth-child(an+b)    | 匹配同级元素中第an+b个元素，其中a、b为整数 |
|    :nth-of-type(an+b)    | 匹配同级元素切同类型元素中第an+b个元素，其中a、b为整数 |
|    :nth-last-child(an+b)    | 同nth-child， 区别为从后开始匹配 |
|    :nth-last-of-type(an+b)    | 同nth-of-type 区别为从后开始匹配  |
|    :only-child   | 匹配没有同级元素的元素  |
|    :only-of-type   | 匹配没有相同类型同级元素的元素  |


## 伪元素

|    选择器             |      用法       |
|      -               |       -        |
|    S::before          | 为S创建一个伪元素， 这个元素是S的第一个子元素|
|    S::after           | 为S创建一个伪元素， 这个元素是S的最后一个子元素 |
|    S::first-line      | 匹配S元素的第一行 |
|    S::first-letter      | 匹配S元素的第一个字母 |

## 组合

|名称            |选择器        |    用法         |
|-               |:-:          |     -         |
|相邻选择         | a + b       | 匹配b元素， b元素的前一个统计元素为a|
|兄弟选择         | a ~ b       | 匹配b元素， 同级元素中有个元素为a|
|子选择器         | a > b       | 匹配b元素， b元素的父元素必须是a|
|后代选择器       | a  b        | 匹配b元素， b元素的祖先元素有一个是a |
