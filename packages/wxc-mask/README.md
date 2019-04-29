# wxc-mask 

> A pop-up mask

## [Demo](https://h5.m.taobao.com/trip/wxc-mask/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-mask%2Fdemo%2Findex.native-min.js)
<img src="https://gw.alipayobjects.com/zos/rmsportal/WMcMaWMTOpBSevBGfNTT.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1CgYJSpXXXXc5aXXXXXXXXXXX-200-200.png" width="160"/>

## Code Example

```vue
<template>
  <div class="wrapper">
    <div class="btn" @click="openMask">
      <text class="btn-txt">Pop up a animation mask</text>
    </div>
    <div class="btn btn-margin yellow" @click="openNoAnimationMask">
      <text class="btn-txt">Pop up a no animation mask</text>
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
          <text class="title">Help you build a real Native App</text>
        </div>
        <text class="content-text">
          Different from a "web app", "HTML5 app", or "hybrid app", you can use Weex to build a real mobile app. The code that you write is relatively simple, because you can build native applications just using HTML, CSS, Javascript. But underneath, the core of the application is Objective-C or Java. At the same time, Weex will provide a lot of native components or modules for developers to use.
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

More details can be found in [here](https://github.com/alibaba/weex-ui/blob/master/example/mask/index.vue)


### API

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| show | `Bool` |`Y`| `false` |  whether to show |
| width | `Number` |`Y`| `702` | mask width  |
| height | `Number` |`Y`| `800` | mask height  |
| top | `Number` |`N`| `0` | mask top, will centered in vertical direction when equal to 0  |
| has-animation | `Bool` |`N`| `true` | mask pops up whether to animate |
| show-close | `Bool` | `N`|`false` |  whether to show close icon |
| has-overlay | `Bool` |`N`| `true` |  whether has a overlay  |
| border-radius | `Number` |`N`| `0` |  mask border radius |
| overlay-can-close | `Bool` |`N`| `true` | Whether the overlay can be closed|
| mask-bg-color | `String` |`N`| `#ffffff` |  mask background color |
| duration | `String` |`N`| `300` |  animation duration time |
| timing-function | `String` |`N`| `ease-in` |  animation timing function |
| overlay-cfg | `Object` |`N`| `{}` | [wxc-overlay](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-overlay/README.md) configs |
| opacity | `Number` |`N`| `0.6` |  set transparency |

### Event

```
//need set `show=false` when the mask hide
@wxcMaskSetHidden="wxcMaskSetHidden" 

@wxcMaskCloseClick="wxcMaskCloseClick"
@wxcOverlayBodyClicked="wxcOverlayBodyClicked"
```
