<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/07/31. -->

<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <title title="wxc-progress"></title>
      <category title="使用案例"></category>
      <div class="demo first-demo">
        <text class="demo-text">默认</text>
        <wxc-progress></wxc-progress>
      </div>
      <div class="demo">
        <text class="demo-text">设置value</text>
        <wxc-progress :value=50
                      :bar-width=600></wxc-progress>
      </div>
      <div class="demo">
        <text class="demo-text">自定义</text>
        <wxc-progress :value=70
                      bar-color='#9B7B56'
                      :bar-height=16
                      :bar-radius="16"
                      :bar-width=640></wxc-progress>
      </div>
      <div class="btn"
           @click="uploadFile">
        <text class="btn-txt">上传文件</text>
      </div>
      <div class="up-demo"
           v-if="progressVisible">
        <text class="progress-text left">0%</text>
        <wxc-progress :value="value"
                      :bar-width=540></wxc-progress>
        <text class="progress-text right">{{value}}%</text>
      </div>
    </scroller>
  </div>
</template>

<style scoped>
  .wxc-demo {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ffffff;
  }

  .scroller {
    flex: 1;
  }

  .first-demo {
    margin-top: 80px;
  }

  .demo {
    margin-bottom: 50px;
    padding-left: 75px;
  }

  .demo-text {
    margin-bottom: 20px;
  }

  .up-demo {
    flex-direction: row;
    align-items: center;
    margin-left: 32px;
  }

  .progress-text {
    color: #333333;
    font-size: 30px;
  }

  .left {
    margin-right: 20px;
  }

  .right {
    margin-left: 20px;
  }

  .btn {
    width: 600px;
    height: 80px;
    margin-top: 60px;
    margin-bottom: 50px;
    margin-left: 75px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background-color: #635147;
    border-color: #635147;
  }

  .btn-txt {
    font-size: 32px;
    color: #ffffff;
  }
</style>

<script>
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import { WxcProgress } from '../../index'
  import { setTitle } from '../_mods/set-nav';

  export default {
    components: { Title, Category, WxcProgress },
    data: () => ({
      value: 0,
      uploading: false,
      progressVisible: false,
      timer: null
    }),
    created () {
      setTitle('Progress');
    },
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
