# wxc-rich-text 

> Rich text general solution, support text, icon, link, label form of mixing

### Rule
- Using unified specification, conventions related fields in front and back end.
- `wxc-rich-text` supports a row of general graphic and text mixing.
- `wxc-special-rich-text` supports two row of special mixing (tag + text、icon + text).
   <img src='https://img.alicdn.com/tfs/TB1kqcoRXXXXXa3XpXXXXXXXXXX-2102-2320.png' width='600'/>

## [Demo](https://h5.m.taobao.com/trip/wxc-rich-text/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-rich-text%2Fdemo%2Findex.native-min.js)
<img src='https://img.alicdn.com/tfs/TB1e4LYSpXXXXXVXpXXXXXXXXXX-750-1334.png' width='240'/>&nbsp;&nbsp;&nbsp;&nbsp;<img src='https://img.alicdn.com/tfs/TB1OXrDSpXXXXcyXVXXXXXXXXXX-200-200.png' width='160'/>

## Code Example

```vue
<template>
  <div class='container'>
    <wxc-rich-text :config-list='configList'
                   @wxcRichTextLinkClick='wxcRichTextLinkClick'></wxc-rich-text>
     <div class='special-rich'>
       <wxc-special-rich-text @wxcSpecialRichTextClick="wxcSpecialRichTextClick"  :config-list='specialConfigList'></wxc-special-rich-text>
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
        value: 'yellow theme',
        theme: 'yellow'
      }, {
        type: 'link',
        value: 'link',
        href: '//h5.m.taobao.com',
        style: {
          color: '#546E7A'
        }
      }, {
        type: 'icon',
        src: icon.fliggy
      }, {
        type: 'tag',
        value: 'hello world',
        theme: 'red'
      }, {
        type: 'tag',
        value: 'custom tag',
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
          value: 'happy go',
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
          value: 'Different from a web app you can use Weex to build a real mobile app.',
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

More details can be found in [here](https://github.com/alibaba/weex-ui/blob/master/example/rich-text/index.vue)


### API

| Prop | Type | Required | Default | Description |
| ---- |:----:|:---:|:-------:| :----------:|
| config-list | `Array` |`Y`| `[]` | config list eg:[Demo](https://github.com/alibaba/weex-ui/blob/master/example/rich-text/index.vue#L78)|
| has-text-margin | `Boolean` |`N`| 'true' | whether has text margin|


### Event

```
@wxcRichTextLinkClick='wxcRichTextLinkClick'
@wxcSpecialRichTextClick="wxcSpecialRichTextClick"
```


