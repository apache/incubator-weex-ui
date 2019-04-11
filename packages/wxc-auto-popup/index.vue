<template>
    <div :class="['wxc-auto-popup','wxc-auto-popup_'+pos]" ref="popup" v-if="show || showInCurrent">
        <div class="wxc-auto-popup_mask" ref="popupMask" :style="{'background-color':popupColor}" @click="maskClick"></div>
        <div :class="['wxc-auto-popup_content','wxc-auto-popup_content_'+pos]" :style="computedStyle" ref="popupContent" @click.stop>
            <slot></slot>
        </div>
    </div>
</template>

<script>
const dom = weex.requireModule('dom');
const animation = weex.requireModule('animation');

export default {
  data () {
    return {
      showInCurrent: false,
      popupMask: '',
      popupContent: '',
      initFlag: false,
      contentHeight: 750
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    pos: {
      type: String,
      default: 'center'
    },
    popupColor: {
      type: String,
      default: 'rgba(0,0,0,0.6)'
    },
    defaultClose: {
      type: Boolean,
      default: true
    },
    animation: {
      type: Object,
      default: {
        timingFunction: 'ease-in'
      }
    }
  },
  components: {},
  computed: {
    computedStyle () {
      if (this.pos === 'bottom') {
        return {
          transform: `translate(0px, ${this.contentHeight}px)`
        };
      }
      if (this.pos === 'top') {
        return {
          transform: `translate(0px, ${-1 * this.contentHeight}px)`
        };
      }
      return {};
    }
  },
  watch: {
    show: {
      immediate: true,
      handler: function (val) {
        setTimeout(() => {
          this.commonHandle(val);
        }, 30);
      }
    }
  },
  mounted () {
  },
  methods: {
    maskClick () {
      this.$emit('maskClick')
      this.defaultClose && this.hidePopup();
    },
    hidePopup () {
      this.$emit('hidePopup');
    },
    commonHandle (flag) {
      const resObj = {
        popupMask: this.$refs.popupMask,
        popupContent: this.$refs.popupContent,
        maskStyle: {
          opacity: +flag
        },
        contentStyle: {
          opacity: +flag
        }
      };
      if (this.pos === 'bottom') {
        if (flag) {
          resObj.contentStyle.transform = 'translate(0px, 0px)';
        } else {
          resObj.contentStyle.transform = `translate(0px, ${this.contentHeight}px)`;
        }
      }
      if (this.pos === 'top') {
        if (flag) {
          resObj.contentStyle.transform = 'translate(0px, 0px)';
        } else {
          resObj.contentStyle.transform = `translate(0px, ${-1 * this.contentHeight}px)`;
        }
      }
      const getHeight = () => new Promise((resolve) => {
        if (flag && !this.initFlag && this.pos !== 'center') {
          this.initFlag = true;
          dom.getComponentRect(this.$refs.popupContent, (option) => {
            if (option.result) {
              this.contentHeight = option.size.height;
              setTimeout(() => {
                resolve();
              }, 30);
            }
          });
        } else {
          resolve();
        }
      });
      const handle = () => {
        animation.transition(resObj.popupMask, {
          styles: resObj.maskStyle,
          duration: 500,
          ...this.animation
        }, () => {
          this.showInCurrent = flag;
        });
        getHeight().then(() => {
          animation.transition(resObj.popupContent, {
            styles: resObj.contentStyle,
            duration: 300,
            ...this.animation
          });
        });
      };
      handle();
    }
  }
};
</script>

<style scoped>
.wxc-auto-popup{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    align-items: center;
    justify-content: center;
}
.wxc-auto-popup_bottom{
  justify-content: flex-end;
}
.wxc-auto-popup_top{
  justify-content: flex-start;
}
.wxc-auto-popup_center{
   justify-content: center;
}
.wxc-auto-popup_mask{
   position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0,0,0,0.6);
  opacity: 0;
}
.wxc-auto-popup_content{
  align-items: center;
  flex-direction: column;
  opacity: 0;
}
.wxc-auto-popup-popup_img{
  width: 40px;
  height: 40px;
  position: absolute;
  right: 24px;
  top: 24px;
}
</style>
