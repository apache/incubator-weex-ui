<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/07/28. -->

<template>
  <image class="wxc-image"
         :src="iconSrc"
         :aria-hidden="true"
         @load="onLoad"
         :style="{ width: computedStyle.width, height: computedStyle.height }">
  </image>
</template>

<style scoped>
  .wxc-image {
    width: 90px;
    height: 24px;
    margin-right: 6px;
  }
</style>

<script>
  export default {
    props: {
      iconSrc: String,
      iconStyle: {
        type: Object,
        default: () => ({
          height: 24
        })
      }
    },
    data: () => ({
      width: 90
    }),
    computed: {
      computedStyle () {
        const { width, iconStyle } = this;
        if (iconStyle && iconStyle.width && iconStyle.height) {
          return {
            width: `${iconStyle.width}px`,
            height: `${iconStyle.height}px`
          }
        } else {
          return {
            width: `${width}px`,
            height: `${iconStyle.height}px`
          }
        }
      }
    },
    methods: {
      onLoad (e) {
        if (e.success && e.size && e.size.naturalWidth > 0) {
          const width = e.size.naturalWidth;
          const height = e.size.naturalHeight;
          this.width = width * (this.iconStyle.height / height);
        }
      }
    }
  };
</script>
