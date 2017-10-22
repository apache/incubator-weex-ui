<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 16/10/26. -->
<!--A loading indicator. Custom text supported. -->
<!-- just hack for babel-plugin-component !!! -->

<template>
  <div>
    <image :src="PART"
           v-if="show"
           :style="loadingStyle"
           resize="contain"
           quality="original"></image>
  </div>
</template>

<script>
  import { PART } from '../wxc-loading/type';

  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      width: {
        type: [Number, String],
        default: 36
      },
      height: {
        type: [Number, String],
        default: 36
      }
    },
    data: () => ({
      PART
    }),
    computed: {
      loadingStyle () {
        const { height, width } = this;
        return {
          height: `${height}px`,
          width: `${width}px`
        }
      }
    }
  };
</script>
