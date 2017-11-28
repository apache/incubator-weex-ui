<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 16/10/26. -->

<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <title title="wxc-minibar"></title>
      <category title="使用案例"></category>
      <div>
        <div class="demo">
          <wxc-minibar title="Minibar" background-color="#F2F3F4"></wxc-minibar>
        </div>

        <div class="demo">
          <wxc-minibar @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                       background-color="#F2F3F4"
                       @wxcMinibarRightButtonClicked="minibarRightButtonClick"></wxc-minibar>
        </div>

        <div class="demo">
          <wxc-minibar title="导航栏标题"
                       right-text="更多"
                       @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                       @wxcMinibarRightButtonClicked="minibarRightButtonClick"></wxc-minibar>
        </div>
        <div class="demo">
          <wxc-minibar title="右侧带文字的导航栏"
                       background-color="#009ff0"
                       text-color="#FFFFFF"
                       :left-button="leftButton"
                       @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                       @wxcMinibarRightButtonClicked="minibarRightButtonClick"
                       right-text="更多"></wxc-minibar>
        </div>
        <div class="demo">
          <wxc-minibar title="右侧带icon的导航栏"
                       @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                       @wxcMinibarRightButtonClicked="minibarRightButtonClick"
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

  .demo {
    width: 750px;
    height: 180px;
    align-items: flex-start;
    padding-top: 60px;
  }
</style>

<script>
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import { WxcMinibar } from '../../index';

  const modal = weex.requireModule('modal');
  import { setTitle } from '../_mods/set-nav';
  import { CART_ICON, RETURN_ICON } from './type';

  export default {
    components: { Title, Category, WxcMinibar },
    data: () => ({
      rightButton: CART_ICON,
      leftButton: RETURN_ICON
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
