# wxc-loading 

 > Weex版本的loading组件，`全页面加载`、`局部加载情况`
 
 - 局部Loading支持设置大小
 - 规则：
    - 让用户知道页面正在加载
    - 在某些特定场景下，提供有意义的文案，帮助用户明白哪个任务正在进行中
    - 局部Loading不建议设置太大(gif放大有毛边)


## [Demo预览](https://h5.m.taobao.com/trip/wxc-loading/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-loading%2Fdemo%2Findex.native-min.js)
<img src="https://img.alicdn.com/tfs/TB11cTsfBfH8KJjy1XbXXbLdXXa-376-668.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB195ehSpXXXXc4XpXXXXXXXXXX-200-200.png" width="160"/>

## 使用方法

```vue
<template>
   <wxc-loading :show="isShow" type="trip"></wxc-loading>
   <wxc-part-loading :show="isShow"></wxc-part-loading>
</template>
<script>
    import { WxcLoading, WxcPartLoading } from 'weex-ui';
      components: { WxcLoading, WxcPartLoading },
      data () {
        return {
          isShow: true
        };
      }
    };
</script>
```

更详细代码可以参考 [demo](https://github.com/alibaba/weex-ui/blob/master/example/loading/index.vue)

### 可配置参数

#### 页面Loading

| 名称      | 类型     | 默认值   | 备注  |
|-------------|------------|--------|-----|
| show | `Bool` | false | `required`是否显示|
| loading-text | `String` | '' | 配置文案的显示,不设置不显示 |
| **interval** | `Number` | 0 | 设置loading的延迟多少毫秒显示，常用于体验优化，譬如数据很快回来就不需要loading了|
| type | `String` | 'default' |loading图案的类别，默认是灰色普通loading|

#### 局部Loading

| 名称      | 类型     | 默认值   | 备注  |
|-------------|------------|--------|-----|
| show | `Bool` | false | `required`是否显示|
| width | `Number` | `36` | 局部加载的长度 |
| height | `Number` | `36` | 局部加载的高度 |
