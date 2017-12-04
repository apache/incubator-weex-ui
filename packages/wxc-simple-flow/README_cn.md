# wxc-simple-flow 

> Weex 简易流程图组件，允许配置主题色
  

## [Demo](https://h5.m.taobao.com/trip/wxc-simple-flow/index.html?_wx_tpl=http%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-simple-flow%2Fdemo%2Findex.native-min.js)
 
<img src="https://gw.alipayobjects.com/zos/rmsportal/XYlsptMGnQoGCdgerpYi.gif" width="240">&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1jejBSpXXXXXsaXXXXXXXXXXX-200-200.png" width="180">

## 使用方法

```vue
<template>
  <wxc-simple-flow :list="testData" :themeColor="themeColor"></wxc-simple-flow>
</template>
<script>
  import { WxcSimpleFlow } from 'weex-ui';
  export default {
    components: { WxcSimpleFlow },
    data: () => ({
      themeColor: {
        lineColor: '#bf280b',
        pointInnerColor: '#b95048',
        pointBorderColor: '#bf280b',
        highlightTitleColor: '#bf280b',
        highlightPointInnerColor: '#bf280b',
        highlightPointBorderColor: '#d46262'
      },
      testData: [
        {
          'date': '2017-05-24 21:10:29',
          'desc': '',
          'highlight': true,
          'title': '方案已确认'
        },
        {
          'date': '2017-05-24 19:54:28',
          'desc': '',
          'title': '方案已更新'
        },
        {
          'date': '2017-05-24 19:50:21',
          'desc': '您以确定了方案',
          'title': '方案已上传'
        },
        {
          'date': '2017-05-24 19:49:03',
          'desc': '商家会在2个工作小时内电话或旺旺联系您',
          'title': '商家已接单'
        }
      ]
    })
  }
</script>
```

更详细代码可以参考 [demo](https://github.com/alibaba/weex-ui/blob/master/example/simple-flow/index.vue)


### 可配置参数

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| list | `Array` |`Y`| `-` | 流程图数据 |
| list[{title}]| `String` |`Y`| `-` | 标题 |
| list[{desc}]| `String` |`N`| `-` | 描述 |
| list[{date}]| `String` | `N`|`-` | 日期 |
| list[{highlight}]| `Boolean` |`N`| `false` | 是否高亮 |
| themeColor | `Object` |`N`| `{}` | 主题色配置 |
| themeColor{lineColor} |`String` |`N`|  `-` | 时间轴颜色 |
| themeColor{pointInnerColor} | `String` |`N`| `-` | 时间节点内部颜色 |
| themeColor{pointBorderColor} |`String` |`N`|  `-` | 时间节点边框颜色 |
| themeColor{highlightTitleColor} | `String` |`N`| `-` | 高亮标题颜色 |
| themeColor{highlightPointInnerColor} | `String` |`N`| `-` | 高亮时间节点内部颜色  |
| themeColor{highlightPointBorderColor} | `String` |`N`| `-` | 高亮时间节点边框颜色 |
