# wxc-slider-bar 

!> 这个富交互体验组件依赖于 Weex [expressionBinding](https://github.com/alibaba/weex/issues/1730) 特性，使用前请确定你的App[是否支持](https://github.com/alibaba/weex-ui/issues/6)

> Weex 滑动选择组件

### 规则
- 用于选择线性取值范围中某个具体的值（整数），或者选取一个取值范围


## [Demo](https://h5.m.taobao.com/trip/wxc-slider-bar/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-slider-bar%2Fdemo%2Findex.native-min.js)
<img src="https://gw.alipayobjects.com/zos/rmsportal/KAGxLOahnabmMTggilTC.gif" width="240px"/>&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://img.alicdn.com/tfs/TB1bnL_SpXXXXb7XXXXXXXXXXXX-200-200.png" width="160px"/>

## 使用方法

```vue
<template>
  <wxc-slider-bar v-bind="sliderBarCfg"></wxc-slider-bar>
</template>
<script>
  import { WxcSliderBar } from 'weex-ui';
  export default {
  	components: { WxcSliderBar },
  	data: () => ({
      sliderBarCfg: {
        length: 400,
        range: false,
        min: 0,
        max: 100,
        value: 50,
        defaultValue: 50,
        disabled: false
      }
  	});
  }
</script>
```

### 可配置参数

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| length       | `Number` |`N`| `500`    | 滑条长度 |
| height       | `Number` |`N`| `4`      | 滑条高度 |
| range        | `Boolean` |`N`| `false`  | 是否选择范围 |
| min          | `Number` |`N`| `0`      | 滑条最小值 |
| max          | `Number` |`N`| `100`    | 滑条最大值 |
| minDiff      | `Number` |`N`| `5`      | 选择范围时最小差值（用于避免按钮重合） |
| value        | `[Number, Array]` |`N`| `0` | 设置当前取值|
| defaultValue | `[Number, Array]` |`N`| `0` | 设置初始取值|
| disabled     | `Boolean` |`N`| `false`  | 是否禁用 |
| invalidColor | `String` |`N`| `#E0E0E0`| 无效颜色 |
| validColor   | `String` |`N`| `#EE9900`| 有效颜色 |
| disabledColor| `String` |`N`| `#AAA`   | 禁用颜色 |
