<!--
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
-->
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
