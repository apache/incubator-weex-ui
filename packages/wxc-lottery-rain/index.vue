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
