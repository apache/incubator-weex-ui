<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 16/10/28. -->

<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <div class="wrapper">
        <title title="wxc-searchbar"></title>
        <category title="使用案例"></category>
      </div>
      <text class="value-text"
            @click="setValue">点我可设置输入框内容</text>
      <div class="demo">
        <wxc-searchbar ref="wxc-searchbar"
                       @wxcSearchbarCancelClicked="wxcSearchbarCancelClicked"
                       @wxcSearchbarInputReturned="wxcSearchbarInputReturned"
                       @wxcSearchbarInputOnInput="wxcSearchbarInputOnInput"
                       @wxcSearchbarCloseClicked="wxcSearchbarCloseClicked"
                       @wxcSearchbarInputOnFocus="wxcSearchbarInputOnFocus"
                       @wxcSearchbarInputOnBlur="wxcSearchbarInputOnBlur"></wxc-searchbar>
        <text class="value-text">{{value}}</text>

      </div>

      <text class="hint">禁用输入框</text>
      <div class="demo demo1">
        <wxc-searchbar :disabled="isDisabled"
                       placeholder="无法输入"
                       @wxcSearchbarInputDisabledClicked="wxcSearchbarInputDisabledClicked"></wxc-searchbar>
      </div>

      <text class="hint">一直显示取消按钮,同时theme="yellow"</text>
      <div class="demo demo1">
        <wxc-searchbar :always-show-cancel="showCancel"
                       theme="yellow"
                       @searchbarCancelClick="searchbarCancelClick"></wxc-searchbar>
      </div>

      <text class="hint">带有目的地模式的输入框、theme="yellow"</text>
      <div class="demo demo1">
        <wxc-searchbar class="searchbar"
                       placeholder="搜索目的地"
                       theme="yellow"
                       mod="hasDep"
                       dep-name="杭州出发"
                       @wxcSearchbarDepChooseClicked="wxcSearchbarDepChooseClicked"
                       @wxcSearchbarInputDisabledClicked="wxcSearchbarInputDisabledClicked"></wxc-searchbar>
      </div>
    </scroller>
  </div>
</template>

<style scoped>
  .wxc-demo {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #F6F9F8;
  }

  .scroller {
    flex: 1;
  }

  .wrapper {
    background-color: #FFFFFF;
  }

  .demo {
    height: 160px;
  }

  .demo1 {
    margin-top: 20px;
  }

  .value-text {
    margin: 24px;
    font-size: 30px;
    color: #333333;
  }

  .hint {
    margin-left: 24px;
    font-size: 30px;
    color: #333333;
  }
</style>

<script>
  const modal = weex.requireModule('modal');
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import { WxcSearchbar } from '../../index'
  import { setTitle } from '../_mods/set-nav';

  export default {
    components: { Title, Category, WxcSearchbar },
    data: () => ({
      value: '',
      showCancel: true,
      isDisabled: true
    }),
    created () {
      setTitle('Searchbar');
    },
    methods: {
      setValue () {
        this.$refs['wxc-searchbar'].setValue('点击了手动设置输入框内容的开关');
      },

      wxcSearchbarInputOnFocus () {
        modal.toast({ 'message': 'onfocus', 'duration': 1 });
      },
      wxcSearchbarInputOnBlur () {
        modal.toast({ 'message': 'onbulr', 'duration': 1 });
      },
      wxcSearchbarCloseClicked () {
        modal.toast({ 'message': 'close.click', 'duration': 1 });
      },
      wxcSearchbarInputOnInput (e) {
        this.value = e.value;
      },
      wxcSearchbarCancelClicked () {
        modal.toast({ 'message': 'cancel.click', 'duration': 1 });
      },
      wxcSearchbarInputDisabledClicked () {
        modal.toast({ 'message': 'input.onclick', 'duration': 1 });
      },
      wxcSearchbarDepChooseClicked () {
        modal.toast({ 'message': 'dep.choose.click', 'duration': 1 });
      }
    }
  };
</script>
