<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/07/28. -->

<template>
  <div class="wxc-progress"
       :style="runWayStyle"
       :accessible="true"
       :aria-label="`进度为百分之${value}`">
    <div class="progress" :style="progressStyle"></div>
  </div>
</template>

<style scoped>
  .wxc-progress {
    background-color: #f2f3f4;
  }

  .progress {
    position: absolute;
    background-color: #FFC900;
  }
</style>

<script>
  export default {
    props: {
      barColor: {
        type: String,
        default: '#FFC900'
      },
      barWidth: {
        type: Number,
        default: 600
      },
      barHeight: {
        type: Number,
        default: 8
      },
      barRadius: {
        type: Number,
        default: 0
      },
      value: {
        type: Number,
        default: 0
      },
      backgroundColor: {
        type: String,
        default: '#f2f3f4'
      }
    },
    computed: {
      runWayStyle () {
        const { barWidth, barHeight, barRadius, backgroundColor } = this;
        return {
          width: barWidth + 'px',
          height: barHeight + 'px',
          borderRadius: barRadius + 'px',
          backgroundColor
        }
      },
      progressStyle () {
        const { value, barWidth, barHeight, barColor,barRadius } = this;
        const newValue = value < 0 ? 0 : (value > 100 ? 100 : value);
        return {
          backgroundColor: barColor,
          borderRadius: barRadius + 'px',
          height: barHeight + 'px',
          width: newValue / 100 * barWidth + 'px'
        }
      }
    }
  }
</script>
