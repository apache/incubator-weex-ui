<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <title title="wxc-radio"></title>
      <category title="Radio可选"></category>
      <wxc-radio :list="list"
                 @wxcRadioListChecked="wxcRadioListChecked"></wxc-radio>
      <text class="radio-text">checkedItem: {{checkedInfo}}</text>
      <category title="Radio不可选"></category>
      <wxc-radio :list="list2"></wxc-radio>
    </scroller>
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

  .radio-text {
    font-size: 30px;
    color: #333333;
    margin-top: 30px;
    margin-bottom: 30px;
    margin-left: 24px;
  }
</style>

<script>
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import { WxcRadio } from '../../index';
  import { setTitle } from '../_mods/set-nav';

  export default {
    components: { Title, Category, WxcRadio },
    data: () => ({
      list: [
        { title: '选项1', value: 1 },
        { title: '选项2', value: 2, checked: true },
        { title: '选项3', value: 3 },
        { title: '选项4', value: 4 }
      ],
      list2: [
        { title: '未选不可修改', value: 5, disabled: true },
        { title: '已选不可修改', value: 6, disabled: true, checked: true }
      ],
      config:{
        checkedIcon:'https://gw.alicdn.com/tfs/TB1TARHdf6H8KJjSspmXXb2WXXa-31-30.png',
        disabledIcon:'https://gw.alicdn.com/tfs/TB1PtN3pwMPMeJjy1XdXXasrXXa-72-72.png',
        checkedColor: '#000000'
      },
      checkedInfo: { title: '选项2', value: 2, oldIndex: -1, index: 1 }
    }),
    created () {
      setTitle('Radio');
    },
    methods: {
      wxcRadioListChecked (e) {
        this.checkedInfo = e;
      }
    }
  }
</script>
