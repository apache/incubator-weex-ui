# wxc-overlay 

> Mask layer

### Rule
- Often used in wxc-mask, wxc-dialog, wxc-popup, etc

## [Demo](https://h5.m.taobao.com/trip/wxc-overlay/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-overlay%2Fdemo%2Findex.native-min.js)
<img src="https://gw.alipayobjects.com/zos/rmsportal/uVBoujAIcLFYDociannN.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1rXrwSpXXXXb3aFXXXXXXXXXX-200-200.png" width="160"/>

## Code Example

```vue
<template>
  <div class="wrapper">
    <div class="btn" @click="openOverlay">
      <text class="btn-txt">Click</text>
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

More details can be found in [here](https://github.com/alibaba/weex-ui/blob/master/example/overlay/index.vue)


### API

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|
| show | `Boolean` |`Y`| `false` | whether to show  |
| opacity | `Number` |`N`| `0.6` | opacity `0-1` |
| has-animation | `Boolean` |`N`| `true` | whether to animate |
| can-auto-close | `Boolean` |`N`| `true` | whether to can auto close  |
| duration | `Number` | `300` |`N`| animation duration time |
| timing-function | `Array` |`N`| `['ease-in','ease-out']` | animation timing function |


### Event

```
 // disappear after
 `@wxcOverlayBodyClicked="wxcOverlayBodyClicked"`;
 // disappearing
 `@wxcOverlayBodyClicking="wxcOverlayBodyClicking"`;
```
