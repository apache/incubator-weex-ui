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
      value: {
        type: Number,
        default: 0
      }
    },
    computed: {
      runWayStyle () {
        const { barWidth, barHeight } = this;
        return {
          width: barWidth + 'px',
          height: barHeight + 'px'
        }
      },
      progressStyle () {
        const { value, barWidth, barHeight, barColor } = this;
        const newValue = value < 0 ? 0 : (value > 100 ? 100 : value);
        return {
          backgroundColor: barColor,
          height: barHeight + 'px',
          width: newValue / 100 * barWidth + 'px'
        }
      }
    }
  }
</script>
