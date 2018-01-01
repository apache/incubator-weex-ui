<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/07/31. -->

<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <title title="wxc-checkbox"></title>
      <category title="Checkbox"></category>
      <wxc-checkbox title="默认"></wxc-checkbox>
      <wxc-checkbox title="默认选中"
                    :checked="true"></wxc-checkbox>
      <wxc-checkbox title="未选中不可更改"
                    :disabled="true"></wxc-checkbox>
      <wxc-checkbox title="选中不可更改"
                    :disabled="true"
                    :checked="true"></wxc-checkbox>
      <div class="margin">
        <category title="CheckboxList"></category>
        <wxc-checkbox-list :list="list"
                           @wxcCheckBoxListChecked="wxcCheckBoxListChecked"></wxc-checkbox-list>
        <text class="checked-text">选中项 {{checkedList.toString()}}</text>
      </div>
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

  .margin {
    margin-top: 60px;
  }

  .checked-text {
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
  import { WxcCheckbox, WxcCheckboxList } from '../../index'
  import { setTitle } from '../_mods/set-nav';

  export default {
    components: { Title, Category, WxcCheckbox, WxcCheckboxList },
    data: () => ({
      list: [
        { title: '选项1', value: 1 },
        { title: '选项2', value: 2, checked: true },
        { title: '选项3', value: 3 },
        { title: '选项4', value: 4 }
      ],
      checkedList: [2]
    }),
    created () {
      setTitle('Checkbox');
    },
    methods: {
      wxcCheckBoxListChecked (e) {
        this.checkedList = e.checkedList;
      }
    }
  }
</script>
