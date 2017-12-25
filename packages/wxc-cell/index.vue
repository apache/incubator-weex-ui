<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/09/25. -->
<!--A Cell -->

<template>
  <div :class="['wxc-cell', hasTopBorder && 'cell-top-border', hasBottomBorder && 'cell-bottom-border', hasMargin && 'cell-margin', hasVerticalIndent && 'cell-indent', desc && 'has-desc']"
    :style="cellStyle"
    :accessible="autoAccessible"
    :aria-label="`${label},${title},${desc}`"
    @click="cellClicked">
    <slot name="label">
      <div v-if="label">
        <text class="cell-label-text">{{label}}</text>
      </div>
    </slot>
    <div class="cell-title">
      <slot name="title">
        <text class="cell-content">{{title}}</text>
        <text class="cell-desc-text"
              v-if="desc">{{desc}}</text>
      </slot>
    </div>
    <slot name="value"></slot>
    <slot></slot>
    <image :src="arrowIcon"
           class="cell-arrow-icon"
           :aria-hidden="true"
           v-if="hasArrow"></image>
  </div>
</template>

<style scoped>
  .wxc-cell {
    height: 100px;
    flex-direction: row;
    align-items: center;
    padding-left: 24px;
    padding-right: 24px;
    background-color: #ffffff;
  }

  .cell-margin {
    margin-bottom: 24px;
  }

  .cell-title {
    flex: 1;
  }

  .cell-indent {
    padding-bottom: 30px;
    padding-top: 30px;
  }

  .has-desc {
    padding-bottom: 18px;
    padding-top: 18px;
  }

  .cell-top-border {
    border-top-color: #e2e2e2;
    border-top-width: 1px;
  }

  .cell-bottom-border {
    border-bottom-color: #e2e2e2;
    border-bottom-width: 1px;
  }

  .cell-label-text {
    font-size: 30px;
    color: #666666;
    width: 188px;
    margin-right: 10px;
  }

  .cell-arrow-icon {
    width: 22px;
    height: 22px;
  }

  .cell-content {
    color: #333333;
    font-size: 30px;
    line-height: 40px;
  }

  .cell-desc-text {
    color: #999999;
    font-size: 24px;
    line-height: 30px;
    margin-top: 4px;
  }
</style>

<script>
  import Utils from '../utils';

  export default {
    props: {
      label: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      desc: {
        type: String,
        default: ''
      },
      link: {
        type: String,
        default: ''
      },
      hasTopBorder: {
        type: Boolean,
        default: false
      },
      hasMargin: {
        type: Boolean,
        default: false
      },
      hasBottomBorder: {
        type: Boolean,
        default: true
      },
      hasArrow: {
        type: Boolean,
        default: false
      },
      arrowIcon: {
        type: String,
        default: 'https://gw.alicdn.com/tfs/TB11zBUpwMPMeJjy1XbXXcwxVXa-22-22.png'
      },
      hasVerticalIndent: {
        type: Boolean,
        default: true
      },
      cellStyle: {
        type: Object,
        default: () => ({})
      },
      autoAccessible: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      cellClicked (e) {
        const link = this.link;
        this.$emit('wxcCellClicked', { e });
        link && Utils.goToH5Page(link, true);
      }
    }
  };
</script>
