<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/12/27. -->

<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <title title="wxc-city" class="title"></title>
      <category title="使用案例"></category>
      <div class="btn" @click="showListCity">
        <text class="btn-txt">列 城市选择</text>
      </div>

      <div class="btn btn-margin yellow" @click="showGroupCity">
        <text class="btn-txt">组 城市选择</text>
      </div>

      <div class="panel">
        <text v-if="currentCity" class="text">当前城市: {{currentCity}}</text>
      </div>
    </scroller>
    <wxc-city ref="wxcCity"
              :normal-list="normalList"
              :only-show-list="onlyShowList"
              :hot-list-config="hotListConfig"
              :city-location-config="cityLocationConfig"
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
      hotCityType: 'list',
      locationCityType: 'list',
      onlyShowList: false,
      location: '定位中'
    }),
    created () {
      this.defaultSourceData = sourceData;
    },
    mounted () {
      // 模拟定位
      setTimeout(() => {
        this.location = '杭州';
      }, 500);
    },
    computed: {
      // 城市数据
      normalList () {
        return Util.getCities(this.sourceData.cities)
      },
      hotListConfig () {
        return {
          type: this.hotCityType,
          title: '热门',
          list: Util.getCities(this.sourceData.hotCity)
        }
      },
      cityLocationConfig () {
        return {
          type: this.locationCityType,
          title: '定位',
          list: [
            { name: this.location, isLocation: true }
          ]
        }
      }
    },
    methods: {
      showListCity () {
        this.hotCityType = 'list';
        this.locationCityType = 'list';
        this.$refs['wxcCity'].show();
      },
      showGroupCity () {
        this.hotCityType = 'group';
        this.locationCityType = 'group';
        this.$refs['wxcCity'].show();
      },
      citySelect (e) {
        this.currentCity = e.item;
      },
      onInput (e) {
        const { cities } = this.defaultSourceData;
        const { value } = e;
        if (value !== '' && cities && cities.length > 0) {
          const queryData = Util.query(cities, String(value).trim());
          this.sourceData = {
            cities: queryData,
            hotCity: []
          };
          this.onlyShowList = true;
        } else {
          this.sourceData = this.defaultSourceData;
          this.onlyShowList = false;
        }
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
    margin-top: 300px;
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
