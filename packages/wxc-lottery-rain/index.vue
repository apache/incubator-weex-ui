<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/07/28. -->

<template>
  <div class="wxc-lottery-rain" :style="wrapStyle">
    <rain-item key="i"
               :src="src"
               :rain-id="i"
               :ref="`rain-item-${i}`"
               @wxcLotteryRainCaught="wxcLotteryRainCaught"
               v-for="(src,i) in picList"></rain-item>
  </div>
</template>

<style scoped>
  .wxc-lottery-rain {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(133, 11, 11, .8);
  }
</style>

<script>
  import RainItem from './rain-item.vue';

  export default {
    components: { RainItem },
    props: {
      picList: Array,
      config: Object,
      wrapStyle: Object
    },
    methods: {
      wxcLotteryRainCaught (e) {
        this.$emit('wxcLotteryRainCaught', { rainId: e.rainId });
      },
      destroy () {
        const { picList } = this;
        const length = picList.length;
        for (let i = 0; i < length; i++) {
          this.$refs[`rain-item-${i}`][0].destroy();
        }
      }
    }
  }
</script>
