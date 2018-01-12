# wxc-minibar 

> Title Bar

### Rule
- Use the [Native Navigator Bar](https://developer.apple.com/documentation/uikit/uinavigationbar) `first`.
- If you want to hide the return button on the left, pass `leftButton=""` directly. 

## [Demo](https://h5.m.taobao.com/trip/wxc-minibar/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-minibar%2Fdemo%2Findex.native-min.js)
<img src="https://img.alicdn.com/tfs/TB1IK_TfxPI8KJjSspfXXcCFXXa-750-1334.jpg" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1EJY_SpXXXXcmXpXXXXXXXXXX-200-200.png" width="160"/>

## Code Example

```vue
<template>
  <div class="container" :style="{ height: height }">
    <div class="demo">
      <wxc-minibar title="title"
                   background-color="#009ff0"
                   text-color="#FFFFFF"
                   right-text="more"
                   @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                   @wxcMinibarRightButtonClicked="minibarRightButtonClick"></wxc-minibar>
    </div>
  </div>
</template>

<script>

  import { WxcMinibar } from 'weex-ui';
  const modal = weex.requireModule('modal');

  export default {
    components: { WxcMinibar },
    methods: {
      minibarLeftButtonClick () {
      },
      minibarRightButtonClick () {
        modal.toast({ 'message': 'click rightButton!', 'duration': 1 });
      }
    }
  };
</script>
```

More details can be found in [here](https://github.com/alibaba/weex-ui/blob/master/example/minibar/index.vue)


### API

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| title | `String` |`Y`| `-` |title|
| right-button | `String` |`N`| `-` | right button icon |
| right-text | `String` |`N`| `-` | right button text |
| left-button | `String` |`N`| `a return icon` |  left button icon |
| left-text | `String` |`N`| `` | left text|
| text-color | `String` |`N`| `#333333` | text color |
| background-color | `String` |`N`| `#ffffff` | title bar background color |
| use-default-return | `Boolean` |`N`| `true` | Whether to use the default return |
| show | `Boolean` | `true` |`N`| whether to show |

### Slot
When the above configurations are not satisfied, You can customize this component by using slot.   `weex-ui>=0.3.9`

1. `<slot name="left"></slot>`：left slot
2. `<slot name="middle"></slot>`：title slot
3. `<slot name="right"></slot>`：right slot

<img src="https://img.alicdn.com/tfs/TB1nwLviZrI8KJjy0FhXXbfnpXa-752-114.png" width="300"/>
 
```
<wxc-minibar background-color="#FFF3CD">
  <image src="https://img.alicdn.com/tfs/TB1QN8pdlHH8KJjy0FbXXcqlpXa-220-80.png"
         slot="left"
         style="height: 32px;width: 88px;"></image>
  <text style="font-size: 40px;" slot="middle">Customize this component</text>
  <image slot="right"
         src="https://img.alicdn.com/tfs/TB1j39Uc0fJ8KJjy0FeXXXKEXXa-160-128.png"
         style="height: 32px;width: 40px"></image>
</wxc-minibar>
```


### Event

```
// @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
// @wxcMinibarRightButtonClicked="minibarRightButtonClick"
```

