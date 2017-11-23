# wxc-dialog 

> Weex二次确认弹窗组件，可以设置标题和内容、按钮定制、颜色、不再提示选项等等。

- 规则
   - 尽可能少用，Modal 会打断用户操作，只用在重要的时候。
   - 标题不要超过一样，按钮最多两个。
   - 取消按钮在左侧，确定按钮在右侧。
 

## [Demo预览](https://h5.m.taobao.com/trip/wxc-dialog/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-dialog%2Fdemo%2Findex.native-min.js)
<img src="https://gw.alipayobjects.com/zos/rmsportal/qastXqTFLQMoCDjYoeRc.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1Oa09SpXXXXbiXVXXXXXXXXXX-200-200.png" width="160"/>

## 使用方法

```vue
<template>
  <div class="container">
    <div class="demo">
      <div class="btn" @click="openDialog">
        <text class="btn-txt">对话消息Dialog</text>
      </div>
    </div>
    <wxc-dialog title="阿里旅行协议"
                :show="show"
                @wxcDialogCancelBtnClicked="wxcDialogCancelBtnClicked"
                @wxcDialogConfirmBtnClicked="wxcDialogConfirmBtnClicked"
                @wxcDialogNoPromptClicked="wxcDialogNoPromptClicked"
                content="为保障消费者权益，阿里旅行·去啊服务保障全面升级，凡在阿里旅行·去啊购买机票、酒店、客栈、门票、度假产品全面享有成行保障和如实描述"
                :single="single"
                :is-checked="isChecked"
                :show-no-prompt="showNoPrompt">
    </wxc-dialog>
  </div>
</template>

<script>
  import { WxcDialog } from 'weex-ui';
  export default {
    components: { WxcDialog },
    data: function () {
      return {
        show: false,
        single: false,
        showNoPrompt: false,
        isChecked: false
      };
    },
    methods: {
      openDialog () {
        const self = this;
        self.single = false;
        self.showNoPrompt = false;
        self.show = true;
      },
      wxcDialogCancelBtnClicked () {
      //此处必须设置，组件为无状态组件，自己管理
        this.show = false;
      },
      wxcDialogConfirmBtnClicked () {
      //此处必须设置，组件为无状态组件，自己管理
        this.show = false;
      },
      wxcDialogNoPromptClicked (e) {
      //此处必须设置，组件为无状态组件，自己管理
        this.isChecked = e.isChecked;
      }
    }
  };
</script>

```

更详细代码可以参考 [demo](https://github.com/alibaba/weex-ui/blob/master/example/dialog/index.vue)

### 可配置参数

| 名称      | 类型     | 默认值   | 备注  |
|-------------|------------|--------|-----|
| title | `String` | '' | `required`标题 |
| content | `String` | '' | 内容说明描述 |
| top | `Number` | `400` |  弹层距离顶部的高度 |
| single | `Boolean` | '' |  是否只有一个按钮（显示确认） |
| cancel-text | `String` | '取消' |  取消按钮文案定制 |
| confirm-text | `String` | '确定' |  确定按钮文案定制 |
| main-btn-color | `String` | `#EE9900` |  主按钮的颜色值 |
| second-btn-color | `String` | `#666666` |  次要按钮颜色 |
| show-no-prompt | `Boolean` | `false` |  是否显示不再提示 |
| no-prompt-text | `String` | `不再提示` |  不再提示的文案 |
| is-checked | `Boolean` | `false` |  不再提示是否勾选 |


### 事件回调

```
//请参考上述demo，需要设置
@wxcDialogCancelBtnClicked="wxcDialogCancelBtnClicked"、
@wxcDialogConfirmBtnClicked="wxcDialogConfirmBtnClicked"、
@wxcDialogNoPromptClicked="wxcDialogNoPromptClicked"的回调（假如有使用的话~）
```

### slot卡槽
1. `<slot name="title"></slot>`：标题卡槽，不传入使用文案
2. `<slot name="content"></slot>`：说明文案卡槽， 不传入使用文案

