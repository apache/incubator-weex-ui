# wxc-countdown

> Countdown

## [Demo](https://h5.m.taobao.com/trip/wxc-countdown/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-countdown%2Fdemo%2Findex.native-min.js)
<img src="https://gw.alipayobjects.com/zos/rmsportal/vKCrGoTgfBlPsFKtJNhk.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1Kj1MSFXXXXbMXpXXXXXXXXXX-200-200.png" width="160"/>


## Code Example

```vue
<template>
  <wxc-countdown tpl="{d}:{h}:{m}:{s}" :time="TIME"></wxc-countdown>
</template>
<script>
    import { WxcCountdown } from 'weex-ui'
    export default {
      components: { WxcCountdown },
      data: () => ({
        TIME: new Date().getTime() + 86400000 + ''
      })
    }
</script>
```

More details can be found in [here](https://github.com/alibaba/weex-ui/blob/master/example/countdown/index.vue)

## API

| Prop | Type | Required | Default | Description |
| ---- |:----:|:---:|:-------:| :----------:|
| time | `Number` | `Y` | `1501200000000` | Final timestamp |
| interval | `Number` | `N` | `1000` | interval |
| tpl | `String` | `N` | `{h}:{m}:{s}` | template |
| onComplete | `Function` | `N` | `()=>()` | callback when completed |
| timeWrapStyle | `Object` | `N` | `-` | wrap style |
| timeBoxStyle | `Object` | `N` | `-` | number box style |
| dotBoxStyle | `Object` | `N` | `-` |  symbol box style |
| timeTextStyle | `Object` | `N` | `-` | number text style |
| dotTextStyle | `Object` | `N` | `-` |  symbol text style |
