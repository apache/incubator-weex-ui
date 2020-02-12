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
  <wxc-mask :width="width"
            :height="height"
            aria-hidden="true"
            mask-bg-color="transparent"
            overlay-opacity="0.8"
            :show="show"
            :opacity='opacity'
            :show-close="false"
            @wxcMaskSetHidden="maskOverlayClick">
    <slider auto-play="false"
            v-if="show"
            :index="index"
            :interval="interval"
            :style="{ height: height  + 'px'}">
      <div v-for="(v,index) in imageList"
           :style="{ height: height  + 'px'}"
           :key="index">
        <image resize="cover"
               :src="v.src"
               :style="{ height: height + 'px', width: width  + 'px'}"></image>
      </div>
      <indicator class="indicator"
                 v-if="showIndicator"
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
      showIndicator: {
        type: Boolean,
        default: true
      },
      imageList: Array,
      indicatorColor: {
        type: Object,
        default: () => ({
          'item-color': 'rgba(255, 195, 0, .5)',
          'item-selected-color': '#ffc300',
          'item-size': '20px'
        })
      },
      index: {
        type: [Number, String],
        default: 0
      },
      interval: {
        type: [Number, String],
        default: 3000
      },
      opacity: {
        type: [Number, String],
        default: 0.6
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
