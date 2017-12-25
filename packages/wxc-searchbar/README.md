# wxc-searchbar 

> Search bar 

### Rule
- Under the navigation bar.
- Exit the activation state with the `cancel button`

## [Demo](https://h5.m.taobao.com/trip/wxc-searchbar/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-searchbar%2Fdemo%2Findex.native-min.js)
<img src="https://gw.alipayobjects.com/zos/rmsportal/qbEmYUETsvpDKuloPFfu.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB10KfVSpXXXXaRXVXXXXXXXXXX-200-200.png" width="160"/>


## Code Example

```vue
<template>
  <div class="container">
    <div class="demo">
      <text class="value-text">base search bar</text>
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
      <text class="value-text">input disabled</text>
      <wxc-searchbar disabled="true" @wxcSearchbarInputDisabledClicked="searchbarInputDisabledOnclick"></wxc-searchbar>
    </div>
    <div class="demo demo1">
      <text class="value-text">has dep</text>
      <wxc-searchbar disabled="true"
                     placeholder="type to search"
                     mod="hasDep"
                     dep-name="hangzhou"
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

More details can be found in [here](https://github.com/alibaba/weex-ui/blob/master/example/searchbar/index.vue)


### API

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| mod | `String` |`N`| `default` | search bar mode `default`/`hasDep` |
| placeholder | `String` |`N`| `搜索` | input placeholder|
| input-type | `String` |`N`| `text` | `text，password，url，email，tel`|
| autofocus | `Boolean` |`N`| `false` | input auto focus |
| default-value | `String` |`N`| `-` | default value |
| disabled | `Boolean` |`N`| `false` | whether is been disabled|
| always-show-cancel | `Boolean` |`N`| `false` | whether to show cancel button |
| dep-name | `String` |`N`| `杭州` | dep name when `mode="hasDep"` |
| theme | `String` |`N`| `gray` |  search bar theme `gray`/`yellow` |


### Event

```
// Specific use can refer to the above demo, do not need to be able to not use.
```

### Manual

```
<wxc-searchbar ref="wxcSearchbar"></wxc-searchbar>
// this.$refs.wxcSearchbar.setValue("SET");
// this.$refs.wxcSearchbar.autoBlur();
```

