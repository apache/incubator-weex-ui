<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/07/28. -->

<template>
  <div class="wxc-page-calendar"
       ref="pageCalendar"
       :style="{ height: pageHeight +'px'}">
    <wxc-minibar :show="showHeader"
                 v-bind="minibarCfg"
                 :use-default-return="useDefaultReturn"
                 @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"></wxc-minibar>

    <div class="calendar-weekday"
         v-if="isShow">
      <text class="flex-item weekday-text"
            :key="k"
            v-for="(week,k) in ['日','一','二','三','四','五','六']">{{week}}</text>
    </div>
    <list class="calendar-list"
          :style="{ height: calendarHeight +'px'}"
          v-if="isShow">
      <cell v-for="(month,index) in monthsArray"
            :key="index">
        <div class="calendar-month">
          <text class="month-text">{{month.title}}</text>
        </div>
        <div class="calendar-row"
             v-for="(row,rowIndex) in month.rowsData"
             :key="rowIndex">
          <div v-for="(cell,index) in row.cells"
               :key="index"
               :ref="cell.ref"
               :class="['row-item', cell.cellClass]"
               @click="onClickDate(cell)">
            <div v-if="cell.isEmpty"></div>
            <div v-if="!cell.isEmpty"
                 class="calendar-item">
              <text :class="['calendar-note', cell.cls]">{{cell.note}}</text>
              <text :class="['calendar-day', cell.cls]">{{cell.text}}</text>
              <text :class="['calendar-ext', cell.cls]">{{cell.ext}}</text>
            </div>
          </div>
        </div>
      </cell>
    </list>
  </div>
</template>

<script>
  import * as Format from './format';
  import Utils from '../utils';

  const dom = weex.requireModule('dom');
  const animation = weex.requireModule('animation');

  import WxcMinibar from '../wxc-minibar'

  export default {
    components: { WxcMinibar },
    props: {
      selectedDate: Array,
      dateRange: {
        type: Array,
        required: true,
        default: () => ([])
      },
      minibarCfg: {
        type: Object,
        default: () => ({
          'title': '选择日期',
          'background-color': '#FFC900',
          'text-color': '#3D3D3D'
        })
      },
      selectedNote: {
        type: Array,
        default: () => (['开始', '到达', '往返'])
      },
      isRange: {
        type: Boolean,
        default: false
      },
      needDestroy: {
        type: Boolean,
        default: false
      },
      descList: {
        type: Array,
        default: () => ([])
      }
    },
    data: () => ({
      isShow: false,
      reSelect: true,
      useDefaultReturn: false,
      showHeader: Utils.env.isWeb(),
      today: Format.getToDay(),
      calendarHeight: 1040,
      pageHeight: 1334,
      departDate: '',
      arriveDate: ''
    }),
    computed: {
      monthsArray () {
        const { dateRange: range, today, departDate, arriveDate, selectedNote, descList } = this;
        const param = { range, today, departDate, arriveDate, selectedNote, descList }
        return Format.generateDateCell(param);
      }
    },
    created () {
      const self = this;
      const env = weex.config.env;
      self.pageHeight = env.deviceHeight / env.deviceWidth * 750;
      self.calendarHeight = self.pageHeight - (this.showHeader ? 100 : 120) - 60;
      self.detectShow();
    },
    methods: {
      minibarLeftButtonClick () {
        setTimeout(() => {
          this.hide();
          this.$emit('wxcPageCalendarBackClicked', {});
        }, 100);
      },
      onClickDate (datConfig) {
        const self = this;
        if (datConfig.disabled || datConfig.isEmpty) return;

        if (self.reSelect) {
          self.departDate = '';
          self.arriveDate = '';
          self.reSelect = false;
        }

        if (self.isRange) {
          if (self.departDate && Date.parse(self.departDate) <= Date.parse(datConfig.date)) {
            self.arriveDate = datConfig.date;
          } else {
            self.departDate = datConfig.date;
          }
          if (self.departDate && self.arriveDate) {
            self.dispatchDateChange([self.departDate, self.arriveDate]);
          }
        } else {
          self.departDate = datConfig.date;
          self.dispatchDateChange([self.departDate]);
        }
      },
      scrollToDate () {
        if (this.departDate) {
          const el = this.$refs.departDate[0];
          dom.getComponentRect && dom.getComponentRect(el, (e) => {
            if (e && e.result) {
              const bottom = e.size.bottom;
              const { env } = weex.config;
              // 误差
              const height = env.deviceHeight / env.deviceWidth * 750 - 50;
              if (bottom > height || bottom === 0) {
                dom.scrollToElement(el, { offset: -146, animated: false });
              }
            }
          })
        }
      },
      dispatchDateChange (dateArr) {
        setTimeout(() => {
          this.hide();
        }, 600);
        this.$emit('wxcPageCalendarDateSelected', {
          date: dateArr
        });
      },
      detectShow () {
        !this.needDestroy && (this.isShow = true);
        if (this.isRange && this.selectedDate.length >= 2) {
          this.departDate = this.selectedDate[0];
          this.arriveDate = this.selectedDate[1];
        } else if (this.selectedDate.length >= 1) {
          this.departDate = this.selectedDate[0];
          this.arriveDate = '';
        }
      },
      _animate (width = 0) {
        animation.transition(this.$refs.pageCalendar, {
          styles: {
            transform: `translateX(${-width}px)`
          },
          timingFunction: 'ease-out',
          duration: 300
        }, () => {
        });
      },
      show () {
        this.needDestroy && (this.isShow = true);
        this.reSelect = true;
        this.detectShow();
        this._animate(750);
        // 防止没有渲染完成
        setTimeout(() => {
          this.scrollToDate();
        }, 1);
      },
      hide () {
        this.needDestroy && (this.isShow = false);
        this.reSelect = false;
        this._animate(0);
        this.$emit('wxcPageCalendarHide', {});
      }
    }
  };
</script>
<style scoped>
  .wxc-page-calendar {
    position: fixed;
    top: 0;
    right: -750px;
    width: 750px;
    color: #333333;
    background-color: #fff;
  }

  .flex-item {
    flex: 1;
    text-align: center;
  }

  .calendar-weekday {
    height: 60px;
    background-color: #ffffff;
    border-bottom-width: 1px;
    border-top-width: 1px;
    border-color: #e2e2e2;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  .weekday-text {
    color: #000000;
    flex: 1;
    text-align: center;
  }

  .calendar-list {
    flex-direction: column;
  }

  .calendar-month {
    height: 60px;
    justify-content: center;
    align-items: center;
    background-color: #f2f3f4;
  }

  .month-text {
    font-size: 32px;
  }

  .calendar-row {
    height: 140px;
    flex-direction: row;
    border-bottom-width: 1px;
    border-color: #f2f3f4;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }

  .row-item {
    flex: 1;
    height: 140px;
    background: #ffffff;
    border-width: 0;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .calendar-note {
    height: 36px;
    line-height: 36px;
    font-size: 24px;
    color: #000000;
    text-align: center;
  }

  .calendar-item {
    justify-content: center;
    align-items: center;
    height: 120px;
  }

  .calendar-day {
    height: 48px;
    line-height: 48px;
    font-size: 36px;
    color: #000000;
    text-align: center;
  }

  .calendar-ext {
    height: 36px;
    line-height: 36px;
    color: #999999;
    text-align: center;
    font-size: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .calendar-holiday {
    color: #FF5000;
  }

  .calendar-rest {
    color: #FF5000;
  }

  .item-row-selected {
    color: #fff;
    background-color: #FFC900;
    text-align: center;
  }

  .item-text-selected {
    color: #3d3d3d;
    text-align: center;
  }

  .calendar-disabled {
    color: #CCCCCC;
  }

  .cell-disabled {
    background-color: #FBFBFB;
  }

  .calendar-day-include {
    background-color: #FFF7D6;
  }
</style>
