# wxc-lightbox 

> Picture list of full screen display

### Rule
- Often used for the detailed page of the image to enlarge the display, let the user see the effect clearly.
- You can pass in a set of images, slide shows.
    
## [Demo](https://h5.m.taobao.com/trip/wxc-lightbox/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-lightbox%2Fdemo%2Findex.native-min.js)
<img src="https://gw.alipayobjects.com/zos/rmsportal/RzbkfaSHRYaJzdPrsgLj.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1BGPdSpXXXXajaVXXXXXXXXXX-200-200.png" width="160"/>

## Code Example

```vue
<template>
  <div class="demo-container">
    <div class="btn" @click="openLightBox">
      <text class="btn-txt">Click the button</text>
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
        this.show = false;
      }
    }
  };
</script>
```

More details can be found in [here](https://github.com/alibaba/weex-ui/blob/master/example/lightbox/index.vue)

### API

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| show | `Bool` |`Y`| `false` | whether to show the light box |
| imageList | `Array` |`Y`| `[]` | image list |
| height | `Number` |`Y`| `750` | light box height |
| width | `Number` |`Y`| `750` | light box width |
| show-indicator | `Bool` |`N`| `true` |whether to show indicator|
| indicator-color | `Object` |`N`| `{}` | indicator style（*1）|
| index | `Number` |`N`| `0` | the index of current shown slider|
| interval | `Number` |`N`| `3000` | time interval for each page displayed in slider|
| opacity | `Number` |`N`| `0.6` |  set transparency |

*1 default style: 
```
{'item-color': 'rgba(255, 195, 0, .5)','item-selected-color': '#ffc300','item-size': '20px'}
```

### Event

```
// @wxcLightboxOverlayClicked="wxcLightboxOverlayClicked"
```

