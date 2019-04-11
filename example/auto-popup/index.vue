<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <title title="wxc-auto-popup"></title>
      <category title="使用案例"></category>
      <div class="btn"
           @click="openTopPopup">
        <text class="btn-txt">点击弹出顶部面板</text>
      </div>

      <div class="btn yellow  btn-margin"
           @click="openBottomPopup">
        <text class="btn-txt">点击弹出底部面板</text>
      </div>

      <div class="btn blue  btn-margin"
           @click="openCenterPopup">
        <text class="btn-txt">点击弹出居中面板</text>

      </div>

      <wxc-auto-popup :show="isTopShow"
                 pos="top"
                 :animation="{timingFunction:'ease-out'}"
                 @hidePopup="isTopShow = false">
        <div class="demo-content">
          <image src="https://img.alicdn.com/tfs/TB1ojYvOXXXXXaOXFXXXXXXXXXX-180-41.png"
                 class="demo-image"></image>
          <text>与 Web App、HTML5 App 或 hybrid App 不同，您可以使用 Weex 构建一个真正的原生应用。更贴心的是你的代码只需使用 HTML、CSS、JavaScript 可以构建原生应用，上手非常简单。</text>
        </div>
                 </wxc-auto-popup>

      <wxc-auto-popup
                 popup-color="rgba(255,0,0,0.4)"
                 :show="isBottomShow"
                 @hidePopup="isBottomShow = false"
                 pos="bottom">
        <div class="demo-content">
          <image src="https://img.alicdn.com/tfs/TB1ojYvOXXXXXaOXFXXXXXXXXXX-180-41.png"
                 class="demo-image"></image>
          <text>与 Web App、HTML5 App 或 hybrid App 不同，您可以使用 Weex 构建一个真正的原生应用。更贴心的是你的代码只需使用 HTML、CSS、JavaScript 可以构建原生应用，上手非常简单。</text>
        </div>
      </wxc-auto-popup>

      <wxc-auto-popup :show="isCenterShow"
                 pos="center"
                 :animation="{timingFunction:'ease-out'}"
                 @hidePopup="isCenterShow = false">
        <div class="demo-content-center">
          <image src="https://img.alicdn.com/tfs/TB1ojYvOXXXXXaOXFXXXXXXXXXX-180-41.png"
                 class="demo-image"></image>
          <text>与 Web App、HTML5 App 或 hybrid App 不同，您可以使用 Weex 构建一个真正的原生应用。更贴心的是你的代码只需使用 HTML、CSS、JavaScript 可以构建原生应用，上手非常简单。</text>
        </div>
                 </wxc-auto-popup>



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
    position: absolute;
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

  .demo-content {
    padding-right: 40px;
    padding-left: 40px;
    padding-bottom: 20px;
    width: 750px;
    background-color: rgb(92, 184, 92);
  }
  .demo-content-center{
    width: 540px;
    padding: 20px;
    background-color: rgb(92, 184, 92);
  }

  .demo-image {
    width: 181px;
    height: 41px;
    margin-bottom: 40px;
    margin-top: 40px;
  }

</style>

<script>
  import { WxcAutoPopup } from '../../index';
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import { setTitle } from '../_mods/set-nav';

  export default {
    components: { Title, Category, WxcAutoPopup },
    data: () => ({
      isBottomShow: false,
      isTopShow: false,
      isLeftShow: false,
      isRightShow: false,
      isAutoShow: false,
      isCenterShow: false,
      isTrue: true,
      height: 400
    }),
    created () {
      setTitle('autoPopup');
    },
    methods: {
      openBottomPopup () {
        this.isBottomShow = true;
      },
      openTopPopup () {
        this.isTopShow = true;
      },
      openCenterPopup () {
        this.isCenterShow = true;
      }
    }
  };
</script>
