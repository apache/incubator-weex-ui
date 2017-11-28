# wxc-cell 

> Weex表单元素布局组件，可用于表单信息展示、输入

- 规则
  - 单元格，可用作展示列表信息、链接或者表单等  
  - 可以设置label、标题、描述、跳转、箭头显示和点击事件回调功能
  - 可以设置子元素传入
  

## [Demo预览](https://h5.m.taobao.com/trip/wxc-cell/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-cell%2Fdemo%2Findex.native-min.js)
<img src="https://img.alicdn.com/tfs/TB1mIA5c5qAXuNjy1XdXXaYcVXa-750-1334.jpg" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB15ta_SpXXXXcFaVXXXXXXXXXX-191-197.png" width="160"/>

## 使用方法

```vue
<template>
  <div class="container">
    <div class="demo">
      <text class="demo-title">列表list展示</text>

      <wxc-cell label="标题"
                title="阿里旅行飞猪"
                :has-arrow="true"
                @wxcCellClicked="wxcCellClicked"
                :has-margin="true"></wxc-cell>

      <wxc-cell label="标题"
                title="带链接"
                :has-arrow="true"
                link="https://h5.m.taobao.com/trip/home/index.html"
                @wxcCellClicked="wxcCellClicked"
                spm="181.12312312.12312.d01"
                :has-top-border="false"></wxc-cell>

      <wxc-cell label="标题"
                title="阿里旅行飞猪"
                :has-arrow="true"
                @wxcCellClicked="wxcCellClicked"
                :has-top-border="false"></wxc-cell>

    </div>
    <div class="demo">
      <text class="demo-title">不配置label</text>
      <wxc-cell title="阿里旅行飞猪"
                :has-arrow="true"
                @wxcCellClicked="wxcCellClicked"
                :has-top-border="true"></wxc-cell>
    </div>

    <div class="demo">
      <text class="demo-title">配置附加信息</text>
      <wxc-cell title="阿里旅行飞猪"
                desc="这里是附加信息"
                :has-arrow="true"
                @wxcCellClicked="wxcCellClicked"
                :has-top-border="true"></wxc-cell>
    </div>

    <div class="demo">
      <text class="demo-title">不显示箭头</text>
      <wxc-cell title="阿里旅行飞猪"
                :has-arrow="false"
                @wxcCellClicked="wxcCellClicked"
                :has-top-border="true"></wxc-cell>
    </div>
    <div class="demo">
      <text class="demo-title">自定义子元素</text>
      <wxc-cell title="这里是标题"
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
更详细代码可以参考 [demo](https://github.com/alibaba/weex-ui/blob/master/example/cell/index.vue)


### 可配置参数

| 名称      | 类型     | 默认值   | 备注  |
|-------------|------------|--------|-----|
| label | `String` | '' | label（常用于描述cell） |
| title | `String` | '' | 标题 |
| desc | `String` | '' | 描述字段，展示说明信息 |
| link | `String` | '' |  跳转链接，无链接不跳转 |
| arrow-icon | `String` | `箭头` |  覆盖右向箭头 |
| has-arrow | `Bool` | `false` |  是否显示箭头 |
| has-top-border | `Bool` | `false` |  是否有上边框 |
| has-bottom-border | `Bool` | `true` |  是否有下边框 |
| has-vertical-indent | `Bool` | `true` |  是否有垂直间距 |
| has-margin | `Bool` | `false` |  cell之间是否有margin |
| spm | `String` | '' |cell链接带入spm|


### slot卡槽
1. `<slot name="label"></slot>`：label卡槽，不传入使用文案
2. `<slot name="title"></slot>`：title卡槽， 不传入使用文案
3. `<slot name="value"></slot>`：有时候可以需要传入输入框、checkbox情况


### 事件回调
```
//点击事件回调  `@wxcCellClicked="wxcCellClicked"`
```
