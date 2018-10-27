<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by zweipix on 2017-05-09. -->
<!-- Updated by zweipix on 2018-03-07. -->

<template>
  <div
    ref="bar-container"
    class="slider-bar-container"
    :style="containerStyle">
    <div
      class="range-bar"
      :style="rangeBarStyle">
      <div
        ref="value-bar"
        class="value-bar"
        :style="valueBarStyle">
        <div></div>
      </div>
    </div>
    <div
      ref="slide-block-1"
      class="slide-block"
      @panstart="webStartHandler"
      @panmove="webMoveHandler1"
      @touchstart="weexStartHandler1"
      @touchend="weexEndHandler"
      @horizontalpan="weexHandler1"
      :prevent-move-event="preventMoveEvent"
      :style="blockStyle1">
      <div></div>
    </div>
    <div
      v-if="range"
      ref="slide-block-2"
      class="slide-block"
      @panstart="webStartHandler"
      @panmove="webMoveHandler2"
      @touchstart="weexStartHandler2"
      @touchend="weexEndHandler"
      @horizontalpan="weexHandler2"
      :prevent-move-event="preventMoveEvent"
      :style="blockStyle2">
      <div></div>
    </div>
  </div>
</template>

<script>
  import Utils from '../utils';
  import BindEnv from '../utils/bind-env';
  import Binding from 'weex-bindingx/lib/index.weex.js';

  const animation = weex.requireModule('animation');
  const dom = weex.requireModule('dom');

  export default {
    data: () => ({
      env: 'weex',
      diffX1: 0,
      diffX2: 0,
      barWidth: 0,
      preventMoveEvent: true,
      minDist: 0,
      selectRange: [0, 0],
      blockRadius: 28,
      DPR: 1,
      timeout: 100,
      isAndroid: Utils.env.isAndroid()
    }),
    props: {
      length: {
        type: Number,
        default: 500
      },
      height: {
        type: Number,
        default: 4
      },
      // 是否双滑块模式
      range: {
        type: Boolean,
        default: false
      },
      // 最小值
      min: {
        type: Number,
        default: 0
      },
      // 最大值
      max: {
        type: Number,
        default: 100
      },
      // 最小取值范围，用于范围选择范围最小差值
      minDiff: {
        type: Number,
        default: 5
      },
      // 设置当前取值。当 range 为 false 时，使用 number，否则用 [number, number]
      value: {
        type: [Number, Array],
        default: 0
      },
      // 设置初始取值。当 range 为 false 时，使用 number，否则用 [number, number]
      defaultValue: {
        type: [Number, Array],
        default: 0
      },
      // 值为 true 时，滑块为禁用状态
      disabled: {
        type: Boolean,
        default: false
      },
      invalidColor: {
        type: String,
        default: '#E0E0E0'
      },
      validColor: {
        type: String,
        default: '#EE9900'
      },
      disabledColor: {
        type: String,
        default: '#AAA'
      }
    },
    watch: {
      value(e) {
        if (!this.range) {
          this.diffX1 = this._getDiffX(e || this.defaultValue);
        } else {
          this.diffX1 = this._getDiffX(e[0] || this.defaultValue[0]);
          this.diffX2 = this._getDiffX(e[1] || this.defaultValue[1]);
          this.barWidth = this.diffX2 - this.diffX1;
        }
      }
    },
    created() {
      if (Utils.env.isWeb()) {
        this.env = 'web';
        this.DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
      } else {
        this.DPR = weex.config.env.scale;
      }
    },
    mounted() {
      this.block1 = this.$refs['slide-block-1'];        // 左侧滑块
      this.block2 = this.$refs['slide-block-2'];        // 右侧滑块
      this.valueBar = this.$refs['value-bar'];          // 黄色值条
      this.barContainer = this.$refs['bar-container'];  // 滚动条容器

      if (!this.range) {
        this.diffX1 = this._getDiffX(this.value || this.defaultValue);
      } else {
        this.diffX1 = this._getDiffX(this.value[0] || this.defaultValue[0]);
        this.diffX2 = this._getDiffX(this.value[1] || this.defaultValue[1]);
        this.barWidth = this.diffX2 - this.diffX1;
      }

      // 是否支持expresstionBinding
      if (BindEnv.supportsEB() && Binding.prepare) {
        this.block1 && Binding.prepare({
          anchor: this.block1.ref,
          eventType: 'pan'
        });
        this.block2 && Binding.prepare({
          anchor: this.block2.ref,
          eventType: 'pan'
        });
        this.valueBar && Binding.prepare({
          anchor: this.valueBar.ref,
          eventType: 'pan'
        });
      }

      if (this.range) {
        this.selectRange = this.value || this.defaultValue;                    // 初始化范围选择返回数据
        this.minDist = (this.minDiff / (this.max - this.min)) * this.length;  // 滑块1、2之前最小间距
      }

      // 由于weex在mounted后渲染是异步的不能确保元素渲染完成，需要异步执行
      setTimeout(() => {
        dom.getComponentRect(this.barContainer, option => {
          const { left } = option.size;
          this.leftDiffX = left;
        });
      }, 100);
    },

    computed: {
      containerStyle() {
        return {
          width: `${this.length + 56}px`,
          height: '56px'
        };
      },
      rangeBarStyle() {
        return {
          width: `${this.length}px`,
          height: `${this.height}px`,
          flexDirection: 'row',
          backgroundColor: this.invalidColor
        };
      },
      valueBarStyle() {
        let left = 0;
        let width = 0;

        if (!this.range) {
          left = this.diffX1 - this.length;
          width = this.length;
        } else {
          left = this.diffX1;
          width = this.diffX2 - this.diffX1;
        }

        return {
          width: width + 'px',
          height: this.height + 'px',
          transform: `translateX(${left}px)`,
          backgroundColor: this.disabled ? this.disabledColor : this.validColor
        };
      },
      blockStyle1() {
        let left = this.diffX1;
        return {
          transform: `translateX(${left}px)`
        };
      },
      blockStyle2() {
        return {
          transform: `translateX(${this.diffX2}px)`
        }
      }
    },
    methods: {

      // 更新单选值或最小值
      weexHandler1(e) {
        const self = this;
        switch (e.state) {
          case 'start':
            self.bindBlock1();
            break;
          case 'move':
            dom.getComponentRect(this.block1, option => {
              const { left } = option.size;
              const value = this._getValue(left - this.leftDiffX);
              if (!this.range) {
                this.$emit('updateValue', value);
              } else {
                this.selectRange[0] = value;
                this.$emit('updateValue', this.selectRange);
              }
            });
            break;
          case 'end':
            break;
          default:
            break;
        }
      },

      // 更新最大值
      weexHandler2(e) {
        const self = this;

        switch (e.state) {
          case 'start':
            self.bindBlock2();
            break;
          case 'move':
            dom.getComponentRect(this.block2, option => {
              const { left } = option.size;
              this.selectRange[1] = this._getValue(left - this.leftDiffX);
              this.$emit('updateValue', this.selectRange);
            });
            break;
          case 'end':
            break;
          default:
            break;
        }
      },

      weexStartHandler1() {
        // 由于android端不支持 horizontalpan 的move事件，使用setInterval hack方案
        if (!this.isAndroid) {
          return;
        }
        this.firstInterval = setInterval(() => {
          dom.getComponentRect(this.block1, option => {
            const { left } = option.size;
            const value = this._getValue(left - this.leftDiffX);
            if (!this.range) {
              this.$emit('updateValue', value);
            } else {
              this.selectRange[0] = value;
              this.$emit('updateValue', this.selectRange);
            }
          });
        }, this.timeout);
      },

      weexStartHandler2() {
        if (!this.isAndroid) {
          return;
        }
        // 由于android端不支持 horizontalpan 的move事件，使用setInterval hack方案
        this.secondInterval = setInterval(() => {
          dom.getComponentRect(this.block2, option => {
            const { left } = option.size;
            this.selectRange[1] = this._getValue(left - this.leftDiffX);
            this.$emit('updateValue', this.selectRange);
          });
        }, this.timeout);
      },

      // 清除定时器
      weexEndHandler() {
        if (!this.isAndroid) {
          return;
        }
        this.firstInterval && clearInterval(this.firstInterval);
        this.secondInterval && clearInterval(this.secondInterval);
      },

      webStartHandler(e) {
        if (this.env === 'weex') {
          return;
        }
        this.startX = e.touch.clientX;
        this.startDiffX1 = this.diffX1;
        this.startDiffX2 = this.diffX2;
      },

      webMoveHandler1(e) {
        if (this.env === 'weex' || this.disabled) {
          return;
        }

        const deltaX = (e.touch.clientX - this.startX) * this.DPR;
        const diff = this.startDiffX1 + deltaX;

        let max = this.length;
        if (this.range) {
          max = this.diffX2 - this.minDist;
        }

        if (diff > 0 && diff < max) {
          this.diffX1 = diff;
          animation.transition(this.block1, {
            styles: {
              transform: `translateX(${this.diffX1}px)`
            }
          }, () => {});
          if (!this.range) {
            this.$emit('updateValue', this._getValue(this.diffX1));
          } else {
            this.selectRange[0] = this._getValue(this.diffX1);
            this.$emit('updateValue', this.selectRange);
          }
        }
      },

      webMoveHandler2(e) {
        if (this.env === 'weex' || this.disabled) {
          return;
        }

        const deltaX = (e.touch.clientX - this.startX) * this.DPR;
        const diff = this.startDiffX2 + deltaX;
        const min = this.diffX1 + this.minDist;
        const max = this.length;

        if (diff > min && diff < max) {
          this.diffX2 = diff;
          animation.transition(this.block2, {
            styles: {
              transform: `translateX(${this.diffX2}px)`
            }
          }, () => {});
          if (!this.range) {
            this.$emit('updateValue', this._getValue(this.diffX2));
          } else {
            this.selectRange[1] = this._getValue(this.diffX2);
            this.$emit('updateValue', this.selectRange);
          }
        }
      },

      bindBlock1() {
        const self = this;

        // 如果禁用，不行进行表达式绑定
        if (self.disabled) {
          Binding.unbind({
            token: this.gesToken1,
            eventType: 'pan',
          })
          this.gesToken1 = 0;
          return;
        }

        // 初始化按钮&条的大小范围
        let blockMax1 = 0;
        if (self.range) {
          blockMax1 = self.diffX2 - self.minDist;
        } else {
          blockMax1 = self.length;
        }

        const barMax1 = self.diffX2;

        if (!self.range) {

          const startLeft = self.diffX1 - blockMax1 - self.minDist;

          const props = [{
            element: self.block1.ref,
            property: 'transform.translateX',
            expression: `min(${blockMax1}, max(x + ${self.diffX1}, 0))`
          }, {
            element: self.valueBar.ref,
            property: 'transform.translateX',
            expression: `min(0, max(x + ${startLeft}, -${blockMax1}))`
          }];

          const gesTokenObj = Binding.bind({
            anchor: self.block1.ref,
            eventType: 'pan',
            props
          }, (e) => {
            if (e.state === 'end' || e.state === 'cancel' || e.state === 'exit') {
              const range = self.getRange();
              // 限制diffX1范围
              self.diffX1 = self._restrictValue(range.rangeX1, self.diffX1 + e.deltaX);
              self.bindBlock1();
            }
          });
          this.gesToken1 = gesTokenObj.token;
        } else {

          // 选范围
          const props = [{
            element: self.block1.ref,
            property: 'transform.translateX',
            expression: `min(${blockMax1}, max(x + ${self.diffX1}, 0))`
          }, {
            element: self.valueBar.ref,
            property: 'transform.translateX',
            expression: `min(${blockMax1}, max(x + ${self.diffX1}, 0))`
          }, {
            element: self.valueBar.ref,
            property: 'width',
            expression: `min(${barMax1}, max(0, ${self.barWidth} - x))`
          }];

          const gesTokenObj = Binding.bind({
            anchor: self.block1.ref,
            eventType: 'pan',
            props
          }, (e) => {
            if (e.state === 'end' || e.state === 'cancel' || e.state === 'exit') {
              const range = self.getRange();
              self.barWidth = self._restrictValue(range.rangeX1, self.barWidth - e.deltaX);
              self.diffX1 = self._restrictValue(range.rangeX1, self.diffX1 + e.deltaX);
              self.bindBlock1();
            }
          });
          this.gesToken1 = gesTokenObj.token;
        }
      },

      bindBlock2() {
        const self = this;

        // 如果禁用，不行进行表达式绑定
        if (self.disabled) {
          Binding.unbind({
            token: this.gesToken2,
            eventType: 'pan',
          });
          this.gesToken2 = 0;
          return;
        }

        // 初始化按钮&条的大小范围
        let blockMax1 = 0;
        if (self.range) {
          blockMax1 = self.diffX2 - self.minDist;
        } else {
          blockMax1 = self.length;
        }

        const blockMax2 = self.length;
        const blockMin2 = self.diffX1 + self.minDist;
        const barMax2 = self.length - self.diffX1;

        const props = [{
          element: self.block2.ref,
          property: 'transform.translateX',
          expression: `min(${blockMax2}, max(x + ${self.diffX2}, ${blockMin2}))`
        }, {
          element: self.valueBar.ref,
          property: 'width',
          expression: `min(${barMax2}, max(0, x + ${self.barWidth}))`
        }];

        const gesTokenObj = Binding.bind({
          anchor: self.block2.ref,
          eventType: 'pan',
          props
        }, (e) => {
          if (e.state === 'end' || e.state === 'cancel' || e.state === 'exit') {
            const range = self.getRange();
            self.barWidth = self._restrictValue([0, self.length - self.diffX1], self.barWidth + e.deltaX);
            self.diffX2 = self._restrictValue(range.rangeX2, self.diffX2 + e.deltaX);
            self.bindBlock2();
          }
        });
        this.gesToken2 = gesTokenObj.token;
      },

      // 获取diffx1 diffx2 取值范围
      getRange() {
        if (!this.range) {
          return {
            rangeX1: [0, this.length]
          }
        } else {
          return {
            rangeX1: [0, this.diffX2 - this.minDist],
            rangeX2: [this.diffX1 + this.minDist, this.length]
          }
        }
      },

      // 限制取值范围
      _restrictValue(range, value) {
        if (range && range.length && range.length === 2) {
          if (value < range[0]) {
            return range[0];
          } else if (value > range[1]) {
            return range[1];
          } else {
            return value;
          }
        }
        return;
      },

      // 根据x方向偏移量计算value
      _getValue(diffX) {
        return Math.round((diffX / this.length) * (this.max - this.min) + this.min);
      },

      // 根据value和length计算x方向偏移值
      _getDiffX(value) {
        return ((value - this.min) / (this.max - this.min)) * this.length;
      }
    }
  }
</script>

<style scoped>
  .slider-bar-container {
    height: 56px;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }


  .range-bar{
    overflow: hidden;
  }

  .value-bar {
    height: 4px;
    overflow: hidden;
  }

  .slide-block {
    width: 56px;
    height: 56px;
    background-color: #ffffff;
    border-radius: 28px;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.1);
    position: absolute;
    left: 0;
    bottom: 0;
  }
</style>
