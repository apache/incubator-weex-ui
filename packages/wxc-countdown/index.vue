<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by 提隐 on 17/07/28. -->

<template>
  <div :style="mrTimeWrapStyle">
    <div class="time-dot-wrap">
      <div :style="mrTimeBoxStyle"><text :style="mrTimeTextStyle">{{countDownData.hour}}</text></div>
      <div :style="mrDotBoxStyle"><text :style="mrDotTextStyle">{{tplObj().firstDot}}</text></div>

      <div :style="mrTimeBoxStyle"><text :style="mrTimeTextStyle">{{countDownData.minute}}</text></div>
      <div :style="mrDotBoxStyle"><text :style="mrDotTextStyle">{{tplObj().secondDot}}</text></div>

      <div :style="mrTimeBoxStyle"><text :style="mrTimeTextStyle">{{countDownData.second}}</text></div>
    </div>
  </div>
</template>

<style scoped>
  .time-dot-wrap {
    flex-direction: row;
    align-items: center;
  }
</style>

<script>
  export default {
    props: {
      // 时间戳
      time: {
        type: Number,
        default: 1501200000000
      },
      // 倒计时的间隔,单位为"毫秒"
      interval: {
        type: Number,
        default: 1000
      },
      tpl: {
        type: String,
        default: '{h}:{m}:{s}'
      },
      // 最外层包裹 style
      timeWrapStyle: Object,
      // 数字盒子 style
      timeBoxStyle: Object,
      // : 盒子Style
      dotBoxStyle: Object,
      // 数字文字 Style
      timeTextStyle: Object,
      // : 文字Style
      dotTextStyle: Object
    },
    data: () => ({
      NOW_DATE: new Date().getTime(),
      completed: false,
      TIME_WRAP_STYLE: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '12px',
        marginRight: '12px'
      },
      TIME_BOX_STYLE: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333333',
        height: '30px',
        width: '30px'
      },
      DOT_BOX_STYLE: {
        width: '18px',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
      TIME_TEXT_STYLE: {
        color: '#FFCC80',
        fontSize: '18px'
      },
      DOT_TEXT_STYLE: {
        color: '#333333',
        fontSize: '18px',
        fontWeight: 'bold'
      }
    }),
    mounted () {
      setInterval(() => {
        this.NOW_DATE = new Date().getTime();
      }, this.interval)
    },
    computed: {
      mrTimeWrapStyle () {
        return {
          ...this.TIME_WRAP_STYLE,
          ...this.timeWrapStyle
        }
      },
      mrTimeBoxStyle () {
        return {
          ...this.TIME_BOX_STYLE,
          ...this.timeBoxStyle
        }
      },
      mrDotBoxStyle () {
        return {
          ...this.DOT_BOX_STYLE,
          ...this.dotBoxStyle
        }
      },
      mrTimeTextStyle () {
        return {
          ...this.TIME_TEXT_STYLE,
          ...this.timeTextStyle
        }
      },
      mrDotTextStyle () {
        return {
          ...this.DOT_TEXT_STYLE,
          ...this.dotTextStyle
        }
      },

      countDownData () {
        const timeSpacing = this.time - this.NOW_DATE;

        // 倒计时结束了
        if (timeSpacing < 0) {
          if (this.completed === false) {
            this.$emit('wxcOnComplete');
          }
          this.completed = true;
          return {
            hour: '00',
            minute: '00',
            second: '00'
          }
        }

        // 计算小时
        const hours = Math.floor(timeSpacing / (3600 * 1000));

        // 计算分钟(去除小时)
        const minute = Math.floor(timeSpacing % (3600 * 1000) / (60 * 1000));

        // 计算秒数(去除分钟)
        const second = Math.floor(timeSpacing % (60 * 1000) / 1000);

        return {
          hour: hours < 10 ? '0' + hours : hours,
          minute: minute < 10 ? '0' + minute : minute,
          second: second < 10 ? '0' + second : second
        }
      }
    },

    methods: {
      // 分析模板
      tplObj () {
        const tplIndexOfHours = this.tpl.indexOf('h');
        const tplIndexOfMinutes = this.tpl.indexOf('m');
        const tplIndexOfSeconds = this.tpl.indexOf('s');

        return {
          firstDot: this.tpl.slice(tplIndexOfHours + 2, tplIndexOfMinutes - 1),
          secondDot: this.tpl.slice(tplIndexOfMinutes + 2, tplIndexOfSeconds - 1)
        }
      }
    }
  }
</script>
