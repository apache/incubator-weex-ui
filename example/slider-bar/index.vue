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
<!-- Created by Tw93 on 16/10/28. -->

<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <title title="wxc-slider-bar"></title>
      <category title="使用案例"></category>
      <div class="wrapper">
        <div class="demo-container">
          <text class="label">单滑块水平选择条</text>
          <text class="value-text">取值：{{barValue}}</text>
          <wxc-slider-bar v-bind="sliderBarCfg1" @updateValue="updateValue"
                          @wxcSliderBarTouchEnd="wxcSliderBarTouchEnd"></wxc-slider-bar>
        </div>
        <div class="demo-container">
          <text class="label">双滑块范围水平选择条</text>
          <text class="value-text">取值范围：{{minValue}} --- {{maxValue}}</text>
          <wxc-slider-bar v-bind="sliderBarCfg2" @updateValue="updateValue" @wxcSliderBarTouchEnd="wxcSliderBarTouchEnd"></wxc-slider-bar>
        </div>
        <div class="demo-container">
          <text class="label">单滑块水平选择条禁用</text>
          <wxc-slider-bar v-bind="sliderBarCfg3"></wxc-slider-bar>
        </div>
        <div class="demo-container">
          <text class="label">双滑块水平范围选择条禁用</text>
          <wxc-slider-bar v-bind="sliderBarCfg4"></wxc-slider-bar>
        </div>
      </div>
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

  .wrapper {
    align-items: center;
    margin-top: 60px;
  }

  .label {
    color: #999999;
    font-size: 26px;
    margin-bottom: 10px;
  }

  .value-text {
    color: #999999;
    font-size: 26px;
    margin-bottom: 10px;
  }

  .demo-container {
    margin-bottom: 70px;
    width: 600px;
  }
</style>

<script>
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import { WxcSliderBar } from '../../index';
  import { setTitle } from '../_mods/set-nav';

  const modal = weex.requireModule("modal");

  export default {
    components: { Title, Category, WxcSliderBar },
    data: () => ({
      barValue: 0,
      minValue: 0,
      maxValue: 0,
      sliderBarCfg1: {
        length: 400,
        range: false,
        min: 0,
        max: 10000,
        value: 2000,
        defaultValue: 50,
        disabled: false
      },
      sliderBarCfg2: {
        length: 500,
        range: true,
        min: 0,
        max: 100,
        value: [20, 70],
        defaultValue: [30, 60],
        disabled: false
      },
      sliderBarCfg3: {
        length: 400,
        range: false,
        min: 0,
        max: 200,
        value: 50,
        defaultValue: 100,
        disabled: true
      },
      sliderBarCfg4: {
        length: 500,
        range: true,
        min: 0,
        max: 200,
        value: 20,
        defaultValue: [20, 70],
        disabled: true
      }
    }),
    created() {
      setTitle('SliderBar');
      this.barValue = this.sliderBarCfg1.value || this.sliderBarCfg1.defaultValue;
      this.minValue = this.sliderBarCfg2.value[0] || this.sliderBarCfg1.defaultValue[0];
      this.maxValue = this.sliderBarCfg2.value[1] || this.sliderBarCfg1.defaultValue[1];
    },
    methods: {
      updateValue(value) {
        if (typeof value === 'number') {
          this.barValue = value;
        } else if (value.length && value.length === 2) {
          this.minValue = value[0];
          this.maxValue = value[1];
        }
      },
      wxcSliderBarTouchEnd(value) {
        modal.toast({
          message: `end touch: ${value}`
        })
      }
    }
  }
</script>
