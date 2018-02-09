<!-- CopyRight (C) 2017-2022 WeexUI Group Holding Limited. -->
<!-- Created by git@zwwill on 18/02/08. -->
<!--A popover box with customized contents.-->

<template>
  <div>
    <!--<wxc-overlay-->
      <!--:show="show"-->
      <!--:hasAnimation="false"-->
      <!--opacity="0.1"-->
      <!--@wxcOverlayBodyClicked="wxcOverlayBodyClicked"></wxc-overlay>-->
    <div class="g-cover"
         v-if="show"
         @touchend="show = false"></div>
    <div ref="wxc-popover"
         :class="['wxc-popover', pos]"
         v-if="show">
      <div class="u-popover-arrow"></div>
      <div class="u-popover-inner">
        <div class="i-btn"
             style="border-top-color:#fff;">
          <image :src="'https://gw.alicdn.com/tfs/TB1x18VpwMPMeJjy1XdXXasrXXa-21-36.png'"
                 class="btn-icon"></image>
          <text class="btn-text">按钮文案</text>
        </div>
        <div class="i-btn">
          <image :src="icon"
                 v-if="icon"
                 class="btn-icon"></image>
          <text class="btn-text">按钮文案</text>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
  .g-cover{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.4);
  }
  .wxc-popover {
    position: fixed;
    right: 14px;
    top: 380px;
    background-color: #fff;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.21);
    border-radius: 4px;
  }
  .u-popover-arrow{
    position: absolute;
    border-radius: 2px;
    right: 15px;
    top: -6px;
    width: 30px;
    height: 30px;
    background-color: #fff;
    transform: rotate(45deg);
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.21);
  }
  .u-popover-inner{
    display: block;
    border-radius: 10px;
    background-color: #fff;
  }
  .i-btn{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-left:16px;
    margin-right:16px;
    border-top-style: solid;
    border-top-width: 1px;
    border-top-color: #ddd;
  }
  .btn-icon{
    width: 32px;
    height: 32px;
    margin-left:16px;
  }
  .btn-text{
    height: 80px;
    font-size: 30px;
    margin-left:16px;
    margin-right:16px;
    line-height: 80px;
    text-align: left;
  }
</style>

<script>
  const animation = weex.requireModule('animation');
  const { platform } = weex.config.env;
  const isWeb = typeof (window) === 'object' && platform.toLowerCase() === 'web';
//  import WxcOverlay from '../wxc-overlay';

  export default {
    components: { },
    props: {
      pos:String
    },
    data: () => ({
        show:false
    }),
    computed: {
    },
    methods: {

      wxcPopoverShow(){
        this.show = true;
      },
      wxcOverlayBodyClicked(){
        this.show = false;
      },
    }
  }
</script>
