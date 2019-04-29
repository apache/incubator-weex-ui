<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/07/28. -->

<template>
  <wxc-cell :has-top-border="hasTopBorder"
            :cell-style="{backgroundColor:backgroundColor}"
            @wxcCellClicked="wxcCellClicked"
            :accessible="true"
            :aria-label="`${title},状态为${checked?'已选中':'未选中'},${disabled?'不可更改':''}`">
    <text :style="{color:color}"
          class="title-text"
          slot="title">{{title}}</text>
    <image :src="radioIcon"
           v-if="radioIcon"
           slot="value"
           class="radio"></image>
  </wxc-cell>
</template>

<style scoped>
  .radio {
    width: 36px;
    height: 36px;
  }

  .title-text {
    font-size: 30px;
    height: 40px;
    line-height: 40px;
  }
</style>

<script>
  import WxcCell from '../wxc-cell';
  import { CHECKED, DISABLED } from './type.js'

  export default {
    components: { WxcCell },
    props: {
      hasTopBorder: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        require: true
      },
      value: {
        type: [String, Number, Object],
        require: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      checked: {
        type: Boolean,
        default: false
      },
      config: {
        type: Object,
        default: () => ({})
      }
    },
    data: () => ({
      icon: [CHECKED, DISABLED]
    }),
    computed: {
      radioIcon () {
        const { icon, disabled, checked, config } = this;
        const mergeIcon = icon;
        config.checkedIcon && (mergeIcon[0] = config.checkedIcon);
        config.disabledIcon && (mergeIcon[1] = config.disabledIcon);
        return checked ? mergeIcon[disabled ? 1 : 0] : '';
      },
      backgroundColor () {
        const { disabled } = this;
        return disabled ? '#F2F3F4' : '#FFFFFF';
      },
      color () {
        const { disabled, checked, config } = this;
        let checkedColor = '#EE9900';
        config.checkedColor && (checkedColor = config.checkedColor);
        return checked && !disabled ? checkedColor : '#3D3D3D';
      }
    },
    methods: {
      wxcCellClicked () {
        const { disabled, value } = this;
        if (!disabled) {
          this.$emit('wxcRadioItemChecked', { value, disabled })
        }
      }
    }
  }
</script>
