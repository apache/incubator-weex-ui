# wxc-checkbox 

> Weex 复选框组件

### 规则
- 建议以成组的方式出现，使用`wxc-checkbox-list`


## [Demo](https://h5.m.taobao.com/trip/wxc-checkbox/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-checkbox%2Fdemo%2Findex.native-min.js)

<img src="https://gw.alipayobjects.com/zos/rmsportal/uvtUDCJtVFhvszyfsLBJ.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1aLygSpXXXXXVXFXXXXXXXXXX-200-200.png" width="160"/>


## 使用方法

```vue
<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <wxc-checkbox title="默认"></wxc-checkbox>
      <wxc-checkbox title="默认选中"
                    :checked="true"></wxc-checkbox>
      <wxc-checkbox title="未选中不可更改"
                    :disabled="true"></wxc-checkbox>
      <wxc-checkbox title="选中不可更改"
                    :disabled="true"
                    :checked="true"></wxc-checkbox>
      <div class="margin">
        <wxc-checkbox-list :list="list"
                           @wxcCheckBoxListChecked="wxcCheckBoxListChecked"></wxc-checkbox-list>
        <text class="checked-text">选中项 {{checkedList.toString()}}</text>
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
        { title: '选项1', value: 1 },
        { title: '选项2', value: 2, checked: true },
        { title: '选项3', value: 3 },
        { title: '选项4', value: 4 }
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

更多详细情况可以参考 [demo](https://github.com/alibaba/weex-ui/blob/master/example/checkbox/index.vue)

### 可配置参数
#### Checkbox
| Prop | Type | Required | Default | Description |
| ---- |:----:|:---:|:-------:| :----------:|
| title | `String` | `Y` | `-` | checkbox显示label |
| Value | `[String、Number、Object]` | `Y` | `-` | checkbox的value |
| checked | `Boolean` | `N` | `false` | checkbox是否选中 |
| disabled | `Boolean` | `N` | `false` | checkbox是否不可选 |
| config | `Object` | `N` | `{}` | 覆盖颜色和 icon|
| has-top-border | `Boolean` | `N` | `false` |是否显示上边|
| has-bottom-border | `Boolean` | `N` | `true` |是否显示下边|

- 事件回调
```
//点击事件回调  `@wxcCheckBoxItemChecked="wxcCheckBoxItemChecked"`
将会返回e.value、e.checked
```

#### CheckboxList
| Prop | Type | Required | Default | Description |
| ---- |:----:|:---:|:-------:| :----------:|
| list | `Array` | `Y` | `[]` | checkbox列表配置 (*1) |
| config | `Object` | `N` | `{}` | 覆盖颜色和 icon (*2)|

- 注1: `list`
```
const list=[
        { title: '选项1', value: 1 },
        { title: '选项2', value: 2, checked: true },
        { title: '选项3', value: 3 },
        { title: '选项4', value: 4 }
      ];
```

- 注2: `config`

```
// 你可以这样覆盖样式和 icon:
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

- 事件回调
```
//点击事件回调  `@wxcCheckBoxListChecked="wxcCheckBoxListChecked"`
将会返回已经选中的e.checkedList
```
