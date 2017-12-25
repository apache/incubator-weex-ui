# wxc-radio 

> Radio Group 


## [Demo](https://h5.m.taobao.com/trip/wxc-radio/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-radio%2Fdemo%2Findex.native-min.js)

<img src="https://gw.alipayobjects.com/zos/rmsportal/AQMauSgRgIvdoSfxQVmN.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1ORR4SpXXXXX8aXXXXXXXXXXX-200-200.png" width="160"/>


## Code Example

```vue
<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <wxc-radio :list="list" @wxcRadioListChecked="wxcRadioListChecked"></wxc-radio>
      <text class="radio-text">checkedItem: {{checkedInfo}}</text>
      <category title="Radio disabled"></category>
      <wxc-radio :list="list2"></wxc-radio>
    </scroller>
  </div>
</template>

<script>
  import { WxcRadio } from 'weex-ui'
  export default {
    components: { WxcRadio },
    data: () => ({
      list: [
        { title: 'option1', value: 1 },
        { title: 'option2', value: 2, checked: true },
        { title: 'option3', value: 3 },
        { title: 'option4', value: 4 },
      ],
      list2: [
        { title: 'unchecked and disabled', value: 5, disabled: true },
        { title: 'checked and disabled', value: 6, disabled: true, checked: true },
      ],
      checkedInfo: { title: 'option2', value: 2 }
    }),
    methods: {
      wxcRadioListChecked (e) {
        this.checkedInfo = e;
      }
    }
  }
</script>
```

More details can be found in [here](https://github.com/alibaba/weex-ui/blob/master/example/radio/index.vue)

### API

| Prop | Type | Required | Default | Description |
| ---- |:----:|:---:|:-------:| :----------:|
| list | `Array` | `Y` | `[]` | Radio config list(*1) |
| config | `Object` | `N` | `{}` |overwrite color and icon(*2) |

#### child item configs
| Prop | Type | Required | Default | Description |
| ---- |:----:|:---:|:-------:| :----------:|
| title | `String` | `Y` | `-` | radio label |
| Value | `[String、Number、Object]` | `Y` | `-` | radio value |
| checked | `Boolean` | `N` | `false` | whether is been checked |
| disabled | `Boolean` | `N` | `false` | whether is been disabled |
| config | `Object` | `N` | `{}` | overwrite color and icon|

*1: `list`
```
const list=[
        { title: 'option1', value: 1 },
        { title: 'option2', value: 2, checked: true },
        { title: 'checked and disabled', value: 5, disabled: true },
        { title: 'option3', value: 3 },
        { title: 'option4', value: 4 }
      ];
```

*2: `config`

```
// you can overwrite it like this:
<wxc-radio :list="list" :config="config"></wxc-radio>

const config={
    checkedIcon:'https://gw.alicdn.com/tfs/TB1Y9vlpwMPMeJjy1XcXXXpppXa-72-72.png',
    disabledIcon:'https://gw.alicdn.com/tfs/TB1PtN3pwMPMeJjy1XdXXasrXXa-72-72.png',
    checkedColor: '#000000'
}
```

### Event

```
// @wxcRadioListChecked="wxcRadioListChecked"
will return e.value、e.title、e.oldIndex、e.index
```
