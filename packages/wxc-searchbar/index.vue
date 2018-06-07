<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 16/10/25. -->
<!--A Search bar for city Search-->

<template>
  <div>
    <div :class="['wxc-search-bar','wxc-search-bar-'+theme]"
         :style="barStyle"
         v-if="mod==='default'">
      <input @blur="onBlur"
             @focus="onFocus"
             @input="onInput"
             @return="onSubmit"
             :return-key-type="returnKeyType"
             :autofocus="autofocus"
             :disabled="disabled"
             :value="value"
             ref="search-input"
             :type="inputType"
             :placeholder="placeholder"
             :style="{ width: needShowCancel ? '624px' : '710px' }"
             :class="['search-bar-input','search-bar-input-'+theme]" />
      <div v-if="disabled"
           @click="inputDisabledClicked"
           class="disabled-input"></div>
      <image class="search-bar-icon"
             :aria-hidden="true"
             :src="inputIcon"></image>
      <image class="search-bar-close"
             v-if="showClose"
             :aria-hidden="true"
             @click="closeClicked"
             :src="closeIcon"></image>
      <text :class="['search-bar-button','search-bar-button-'+theme]"
            :style="buttonStyle"
            v-if="needShowCancel"
            @click="cancelClicked">{{cancelLabel}}</text>
    </div>
    <div :class="['wxc-search-bar','wxc-search-bar-'+theme]"
         :style="barStyle"
         v-if="mod==='hasDep'">
      <input @blur="onBlur"
             @focus="onFocus"
             @input="onInput"
             @return="onSubmit"
             :disabled="disabled"
             :autofocus="autofocus"
             :return-key-type="returnKeyType"
             :value="value"
             :type="inputType"
             :placeholder="placeholder"
             :class="['search-bar-input','input-has-dep','search-bar-input-'+theme]" />
      <div v-if="disabled"
           @click="inputDisabledClicked"
           class="disabled-input has-dep-disabled"></div>
      <div :class="['bar-dep','.bar-dep-'+theme]"
           @click="depClicked">
        <text class="dep-text">{{depName}}</text>
        <image :src="arrowIcon"
               :aria-hidden="true"
               class="dep-arrow"></image>
      </div>
      <image class="search-bar-icon icon-has-dep"
             :aria-hidden="true"
             :src="inputIcon"></image>
    </div>
  </div>
</template>

<style scoped>
  .wxc-search-bar {
    padding-left: 20px;
    padding-right: 20px;
    background-color: #ffffff;
    width: 750px;
    height: 84px;
    flex-direction: row;
  }

  .wxc-search-bar-yellow {
    background-color: #ffc900;
  }

  .search-bar-input {
    position: absolute;
    top: 10px;
    padding-top: 0;
    padding-bottom: 0;
    padding-right: 40px;
    padding-left: 60px;
    font-size: 26px;
    width: 624px;
    height: 64px;
    line-height: 64px;
    background-color: #E5E5E5;
    border-radius: 6px;
  }

  .search-bar-input-yellow {
    background-color: #fff6d6;
  }

  .search-bar-icon {
    position: absolute;
    width: 30px;
    height: 30px;
    left: 34px;
    top: 28px;
  }

  .search-bar-close {
    position: absolute;
    width: 30px;
    height: 30px;
    right: 120px;
    top: 28px;
  }

  .search-bar-button {
    width: 94px;
    height: 36px;
    font-size: 30px;
    text-align: center;
    background-color: #ffffff;
    margin-top: 16px;
    margin-right: 0;
    color: #333333;
    position: absolute;
    right: 8px;
    top: 9px;
  }

  .search-bar-button-yellow {
    background-color: #FFC900;
  }

  .input-has-dep {
    padding-left: 240px;
    width: 710px;
  }

  .bar-dep {
    width: 170px;
    padding-right: 12px;
    padding-left: 12px;
    height: 42px;
    align-items: center;
    flex-direction: row;
    position: absolute;
    left: 24px;
    top: 22px;
    border-right-style: solid;
    border-right-width: 1px;
    border-right-color: #C7C7C7;
  }

  .bar-dep-yellow {
    border-right-color: #C7C7C7;
  }

  .dep-text {
    flex: 1;
    text-align: center;
    font-size: 26px;
    color: #666666;
    margin-right: 6px;
    lines: 1;
    text-overflow: ellipsis;
  }

  .dep-arrow {
    width: 24px;
    height: 24px;
  }

  .icon-has-dep {
    left: 214px;
  }

  .disabled-input {
    width: 750px;
    height: 64px;
    position: absolute;
    left: 0;
    background-color: transparent;
  }

  .has-dep-disabled {
    width: 550px;
    left: 200px;
  }
</style>

<script>
  import { INPUT_ICON, ARROW_ICON, CLOSE_ICON } from './type';

  export default {
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      alwaysShowCancel: {
        type: Boolean,
        default: false
      },
      inputType: {
        type: String,
        default: 'text'
      },
      returnKeyType: {
        type: String,
        default: 'default'
      },
      mod: {
        type: String,
        default: 'default'
      },
      autofocus: {
        type: Boolean,
        default: false
      },
      theme: {
        type: String,
        default: 'gray'
      },
      barStyle: {
        type: Object,
        default: () => ({})
      },
      defaultValue: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: '搜索'
      },
      cancelLabel: {
        type: String,
        default: '取消 '
      },
      depName: {
        type: String,
        default: '杭州'
      }
    },
    computed: {
      needShowCancel() {
        return this.alwaysShowCancel || this.showCancel;
      },
      buttonStyle() {
        const { barStyle } = this;
        if (barStyle.backgroundColor) {
          return { backgroundColor: barStyle.backgroundColor }
        }
        return {}
      }
    },
    data: () => ({
      inputIcon: INPUT_ICON,
      closeIcon: CLOSE_ICON,
      arrowIcon: ARROW_ICON,
      showCancel: false,
      showClose: false,
      value: ''

    }),
    created() {
      this.defaultValue && (this.value = this.defaultValue);
      if (this.disabled) {
        this.showCancel = false;
        this.showClose = false;
      }
    },
    methods: {
      onBlur() {
        const self = this;
        setTimeout(() => {
          self.showCancel = false;
          self.detectShowClose();
          self.$emit('wxcSearchbarInputOnBlur', { value: self.value });
        }, 10);
      },
      autoBlur() {
        this.$refs['search-input'].blur();
      },
      onFocus() {
        if (this.isDisabled) {
          return;
        }
        this.showCancel = true;
        this.detectShowClose();
        this.$emit('wxcSearchbarInputOnFocus', { value: this.value });
      },
      closeClicked() {
        this.value = '';
        this.showCancel && (this.showCancel = false);
        this.showClose && (this.showClose = false);
        this.$emit('wxcSearchbarCloseClicked', { value: this.value });
        this.$emit('wxcSearchbarInputOnInput', { value: this.value });
      },
      onInput(e) {
        this.value = e.value;
        this.showCancel = true;
        this.detectShowClose();
        this.$emit('wxcSearchbarInputOnInput', { value: this.value });
      },
      onSubmit(e) {
        this.onBlur();
        this.value = e.value;
        this.showCancel = true;
        this.detectShowClose();
        this.$emit('wxcSearchbarInputReturned', { value: this.value });
      },
      cancelClicked() {
        this.showCancel && (this.showCancel = false);
        this.showClose && (this.showClose = false);
        this.$emit('wxcSearchbarCancelClicked', { value: this.value });
      },
      detectShowClose() {
        this.showClose = (this.value.length > 0) && this.showCancel;
      },
      depClicked() {
        this.$emit('wxcSearchbarDepChooseClicked', {});
      },
      inputDisabledClicked() {
        this.$emit('wxcSearchbarInputDisabledClicked', {});
      },
      setValue(value) {
        this.value = value;
      }
    }
  };
</script>
