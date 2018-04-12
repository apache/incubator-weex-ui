<template>
  <WxcFullPage ref="wxc-tab-page"
                :tab-titles="tabTitles"
                :tab-styles="tabStyles"
                title-type="text"
                :tab-page-height="tabPageHeight"
                v-on:wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected">
    <div class="page-content"
         :style="{ height: (tabPageHeight) + 'px' }"
         v-for="(v,index) in tabList"
         :key="index">
      <div class="content-top" :style="{backgroundColor:bgColors[index]}"></div>
      <list class="item-container"
            :style="{ height: (tabPageHeight-160) + 'px' }">
        <cell v-for="(num,key) in v"
              class="cell"
              :key="key">
          <wxc-pan-item url="https://h5.m.taobao.com/trip/ticket/detail/index.html?scenicId=2675"
                      @wxcPanItemPan="wxcPanItemPan">
          <wxc-item image="https://gw.alicdn.com/i1/2935198750/TB26GMgeOC9MuFjSZFoXXbUzFXa_!!2935198750.jpg"
                    :image-text="tabTitles[index].title"
                    title="卡片测试｜四川成都出发到九寨沟牟尼沟 温泉3天2晚纯玩跟团旅游"
                    :desc="desc"
                    :tags="tags"
                    price="666"
                    price-desc="月售58笔｜999+条评论"/>
        </wxc-pan-item>
        </cell>
      </list>
    </div>
  </WxcFullPage>
</template>

<style scoped>
  .item-container {
    width: 750px;
    align-items: center;
    justify-content: center;
    height: 1334px;
    background-color: #f2f3f4;
  }

  .cell {
    background-color: #ffffff;
  }

  .content-top {
    width: 750px;
    height: 160px;
    background-color: #FFB706;
  }

  .page-content {
    width: 750px;
  }
</style>
<script>
  const dom = weex.requireModule('dom');

  import { WxcFullPage, Utils,WxcPanItem, BindEnv } from '../../../index';
  import WxcItem from '../wxc-item.vue';
  const config = require('./config');
  import { setTitle } from '../../_mods/set-nav';

  module.exports = {
    components: { WxcFullPage,WxcPanItem, WxcItem },
    data: () => ({
      tabTitles: config.tabTitles,
      tabStyles: config.tabStyles,
      tabList: [],
      bgColors:['#263238','#635147','#FF7703','#9B7B56','#3B4950','#635147'],
      demoList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
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
        if (BindEnv.supportsEBForAndroid()) {
          this.$refs['wxc-tab-page'].bindExp(e.element);
        }
      }
    }
  };
</script>
