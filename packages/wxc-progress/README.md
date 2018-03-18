# wxc-progress 

> Display the current progress of an operation flow.

### Rule
- When you need to display the completion percentage of an operation.
- You need to tell the current progress accurately, or you should use Loading


## [Demo](https://h5.m.taobao.com/trip/wxc-progress/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-progress%2Fdemo%2Findex.native-min.js)
<img src="https://img.alicdn.com/tfs/TB1RWnVSpXXXXaZXFXXXXXXXXXX-750-1334.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1pSZaSpXXXXaXXXXXXXXXXXXX-200-200.png" width="160"/>

## Code Example

```vue
<template>
  <div class="wrapper">
    <div class="demo">
      <text class="demo-text">default</text>
      <wxc-progress></wxc-progress>
    </div>
    <div class="demo">
      <text class="demo-text">set value</text>
      <wxc-progress :value=50 :bar-width=600></wxc-progress>
    </div>
    <div class="demo">
      <text class="demo-text">custom</text>
      <wxc-progress :value=70
                    bar-color='#9B7B56'
                    :bar-height=16
                    :bar-radius=16
                    :bar-width=640></wxc-progress>
    </div>
    <div class="btn" @click="uploadFile">
      <text class="btn-txt">upload files</text>
    </div>
    <div class="up-demo" v-if="progressVisible">
      <text class="progress-text left">0%</text>
      <wxc-progress :value="value" :bar-width=540></wxc-progress>
      <text class="progress-text right">{{value}}%</text>
    </div>
  </div>
</template>

<script>
  import { WxcProgress } from 'weex-ui'
  export default {
    components: { WxcProgress },
    data: () => ({
      value: 0,
      uploading: false,
      progressVisible: false,
      timer: null
    }),
    methods: {
      uploadFile () {
        if (!this.uploading) {
          this.value = 0;
          this.uploading = true;
          this.progressVisible = true;
          this.timer = setInterval(() => {
            if (this.value < 100) {
              this.value++
            } else {
              this.uploading = false;
              setTimeout(() => {
                this.progressVisible = false;
              }, 500)
              clearTimeout(this.timer);
            }
          }, 10);
        }
      }
    }
  }
</script>
```

More details can be found in [here](https://github.com/alibaba/weex-ui/blob/master/example/progress/index.vue)


### API
| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| value | `Number` |`Y`| `0` | percent `(0-100)` |
| bar-height | `Number` |`N`| `8` | progress bar height |
| bar-width | `Number` |`N`| `600` | progress bar width |
| bar-radius | `number` |`n`| `0` | progress bar radius |
