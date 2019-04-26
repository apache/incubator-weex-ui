# wxc-rich-text 

> Weex 富文本的通用解决方案，支持 文字、图标、链接、标签 形式的混排

### 规则
- 使用统一规范，前后端约定相关字段
- wxc-rich-text用于支持一行通用图文混排情况
- wxc-special-rich-text用于支持两行特殊情况（一个 tag 或 icon 加两行文本情况）
   <img src="https://img.alicdn.com/tfs/TB1kqcoRXXXXXa3XpXXXXXXXXXX-2102-2320.png" width="600"/>

## [Demo](https://h5.m.taobao.com/trip/wxc-rich-text/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-rich-text%2Fdemo%2Findex.native-min.js)
<img src="https://img.alicdn.com/tfs/TB1e4LYSpXXXXXVXpXXXXXXXXXX-750-1334.png" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1OXrDSpXXXXcyXVXXXXXXXXXX-200-200.png" width="160"/>

## 使用方法

```vue
<template>
  <div class="container">
    <wxc-rich-text :config-list="configList"
                   @wxcRichTextLinkClick="wxcRichTextLinkClick"></wxc-rich-text>
     <div class="special-rich">
       <wxc-special-rich-text @wxcSpecialRichTextClick="wxcSpecialRichTextClick" :config-list="specialConfigList"></wxc-special-rich-text>
     </div>
  </div>
  
</template>
<script>
  import icon from './type.js';
  import { WxcRichText,WxcSpecialRichText } from 'weex-ui';

  export default {
    components: { WxcRichText, WxcSpecialRichText },
    data: () => ({
      configList: [{
        type: 'icon',
        src: 'https//gw.alicdn.com/tfs/TB1RRVWQXXXXXasXpXXXXXXXXXX-24-22.png',
        style: {
          height: 22
        }
      }, {
        type: 'text',
        value: '黄色主题',
        theme: 'yellow'
      }, {
        type: 'link',
        value: '自定义颜色link',
        href: '//h5.m.taobao.com',
        style: {
          color: '#546E7A'
        }
      }, {
        type: 'icon',
        src: icon.fliggy
      }, {
        type: 'tag',
        value: '满100减20',
        theme: 'red'
      }, {
        type: 'tag',
        value: '自定义标签',
        style: {
          fontSize: 26,
          color: '#ffffff',
          borderColor: '#3d3d3d',
          backgroundColor: '#546E7A',
          height: 36
        }
      }],
      specialConfigList: [
        {
          type: 'tag',
          value: '自由行',
          style: {
            fontSize: 24,
            color: '#3D3D3D',
            borderColor: '#FFC900',
            backgroundColor: '#FFC900',
            borderRadius: 14,
          },
          tagDivStyle: {
            left: '50px'
          }
        },
        {
          type: 'text',
          value: '春秋旅游广州-泰国曼谷6天往返单机票自由行自由春秋旅游广州-泰国曼谷6天往返单机票自由行自由行…',
          theme: 'black',
          style: {
            fontSize: 28
          }
        }
      ],
    }),
    methods: {
      wxcRichTextLinkClick () {},
      wxcSpecialRichTextClick () {}
    }
  };
</script>
```

更详细代码可以参考 [demo](https://github.com/alibaba/weex-ui/blob/master/example/rich-text/index.vue)


### 可配置参数

| Prop | Type | Required | Default | Description |
| ---- |:----:|:---:|:-------:| :----------:|
| config-list | `Array` |`Y`| `[]` | 富文本配置 可参考 **规则图** 和 [Demo](https://github.com/alibaba/weex-ui/blob/master/example/rich-text/index.vue#L78)|
| has-text-margin | `Boolean` |`N`| 'true' | 文字相互之间是否有 margin|


### 事件回调

```
@wxcRichTextLinkClick="wxcRichTextLinkClick"
@wxcSpecialRichTextClick="wxcSpecialRichTextClick"
```


