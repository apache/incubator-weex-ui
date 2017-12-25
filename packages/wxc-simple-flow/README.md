# wxc-simple-flow 

> Simple flow 
  

## [Demo](https://h5.m.taobao.com/trip/wxc-simple-flow/index.html?_wx_tpl=http%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-simple-flow%2Fdemo%2Findex.native-min.js)
 
<img src="https://gw.alipayobjects.com/zos/rmsportal/XYlsptMGnQoGCdgerpYi.gif" width="240">&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1jejBSpXXXXXsaXXXXXXXXXXX-200-200.png" width="180">

## Code Example

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
          'title': 'confirm'
        },
        {
          'date': '2017-05-24 19:54:28',
          'desc': '',
          'title': 'updated'
        },
        {
          'date': '2017-05-24 19:50:21',
          'desc': 'You have determined the plan',
          'title': 'Plan uploaded'
        },
        {
          'date': '2017-05-24 19:49:03',
          'desc': 'The merchant will contact you within 2 working hours',
          'title': 'Business receipt'
        }
      ]
    })
  }
</script>
```

More details can be found in [here](https://github.com/alibaba/weex-ui/blob/master/example/simple-flow/index.vue)


### API

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| list | `Array` |`Y`| `-` | list data |
| list[{title}]| `String` |`Y`| `-` | main information |
| list[{desc}]| `String` |`N`| `-` | description |
| list[{date}]| `String` | `N`|`-` | date |
| list[{highlight}]| `Boolean` |`N`| `false` | whether is highlight |
| themeColor | `Object` |`N`| `{}` | theme color config |
| themeColor{lineColor} |`String` |`N`|  `-` | line color |
| themeColor{pointInnerColor} | `String` |`N`| `-` | inner point  Color |
| themeColor{pointBorderColor} |`String` |`N`|  `-` | point border color |
| themeColor{highlightTitleColor} | `String` |`N`| `-` | highlight title color |
| themeColor{highlightPointInnerColor} | `String` |`N`| `-` | point inner highlight color  |
| themeColor{highlightPointBorderColor} | `String` |`N`| `-` | highlight point border color |
