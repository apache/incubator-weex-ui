# wxc-slider-bar 

> A slider component for displaying current value and intervals in range.

!> These rich interaction components are based on [expressionBinding](https://github.com/alibaba/weex/issues/1730) feature. Make sure your app [support it](https://github.com/alibaba/weex-ui/issues/6). 

### Rule
- To input a value in a range.

## [Demo](https://h5.m.taobao.com/trip/wxc-slider-bar/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-slider-bar%2Fdemo%2Findex.native-min.js)
<img src="https://gw.alipayobjects.com/zos/rmsportal/KAGxLOahnabmMTggilTC.gif" width="240px"/>&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://img.alicdn.com/tfs/TB1bnL_SpXXXXb7XXXXXXXXXXXX-200-200.png" width="160px"/>

## Code Example

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

More details can be found in [here](https://github.com/alibaba/weex-ui/blob/master/example/slider-bar/index.vue)

### API

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| length       | `Number` |`N`| `500`    | bar width |
| height       | `Number` |`N`| `4`      | bar height |
| range        | `Boolean` |`N`| `false`  | dual thumb mode |
| min          | `Number` |`N`| `0`      | the minimum value the slider can slide to.	 |
| max          | `Number` |`N`| `100`    | the maximum value the slider can slide to |
| minDiff      | `Number` |`N`| `5`      | the granularity the slider can step through values.  |
| value        | `[Number, Array]` |`N`| `0` | the value of slider|
| defaultValue | `[Number, Array]` |`N`| `0` | default value|
| disabled     | `Boolean` |`N`| `false`  | if true, the slider will not be interactable. |
| invalidColor | `String` |`N`| `#E0E0E0`| invalid color |
| validColor   | `String` |`N`| `#EE9900`| valid color |
| disabledColor| `String` |`N`| `#AAA`   | disabled color |
