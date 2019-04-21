<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 16/10/25. -->

<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <title title="wxc-popup"></title>
      <category title="使用案例"></category>
      <div class="btn"
           @click="openTopPopup">
        <text class="btn-txt">点击弹出顶部面板</text>
      </div>

      <div class="btn yellow  btn-margin"
           @click="openBottomPopup">
        <text class="btn-txt">点击弹出底部面板</text>
      </div>

      <div class="btn btn-margin red"
           @click="openLeftPopup">
        <text class="btn-txt">点击弹出左侧面板</text>
      </div>

      <div class="btn btn-margin blue"
           @click="openRightPopup">
        <text class="btn-txt">点击弹出右侧面板</text>
      </div>

      <div class="btn btn-margin gray"
           @click="openAutoPopup">
        <text class="btn-txt">自动设置高度</text>
      </div>

      <wxc-popup :show="isTopShow"
                 pos="top"
                 :animation="{timingFunction:'ease-out'}"
                 @wxcPopupOverlayClicked="popupOverlayTopClick">
                 <div class="demo-top"></div>
                 </wxc-popup>

      <wxc-popup :have-overlay="isTrue"
                 popup-color="rgb(92, 184, 92)"
                 :show="isBottomShow"
                 @wxcPopupOverlayClicked="popupOverlayBottomClick"
                 pos="bottom">
        <div class="demo-content">
          <image src="https://img.alicdn.com/tfs/TB1ojYvOXXXXXaOXFXXXXXXXXXX-180-41.png"
                 class="demo-image"></image>
          <text>与 Web App、HTML5 App 或 hybrid App 不同，您可以使用 Weex 构建一个真正的原生应用。更贴心的是你的代码只需使用 HTML、CSS、JavaScript 可以构建原生应用，上手非常简单。这是增加的文字，好多好多的文字，真的很多！！！</text>
        </div>
      </wxc-popup>

      <wxc-popup
          :show="isLeftShow"
          @wxcPopupOverlayClicked="popupOverlayLeftClick"
          pos="left">
              <div class="demo-left">
                <image src="https://img.alicdn.com/tfs/TB1ojYvOXXXXXaOXFXXXXXXXXXX-180-41.png"
                 class="demo-image"></image>
                <text>与 Web App、HTML5 App 或 hybrid App 不同，您可以使用 Weex 构建一个真正的原生应用。更贴心的是你的代码只需使用 HTML、CSS、JavaScript 可以构建原生应用，上手非常简单。这是增加的文字，好多好多的文字，真的很多！！！</text>
              </div>
              </wxc-popup>

      <wxc-popup
                 :show="isRightShow"
                 pos="right"
                 ref="wxcPopup"
                 @wxcPopupOverlayClicked="popupOverlayRightClick">
        <div @click="onHideClick"
             class="btn blue hide-auto">
          <text class="btn-txt">主动隐藏试试</text>
        </div>
      </wxc-popup>


      <wxc-popup :height="height"
                 :show="isAutoShow"
                 ref="popupChange"
                 pos="bottom"
                 @wxcPopupOverlayClicked="popupOverlayAutoClick">
            <div class="change">
                 <text>{{'与 Web App、HTML5 App 或 hybrid App 不同，您可以使用 Weex 构建一个真正的原生应用。更贴心的是你的代码只需使用 HTML、CSS、JavaScript 可以构建原生应用，上手非常简单。' + (change? '这是增加的文字，好多好多的文字，真的很多！！！这是增加的文字，好多好多的文字，真的很多！！！' : '')}}</text>
                </div>
                 </wxc-popup>
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

  .btn {
    width: 600px;
    height: 80px;
    margin-top: 150px;
    margin-left: 75px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background-color: rgb(92, 184, 92);
    border-color: rgb(76, 174, 76);
  }

  .hide-auto {
    width: 300px;
    margin-left: 50px;
    bottom: 2px;
  }

  .yellow {
    background-color: #ffc300;
    border-color: #ffc300;
  }

  .red {
    background-color: #C3413D;
    border-color: #C3413D;
  }

  .blue {
    background-color: #263238;
    border-color: #263238;
  }

  .gray {
    background-color: #9B7B56;
    color: #9B7B56;
  }

  .btn-txt {
    font-size: 32px;
    color: #ffffff;
  }

  .btn-margin {
    margin-top: 40px;
  }

  .demo-top{
    height: 400px;
  }

  .demo-left{
    width: 440px;
  }

  .demo-content {
    padding-right: 40px;
    padding-left: 40px;
  }

  .demo-image {
    width: 181px;
    height: 41px;
    margin-bottom: 40px;
    margin-top: 40px;
  }

  .change{
    padding: 20px;
  }

</style>

<script>
  import { WxcPopup } from '../../index';
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import { setTitle } from '../_mods/set-nav';

  export default {
    components: { Title, Category, WxcPopup },
    data: () => ({
      isBottomShow: false,
      isTopShow: false,
      isLeftShow: false,
      isRightShow: false,
      isAutoShow: false,
      isTrue: true,
      change: false
    }),
    created () {
      setTitle('Popup');
    },
    methods: {
      openBottomPopup () {
        this.isBottomShow = true;
      },
      openTopPopup () {
        this.isTopShow = true;
      },
      openLeftPopup () {
        this.isLeftShow = true;
      },
      openRightPopup () {
        this.isRightShow = true;
      },
      popupOverlayTopClick () {
        this.isTopShow = false;
      },
      popupOverlayBottomClick () {
        this.isBottomShow = false;
      },
      popupOverlayLeftClick () {
        this.isLeftShow = false;
      },
      popupOverlayRightClick () {
        this.isRightShow = false;
      },

      popupOverlayAutoClick () {
        this.isAutoShow = false;
      },

      openAutoPopup () {
        this.change = !this.change;
        this.$refs['popupChange'].changeSize();
        this.isAutoShow = true;
      },
      onHideClick () {
        this.$refs.wxcPopup.hide();
      }
    }
  };
</script>
