# wxc-noticebar 

> Weex版本的通知栏，在导航栏下方，一般用作系统提醒、活动提醒等通知。

- 规则：
    - 需要引起用户关注时使用，重要级别低于 Modal ，高于 Toast。
    - 文案应该简洁明了，过长将会... , 同时特殊情况也可以设置lines为2行


## [Demo预览](https://h5.m.taobao.com/trip/wxc-noticebar/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-noticebar%2Fdemo%2Findex.native-min.js)
<img src="https://img.alicdn.com/tfs/TB1mIA5c5qAXuNjy1XdXXaYcVXa-750-1334.jpg" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB18V3aSpXXXXboXpXXXXXXXXXX-200-200.png" width="160"/>

## 使用方法

```vue
<template>
  <div class="container">
    <div class="demo">
      <wxc-noticebar
        mode="link"
        notice="飞猪测试通告,可跳转"
        type="info"
        @wxcNoticebarLinkClicked="wxcNoticebarLinkClicked"
        notice-url="//h5.m.taobao.com/trip/home/index.html">
      </wxc-noticebar>
    </div>
    <div class="demo">
      <wxc-noticebar mode="closable"
                             notice="测试通告,可跳转测试通告,可跳转测试通告,可跳转测试通告,可跳转测试通告,可跳转"
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

更详细代码可以参考 [demo](https://github.com/alibaba/weex-ui/blob/master/example/noticebar/index.vue)


### 可配置参数

| 名称      | 类型     | 默认值   | 备注  |
|-------------|------------|--------|-----|
| notice | `String` | '' | 通知文案`required` |
| noticeUrl | `String` | '' | 跳转链接，没有不跳转 |
| mode | `String` | '' | 提示类型（右侧图标）：link(链接)，closable（关闭按钮） |
| type | `String` | '' | 图标类型（左侧图标）`success`、`error`、`info`、`question`、`time` 、`redbag` |
|  lines | `Number` | '1' | 文案行数，取最大的行数截取 |


### 事件回调

```
//点击链接后的回调 `@wxcNoticebarLinkClicked="wxcNoticebarLinkClicked"`
//点击关闭按钮后的回调`@wxcNoticebarCloseClicked="wxcNoticebarCloseClicked"`
```

