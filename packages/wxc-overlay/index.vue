<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 16/10/25. -->
<!--A gray overlay mask-->

<template>
  <div>
    <div class="wxc-overlay"
         ref="wxc-overlay"
         v-if="show"
         :hack="shouldShow"
         @click="overlayClicked"
         :style="overlayStyle">
    </div>
  </div>
</template>

<style scoped>
  .wxc-overlay {
    width: 750px;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
  }
</style>

<script>
  const animation = weex.requireModule('animation');
  export default {
    props: {
      show: {
        type: Boolean,
        default: true
      },
      hasAnimation: {
        type: Boolean,
        default: true
      },
      duration: {
        type: [Number, String],
        default: 300
      },
      timingFunction: {
        type: Array,
        default: () => (['ease-in', 'ease-out'])
      },
      opacity: {
        type: [Number, String],
        default: 0.6
      },
      canAutoClose: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      overlayStyle () {
        return {
          opacity: this.hasAnimation ? 0 : 1,
          backgroundColor: `rgba(0, 0, 0,${this.opacity})`
        }
      },
      shouldShow () {
        const { show, hasAnimation } = this;
        hasAnimation && setTimeout(() => {
          this.appearOverlay(show);
        }, 50);
        return show;
      }
    },
    methods: {
      overlayClicked (e) {
        this.canAutoClose ? this.appearOverlay(false) : this.$emit('wxcOverlayBodyClicked', {});
      },
      appearOverlay (bool, duration = this.duration) {
        const { hasAnimation, timingFunction, canAutoClose } = this;
        const needEmit = !bool && canAutoClose;
        needEmit && (this.$emit('wxcOverlayBodyClicking', {}));
        const overlayEl = this.$refs['wxc-overlay'];
        if (hasAnimation && overlayEl) {
          animation.transition(overlayEl, {
            styles: {
              opacity: bool ? 1 : 0
            },
            duration,
            timingFunction: timingFunction[bool ? 0 : 1],
            delay: 0
          }, () => {
            needEmit && (this.$emit('wxcOverlayBodyClicked', {}));
          });
        } else {
          needEmit && (this.$emit('wxcOverlayBodyClicked', {}));
        }
      }
    }
  };
</script>
