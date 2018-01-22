<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 16/11/02. -->
<!-- Update by Tw93 on 17/10/13. -->
<!--A index list. -->

<template>
  <div>
    <list class="index-list"
          :style="{height: height+'px'}">
      <cell>
        <slot name="head"></slot>
      </cell>
      <cell v-for="(v,i) in formatList"
            :key="i"
            :ref="'index-item-title-' + v.title">
        <text :class="['index-list-title',v.type && v.type=='group' && 'group-title']"
              :style="headerStyle"
              v-if="!onlyShowList">{{v.title}}</text>
        <div v-if="v.type && v.type === 'group' && !onlyShowList"
             :style="groupWrapStyle"
             class="group">
          <div v-for="(group,index) in v.data"
               :key="index"
               class="group-list">
            <div v-for="(item,i) in group"
                 :key="i"
                 @click="itemClicked(item)"
                 class="group-item"
                 :style="groupItemStyle"
                 :accessible="true"
                 :aria-label="`${item.name},${item.desc?item.desc:''}`">
              <image v-if="item.isLocation"
                     class="location-icon"
                     src="https://gw.alicdn.com/tfs/TB1JUiUPFXXXXXUXXXXXXXXXXXX-32-32.png"></image>
              <div>
                <text class="item-name"
                      :style="groupItemTextStyle">{{item.name}}</text>
                <text class="item-desc" v-if="item.desc"
                      :style="groupItemDescStyle">{{item.desc}}</text>
              </div>
            </div>
          </div>
        </div>
        <div v-if="v.type ==='list'">
          <div class="index-list-item"
               v-for="(item,index) in v.data"
               :key="index"
               :style="itemStyle"
               @click="itemClicked(item)"
               :accessible="true"
               :aria-label="`${item.name},${item.desc?item.desc:''}`">
            <text class="title" :style="itemTextStyle">{{item.name}}</text>
            <text class="desc" :style="itemDescStyle">{{item.desc}}</text>
          </div>
        </div>
      </cell>
      <cell class="iphone-x" v-if="isIPhoneX"></cell>
    </list>
    <div class="index-list-nav"
         :style="navStyle"
         v-if="showIndex && !onlyShowList">
      <text v-for="(item,index) in formatList"
            :key="index"
            :style="navTextStyle"
            :title="item.title"
            @click="go2Key(item.title)"
            class="list-nav-key">{{item.title}}</text>
    </div>
    <div class="index-list-pop"
         :style="popStyle"
         v-if="popKeyShow">
      <text class="list-pop-text" :style="popTextStyle">{{popKey}}</text>
    </div>
  </div>
</template>

<script>
  const dom = weex.requireModule('dom');
  import * as Format from './format';
  import Utils from '../utils';

  export default {
    props: {
      height: {
        type: [Number, String],
        default: Utils.env.getPageHeight()
      },
      normalList: {
        type: Array,
        default: () => ([])
      },
      onlyShowList: {
        type: Boolean,
        default: false
      },
      showIndex: {
        type: Boolean,
        default: true
      },
      hotListConfig: {
        type: Object,
        default: () => ({})
      },
      // 城市选择子组件 特殊情况支持
      cityLocationConfig: {
        type: Object,
        default: () => ({})
      },
      headerStyle: {
        type: Object,
        default: () => ({})
      },
      navStyle: {
        type: Object,
        default: () => ({})
      },
      navTextStyle: {
        type: Object,
        default: () => ({})
      },
      popStyle: {
        type: Object,
        default: () => ({})
      },
      popTextStyle: {
        type: Object,
        default: () => ({})
      },
      itemStyle: {
        type: Object,
        default: () => ({})
      },
      itemTextStyle: {
        type: Object,
        default: () => ({})
      },
      itemDescStyle: {
        type: Object,
        default: () => ({})
      },
      groupWrapStyle: {
        type: Object,
        default: () => ({})
      },
      groupItemStyle:{
        type: Object,
        default: () => ({})
      },
      groupItemTextStyle:{
        type: Object,
        default: () => ({})
      },
      groupItemDescStyle:{
        type: Object,
        default: () => ({})
      }
    },
    created () {
      this.isIPhoneX = Utils.env.isIPhoneX();
    },
    computed: {
      formatList () {
        const { normalList, hotListConfig, cityLocationConfig } = this;
        return Format.totalList(normalList, hotListConfig, cityLocationConfig);
      }
    },
    data: () => ({
      popKeyShow: false,
      popKey: '',
      navOffsetY: 0,
      timer: null
    }),
    methods: {
      itemClicked (item) {
        this.$emit('wxcIndexlistItemClicked', {
          item
        });
      },
      go2Key (key) {
        const keyEl = this.$refs['index-item-title-' + key][0];
        keyEl && dom.scrollToElement(keyEl, {
          offset: 0
        });
        this.popKey = key;
        this.popKeyShow = true;
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.popKeyShow = false;
        }, 600);
      }
    }
  };
</script>

<style scoped>
  .index-list {
    width: 750px;
    height: 1334px;
  }

  .index-list-title {
    border-bottom-width: 1px;
    border-bottom-color: rgba(32, 35, 37, 0.15);
    background-color: #FBFBFB;
    font-size: 24px;
    color: #666666;
    height: 48px;
    line-height: 48px;
    padding-left: 24px;
    width: 750px;
  }

  .group-title {
    border-bottom-width: 0;
    padding-bottom: 0;
    height: 60px;
    padding-top: 24px;
  }

  .index-list-item {
    width: 750px;
    flex-direction: row;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: #e0e0e0;
    height: 92px;
    padding-left: 24px;
    padding-right: 24px;
    background-color: #FFFFFF;
  }

  .iphone-x {
    height: 68px;
  }

  .title {
    font-size: 32px;
    color: #3D3D3D;
  }

  .desc {
    font-size: 24px;
    color: #A5A5A5;
    margin-left: 30px;
  }

  .index-list-nav {
    position: absolute;
    top: 0;
    right: 0;
    margin-bottom: 60px;
    margin-top: 60px;
    padding-bottom: 20px;
    padding-top: 20px;
    width: 70px;
  }

  .list-nav-key {
    text-align: center;
    font-size: 24px;
    height: 40px;
    color: #666666;
  }

  .index-list-pop {
    position: fixed;
    top: 550px;
    left: 316px;
    width: 120px;
    height: 120px;
    text-align: center;
    justify-content: center;
    background-color: rgba(32, 35, 37, .6);
    border-bottom-left-radius: 60px;
    border-bottom-right-radius: 60px;
    border-top-left-radius: 60px;
    border-top-right-radius: 60px;
    padding-left: 0;
    padding-right: 0;
    padding-top: 35px;
    padding-bottom: 35px;
    color: #ffffff;
  }

  .list-pop-text {
    font-size: 40px;
    text-align: center;
    color: #ffffff;
  }

  .group {
    padding-bottom: 18px;
    padding-right: 70px;
    background-color: #FBFBFB;
  }

  .group-list {
    flex-direction: row;
    margin-left: 18px;
    margin-top: 18px;
  }

  .group-item {
    width: 146px;
    height: 64px;
    border-width: 1px;
    border-color: #e0e0e0;
    margin-right: 18px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
  }

  .item-name {
    font-size: 24px;
    line-height: 26px;
    color: #333333;
  }

  .item-desc {
    margin-top: 2px;
    color: #999999;
    font-size: 20px;
    text-align: center;
  }

  .location-icon {
    width: 32px;
    height: 32px;
    margin-right: 8px;
  }
</style>
