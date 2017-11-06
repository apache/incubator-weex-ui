<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 16/11/07. -->
<!--A dialog. -->

<template>
  <mask class="mask"
        v-if="show"
        :style="{backgroundColor: maskBgColor,height:pageHeight+'px'}">
    <div class="dialog-box">
      <div class="dialog-content">
        <slot name="title">
          <text class="content-title">{{title}}</text>
        </slot>
        <slot name="content">
          <text class="content-subtext">{{content}}</text>
        </slot>
        <div class="no-prompt"
             v-if="showNoPrompt"
             @click="noPromptClicked">
          <image :src="noPromptIcon"
                 class="no-prompt-icon"></image>
          <text class="no-prompt-text">{{noPromptText}}</text>
        </div>
      </div>
      <div class="dialog-footer">
        <div class="footer-btn cancel"
             v-if="!single"
             @click="secondaryClicked">
          <text class="btn-text"
                :style="{ color: secondBtnColor }">{{cancelText}}</text>
        </div>
        <div class="footer-btn confirm"
             @click="primaryClicked">
          <text class="btn-text"
                :style="{ color: mainBtnColor }">{{confirmText}}</text>
        </div>
      </div>
    </div>
  </mask>
</template>

<style scoped>
  .mask {
    width: 750px;
    height: 1344px;
    justify-content: center;
    align-items: center;
  }

  .dialog-box {
    background-color: #FFFFFF;
    width: 558px;
  }

  .dialog-content {
    padding-top: 36px;
    padding-bottom: 36px;
    padding-left: 36px;
    padding-right: 36px;
  }

  .content-title {
    color: #333333;
    font-size: 36px;
    text-align: center;
    margin-bottom: 24px;
  }

  .content-subtext {
    color: #666666;
    font-size: 26px;
    line-height: 36px;
    text-align: center;
  }

  .dialog-footer {
    flex-direction: row;
    align-items: center;
    border-top-color: #F3F3F3;
    border-top-width: 1px;
    /*H5处理兼容*/
    border-top: 1px solid #F3F3F3;
  }

  .footer-btn {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 90px;
  }

  .cancel {
    border-right-color: #F3F3F3;
    border-right-width: 1px;
    /*H5处理兼容*/
    border-right: 1px solid #F3F3F3;
  }

  .btn-text {
    font-size: 36px;
    color: #666666;
  }

  .no-prompt {
    width: 486px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin-top: 24px;
  }

  .no-prompt-icon {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }

  .no-prompt-text {
    font-size: 24px;
    color: #A5A5A5;
  }
</style>

<script>
  import { CHECKED, UN_CHECKED } from './type';

  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      single: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      confirmText: {
        type: String,
        default: '确定'
      },
      mainBtnColor: {
        type: String,
        default: '#EE9900'
      },
      secondBtnColor: {
        type: String,
        default: '#666666'
      },
      showNoPrompt: {
        type: Boolean,
        default: false
      },
      noPromptText: {
        type: String,
        default: '不再提示'
      },
      isChecked: {
        type: Boolean,
        default: false
      },
      maskBgColor: {
        type: String,
        default: 'rgba(0,0,0,0.6)'
      }
    },
    data: () => ({
      noPromptIcon: UN_CHECKED,
      pageHeight: 1334
    }),
    created () {
      const { env: { deviceHeight, deviceWidth } } = weex.config;
      this.pageHeight = deviceHeight / deviceWidth * 750;
    },
    methods: {
      secondaryClicked () {
        this.$emit('wxcDialogCancelBtnClicked', {
          type: 'cancel'
        });
      },
      primaryClicked (e) {
        this.$emit('wxcDialogConfirmBtnClicked', {
          type: 'confirm'
        });
      },
      noPromptClicked (e) {
        const isChecked = !this.isChecked;
        this.noPromptIcon = isChecked ? CHECKED : UN_CHECKED;
        this.$emit('wxcDialogNoPromptClicked', { isChecked });
      }
    }
  };
</script>
