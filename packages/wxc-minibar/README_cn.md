# wxc-minibar 

> Weex 顶部导航栏组件

### 规则
- 优先使用 Native 自带的 [Navigator Bar](https://developer.apple.com/documentation/uikit/uinavigationbar)
- 假如你想隐藏左边返回按钮，直接传入`leftButton=""`即可

## [Demo](https://h5.m.taobao.com/trip/wxc-minibar/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-minibar%2Fdemo%2Findex.native-min.js)
<img src="https://img.alicdn.com/tfs/TB1IK_TfxPI8KJjSspfXXcCFXXa-750-1334.jpg" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1EJY_SpXXXXcmXpXXXXXXXXXX-200-200.png" width="160"/>

## 使用方法

```vue
<template>
  <div class="container" :style="{ height: height }">
    <div class="demo">
      <text class="text">配置颜色</text>
      <wxc-minibar title="标题"
                   background-color="#009ff0"
                   text-color="#FFFFFF"
                   right-text="更多"
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

更详细代码可以参考 [demo](https://github.com/alibaba/weex-ui/blob/master/example/minibar/index.vue)


### 可配置参数

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| title | `String` |`Y`| `-` | 标题 |
| right-button | `String` |`N`| `-` | 右侧button icon |
| right-text | `String` |`N`| `-` | 右侧button文案，优先显示|
| left-button | `String` |`N`| `返回图标` |  左侧 button icon|
| left-text | `String` |`N`| `` |  左侧文案，优先显示|
| text-color | `String` |`N`| `#333333` | 标题颜色 |
| background-color | `String` |`N`| `#ffffff` | 背景颜色 |
| use-default-return | `Boolean` |`N`| `true` | 是否使用默认的返回 |
| show | `Boolean` | `true` |`N`| 是否显示 |

### Slot
当以上配置都不满足时候，你可以使用 slot 来自定义设置你的组件。   `weex-ui >= 0.3.9`

1. `<slot name="left"></slot>`：左边返回坑位
2. `<slot name="middle"></slot>`：中间标题坑位
3. `<slot name="right"></slot>`：右边坑位

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

### 事件回调

```
// @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
// @wxcMinibarRightButtonClicked="minibarRightButtonClick"
```

