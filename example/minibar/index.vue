<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 16/10/26. -->

<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <title title="wxc-minibar"></title>
      <category title="使用案例"></category>
      <div>
        <div class="demo">
          <wxc-minibar title="Minibar"></wxc-minibar>
        </div>

        <div class="demo">
          <wxc-minibar v-on:minibarLeftButtonClick="minibarLeftButtonClick"
                       v-on:minibarRightButtonClick="minibarRightButtonClick"></wxc-minibar>
        </div>

        <div class="demo">
          <wxc-minibar title="阿里旅行购物车"
                       right-text="更多"
                       v-on:minibarLeftButtonClick="minibarLeftButtonClick"
                       v-on:minibarRightButtonClick="minibarRightButtonClick"></wxc-minibar>
        </div>
        <div class="demo">
          <wxc-minibar title="阿里旅行购物车"
                       background-color="#009ff0"
                       text-color="#FFFFFF"
                       :left-button="leftButton"
                       v-on:minibarLeftButtonClick="minibarLeftButtonClick"
                       v-on:minibarRightButtonClick="minibarRightButtonClick"
                       right-text="更多"></wxc-minibar>
        </div>
        <div class="demo">
          <wxc-minibar title="阿里旅行购物车"
                       v-on:minibarLeftButtonClick="minibarLeftButtonClick"
                       v-on:minibarRightButtonClick="minibarRightButtonClick"
                       :right-button="rightButton"></wxc-minibar>
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

  .category {
    margin-top: 70px;
  }

  .demo {
    width: 750px;
    height: 180px;
    align-items: flex-start;
    padding-top: 60px;
  }

  .text {
    margin-left: 40px;
    margin-bottom: 30px;
  }
</style>

<script>
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import { WxcMinibar } from '../../index';

  const modal = weex.requireModule('modal');
  const icon = require('./icon.base64.js');
  import { setTitle } from '../_mods/set-nav';

  module.exports = {
    components: { Title, Category, WxcMinibar },
    data: () => ({
      rightButton: icon.cartIcon,
      leftButton: icon.returnIcon
    }),
    created () {
      setTitle('Minibar')
    },
    methods: {
      minibarLeftButtonClick () {
      },
      minibarRightButtonClick () {
        modal.toast({ 'message': 'click rightButton!', 'duration': 1 });
      }
    }
  };
</script>
