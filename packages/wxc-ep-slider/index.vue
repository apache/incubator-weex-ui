<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/07/28. -->

<template>
  <div :style="containerS">
    <div :ref="`sliderCtn_${sliderId}`"
         class="slider-content"
         :prevent-move-event="preventMove"
         :style="{width:cardWidth,height:cardS.height+'px',transform: `translateX(-${currentIndex * (cardS.width + cardS.spacing)}px)`}"
         @panstart="onTouchStart"
         @panmove="onTouchMove"
         @panend="onTouchEnd"
         @horizontalpan="onEpTouchStart">
      <div class="slider"
           v-for="(v,index) in cardList"
           :ref="`card${index}_${sliderId}`"
           :style="{transform: `scale(${index===currentIndex ? 1 : cardS.scale})`,left: `${index * cardS.width}px`,marginLeft:`${(containerS.width - cardS.width) / 2}px`,width: cardS.width+'px', height: cardS.height+'px'}">
        <slot :name="`card${index}_${sliderId}`"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>

  .slider-content {
    position: relative;
  }

  .slider {
    position: absolute;
    top: 0;
  }
</style>

<script>
  const expressionBinding = weex.requireModule('expressionBinding');
  const animation = weex.requireModule('animation');

  import Utils from './utils';

  export default {
    props: {
      sliderId: {
        type: [String, Number],
        default: 1
      },
      panOffset: {
        type: Number,
        default: 80
      },
      cardLength: {
        type: Number,
        default: 1
      },
      selectIndex: {
        type: Number,
        default: 0
      },
      enableSwipe: {
        type: Boolean,
        default: true
      },
      containerS: {
        type: Object,
        default: () => ({
          position: 'relative',
          width: 750,
          height: 352,
          overflow: 'hidden'
        })
      },
      cardS: {
        type: Object,
        default: () => ({
          width: 360,
          height: 300,
          spacing: 0,
          scale: 0.75
        })
      }
    },
    data: () => ({
      preventMove: true,
      moving: false,
      firstTouch: true,
      startX: 0,
      startTime: 0,
      currentIndex: 0
    }),
    computed: {
      cardList () {
        return new Array(this.cardLength + 1).join().split('');
      },
      cardWidth () {
        return (this.cardLength - 1) * this.cardS.width + this.containerS.width + 235 + 'px';
      }
    },
    created () {
      this.currentIndex = this.selectIndex;
    },
    mounted () {
      setTimeout(() => {
        const sliderCtn = this.$refs[`sliderCtn_${this.sliderId}`];
        if (Utils.env.supportsEB() && sliderCtn && sliderCtn.ref) {
          expressionBinding.enableBinding(sliderCtn.ref, 'pan');
        }
      }, 10);
    },
    methods: {
      onTouchStart (e) {
        if (Utils.env.supportsEB()) {
          return;
        }
        this.startX = e.changedTouches[0].clientX;
        this.startTime = Date.now();
      },
      onTouchMove (e) {
        if (Utils.env.supportsEB()) {
          return;
        }
        const moveX = e.changedTouches[0].clientX - this.startX;
        const index = this.loopedIndex(this.currentIndex, this.cardLength);
        const cardLength = this.cardLength;
        const currentCardLeft = this.currentIndex * (this.cardS.width + this.cardS.spacing);
        const sliderCtn = this.$refs[`sliderCtn_${this.sliderId}`];
        animation.transition(sliderCtn, {
          styles: {
            transform: `translateX(${moveX - currentCardLeft}px)`
          },
          timingFunction: 'ease',
          delay: 0,
          duration: 0
        }, () => {
        });
        if (this.cardS.scale !== 1) {
          const currentCard = this.$refs[`card${this.loopedIndex(index, cardLength)}_${this.sliderId}`][0];
          animation.transition(currentCard, {
            styles: {
              transform: `scale(${1 - Math.abs(moveX) / (this.cardS.width) * (1 - this.cardS.scale)})`
            },
            timingFunction: 'ease',
            delay: 0,
            duration: 0
          }, () => {
          });
          // 左边的卡片
          const leftCard = this.$refs[`card${this.loopedIndex(index - 1, cardLength)}_${this.sliderId}`][0];
          // loop 函数负数返回 0，这里有点冲突
          if (leftCard && index !== 0) {
            animation.transition(leftCard, {
              styles: {
                transform: `scale(${1 - Math.abs(moveX - this.cardS.width) / (this.cardS.width) * (1 - this.cardS.scale)})`
              },
              timingFunction: 'ease',
              delay: 0,
              duration: 0
            }, () => {
            });
          }
          // 右边卡片
          const rightCard = this.$refs[`card${this.loopedIndex(index + 1, cardLength)}_${this.sliderId}`][0];
          if (rightCard) {
            animation.transition(rightCard, {
              styles: {
                transform: `scale(${1 - Math.abs(this.cardS.width + moveX) / (this.cardS.width) * (1 - this.cardS.scale)})`
              },
              timingFunction: 'ease',
              delay: 0,
              duration: 0
            }, () => {
            });
          }
        }
      },
      onTouchEnd (e) {
        if (Utils.env.supportsEB()) {
          return;
        }
        this.moving = true;
        const moveX = e.changedTouches[0].clientX - this.startX;
        const originIndex = this.currentIndex;
        const cardLength = this.cardLength;
        let selectIndex = originIndex;
        const panOffset = (this.panOffset || this.cardS.width / 2);

        if (moveX < -panOffset) {
          if (this.loop || selectIndex !== cardLength - 1) {
            selectIndex++;
          }
        } else if (moveX > panOffset) {
          if (this.loop || selectIndex !== 0) {
            selectIndex--;
          }
        }
        this.slideTo(originIndex, selectIndex);
      },
      onEpTouchStart (e) {
        if (Utils.env.supportsEB() && e.state === 'start' || (e.state === 'move' && this.firstTouch)) {
          this.firstTouch = false;
          const sliderCtn = this.$refs[`sliderCtn_${this.sliderId}`];
          this.bindExp(sliderCtn);
        }
      },
      panEnd (e) {
        if (e.state === 'end' || e.state === 'cancel' || e.state === 'exit') {
          this.firstTouch = true;
          this.moving = true;
          const moveX = e.deltaX;
          const originIndex = this.currentIndex;
          let selectIndex = originIndex;
          const duration = Date.now() - this.startTime;
          const panOffset = this.panOffset || (this.cardS.width / 2);
          if (moveX < -panOffset || (this.enableSwipe && moveX < -10 && duration < 200)) {
            if (selectIndex !== this.cardLength - 1) {
              selectIndex++;
            }
          } else if (moveX > panOffset || (this.enableSwipe && moveX > 10 && duration < 500)) {
            if (selectIndex !== 0) {
              selectIndex--;
            }
          }
          this.slideTo(originIndex, selectIndex);
        }
      },
      slideTo (originIndex, selectIndex) {
        let currentCardScale = 1;
        let rightCardScale = this.cardS.scale;
        let leftCardScale = this.cardS.scale;
        this.$emit('wxcEpSliderCurrentIndexSelected', { currentIndex: selectIndex });
        if (originIndex < selectIndex) {
          currentCardScale = this.cardS.scale;
          rightCardScale = 1;
        } else if (originIndex > selectIndex) {
          currentCardScale = this.cardS.scale;
          leftCardScale = 1;
        }
        const currentCard = this.$refs[`card${this.loopedIndex(originIndex, this.cardLength)}_${this.sliderId}`][0];
        animation.transition(currentCard, {
          styles: {
            transform: `scale(${currentCardScale})`
          },
          timingFunction: 'ease',
          delay: 0,
          duration: 300
        }, () => {
        });
        const leftCard = this.$refs[`card${this.loopedIndex(originIndex - 1, this.cardLength)}_${this.sliderId}`][0];
        if (leftCard && originIndex !== 0) {
          animation.transition(leftCard, {
            styles: {
              transform: `scale(${leftCardScale})`
            },
            timingFunction: 'ease',
            delay: 0,
            duration: 300
          }, () => {
          });
        }
        const rightCard = this.$refs[`card${this.loopedIndex(originIndex + 1, this.cardLength)}_${this.sliderId}`][0];
        if (rightCard && originIndex !== this.cardLength - 1) {
          animation.transition(rightCard, {
            styles: {
              transform: `scale(${rightCardScale})`
            },
            timingFunction: 'ease',
            delay: 0,
            duration: 300
          }, () => {
          });
        }
        const sliderCtn = this.$refs[`sliderCtn_${this.sliderId}`];
        animation.transition(sliderCtn, {
          styles: {
            transform: `translateX(-${selectIndex * (this.cardS.width + this.cardS.spacing)}px)`
          },
          timingFunction: 'ease',
          delay: 0,
          duration: 300
        }, () => {
          this.moving = false;
          if (originIndex !== selectIndex) {
            this.currentIndex = selectIndex;
          }
        });
      },
      // 使index维持在0-length之间循环
      loopedIndex (index, total) {
        if (index < 0) {
          index = index + (1 - index / total) * total;
        }
        return index % total;
      },
      bindExp (element) {
        if (element && element.ref && !this.moving) {
          this.startTime = Date.now();
          const index = this.loopedIndex(this.currentIndex, this.cardLength);
          const sliderCtn = this.$refs[`sliderCtn_${this.sliderId}`];
          const currentCard = this.$refs[`card${index}_${this.sliderId}`][0];
          let rightCard = null;
          let leftCard = null;
          const currentCardLeft = this.currentIndex * (this.cardS.width + this.cardS.spacing);
          // 卡片容器
          // x - currentCardLeft
          const sliderCtnExpOri = `x - ${currentCardLeft}`;
          const sliderCtnExp = `{\"type\":\"-\",\"children\":[{\"type\":\"Identifier\",\"value\":\"x\"},{\"type\":\"NumericLiteral\",\"value\":${currentCardLeft}}]}`;
          const args = [
            {
              element: sliderCtn.ref,
              property: 'transform.translateX',
              expression: sliderCtnExp,
              'ori_expression': sliderCtnExpOri
            }
          ];

          if (this.cardS.scale !== 1) {
            // 当前显示的卡片
            // 1-abs(x)/588*${1-this.cardS.scale}
            const currentCardExpOri = `1-abs(x)/${this.cardS.width}*${1 - this.cardS.scale}`;
            const currentCardExp = `{\"type\":\"-\",\"children\":[{\"type\":\"NumericLiteral\",\"value\":1},{\"type\":\"*\",\"children\":[{\"type\":\"/\",\"children\":[{\"type\":\"CallExpression\",\"children\":[{\"type\":\"Identifier\",\"value\":\"abs\"},{\"type\":\"Arguments\",\"children\":[{\"type\":\"Identifier\",\"value\":\"x\"}]}]},{\"type\":\"NumericLiteral\",\"value\":${this.cardS.width}}]},{\"type\":\"NumericLiteral\",\"value\":${1 - this.cardS.scale}}]}]}`;
            args.push({
              element: currentCard.ref,
              property: 'transform.scale',
              expression: currentCardExp,
              'ori_expression': currentCardExpOri
            });

            if (index === 0) {
              // 右边卡片
              rightCard = this.$refs[`card${index + 1}_${this.sliderId}`][0];
              // 1-abs(588+x)/588*${1-this.cardS.scale}
              const rightCardExpOri = `{sx: 1-abs(${this.cardS.width}+x)/${this.cardS.width}*${1 - this.cardS.scale}, sy: 1-abs(${this.cardS.width}+x)/${this.cardS.width}*${1 - this.cardS.scale}}`;
              const rightCardExp = `{\"type\":\"-\",\"children\":[{\"type\":\"NumericLiteral\",\"value\":1},{\"type\":\"*\",\"children\":[{\"type\":\"/\",\"children\":[{\"type\":\"CallExpression\",\"children\":[{\"type\":\"Identifier\",\"value\":\"abs\"},{\"type\":\"Arguments\",\"children\":[{\"type\":\"+\",\"children\":[{\"type\":\"NumericLiteral\",\"value\":${this.cardS.width}},{\"type\":\"Identifier\",\"value\":\"x\"}]}]}]},{\"type\":\"NumericLiteral\",\"value\":${this.cardS.width}}]},{\"type\":\"NumericLiteral\",\"value\":${1 - this.cardS.scale}}]}]}`;
              args.push({
                element: rightCard.ref,
                property: 'transform.scale',
                expression: rightCardExp,
                'ori_expression': rightCardExpOri
              });
            } else if (index === this.cardLength - 1) {
              // 左边的卡片
              leftCard = this.$refs[`card${index - 1}_${this.sliderId}`][0];
              // 1-abs(x-${this.cardS.width})/${this.cardS.width}*${1-this.cardS.scale}
              const leftCardExpOri = `{sx: 1-abs(x-${this.cardS.width})/${this.cardS.width}*${1 - this.cardS.scale}, sy: 1-abs(x-${this.cardS.width})/${this.cardS.width}*${1 - this.cardS.scale}}`;
              const leftCardExp = `{\"type\":\"-\",\"children\":[{\"type\":\"NumericLiteral\",\"value\":1},{\"type\":\"*\",\"children\":[{\"type\":\"/\",\"children\":[{\"type\":\"CallExpression\",\"children\":[{\"type\":\"Identifier\",\"value\":\"abs\"},{\"type\":\"Arguments\",\"children\":[{\"type\":\"-\",\"children\":[{\"type\":\"Identifier\",\"value\":\"x\"},{\"type\":\"NumericLiteral\",\"value\":${this.cardS.width}}]}]}]},{\"type\":\"NumericLiteral\",\"value\":${this.cardS.width}}]},{\"type\":\"NumericLiteral\",\"value\":${1 - this.cardS.scale}}]}]}`;
              args.push({
                element: leftCard.ref,
                property: 'transform.scale',
                expression: leftCardExp,
                'ori_expression': leftCardExpOri
              });
            } else {
              // 左边卡片
              leftCard = this.$refs[`card${index - 1}_${this.sliderId}`][0];
              // 1-abs(x-${this.cardS.width})/${this.cardS.width}*${1-this.cardS.scale}
              const leftCardExpOri = `{sx: 1-abs(x-${this.cardS.width})/${this.cardS.width}*${1 - this.cardS.scale}, sy: 1-abs(x-${this.cardS.width})/${this.cardS.width}*${1 - this.cardS.scale}}`;
              const leftCardExp = `{\"type\":\"-\",\"children\":[{\"type\":\"NumericLiteral\",\"value\":1},{\"type\":\"*\",\"children\":[{\"type\":\"/\",\"children\":[{\"type\":\"CallExpression\",\"children\":[{\"type\":\"Identifier\",\"value\":\"abs\"},{\"type\":\"Arguments\",\"children\":[{\"type\":\"-\",\"children\":[{\"type\":\"Identifier\",\"value\":\"x\"},{\"type\":\"NumericLiteral\",\"value\":${this.cardS.width}}]}]}]},{\"type\":\"NumericLiteral\",\"value\":${this.cardS.width}}]},{\"type\":\"NumericLiteral\",\"value\":${1 - this.cardS.scale}}]}]}`;

              args.push({
                element: leftCard.ref,
                property: 'transform.scale',
                expression: leftCardExp,
                'ori_expression': leftCardExpOri
              });

              // 右边卡片
              rightCard = this.$refs[`card${index + 1}_${this.sliderId}`][0];
              // 1-abs(${this.cardS.width}+x)/${this.cardS.width}*${1-this.cardS.scale}
              const rightCardExpOri = `{sx: 1-abs(${this.cardS.width}+x)/${this.cardS.width}*${1 - this.cardS.scale}, sy: 1-abs(${this.cardS.width}+x)/${this.cardS.width}*${1 - this.cardS.scale}}`;
              const rightCardExp = `{\"type\":\"-\",\"children\":[{\"type\":\"NumericLiteral\",\"value\":1},{\"type\":\"*\",\"children\":[{\"type\":\"/\",\"children\":[{\"type\":\"CallExpression\",\"children\":[{\"type\":\"Identifier\",\"value\":\"abs\"},{\"type\":\"Arguments\",\"children\":[{\"type\":\"+\",\"children\":[{\"type\":\"NumericLiteral\",\"value\":${this.cardS.width}},{\"type\":\"Identifier\",\"value\":\"x\"}]}]}]},{\"type\":\"NumericLiteral\",\"value\":${this.cardS.width}}]},{\"type\":\"NumericLiteral\",\"value\":${1 - this.cardS.scale}}]}]}`;
              args.push({
                element: rightCard.ref,
                property: 'transform.scale',
                expression: rightCardExp,
                'ori_expression': rightCardExpOri
              });
            }
          }
          expressionBinding.createBinding(element.ref, 'pan', '', args, (e) => {
            if (!this.moving) {
              this.panEnd(e);
            }
          });
        }
      }
    }
  }
</script>
