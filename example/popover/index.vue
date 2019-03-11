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
        </div>

        <div class="demo demo3">
          <wxc-button text="向右弹出|无动画"
                      :btnStyle="btn3Style"
                      type="white"
                      @wxcButtonClicked="wxcButtonClicked('wxc-popover3')"></wxc-button>

          <wxc-button text="向左弹出"
                      :btnStyle="btn4Style"
                      type="white"
                      @wxcButtonClicked="wxcButtonClicked('wxc-popover4')"></wxc-button>

        </div>

        <div class="demo demo2">
          <wxc-button text="向上弹出"
                      @wxcButtonClicked="wxcButtonClicked('wxc-popover2')"></wxc-button>
        </div>

        <!-- demo 1 pop -->
        <wxc-popover ref="wxc-popover1"
                     :buttons="btns"
                     :position="popoverPosition"
                     :arrowPosition="popoverArrowPosition"
                     @wxcPopoverButtonClicked="popoverButtonClicked"
        ></wxc-popover>

        <!-- demo 2 pop -->
        <wxc-popover ref="wxc-popover2"
                     :buttons="btns2"
                     :position="popoverPosition2"
                     :arrowPosition="popoverArrowPosition2"
                     @wxcPopoverButtonClicked="popoverButtonClicked"
        ></wxc-popover>

        <!-- demo 3 pop -->
        <wxc-popover ref="wxc-popover3"
                     :buttons="btns3"
                     :position="popoverPosition3"
                     :hasAnimation="false"
                     :arrowPosition="popoverArrowPosition3"
                     @wxcPopoverButtonClicked="popoverButtonClicked"
        ></wxc-popover>

        <!-- demo 4 pop -->
        <wxc-popover ref="wxc-popover4"
                     :buttons="btns4"
                     :position="popoverPosition4"
                     :arrowPosition="popoverArrowPosition4"
                     @wxcPopoverButtonClicked="popoverButtonClicked"
        ></wxc-popover>
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
  .demo {
    width: 750px;
    padding-top: 60px;
  }

  .demo2 {
    margin-top: 50px;
    margin-left: 20px;
  }
  .demo3 {
    margin-top: 50px;
    margin-left: 20px;
  }
</style>

<script>
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import { WxcMinibar, WxcButton, WxcPopover } from '../../index';

  const modal = weex.requireModule('modal');
  import { setTitle } from '../_mods/set-nav';
  import { WEEXUI_ICON, RETURN_ICON, SCAN_ICON, QRCODE_ICON, QUESTION_ICON } from './type';

  export default {
    components: { Title, Category, WxcMinibar, WxcButton, WxcPopover },
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
        }
      ],
      popoverPosition: { x: -4, y: 360 },
      popoverArrowPosition: { pos: 'top', x: -26 },
      btns2: [

        {
          text: 'Popover Select 1',
          key: 's1'
        },
        {
          text: 'Popover Select 2',
          key: 's2'
        },
        {
          text: 'Popover Select 3',
          key: 's3'
        }
      ],
      popoverPosition2: { x: 200, y: 520 },
      popoverArrowPosition2: { pos: 'bottom', x: 160 },
      btns3: [
        { icon: WEEXUI_ICON, text: 'Item 1', key: 's1' },
        { icon: WEEXUI_ICON, text: 'Item 2', key: 's2' },
        { icon: WEEXUI_ICON, text: 'Item 3', key: 's3' }
      ],
      popoverPosition3: { x: 325, y: 550 },
      popoverArrowPosition3: { pos: 'left', y: 0 },
      btns4: [
        { icon: WEEXUI_ICON, text: 'Item 1', key: 's1' },
        { icon: WEEXUI_ICON, text: 'Item 2', key: 's2' },
        { icon: WEEXUI_ICON, text: 'Item 3', key: 's3' }
      ],
      popoverPosition4: { x: 175, y: 380 },
      popoverArrowPosition4: { pos: 'right', y: -50 },
      btn3Style: {
        height: '200px',
        width: '300px'
      },
      btn4Style: {
        position: 'absolute',
        right: '40px',
        top: '60px',
        height: '200px',
        width: '300px'
      }
    }),
    created () {
      setTitle('Popover')
    },
    methods: {
      minibarRightButtonClick () {
        this.$refs['wxc-popover1'].wxcPopoverShow();
      },
      popoverButtonClicked (obj) {
        modal.toast({ 'message': `key:${obj.key}, index:${obj.index}`, 'duration': 1 });
      },
      wxcButtonClicked (ref = 'wxc-popover2') {
        this.$refs[ref].wxcPopoverShow();
      }
    }
  };
</script>
