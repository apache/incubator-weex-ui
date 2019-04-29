# wxc-mask 

> Weex 弹层组件，可定制内容


## [Demo](https://h5.m.taobao.com/trip/wxc-mask/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-mask%2Fdemo%2Findex.native-min.js)
<img src="https://gw.alipayobjects.com/zos/rmsportal/WMcMaWMTOpBSevBGfNTT.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1CgYJSpXXXXc5aXXXXXXXXXXX-200-200.png" width="160"/>

## 使用方法

```vue
<template>
  <div class="wrapper">
    <div class="btn" @click="openMask">
      <text class="btn-txt">点击弹出动画面板</text>
    </div>
    <div class="btn btn-margin yellow" @click="openNoAnimationMask">
      <text class="btn-txt">点击弹出无动画面板</text>
    </div>
    <wxc-mask height="800"
              width="702"
              border-radius="0"
              duration="200"
              mask-bg-color="#FFFFFF"
              :has-animation="hasAnimation"
              :has-overlay="true"
              :show-close="true"
              :show="show"
              @wxcMaskSetHidden="wxcMaskSetHidden">
      <div class="content">
        <div class="demo-title">
          <text class="title">Weex帮助你构建原生应用</text>
        </div>
        <text class="content-text">
          与 Web App、HTML5 App 或 hybrid App 不同，您可以使用 Weex 构建一个真正的原生应用。更贴心的是你的代码只需使用 HTML、CSS、JavaScript
          可以构建原生应用，上手非常简单。但实际上，应用的底层是 Objective-C 或 Java， 同时，Weex 提供很多 native 组件或模块供开发人员使用。
        </text>
      </div>
    </wxc-mask>
  </div>
</template>

<script>
  import { WxcMask } from 'weex-ui';
  export default {
    components: { WxcMask },
    data: () => ({
      show: false,
      overlayCanClose: true,
      isFalse: false,
      hasAnimation: true
    }),
    methods: {
      openMask (e) {
        this.show = true;
        this.hasAnimation = true;
      },
      wxcMaskSetHidden () {
        this.show = false;
      },
      openNoAnimationMask (e) {
        this.show = true;
        this.hasAnimation = false;
      }
    }
  };
</script>
```

更详细代码可以参考 [demo](https://github.com/alibaba/weex-ui/blob/master/example/mask/index.vue)


### 可配置参数

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| show | `Bool` |`Y`| `false` |  是否显示 |
| width | `Number` |`Y`| `702` | 面板的宽度  |
| height | `Number` |`Y`| `800` | 面板的高度  |
| top | `Number` |`N`| `0` | 面板的 top 值，为 0 时垂直居中面板  |
| has-animation | `Bool` |`N`| `true` | 面板弹出是否动画 |
| show-close | `Bool` | `N`|`false` |  是否显示关闭按钮 |
| has-overlay | `Bool` |`N`| `true` |  是否有蒙层 |
| border-radius | `Number` |`N`| `0` |  弹出的 border-radius |
| overlay-can-close | `Bool` |`N`| `true` |  点击 overlay 灰层是否可以关闭 |
| mask-bg-color | `String` |`N`| `#ffffff` |  mask 的背景颜色 |
| duration | `String` |`N`| `300` |  弹层出现时间 |
| timing-function | `String` |`N`| `ease-in` |  弹层出现动画方式 |
| overlay-cfg | `Object` |`N`| `{}` |  蒙层配置参数 [wxc-overlay](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-overlay/README.md) |
| opacity | `Number` |`N`| `0.6` |  设置透明度 |


### 事件回调

```
//有一个关闭相关的回调逻辑,需要设置`show=false`
@wxcMaskSetHidden="wxcMaskSetHidden" 

@wxcMaskCloseClick="wxcMaskCloseClick"
@wxcOverlayBodyClicked="wxcOverlayBodyClicked"
```
