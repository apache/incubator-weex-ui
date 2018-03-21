<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by 南麓 on 2017/8/10. -->

<template>
  <div class="grid-option"
       :style="cWrapperStyle"
       @click="onClick"
       :accessible="true"
       :aria-label="`${title},${checked?'已选中':'未选中'}`">
    <text v-if="title" class="text-title" :style="cTitleStyle">{{title}}</text>

    <image v-if="checked && icon" class="image-checked" :src="icon"></image>
  </div>
</template>

<script>
  export default {
    props: {
      index: {
        type: Number,
        default: -1
      },
      // 是否选中
      checked: {
        type: Boolean,
        default: false
      },
      // 是否可选
      disabled: {
        type: Boolean,
        default: false
      },
      // 标题
      title: {
        type: String,
        default: ''
      },
      width: {
        type: String,
        default: '166px'
      },
      height: {
        type: String,
        default: '72px'
      },
      // 默认 x
      icon: {
        type: String,
        default: 'https://gw.alicdn.com/tfs/TB1IAByhgMPMeJjy1XdXXasrXXa-38-34.png'
      },
      // 正常状态文字色值
      color: {
        type: String,
        default: '#3d3d3d'
      },
      // 选中状态文字色值
      checkedColor: {
        type: String,
        default: '#3d3d3d'
      },
      // 不可选状态文字色值
      disabledColor: {
        type: String,
        default: '#9b9b9b'
      },
      // 正常状态边框色值
      borderColor: {
        type: String,
        default: 'transparent'
      },
      // 选中状态边框色值
      checkedBorderColor: {
        type: String,
        default: '#ffb200'
      },
      // 不可选状态边框色值
      disabledBorderColor: {
        type: String,
        default: 'transparent'
      },
      // 正常状态背景色值
      backgroundColor: {
        type: String,
        default: '#f6f6f6'
      },
      // 选中状态背景色值
      checkedBackgroundColor: {
        type: String,
        default: '#ffffff'
      },
      // 不可选状态背景色值
      disabledBackgroundColor: {
        type: String,
        default: '#f6f6f6'
      }
    },
    computed: {
      cWrapperStyle () {
        const { checked, disabled, width, height, borderColor, checkedBorderColor, disabledBorderColor, backgroundColor, checkedBackgroundColor, disabledBackgroundColor } = this;
        return {
          width,
          height,
          borderColor: disabled ? disabledBorderColor : checked ? checkedBorderColor : borderColor,
          backgroundColor: disabled ? disabledBackgroundColor : checked ? checkedBackgroundColor : backgroundColor
        }
      },
      cTitleStyle () {
        const { checked, disabled, color, checkedColor, disabledColor } = this;
        return {
          color: disabled ? disabledColor : checked ? checkedColor : color
        }
      }
    },
    methods: {
      onClick () {
        if (!this.disabled) {
          this.$emit('select', this.index);
        }
      }
    }
  }
</script>

<style scoped>
  .grid-option {
    justify-content: center;
    border-radius: 8px;
    border-width: 2px;
    padding-left: 6px;
    padding-right: 6px;
  }

  .text-title {
    lines: 2;
    line-height: 30px;
    text-overflow: ellipsis;
    text-align: center;
    font-size: 26px;
  }

  .image-checked {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 38px;
    height: 34px;
  }
</style>
