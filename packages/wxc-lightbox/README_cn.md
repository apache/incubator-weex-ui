# wxc-lightbox 

> Weex 图片列表全屏显示组件

### 规则：
- 常用于详情页面的图片放大显示，让用户清晰看到效果
- 需要设置图片的显示高度，也可以设置宽度（默认750px）
- 可以传入一组图片，滑动显示
    
## [Demo](https://h5.m.taobao.com/trip/wxc-lightbox/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-lightbox%2Fdemo%2Findex.native-min.js)
<img src="https://gw.alipayobjects.com/zos/rmsportal/RzbkfaSHRYaJzdPrsgLj.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1BGPdSpXXXXajaVXXXXXXXXXX-200-200.png" width="160"/>

## 使用方法

```vue
<template>
  <div class="demo-container">
    <div class="btn" @click="openLightBox">
      <text class="btn-txt">点击按钮弹出全屏图片</text>
    </div>
    <wxc-lightbox
      ref="wxc-lightbox"
      height="800"
      :show="show"
      :image-list="imageList"
      @wxcLightboxOverlayClicked="wxcLightboxOverlayClicked">
    </wxc-lightbox>
  </div>
</template>

<script>
  import { WxcLightbox } from 'weex-ui';
  export default {
    components: {
      WxcLightbox
    },
    data: function () {
      return {
        imageList: [
          { src: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg' },
          { src: 'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg' },
          { src: 'https://gd3.alicdn.com/bao/uploaded/i3/TB1x6hYLXXXXXazXVXXXXXXXXXX_!!0-item_pic.jpg' }
        ],
        show: false
      };
    },
    methods: {
      openLightBox () {
        this.show = true;
      },
      wxcLightboxOverlayClicked () {
      // 无状态组件，需要在此次关闭
        this.show = false;
      }
    }
  };
</script>
```

更详细代码可以参考 [demo](https://github.com/alibaba/weex-ui/blob/master/example/lightbox/index.vue)

### 可配置参数

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| show | `Bool` |`Y`| `false` | 全屏图片是否显示 |
| imageList | `Array` |`Y`| `[]` | 全屏显示图片列表 |
| height | `Number` |`Y`| `750` | 全屏显示图片高度 |
| width | `Number` |`Y`| `750` | 全屏显示图片宽度 |
| show-indicator | `Bool` |`N`| `true` |全屏后是否显示索引...|
| indicator-color | `Object` |`N`| `{}` |索引样式配置（注 1）|

注 1 中样式：
```
{'item-color': 'rgba(255, 195, 0, .5)','item-selected-color': '#ffc300','item-size': '20px'}
```

### 事件回调

```
// 点击蒙层关闭预览 `@wxcLightboxOverlayClicked="wxcLightboxOverlayClicked"`
```

