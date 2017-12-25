# wxc-checkbox 

> Checkbox

### Rule
- It`s recommended to appear in groups by using **wxc-checkbox-list**.


## [Demo](https://h5.m.taobao.com/trip/wxc-checkbox/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-checkbox%2Fdemo%2Findex.native-min.js)

<img src="https://gw.alipayobjects.com/zos/rmsportal/uvtUDCJtVFhvszyfsLBJ.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1aLygSpXXXXXVXFXXXXXXXXXX-200-200.png" width="160"/>


## Code Example

```vue
<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <wxc-checkbox title="default"></wxc-checkbox>
      <wxc-checkbox title="default checked"
                    :checked="true"></wxc-checkbox>
      <wxc-checkbox title="unchecked and disabled"
                    :disabled="true"></wxc-checkbox>
      <wxc-checkbox title="checked and disabled"
                    :disabled="true"
                    :checked="true"></wxc-checkbox>
      <div class="margin">
        <wxc-checkbox-list :list="list"
                           @wxcCheckBoxListChecked="wxcCheckBoxListChecked"></wxc-checkbox-list>
        <text class="checked-text">checked list {{checkedList.toString()}}</text>
      </div>
    </scroller>
  </div>
</template>

<script>
  import { WxcCheckbox,WxcCheckboxList } from 'weex-ui'
  export default {
    components: { WxcCheckbox, WxcCheckboxList },
    data: () => ({
      list: [
        { title: 'option1', value: 1 },
        { title: 'option2', value: 2, checked: true },
        { title: 'option3', value: 3 },
        { title: 'option4', value: 4 }
      ],
      checkedList: [2]
    }),
    methods: {
      wxcCheckBoxListChecked (e) {
        this.checkedList = e.checkedList;
      }
    }
  }
</script>

```

More details can be found in [here](https://github.com/alibaba/weex-ui/blob/master/example/checkbox/index.vue)


### API
#### Checkbox
| Prop | Type | Required | Default | Description |
| ---- |:----:|:---:|:-------:| :----------:|
| title | `String` | `Y` | `-` |  label |
| Value | `[String、Number、Object]` | `Y` | `-` | original value |
| checked | `Boolean` | `N` | `false` | whether is checked |
| disabled | `Boolean` | `N` | `false` | whether is been disabled |
| config | `Object` | `N` | `{}` | overwrite color and icon|

- Event
```
// @wxcCheckBoxItemChecked="wxcCheckBoxItemChecked"
will return e.value、e.checked
```

#### CheckboxList
| Prop | Type | Required | Default | Description |
| ---- |:----:|:---:|:-------:| :----------:|
| list | `Array` | `Y` | `[]` | config list(*1) |
| config | `Object` | `N` | `{}` | overwrite color and icon(*1)|


- *1: `list`
```
const list=[
        { title: 'option1', value: 1 },
        { title: 'option2', value: 2, checked: true },
        { title: 'option3', value: 3 },
        { title: 'option4', value: 4 }
      ];
```

- *2: `config`

```
// you can overwrite it like this:
<wxc-checkbox-list :list="list"
                   :config="config"
                   @wxcCheckBoxListChecked="wxcCheckBoxListChecked"></wxc-checkbox-list>

const config={
    checkedIcon:'https://gw.alicdn.com/tfs/TB1Y9vlpwMPMeJjy1XcXXXpppXa-72-72.png',
    disabledIcon:'https://gw.alicdn.com/tfs/TB1PtN3pwMPMeJjy1XdXXasrXXa-72-72.png',
    checkedDisabledIcon:'https://gw.alicdn.com/tfs/TB1aPabpwMPMeJjy1XcXXXpppXa-72-72.png',
    unCheckedDisabledIcon:'https://gw.alicdn.com/tfs/TB1lTuzpwoQMeJjy0FoXXcShVXa-72-72.png',
    checkedColor: '#000000'
}
```


- Event
```
//@wxcCheckBoxListChecked="wxcCheckBoxListChecked"
will return e.checkedList
```
