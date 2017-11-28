# wxc-minibar 

> 顶部导航栏

- 规则: 建议优先使用native自带的navigator
     

## [Demo预览](https://h5.m.taobao.com/trip/wxc-minibar/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-minibar%2Fdemo%2Findex.native-min.js)
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
                   @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                   @wxcMinibarRightButtonClicked="minibarRightButtonClick"
                   right-text="更多"></wxc-minibar>
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

| 名称      | 类型     | 默认值   | 备注  |
|-------------|------------|--------|-----|
| title | `String` | '' | `required` |
| right-button | `String` | '' | 右侧button icon |
| right-text | `String` | '' | 右侧button文案优先显示icon |
| left-button | `String` | '返回图标' |  左侧button icon |
| text-color | `String` | '#333333' | 文案颜色 |
| background-color | `String` | '#ffffff' | 背景颜色 |
| use-default-return | `bool` | 'true' | 是否使用默认的返回 |
| show | `bool` | 'true' | 是否显示 |


### 事件回调

```
左侧按钮点击：`@wxcMinibarLeftButtonClicked="minibarLeftButtonClick"`
右侧点击：`@wxcMinibarRightButtonClicked="minibarRightButtonClick"`
```

