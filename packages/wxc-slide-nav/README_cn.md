# wxc-slide-nav 

> Weex 导航滑动视窗增大组件

### 规则
- 上下滚动列表的时候，可以优雅地动画收起展开导航条，使得能展示更多的列表内容


## [Demo](<https://h5.m.taobao.com/trip/wxc-slide-nav/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-slide-nav%2Fdemo%2Findex.native-min.js>)

<img src="https://gw.alipayobjects.com/zos/rmsportal/ERzwXExyQcqgmXzPxGgf.gif" width="240" />&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1Cg02SFXXXXc3apXXXXXXXXXX-200-200.png" width="160" />

## 使用方法

```vue
<template>
  <div class="wrapper">
      <list
        ref="scroller"
        @scroll="onScroll"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
        @touchstart.native="onTouchStart"
        @touchmove.native="onTouchMove"
        @touchend.native="onTouchEnd"
        @touchcancel.native="onTouchEnd">
        <cell>
          <div class="padding"></div>
        </cell>
        <cell class="cell" v-for="(item, index) in items">
            <text class="text">{{index + 1}}</text>
        </cell>
      </list>
  
      <wxc-slide-nav class="nav nav-top" ref="topNav" position="top" @slideIn="slideIn">
        <div class="nav-cell"><text>前一天</text></div>
        <div class="nav-cell"><text>06-22</text></div>
        <div class="nav-cell"><text>后一天</text></div>
      </wxc-slide-nav>
  
      <wxc-slide-nav class="nav nav-bottom" ref="bottomNav" position="bottom" @slideOut="slideOut">
        <div class="nav-cell"><text class="nav-text">筛选</text></div>
        <div class="nav-cell"><text class="nav-text">时间</text></div>
        <div class="nav-cell"><text class="nav-text">从低到高</text></div>
      </wxc-slide-nav>
    </div>
</template>
<script>
  import { WxcSlideNav } from 'weex-ui';
  export default {
      data() {
        return { items: new Array(50) }
      },
      components: { WxcSlideNav },
      methods: {
        onTouchStart: WxcSlideNav.handleTouchStart,
        onTouchEnd: WxcSlideNav.handleTouchEnd,
        onTouchMove(e) {
          WxcSlideNav.handleTouchMove.call(this, e, this.$refs.bottomNav);
        },
        onScroll(e) {
          WxcSlideNav.handleScroll.call(this, e, this.$refs.scroller, this.$refs.topNav, this.$refs.bottomNav);
        },
        slideIn() {},
        slideOut() {}
      }
  }
</script>
```

由于兼容性以及其他原因，目前API使用起来不是特别优雅，需要配合在`<list>`组件上手动绑定事件

```
<list
  ref="scroller"
  @scroll="onScroll"
  <!-- 针对Native -->
  @touchstart="onTouchStart"
  @touchmove="onTouchMove"
  @touchend="onTouchEnd"
  @touchcancel="onTouchEnd"
  <!-- 针对H5 -->
  @touchstart.native="onTouchStart"
  @touchmove.native="onTouchMove"
  @touchend.native="onTouchEnd"
  @touchcancel.native="onTouchEnd">
  <cell>
    <div class="padding"></div>
  </cell>
</list>
```

另外`list`顶部需要添加`padding`，因为`list`和`cell`不支持`padding`和`margin`样式，需要在里面加一个占位的`cell`充当`padding`，高度与 `topNav` 一致

```
<cell>
  <div class="padding"></div>
</cell>
...
<style>
  .padding {
    width: 750px;
    height: 80px;
  }
</style>
```

然后在事件回调里绑定`slideNav`的事件方法，其中`onTouchMove`和`onScroll`需要传入`scroller`和`slideNav`对象

```
onTouchStart: WxcSlideNav.handleTouchStart,
onTouchEnd: WxcSlideNav.handleTouchEnd,
// 下面方法不要使用箭头函数，会导致this指向错误
onTouchMove(e) {
  WxcSlideNav.handleTouchMove.call(this, e, this.$refs.bottomNav);
},
onScroll(e) {
  WxcSlideNav.handleScroll.call(this, e, this.$refs.scroller, this.$refs.topNav, this.$refs.bottomNav);
}
```

### 可配置参数

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| position | `String` |`N`| `'top'` | 位置`top/bottom` |
| height | `[String,Number]` |`N`| `-` | 高度 |

### 支持事件

* `slideIn`：滑出来（展示）
* `slideInEnd`：滑出来结束
* `slideOut`：滑出去（隐藏）
* `slideOutEnd`：滑出去结束 

