<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/07/28. -->

<template>
  <div class="wxc-tab-page"
       :style="{ height: (tabPageHeight)+'px' }">
    <div class="tab-page-wrap"
         ref="tab-page-wrap"
         :prevent-move-event="true"
         @horizontalpan="startHandler"
         :style="{ height: tabPageHeight+'px' }">
      <div ref="tab-container"
           class="tab-container">
        <slot></slot>
      </div>
    </div>
    <scroller class="tab-title-list"
              ref="tab-title-list"
              :show-scrollbar="false"
              scroll-direction="horizontal"
              :data-spm="spmC"
              :style="{ backgroundColor: tabStyles.bgColor, height: (tabStyles.height)+'px',top:tabStyles.top+'px' }">
      <div class="title-item"
           v-for="(v,index) in tabTitles"
           :key="index"
           :ref="'wxc-tab-title-'+index"
           @click="setPage(index,v.url)"
           :data-spm-click="`gostr=/tbtrip;locaid=d${v.dataSpm!==undefined ? v.dataSpm : '996' + index}`"
           :style="{ width: tabStyles.width +'px', height: tabStyles.height +'px', backgroundColor: currentPage == index ? tabStyles.activeBgColor : tabStyles.bgColor }"
           :accessible="true"
           :aria-label="`${v.title?v.title:'标签'+index}`">

        <image :src="currentPage == index ? v.activeIcon : v.icon"
               v-if="titleType == 'icon'"
               :style="{ width: tabStyles.iconWidth + 'px', height:tabStyles.iconHeight+'px'}"></image>

        <text
          :style="{ fontSize: tabStyles.fontSize+'px', fontWeight: (currentPage == index && tabStyles.isActiveTitleBold)? 'bold' : 'normal', color: currentPage == index ? tabStyles.activeTitleColor : tabStyles.titleColor, paddingLeft:tabStyles.textPaddingLeft+'px', paddingRight:tabStyles.textPaddingRight+'px'}"
          class="tab-text">{{v.title}}</text>

        <div class="border-bottom"
             v-if="tabStyles.hasActiveBottom"
             :style="{ width: tabStyles.activeBottomWidth+'px', left: (tabStyles.width-tabStyles.activeBottomWidth)/2+'px', height: tabStyles.activeBottomHeight+'px', backgroundColor: currentPage == index ? tabStyles.activeBottomColor : 'transparent' }"></div>

      </div>
    </scroller>

  </div>
</template>

<style scoped>
  .wxc-tab-page {
    width: 750px;
    background-color: #f2f3f4;
  }

  .tab-title-list {
    width: 750px;
    position: absolute;
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
</style>

<script>
  const dom = weex.requireModule('dom');
  const animation = weex.requireModule('animation');
  const swipeBack = weex.requireModule('swipeBack');
  const expressionBinding = weex.requireModule('expressionBinding');

  import Utils from '../utils';

  const supportsEBForIos = Utils.env.supportsEBForIos();
  const isIos = Utils.env.isIOS();

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
      tabStyles: {
        type: Object,
        default: () => ({
          titleColor: '#666666',
          activeTitleColor: '#3D3D3D',
          isActiveTitleBold: true,
          width: 160,
          height: 40,
          fontSize: 24,
          textPaddingLeft: 10,
          textPaddingRight: 10
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
      duration: {
        type: [Number, String],
        default: 300
      },
      timingFunction: {
        type: String,
        default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }
    },
    data: () => ({
      currentPage: 0,
      isMoving: false,
      deltaX: 0
    }),
    mounted () {
      // ios 下面禁止左滑出去
      if (swipeBack && swipeBack.forbidSwipeBack) {
        swipeBack.forbidSwipeBack(true);
      }
      if (supportsEBForIos && this.needSlider) {
        setTimeout(() => {
          const tabPageEl = this.$refs['tab-page-wrap'];
          tabPageEl && tabPageEl.ref && this.bindExp(tabPageEl);
        }, 20);
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
      startHandler (e) {
        if (supportsEBForIos && e.state === 'start' && this.needSlider) {
          // list下拉和到最下面问题修复
          setTimeout(() => {
            this.bindExp(this.$refs['tab-page-wrap']);
          }, 0)
        }
      },
      bindExp (element) {
        if (!this.isMoving && element && element.ref) {
          const tabElement = this.$refs['tab-container'];
          const { currentPage, panDist, tabTitles } = this;
          const dist = currentPage * 750;
          // x-dist
          const args = [{
            element: tabElement.ref,
            property: 'transform.translateX',
            expression: `{\"type\":\"CallExpression\",\"children\":[{\"type\":\"Identifier\",\"value\":\"min\"},{\"type\":\"Arguments\",\"children\":[{\"type\":\"NumericLiteral\",\"value\":0},{\"type\":\"CallExpression\",\"children\":[{\"type\":\"Identifier\",\"value\":\"max\"},{\"type\":\"Arguments\",\"children\":[{\"type\":\"NumericLiteral\",\"value\":${-(tabTitles.length - 1) * 750}},{\"type\":\"-\",\"children\":[{\"type\":\"Identifier\",\"value\":\"x\"},{\"type\":\"NumericLiteral\",\"value\":${dist}}]}]}]}]}]}`
          }];
          expressionBinding.enableBinding(element.ref, 'pan');
          expressionBinding.createBinding(element.ref, 'pan', '', args, e => {
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
        }
      },
      setPage (page) {
        if (this.isMoving === true) {
          return;
        }
        this.isMoving = true;
        const previousPage = this.currentPage;
        const currentTabEl = this.$refs[`wxc-tab-title-${page}`][0];
        const { width } = this.tabStyles;
        const appearNum = parseInt(750 / width);
        const tabsNum = this.tabTitles.length;
        const computedPage = tabsNum > appearNum ? 2 : page
        const offset = page > appearNum ? -(750 - width) / 2 : -width * computedPage;

        (previousPage > appearNum || page > 1) && dom.scrollToElement(currentTabEl, {
          offset
        });

        page <= 1 && previousPage > page && dom.scrollToElement(currentTabEl, {
          offset: -width * page
        });

        if (isIos) {
          // 高版本ios 手淘上面会有不固定情况，hack一下
          setTimeout(() => {
            this._animateTransformX(page);
          }, 10);
        } else {
          this._animateTransformX(page);
        }
        this.isMoving = false;
        this.currentPage = page;
        this.$emit('wxcTabPageCurrentTabSelected', { page });
      },
      _animateTransformX (page) {
        const { duration, timingFunction } = this;
        const containerEl = this.$refs[`tab-container`];
        const dist = page * 750;
        animation.transition(containerEl, {
          styles: {
            transform: `translateX(${-dist}px)`
          },
          duration,
          timingFunction,
          delay: 0
        }, () => {
        });
      }
    }
  };
</script>
