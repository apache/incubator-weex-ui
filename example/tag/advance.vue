<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/07/31. -->

<template>
  <div class="sub-demo">
    <wxc-cell :has-top-border="false"
              :auto-accessible="false"
              title="是否为实心">
      <switch :checked="type==='solid'"
              @change="type= type==='solid' ?'hollow' : 'solid'"></switch>
    </wxc-cell>
    <wxc-cell :has-top-border="false"
              :auto-accessible="false"
              title="标签颜色">
      <input class="input"
             placeholder="请输入标签色值"
             :value="tagColor"
             @input="tagColor=$event.value"/>
    </wxc-cell>
    <wxc-cell :has-top-border="false"
              :auto-accessible="false"
              title="文字颜色">
      <input class="input"
             placeholder="请输入文字色值"
             :value="fontColor"
             @input="fontColor=$event.value"/>
    </wxc-cell>
    <wxc-cell :has-top-border="false"
              :auto-accessible="false"
              title="标签内容">
      <input class="input"
             placeholder="请输入tag文字内容"
             :value="value"
             @input="value=$event.value"/>
    </wxc-cell>
    <div class="demo">
      <wxc-tag :type="type"
               :tag-color="tagColor"
               :font-color="fontColor"
               :value="value"></wxc-tag>
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
      type: 'solid',
      tagColor: '#ff5000',
      fontColor: '#ffffff',
      value: '实心标签'
    })
  }
</script>
