<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/12/27. -->

<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <title title="wxc-city" class="title"></title>
      <category title="使用案例"></category>
      <div class="btn" @click="showListCityPush">
      <text class="btn-txt">列 城市选择(push)</text>
    </div>
      <div class="btn btn-margin yellow" @click="showGroupCityPush">
        <text class="btn-txt">组 城市选择(push)</text>
      </div>
      <div class="btn" @click="showListCityModel">
        <text class="btn-txt">列 城市选择(model)</text>
      </div>
      <div class="btn btn-margin yellow" @click="showGroupCityModel">
        <text class="btn-txt">组 城市选择(model)</text>
      </div>
      <div class="panel">
        <text v-if="currentCity" class="text">当前城市: {{currentCity}}</text>
      </div>
    </scroller>
    <!-- push方式演示 -->
    <wxc-city ref="wxcCityPush"
              :animationType="animationTypePush"
              :currentLocation="location"
              :cityStyleType="cityStyleType"
              :sourceData="sourceData"
              :showNavHeader="true"
              @wxcCityItemSelected="citySelect"
              @wxcCityOnInput="onInput"></wxc-city>
    <!-- model方式演示 -->
    <wxc-city ref="wxcCityModel"
              :animationType="animationTypeModel"
              :currentLocation="location"
              :cityStyleType="cityStyleType"
              :showNavHeader="true"
              @wxcCityItemSelected="citySelect"
              @wxcCityOnInput="onInput"></wxc-city>
  </div>
</template>
<script>
  import sourceData from './data';
  import * as Util from '../../packages/wxc-city/util';
  import { WxcCity } from '../../index';
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';

  export default {
    components: { WxcCity, Title, Category },
    data: () => ({
      currentCity: '',
      sourceData,
      cityStyleType: 'list',
      location: '定位中',
      animationTypePush: 'push', // 默认使用push方式，若使用push模式此参数可以不传
      animationTypeModel: 'model'
    }),
    mounted () {
      // 模拟定位
      setTimeout(() => {
        this.location = '杭州';
      }, 500);
    },
    methods: {
      showListCityPush () {
        this.cityStyleType = 'list'
        // 默认使用push方式，若使用push模式此参数可以不传
        this.animationTypePush = 'push'
        this.$refs['wxcCityPush'].show();
      },
      showGroupCityPush () {
        this.cityStyleType = 'group'
        // 默认使用push方式，若使用push模式此参数可以不传
        this.animationTypePush = 'push'
        this.$refs['wxcCityPush'].show();
      },
      showListCityModel () {
        this.cityStyleType = 'list'
        this.animationTypePush = 'model'
        this.$refs['wxcCityModel'].show();
      },
      showGroupCityModel () {
        this.cityStyleType = 'group'
        this.animationTypeModel = 'model'
        this.$refs['wxcCityModel'].show();
      },
      citySelect (e) {
        this.currentCity = e.item;
      },
      onInput (e) {
      }
    }
  };
</script>

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
    margin-left: 75px;
    margin-top:100px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background-color: rgb(92, 184, 92);
    border-color: rgb(76, 174, 76);
  }

  .text {
    font-size: 32px;
  }

  .yellow {
    background-color: #ffc300;
    border-color: #ffc300;
  }

  .btn-txt {
    font-size: 32px;
    color: #ffffff;
  }

  .btn-margin {
    margin-top: 40px;
  }

  .panel {
    height: 300px;
    align-items: center;
    margin-top: 40px;
  }
</style>
