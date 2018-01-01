<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 16/10/26. -->

<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <title title="wxc-dialog"></title>
      <category title="Dialog配置"></category>
      <wxc-cell :has-top-border="false" title="标题文案">
        <input class="input"
               slot="value"
               placeholder="请输入标题"
               :value="title"
               @input="title=$event.value"/>
      </wxc-cell>
      <wxc-cell :has-top-border="false" title="说明文案">
        <input class="input"
               slot="value"
               placeholder="请输入说明内容"
               :value="content"
               @input="content=$event.value"/>
      </wxc-cell>
      <wxc-cell :has-top-border="false" title="主按钮">
        <input class="input"
               slot="value"
               placeholder="确定按钮文案"
               :value="confirmText"
               @input="confirmText=$event.value"/>
      </wxc-cell>
      <wxc-cell :has-top-border="false" title="副按钮">
        <input class="input"
               slot="value"
               placeholder="取消按钮文案"
               :value="cancelText"
               @input="cancelText=$event.value"/>
      </wxc-cell>
      <wxc-cell :has-top-border="false"
                :auto-accessible="false"
                title="取消按钮">
        <switch :checked="!single"
                slot="value"
                @change="single= !single"></switch>
      </wxc-cell>
      <wxc-cell :has-top-border="false"
                :auto-accessible="false"
                title="显示不再提示">
        <switch :checked="showNoPrompt"
                slot="value"
                @change="showNoPrompt= !showNoPrompt"></switch>
      </wxc-cell>
      <wxc-cell :has-top-border="false"
                :auto-accessible="false"
                title="不再提示是否勾选">
        <switch :checked="isChecked"
                slot="value"
                @change="isChecked= !isChecked"></switch>
      </wxc-cell>
      <wxc-cell :has-top-border="false"
                :auto-accessible="false"
                title="不再提示文案">
        <input class="input"
               slot="value"
               placeholder="取消按钮文案"
               :value="noPromptText"
               @input="noPromptText=$event.value"/>
      </wxc-cell>
      <div class="btn" @click="openDialog">
        <text class="btn-txt">打开Dialog试一试</text>
      </div>
    </scroller>
    <wxc-dialog :title="title"
                :content="content"
                :confirm-text="confirmText"
                :cancel-text="cancelText"
                :show="show"
                :single="single"
                :is-checked="isChecked"
                :no-prompt-text="noPromptText"
                :show-no-prompt="showNoPrompt"
                @wxcDialogCancelBtnClicked="dialogCancelBtnClick"
                @wxcDialogConfirmBtnClicked="dialogConfirmBtnClick"
                @wxcDialogNoPromptClicked="dialogNoPromptClick"></wxc-dialog>
  </div>
</template>

<style scoped>
  .wxc-demo {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #ffffff;
  }

  .scroller {
    flex: 1;
  }

  .input {
    width: 500px;
    height: 80px;
    line-height: 80px;
    text-align: right;
  }

  .btn {
    width: 600px;
    height: 80px;
    margin-top: 40px;
    margin-left: 75px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background-color: #ffc300;
    border-color: #ffc300;
  }

  .btn-txt {
    font-size: 32px;
    color: #ffffff;
  }
</style>

<script>

  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import { WxcDialog, WxcCell } from '../../index';

  const modal = weex.requireModule('modal');
  import { setTitle } from '../_mods/set-nav';

  export default {
    components: { Title, Category, WxcDialog, WxcCell },
    data: function () {
      return {
        title: '标题',
        content: '用户需要阅读的内容，这是用户需要阅读的内容。',
        confirmText: '确定',
        cancelText: '取消',
        noPromptText: '不再提示',
        show: false,
        single: false,
        showNoPrompt: false,
        isChecked: false
      };
    },
    created () {
      setTitle('Dialog');
    },
    methods: {
      openDialog () {
        const self = this;
        self.show = true;
      },
      dialogCancelBtnClick () {
        this.show = false;
        modal.toast({ 'message': '取消回调', 'duration': 1 });
      },
      dialogConfirmBtnClick () {
        this.show = false;
        modal.toast({ 'message': '确认回调', 'duration': 1 });
      },
      dialogNoPromptClick (e) {
        this.isChecked = e.isChecked;
        modal.toast({ 'message': `noPrompt isChecked: ${e.isChecked}`, 'duration': 1 });
      }
    }
  };
</script>
