<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/07/28. -->

<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <title title="wxc-page-calendar"></title>
      <category title="使用案例"></category>
      <div class="btn"
           @click="showCalendarPush">
        <text class="btn-txt">单程日历(push)</text>
      </div>

      <div class="btn btn-margin yellow"
           @click="showReturnCalendarPush">
        <text class="btn-txt">往返日历(push)</text>
      </div>

      <div class="btn"
           @click="showCalendarModel">
        <text class="btn-txt">单程日历(model)</text>
      </div>

      <div class="btn btn-margin yellow"
           @click="showReturnCalendarModel">
        <text class="btn-txt">往返日历(model)</text>
      </div>

      <div class="panel">
        <text v-if="currentDate"
              class="text">当前日期: {{currentDate}}</text>
      </div>

      <wxc-page-calendar ref="wxcPageCalendarPush"
                         :animationType="animationTypePush"
                         :date-range="dateRange"
                         :selected-date="selectedDate"
                         :selected-note="selectedNote"
                         :is-range="isRange"
                         :need-destroy="false"
                         :minibar-cfg="minibarCfg"
                         :selected-cell-style="selectedCellStyle"
                         :selected-text-style="selectedTextStyle"
                         :desc-list="descList"
                         @wxcPageCalendarBackClicked="wxcPageCalendarBackClicked"
                         @wxcPageCalendarDateSelected="wxcPageCalendarDateSelected"
      ></wxc-page-calendar>
      <wxc-page-calendar ref="wxcPageCalendarModel"
                         :animationType="animationTypeModel"
                         :date-range="dateRange"
                         :selected-date="selectedDate"
                         :selected-note="selectedNote"
                         :is-range="isRange"
                         :needDestroy="false"
                         :minibar-cfg="minibarCfg"
                         :desc-list="descList"
                         @wxcPageCalendarBackClicked="wxcPageCalendarBackClicked"
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

  .btn {
    width: 600px;
    height: 80px;
    margin-top: 100px;
    margin-left: 75px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background-color: rgb(92, 184, 92);
    border-color: rgb(76, 174, 76);
  }

  .text {
    font-size: 32px;
  }

  .yellow {
    background-color: #ffc300;
    border-color: #ffc300;
  }

  .btn-txt {
    font-size: 32px;
    color: #ffffff;
  }

  .btn-margin {
    margin-top: 40px;
  }

  .panel {
    height: 300px;
    align-items: center;
    margin-top: 40px;
  }
</style>

<script>
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import { WxcPageCalendar } from '../../index';

  const modal = weex.requireModule('modal');

  import { setTitle } from '../_mods/set-nav';

  export default {
    components: { Title, Category, WxcPageCalendar },
    data: () => ({
      animationTypePush:'push', // 默认使用push方式，若使用push模式此参数可以不传
      animationTypeModel:'model',
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
      ],
      selectedCellStyle:{
        backgroundColor:'red'
      },
      selectedTextStyle:{
        color:'#ffffff'
      }
    }),
    created () {
      setTitle('PageCalendar');
    },
    methods: {
      wxcPageCalendarDateSelected (e) {
        this.selectedDate = e.date;
        this.currentDate = e.date;
      },
      wxcPageCalendarBackClicked () {
        modal.toast({
          message: '你按了返回按钮'
        })
      },
      showCalendarPush () {
        this.isRange = false;
        setTimeout(() => {
          this.$refs['wxcPageCalendarPush'].show();
        }, 1);
      },
      showReturnCalendarPush () {
        this.isRange = true;
        setTimeout(() => {
          this.$refs['wxcPageCalendarPush'].show();
        }, 1);
      },
      showCalendarModel () {
        this.isRange = false;
        setTimeout(() => {
          this.$refs['wxcPageCalendarModel'].show();
        }, 1);
      },
      showReturnCalendarModel () {
        this.isRange = true;
        setTimeout(() => {
          this.$refs['wxcPageCalendarModel'].show();
        }, 1);
      }
    }
  };
</script>
