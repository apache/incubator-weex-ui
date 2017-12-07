<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/07/28. -->

<template>
  <wxc-cell :has-top-border="hasTopBorder"
            @wxcCellClicked="wxcCellClicked"
            :accessible="true"
            :aria-label="`${title},状态为${checked ? '已选中' : '未选中'},${disabled ? '不可更改' : '点击可切换'}`">
    <text :style="{color:textColor}"
          class="title-text"
          slot="title">{{title}}</text>
    <image :src="checkIcon"
           slot="value"
           class="checkbox"></image>
  </wxc-cell>
</template>

<style scoped>
  .checkbox {
    width: 48px;
    height: 48px;
  }

  .title-text {
    font-size: 30px;
  }
</style>

<script>
  import WxcCell from '../wxc-cell';
  import { CHECKED, UNCHECKED, CHECKED_DISABLED, UNCHECKED_DISABLED } from './type'

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
      icon: [CHECKED, UNCHECKED, CHECKED_DISABLED, UNCHECKED_DISABLED],
      color: '#3D3D3D',
      innerChecked: false
    }),
    computed: {
      checkIcon () {
        const { icon, disabled, innerChecked, config } = this;
        const mergeIcon = [...icon];
        config.checkedIcon && (mergeIcon[0] = config.checkedIcon);
        config.unCheckedIcon && (mergeIcon[1] = config.unCheckedIcon);
        config.checkedDisabledIcon && (mergeIcon[2] = config.checkedDisabledIcon);
        config.unCheckedDisabledIcon && (mergeIcon[3] = config.unCheckedDisabledIcon);
        if (disabled) {
          return mergeIcon[innerChecked ? 2 : 3];
        } else {
          return mergeIcon[innerChecked ? 0 : 1];
        }
      },
      textColor () {
        const { innerChecked, disabled, config } = this;
        const checkedColor = config.checkedColor ? config.checkedColor : '#EE9900';
        return innerChecked && !disabled ? checkedColor : '#3D3D3D';
      }
    },
    watch: {
      checked (newChecked) {
        this.innerChecked = newChecked;
      }
    },
    created () {
      const { checked } = this;
      this.innerChecked = checked;
    },
    methods: {
      wxcCellClicked () {
        const { disabled, innerChecked, value } = this;
        if (!disabled) {
          this.innerChecked = !innerChecked;
          this.$emit('wxcCheckBoxItemChecked', { value, checked: this.innerChecked })
        }
      }
    }
  }
</script>
