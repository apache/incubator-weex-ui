<!-- CopyRight (C) 2017-2022 WeexUI Group Holding Limited. -->
<!-- Created by git@zwwill on 18/02/08. -->
<template>
  <refresh class="wxc-refresher"
           @refresh="onRefresh"
           @pullingdown="onPullingDown"
           :display="refreshing ? 'show' : 'hide'">
    <div v-if="newStyleFlag" class="cycle-container" ref="cycle">
      <div class="u-cover c1" ref="cover1">
        <div class="u-cover-cycle cover1"></div>
      </div>
      <div class="u-cover c2" ref="cover2">
        <div class="u-cover-cycle" ref="cover-cycle"></div>
      </div>
    </div>
    <image v-if="newStyleFlag"
           class="arrow-down"
           ref="arrow"
           :src="ICON_ARROW_DOWN"
           resize="contain"></image>
    <loading-indicator v-else class="indicator"></loading-indicator>
    <text class="u-txt" :style="{width:`${textWidth}px`}">{{refresherText}}</text>
  </refresh>
</template>
<script>
  const animation = weex.requireModule('animation');

  // 减少打包体积
  import bindingx from 'weex-bindingx/lib/index.weex';
  import BindEnv  from '../utils/bind-env';
  import Utils from '../utils';

  const ICON_ARROW_DOWN = 'https://img.alicdn.com/tfs/TB1A8faeTtYBeNjy1XdXXXXyVXa-48-48.png';

  export default {
    props: {
      scrollerRef: String,
      maxTime: {
        type: Number,
        default: 0
      },
      mainText: {
        type: String,
        default: '下拉即可刷新...'
      },
      pullingText: {
        type: String,
        default: '释放即可刷新...'
      },
      refreshingText: {
        type: String,
        default: '加载中...'
      },
      textWidth: {
        type: Number,
        default: 200
      }
    },
    data () {
      return {
        ICON_ARROW_DOWN,
        refreshing: false,
        couldUnLash: false
      }
    },
    computed: {
      newStyleFlag () {
        return this.scrollerRef && BindEnv.supportsEBForIos();
      },
      refresherText () {
        return this.refreshing ? this.refreshingText : this.pText;
      },
      pText () {
        return this.couldUnLash ? this.pullingText : this.mainText;
      }
    },
    created () {
      this.newStyleFlag && this.animationBinding();
    },
    beforeDestroy () {
      this.bindingsDestroy();
    },
    methods: {
      onRefresh (event) {
        this.$emit('wxcRefresh', event);
        this.refreshing = true;
        this.newStyleFlag && this.cycleGoRound();
        if (this.maxTime <= 0) return;
        this.timeoutSto && clearTimeout(this.timeoutSto);
        this.timeoutSto = setTimeout(() => {
          this.$emit('wxcTimeout');
          this.wxcCancel();
        }, this.maxTime);
      },
      /**
       * 取消 refreshing
       */
      wxcCancel () {
        this.refreshing = false;
        this.timeoutSto && clearTimeout(this.timeoutSto);
        this.roundingDestroy();
      },
      /**
       * 下拉事件
       */
      onPullingDown (event) {
        this.$emit('wxcPullingDown',event);
        let pd = event.pullingDistance * (Utils.env.isIOS() ? -1 : 1);
        pd > (Utils.env.isAndroid() ? 200 : 140) ? (this.couldUnLash = true) : (this.couldUnLash = false);
        if (this.refreshing && pd < 20) {
          this.timeoutSto && clearTimeout(this.timeoutSto);
          this.refreshing = false;
          this.roundingDestroy();
        }
      },
      /**
       * 注册 bindingx
       */
      animationBinding () {
        setTimeout(() => {
          // 降级版本取不到，需要注意
          const scroller = this.$parent.$refs[this.scrollerRef].ref;
          const cover2 = this.$refs['cover2'].ref;
          const coverCycle = this.$refs['cover-cycle'].ref;

          const bindingResult = bindingx.bind({
            eventType: 'scroll',
            anchor: scroller,
            props: [
              {
                element: cover2,
                property: 'transform.rotateZ',
                expression: 'y>-140?(y%75/150*-360):156'
              },
              {
                element: coverCycle,
                property: 'opacity',
                expression: 'y<-75 ?1:0'
              }
            ]
          }, (e) => {});
          this.bindingToken = bindingResult.token;
        }, 300);
      },
      /**
       * 旋转动作
       */
      cycleGoRound () {
        if (Utils.env.isAndroid()) return;
        let cycle = this.$refs['cycle'].ref;
        this.arrowShow(false);
        if (!cycle) {
          return;
        }
        const roundingResult = bindingx.bind({
          eventType: 'timing',
          props: [
            {
              element: cycle,
              property: 'transform.rotateZ',
              expression: 't*0.72'
            }
          ]
        }, (e) => {
        });
        this.roundingToken = roundingResult.token;
      },
      /**
       * 箭头显隐控制
       */
      arrowShow (_show = true) {
        const arrow = this.$refs['arrow'];
        arrow && animation.transition(arrow, {
          styles: {
            opacity: _show ? 1 : 0,
            transform: _show ? "scale(1)" : "scale(0.5)"
          },
          duration: 300,
          delay: 0
        }, () => {
        });
      },
      /**
       * 完整 bindingx 销毁
       */
      bindingsDestroy () {
        if (this.bindingToken !== 0) {
          bindingx && bindingx.unbind({
            eventType: 'scroll',
            token: this.bindingToken
          });
          this.bindingToken = 0;
        }
        this.roundingDestroy();
      },
      /**
       * 旋转 bindingx 销毁
       */
      roundingDestroy () {
        if (this.roundingToken !== 0) {
          bindingx && bindingx.unbind({
            eventType: 'timing',
            token: this.roundingToken
          });
          this.roundingToken = 0;
        }
        this.arrowShow(true);
      }
    }
  }
</script>
<style scoped>

  .wxc-refresher {
    height: 140px;
    width: 750px;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    padding-top: 50px;
  }

  .cycle-container {
    position: relative;
    width: 60px;
    height: 60px;
  }

  .u-cover {
    position: absolute;
    width: 30px;
    height: 60px;
    top: 0;
    background-color: #ffffff;
    overflow: hidden;
    right: 0;
  }

  .c1 {
    z-index: 1;
  }

  .c2 {
    z-index: 2;
    transform-origin: left center;
    transform: rotateZ(0deg);
  }

  .u-cover-cycle {
    position: absolute;
    width: 60px;
    height: 60px;
    right: 0;
    top: 0;
    box-sizing: border-box;
    border-width: 2px;
    border-color: #666666;
    border-style: solid;
    border-radius: 100%;
    opacity: 0;
  }

  .cover1 {
    opacity: 1;
  }

  .indicator {
    margin-right: 20px;
    height: 60px;
    width: 60px;
    color: #666666;
  }

  .arrow-down {
    position: relative;
    top: 15px;
    left: -45px;
    width: 30px;
    height: 30px;
  }

  .u-txt {
    font-size: 24px;
    line-height: 40px;
    color: #999999;
    margin-top: 10px;
    margin-left: 10px;
    height: 40px;
    lines: 1;
  }
</style>
