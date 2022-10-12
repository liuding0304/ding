---
title: mpvue组件复用导致事件混乱问题
description: 博客收藏
open: true
---

# mpvue组件复用导致事件混乱问题

## 场景复现

```vue
<!-- 子组件  -->
  <template>
    <view @click="handlerClick">按钮</view>
  <template />
  <script>
  export default {
    data() {
      return {
        flag: false
      };
    },
    methods: {
      handlerClick () {
        this.flag = !this.flag;
      },
    }
  }
  </script>



```