<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/07/28. -->

<template>
  <div class="tag-list">
    <wxc-tag v-for="(item,index) in demoData"
             :key="index"
             v-bind="item"></wxc-tag>
  </div>
</template>

<style scoped>
  .tag-list {
    flex-direction: row;
    justify-content: space-between;
    padding-top: 40px;
    padding-right: 24px;
    padding-left: 24px;
    padding-bottom: 60px;
  }
</style>

<script>
  import { WxcTag } from '../../index';
  import Data from './data'
  export default {
    components: { WxcTag },
    data: () => ({
      demoData:Data
    })
  }
</script>
