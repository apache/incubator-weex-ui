# wxc-icon

> Weex 常用 iconfont 的封装

## [Demo](https://h5.m.taobao.com/trip/wx-detection-demo/icon/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwx-detection-demo%2Ficon%2Findex.weex.js)

<img src="https://img.alicdn.com/tfs/TB1o3jDj_nI8KJjy0FfXXcdoVXa-562-1000.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1_4S1j8TH8KJjy0FiXXcRsXXa-200-200.png" width="160"/>

`weex-ui >= 0.3.10`

## 使用方法

```vue
<template>
   <wxc-icon name="success"></wxc-icon>
</template>

<script>
  import { WxcIcon } from 'weex-ui'
  export default {
    components: { WxcIcon }
  }
</script>

```
更详细代码可以参考 [这里](https://github.com/alibaba/weex-ui/blob/master/icon/loading/index.vue)

同时你可以从 [demo](https://h5.m.taobao.com/trip/wx-detection-demo/icon/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwx-detection-demo%2Ficon%2Findex.weex.js) 进行复制 name

### 可配置参数
| Prop | Type | Required | Default | Description |
| ---- |:----:|:---:|:-------:| :----------:|
| **`name`** | `string` | `Y` | `-` | icon 的名称 (注1)|
| **`type`** | `String` | `N` | `small` | icon的尺寸 `xs`/`small`/`medium`/`large`|
| **`icon-style`** | `Object` | `N` | `{}` |样式覆盖 (注2)|

- 注1：icon的名称详细如下：`['less', 'more_unfold', 'back', 'more', 'add', 'subtract', 'close', 'cry', 'search', 'delete', 'help', 'refresh', 'success', 'warning', 'wrong', 'clock', 'scanning', 'filter', 'map', 'play']`
- 注2：当type不能满足时候，或者需要自定义样式类型可以传入`style`覆盖，例如：

    ```
     style={color:red,fontSize:'60px'}
    ```

### 事件回调

```
// `@wxcIconClicked="iconClicked"`
将会返回 name
```
