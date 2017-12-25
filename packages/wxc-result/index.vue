<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 16/10/25. -->
<!--A  result page-->

<template>
  <div class="wrap" v-if="show" :style="wrapStyle">
    <div class="wxc-result" :style="{paddingTop: setPaddingTop }">
      <image class="result-image"
             :aria-hidden="true"
             :src="resultType.pic"></image>
      <div class="result-content" v-if="resultType.content">
        <text class="content-text">{{resultType.content}}</text>
        <text class="content-text content-desc"
              v-if="resultType.desc">{{resultType.desc}}</text>
      </div>
      <div class="result-button"
           v-if="resultType.button"
           @touchend="handleTouchEnd"
           @click="onClick">
        <text class="button-text">{{resultType.button}}</text>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .wrap {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .wxc-result {
    width: 750px;
    flex: 1;
    align-items: center;
    background-color: #f2f3f4;
  }

  .result-image {
    width: 320px;
    height: 320px;
  }

  .result-content {
    margin-top: 36px;
    align-items: center;
  }

  .content-text {
    font-size: 30px;
    color: #A5A5A5;
    height: 42px;
    line-height: 42px;
    text-align: center;
  }

  .content-desc {
    margin-top: 10px;
  }

  .result-button {
    margin-top: 60px;
    border-width: 1px;
    border-color: #979797;
    background-color: #FFFFFF;
    border-radius: 6px;
    width: 240px;
    height: 72px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .button-text {
    color: #666666;
    font-size: 30px;
  }
</style>

<script>
  import TYPES from './type';
  import Utils from '../utils';

  export default {
    props: {
      type: {
        type: String,
        default: 'errorPage'
      },
      show: {
        type: Boolean,
        default: true
      },
      wrapStyle: Object,
      paddingTop: {
        type: [Number, String],
        default: 232
      },
      customSet: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      resultType () {
        const { type, customSet } = this;
        const allTypes = Utils.isEmptyObject(customSet) ? TYPES : Utils.mergeDeep(TYPES, customSet);
        let types = allTypes['errorPage'];
        if (['errorPage', 'noGoods', 'noNetwork', 'errorLocation'].indexOf(type) > -1) {
          types = allTypes[type];
        }
        return types;
      },
      setPaddingTop () {
        const paddingTop = this.paddingTop;
        return `${paddingTop}px`
      }
    },
    methods: {
      handleTouchEnd (e) {
        // web上面有点击穿透问题
        const { platform } = weex.config.env;
        platform === 'Web' && e.preventDefault && e.preventDefault();
      },
      onClick () {
        const type = this.type;
        this.$emit('wxcResultButtonClicked', { type })
      }
    }
  };
</script>
