# wxc-refresher

 > `<wxc-refresher>` 为容器提供下拉刷新功能，用法与官方 `<refresh>` 类似

### 规则
- `<wxc-refresher>` 是 `<scroller>`、`<list>`、`<hlist>`、`<vlist>`、`<waterfall>` 的子组件，只能在被它们包含时才能被正确渲染。

## [Demo](https://h5.m.taobao.com/trip/wx-detection-demo/refresher/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwx-detection-demo%2Frefresher%2Findex.weex.js)


## 使用方法

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
        modal.toast({message:'刷新超时，可定义超时时间',duration:0});
      },
      onRefresh () {
        modal.toast({message:'刷新中...',duration:0});
      }
    }
  };
</script>
```

更详细代码可以参考 [demo](https://github.com/alibaba/weex-ui/blob/master/example/refresher/index.vue)

### 可配置参数

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| scroller-ref | `String` |`true`| - | 使用binding动画的必须传入外层list容器的ref |
| max-time | `Number` |`false`|`0` | 超时时间 |
| main-text | `String` |`false`|`下拉即可刷新...` | 初始文案 |
| pulling-text | `String` |`false`|`释放即可刷新...` | 可释放文案 |
| refreshing-text | `String` |`false`|`加载中...` | 加载中文案 |
| text-width | `Number` |`false`|`200` | 文案宽度 |

### 取消loading

```
在wxc-refresher上面绑定ref，然后调用this.$refs.wxcRefresher.wxcCancel();即可结束refreshing动画
```

### 事件回调

```
// 刷新回调，使用方式同官网 http://weex.apache.org/cn/references/components/refresh.html#refresh
@wxcRefresh="onRefresh"
```

```
// 超时回调
@wxcTimeout="onTimeout"
```

```
// 拖拽回调，使用方式同官网 http://weex.apache.org/cn/references/components/refresh.html#pullingdown-v0-6-1
@wxcPullingDown="onPullingDown"
```