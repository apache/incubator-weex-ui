<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/07/31. -->

<template>
  <div class="sub-demo">
    <wxc-cell :has-top-border="false" title="标签内容">
      <input class="input"
             placeholder="请输入tag图片链接"
             :value="img"
             @input="img=$event.value"/>
    </wxc-cell>
    <div class="demo">
      <wxc-tag type="image" :img="img"></wxc-tag>
    </div>
  </div>
</template>

<style scoped>
  .input {
    width: 300px;
    text-align: right;
  }

  .demo {
    align-items: center;
    justify-content: center;
    height: 100px;
    margin-bottom: 20px;
  }
</style>

<script>
  import { WxcTag, WxcCell } from '../../index';

  export default {
    components: { WxcTag, WxcCell },
    data: () => ({
      img: '//gtms04.alicdn.com/tfs/TB1ZfodRVXXXXciXFXXXXXXXXXX-92-24.png'
    })
  }
</script>
