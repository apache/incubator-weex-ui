<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 16/10/25. -->
<!--A top navigation bar.-->

<template>
  <div class="wxc-minibar" :style="{ backgroundColor: backgroundColor }" v-if="show">
    <div class="left" @click="leftButtonClicked" aria-label="返回" :accessible="true">
      <image :src="leftButton" class="left-button"></image>
    </div>
    <text class="middle-title" :style="{ color: textColor }">{{title}}</text>
    <div class="right" @click="rightButtonClicked">
      <text class="right-text" v-if="rightText" :style="{ color: textColor }">{{rightText}}</text>
      <image :src="rightButton" class="right-button" v-if="rightButton" :aria-hidden="true"></image>
    </div>
  </div>
</template>

<style scoped>
  .wxc-minibar {
    width: 750px;
    height: 90px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #009ff0;
  }

  .left {
    width: 90px;
  }

  .middle-title {
    font-size: 30px;
    color: #ffffff;
    height: 36px;
    line-height: 34px;
  }

  .right {
    width: 80px;
  }

  .left-button {
    width: 21px;
    height: 36px;
    margin-left: 40px;
  }

  .right-button {
    width: 32px;
    height: 32px;
    margin-right: 16px;
  }

  .right-text {
    width: 80px;
    margin-right: 20px;
    font-size: 28px;
    text-align: left;
    color: #fff;
  }
</style>

<script>
  const Navigator = weex.requireModule('navigator');
  export default {
    props: {
      backgroundColor: {
        type: String,
        default: '#FFC900'
      },
      leftButton: {
        type: String,
        default: 'https://gw.alicdn.com/tfs/TB1x18VpwMPMeJjy1XdXXasrXXa-21-36.png'
      },
      textColor: {
        type: String,
        default: '#3D3D3D'
      },
      rightButton: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: '标题'
      },
      rightText: {
        type: String,
        default: ''
      },
      useDefaultReturn: {
        type: Boolean,
        default: true
      },
      show: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      leftButtonClicked () {
        const self = this;
        if (self.useDefaultReturn) {
          Navigator.pop({}, e => {
          });
        }
        self.$emit('wxcMinibarLeftButtonClicked', {});
      },
      rightButtonClicked () {
        const self = this;
        if (self.rightText || self.rightButton) {
          self.$emit('wxcMinibarRightButtonClicked', {});
        }
      }
    }
  };
</script>
