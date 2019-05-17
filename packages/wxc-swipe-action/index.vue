<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by wjun94 on 19/05/14. -->

<template>
<div class="container">
  <div ref="skid" v-for="(item, i) of data" @click="onNodeClick(item, i)" :key="'skid-' + i" class="wxc-skid" :style="{width: (750 + item.right.length * 100) + 'px', height: height + 'px'}" @touchstart="(e) => !isAndroid && onPanStart(e, item, i)" @horizontalpan="(e) => isAndroid && onPanStart(e, item, i)" @touchend="(e) => onPanEnd(e, item, i)">
    <div :style='styles' class="swipe-action-center border">
      <slot :val='{item: item, index: i}'/>
    </div>
    <!-- <text :style="{lineHeight: height + 'px'}" :class="['box-center', 'border', 'text', i + 1 === data.length && 'box-center-last']">{{item.title}}</text> -->
    <div class="swipe-action-right">
      <text class="swipe-action-child swipe-action-text" @click="onRightNode(item, child, i)" v-for="(child, childIdx) of item.right" :style="Object.assign({lineHeight: height + 'px'}, child.style || {})" :key="'child-' + childIdx">{{child.text}}</text>
    </div>
  </div>
</div>
</template>

<style scoped>
.container {
  background-color: #dddddd;
  border-top-width: 1px;
  border-top-color: #dddddd;
}
.border {
  border-bottom-width: 1px;
  border-bottom-color: #dddddd;
}
.wxc-skid {
  flex-direction: row;
  background-color: #FFFFFF;
}
.swipe-action-right {
  flex-direction: row;
  align-items: center;
}

.swipe-action-center {
  width: 750px;
}

/* .box-center {
  width: 735px;
  line-height: 90px;
  background-color: #FFFFFF;
  margin-left: 15px !important;
  margin-left: 15px;
}
.box-center-last {
  width: 750px;
  margin-left: 0 !important;
  padding-left: 15px !important;
  margin-left: 0;
  padding-left: 15px;
} */

.swipe-action-child {
  width: 100px;
  text-align: center;
  color: #FFFFFF;
  background-color: #dddddd;
  line-height: 90px;
}
.swipe-action-text {
  font-size: 30px;
}
</style>

<script>
import Binding from "weex-bindingx/lib/index.weex.js";
const animation = weex.requireModule("animation");
import Utils from "../utils";

export default {
  props: {
    data: {
      type: Array,
      default: []
    },
    height: {
      type: Number,
      default: 90
    },
    styles: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      mobileX: 0,
      webStarX: 0,
      saveIdx: null,
      isAndroid: Utils.env.isAndroid()
    };
  },
  methods: {
    special(dom, styles) {
      animation.transition(dom, {
        styles,
        duration: 200, //ms
        timingFunction: "ease",
        delay: 100 //ms
      });
    },
    onRightNode(pNode, node, i) {
      node.onPress();
      if (pNode.autoClose)
        this.special(this.$refs.skid[i], {
          transform: `translate(0, 0)`
        });
    },
    onNodeClick(node, i) {
      if (this.mobileX < 0) {
        this.mobileX = 0;
        this.special(this.$refs.skid[this.saveIdx], {
          transform: `translate(0, 0)`
        });
        this.isAndroid &&
          this.special(this.$refs.skid[i], {
            transform: `translate(0, 0)`
          });
      } else {
        this.$emit("onNodeClick", node, i);
      }
    },

    onPanEnd(e, node, i) {
      if (Utils.env.isWeb()) {
        const webEndX = e.changedTouches[0].pageX;
        this.movingDistance(webEndX - this.webStarX, node, this.$refs.skid[i]);
      }
    },
    onPanStart: function(e, node, i) {
      const { saveIdx } = this;
      if (saveIdx !== i && saveIdx !== null) {
        this.special(this.$refs.skid[saveIdx], {
          transform: `translate(0, 0)`
        });
        this.mobileX = 0;
      }
      this.saveIdx = i;
      !Utils.env.isWeb() ? this.mobile(e, node, i) : this.web(e, node, i);
      e.stopPropagation();
    },
    web(e, node, i) {
      this.webStarX = e.changedTouches[0].pageX;
    },
    mobile(e, node, i) {
      var el = this.$refs["skid"][i];
      Binding.bind(
        {
          anchor: el.ref,
          eventType: "pan",
          props: [
            {
              element: el.ref,
              property: "transform.translateX",
              expression: `x+${this.isAndroid ? 0 : this.mobileX}`
            }
          ]
        },
        e => {
          const { state, deltaX } = e;
          if (state === "end") {
            this.mobileX += deltaX;
            this.movingDistance(this.mobileX, node, el);
          }
        }
      );
    },
    movingDistance(scope, node, el) {
      const len = node.right ? node.right.length : 0;
      const distance = len * -100;
      if (scope < -30) {
        this.special(el, {
          transform: `translate(${distance}px, 0)`
        });
        this.mobileX = distance;
      } else {
        this.special(el, {
          transform: `translate(0, 0)`
        });
        this.mobileX = 0;
      }
    }
  }
};
</script>
