# wxc-result 
      
> Weex 通用错误结果页，主要包括通用错误、无商品、无网络、定位错误的错误情况

### 规则
  - 用于出错的页面，减少用户焦虑感
  - 配置 [type.js#L5](https://github.com/alibaba/weex-ui/blob/master/example/result/type.js#L5) 来定制化


## [Demo预览](https://h5.m.taobao.com/trip/wxc-result/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-result%2Fdemo%2Findex.native-min.js)
<img src="https://gw.alipayobjects.com/zos/rmsportal/ZdBCotUDWDbtYVYUTqDf.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1ck8JSpXXXXXpaFXXXXXXXXXX-200-200.png" width="160"/>


## 安装

```shell
npm install weex-ui --save
```

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
    data () => ({
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
| type | `String` |`N`| 'errorPage' | 错误页面的类型，包括errorPage、noNetwork、noGoods、errorLocation|
| show | `Boolean` |`N`| `true` | 是否显示 |
| padding-top | `Number` |`N`| `240` | 图案距离顶部高度 |
| custom-set | `Object` |`N`| `{}` | 自定义配置`{noGoods:{button: '返回上一页'}}``[type.js#L4](https://github.com/alibaba/weex-ui/blob/master/example/result/type.js#L4)
| wrap-style | `Object` | `{}` | 外层wrap样式自定义 |

### 自定义配置案例

```
this.customSet={errorPage: { button: null, desc: '可以减少筛选内容试试', content: '抱歉主人，没有找到合适条件的推荐' }}
```

### 事件回调

```
@wxcResultButtonClicked="wxcResultButtonClicked"
```
