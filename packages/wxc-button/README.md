# wxc-button

> Basic button with 4 built-in types, supports custom style

## [Demo](https://h5.m.taobao.com/trip/wx-detection-demo/button/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwx-detection-demo%2Fbutton%2Findex.weex.js)

<img src="https://gw.alipayobjects.com/zos/rmsportal/lGbrTEnxmgxmNdgHJhbA.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1b0tMhf6H8KJjy0FjXXaXepXa-200-200.png" width="160"/>

!>In `weex-ui` V0.6.0 version above, `type` Api  has been modified, and `size` Api is added.

## Code Example

```vue
<template>
  <wxc-button text="Confirm"
              @wxcButtonClicked="wxcButtonClicked"></wxc-button>
</template>

<script>
  import { WxcButton } from 'weex-ui'
  export default {
    components: { WxcButton },
    methods: {
      wxcButtonClicked (e) {
        console.log(e)
      }
    }
  }
</script>

```

More details can be found in [here](https://github.com/alibaba/weex-ui/blob/master/example/button/index.vue)

### API
| Prop | Type | Required | Default | Description |
| ---- |:----:|:---:|:-------:| :----------:|
| **`text`** | `String` | `Y` | `-` | the text of button |
| **`type`** | `String` | `N` | `red` | can be set to `white`/`red`/`yellow`/`blue`/`green` |
| **`size`** | `String` | `N` | `full` | can be set to `full`/`big`/`medium`/`small` |
| **`disabled`** | `Boolean` | `N` | `false` | set disabled（*1） |
| **`btnStyle`** | `Object` | `N` | `{}` | custom style about button（*2） |
| **`textStyle`** | `Object` | `N` | `{}` | custom style about text （*3） |

- *1：`disabled` will override the default style.
- *2：Detailed style can be referenced [here](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-button/type.js)
- *3：Detailed style can be referenced [here](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-button/type.js)

### Event
```
// `@wxcButtonClicked="wxcButtonClicked"`
will return e, type, disabled
```
