<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/10/31. -->
<!-- 处理android上面有点击时候事件不传递问题!-->
<!--需要是wxc-ep-slider组件中接受wxcPanItemPan，事件同时判断是android下调用bindExp-->

<template>
  <div ref="wxc-pan-item"
       :prevent-move-event="true"
       @horizontalpan="dispatchPan"
       @click="itemClicked">
    <slot></slot>
  </div>
</template>

<script>
  const expressionBinding = weex.requireModule('expressionBinding');
  import Utils from '../utils';
  module.exports = {
    props: {
      extId: {
        type: [String, Number],
        default: 0
      }
    },
    data: () => ({
      isPanning: false,
      appearMap: []
    }),
    mounted () {
      setTimeout(() => {
        if (Utils.env.supportsEBForAndroid()) {
          const element = this.$refs['wxc-pan-item'];
          element && expressionBinding.enableBinding(element.ref, 'pan');
        }
      }, 300)
    },
    methods: {
      itemClicked () {
        if (this.isPanning) {
          return;
        }
        this.$emit('wxcPanItemClick', { extId: this.extId });
      },
      dispatchPan (e) {
        if (Utils.env.supportsEBForAndroid()) {
          if (e.state === 'start') {
            this.isPanning = true;
            const element = this.$refs['wxc-pan-item'];
            element && this.$emit('wxcPanItemPan', { element });
          } else if (e.state === 'end') {
            setTimeout(() => {
              this.isPanning = false;
            }, 50);
          }
        }
      }
    }
  };
</script>
