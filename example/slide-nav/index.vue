<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/03/31. -->

<template>
  <div class="wrapper">
    <list
      ref="scroller"
      class="list"
      :style="customStyle"
      @scroll="onScroll"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
      @touchstart.native="onTouchStart"
      @touchmove.native="onTouchMove"
      @touchend.native="onTouchEnd"
      @touchcancel.native="onTouchEnd">
      <cell>
        <div class="padding"></div>
      </cell>
      <cell
        class="cell"
        v-for="(item, index) in items"
        :key="index"
        :accessible="true"
        :aria-label="index + 1">
        <a class="div" href="https://h5.m.taobao.com/trip/home/index.html">
          <text class="text">{{index + 1}}</text>
        </a>
      </cell>
    </list>

    <wxc-slide-nav class="nav nav-top" ref="topNav" position="top">
      <div class="nav-cell"><text>前一天</text></div>
      <div class="nav-cell"><text>06-22</text></div>
      <div class="nav-cell"><text>后一天</text></div>
    </wxc-slide-nav>

    <wxc-slide-nav class="nav nav-bottom" ref="bottomNav" position="bottom">
      <div class="nav-cell"><text class="nav-text">筛选</text></div>
      <div class="nav-cell"><text class="nav-text">时间</text></div>
      <div class="nav-cell"><text class="nav-text">从低到高</text></div>
    </wxc-slide-nav>
  </div>
</template>

<style scoped>
  .list {
    flex: 1;
    background-color: #f6f6f6;
  }

  .cell {

  }

  .padding {
    width: 750px;
    height: 80px;
  }

  .div {
    margin-top: 10px;
    height: 120px;
    background-color: #ffffff;
    align-items: center;
    justify-content: center;
  }

  .text {
    font-size: 50px;
  }

  .nav {
    position: fixed;
    width: 750px;
    left: 0;
    flex-direction: row;
    align-items: center;
  }

  .nav-top {
    top: 0;
  }

  .nav-bottom {
    bottom: 0;
  }

  .nav-cell {
    flex: 1;
    height: 80px;
    background-color: #ffc300;
    align-items: center;
    justify-content: center;
  }

  .nav-text {
    font-size: 32px;
  }
</style>

<script>
  import { WxcSlideNav } from '../../index';
  import { setTitle } from '../_mods/set-nav';

  let isWeb = typeof window === 'object' && weex.config.env.platform.toLowerCase() === 'web';


  export default {
    data () {
      return {
        items: new Array(50),
        customStyle: isWeb ? {
          height: weex.config.env.deviceHeight / weex.config.env.deviceWidth * 750 + 'px'
        } : {}
      }
    },
    components: { WxcSlideNav },
    created () {
      setTitle('SlideNav');
    },

    methods: {
      onTouchStart: WxcSlideNav.handleTouchStart,
      onTouchEnd: WxcSlideNav.handleTouchEnd,
      onTouchMove (e) {
        WxcSlideNav.handleTouchMove.call(this, e, this.$refs.bottomNav);
      },
      onScroll (e) {
        // console.log(e);
        WxcSlideNav.handleScroll.call(this, e, this.$refs.scroller, this.$refs.topNav, this.$refs.bottomNav);
      }
    }
  }
</script>
