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
    width: 48px;
    height: 48px;
  }

  .title-text {
    font-size: 30px;
  }
</style>

<script>
  import WxcCell from '../wxc-cell';
  import { CHECKED, DISABLED } from './type.js'
  import STYLE from 'weex-ui/lib/theme/default/wxc-radio.js';

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
      STYLE: Object.assign({}, STYLE),
      icon: [STYLE.CHECKED, STYLE.DISABLED]
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
        return disabled ? STYLE.grayColor : '#FFFFFF';
      },
      color () {
        const { disabled, checked, config, STYLE } = this;
        let checkedColor = STYLE.primaryColor;
        config.checkedColor && (checkedColor = config.checkedColor);
        return checked ? (!disabled ? checkedColor : STYLE.disabledColor) : STYLE.fontColorDark;
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
