# wxc-popup 

 > Support the upper and lower direction of the panel pop-up
 
### Rule
- Commonly used to filter panel components.
- To surface from the top or bottom, click on the mask to close.

## [Demo](https://h5.m.taobao.com/trip/wxc-popup/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-popup%2Fdemo%2Findex.native-min.js)
<img src="https://img.alicdn.com/tfs/TB1WkKEhcLJ8KJjy0FnXXcFDpXa-562-1000.gif" width="240"/>&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1_9v9SpXXXXcuXXXXXXXXXXXX-200-200.png" width="160"/>

## Code Example

```vue
<template>
  <div class="wrapper">
    <div class="btn yellow  btn-margin" @click="openBottomPopup">
      <text class="btn-txt">Click</text>
    </div>
    <wxc-popup popup-color="rgb(92, 184, 92)"
               :show="isBottomShow"
               @wxcPopupOverlayClicked="popupOverlayBottomClick"
               pos="bottom"
               height="400">
      <div class="demo-content">
        <image src="https://img.alicdn.com/tfs/TB1ojYvOXXXXXaOXFXXXXXXXXXX-180-41.png" class="demo-image"></image>
        <text>Different from a "web app", "HTML5 app", or "hybrid app", you can use Weex to build a real mobile app. The code that you write is relatively simple, because you can build native applications just using HTML, CSS, Javascript.</text>
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
      popupOverlayBottomClick () {
        this.isBottomShow = false;
      }
    }
  };
</script>
```

More details can be found in [here](https://github.com/alibaba/weex-ui/blob/master/example/popup/index.vue)

### API

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| show | `Boolean` |`Y`|`false` | whether to show  |
| pos | `String` | `N`|`bottom` | out of the direction `top`/`bottom`/`left`/`right`|
| height | `String` |`N`| `840` | popup height(go up or down)  |
| width | `String` |`N`| `750` | popup width(go right or left )  |
| popup-color | `String` |`N`| `#FFFFFF` | background color |
| stand-out | `Number` |`N`| `0` | Bottom stand out offset |
| animation | `Object` |`N`| `{timingFunction: 'ease-in'}` | animation timing function |
| overlay-cfg | `Object` |`N`| `{}` | [wxc-overlay config](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-overlay/README.md)|

### Event

```
// need set `this.show=false`
// @wxcPopupOverlayClicked="overlayClicked"
```

### Manual Close

```
<wxc-popup ref="wxcPopup"></wxc-popup>
// this.$refs.wxcPopup.hide();
```
