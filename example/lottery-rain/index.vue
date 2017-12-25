<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/07/28. -->

<template>
  <wxc-lottery-rain :config="config"
                    :pic-list="images"
                    ref="wxc-lottery-rain"
                    :wrap-style="wrapStyle"
                    @wxcLotteryRainCaught="wxcLotteryRainCaught">
  </wxc-lottery-rain>
</template>

<style scoped>

</style>

<script>
  import { WxcLotteryRain } from '../../index'
  import { setTitle } from '../_mods/set-nav';

  export default {
    components: { WxcLotteryRain },
    data: () => ({
      images: [
        'https://gw.alicdn.com/tfs/TB1474LgwoQMeJjy1XaXXcSsFXa-241-206.png',
        'https://gw.alicdn.com/tfs/TB1Q5hQgwoQMeJjy0FnXXb8gFXa-241-206.png',
        'https://gw.alicdn.com/tfs/TB1JNd4gwoQMeJjy0FoXXcShVXa-241-206.png',
        'https://gw.alicdn.com/tfs/TB1INd4gwoQMeJjy0FoXXcShVXa-241-206.png',
        'https://gw.alicdn.com/tfs/TB1474LgwoQMeJjy1XaXXcSsFXa-241-206.png'
      ],
      config: {
        intervalTime: 450,
        hideAniTime: 300,
        showAniTime: 300,
        showTime: 450,
        randomTime: 300,
        width: 241,
        height: 206
      },
      wrapStyle: {
        backgroundColor: 'rgba(133, 11, 11, .8)'
      }
    }),
    created () {
      setTitle('LotteryRain');
    },
    methods: {
      wxcLotteryRainCaught (e) {
        // console.log(e.rainId)
      }
    }
  }
</script>
