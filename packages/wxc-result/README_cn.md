# wxc-result 
      
> Weex 通用错误结果页，主要包括通用错误、无商品、无网络、定位错误的错误情况

### 规则
  - 用于出错的页面，减少用户焦虑感
  - 配置 [type.js#L5](https://github.com/alibaba/weex-ui/blob/master/example/result/type.js#L5) 来定制化


## [Demo](https://h5.m.taobao.com/trip/wx-detection-demo/result/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwx-detection-demo%2Fresult%2Findex.weex.js)
<img src="https://gw.alicdn.com/tfs/TB1wqdhhdzJ8KJjSspkXXbF7VXa-562-1000.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://gw.alicdn.com/tfs/TB1lFBlhdfJ8KJjy0FeXXXKEXXa-200-200.png" width="160"/>

## 使用方法

```vue
<template>
  <wxc-result type="errorPage"
              :show="show"
              padding-top="232"
              @wxcResultButtonClicked="wxcResultButtonClicked"></wxc-result>
</template>
<script>
  import { WxcResult } from 'weex-ui';
  export default {
    components: { WxcResult },
    data: () => ({
        show: true
    }),
    methods: {
      wxcResultButtonClicked(e){
      // e.type即错误页面类型，可以在这里做对应操作
        modal.toast({
          'message': e.type,
          'duration': 1,
        })
      }
    }
  };
</script>
```

更详细代码可以参考 [demo](https://github.com/alibaba/weex-ui/blob/master/example/result/index.vue)


### 可配置参数

| Prop | Type | Required | Default | Description |
| ---- |:----:|:---:|:-------:| :----------:|
| type | `String` |`N`| `errorPage`|`errorPage、noNetwork、noGoods、errorLocation`|
| show | `Boolean` |`N`| `true` | 是否显示 |
| padding-top | `Number` |`N`| `240` | 图案距离顶部高度 |
| custom-set | `Object` |`N`| `{}` | 自定义覆盖 [type.js#L4](https://github.com/alibaba/weex-ui/blob/master/example/result/type.js#L4)|
| wrap-style | `Object` | `N`|`{}` | 外层 wrap 样式自定义 |

### 自定义配置案例

```
this.customSet={errorPage: { button: null, desc: '可以减少筛选内容试试', content: '抱歉主人，没有找到合适条件的推荐' }}
```

### 事件回调

```
@wxcResultButtonClicked="wxcResultButtonClicked"
```
