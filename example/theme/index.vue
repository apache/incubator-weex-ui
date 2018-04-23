<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Yanjiie on 18/04/20. -->

<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <title title="主题化 theme"></title>
      <category title="示例"></category>
      <div class="demo">
        <text class="demo-text" :style="{ backgroundColor: STYLE.weakColor }">wxc-minibar</text>
        <wxc-minibar title="标题"
                     right-text="更多"></wxc-minibar>
      </div>

      <div class="demo">
        <text class="demo-text" :style="{ backgroundColor: STYLE.weakColor }">wxc-searchbar</text>
        <wxc-searchbar class="searchbar"
                       placeholder="搜索目的地"
                       mod="hasDep"
                       dep-name="杭州出发"></wxc-searchbar>
      </div>

      <div class="demo">
        <text class="demo-text" :style="{ backgroundColor: STYLE.weakColor }">wxc-radio 可选</text>
        <wxc-radio :list="radioList"></wxc-radio>
      </div>

      <div class="demo">
        <text class="demo-text" :style="{ backgroundColor: STYLE.weakColor }">wxc-radio 不可选</text>
        <wxc-radio :list="radioList2"></wxc-radio>
      </div>

      <div class="demo">
        <text class="demo-text" :style="{ backgroundColor: STYLE.weakColor }">wxc-checkbox</text>
        <wxc-checkbox title="默认"></wxc-checkbox>
        <wxc-checkbox title="默认选中"
                      :checked="true"></wxc-checkbox>
        <wxc-checkbox title="未选中不可更改"
                      :disabled="true"></wxc-checkbox>
        <wxc-checkbox title="选中不可更改"
                      :disabled="true"
                      :checked="true"></wxc-checkbox>
      </div>

      <div class="demo">
        <text class="demo-text" :style="{ backgroundColor: STYLE.weakColor }">wxc-simple-flow</text>
        <wxc-simple-flow :list="simpleFlowData"></wxc-simple-flow>
      </div>

      <div class="demo">
        <text class="demo-text" :style="{ backgroundColor: STYLE.weakColor }">wxc-slider-bar</text>
        <div class="demo-wrap" :style="{alignItems: 'center'}">
          <wxc-slider-bar v-bind="sliderBarCfg" @updateValue="updateValue"></wxc-slider-bar>
          <wxc-slider-bar v-bind="sliderBarCfg1"></wxc-slider-bar>
        </div>
      </div>

      <div class="demo">
        <text class="demo-text" :style="{ backgroundColor: STYLE.weakColor }">wxc-grid-select</text>
        <div class="demo-wrap">
          <wxc-grid-select
            :list="gridSelectData"
            :limit="5"></wxc-grid-select>
        </div>
      </div>

      <div class="demo">
        <text class="demo-text" :style="{ backgroundColor: STYLE.weakColor }">wxc-page-calendar</text>
        <div class="demo-wrap" :style="{alignItems: 'center'}">
          <div class="button-wrap" :style="{ backgroundColor: STYLE.primaryColor }" @click="calendarShow">
            <text class="button-text">往返日历</text>
          </div>
        </div>
      </div>

      <wxc-page-calendar ref="wxcPageCalendarPush"
                         :animationType="animationTypePush"
                         :date-range="dateRange"
                         :selected-date="selectedDate"
                         :selected-note="selectedNote"
                         :is-range="isRange"
                         :needDestroy="false"
                         :minibar-cfg="minibarCfg"
                         :desc-list="descList"
                         @wxcPageCalendarDateSelected="wxcPageCalendarDateSelected"
      ></wxc-page-calendar>

    </scroller>
  </div>
</template>

<style scoped>

  .wxc-demo {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #FFFFFF;
  }

  .scroller {
    flex: 1;
  }

  .demo {
    width: 750px;
    padding-top: 60px;
  }

  .demo-text {
    padding: 10px;
    color: #666666;
    font-size: 24px;
  }

  .demo-wrap {
    padding-top: 24px;
    padding-right: 24px;
    padding-left: 24px;
  }

  .button-wrap {
    width: 500px;
    height: 80px;
    border-radius: 40px;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
  }

  .button-text {
    color: #FFFFFF;
    font-size: 34px;
  }
</style>

<script>
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import { WxcMinibar, WxcSearchbar, WxcRadio, WxcCheckbox, WxcSimpleFlow, WxcSliderBar, WxcGridSelect, WxcPageCalendar } from 'weex-ui';
  import STYLE from 'weex-ui/lib/theme/default/index.js';

  const modal = weex.requireModule('modal');
  import { setTitle } from '../_mods/set-nav';

  export default {
    components: {
      Title,
      Category,
      WxcMinibar,
      WxcSearchbar,
      WxcRadio,
      WxcCheckbox,
      WxcSimpleFlow,
      WxcSliderBar,
      WxcGridSelect,
      WxcPageCalendar
    },
    data: () => ({
      radioList: [
        { title: '选项1', value: 1 },
        { title: '选项2', value: 2, checked: true },
        { title: '选项3', value: 3 },
        { title: '选项4', value: 4 }
      ],
      radioList2: [
        { title: '未选不可修改', value: 5, disabled: true },
        { title: '已选不可修改', value: 6, disabled: true, checked: true }
      ],
      simpleFlowData: [
        {
          'date': '2017-05-24 21:10:29',
          'desc': '',
          'highlight': true,
          'title': '方案已确认'
        },
        {
          'date': '2017-05-24 19:54:28',
          'desc': '',
          'title': '方案已更新'
        },
        {
          'date': '2017-05-24 19:50:21',
          'desc': '您以确定了方案',
          'title': '方案已上传'
        },
        {
          'date': '2017-05-24 19:49:03',
          'desc': '商家会在2个工作小时内电话或旺旺联系您',
          'title': '商家已接单'
        }
      ],
      sliderBarCfg: {
        length: 500,
        range: true,
        min: 0,
        max: 100,
        value: [20, 70],
        defaultValue: [30, 60],
        disabled: false
      },
      sliderBarCfg1: {
        length: 500,
        range: true,
        min: 0,
        max: 200,
        value: 20,
        defaultValue: [20, 70],
        disabled: true
      },
      gridSelectData: [
        {
          'title': '上海'
        },
        {
          'title': '杭州',
          'checked': true
        },
        {
          'title': '北京'
        },
        {
          'title': '不可选',
          'disabled': true
        },
        {
          'title': '深圳'
        },
        {
          'title': '南京'
        },
        {
          'title': '合肥'
        },
        {
          'title': '武汉'
        },
        {
          'title': '长沙'
        },
        {
          'title': '最多展示两行内容'
        },
        {
          'title': '超过两行文本将被截断展示'
        },
        {
          'title': '西安'
        },
        {
          'title': '郑州'
        },
        {
          'title': '福州'
        }
      ],
      animationTypePush:'push', // 默认使用push方式，若使用push模式此参数可以不传
      currentDate: '',
      selectedDate: ['2017-12-20', '2017-12-30'],
      isRange: true,
      calendarTitle: '选择日期',
      dateRange: ['2017-08-01', '2018-07-30'],
      selectedNote: ['出发', '到达', '往返'],
      minibarCfg: {
        title: '日期选择'
      },
      descList: [
        { date: '2017-12-23', value: '￥200' },
        { date: '2017-12-24', value: '￥200' },
        { date: '2017-12-25', value: '￥200' },
        { date: '2017-12-26', value: '￥200' },
        { date: '2017-12-27', value: '￥222' },
        { date: '2017-12-28', value: '￥341' },
        { date: '2017-12-29', value: '￥230' },
        { date: '2017-12-06', value: '￥2000', emphasize: true }
      ]
    }),
    created () {
      setTitle('主题化 theme');
      this.STYLE = STYLE;
    },
    methods: {
      calendarShow () {
        setTimeout(() => {
          this.$refs['wxcPageCalendarPush'].show();
        }, 1);
      },
      wxcPageCalendarDateSelected (e) {
        this.selectedDate = e.date;
        this.currentDate = e.date;
      }
    }
  };
</script>
