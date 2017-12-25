# wxc-page-calendar 

> Full screen calendar component, support one-way, round-trip calendar selection, can display holidays and setting additional information.

## [Demo](https://h5.m.taobao.com/trip/wxc-page-calendar/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-page-calendar%2Fdemo%2Findex.native-min.js)
<img src="https://gw.alipayobjects.com/zos/rmsportal/adMndOsBWDDRjlFuWuHx.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1jQLWSpXXXXaFXVXXXXXXXXXX-200-200.png" width="160"/>


## Code Example

```vue           
<template>
  <div class="wrapper">
    <div class="btn" @click="showCalendar">
      <text class="btn-txt">one-way</text>
    </div>

    <div class="btn btn-margin yellow" @click="showReturnCalendar">
      <text class="btn-txt">round-trip</text>
    </div>

    <div class="panel">
      <text v-if="currentDate" class="text">current date: {{currentDate}}</text>
    </div>

    <wxc-page-calendar :date-range="dateRange"
                       :selected-date="selectedDate"
                       :selected-note="selectedNote"
                       :is-range="isRange"
                       :minibar-cfg="minibarCfg"
                       :desc-list="descList"
                       @wxcPageCalendarBackClicked="wxcPageCalendarBackClicked"
                       @wxcPageCalendarDateSelected="wxcPageCalendarDateSelected"
                       ref="wxcPageCalendar"></wxc-page-calendar>
  </div>
</template>
<script>
  import { WxcPageCalendar } from 'weex-ui';
  export default {
    components: {
      WxcPageCalendar
    },
    data: () => ({
      currentDate: '',
      selectedDate: ['2017-06-23', '2017-06-30'],
      isRange: true,
      dateRange: ['2017-06-10', '2018-06-10'],
      selectedNote: ['dep', 'arr', 'round'],
      minibarCfg: {
        title: 'Select Date'
      },
      descList: [
        { date: '2017-06-23', value: '￥200' },
        { date: '2017-06-24', value: '￥200' },
        { date: '2017-06-25', value: '￥200' },
        { date: '2017-06-26', value: '￥200' },
        { date: '2017-06-27', value: '￥222' },
        { date: '2017-06-28', value: '￥341' },
        { date: '2017-06-29', value: '￥230' },
        { date: '2017-06-30', value: '￥2000' }
      ]
    }),
    methods: {
      wxcPageCalendarDateSelected (e) {
        this.selectedDate = e.date;
        this.currentDate = e.date;
      },
      wxcPageCalendarBackClicked () {
      },
      showCalendar () {
        this.isRange = false;
        setTimeout(() => {
          this.$refs['wxcPageCalendar'].show();
        }, 10);
      },
      showReturnCalendar () {
        this.isRange = true;
        setTimeout(() => {
          this.$refs['wxcPageCalendar'].show();
        }, 10);
      }
    }
  };
</script>

```

More details can be found in [here](https://github.com/alibaba/weex-ui/blob/master/example/page-calendar/index.vue)


### Api

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| date-range | `Array` |`Y`| `[]` | date range |
| selected-date | `Array` |`N`| `[]` | default date select value |
| is-range | `Boolean` |`N`| `false` | whether is range trip  |
| selected-note | `Array` |`N`| `['开始', '到达', '往返']` | selected note |
| desc-list | `Array` |`N`| `[{}]` | desc info |
| show-header | `Boolean` |`N`| `false` | whether show minibar in native |
| minibar-cfg | `Object` |`N`| `{}` | [minibar config](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-page-calendar/index.vue#L65)|

### Event

```
// @wxcPageCalendarDateSelected="calendarDateSelect"  
// @wxcPageCalendarBackClicked="wxcPageCalendarBackClicked"  
// @wxcPageCalendarHide="wxcPageCalendarHide"
```

