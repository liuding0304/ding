# flex布局

Flex 是 Flexible Box 的缩写，意为"弹性布局"。

采用flex布局的元素称为flex容器，其子元素成为flex项目


```css
.div {
  display: flex; // 设置为flex布局
}

```


## 1、 flex容器可以设置的属性

### 1.1、 flex-direction

  决定主轴的方向，可选值:

  - row ：水平方向， 从左至右排列
  - row-reverse： 水平方向，从右至左排列
  - column：垂直方向，从上至下排列
  - column-reverse：垂直方向、从下至上排列

### 1.2、 flex-wrap
  决定主轴的换行方式，可选值：
  - no-wrap， 不换行
  - wrap ：换行，第一行在最上面
  - wrap-reverse：换行，第一行在最下面

### 1.3、flex-flow
  flex-direction属性和flex-wrap属性的简写
  ```css
    .div {
      display: flex;
      flex-flow: row no-wrap;
    }
  ```

### 1.4、justify-content
  决定项目在主轴的对齐方式, 可选值:
  - flex-start
  - flex-end
  - center
  - space-between
  - space-around;

### 1.5、align-items
  决定项目在交叉轴的对齐方式, 可选值:
  - flex-start
  - flex-end
  - center
  - baseline
  - stretch;

### 1.6、align-content
  当主轴有换行的时候，决定每一行在交叉轴上的对齐方式
  - flex-start
  - flex-end
  - center
  - stretch
  - space-between
  - space-around

## 2、项目可设置的属性

### 2.1、order
定义项目的排列顺序。数值越小，排列越靠前，默认为0

### 2.2、flex-grow
定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大

### 2.3、flex-shrink
定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小

### 2.4、flex-basis
定义了在分配多余空间之前，项目占据的主轴空间

### 2.5、flex
flex-grow flex-shrink flex-basis 的简写
 flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]

### 2.6、align-self
允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性



