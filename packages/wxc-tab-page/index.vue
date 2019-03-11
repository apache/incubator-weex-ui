<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/07/28. -->
<!-- Updated by Tw93 on 17/11/16.-->

<template>
  <div class="wxc-tab-page"
       :style="{ height: (tabPageHeight)+'px', backgroundColor:wrapBgColor }">
    <scroller class="tab-title-list"
              ref="tab-title-list"
              :show-scrollbar="false"
              scroll-direction="horizontal"
              :data-spm="spmC"
              :style="{
                backgroundColor: tabStyles.bgColor,
                height: (tabStyles.height)+'px',
                paddingLeft:(tabStyles.leftOffset?tabStyles.leftOffset:0)+'px',
                paddingRight: tabStyles.rightOffset
              }">

      <div class="title-item"
           v-for="(v,index) in tabTitles"
           :key="index"
           :ref="'wxc-tab-title-'+index"
           @click="setPage(index,v.url, clickAnimation)"
           :style="{
             width: tabStyles.width +'px',
             height: tabStyles.height +'px',
             backgroundColor: currentPage === index ? tabStyles.activeBgColor : tabStyles.bgColor,
             borderBottomWidth: tabStyles.normalBottomHeight,
             borderBottomColor: tabStyles.normalBottomColor
           }"
           :accessible="true"
           :aria-label="`${v.title?v.title:'标签'+index}`">

        <image :src="currentPage === index ? v.activeIcon : v.icon"
               v-if="titleType === 'icon' && !titleUseSlot"
               :style="{ width: tabStyles.iconWidth + 'px', height:tabStyles.iconHeight+'px'}"></image>

        <text class="icon-font"
              v-if="titleType === 'iconFont' && v.codePoint && !titleUseSlot"
              :style="{fontFamily: 'wxcIconFont',fontSize: tabStyles.iconFontSize+'px', color: currentPage === index ? tabStyles.activeIconFontColor : tabStyles.iconFontColor}">{{v.codePoint}}</text>

        <text
          v-if="!titleUseSlot"
          :style="{ fontSize: tabStyles.fontSize+'px', fontWeight: (currentPage === index && tabStyles.isActiveTitleBold)? 'bold' : 'normal', color: currentPage === index ? tabStyles.activeTitleColor : tabStyles.titleColor, paddingLeft:(tabStyles.textPaddingLeft?tabStyles.textPaddingLeft:10)+'px', paddingRight:(tabStyles.textPaddingRight?tabStyles.textPaddingRight:10)+'px'}"
          class="tab-text">{{v.title}}</text>
        <div class="border-bottom"
             v-if="tabStyles.hasActiveBottom && !titleUseSlot"
             :style="{ width: tabStyles.activeBottomWidth+'px', left: (tabStyles.width-tabStyles.activeBottomWidth)/2+'px', height: tabStyles.activeBottomHeight+'px', backgroundColor: currentPage === index ? tabStyles.activeBottomColor : 'transparent' }"></div>
        <slot :name="`tab-title-${index}`" v-if="titleUseSlot"></slot>
      </div>

      <div v-if="tabStyles.hasRightIcon"
           class="rightIcon"
           :style="{
            top: rightIconStyle.top,
            right: rightIconStyle.right,
            paddingLeft: rightIconStyle.paddingLeft,
            paddingRight: rightIconStyle.paddingRight
           }">
        <slot name="rightIcon"></slot>
      </div>

    </scroller>
    <div class="tab-page-wrap"
         ref="tab-page-wrap"
         @horizontalpan="startHandler"
         :style="{ height: (tabPageHeight-tabStyles.height)+'px' }">
      <div ref="tab-container"
           class="tab-container">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .wxc-tab-page {
    width: 750px;
  }

  .tab-title-list {
    flex-direction: row;
  }

  .title-item {
    justify-content: center;
    align-items: center;
    border-bottom-style: solid;
  }

  .border-bottom {
    position: absolute;
    bottom: 0;
  }

  .tab-page-wrap {
    width: 750px;
    overflow: hidden;
  }

  .tab-container {
    flex: 1;
    flex-direction: row;
    position: absolute;
  }

  .tab-text {
    lines: 1;
    text-overflow: ellipsis;
  }

  .rightIcon {
    position: fixed;
    background-color: #ffffff;
    box-shadow: -50px 0 20px #ffffff;
  }

</style>

<script>
  const dom = weex.requireModule('dom');
  const animation = weex.requireModule('animation');
  const swipeBack = weex.requireModule('swipeBack');

  import Utils from '../utils';
  import BindEnv from '../utils/bind-env';
  import Binding from 'weex-bindingx/lib/index.weex.js';

  export default {
    props: {
      tabTitles: {
        type: Array,
        default: () => ([])
      },
      panDist: {
        type: Number,
        default: 200
      },
      spmC: {
        type: [String, Number],
        default: ''
      },
      titleUseSlot: {
        type: Boolean,
        default: false
      },
      tabStyles: {
        type: Object,
        default: () => ({
          bgColor: '#FFFFFF',
          titleColor: '#666666',
          activeTitleColor: '#3D3D3D',
          activeBgColor: '#FFFFFF',
          isActiveTitleBold: true,
          iconWidth: 70,
          iconHeight: 70,
          width: 160,
          height: 120,
          fontSize: 24,
          hasActiveBottom: true,
          activeBottomColor: '#FFC900',
          activeBottomWidth: 120,
          activeBottomHeight: 6,
          textPaddingLeft: 10,
          textPaddingRight: 10,
          leftOffset: 0,
          rightOffset: 0,
          normalBottomColor: '#F2F2F2',
          normalBottomHeight: 0,
          hasRightIcon: false
        })
      },
      titleType: {
        type: String,
        default: 'icon'
      },
      tabPageHeight: {
        type: [String, Number],
        default: 1334
      },
      needSlider: {
        type: Boolean,
        default: true
      },
      isTabView: {
        type: Boolean,
        default: true
      },
      duration: {
        type: [Number, String],
        default: 300
      },
      timingFunction: {
        type: String,
        default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      },
      wrapBgColor: {
        type: String,
        default: '#f2f3f4'
      },
      clickAnimation: {
        type: Boolean,
        default: true
      },
      rightIconStyle: {
        type: Object,
        default: () => ({
          top: 0,
          right: 0,
          paddingLeft: 20,
          paddingRight: 20
        })
      }
    },
    data: () => ({
      currentPage: 0,
      gesToken: 0,
      isMoving: false,
      startTime: 0,
      deltaX: 0,
      translateX: 0
    }),
    created () {
      const { titleType, tabStyles } = this;
      if (titleType === 'iconFont' && tabStyles.iconFontUrl) {
        dom.addRule('fontFace', {
          'fontFamily': 'wxcIconFont',
          'src': `url(${tabStyles.iconFontUrl})`
        });
      }
    },
    mounted () {
      if (swipeBack && swipeBack.forbidSwipeBack) {
        swipeBack.forbidSwipeBack(true);
      }
      if (BindEnv.supportsEBForIos() && this.isTabView && this.needSlider) {
        const tabPageEl = this.$refs['tab-page-wrap'];
        Binding.prepare && Binding.prepare({
          anchor: tabPageEl.ref,
          eventType: 'pan'
        });
      }
    },
    methods: {
      next () {
        let page = this.currentPage;
        if (page < this.tabTitles.length - 1) {
          page++;
        }
        this.setPage(page);
      },
      prev () {
        let page = this.currentPage;
        if (page > 0) {
          page--;
        }
        this.setPage(page);
      },
      startHandler () {
        if (BindEnv.supportsEBForIos() && this.isTabView && this.needSlider) {
          this.bindExp(this.$refs['tab-page-wrap']);
        }
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

          const tabElement = this.$refs['tab-container'];
          const { currentPage, panDist } = this;
          const dist = currentPage * 750;

          // x-dist
          const props = [{
            element: tabElement.ref,
            property: 'transform.translateX',
            expression: `x-${dist}`
          }];

          const gesTokenObj = Binding.bind({
            anchor: element.ref,
            eventType: 'pan',
            props
          }, (e) => {
            const { deltaX, state } = e;
            if (state === 'end') {
              if (deltaX < -panDist) {
                this.next();
              } else if (deltaX > panDist) {
                this.prev();
              } else {
                this.setPage(currentPage);
              }
            }
          });
          this.gesToken = gesTokenObj.token;
        }
      },
      setPage (page, url = null, animated = true) {
        if (!this.isTabView) {
          this.jumpOut(url);
          return;
        }
        if (this.isMoving === true) {
          return;
        }
        this.isMoving = true;
        const previousPage = this.currentPage;
        const currentTabEl = this.$refs[`wxc-tab-title-${page}`][0];
        const { width } = this.tabStyles;
        const appearNum = parseInt(750 / width);
        const tabsNum = this.tabTitles.length;
        const offset = page > appearNum ? -(750 - width) / 2 : -width * 2;

        if (appearNum < tabsNum) {
          (previousPage > appearNum || page > 1) && dom.scrollToElement(currentTabEl, {
            offset, animated
          });

          page <= 1 && previousPage > page && dom.scrollToElement(currentTabEl, {
            offset: -width * page,
            animated
          });
        }

        this.isMoving = false;
        this.currentPage = page;
        this._animateTransformX(page, animated);
        this.$emit('wxcTabPageCurrentTabSelected', { page });
      },
      jumpOut (url) {
        url && Utils.goToH5Page(url)
      },
      _animateTransformX (page, animated) {
        const { duration, timingFunction } = this;
        const computedDur = animated ? duration : 0.00001;
        const containerEl = this.$refs[`tab-container`];
        const dist = page * 750;
        animation.transition(containerEl, {
          styles: {
            transform: `translateX(${-dist}px)`
          },
          duration: computedDur,
          timingFunction,
          delay: 0
        }, () => {
        });
      }
    }
  };
</script>
