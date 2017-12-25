# wxc-dialog 

> Use to show important information for the system, and ask for user feedback. eg: When deleting an important content, pop up a Modal for secondary confirmation.

### Rule
- Use as few as possible. Modal will interrupt user operation, only use it at important situation.
- Title should be concise, do not exceed 1 line; description should be concise and complete, generally no more than 2 lines.
- Generally put the most likely clicked button on the right side. In addition, the cancel button should always be on the left.
 

## [Demo](https://h5.m.taobao.com/trip/wxc-dialog/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-dialog%2Fdemo%2Findex.native-min.js)
<img src="https://gw.alipayobjects.com/zos/rmsportal/qastXqTFLQMoCDjYoeRc.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1Oa09SpXXXXbiXVXXXXXXXXXX-200-200.png" width="160"/>

## Code Example

```vue
<template>
  <div class="container">
    <div class="demo">
      <div class="btn" @click="openDialog">
        <text class="btn-txt">Dialog</text>
      </div>
    </div>
    <wxc-dialog title="title"
                content="this is content"
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
      // must setting,control by yourself
        this.show = false;
      },
      wxcDialogConfirmBtnClicked () {
      // must setting,control by yourself
        this.show = false;
      },
      wxcDialogNoPromptClicked (e) {
      // must setting,control by yourself
        this.isChecked = e.isChecked;
      }
    }
  };
</script>

```

More details can be found in [here](https://github.com/alibaba/weex-ui/blob/master/example/dialog/index.vue)

### API

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| title | `String` | `Y` | `-` | title (only transparent) |
| content | `String` | `N` | `-`| content |
| top | `Number` | `N` |`400` |  distance from the top of the screen |
| single | `Boolean` | `N` |`false` |  whether is single button |
| confirm-text | `String` | `N` |`确定` |  text of the primary button |
| cancel-text | `String` |`N` | `取消` |  text of the secondary button |
| main-btn-color | `String` | `N` |`#EE9900` |  color of the primary button |
| second-btn-color | `String` | `N` |`#666666` |  color of the secondary button |
| show-no-prompt | `Boolean` | `N` |`false` |  whether to show no-prompt |
| no-prompt-text | `String` | `N` |`不再提示` |  text of the no-prompt |
| is-checked | `Boolean` |`N` | `false` |  checked of the no-prompt |


### Event

```
@wxcDialogCancelBtnClicked="wxcDialogCancelBtnClicked"、
@wxcDialogConfirmBtnClicked="wxcDialogConfirmBtnClicked"、
@wxcDialogNoPromptClicked="wxcDialogNoPromptClicked"
```

### Slot
1. `<slot name="title"></slot>`
2. `<slot name="content"></slot>`

