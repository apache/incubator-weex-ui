<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 16/10/25. -->
<!--A Stepper-->

<template>
  <div class="wxc-stepper">
    <div class="stepper-minus"
         @click="minusClicked"
         aria-label="减数"
         :accessible="true">
      <text class="stepper-icon" :style="{ color: isLess?'#cccccc':'#666666' }">-</text>
    </div>
    <input class="stepper-input"
           type="number"
           :value="valueString"
           @input="onInput"
           @blur="onBlur"
           :style="disableStyle"
           :disabled="disabled||readOnly"/>
    <div class="stepper-plus"
         @click="plusClicked"
         aria-label="加数"
         :accessible="true">
      <text class="stepper-icon" :style="{ color: isOver ? '#cccccc': '#666666' }">+</text>
    </div>
  </div>
</template>

<style scoped>
  .wxc-stepper {
    flex-direction: row;
  }

  .stepper-plus, .stepper-minus {
    width: 56px;
    height: 56px;
    background-color: #ededed;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
  }

  .stepper-input {
    border-width: 0;
    outline: none;
    text-align: center;
    color: #3d3d3d;
    font-size: 30px;
    line-height: 56px;
    width: 86px;
  }

  .stepper-icon {
    font-size: 36px;
    color: #666666;
    margin-top: -4px;
  }

</style>

<script>
  export default {
    props: {
      min: {
        type: [String, Number],
        default: 1
      },
      max: {
        type: [String, Number],
        default: 100
      },
      step: {
        type: [String, Number],
        default: 1
      },
      disabled: {
        type: Boolean,
        default: false
      },
      defaultValue: {
        type: [String, Number],
        default: 1
      },
      readOnly: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      disableStyle () {
        if (this.disabled) {
          return {
            color: '#cccccc'
          }
        }
      },
      valueString () {
        return this.value.toString();
      }
    },
    data: () => ({
      value: 1,
      isLess: false,
      isOver: false
    }),
    created () {
      const self = this;
      self.value = parseInt(self.defaultValue, 10);
      if (self.disabled) {
        self.isLess = true;
        self.isOver = true;
      }
    },
    methods: {
      minusClicked () {
        const self = this;
        if (self.disabled) {
          return;
        }
        const isMinOver = self.value <= self.min;
        const nowNum = self.value - parseInt(self.step, 10);
        if (isMinOver) {
          self.$emit('wxcStepperValueIsMinOver', { value: self.value });
        } else {
          self.value = nowNum;
          self.resetDisabledStyle();
        }
        // 由于此处已经减step
        if (nowNum <= self.min) {
          self.value = parseInt(self.min, 10);
          self.isLess = true;
        }
        self.$emit('wxcStepperValueChanged', { value: self.value });
      },
      plusClicked () {
        const self = this;
        if (self.disabled) {
          return;
        }
        const isMaxOver = self.value >= self.max;
        const nowNum = self.value + parseInt(self.step, 10);
        if (isMaxOver) {
          self.$emit('wxcStepperValueIsMaxOver', { value: self.value });
        } else {
          self.value = nowNum;
          self.resetDisabledStyle();
        }
        // 由于此处已经加step
        if (nowNum >= self.max) {
          self.value = parseInt(self.max, 10);
          self.isOver = true;
        }
        self.$emit('wxcStepperValueChanged', { value: self.value });
      },
      onInput (e) {
        this.correctInputValue(e.value);
      },
      onBlur (e) {
        this.correctInputValue(e.value);
      },
      correctInputValue (v) {
        const self = this;
        if (/^[1-9]\d{0,}$/.test(v) && parseInt(v, 10) >= self.min && parseInt(v, 10) <= self.max) {
          self.value = parseInt(v, 10);
        }
        self.$emit('wxcStepperValueChanged', { value: self.value });
      },

      resetDisabledStyle () {
        this.isLess = false;
        this.isOver = false;
      }
    }
  };
</script>
