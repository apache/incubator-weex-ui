# wxc-searchbar 

> Weex搜索栏组件，一般可位于 NavBar 下方，通过『取消按钮』退出激活状态, 允许设置点击跳转，支持带出发地形式的搜索。

- 飞猪的同学使用2.0以上版本务必设置`theme='yellow'`

-----

## [Demo预览](https://h5.m.taobao.com/trip/wxc-searchbar/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-searchbar%2Fdemo%2Findex.native-min.js)
<img src="https://img.alicdn.com/tfs/LB1SKzhSpXXXXclaXXXXXXXXXXX-750-1334.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="http://gtms01.alicdn.com/tfs/TB10KfVSpXXXXaRXVXXXXXXXXXX-200-200.png" width="160"/>

## 安装

```
npm install weex-ui --save
```

## 使用方法

```
<template>
  <div class="container">
    <div class="demo">
      <text class="value-text">基础输入框</text>
      <wxc-searchbar ref="wxc-searchbar"
                     v-on:searchbarCancelClick="searchbarCancelClick"
                     v-on:searchbarInputOnReturn="searchbarInputOnReturn"
                     v-on:searchbarInputOninput="searchbarInputOninput"
                     v-on:searchbarCloseClick="searchbarCloseClick"
                     v-on:searchbarInputOnfocus="searchbarInputOnfocus"
                     v-on:searchbarInputOnblur="searchbarInputOnblur"></wxc-searchbar>
      <text class="value-text">{{value}}</text>
    </div>
    <div class="demo demo1">
      <text class="value-text">输入框禁用</text>
      <wxc-searchbar disabled="true"
                     v-on:searchbarInputDisabledOnclick="searchbarInputDisabledOnclick"></wxc-searchbar>
    </div>
    <div class="demo demo1">
      <text class="value-text">带有目的地模式的输入框</text>
      <wxc-searchbar disabled="true"
                     placeholder="搜索目的地"
                     mod="hasDep"
                     dep-name="杭州出发"
                     v-on:searchbarDepChooseClick="searchbarDepChooseClick"
                     v-on:searchbarInputDisabledOnclick="searchbarInputDisabledOnclick"></wxc-searchbar>
    </div>
  </div>
</template>
<script>

  import { WxcSearchbar } from 'weex-ui'
  module.exports = {
    components: { WxcSearchbar },
    data: () => ({
      value: ''
    }),
    methods: {
      searchbarInputOnfocus () {
      },
      searchbarInputOnblur () {
      },
      searchbarInputOnReturn(){
      },
      searchbarCloseClick () {
      },
      searchbarInputOninput (e) {
        this.value = e.value;
      },
      searchbarCancelClick () {
      },
      searchbarInputDisabledOnclick () {
      },
      searchbarDepChooseClick () {
      }
    }
  };
</script>

```

### 可配置参数

| 名称      | 类型     | 默认值   | 备注  |
|-------------|------------|--------|-----|
| mod | `String` | 'default' | 搜索框默认样式，`default(默认)`、`hasDep(带出发地)` |
| placeholder | `String` | '搜索' | 输入框的placeholder|
| input-type | `String` | 'text' | 输入文案类型，`text，password，url，email，tel`|
| autofocus | `Boolean` | false | 是否在页面加载时控件自动获得输入焦点 |
| default-value | `String` | '' | 默认值 |
| disabled | `Boolean` | false | 是否禁用input |
| always-show-cancel | `Boolean` | false | 是否一直显示取消按钮 |
| dep-name | `String` | `杭州` | `mode="hasDep"` 需要设置出发地名称 |
| theme | `String` | `gray` |  输入框的色值主题`` |


### 事件回调

```
// 具体使用可以参考上述demo，不需要可以不使用。
```

### Api
- 支持外部Api形式设置value，通过调用setValue，传入对应值即可,详细可见[Demo]
- 通过调用autoBlur可以主动blur输入框

