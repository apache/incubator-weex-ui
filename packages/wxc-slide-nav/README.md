# wxc-slide-nav 

> Parallax rolling expansion.

### Rule
- When scrolling up and down the list, you can gracefully animate the open navigation bar to show more of the list content.


## [Demo](<https://h5.m.taobao.com/trip/wxc-slide-nav/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-slide-nav%2Fdemo%2Findex.native-min.js>)

<img src="https://gw.alipayobjects.com/zos/rmsportal/ERzwXExyQcqgmXzPxGgf.gif" width="240" />&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1Cg02SFXXXXc3apXXXXXXXXXX-200-200.png" width="160" />

## Code Example

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
        <div class="nav-cell"><text>Before</text></div>
        <div class="nav-cell"><text>06-22</text></div>
        <div class="nav-cell"><text>Next</text></div>
      </wxc-slide-nav>
  
      <wxc-slide-nav class="nav nav-bottom" ref="bottomNav" position="bottom" @slideOut="slideOut">
        <div class="nav-cell"><text class="nav-text">Filter</text></div>
        <div class="nav-cell"><text class="nav-text">Time</text></div>
        <div class="nav-cell"><text class="nav-text">From</text></div>
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

Due to the compatibility and other reasons, to use the API is not particularly elegant, need to cooperate in `<list>` manual binding event.

```
<list
  ref="scroller"
  @scroll="onScroll"
  <!-- to Native -->
  @touchstart="onTouchStart"
  @touchmove="onTouchMove"
  @touchend="onTouchEnd"
  @touchcancel="onTouchEnd"
  <!-- to H5 -->
  @touchstart.native="onTouchStart"
  @touchmove.native="onTouchMove"
  @touchend.native="onTouchEnd"
  @touchcancel.native="onTouchEnd">
  <cell>
    <div class="padding"></div>
  </cell>
</list>
```

In addition, the top of `list` needs to add `padding`, because `list` and `cell` do`nt support `padding` and `margin` styles. It needs to add a placeholder `cell` to `padding`, which is highly consistent with `topNav`.

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

The event method of `slideNav` is then bound in the event callback, where `onTouchMove` and `onScroll` need to be passed into the `scroller` and `slideNav` objects.

```
onTouchStart: WxcSlideNav.handleTouchStart,
onTouchEnd: WxcSlideNav.handleTouchEnd,
// The following method does not use the arrow function, which results in this pointing error
onTouchMove(e) {
  WxcSlideNav.handleTouchMove.call(this, e, this.$refs.bottomNav);
},
onScroll(e) {
  WxcSlideNav.handleScroll.call(this, e, this.$refs.scroller, this.$refs.topNav, this.$refs.bottomNav);
}
```

### API

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| position | `String` |`N`| `'top'` |nav position `top/bottom` |
| height | `[String,Number]` |`N`| `-` | list height |

### Supporting Event

* `slideIn`
* `slideInEnd`
* `slideOut`
* `slideOutEnd`

