<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 16/10/25. -->
<!--A popup box with customized contents.-->

<template>
  <div>
    <div @touchend="handleTouchEnd">
      <wxc-overlay :show="haveOverlay && isOverShow"
                   v-if="show"
                   ref="overlay"
                   v-bind="overlayCfg"
                   @wxcOverlayBodyClicking="wxcOverlayBodyClicking"></wxc-overlay>
    </div>
    <div ref="wxc-popup"
         v-if="show"
         :height="_height"
         :hack="isNeedShow"
         @click="()=>{}"
         :class="['wxc-popup', pos]"
         :style="padStyle">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
  .wxc-popup {
    position: fixed;
    width: 750px;
  }

  .top {
    left: 0;
    right: 0;
  }

  .bottom {
    left: 0;
    right: 0;
  }

  .left {
    bottom: 0;
    top: 0;
  }

  .right {
    bottom: 0;
    top: 0;
  }

</style>

<script>
  const animation = weex.requireModule('animation');
  import WxcOverlay from '../wxc-overlay';

  export default {
    components: { WxcOverlay },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      pos: {
        type: String,
        default: 'bottom'
      },
      popupColor: {
        type: String,
        default: '#FFFFFF'
      },
      overlayCfg: {
        type: Object,
        default: () => ({
          hasAnimation: true,
          timingFunction: ['ease-in', 'ease-out'],
          duration: 300,
          opacity: 0.6
        })
      },
      height: {
        type: [Number, String],
        default: 840
      },
      standOut: {
        type: [Number, String],
        default: 0
      },
      width: {
        type: [Number, String],
        default: 750
      },
      animation: {
        type: Object,
        default: () => ({
          timingFunction: 'ease-in'
        })
      }
    },
    data: () => ({
      haveOverlay: true,
      isOverShow: true
    }),
    computed: {
      isNeedShow() {
        setTimeout(() => {
          this.appearPopup(this.show);
        }, 50);
        return this.show;
      },
      _height() {
        this.appearPopup(this.show, 150);
        return this.height;
      },
      padStyle() {
        const { pos, width, height, popupColor, standOut } = this;
        const stand = parseInt(standOut, 10);
        let style = {
          width: `${width}px`,
          backgroundColor: popupColor
        };
        pos === 'top' && (style = {
          ...style,
          top: `${-height + stand}px`,
          height: `${height}px`
        });
        pos === 'bottom' && (style = {
          ...style,
          bottom: `${-height + stand}px`,
          height: `${height}px`
        });
        pos === 'left' && (style = {
          ...style,
          left: `${-width + stand}px`
        });
        pos === 'right' && (style = {
          ...style,
          right: `${-width + stand}px`
        });
        return style;
      }
    },
    methods: {
      handleTouchEnd(e) {
        // 在支付宝上面有点击穿透问题
        const { platform } = weex.config.env;
        platform === 'Web' && e.preventDefault && e.preventDefault();
      },
      hide() {
        this.appearPopup(false);
        this.$refs.overlay.appearOverlay(false);
      },
      wxcOverlayBodyClicking() {
        this.isShow && this.appearPopup(false);
      },
      appearPopup(bool, duration = 300) {
        this.isShow = bool;
        const popupEl = this.$refs['wxc-popup'];
        if (!popupEl) {
          return;
        }
        animation.transition(popupEl, {
          styles: {
            transform: this.getTransform(this.pos, this.width, this.height, !bool)
          },
          duration,
          delay: 0,
          ...this.animation
        }, () => {
          if (!bool) {
            this.$emit('wxcPopupOverlayClicked', { pos: this.pos });
          }
        });
      },
      getTransform(pos, width, height, bool) {
        let _size = pos === 'top' || pos === 'bottom' ? height : width;
        bool && (_size = 0);
        let _transform;
        switch (pos) {
          case 'top':
            _transform = `translateY(${_size}px)`;
            break;
          case 'bottom':
            _transform = `translateY(-${_size}px)`;
            break;
          case 'left':
            _transform = `translateX(${_size}px)`;
            break;
          case 'right':
            _transform = `translateX(-${_size}px)`;
            break;
        }
        return _transform;
      }
    }
  }
</script>
