# wxc-popup 

 > Weex版本的popup组件，支持上下左右四个方向面板弹出。
 
 - 规则
  - 从顶部或底部浮出的模态，点击蒙层进行关闭
  - 支持使用者主动关闭popup,譬如this.$refs.wxcPopup.hide();
  - 常用于筛选面板组件的包裹组件


## [Demo预览](https://h5.m.taobao.com/trip/wxc-popup/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-popup%2Fdemo%2Findex.native-min.js)
<img src="https://gw.alipayobjects.com/zos/rmsportal/MmgsYeDkFOioIpiQSfGF.gif" width="240"/>&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1_9v9SpXXXXcuXXXXXXXXXXXX-200-200.png" width="160"/>

## 使用方法

```vue
<template>
  <div class="wrapper">
    <div class="btn yellow  btn-margin" @click="openBottomPopup">
      <text class="btn-txt">点击弹出底部面板</text>
    </div>
    <wxc-popup popup-color="rgb(92, 184, 92)"
               :show="isBottomShow"
               @wxcPopupOverlayClicked="popupOverlayBottomClick"
               pos="bottom"
               height="400">
      <div class="demo-content">
        <image src="https://img.alicdn.com/tfs/TB1ojYvOXXXXXaOXFXXXXXXXXXX-180-41.png" class="demo-image"></image>
        <text>这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容
        </text>
      </div>
    </wxc-popup>
  </div>
</template>

<script>
  import { WxcPopup } from 'weex-ui';
  export default {
    components: { WxcPopup },
    data: () => ({
      isBottomShow: false,
      height: 400
    }),
    methods: {
      openBottomPopup () {
        this.isBottomShow = true;
      },
      //非状态组件，需要在这里关闭
      popupOverlayBottomClick () {
        this.isBottomShow = false;
      }
    }
  };
</script>
```

更详细代码可以参考 [demo](https://github.com/alibaba/weex-ui/blob/master/example/popup/index.vue)

### 可配置参数

| 名称      | 类型     | 默认值   | 备注  |
|-------------|------------|--------|-----|
| pos | `String` | `bottom` | popup出来位置,`top`,`bottom`,`left`,`right`|
| show | `bool` | false | 开启打开popup  |
| height | `String` | 840 | 弹出层的高度(向上向下时候设置)  |
| width | `String` | 750 | 弹出层的宽度(向左向右时候设置)  |
| popup-color | `String` | `#FFFFFF` | 弹出层的颜色 |
| stand-out | `Number` | `0` | 底部突发高度，默认为0 |
| animation | `Object` | `{imingFunction: 'ease-in'}` | 可以自定义面板动画 |
| overlay-cfg | `Object` | `{ hasAnimation: true, timingFunction: ['ease-in', 'ease-out'], duration: 300, opacity: 0.6 }` |  蒙层配置参数，参考[wxc-overlay](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-overlay/README.md)组件|

### 事件回调

```
// 具体使用请参考demo，需要在`@wxcPopupOverlayClicked`中设置面板关闭。
```

### 调用关闭

```
在wxc-popup上面绑定ref，然后调用this.$refs.wxcPopup.hide();即可关闭，常用于侧滑筛选面板
```
