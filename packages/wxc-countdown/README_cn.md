# wxc-countdown

> Weex 倒计时组件

## [Demo](https://h5.m.taobao.com/trip/wxc-countdown/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-countdown%2Fdemo%2Findex.native-min.js)
<img src="https://gw.alipayobjects.com/zos/rmsportal/vKCrGoTgfBlPsFKtJNhk.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1Kj1MSFXXXXbMXpXXXXXXXXXX-200-200.png" width="160"/>

## 参数配置

| Prop | Type | Required | Default | Description |
| ---- |:----:|:---:|:-------:| :----------:|
| time | `Number` | `Y` | `1501200000000` | 最终时间戳 |
| interval | `Number` | `N` | `1000` | 间隔,单位为"毫秒" |
| tpl | `String` | `N` | `{h}:{m}:{s}` | 展示模板 |
| onComplete | `Function` | `N` | `()=>()` | 完成时调用的方法 |
| timeWrapStyle | `Object` | `N` | `-` | 最外层包裹 style |
| timeBoxStyle | `Object` | `N` | `-` | 数字盒子 style |
| dotBoxStyle | `Object` | `N` | `-` |  符号盒子 style |
| timeTextStyle | `Object` | `N` | `-` | 数字文字 style |
| dotTextStyle | `Object` | `N` | `-` |  符号文字 style |


## 使用方法

```vue
<template>
  <wxc-countdown tpl="{d}天{h}时{m}分{s}秒" :time="TIME"></wxc-countdown>
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

更详细代码可以参考 [demo](https://github.com/alibaba/weex-ui/blob/master/example/countdown/index.vue)
