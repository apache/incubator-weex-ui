<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/07/28. -->

<template>
  <div :class="['wxc-btn', isHighlight && !disabled && 'wxc-btn-highlight']"
       :style="mrBtnStyle"
       @click="onClicked"
       :accessible="true"
       :aria-label="text">
    <text class="btn-text" :style="mrTextStyle">{{text}}</text>
  </div>
</template>

<script>
  import { STYLE_MAP, TEXT_STYLE_MAP, BUTTON_STYLE_MAP, TEXT_FONTSIZE_STYLE_MAP } from './type';

  export default {
    props: {
      text: {
        type: String,
        default: '确认'
      },
      size: {
        type: String,
        default: 'full'
      },
      type: {
        type: String,
        default: 'red'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      isHighlight: {
        type: Boolean,
        default: false
      },
      btnStyle: Object,
      textStyle: Object,
      disabledStyle: Object
    },
    computed: {
      mrBtnStyle () {
        const { type, disabled, btnStyle, size, disabledStyle } = this;

        const mrBtnStyle = {
          ...STYLE_MAP[type],
          ...BUTTON_STYLE_MAP[size],
          ...btnStyle
        };

        let disabledInStyle = { opacity: 0.2 };
        if (type === 'white') {
          disabledInStyle = { backgroundColor: 'rgba(0, 0, 0, 0.1)' };
        }

        return disabled ? {
          ...mrBtnStyle,
          ...disabledInStyle,
          ...disabledStyle,
          borderWidth: 0
        } : mrBtnStyle;
      },
      mrTextStyle () {
        const { type, disabled, textStyle, size } = this;
        const mrTextStyle = { ...TEXT_STYLE_MAP[type], ...textStyle, ...TEXT_FONTSIZE_STYLE_MAP[size] };
        return disabled ? { ...mrTextStyle, color: '#FFFFFF' } : mrTextStyle;
      }
    },
    methods: {
      onClicked (e) {
        const { type, disabled } = this;
        this.$emit('wxcButtonClicked', { e, type, disabled });
      }
    }
  };
</script>

<style scoped>
  .wxc-btn {
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    opacity: 1;
  }

  .wxc-btn-highlight:active {
    opacity: .8;
  }

  .btn-text {
    text-overflow: ellipsis;
    lines: 1;
    color: #ffffff;
  }
</style>
