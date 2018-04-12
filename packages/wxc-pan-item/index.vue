<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/10/31. -->
<!-- 处理android上面有点击时候事件不传递问题!-->
<!--需要是wxc-ep-slider组件中接受wxcPanItemPan，事件同时判断是android下调用bindExp-->

<template>
  <div>
    <div v-if="supportAndroid"
         ref="wxc-pan-item"
         @horizontalpan="dispatchPan"
         @appear="onItemAppear"
         @disappear="onItemDisAppear"
         @click="itemClicked">
      <slot></slot>
    </div>
    <div v-else
         ref="wxc-pan-item"
         @click="itemClicked">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import Binding from 'weex-bindingx/lib/index.weex.js';
  import Utils from '../utils';
  import BindEnv from '../utils/bind-env';

  export default {
    props: {
      url: {
        type: String,
        default: ''
      },
      needSlider: {
        type: Boolean,
        default: true
      },
    },
    data: () => ({
      isPanning: false,
      appearMap: [],
      supportAndroid: BindEnv.supportsEBForAndroid()
    }),
    mounted () {
      setTimeout(() => {
        if (this.supportAndroid && this.needSlider) {
          const element = this.$refs['wxc-pan-item'];
          Binding.prepare && Binding.prepare({
            anchor: element.ref,
            eventType: 'pan'
          });
        }
      }, 300)
    },
    methods: {
      itemClicked () {
        if (this.isPanning) {
          return;
        }
        this.url && Utils.goToH5Page(this.url, true);
        this.$emit('wxcPanItemClicked', { extId: this.extId });
      },

      dispatchPan (e) {
        if (this.supportAndroid && this.needSlider) {
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
