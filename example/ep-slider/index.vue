<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<template>
  <div class="wxc-demo">
    <title title="wxc-ep-slider"></title>
    <category title="基础使用"></category>
    <div class="wrapper">

      <wxc-ep-slider :slider-id="sliderId"
                     :card-length='cardLength'
                     :card-s="cardSize"
                     :select-index="2"
                     @wxcEpSliderCurrentIndexSelected="wxcEpSliderCurrentIndexSelected">

        <!--自动生成demo-->
        <div v-for="(v,index) in [1,2,3,4,5]"
             :key="index"
             :slot="`card${index}_${sliderId}`"
             :class="['slider',`slider${index}`]">
          <text>这里是第{{index + 1}}个滑块</text>
        </div>
      </wxc-ep-slider>
    </div>
  </div>
</template>

<style scoped>
  .wxc-demo {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
  }

  .wrapper {
    padding-top: 100px;
  }

  .slider {
    width: 400px;
    height: 300px;
    background-color: #C3413D;
    align-items: center;
    justify-content: center;
  }

  .slider1 {
    background-color: #635147;
  }

  .slider2 {
    background-color: #FFC302;
  }

  .slider3 {
    background-color: #FF9090;
  }

  .slider4 {
    background-color: #546E7A;
  }
</style>

<script>
  import { WxcEpSlider } from '../../index';
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import { setTitle } from '../_mods/set-nav';

  export default {
    components: { Title, Category, WxcEpSlider },
    data: () => ({
      sliderId: 1,
      cardLength: 5,
      cardSize: {
        width: 400,
        height: 300,
        spacing: 0,
        scale: 0.8
      }
    }),
    created () {
      setTitle('EpSlider');
    },
    methods: {
      wxcEpSliderCurrentIndexSelected (e) {
        const index = e.currentIndex;
        console.log(index);
      }
    }
  }
</script>
