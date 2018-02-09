<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by git@zwwill on 118/02/08. -->

<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <title title="wxc-minibar"></title>
      <category title="使用案例"></category>
      <div>

        <div class="demo">
          <wxc-minibar title="点击右方拓展按钮"
                       background-color="#F2F3F4"
                       @wxcMinibarRightButtonClicked="minibarRightButtonClick"
                       right-text="..."></wxc-minibar>
          <wxc-popover ref="wxc-popover"
          ></wxc-popover>
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
  import { WxcMinibar, WxcPopover} from '../../index';

  const modal = weex.requireModule('modal');
  import { setTitle } from '../_mods/set-nav';
  import { RETURN_ICON } from './type';

  export default {
    components: { Title, Category, WxcMinibar, WxcPopover },
    data: () => ({
      leftButton: RETURN_ICON
    }),
    created () {
      setTitle('Popover')
    },
    methods: {
      minibarRightButtonClick () {
        this.$refs['wxc-popover'].wxcPopoverShow();
      }
    }
  };
</script>
