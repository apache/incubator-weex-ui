<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/10/31. -->

<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <title title="wxc-ep-slider"></title>
      <category title="基础使用"></category>
      <div class="wrapper">
        <wxc-ep-slider :slider-id="sliderId"
                       :card-length='cardLength'
                       :card-s="cardSize"
                       :select-index="2"
                       @wxcEpSliderPullMore="pullMore"
                       @wxcEpSliderCurrentIndexSelected="wxcEpSliderCurrentIndexSelected">

          <!--自动生成demo-->
          <div v-for="(v,index) in [1,2,3,4,5]"
               :key="index"
               :slot="`card${index}_${sliderId}`"
               :class="['slider',`slider${index}`]"
               :accessible="true"
               :aria-label="`这里是第${index + 1}个滑块`">
            <text class="text">这里是第{{index + 1}}个滑块</text>
          </div>
          <div class="more-slider" slot="pull-more" :style="{left: `${cardLength * (cardSize.width + cardSize.spacing)+60}px`,marginLeft:`${(750 - cardSize.width) / 2}px`}">
            <text>加载更多</text>
          </div>
        </wxc-ep-slider>
      </div>
      <category title="Android点击滑动冲突"></category>
      <div class="wrapper">
        <wxc-ep-slider :slider-id="autoSliderId"
                       :card-length='cardLength'
                       ref="wxc-ep-slider"
                       :card-s="cardSize"
                       :auto-play="true"
                       :select-index="2"
                       @wxcEpSliderCurrentIndexSelected="wxcEpSliderCurrentIndexSelected">
          <!--自动生成demo-->
          <wxc-pan-item v-for="(v,index) in [1,2,3,4,5]"
                        :key="index"
                        :ext-id="index"
                        :class="['slider',`slider${index}`]"
                        url="https://h5.m.taobao.com/trip/weex-ui/demo/index.native-min.js"
                        @wxcPanItemPan="wxcPanItemPan"
                        @wxcPanItemClicked="wxcPanItemClicked"
                        :slot="`card${index}_${autoSliderId}`"
                        :accessible="true"
                        :aria-label="`这里是第${index + 1}个滑块`">
            <text class="text">这里是第{{index + 1}}个滑块</text>
          </wxc-pan-item>
        </wxc-ep-slider>
        <div class="btn" @click="onClick">
          <text class="btn-text">手动切换2滑块</text>
        </div>
      </div>
    </scroller>
  </div>
</template>

<style scoped>
  .wxc-demo {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ffffff;
  }

  .scroller {
    flex: 1;
  }

  .wrapper {
    padding-top: 40px;
  }

  .text {
    font-size: 32px;
    color: #333333;
  }

  .btn {
    width: 250px;
    height: 80px;
    margin-left: 250px;
    margin-bottom: 40px;
    margin-top: 40px;
    background-color: #635147;
    align-items: center;
    justify-content: center;
  }

  .btn-text {
    font-size: 30px;
    color: #ffffff;
  }

  .slider {
    width: 400px;
    height: 300px;
    background-color: #c3413d;
    align-items: center;
    justify-content: center;
  }

  .slider1 {
    background-color: #635147;
  }

  .slider2 {
    background-color: #ffc302;
  }

  .slider3 {
    background-color: #ff9090;
  }

  .slider4 {
    background-color: #546e7a;
  }
  .more-slider{
    width: 100px;
    height: 300px;
    background-color: #ffc302;
  }
</style>

<script>
  const modal = weex.requireModule('modal');

  import { WxcEpSlider, WxcPanItem, BindEnv } from '../../index';
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import { setTitle } from '../_mods/set-nav';

  export default {
    components: { Title, Category, WxcEpSlider, WxcPanItem },
    data: () => ({
      sliderId: 1,
      autoSliderId: 2,
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
//        const index = e.currentIndex;
//        console.log(index);
      },
      onClick () {
        // 手动切换到第2张
        this.$refs['wxc-ep-slider'].manualSetPage(1);
      },
      pullMore () {
        modal.toast({
          message: 'pull more',
          duration: 1
        })
      },
      wxcPanItemPan (e) {
        if (BindEnv.supportsEBForAndroid()) {
          this.$refs['wxc-ep-slider'].clearAutoPlay();
          this.$refs['wxc-ep-slider'].bindExp(e.element)
        }
      },
      wxcPanItemClicked (e) {
        modal.toast({
          message: e.extId,
          duration: 1
        })
      }
    }
  }
</script>
