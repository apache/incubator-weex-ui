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
<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <title title="wxc-overlay"></title>
      <category title="使用案例"></category>
      <div class="btn"
           @click="openOverlay">
        <text class="btn-txt">点击打开动画蒙层</text>
      </div>
      <div class="btn btn-margin yellow"
           @click="openNoAniOverlay">
        <text class="btn-txt">点击打开无动画蒙层</text>
      </div>
      <wxc-overlay :show="show"
                   duration="300"
                   :hasAnimation="hasAnimation"
                   :timingFunction="timingFunction"
                   @wxcOverlayBodyClicked="wxcOverlayBodyClicked"
                   opacity="0.6"></wxc-overlay>
    </scroller>
  </div>
</template>

<style scoped>
  .wxc-demo {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #FFFFFF;
  }

  .scroller {
    flex: 1;
  }

  .btn {
    width: 600px;
    height: 80px;
    margin-top: 300px;
    margin-left: 75px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background-color: rgb(92, 184, 92);
    border-color: rgb(76, 174, 76);
  }

  .yellow {
    background-color: #FDC22D;
    border-color: #FDC22D;
  }

  .btn-margin {
    margin-top: 40px;
  }

  .btn-txt {
    font-size: 32px;
    color: #ffffff;
  }
</style>

<script>
  const modal = weex.requireModule('modal');
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import { WxcOverlay } from '../../index';
  import { setTitle } from '../_mods/set-nav';

  export default {
    components: { Title, Category, WxcOverlay },
    data: () => ({
      show: false,
      hasAnimation: true,
      timingFunction: ['ease-in', 'ease-out']
    }),
    created () {
      setTitle('Overlay');
    },
    methods: {
      openOverlay () {
        this.hasAnimation = true;
        this.show = true;
      },
      openNoAniOverlay () {
        this.hasAnimation = false;
        this.show = true;
      },
      wxcOverlayBodyClicked (e) {
        modal.toast({
          'message': 'click overlay!',
          'duration': 1
        });
        this.show = false;
      }
    }
  };
</script>
