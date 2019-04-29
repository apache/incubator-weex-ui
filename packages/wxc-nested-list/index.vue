<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by wjun94 on 19/04/29. -->
<!--nested scrolling.-->

<template>
  <scroller ref="wxcNestedListDom"
      @loadmore="onLoadmore" 
      loadmoreoffset='200'
      @touchstart="(e) => $emit('onTouchstart', e)"
      @touchmove="(e) => $emit('onTouchmove', e)"
      @touchend="(e) => $emit('onTouchend', e)"
      @click="$emit('onListClick')"
      :style="styles"
      :scroll-direction="isLevel && 'horizontal'" 
      :class="['wxc-nested-list', isLevel && 'level-list']" 
      :pagingEnabled ="isPagingEnabled"
      shouldStopPropagationInitResult="false" 
      shouldStopPropagationInterval="1000000" 
      @stoppropagation="Env.platform === 'iOS' ? false : true" 
      :show-scrollbar="isShowScrollbar"
      :scrollable="true" >
    <slot></slot>
  </scroller>
</template>

<script>
export default {
  props: {
    styles: {
      type: Object,
      default: {}
    },
    isLevel: {
      type: Boolean,
      default: false
    },
    isResetLoadMore: {
      type: Boolean,
      default: false
    },
    isPagingEnabled: {
      type: Boolean,
      default: false
    },
    isShowScrollbar: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      Env: WXEnvironment
    };
  },
  methods: {
    onLoadmore() {
      this.$emit("onLoadmore");
      if (this.isResetLoadMore) {
        setTimeout(() => {
          this.$refs.wxcNestedListDom.resetLoadmore();
        }, 500);
      }
    }
  }
};
</script>

<style scoped>
.wxc-nested-list {
  height: 200px;
}

.level-list {
  flex-direction: row;
}
</style>