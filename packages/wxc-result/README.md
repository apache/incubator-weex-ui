# wxc-result 
      
> Common error result pages, which include general errors, no products, no network, and error of locating errors

### Rule
  - Used for error pages to reduce user anxiety.
  - You can configure this [type.js#L5](https://github.com/alibaba/weex-ui/blob/master/example/result/type.js#L5) for custom errors


## [Demo](https://h5.m.taobao.com/trip/wx-detection-demo/result/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwx-detection-demo%2Fresult%2Findex.weex.js)
<img src="https://gw.alicdn.com/tfs/TB1wqdhhdzJ8KJjSspkXXbF7VXa-562-1000.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://gw.alicdn.com/tfs/TB1lFBlhdfJ8KJjy0FeXXXKEXXa-200-200.png" width="160"/>

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
    data: () => ({
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
| type | `String` |`N`| `errorPage`|`errorPage、noNetwork、noGoods、errorLocation`|
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
