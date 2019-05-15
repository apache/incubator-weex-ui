# wxc-overlay 

> Weex 蒙层组件

### 规则
- 常用于 wxc-mask、wxc-dialog、wxc-popup 等的基础蒙层组件

## [Demo](https://h5.m.taobao.com/trip/wxc-overlay/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-overlay%2Fdemo%2Findex.native-min.js)
<img src="https://gw.alipayobjects.com/zos/rmsportal/uVBoujAIcLFYDociannN.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1rXrwSpXXXXb3aFXXXXXXXXXX-200-200.png" width="160"/>

## 使用方法

```vue
<template>
  <div class="wrapper">
    <div class="btn" @click="openOverlay">
      <text class="btn-txt">点击打开蒙层</text>
    </div>
    <wxc-overlay
      :show="show"
      opacity="0.6"
      @wxcOverlayBodyClicked="wxcOverlayBodyClicked"></wxc-overlay>
  </div>
</template>
<script>
  import { WxcOverlay } from 'weex-ui';
  export default {
    components: { WxcOverlay },
    data: () => ({
      show: false
    }),
    methods: {
      openOverlay () {
        this.show = true;
      },
      wxcOverlayBodyClicked () {
        this.show = false;
      }
    }
  };
</script>
```
更详细代码可以参考 [demo](https://github.com/alibaba/weex-ui/blob/master/example/overlay/index.vue)


### 可配置参数

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|
| show | `Boolean` |`Y`| `false` | 是否开启  |
| left | `Number` |`N`| `0` | 向左移动距离  |
| opacity | `Number` |`N`| `0.6` | 蒙层opacity度数0-1 |
| has-animation | `Boolean` |`N`| `true` | 是否开启蒙层出现动画  |
| can-auto-close | `Boolean` |`N`| `true` | 是否可以点击自动关闭  |
| duration | `Number` | `300` |`N`| 蒙层动画时间  |
| timing-function | `Array` |`N`| `['ease-in','ease-out']` | 蒙层显示和隐藏动画函数 |


### 事件回调

```
 //消失后
 `@wxcOverlayBodyClicked="wxcOverlayBodyClicked"`;
 //点击立即
 `@wxcOverlayBodyClicking="wxcOverlayBodyClicking"`;
```
