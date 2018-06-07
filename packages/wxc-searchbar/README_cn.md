# wxc-searchbar 

> Weex 搜索栏组件

### 规则
- 一般可位于 NavBar 下方
- 通过"取消按钮"退出激活状态, 允许设置点击跳转，支持带出发地形式的搜索

## [Demo](https://h5.m.taobao.com/trip/wxc-searchbar/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-searchbar%2Fdemo%2Findex.native-min.js)
<img src="https://gw.alipayobjects.com/zos/rmsportal/qbEmYUETsvpDKuloPFfu.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB10KfVSpXXXXaRXVXXXXXXXXXX-200-200.png" width="160"/>


## 使用方法

```vue
<template>
  <div class="container">
    <div class="demo">
      <text class="value-text">基础输入框</text>
      <wxc-searchbar ref="wxc-searchbar"
                     @wxcSearchbarCancelClicked="wxcSearchbarCancelClicked"
                     @wxcSearchbarInputReturned="wxcSearchbarInputReturned"
                     @wxcSearchbarInputOnInput="wxcSearchbarInputOnInput"
                     @wxcSearchbarCloseClicked="wxcSearchbarCloseClicked"
                     @wxcSearchbarInputOnFocus="wxcSearchbarInputOnFocus"
                     @wxcSearchbarInputOnBlur="wxcSearchbarInputOnBlur"></wxc-searchbar>
      <text class="value-text">{{value}}</text>
    </div>
    <div class="demo demo1">
      <text class="value-text">输入框禁用</text>
      <wxc-searchbar disabled="true" @wxcSearchbarInputDisabledClicked="searchbarInputDisabledOnclick"></wxc-searchbar>
    </div>
    <div class="demo demo1">
      <text class="value-text">带有目的地模式的输入框</text>
      <wxc-searchbar disabled="true"
                     placeholder="搜索目的地"
                     mod="hasDep"
                     dep-name="杭州出发"
                     @wxcSearchbarDepChooseClicked="wxcSearchbarDepChooseClicked"
                     @wxcSearchbarInputDisabledClicked="wxcSearchbarInputDisabledClicked"></wxc-searchbar>
    </div>
  </div>
</template>
<script>

  import { WxcSearchbar } from 'weex-ui'
  export default {
    components: { WxcSearchbar },
    data: () => ({
      value: ''
    }),
    methods: {
      wxcSearchbarInputOnFocus () {
      },
      wxcSearchbarInputOnBlur () {
      },
      wxcSearchbarInputReturned (){
      },
      wxcSearchbarCloseClicked () {
      },
      wxcSearchbarInputOnInput (e) {
        this.value = e.value;
      },
      wxcSearchbarCancelClicked () {
      },
      wxcSearchbarInputDisabledClicked () {
      },
      wxcSearchbarDepChooseClicked () {
      }
    }
  };
</script>

```

更详细代码可以参考 [demo](https://github.com/alibaba/weex-ui/blob/master/example/searchbar/index.vue)


### 可配置参数

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| mod | `String` |`N`| `default` | 搜索框样式 `default(默认)`/`hasDep(带出发地)` |
| placeholder | `String` |`N`| `搜索` | input placeholder|
| input-type | `String` |`N`| `text` | `text，password，url，email，tel`|
| return-key-type | `String` |`N`| `default` |键盘返回键的类型 `default/go/next/search/send/done`|
| cancel-label | `String` |`N`| `取消 ` |右侧按钮文案|
| autofocus | `Boolean` |`N`| `false` | 是否在页面加载时控件自动获得输入焦点 |
| default-value | `String` |`N`| `-` | 默认值 |
| disabled | `Boolean` |`N`| `false` | 是否禁用 |
| always-show-cancel | `Boolean` |`N`| `false` | 是否一直显示取消按钮 |
| dep-name | `String` |`N`| `杭州` | `mode="hasDep"`时需要设置出发地名称 |
| theme | `String` |`N`| `gray` |  输入框的色值主题 `gray`/`yellow` |
| bar-style | `Object` |`N`| `{}` | 当`theme`配置不满足时候使用`bar-style`样式进行覆盖 |

### 事件回调

```
// 具体使用可以参考上述demo，不需要可以不使用
```

### Api 模式
- 支持外部Api形式设置value，通过调用setValue，传入对应值即可,详细可见 [demo](https://github.com/alibaba/weex-ui/blob/master/example/searchbar/index.vue#L109)
- 通过调用autoBlur可以主动blur输入框

