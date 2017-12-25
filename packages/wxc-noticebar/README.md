# wxc-noticebar 

> Notice bar

### Rule
- Component to display a system message, event notice and etc. Which is under the navigation bar.
- Be used to attract user's attension, the importance level is lower than Modal and higher than Toast.
- Should be concise and clear, too long will... ,but you can set `lines=2`.

## [Demo](https://h5.m.taobao.com/trip/wxc-noticebar/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-noticebar%2Fdemo%2Findex.native-min.js)
<img src="https://img.alicdn.com/tfs/TB1mIA5c5qAXuNjy1XdXXaYcVXa-750-1334.jpg" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB18V3aSpXXXXboXpXXXXXXXXXX-200-200.png" width="160"/>

## Code Example

```vue
<template>
  <div class="container">
    <div class="demo">
      <wxc-noticebar
        mode="link"
        notice="notice,can jump"
        type="info"
        @wxcNoticebarLinkClicked="wxcNoticebarLinkClicked"
        notice-url="//h5.m.taobao.com/trip/home/index.html">
      </wxc-noticebar>
    </div>
    <div class="demo">
      <wxc-noticebar mode="closable"
                     notice="text notice,text notice,text notice,text notice,text notice,text notice,text notice"
                     :lines="2"
                     type="warn"></wxc-noticebar>
      </wxc-noticebar>
    </div>
  </div>
</template>

<script>
  const modal = weex.requireModule('modal');
  import { WxcNoticebar } from 'weex-ui';
  export default {
    components: { WxcNoticebar },
    data: () => ({
      show: true
    }),
    methods: {
      wxcNoticebarCloseClicked(e){
        console.log(e);
        modal.toast({ 'message': 'wxcNoticebarCloseClicked', 'duration': 1 });
      },
      wxcNoticebarLinkClicked(e){
        console.log(e);
        modal.toast({ 'message': 'wxcNoticebarLinkClicked', 'duration': 1 });
      }
    }
  };
</script>

```

More details can be found in [here](https://github.com/alibaba/weex-ui/blob/master/example/noticebar/index.vue)


### Api

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| notice | `String` |`Y`| `-` | notice text |
| notice-url | `String` |`Y`| `-` | jump link, no no jump |
| mode | `String` |`Y`|  `-` |notice mode (right icon) `link`/`closable`|
| type | `String` |`Y`| `-` | notice type (left icon)`success`/`error`/`info`/`question`/`time` /`redbag` |
|  lines | `Number` |`Y`| `1` | text lines |


### Event

```
`@wxcNoticebarLinkClicked="wxcNoticebarLinkClicked"`
`@wxcNoticebarCloseClicked="wxcNoticebarCloseClicked"`
```

