# wxc-dialog 

> Weex 二次确认弹窗组件，可以设置标题、内容、按钮定制、不再提示等

### 规则
- 尽可能少用，Dialog 会打断用户操作，只用在重要的时候
- 标题不要超过一行，按钮最多两个
- 取消按钮在左侧，确定按钮在右侧
 

## [Demo](https://h5.m.taobao.com/trip/wxc-dialog/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-dialog%2Fdemo%2Findex.native-min.js)
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
    <wxc-dialog title="标题"
                content="这里是内容"
                :show="show"
                :single="false"
                :is-checked="isChecked"
                :show-no-prompt="true"
                @wxcDialogCancelBtnClicked="wxcDialogCancelBtnClicked"
                @wxcDialogConfirmBtnClicked="wxcDialogConfirmBtnClicked"
                @wxcDialogNoPromptClicked="wxcDialogNoPromptClicked">
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
        isChecked: false
      };
    },
    methods: {
      openDialog () {
        this.show = true;
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

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| title | `String` | `Y` | `-` | 标题 |
| left | `Number` |`N`| `0` | 向左移动距离  |
| content | `String` | `N` | `-`| 内容说明描述 |
| top | `Number` | `N` |`400` |  弹层距离顶部的高度 |
| single | `Boolean` | `N` |`false` |  是否只有一个按钮（显示确认） |
| cancel-text | `String` |`N` | `取消` |  取消按钮文案定制 |
| confirm-text | `String` | `N` |`确定` |  确定按钮文案定制 |
| main-btn-color | `String` | `N` |`#EE9900` |  主按钮的颜色值 |
| second-btn-color | `String` | `N` |`#666666` |  次要按钮颜色 |
| show-no-prompt | `Boolean` | `N` |`false` |  是否显示不再提示 |
| no-prompt-text | `String` | `N` |`不再提示` |  不再提示的文案 |
| is-checked | `Boolean` |`N` | `false` |  不再提示是否勾选 |


### 事件回调

```
@wxcDialogCancelBtnClicked="wxcDialogCancelBtnClicked"、
@wxcDialogConfirmBtnClicked="wxcDialogConfirmBtnClicked"、
@wxcDialogNoPromptClicked="wxcDialogNoPromptClicked"
```

### slot卡槽
1. `<slot name="title"></slot>`：标题卡槽，不传入使用文案
2. `<slot name="content"></slot>`：说明文案卡槽， 不传入使用文案

