<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by git@zwwill on 118/02/08. -->

<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <title title="wxc-popover"></title>
      <category title="使用案例"></category>
      <div>

        <div class="demo">
          <wxc-minibar title="点击右方拓展按钮"
                       background-color="#F2F3F4"
                       @wxcMinibarRightButtonClicked="minibarRightButtonClick"
                       right-text="..."></wxc-minibar>
          <wxc-popover ref="wxc-popover"
                       :buttons="btns"
                       :position="popoverPosition"
                       :arrowPosition="popoverArrowPosition"
                       @wxcPopoverButtonClicked="popoverButtonClicked"
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
    padding-top: 60px;
  }
</style>

<script>
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import { WxcMinibar, WxcPopover } from '../../index';

  const modal = weex.requireModule('modal');
  import { setTitle } from '../_mods/set-nav';
  import { RETURN_ICON, SCAN_ICON, QRCODE_ICON, QUESTION_ICON } from './type';

  export default {
    components: { Title, Category, WxcMinibar, WxcPopover },
    data: () => ({
      leftButton: RETURN_ICON,
      btns: [
        {
          icon: SCAN_ICON,
          text: 'Scan',
          key: 'key-scan'
        },
        {
          icon: QRCODE_ICON,
          text: 'My Qrcode',
          key: 'key-qrcode'
        },
        {
          icon: QUESTION_ICON,
          text: 'Help',
          key: 'key-help'
        },
      ],
      popoverPosition: { x: -14, y: 380 },
      popoverArrowPosition: { pos: 'top', x: -15 }
    }),
    created () {
      setTitle('Popover')
    },
    methods: {
      minibarRightButtonClick () {
        this.$refs['wxc-popover'].wxcPopoverShow();
      },
      popoverButtonClicked (obj) {
        modal.toast({ 'message': `key:${obj.key}, index:${obj.index}`, 'duration': 1 });
      }
    }
  };
</script>
