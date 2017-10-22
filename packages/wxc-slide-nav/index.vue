<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by 虎牙 on 17/07/28. -->

<template>
  <div class="slide-nav" ref="wrapper">
    <slot></slot>
  </div>
</template>

<style scoped>
  .slide-nav {
    position: absolute;
    z-index: 1000;
  }

</style>

<script>
  const DOM = weex.requireModule('dom');
  const Animation = weex.requireModule('animation');
  const OFFSET_ACCURACY = 10;
  const SCALE = weex.config.env.platform.toLowerCase() === 'web' ? 2 : 1;

  function _toNum (str) {
    return typeof str === 'number' ? str : parseFloat((str || '').replace(/px$/i, ''));
  }

  function _getHeight (element, callback) {
    if (!element) {
      return;
    }
    if (element.__cacheHeight) {
      element.__cacheHeight && callback && callback(element.__cacheHeight);
    } else {
      DOM.getComponentRect(element, (res) => {
        let height = (parseFloat(res && res.size && res.size.height) || 0) / SCALE;
        height && callback && callback((element.__cacheHeight = height));
      });
    }
  }

  export default {

    props: {
      position: {
        'type': String,
        'default': 'top'
      },

      height: [String, Number]
    },

    data () {
      return {
        visible: true
      }
    },

    watch: {
      visible (newVal) {
        newVal ? this._slideIn() : this._slideOut();
      }
    },

    created () {
      this._height = _toNum(this.height) || 0;
      this._isBottom = this.position === 'bottom';
      this._direction = this._isBottom ? 1 : -1;
    },

    methods: {

      _slideOut () {
        this.getHeight((height) => {
          this.$emit('slideOut');
          this.slideY(height * this._direction * SCALE, () => {
            this.$emit('slideOutEnd');
          });
        });
      },

      _slideIn () {
        this.getHeight((height) => {
          this.$emit('slideIn');
          this.slideY(0, () => {
            this.$emit('slideInEnd');
          });
        });
      },

      getHeight (callback) {
        return _getHeight(this.$refs.wrapper, callback);
      },

      slideOut () {
        this.visible = false;
      },

      slideIn () {
        this.visible = true;
      },

      slideY (y, callback) {
        Animation.transition(this.$refs.wrapper, {
          styles: { transform: 'translateY(' + y + 'px)' },
          duration: 150, //ms
          timingFunction: 'ease',
          delay: 0 //ms
        }, callback);
      }
    },

    handleTouchStart (e) {
      let touch = e.changedTouches[0];
      this._touchParams = {
        pageY: touch.screenY,
        startY: touch.screenY,
        lastPageY: touch.screenY,
        timeStamp: e.timeStamp,
        direction: -1
      };
    },

    handleTouchMove (e, bottomNav) {
      let tp = this._touchParams;
      let touch = e.changedTouches[0];
      let offsetY;

      // 安卓下滚动的时候经常不触发touchstart事件
      if (!tp || tp.hasEnd) {
        return (this._touchParams = {
          pageY: touch.screenY,
          startY: touch.screenY,
          lastPageY: touch.screenY,
          timeStamp: e.timeStamp,
          direction: -1
        });
      }

      offsetY = touch.screenY - tp.pageY;

      tp.lastPageY = tp.pageY;
      tp.lastDirection = tp.direction;
      tp.direction = offsetY > 0 ? 1 : -1;

      if (tp.lastDirection !== tp.direction) {
        tp.startY = tp.lastPageY;
      }

      tp.pageY = touch.screenY;
      tp.offsetY = tp.pageY - tp.startY;

      if (!this.__scrollable && bottomNav) {
        if (tp.offsetY <= -OFFSET_ACCURACY) {
          bottomNav.slideOut();
        } else if (tp.offsetY >= OFFSET_ACCURACY) {
          bottomNav.slideIn();
        }
      }
    },

    handleTouchEnd () {
      let tp = this._touchParams;
      tp && (tp.hasEnd = true);
    },

    handleScroll (e, scroller, topNav, bottomNav, startThreshold, moveThreshold = 5) {
      let scrollY = e.contentOffset.y;
      let nav = topNav || bottomNav;
      let scrollFn = (maxScrollY) => {
        if (-scrollY > maxScrollY) {
          return;
        }
        maxScrollY = Math.abs(maxScrollY);
        if (Math.abs(scrollY) < startThreshold) {
          if (Math.abs(scrollY) >= maxScrollY - OFFSET_ACCURACY) {
            let tp = this._touchParams;
            if (!tp) {
              return;
            }
            let offsetY = tp.offsetY;
            if (offsetY < -OFFSET_ACCURACY) {
              bottomNav && bottomNav.slideOut();
            } else if (offsetY > OFFSET_ACCURACY) {
              bottomNav && bottomNav.slideIn();
            }
          } else {
            topNav && topNav.slideIn();
            bottomNav && bottomNav.slideIn();
          }
        } else {
          let tp = this._touchParams;
          if (!tp) {
            return;
          }
          let offsetY = tp.offsetY;
          if (Math.abs(offsetY) >= moveThreshold) {
            if (offsetY > 0) {
              topNav && topNav.slideIn();
              bottomNav && bottomNav.slideIn();
            } else {
              topNav && topNav.slideOut();
              bottomNav && bottomNav.slideOut();
            }
          }
        }
      };

      let maxScrollYCheck = (maxScrollY) => {
        if (!this.__scrollable) {
          return;
        }
        if (startThreshold) {
          scrollFn(maxScrollY);
        } else {
          nav.getHeight((navHeight) => {
            startThreshold = navHeight;
            scrollFn(maxScrollY);
          });
        }
      };

      if (!nav) {
        return;
      }

      _getHeight(scroller, (scrollerHeight) => {
        let maxScrollY = e.contentSize.height - scrollerHeight;
        this.__scrollable = maxScrollY >= OFFSET_ACCURACY;

        if (bottomNav) {
          bottomNav.getHeight((height) => {
            this.__scrollable = maxScrollY >= height;
            maxScrollYCheck(maxScrollY);
          });
        } else {
          maxScrollYCheck(maxScrollY);
        }
      });
    }
  }
</script>
