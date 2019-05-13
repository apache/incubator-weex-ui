<template>
<div class="container">
  <div ref="skid" v-for="(item, i) of data" :key="'skid-' + i" class="wxc-skid" @touchstart="(e) => onPanStart(e, item, i)">
    <text @click="onNodeClick(item, i)" class="box-center border">{{item.title}}</text>
    <div class="box-right">
      <text class="child" @click="child.onPress" v-for="(child, childIdx) of item.right" :style="child.style || {}" :key="'child-' + childIdx">{{child.text}}</text>
    </div>
  </div>
</div>
</template>

<script>
import Binding from "weex-bindingx/lib/index.weex.js";
const animation = weex.requireModule("animation");
var modal = weex.requireModule("modal");

export default {
  props: {
    data: {
      type: Array,
      default: []
    },
  },
  data() {
    return {
      x: 0,
      saveIdx: null
      // y: 0
    };
  },
  created() {},
  methods: {
    special(dom, styles) {
      animation.transition(dom, {
        styles,
        duration: 200, //ms
        timingFunction: "ease",
        delay: 100 //ms
      });
    },
    onNodeClick(node) {
      if (this.x < 0) {
        this.x = 0;
        this.special(this.$refs.skid[this.saveIdx], {
          transform: `translate(0, 0)`
        });
      } else {
        this.$emit('onNodeClick', node)
      }
    },
    onPanStart: function(e, node, i) {
      var el = this.$refs.skid[i];
      const len = node.right.length;
      const { saveIdx } = this;
      if (saveIdx !== i) {
        this.special(this.$refs.skid[saveIdx], {
          transform: `translate(0, 0)`
        });
        this.x = 0;
      }
      this.saveIdx = i;
      Binding.bind(
        {
          anchor: el.ref,
          eventType: "pan",
          props: [
            {
              element: el.ref,
              property: "transform.translateX",
              expression: `x+${this.x}`
            }
          ]
        },
        e => {
          const { state, deltaX } = e;
          if (state === "end") {
            this.x += deltaX;
            const distance = -100 * len;
            if (this.x < distance / 2) {
              this.special(el, {
                transform: `translate(${distance}px, 0)`
              });
              this.x = distance;
            } else {
              this.special(el, {
                transform: `translate(0, 0)`
              });
              this.x = 0;
            }
          }
        }
      );
    }
  }
};
</script>

<style>
.container {
  background-color: #ddd;
}
.border {
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
}
.wxc-skid {
  flex-direction: row;
  padding-left: 15px;
  width: 750px;
  height: 90px;
  background-color: white;
}
.box-right {
  flex-direction: row;
  align-items: center;
  line-height: 90px;
}
.box-center {
  width: 750px;
  line-height: 90px;
  background-color: white;
}
.child {
  width: 100px;
  text-align: center;
  color: white;
  background-color: #ddd;
  line-height: 90px;
}
</style>