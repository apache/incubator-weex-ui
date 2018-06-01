<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/07/28. -->

<template>
  <div :style="containerS">
    <div :ref="`sliderCtn_${sliderId}`"
         :style="{width:cardWidth+'px',height:cardS.height+'px',transform: `translateX(-${currentIndex * (cardS.width + cardS.spacing)}px)`}"
         @panstart="onPanStart"
         @panmove="onPanMove"
         @panend="onPanEnd"
         @horizontalpan="onEpPanStart">
      <div class="slider"
           v-for="(v,index) in cardList"
           :ref="`card${index}_${sliderId}`"
           :style="{transform: `scale(${index===currentIndex ? 1 : cardS.scale})`,left: `${index * (cardS.width+cardS.spacing)}px`,marginLeft:`${(containerS.width - cardS.width) / 2}px`,width: cardS.width+'px', height: cardS.height+'px'}">
        <slot :name="`card${index}_${sliderId}`"></slot>
      </div>
      <slot name="pull-more"></slot>
    </div>
  </div>
</template>

<style scoped>
  .slider {
    position: absolute;
    top: 0;
  }
</style>

<script>
  const swipeBack = weex.requireModule('swipeBack');
  const animation = weex.requireModule('animation');
  import Utils from '../utils';
  import BindEnv from '../utils/bind-env';
  import Binding from 'weex-bindingx/lib/index.weex.js';

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
          height: 352
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
      },
      autoPlay: {
        type: Boolean,
        default: false
      },
      interval: {
        type: [Number, String],
        default: 1200
      }
    },
    data: () => ({
      isMoving: false,
      gesToken: 0,
      startX: 0,
      startTime: 0,
      currentIndex: 0,
      autoPlayTimer: null
    }),
    computed: {
      cardList () {
        return new Array(this.cardLength + 1).join().split('');
      },
      cardWidth () {
        return (this.cardLength - 1) * this.cardS.width + this.containerS.width + 235;
      }
    },
    created () {
      this.currentIndex = this.selectIndex;
    },
    mounted () {
      // ios和页面返回冲突，组件里面将ios系统横滑返回禁止
      if (swipeBack && swipeBack.forbidSwipeBack) {
        swipeBack.forbidSwipeBack(true);
      }

      setTimeout(() => {
        const sliderCtn = this.$refs[`sliderCtn_${this.sliderId}`];
        if (BindEnv.supportsEB() && sliderCtn && sliderCtn.ref) {
          Binding.prepare && Binding.prepare({
            anchor: sliderCtn.ref,
            eventType: 'pan'
          });
        }
      }, 20);
      this.checkNeedAutoPlay();
    },
    methods: {
      onPanStart (e) {
        if (BindEnv.supportsEB()) {
          return;
        }
        this.clearAutoPlay();
        this.startX = e.changedTouches[0].clientX;
        this.startTime = Date.now();
      },
      onPanMove (e) {
        if (BindEnv.supportsEB()) {
          return;
        }
        const moveX = e.changedTouches[0].clientX - this.startX;
        const index = this.loopedIndex(this.currentIndex, this.cardLength);
        const cardLength = this.cardLength;
        const currentCardLeft = this.currentIndex * (this.cardS.width + this.cardS.spacing);

        const sliderCtn = this.$refs[`sliderCtn_${this.sliderId}`];
        sliderCtn && animation.transition(sliderCtn, {
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
          currentCard && animation.transition(currentCard, {
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
          rightCard && animation.transition(rightCard, {
            styles: {
              transform: `scale(${1 - Math.abs(this.cardS.width + moveX) / (this.cardS.width) * (1 - this.cardS.scale)})`
            },
            timingFunction: 'ease',
            delay: 0,
            duration: 0
          }, () => {
          });
        }
      },
      onEpPanStart (e) {
        if (BindEnv.supportsEB() && e.state === 'start') {
          this.clearAutoPlay();
          setTimeout(() => {
            const sliderCtn = this.$refs[`sliderCtn_${this.sliderId}`];
            this.bindExp(sliderCtn);
          }, 0)
        }
      },
      onPanEnd (e) {
        if (BindEnv.supportsEB()) {
          return;
        }
        this.panEnd(e);
      },
      panEnd (e) {
        this.isMoving = true;
        let moveX = e.deltaX;

        if (Utils.env.isWeb()) {
          moveX = e.changedTouches[0].clientX - this.startX;
        }

        const originIndex = this.currentIndex;
        let selectIndex = originIndex;
        const duration = Date.now() - this.startTime;
        const panOffset = this.panOffset || (this.cardS.width / 2);
        const isPullMore = (selectIndex === this.cardLength - 1 && (moveX < -68 || (moveX < -10 && duration < 200)));

        if(isPullMore){
            this.$emit('wxcEpSliderPullMore', { currentIndex: selectIndex });
        }

        if (moveX < -panOffset || (moveX < -10 && duration < 200)) {
          if (selectIndex !== this.cardLength - 1) {
            selectIndex++;
          }
        } else if (moveX > panOffset || (moveX > 10 && duration < 500)) {
          if (selectIndex !== 0) {
            selectIndex--;
          }
        }

        this.slideTo(originIndex, selectIndex);
        setTimeout(() => { this.checkNeedAutoPlay() }, 3000);
      },
      slideTo (originIndex, selectIndex) {
        let currentCardScale = 1;
        let rightCardScale = this.cardS.scale;
        let leftCardScale = this.cardS.scale;
        const duration = (selectIndex === 0 && originIndex === this.cardLength - 1 && this.cardLength !== 2) ? 0.00001 : 300;
        this.$emit('wxcEpSliderCurrentIndexSelected', { currentIndex: selectIndex });
        if (originIndex < selectIndex) {
          currentCardScale = this.cardS.scale;
          rightCardScale = 1;
        } else if (originIndex > selectIndex) {
          currentCardScale = this.cardS.scale;
          leftCardScale = 1;
        }
        const currentCard = this.$refs[`card${this.loopedIndex(originIndex, this.cardLength)}_${this.sliderId}`][0];
        currentCard && animation.transition(currentCard, {
          styles: {
            transform: `scale(${currentCardScale})`
          },
          timingFunction: 'ease',
          duration
        }, () => {
        });

        const leftCard = this.$refs[`card${this.loopedIndex(originIndex - 1, this.cardLength)}_${this.sliderId}`][0];
        if (this.isMoving && leftCard && originIndex !== 0) {
          animation.transition(leftCard, {
            styles: {
              transform: `scale(${leftCardScale})`
            },
            timingFunction: 'ease',
            duration
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
            duration
          }, () => {
          });
        }

        const sliderCtn = this.$refs[`sliderCtn_${this.sliderId}`];
        sliderCtn && animation.transition(sliderCtn, {
          styles: {
            transform: `translateX(-${selectIndex * (this.cardS.width + this.cardS.spacing)}px)`
          },
          timingFunction: 'ease',
          duration
        }, () => {
          this.isMoving = false;
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
        if (element && element.ref) {

          if (this.isMoving && this.gesToken !== 0) {
            Binding.unbind({
              eventType: 'pan',
              token: this.gesToken
            })
            this.gesToken = 0;
            return;
          }

          this.startTime = Date.now();
          const index = this.loopedIndex(this.currentIndex, this.cardLength);
          const sliderCtn = this.$refs[`sliderCtn_${this.sliderId}`];
          const currentCard = this.$refs[`card${index}_${this.sliderId}`][0];
          let rightCard = null;
          let leftCard = null;
          const currentCardLeft = this.currentIndex * (this.cardS.width + this.cardS.spacing);

          // 卡片容器
          const sliderCtnExp = `x - ${currentCardLeft}`;
          const args = [
            {
              element: sliderCtn.ref,
              property: 'transform.translateX',
              expression: sliderCtnExp,
            }
          ];

          if (this.cardS.scale !== 1) {

            const currentCardExp = `1-abs(x)/${this.cardS.width}*${1 - this.cardS.scale}`;
            const leftCardExp = `1-abs(x-${this.cardS.width})/${this.cardS.width}*${1 - this.cardS.scale}`;
            const rightCardExp = `1-abs(${this.cardS.width}+x)/${this.cardS.width}*${1 - this.cardS.scale}`;

            args.push({
              element: currentCard.ref,
              property: 'transform.scale',
              expression: currentCardExp
            });

            if (index === 0 && this.$refs[`card${index + 1}_${this.sliderId}`]) {

              rightCard = this.$refs[`card${index + 1}_${this.sliderId}`][0];
              args.push({
                element: rightCard.ref,
                property: 'transform.scale',
                expression: rightCardExp
              });
            } else if (index === this.cardLength - 1 && this.$refs[`card${index - 1}_${this.sliderId}`]) {
              leftCard = this.$refs[`card${index - 1}_${this.sliderId}`][0];
              args.push({
                element: leftCard.ref,
                property: 'transform.scale',
                expression: leftCardExp
              });
            } else if (this.$refs[`card${index - 1}_${this.sliderId}`]) {
              // 左边卡片
              leftCard = this.$refs[`card${index - 1}_${this.sliderId}`][0];
              args.push({
                element: leftCard.ref,
                property: 'transform.scale',
                expression: leftCardExp
              });
              // 右边卡片
              rightCard = this.$refs[`card${index + 1}_${this.sliderId}`][0];
              args.push({
                element: rightCard.ref,
                property: 'transform.scale',
                expression: rightCardExp
              });
            }
          }

          const gesTokenObj = Binding.bind({
            anchor: element.ref,
            eventType: 'pan',
            props: args
          }, (e) => {
            if (!this.isMoving && (e.state === 'end' || e.state === 'cancel' || e.state === 'exit')) {
              this.panEnd(e);
            }
          });

          this.gesToken = gesTokenObj.token;
        }
      },
      checkNeedAutoPlay () {
        if (this.autoPlay) {
          this.clearAutoPlay();
          this.autoPlayTimer = setInterval(() => {
            this.slideTo(this.currentIndex, this.loopedIndex(this.currentIndex + 1, this.cardLength));
          }, parseInt(this.interval));
        }
      },
      clearAutoPlay () {
        this.autoPlayTimer && clearInterval(this.autoPlayTimer);
      },
      rebind () {
        const sliderCtn = this.$refs[`sliderCtn_${this.sliderId}`];
        if (sliderCtn && sliderCtn.ref) {
          Binding.unbind({
            eventType: 'pan',
            token: this.gesToken
          });
          this.gesToken = 0;
          this.bindExp(sliderCtn);
        }
      },
      manualSetPage (selectIndex) {
        this.clearAutoPlay();
        const step = this.currentIndex < selectIndex ? 1 : -1;
        this.slideTo(this.loopedIndex(selectIndex - step, this.cardLength), selectIndex);
        setTimeout(() => {
          this.checkNeedAutoPlay()
        }, 3000);
      }
    }
  }
</script>

