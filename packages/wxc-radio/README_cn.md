# wxc-radio 

> Weex 单选组组件


## [Demo](https://h5.m.taobao.com/trip/wxc-radio/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-radio%2Fdemo%2Findex.native-min.js)

<img src="https://gw.alipayobjects.com/zos/rmsportal/AQMauSgRgIvdoSfxQVmN.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1ORR4SpXXXXX8aXXXXXXXXXXX-200-200.png" width="160"/>


## 使用方法

```vue
<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <wxc-radio :list="list" @wxcRadioListChecked="wxcRadioListChecked"></wxc-radio>
      <text class="radio-text">checkedItem: {{checkedInfo}}</text>
      <category title="Radio不可选"></category>
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
        { title: '选项1', value: 1 },
        { title: '选项2', value: 2, checked: true },
        { title: '选项3', value: 3 },
        { title: '选项4', value: 4 },
      ],
      list2: [
        { title: '未选不可修改', value: 5, disabled: true },
        { title: '已选不可修改', value: 6, disabled: true, checked: true },
      ],
      checkedInfo: { title: '选项2', value: 2 }
    }),
    methods: {
      wxcRadioListChecked (e) {
        this.checkedInfo = e;
      }
    }
  }
</script>
```

更详细代码可以参考 [demo](https://github.com/alibaba/weex-ui/blob/master/example/radio/index.vue)

### 可配置参数

| Prop | Type | Required | Default | Description |
| ---- |:----:|:---:|:-------:| :----------:|
| list | `Array` | `Y` | `[]` | Radio 列表配置(注1) |
| config | `Object` | `N` | `{}` |覆盖颜色和 icon(注2)|

#### 子item详细说明
| Prop | Type | Required | Default | Description |
| ---- |:----:|:---:|:-------:| :----------:|
| title | `String` | `Y` | `-` | Radio 显示 label |
| Value | `[String、Number、Object]` | `Y` | `-` | Radio 的 value |
| checked | `Boolean` | `N` | `false` | Radio 是否选中 |
| disabled | `Boolean` | `N` | `false` | Radio 是否不可选 |
| config | `Object` | `N` | `{}` |覆盖颜色和 icon|

注1: `list`
```
const list=[
        { title: '选项1', value: 1 },
        { title: '选项2', value: 2, checked: true },
        { title: '未选不可修改', value: 5, disabled: true },
        { title: '选项3', value: 3 },
        { title: '选项4', value: 4 }
      ];
```

注2: `config`
```

// 你可以这样来覆盖原有的样式和icon设置
<wxc-radio :list="list" :config="config"></wxc-radio>

const config={
    checkedIcon:'https://gw.alicdn.com/tfs/TB1Y9vlpwMPMeJjy1XcXXXpppXa-72-72.png',
    disabledIcon:'https://gw.alicdn.com/tfs/TB1PtN3pwMPMeJjy1XdXXasrXXa-72-72.png',
    checkedColor: '#000000'
}

```

### 事件回调

```
//点击事件回调 `@wxcRadioListChecked="wxcRadioListChecked"`
将会返回 e.value、e.title、e.oldIndex、e.index
```
