<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/07/31. -->

<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <title title="wxc-tag"></title>
      <category title="默认使用"></category>
      <regular></regular>
      <category title="文字标签配置"></category>
      <advance></advance>
      <category title="特殊标签配置"></category>
      <special-advance></special-advance>
      <category title="图片标签配置"></category>
      <image-advance></image-advance>
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


</style>

<script>
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import Regular from './regular.vue';
  import Advance from './advance.vue';
  import ImageAdvance from './image-advance.vue';
  import SpecialAdvance from './special-advance.vue';
  import { setTitle } from '../_mods/set-nav';

  export default {
    components: { Title, Category, Regular, Advance, ImageAdvance, SpecialAdvance },
    created () {
      setTitle('Tag');
    }
  }
</script>
