# wxc-cell 

> A cell to display list, link or form.

### Rule
  - 可以设置label、标题、描述、跳转、箭头显示和点击事件回调功能
  

## [Demo Preview](https://h5.m.taobao.com/trip/wxc-cell/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-cell%2Fdemo%2Findex.native-min.js)
<img src="https://img.alicdn.com/tfs/TB1mIA5c5qAXuNjy1XdXXaYcVXa-750-1334.jpg" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB15ta_SpXXXXcFaVXXXXXXXXXX-191-197.png" width="160"/>

## Code Example

```vue
<template>
  <div class="container">
    <div class="demo">
      <text class="demo-title">List demo</text>

      <wxc-cell label="Label demo text"
                title="Title demo text"
                :has-arrow="true"
                @wxcCellClicked="wxcCellClicked"
                :has-margin="true"></wxc-cell>

      <wxc-cell label="Label demo text"
                title="Title demo text"
                :has-arrow="true"
                link="https://h5.m.taobao.com/trip/home/index.html"
                @wxcCellClicked="wxcCellClicked"
                spm="181.12312312.12312.d01"
                :has-top-border="false"></wxc-cell>

      <wxc-cell label="Label demo text"
                title="Title demo text"
                :has-arrow="true"
                @wxcCellClicked="wxcCellClicked"
                :has-top-border="false"></wxc-cell>

    </div>
    <div class="demo">
      <text class="demo-title">No label</text>
      <wxc-cell title="Title demo text"
                :has-arrow="true"
                @wxcCellClicked="wxcCellClicked"
                :has-top-border="true"></wxc-cell>
    </div>

    <div class="demo">
      <text class="demo-title">Add desc</text>
      <wxc-cell title="Title text"
                desc="Desc text"
                :has-arrow="true"
                @wxcCellClicked="wxcCellClicked"
                :has-top-border="true"></wxc-cell>
    </div>

    <div class="demo">
      <text class="demo-title">No arrow</text>
      <wxc-cell title="Title text"
                :has-arrow="false"
                @wxcCellClicked="wxcCellClicked"
                :has-top-border="true"></wxc-cell>
    </div>
    <div class="demo">
      <text class="demo-title">Custom slot</text>
      <wxc-cell title="Title text"
                :has-arrow="false"
                :has-top-border="true">
        <switch slot="value"></switch>
      </wxc-cell>
    </div>
  </div>
</template>

<script>
  import { WxcCell } from 'weex-ui';
  export default {
    components: { WxcCell },
    methods: {
      wxcCellClicked (e) {
        console.log(e)
      }
    }
  };
</script>
```
More details can be found [here](https://github.com/alibaba/weex-ui/blob/master/example/cell/index.vue)


### API

| Prop      | Type   |Required  | Default   | Description  |
|-------------|------------|--------|--------|-----|
| label | `String` | `N`|  '' |label（常用于描述cell） |
| title | `String` | `N`|  '' |标题 |
| desc  | `String` | `N`| '' |描述字段，展示说明信息 |
| link  | `String` | `N`| ''| 跳转链接，无链接不跳转 |
| arrow-icon | `String` | `N`|`箭头` |  覆盖右向箭头 |
| has-arrow | `Bool` |`N`| `false` |  是否显示箭头 |
| has-top-border | `Bool` | `N`| `false` |  是否有上边框 |
| has-bottom-border | `Bool` | `N`| `true` | 是否有下边框 |
| has-vertical-indent | `Bool` | `N`| `true` |  是否有垂直间距 |
| has-margin | `Bool` |`N`| `false` | cell之间是否有margin |


### Slot
1. `<slot name="label"></slot>`：label卡槽，不传入使用文案
2. `<slot name="title"></slot>`：title卡槽， 不传入使用文案
3. `<slot name="value"></slot>`：有时候可以需要传入输入框、checkbox情况


### Event

```
//`@wxcCellClicked="wxcCellClicked"`
```
