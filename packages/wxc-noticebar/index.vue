<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 16/10/28. -->
<!--A notice bar.-->

<template>
  <div class="wxc-noticebar"
       v-if="show"
       @click="noticeBarClicked"
       :accessible="true"
       :aria-label="notice">
    <image class="type-ICON"
           v-if="typeIcon"
           :src="typeIcon"></image>
    <text class="noticebar-content"
          :style="{ width: contentWidth + 'px',lines:lines}">{{notice}}</text>
    <div class="more-click-content"
         @click="noticeIconClicked"
         v-if="modeIcon"
         :mode="mode">
      <image class="mode-ICON"
             :src="modeIcon"></image>
    </div>
  </div>
</template>

<style scoped>
  .wxc-noticebar {
    width: 750px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 24px;
    background-color: #FFF7D6;
    border-bottom-width: 1px;
    border-top-width: 1px;
    border-color: #FFEEAE;
    border-style: solid;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .noticebar-content {
    color: #EE9900;
    font-size: 26px;
    line-height: 36px;
    width: 592px;
    text-overflow: ellipsis;
  }

  .more-click-content {
    width: 64px;
    align-items: center;
    justify-content: center;
  }

  .mode-ICON,
  .type-ICON {
    width: 32px;
    height: 32px;
  }
</style>

<script>
  import ICON from './type';
  import Utils from '../utils';

  export default {
    props: {
      notice: {
        type: String,
        default: ''
      },
      noticeUrl: {
        type: String,
        default: ''
      },
      mode: {
        type: String,
        default: ''
      },
      lines: {
        type: [Number, String],
        default: 1
      },
      type: {
        type: String,
        default: ''
      },
      spm: {
        type: String,
        default: ''
      }
    },
    computed: {
      contentWidth () {
        return this.mode ? 605 : 683;
      },
      modeIcon () {
        let modeIcon;
        switch (this.mode) {
          case 'link':
            modeIcon = ICON.linkIcon;
            break;
          case 'closable':
            modeIcon = ICON.closeIcon;
            break;
          default:
            modeIcon = '';
        }
        return modeIcon;
      },
      typeIcon () {
        let typeIcon;
        switch (this.type) {
          case 'success':
            typeIcon = ICON.successIcon;
            break;
          case 'error':
            typeIcon = ICON.errorIcon;
            break;
          case 'info':
            typeIcon = ICON.infoIcon;
            break;
          case 'question':
            typeIcon = ICON.questionIcon;
            break;
          case 'warn':
            typeIcon = ICON.warnIcon;
            break;
          case 'time':
            typeIcon = ICON.timeIcon;
            break;
          case 'redbag':
            typeIcon = ICON.redbag;
            break;
          default:
            typeIcon = '';
        }
        return typeIcon;
      }
    },
    data: () => ({
      show: true
    }),
    methods: {
      noticeBarClicked () {
        const { mode, noticeUrl, spm } = this;
        if (mode === 'link' && noticeUrl) {
          const { ttid } = weex.config.env;
          Utils.goToH5Page(noticeUrl, spm, ttid, true);
          this.$emit('wxcNoticebarLinkClicked', { url: noticeUrl });
        }
      },
      noticeIconClicked () {
        const { mode } = this;
        if (mode === 'closable') {
          this.show = false;
          this.$emit('wxcNoticebarCloseClicked', {});
        } else {
          this.noticeBarClicked();
        }
      }
    }
  };
</script>
