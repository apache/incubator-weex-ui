# wxc-page-calendar 

> Weex 全屏日历组件,支持单程、往返日历的选择，可显示节假日，支持设置附加信息

## [Demo](https://h5.m.taobao.com/trip/wxc-page-calendar/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-page-calendar%2Fdemo%2Findex.native-min.js)
<img src="https://gw.alipayobjects.com/zos/rmsportal/adMndOsBWDDRjlFuWuHx.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1jQLWSpXXXXaFXVXXXXXXXXXX-200-200.png" width="160"/>


## 使用方法

```vue           
<template>
  <div class="wrapper">
    <div class="btn" @click="showCalendar">
      <text class="btn-txt">单程日历</text>
    </div>

    <div class="btn btn-margin yellow" @click="showReturnCalendar">
      <text class="btn-txt">往返日历</text>
    </div>

    <div class="panel">
      <text v-if="currentDate" class="text">当前日期: {{currentDate}}</text>
    </div>

    <wxc-page-calendar :date-range="dateRange"
                       :animationType="animationType"
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
      animationType: 'push',
      currentDate: '',
      selectedDate: ['2017-06-23', '2017-06-30'],
      isRange: true,
      calendarTitle: '选择日期',
      dateRange: ['2017-06-10', '2018-06-10'],
      selectedNote: ['出发', '到达', '往返'],
      minibarCfg: {
        title: '日期选择'
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

更详细代码可以参考 [demo](https://github.com/alibaba/weex-ui/blob/master/example/page-calendar/index.vue)


### 可配置参数

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| date-range | `Array` |`Y`| `[]` | 日历范围 |
| selected-date | `Array` |`N`| `[]` | 选中日期 |
| is-range | `Boolean` |`N`| `false` | 是否是往返日历  |
| selected-note | `Array` |`N`| `['开始', '到达', '往返']` | 选中提示语 |
| desc-list | `Array` |`N`| `[{}]` | 附加信息 |
| show-header | `Boolean` |`N`| `false` | 是否在 Native 下显示导航栏 |
| minibar-cfg | `Object` |`N`| `{}` | 导航栏 [配置](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-page-calendar/index.vue#L65)，降级版本默认显示 |
| animation-type | `String` | `N` | `push` | 自定义转场动画类型目前支持model和push|
| selected-cell-style | `Object` | `N` | `{}` |覆盖选中日期的 cell 样式|
| selected-text-style | `Object` | `N` | `{}` |覆盖选中日期的 text 样式|
### 事件回调

```
// 日期选择
@wxcPageCalendarDateSelected="calendarDateSelect"  
// 返回按钮点击
@wxcPageCalendarBackClicked="wxcPageCalendarBackClicked"  
// 隐藏日历事件
@wxcPageCalendarHide="wxcPageCalendarHide"
```

