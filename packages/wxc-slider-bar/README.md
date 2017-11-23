# wxc-slider-bar 


> 滑动选择组件，主要用于选择线性取值范围中某个具体的值（整数），或者选取一个取值范围

## [Demo 预览](https://h5.m.taobao.com/trip/wxc-slider-bar/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-slider-bar%2Fdemo%2Findex.native-min.js)
<img src="https://gw.alipayobjects.com/zos/rmsportal/KAGxLOahnabmMTggilTC.gif" width="240px"/>&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://img.alicdn.com/tfs/TB1bnL_SpXXXXb7XXXXXXXXXXXX-200-200.png" width="160px"/>

## 使用方法

```vue
<template>
  <wxc-slider-bar v-bind="sliderBarCfg"></wxc-slider-bar>
</template>
<script>
  import { wxcSliderBar } from 'weex-ui';
  export default {
  	components: { wxcSliderBar },
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

| 名称          | 类型     | 默认值    | 备注  |
|--------------|----------|----------|-----|
| length       | `Number` | `500`    | 滑条长度（单位px） |
| height       | `Number` | `4`      | 滑条高度 |
| range        | `Boolean` | `false`  | 是否选择范围 |
| min          | `Number` | `0`      | 滑条最小值 |
| max          | `Number` | `100`    | 滑条最大值 |
| minDiff      | `Number` | `5`      | 选择范围时最小差值（用于避免按钮重合） |
| value        | `[Number, Array]` | `0`      | 设置当前取值。当 range 为 false 时，使用 number，否则用 [number, number] |
| defaultValue | `[Number, Array]` | `0`      | 设置初始取值。当 range 为 false 时，使用 number，否则用 [number, number] |
| disabled     | `Boolean` | `false`  | 是否禁用，值为 true 时，滑块为禁用状态 |
| invalidColor | `String` | `#E0E0E0`| 无效颜色 |
| validColor   | `String` | `#EE9900`| 有效颜色 |
| disabledColor| `String` | `#AAA`   | 禁用颜色 |
