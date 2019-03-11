<!-- CopyRight (C) 2017-2022 WeexUI Group Holding Limited. -->
<!-- Created by git@zwwill on 18/02/08. -->
<!--A popover box with customized contents.-->

<template>
  <div class="wrapper">
    <div class="g-cover"
         ref="wxc-cover"
         v-if="show"
         @click="hideAction"
         :style="coverStyle"></div>
    <div ref="wxc-popover"
         class="g-popover"
         v-if="show && buttons.length"
         :style="contentStyle">
      <div class="u-popover-arrow" :style="arrowStyle"></div>
      <div class="u-popover-inner">
        <div :class="['i-btn',i === buttons.length-1 ? 'i-btn-noborder' : '']"
             v-for="(item,i) in buttons"
             :key="i"
             @click="wxcButtonClicked(i,item.key)">
          <image :src="item.icon"
                 v-if="item.icon"
                 class="btn-icon"></image>
          <text class="btn-text" :style="textStyle">{{item.text}}</text>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const animation = weex.requireModule('animation');
export default {
  props: {
    buttons: {
      type: Array,
      default: []
    },
    position: {
      type: Object,
      default: () => ({
        x: 0,
        y: 0
      })
    },
    arrowPosition: {
      type: Object,
      default: () => ({
        pos: 'top',
        x: 0,
        y: 0
      })
    },
    coverColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.4)'
    },
    hasAnimation: {
      type: Boolean,
      default: true
    },
    textStyle: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    show: false,
    showIn: false
  }),
  computed: {
    coverStyle () {
      return this.coverColor ? { backgroundColor: this.coverColor, opacity: this.hasAnimation || !this.showIn ? '0' : '1' } : '';
    },
    transformOrigin () {
      const { x = 0, y = 0, pos = 'top' } = this.arrowPosition;
      let _origins = [];
      switch (pos) {
        case 'top':
        case 'bottom':
          _origins = [x < 0 ? 'right' : 'left', pos];
          break;
        case 'left':
        case 'right':
          _origins = [pos, y < 0 ? 'bottom' : 'top'];
          break;
      }
      return _origins.join(' ');
    },
    contentTransform () {
      const { pos = 'top' } = this.arrowPosition;
      let { x = 0, y = 0 } = this.arrowPosition;
      const _translates = ['scale(0)'];
      if (x >= 0 && x < 22) {
        x = 22;
      } else if (x < 0 && x > -22) {
        x = -22;
      }
      if (y >= 0 && y < 22) {
        y = 22;
      } else if (y < 0 && y > -22) {
        y = -22;
      }
      switch (pos) {
        case 'top':
        case 'bottom':
          _translates[1] = `translateX(${x < 0 ? (x - 15) : (x + 15)}px)`;
          break;
        case 'left':
        case 'right':
          _translates[1] = `translateY(${y < 0 ? (y - 15) : (y + 15)}px)`
          break;
      }
      return _translates.join(' ');
    },
    contentStyle () {
      const { x = 0, y = 0 } = this.position;
      const style = {};
      x < 0 ? (style.right = `${-x}px`) : (style.left = `${x}px`);
      y < 0 ? (style.bottom = `${-y}px`) : (style.top = `${y}px`);
      style.opacity = this.hasAnimation || !this.showIn ? '0' : '1';
      style.transform = this.hasAnimation || !this.showIn ? this.contentTransform : 'scale(1)';
      style.transformOrigin = this.transformOrigin;
      return style;
    },
    arrowStyle () {
      let { x = 0, y = 0 } = this.arrowPosition;
      const { pos = 'top' } = this.arrowPosition;
      const style = {};
      switch (pos) {
        case 'top':
          style.top = '6px';
        case 'bottom': //eslint-disable-line
          !style.top && (style.bottom = '6px');
          style.transform = 'scaleX(0.8) rotate(45deg)';
          if (x >= 0 && x < 22) {
            x = 22;
          } else if (x < 0 && x > -22) {
            x = -22;
          }
          x < 0 ? (style.right = `${-x}px`) : (style.left = `${x}px`);
          break;
        case 'left':
          style.left = '6px';
        case 'right': //eslint-disable-line
          !style.left && (style.right = '6px');
          style.transform = 'scaleY(0.8) rotate(45deg)';
          if (y >= 0 && y < 22) {
            y = 22;
          } else if (y < 0 && y > -22) {
            y = -22;
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
    wxcPopoverShow () {
      if (this.animationLock) {
        return;
      }
      this.show = true;
      if (this.hasAnimation) {
        setTimeout(() => this.wxcPopoverAnimationShow(), 40)
      } else {
        setTimeout(() => (this.showIn = true), 40);
      }
    },
    /**
    * smooth in
    **/
    wxcPopoverAnimationShow () {
      const popoverEl = this.$refs['wxc-popover'];
      const coverEl = this.$refs['wxc-cover'];
      if (!coverEl || !popoverEl) {
        return;
      }
      this.setAnimationLock();
      let a1End = false;
      let a2End = false;
      animation.transition(popoverEl, {
        styles: {
          opacity: 1,
          transform: 'scale(1)',
          transformOrigin: this.transformOrigin
        },
        delay: 0,
        duration: 250,
        timingFunction: 'ease-out'
      }, (e) => {
        a1End = true;
        if (a1End && a2End) {
          this.animationLock = false
        }
      });

      animation.transition(coverEl, {
        styles: {
          opacity: 1
        },
        delay: 0,
        duration: 250,
        timingFunction: 'ease-in'
      }, (e) => {
        a2End = true;
        if (a1End && a2End) {
          this.animationLock = false
        }
      });
    },
    wxcButtonClicked (index, key) {
      if (this.animationLock) {
        return;
      }
      this.$emit('wxcPopoverButtonClicked', { key, index });
      this.hideAction();
    },
    /**
       * 隐藏操作
       */
    hideAction () {
      if (this.animationLock) {
        return;
      }
      if (this.hasAnimation) {
        this.setAnimationLock()
        const popoverEl = this.$refs['wxc-popover'];
        const coverEl = this.$refs['wxc-cover'];
        if (!popoverEl || !coverEl) {
          return;
        }
        let a1End = false;
        let a2End = false;
        animation.transition(popoverEl, {
          styles: {
            opacity: 0,
            transform: this.contentTransform,
            transformOrigin: this.transformOrigin
          },
          duration: 250
        }, () => {
          a1End = true;
          if (a1End && a2End) {
            this.show = false;
            this.showIn = false;
            this.animationLock = false
          }
        });
        animation.transition(coverEl, {
          styles: {
            opacity: 0
          },
          duration: 250
        }, () => {
          a2End = true;
          if (a1End && a2End) {
            this.show = false;
            this.showIn = false;
            this.animationLock = false
          }
        });
      } else {
        this.show = false;
        this.showIn = false;
      }
    },
    /**
       * 设置动画锁
       */
    setAnimationLock () {
      this.animationLock = true;
    }

  }
};
</script>

<style scoped>
.wrapper{
  z-index: 999;
}
.g-cover {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}
.g-popover {
  position: fixed;
  padding:15px;
  z-index: 10;
}
.u-popover-arrow {
  position: absolute;
  border-radius: 4px;
  width: 30px;
  height: 30px;
  background-color: #ffffff;
}
.u-popover-inner {
  border-radius: 10px;
  background-color: #ffffff;
}
.i-btn {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #dddddd;
}
.i-btn-noborder {
  border-bottom-color: #ffffff;
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
}
.text-align-center {
  text-align: center;
}
</style>
