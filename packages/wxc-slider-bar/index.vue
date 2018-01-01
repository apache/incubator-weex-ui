<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by 走鹃 on 2017-05-09. -->

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
      @touchstart="_weexStartHandler1"
      @panstart="_webStartHandler"
      @panmove="_webMoveHandler1"
      @touchend="_weexEndHandler"
      @horizontalpan="dispatchPan"
      :prevent-move-event="preventMoveEvent"
      :style="blockStyle1">
      <div></div>
    </div>
    <div
      v-if="range"
      ref="slide-block-2"
      class="slide-block"
      @touchstart="_weexStartHandler2"
      @panstart="_webStartHandler"
      @panmove="_webMoveHandler2"
      @touchend="_weexEndHandler"
      @horizontalpan="dispatchPan"
      :prevent-move-event="preventMoveEvent"
      :style="blockStyle2">
      <div></div>
    </div>
  </div>
</template>

<script>
  import Utils from '../utils';

  const EB = weex.requireModule('expressionBinding');
  const animation = weex.requireModule('animation');
  const dom = weex.requireModule('dom');

  export default {
    data: () => ({
      env: 'weex',
      diffX1: 0,
      diffX2: 0,
      barWidth: 0,
      preventMoveEvent: true,
      timeout: 100,
      minDiffX: 0,
      selectRange: [0, 0]
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
    created () {
      if (Utils.env.isWeb()) {
        this.env = 'web';
      }
    },
    mounted () {
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
      if (Utils.env.supportsEB()) {
        this.block1 && EB.enableBinding(this.block1.ref, 'pan');
        this.block2 && EB.enableBinding(this.block2.ref, 'pan');
        this.valueBar && EB.enableBinding(this.valueBar.ref, 'pan');
      }
      if (Utils.env.isAndroid()) {
        this.timeout = 250;
      }
      if (this.range) {
        this.selectRange = this.value || this.defaultValue;                    // 初始化范围选择返回数据
        this.minDiffX = (this.minDiff / (this.max - this.min)) * this.length;  // 滑块1、2之前最小间距
      }
      // 由于weex在mounted后渲染是异步的不能确保元素渲染完成，需要异步执行
      setTimeout(() => {
        dom.getComponentRect(this.barContainer, option => {
          const { left } = option.size;
          this.leftDiffX = left;
        });
      }, 100);

      this.bindExp();
    },
    computed: {
      containerStyle () {
        return {
          width: this.length + 56 + 'px',
          height: '56px'
        };
      },
      rangeBarStyle () {
        return {
          width: this.length + 'px',
          height: this.height + 'px',
          flexDirection: 'row',
          backgroundColor: this.invalidColor
        };
      },
      valueBarStyle () {
        let left = 0;
        let width = 0
        if (!this.range) {
          width = this.diffX1;
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
      blockStyle1 () {
        return {
          transform: `translateX(${this.diffX1}px)`
        };
      },
      blockStyle2 () {
        return {
          transform: `translateX(${this.diffX2}px)`
        }
      }
    },
    methods: {
      dispatchPan () {},

      // 更新单选值或最小值
      _weexStartHandler1 () {
        this.firstInterval = setInterval(() => {
          if (!this.range) {
            dom.getComponentRect(this.valueBar, option => {
              const { width } = option.size;
              const value = this._getValue(width);
              this.$emit('updateValue', value);
            });
          } else {
            dom.getComponentRect(this.block1, option => {
              const { left } = option.size;
              this.selectRange[0] = this._getValue(left - this.leftDiffX);
              this.$emit('updateValue', this.selectRange);
            });
          }
        }, this.timeout);
      },

      // 更新最大值
      _weexStartHandler2 () {
        this.secondInterval = setInterval(() => {
          dom.getComponentRect(this.block2, option => {
            const { left } = option.size;
            this.selectRange[1] = this._getValue(left - this.leftDiffX);
            this.$emit('updateValue', this.selectRange);
          });
        }, this.timeout);
      },

      // 清除定时器
      _weexEndHandler () {
        this.firstInterval && clearInterval(this.firstInterval);
        this.secondInterval && clearInterval(this.secondInterval);
      },

      _webStartHandler (e) {
        if (this.env === 'weex') {
          return;
        }
        this.startX = e.touch.clientX;
        this.startDiffX1 = this.diffX1;
        this.startDiffX2 = this.diffX2;
      },

      _webMoveHandler1 (e) {
        if (this.env === 'weex' || this.disabled) {
          return;
        }
        const deltaX = e.touch.clientX - this.startX;
        const diff = this.startDiffX1 + deltaX;
        let max = this.length;
        if (this.range) {
          max = this.diffX2 - this.minDiffX;
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

      _webMoveHandler2 (e) {
        if (this.env === 'weex' || this.disabled) {
          return;
        }
        const deltaX = e.touch.clientX - this.startX;
        const diff = this.startDiffX2 + deltaX;
        const min = this.diffX1 + this.minDiffX;
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

      bindExp () {
        const self = this;

        // 如果禁用，不行进行表达式绑定
        if (self.disabled) {
          return;
        }

        // 初始化按钮&条的大小范围
        let blockMax1 = 0;
        if (self.range) {
          blockMax1 = self.diffX2 - self.minDiffX;
        } else {
          blockMax1 = self.length;
        }

        const blockMax2 = self.length;
        const blockMin2 = self.diffX1 + self.minDiffX;
        const barMax1 = self.diffX2;
        const barMax2 = self.length - self.diffX1;

        // 滑块1表达式
        var expBlock1 = `{\"type\":\"CallExpression\",\"children\":[{\"type\":\"Identifier\",\"value\":\"min\"},{\"type\":\"Arguments\",\"children\":[{\"type\":\"NumericLiteral\",\"value\":${blockMax1}},{\"type\":\"CallExpression\",\"children\":[{\"type\":\"Identifier\",\"value\":\"max\"},{\"type\":\"Arguments\",\"children\":[{\"type\":\"+\",\"children\":[{\"type\":\"Identifier\",\"value\":\"x\"},{\"type\":\"NumericLiteral\",\"value\":${self.diffX1}}]},{\"type\":\"NumericLiteral\",\"value\":0}]}]}]}]}`;
        // 滑块2表达式
        var expBlock2 = `{\"type\":\"CallExpression\",\"children\":[{\"type\":\"Identifier\",\"value\":\"min\"},{\"type\":\"Arguments\",\"children\":[{\"type\":\"NumericLiteral\",\"value\":${blockMax2}},{\"type\":\"CallExpression\",\"children\":[{\"type\":\"Identifier\",\"value\":\"max\"},{\"type\":\"Arguments\",\"children\":[{\"type\":\"+\",\"children\":[{\"type\":\"Identifier\",\"value\":\"x\"},{\"type\":\"NumericLiteral\",\"value\":${self.diffX2}}]},{\"type\":\"NumericLiteral\",\"value\":${blockMin2}}]}]}]}]}`;
        // valuebar表达式
        var expBar1 = `{\"type\":\"CallExpression\",\"children\":[{\"type\":\"Identifier\",\"value\":\"min\"},{\"type\":\"Arguments\",\"children\":[{\"type\":\"NumericLiteral\",\"value\":${barMax1}},{\"type\":\"CallExpression\",\"children\":[{\"type\":\"Identifier\",\"value\":\"max\"},{\"type\":\"Arguments\",\"children\":[{\"type\":\"NumericLiteral\",\"value\":0},{\"type\":\"-\",\"children\":[{\"type\":\"NumericLiteral\",\"value\":${self.barWidth}},{\"type\":\"Identifier\",\"value\":\"x\"}]}]}]}]}]}`;
        // valuebar 范围表达式
        var expBar2 = `{\"type\":\"CallExpression\",\"children\":[{\"type\":\"Identifier\",\"value\":\"min\"},{\"type\":\"Arguments\",\"children\":[{\"type\":\"NumericLiteral\",\"value\":${barMax2}},{\"type\":\"CallExpression\",\"children\":[{\"type\":\"Identifier\",\"value\":\"max\"},{\"type\":\"Arguments\",\"children\":[{\"type\":\"NumericLiteral\",\"value\":0},{\"type\":\"+\",\"children\":[{\"type\":\"NumericLiteral\",\"value\":${self.barWidth}},{\"type\":\"Identifier\",\"value\":\"x\"}]}]}]}]}]}`;

        if (!self.range) {
          // 单选
          const args = [{
            element: self.block1.ref,
            property: 'transform.translateX',
            expression: expBlock1
          }, {
            element: self.valueBar.ref,
            property: 'width',
            expression: expBlock1
          }];
          EB && EB.createBinding(self.block1.ref, 'pan', '', args, e => {
            if (e.state === 'end') {
              const range = self.getRange();
              // 限制diffX1范围
              self.diffX1 = self._restrictValue(range.rangeX1, self.diffX1 + e.deltaX);
              self.bindExp();
            }
          });
        } else {
          // 选范围
          const args = [{
            element: self.block1.ref,
            property: 'transform.translateX',
            expression: expBlock1
          }, {
            element: self.valueBar.ref,
            property: 'transform.translateX',
            expression: expBlock1
          }, {
            element: self.valueBar.ref,
            property: 'width',
            expression: expBar1
          }];

          const args2 = [{
            element: self.block2.ref,
            property: 'transform.translateX',
            expression: expBlock2
          }, {
            element: self.valueBar.ref,
            property: 'width',
            expression: expBar2
          }];

          EB && EB.createBinding(self.block1.ref, 'pan', '', args, e => {
            if (e.state === 'end') {
              const range = self.getRange();
              self.barWidth = self._restrictValue(range.rangeX1, self.barWidth - e.deltaX);
              self.diffX1 = self._restrictValue(range.rangeX1, self.diffX1 + e.deltaX);
              self.bindExp();
            }
          });

          EB && EB.createBinding(self.block2.ref, 'pan', '', args2, e => {
            if (e.state === 'end') {
              const range = self.getRange();
              self.diffX2 = self._restrictValue(range.rangeX2, self.diffX2 + e.deltaX);
              self.barWidth = self._restrictValue([0, self.length - self.diffX1], self.barWidth + e.deltaX);
              self.bindExp();
            }
          });
        }
      },

      // 获取diffx1 diffx2 取值范围
      getRange (deltaX) {
        if (!this.range) {
          return {
            rangeX1: [0, this.length]
          }
        } else {
          return {
            rangeX1: [0, this.diffX2 - this.minDiffX],
            rangeX2: [this.diffX1 + this.minDiffX, this.length]
          }
        }
      },

      // 限制取值范围
      _restrictValue (range, value) {
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
      _getValue (diffX) {
        return Math.round((diffX / this.length) * (this.max - this.min) + this.min);
      },

      // 根据value和length计算x方向偏移值
      _getDiffX (value) {
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
  }

  .value-bar {
    height: 4px;
  }

  .slide-block {
    width: 56px;
    height: 56px;
    background-color: #ffffff;
    border-radius: 28px;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.1);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
    position: absolute;
    left: 0;
    bottom: 0;
  }
</style>
