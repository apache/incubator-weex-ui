# wxc-overlay 

> Weex蒙层组件，可以设置蒙层透明度,同时可以设置弹出动画。

- 规则：
    - 常用于wxc-mask、wxc-dialog、wxc-popup等weex组件的基础组件。


## [Demo预览](https://h5.m.taobao.com/trip/wxc-overlay/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-overlay%2Fdemo%2Findex.native-min.js)
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
      @wxcOverlayBodyClicked="wxcOverlayBodyClicked"
      opacity="0.6"></wxc-overlay>
  </div>
</template>
<script>
  import wxcOverlay from '@ali/wxc-overlay';
  export default {
    components: { wxcOverlay },
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

| 名称      | 类型     | 默认值   | 备注  |
|-------------|------------|--------|-----|
| opacity | `number` | 0.6 | 蒙层opacity度数0-1 |
| show | `bool` | false | 是否开启  |
| has-animation | `bool` | true | 是否开启蒙层出现动画  |
| can-auto-close | `bool` | true | 是否可以点击自动关闭  |
| duration | `Number` | 300 | 蒙层动画时间  |
| timing-function | `Array` | `['ease-in','ease-out']` | 蒙层显示和隐藏动画函数(和animation动画一致)  |


### 事件回调

```
 //请参考demo中的具体用法
 //消失后
 `@wxcOverlayBodyClicked="wxcOverlayBodyClicked"`;
 //点击立即
 `@wxcOverlayBodyClicking="wxcOverlayBodyClicking"`;
```
