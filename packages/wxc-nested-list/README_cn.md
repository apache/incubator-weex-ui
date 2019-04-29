# wxc-nested-list

## 效果

<img src="http://cdn.emas-poc.com/material/weex/4dml3-hnzk7.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="http://cdn.emas-poc.com/material/weex/weex-ui-z-1.jpg" width="160"/>

## 使用方法

!> 建议weex_sdk更新到0.20+。

```vue
<template>
  <list>
    <header>
      <image style="width:750px;height:350px" src="https://gw.alicdn.com/tfs/TB1SOyrSVXXXXb3XXXXXXXXXXXX-1000-667.jpg"></image>
      <div style="width:750px;height:350px;position:absolute;left:0;top:0;justify-content:center;align-items:center">
        <text style="font-size: 50px;color:#ffffff;">header</text>
      </div>
    </header>
    <cell>
      <WxcNestedList @onLoadmore='onLoadmore' :isResetLoadMore='true' :styles="{backgroundColor: 'red'}" @onListClick='onList'>
            <div class="cell"  v-for="(num, i) in [1,2,3,4,5,6]" :key="'wxc-nested-' + i">
                <div class="panel">
                  <text class="text">{{num}}</text>
                </div>
            </div>
      </WxcNestedList>
    </cell>
    
    <cell class="cell" v-for="num in lists" :key="num">
      <div class="panel">
        <text class="text">{{num}}</text>
      </div>
    </cell>
  </list>
  
</template>

<script>
import { WxcNestedList } from 'weex-ui'
const modal = weex.requireModule("modal");

export default {
  components: {
    WxcNestedList
  },
  data() {
    return {
      lists: ["A", "B", "C", "D", "E", "F"],
    };
  },
  methods: {
    onList() {
      modal.toast({
        message: "触发单击",
        duration: 0.3
      });
    },
    onLoadmore() {
      modal.toast({
        message: "触发刷新",
        duration: 0.3
      });
    },
  }
};
</script>

<style scoped>
.header {
  height: 200px;
  width: 750px;
  background-color: blue;
  color: white;
}

.panel {
  width: 750px;
  height: 200px;
  flex-direction: column;
  justify-content: center;
  border-width: 2px;
  border-style: solid;
  border-color: rgb(162, 217, 192);
  background-color: rgba(162, 217, 192, 0.2);
}
.text {
  font-size: 88px;
  text-align: center;
  color: #41b883;
}
</style>
```

更详细代码可以参考 [这里](https://github.com/alibaba/weex-ui/blob/master/example/nested-list/index.vue)

### 可配置参数
| Prop | Type | Required | Default | Description |
| ---- |:----:|:---:|:-------:| :----------:|
| **`styles`** | `Object` | `N` | `-` | 设置样式 |
| **`isLevel`** | `Boolean` | `N` | `false` | 是否水平滑动 |
| **`isResetLoadMore`** | `Boolean` | `N` | `false` | 是否强制刷新 |
| **`isPagingEnabled`** | `Boolean` | `N` | `false` | 是否按分页模式 |
| **`isShowScrollbar`** | `Boolean` | `N` | `false` | 是否显示滚动条 |

### 事件回调

```
// 滚动到底部触发	@onLoadmore='onLoadmore'
// 单击	@onListClick='onListClick'
// 将在触摸到触摸面上时触发	@onTouchstart='onTouchstart'
返回e
// 将在触摸点在触摸面移动时被触发	@onTouchmove='onTouchmove'
返回e
// 将在从触摸面离开时被触发	@onTouchend='onTouchend'
返回e
```