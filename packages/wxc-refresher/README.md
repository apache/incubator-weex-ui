# wxc-refresher

 > The `<wxc-refresher>` Component provide a pulldown-refresh function for some special containers, its usage and attributes are similar to the `<loading>` Component.

### Rule

> To be rendered properly, the `<wxc-refresher>` Component must appear inside the special Component such as `<scroller>`、`<list>`、`<hlist>`、`<vlist>`、`<waterfall>` .

## [Demo](https://h5.m.taobao.com/trip/wx-detection-demo/refresher/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwx-detection-demo%2Frefresher%2Findex.weex.js)


## Code Example

```vue
<template>
  <div class="wxc-demo">
    <list class="scroller" ref="scroller">
      <wxc-refresher ref="wxcRefresher"
                     scroller-ref="scroller"
                     main-text="下拉即可刷新(自定义)"
                     pulling-text="释放即可刷新(自定义)"
                     refreshing-text="加载中(自定义)"
                     :max-time="5000"
                     :text-width="240"
                     @wxcRefresh="onRefresh"
                     @wxcTimeout="onTimeout"></wxc-refresher>
      <cell>
        <!-- cell list -->
      </cell>
    </list>
  </div>
</template>

<script>
  import { WxcRefresher } from 'weex-ui';
  const modal = weex.requireModule('modal');
  export default {
    components: { WxcRefresher },
    methods: {
      onTimeout () {
        modal.toast({message:'timeout',duration:0});
      },
      onRefresh () {
        modal.toast({message:'refreshing...',duration:0});
      }
    }
  };
</script>
```

Further more, [demo](https://github.com/alibaba/weex-ui/blob/master/example/refresher/index.vue)

### API

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| scroller-ref | `String` |`true`| - | binding animation require passing in the ref of the outer list container |
| max-time | `Number` |`false`|`0` | timeout |
| main-text | `String` |`false`|`下拉即可刷新...` | initial text |
| pulling-text | `String` |`false`|`释放即可刷新...` | pulling text |
| refreshing-text | `String` |`false`|`加载中...` | refreshing text |
| text-width | `Number` |`false`|`200` | text container width |

### Canceling Refreshing

```
<!-- <wxc-refresher ref="wxcRefresher"></wxc-popup> -->
this.$refs.wxcRefresher.wxcCancel();
```

### Event


```
// refresh callback, refer to http://weex.apache.org/cn/references/components/refresh.html#refresh
@wxcRefresh="onRefresh"
```

```
// timeout callback
@wxcTimeout="onTimeout"
```

```
// pulling callback, refer to http://weex.apache.org/cn/references/components/refresh.html#pullingdown-v0-6-1
@wxcPullingDown="onPullingDown"
```
