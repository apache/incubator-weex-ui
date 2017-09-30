<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<template>
  <wxc-tab-page ref="wxc-tab-page"
                :tab-titles="tabTitles"
                :tab-styles="tabStyles"
                title-type="icon"
                :needSlider="needSlider"
                :is-tab-view="isTabView"
                :tab-page-height="tabPageHeight"
                :spm-c="4307989"
                v-on:wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected">
    <list v-for="(v,index) in tabList"
          :key="index"
          class="item-container"
          :style="{ height: (tabPageHeight - tabStyles.height) + 'px' }">
      <cell class="border-cell"></cell>
      <cell v-for="(demo,key) in v"
            class="cell"
            :key="key">
        <wxc-item url="//h5.m.taobao.com/trip/ticket/detail/index.html?scenicId=2675"
                  image="//gtd.alicdn.com/imgextra/TB12yGaNVXXXXX7aXXXSutbFXXX.jpg"
                  :image-text="tabTitles[index].title"
                  title-line-count="2"
                  desc-line-count="1"
                  title="飞猪专线｜四川成都出发到九寨沟牟尼沟 温泉3天2晚纯玩跟团旅游"
                  :desc="desc"
                  :tags="tags"
                  price="219"
                  :support-slide="supportSlide"
                  price-desc="月售58笔｜999+条评论"
                  :ext-id="'1-' + (demo) + '-' + (key)"
                  :ext-index="key"
                  :ext-total="demoList.length"
                  v-on:wxcItemGoodPan="wxcItemGoodPan"></wxc-item>
      </cell>
    </list>
  </wxc-tab-page>
</template>

<style scoped>
  .item-container {
    width: 750px;
    align-items: center;
    justify-content: center;
    height: 1334px;
    background-color: #f2f3f4;
  }

  .border-cell {
    background-color: #f2f3f4;
    width: 750px;
    height: 24px;
    align-items: center;
    justify-content: center;
    border-bottom-width: 1px;
    border-style: solid;
    border-color: #e0e0e0;
  }

  .cell {
    background-color: #ffffff;
  }
</style>
<script>
  const dom = weex.requireModule('dom');

  import { WxcTabPage } from '../../index';
  import WxcItem from './wxc-item.vue';

  const config = require('./config');
  const Utils = require('./utils');
  import { setTitle } from '../_mods/set-nav';

  module.exports = {
    components: { WxcTabPage, WxcItem },
    data: () => ({
      tabTitles: config.tabTitles,
      tabStyles: config.tabStyles,
      tabList: [],
      needSlider: true,
      demoList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      supportSlide: true,
      isTabView: true,
      tabPageHeight: 1334,
      ref: 'viewport',
      desc: [{
        type: 'text',
        value: '特价机票|班期:清明 3/27-4/2等',
        theme: 'gray'
      }],
      tags: [{
        type: 'tag',
        value: '满100减20测试',
        theme: 'yellow'
      }]
    }),
    created () {
      setTitle('TabPage')
      this.tabPageHeight = Utils.env.getPageHeight();
      this.tabList = [...Array(this.tabTitles.length).keys()].map(i => []);
      Vue.set(this.tabList, 0, this.demoList);
    },
    mounted () {
      // 适配plus高度问题
      dom.getComponentRect && dom.getComponentRect(this.ref, option => {
        if (option && option.result && option.size && option.size.height) {
          this.tabPageHeight = option.size.height;
        }
      });
    },
    methods: {
      wxcTabPageCurrentTabSelected (e) {
        const self = this;
        const index = e.page;
        /* 未加载tab模拟数据请求 */
        if (!Utils.isNonEmptyArray(self.tabList[index])) {
          setTimeout(() => {
            Vue.set(self.tabList, index, self.demoList);
          }, 100);
        }
      },
      wxcItemGoodPan (e) {
        if (Utils.env.supportsEBForAndroid()) {
          this.$refs['wxc-tab-page'].bindExp(e.element);
        }
      }
    }
  };
</script>
