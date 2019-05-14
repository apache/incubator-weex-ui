# wxc-swipe-action

!> 这个富交互体验组件依赖于 [BindingX](https://alibaba.github.io/bindingx/) 特性，使用前请确定你的App [是否安装](https://github.com/alibaba/bindingx#installation)

### 规则
- 一次只可滑动一行列表
- 点击右边按钮或点击列表可隐藏操作。

## [Demo]
<img src="http://cdn.emas-poc.com/material/weex/82xh6-9dnxz2.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;

## 使用方法
```vue
<template>
<div>
    <WxcSwipeAction @onNodeClick='onTest' :data='data'/>
</div>
</template>

<script>
import { WxcSwipeAction } from 'weex-ui';
const modal = weex.requireModule("modal");

export default {
  components: {
    WxcSwipeAction
  },
  data() {
    return {
      data: [
        {
          title: "标题1",
          right: [
            {
              text: "置顶",
              onPress: function() {
                modal.toast({
                  message: "置顶",
                  duration: 0.3
                });
              }
            },
            {
              text: "删除",
              onPress: () => {
                modal.toast({
                  message: "删除",
                  duration: 0.3
                });
              },
              style: { backgroundColor: "#F4333C", color: "white" }
            }
          ]
        },
        {
          title: "标题2",
          right: [
            {
              text: "删除",
              onPress: () => {
                modal.toast({
                  message: "删除",
                  duration: 0.3
                });
              },
              style: { backgroundColor: "#F4333C", color: "white" }
            }
          ]
        },
        {
          title: "标题3",
          right: [
            {
              text: "删除",
              onPress: () => {
                modal.toast({
                  message: "删除",
                  duration: 0.3
                });
              },
              style: { backgroundColor: "#F4333C", color: "white" }
            }
          ]
        }
      ]
    };
  },
  
  methods: {
    onTest(node, i) {
      modal.toast({
        message: node.title,
        duration: 0.3
      });
    }
  }
};
</script>
```

### 可配置参数
|参数|类型|是否要引入|默认值|描述|
|-------------|------------|--------|-----|-----|
|data|Array|Y|[]|列表数据|

### Data API
|属性|说明|类型|默认值|
|-------------|------------|--------|-----|
|title|标题|String|null|
|right|右侧按钮组|Array|null|
|autoClose|点击按钮后自动隐藏按钮|Boolean|false|

### Button
|参数|类型|描述|
|-------------|------------|--------|
|text|String|文案|
|style|Object|按钮样式|
|onPress|():void|单击事件|

### 事件回调

```
// 单击列表
`@onNodeClick='onTest'`
```
