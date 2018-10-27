# wxc-button

> Weex 按钮组件，支持 4 种基本类型 button，可自定义样式

## [Demo](https://h5.m.taobao.com/trip/wx-detection-demo/button/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwx-detection-demo%2Fbutton%2Findex.weex.js)

<img src="https://gw.alipayobjects.com/zos/rmsportal/lGbrTEnxmgxmNdgHJhbA.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1b0tMhf6H8KJjy0FjXXaXepXa-200-200.png" width="160"/>

## 使用方法

!> 在 `weex-ui` 0.6.0 版本以上，我们对 `type` api 有对应修改，同时新增 `size` api 用于设置大小。

```vue
<template>
  <wxc-button text="确定"
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
更详细代码可以参考 [这里](https://github.com/alibaba/weex-ui/blob/master/example/button/index.vue)

### 可配置参数
| Prop | Type | Required | Default | Description |
| ---- |:----:|:---:|:-------:| :----------:|
| **`text`** | `String` | `Y` | `-` | 展现的文字 |
| **`type`** | `String` | `N` | `red` | 类型：`white`/`red`/`yellow`/`blue`/`green` |
| **`size`** | `String` | `N` | `full` | 类型：`full`/`big`/`medium`/`small` |
| **`disabled`** | `Boolean` | `N` | `false` | 是否 disabled（注1） |
| **`btnStyle`** | `Object` | `N` | `{}` | 按钮的样式对象（注2） |
| **`textStyle`** | `Object` | `N` | `{}` | 文字的样式对象（注3） |

- 注1：disabled 样式会覆盖掉默认样式
- 注2：对默认按钮样式的覆盖全部依赖btnstyle进行，详细样式可以参考 [type.js](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-button/type.js)
- 注2：对默认字体样式的覆盖全部依赖textStyle进行，详细样式可以参考 [type.js](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-button/type.js)

### 事件回调

```
// `@wxcButtonClicked="wxcButtonClicked"`
将会返回 e, type, disabled
```
