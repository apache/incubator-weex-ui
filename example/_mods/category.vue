<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/03/31. -->

<template>
  <div class="category">
    <text class="category-text">{{title}}</text>
  </div>
</template>

<style scoped>
  .category {
    margin-top: 20px;
    padding-left: 24px;
    width: 750px;
    height: 68px;
    background-color: #FFF100;
    justify-content: center;
  }

  .category-text {
    color: #000000;
    font-weight: 600;
    font-size: 28px;
  }

</style>

<script>
  export default {
    props: {
      title: String
    }
  }
</script>
