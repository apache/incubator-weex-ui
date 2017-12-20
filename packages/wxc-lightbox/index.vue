<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/07/28. -->

<template>
  <wxc-mask :width="width"
            :height="height"
            aria-hidden="true"
            mask-bg-color="transparent"
            overlay-opacity="0.8"
            :show="show"
            :show-close="false"
            @wxcMaskSetHidden="maskOverlayClick">
    <slider auto-play="false"
            v-if="show"
            :style="{ height: height  + 'px'}">
      <div v-for="(v,index) in imageList"
           :style="{ height: height  + 'px'}"
           :key="index">
        <image resize="cover"
               :src="v.src"
               :style="{ height: height + 'px', width: width  + 'px'}"></image>
      </div>
      <indicator class="indicator"
                 :style="indicatorStyle"></indicator>
    </slider>
  </wxc-mask>
</template>

<style scoped>
  .indicator {
    position: absolute;
    item-color: rgba(255, 195, 0, .5);
    item-selected-color: #ffc300;
    item-size: 20px;
    height: 20px;
    bottom: 24px;
  }
</style>

<script>
  import WxcMask from '../wxc-mask';

  export default {
    components: {
      WxcMask
    },
    props: {
      width: {
        type: [Number, String],
        default: 750
      },
      height: {
        type: [Number, String],
        default: 750
      },
      show: {
        type: Boolean,
        default: false
      },
      imageList: Array,
      indicatorColor: {
        type: Object,
        default: () => ({
          'item-color': 'rgba(255, 195, 0, .5)',
          'item-selected-color': '#ffc300',
          'item-size': '20px'
        })
      }
    },
    computed: {
      indicatorStyle () {
        return {
          width: this.width + 'px',
          ...this.indicatorColor
        }
      }
    },
    methods: {
      maskOverlayClick () {
        this.$emit('wxcLightboxOverlayClicked', {});
      }
    }
  };
</script>
