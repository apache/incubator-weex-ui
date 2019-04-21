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
  }

  .top {
    left: 0;
    right: 0;
     width: 750px;
  }

  .bottom {
    left: 0;
    right: 0;
     width: 750px;
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
  const dom = weex.requireModule('dom');
  const { platform } = weex.config.env;
  const isWeb = typeof (window) === 'object' && platform.toLowerCase() === 'web';
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
      standOut: {
        type: [Number, String],
        default: 0
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
      isOverShow: true,
      initFlag: false,
      height: 0,
      width: 0,
      inAnimation: false
    }),
    watch: {
      show: {
        immediate: true,
        handler: function (val) {
          if (this.inAnimation) { return }
          if (!this.initFlag && !val) { return }
          if (val && !this.initFlag) {
            setTimeout(() => {
              dom.getComponentRect(this.$refs['wxc-popup'], (option) => {
                if (option.result) {
                  if (this.pos === 'top' || this.pos === 'bottom') {
                    this.height = option.size.height;
                  } else {
                    this.width = option.size.width;
                  }
                  setTimeout(() => {
                    this.appearPopup(val);
                    this.initFlag = true;
                  }, 30);
                }
              });
            }, 30)
          } else {
            setTimeout(() => {
              this.appearPopup(val);
            }, 30);
          }
        }
      }
    },
    computed: {
      padStyle () {
        const { pos, width, height, popupColor, standOut, initFlag } = this;
        const stand = parseInt(standOut, 10);
        let style = {
          backgroundColor: popupColor
        };
        pos === 'top' && (style = {
          ...style,
          top: `${-height + stand}px`,
          opacity: initFlag
        });
        pos === 'bottom' && (style = {
          ...style,
          bottom: `${-height + stand}px`,
          opacity: initFlag
        });
        pos === 'left' && (style = {
          ...style,
          left: `${-width + stand}px`,
          opacity: initFlag
        });
        pos === 'right' && (style = {
          ...style,
          right: `${-width + stand}px`,
          opacity: initFlag
        });
        return style;
      }
    },
    methods: {
      changeSize () {
        this.initFlag = false;
      },
      handleTouchEnd (e) {
        // 在支付宝上面有点击穿透问题
        const { platform } = weex.config.env;
        platform === 'Web' && e.preventDefault && e.preventDefault();
      },
      hide () {
        this.appearPopup(false);
        this.$refs.overlay.appearOverlay(false);
      },
      wxcOverlayBodyClicking () {
        this.isShow && this.appearPopup(false);
      },
      appearPopup (bool, duration = 300) {
        this.inAnimation = true
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
            setTimeout(() => {
              this.inAnimation = false
            }, 30)
          }
        });
      },
      getTransform (pos, width, height, bool) {
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
