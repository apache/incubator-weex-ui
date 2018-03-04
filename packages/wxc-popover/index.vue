<!-- CopyRight (C) 2017-2022 WeexUI Group Holding Limited. -->
<!-- Created by git@zwwill on 18/02/08. -->
<!--A popover box with customized contents.-->

<template>
  <div>
    <div class="g-cover"
        v-if="show"
        @touchend="show = false"
        :style="coverStyle"></div>
    <div ref="wxc-popover"
         class="g-popover"
         v-if="show && buttons"
         :style="contentStyle">
      <div class="u-popover-arrow" :style="arrowStyle"></div>
      <div class="u-popover-inner">
        <div :class="['i-btn',i==buttons.length-1?'i-btn-noborder':'']"
             v-for="(item,i) in buttons"
             :key="i"
             @click="wxcButtonClicked(i,item.key)">
          <image :src="item.icon"
                 v-if="item.icon"
                 class="btn-icon"></image>
          <text class="btn-text">{{item.text}}</text>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const animation = weex.requireModule('animation');
const { platform } = weex.config.env;
const isWeb = typeof window === 'object' && platform.toLowerCase() === 'web';

export default {
  props: {
    buttons: Array,
    position: Object,
    arrowPosition: Object,
    coverColor: String
  },
  data: () => ({
    show: false
  }),
  computed: {
    coverStyle() {
      return this.coverColor ? { backgroundColor: this.coverColor } : '';
    },
    contentStyle() {
      let { x = 0, y = 0 } = this.position,
        style = {};
      x < 0 ? (style.right = `${-x}px`) : (style.left = `${x}px`);
      y < 0 ? (style.bottom = `${-y}px`) : (style.top = `${y}px`);
      return style;
    },
    arrowStyle() {
      let { pos = 'top', x = 0, y = 0 } = this.arrowPosition,
        style = {};
      switch (pos) {
        case 'top':
          style.top = '6px';
        case 'bottom':
          !style.top && (style.bottom = '6px');
          style.transform = 'scaleX(0.8) rotate(45deg)';
          if(x>=0 && x<22){
            x = 22;
          }else if(x<0 && x>-22){
            x =-22;
          }
          x < 0 ? (style.right = `${-x}px`) : (style.left = `${x}px`);
          break;
        case 'left':
          style.left = '6px';
        case 'right':
          !style.left && (style.right = '6px');
          style.transform = 'scaleY(0.8) rotate(45deg)';
          if(y>=0 && y<22){
            y = 22;
          }else if(y<0 && y>-22){
            y =-22;
          }
          y < 0 ? (style.bottom = `${-y}px`) : (style.top = `${y}px`);
          break;
        default:
          break;
      }
      return style;
    }
  },
  methods: {
    wxcPopoverShow() {
      this.show = true;
    },
    wxcOverlayBodyClicked() {
      this.show = false;
    },
    wxcButtonClicked(index, key) {
      this.$emit('wxcPopoverButtonClicked', { key, index });
      this.show = false;
    }
  }
};
</script>

<style scoped>
.g-cover {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
}
.g-popover {
  position: fixed;
  padding:15px;
}
.u-popover-arrow {
  position: absolute;
  border-radius: 4px;
  width: 30px;
  height: 30px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.21);
}
.u-popover-inner {
  display: block;
  border-radius: 10px;
  background-color: #fff;
}
.i-btn {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
}
.i-btn-noborder {
  border-bottom-color: #fff;
}
.btn-icon {
  width: 32px;
  height: 32px;
  margin-right: 16px;
}
.btn-text {
  flex: 1;
  height: 80px;
  font-size: 30px;
  line-height: 80px;
  text-align: left;
}
.text-align-center {
  text-align: center;
}
</style>
