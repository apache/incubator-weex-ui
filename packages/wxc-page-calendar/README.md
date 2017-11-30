# wxc-page-calendar 

> 一个性能更好的weex全屏日历组件

- 支持单程、往返日历的选择
- 支持节假日显示
- 支持设置日期附加信息

-----

## [Demo预览](https://h5.m.taobao.com/trip/wxc-page-calendar/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-page-calendar%2Fdemo%2Findex.native-min.js)
<img src="https://gw.alipayobjects.com/zos/rmsportal/adMndOsBWDDRjlFuWuHx.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1jQLWSpXXXXaFXVXXXXXXXXXX-200-200.png" width="160"/>


## 使用方法

```vue           
<template>
  <div class="wrapper">
    <div class="btn"
         @click="showCalendar">
      <text class="btn-txt">单程日历</text>
    </div>

    <div class="btn btn-margin yellow"
         @click="showReturnCalendar">
      <text class="btn-txt">往返日历</text>
    </div>

    <div class="panel">
      <text v-if="currentDate"
            class="text">当前日期: {{currentDate}}</text>
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
  import { wxcPageCalendar } from 'weex-ui';
  export default {
    components: {
      wxcPageCalendar
    },
    data: () => ({
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

| 名称      | 类型     | 默认值   | 备注  |
|-------------|------------|--------|-----|
| selected-date | `Array` | [] | 当前选择日期,数组格式['2016-12-10']、['2016-12-10','2016-12-15']  |
| date-range | `Array` | [] | 日期范围,数组格式['2016-11-10','2016-12-15']  |
| is-range | `Bool` | false | 是否是往返日历  |
| selected-note | `Array` | `['开始', '到达', '往返']` | 选中提示语，数组格式 |
| desc-list | `Array` | `[{}]` | 日期附加显示信息譬如{ date: '2017-06-30', value: '￥2000'|
| minibar-cfg | `Object` | { 'title': '选择日期', 'background-color': '#FFC900', 'text-color': '#3D3D3D' } | 降级web版本中需要显示导航栏，可以配置标题颜色|
| show-header | `Boolean` | `false` | 是否需要在native下面显示头部，默认是false |
| need-destroy | `Boolean` | `false` | 是否需要每次销毁节点，会更快但是体验不是很好 |


### 事件回调

```
// 日期选择
@wxcPageCalendarDateSelected="calendarDateSelect"  
// 返回按钮点击
@wxcPageCalendarBackClicked="wxcPageCalendarBackClicked"  
// 隐藏日历事件
@wxcPageCalendarHide="wxcPageCalendarHide"
```

