# wxc-result 
      
> Common error result pages, which include general errors, no products, no network, and error of locating errors

### Rule
  - Used for error pages to reduce user anxiety.
  - You can configure this [type.js#L5](https://github.com/alibaba/weex-ui/blob/master/example/result/type.js#L5) for custom errors


## [Demo](https://h5.m.taobao.com/trip/wxc-result/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-result%2Fdemo%2Findex.native-min.js)
<img src="https://gw.alipayobjects.com/zos/rmsportal/ZdBCotUDWDbtYVYUTqDf.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1ck8JSpXXXXXpaFXXXXXXXXXX-200-200.png" width="160"/>

## Code Example

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
        modal.toast({
          'message': e.type,
          'duration': 1,
        })
      }
    }
  };
</script>
```

More details can be found in [here](https://github.com/alibaba/weex-ui/blob/master/example/result/index.vue)


### API

| Prop | Type | Required | Default | Description |
| ---- |:----:|:---:|:-------:| :----------:|
| type | `String` |`N`| `errorPage`|error type `errorPage、noNetwork、noGoods、errorLocation`|
| show | `Boolean` |`N`| `true` | whether to show |
| padding-top | `Number` |`N`| `240` | padding top from screen |
| custom-set | `Object` |`N`| `{}` |custom config [type.js#L4](https://github.com/alibaba/weex-ui/blob/master/example/result/type.js#L4)|
| wrap-style | `Object` | `N`|`{}` | custom wrap style|

### Custom Config

```
this.customSet={errorPage: { button: null, desc: 'You can try to reduce the filter content', content: 'I'm sorry, Sir. I haven't found the recommended conditions' }}
```

### Event

```
@wxcResultButtonClicked="wxcResultButtonClicked"
```
