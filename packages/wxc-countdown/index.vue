<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by 提隐 on 17/07/28. -->

<template>
  <div :style="mrTimeWrapStyle">
    <div class="time-dot-wrap">
      <div :style="mrTimeBoxStyle"
           v-if="tplIndexOfDays !== -1"
           :accessible="true"
           :aria-label="`${countDownData.day}天`">
        <text :style="mrTimeTextStyle">{{countDownData.day}}</text>
      </div>
      <div :style="mrDotBoxStyle" v-if="tplIndexOfDays !== -1" :aria-hidden="true">
        <text :style="mrDotTextStyle">{{getDot(tplIndexOfDays, tplIndexOfHours)}}</text>
      </div>

      <div :style="mrTimeBoxStyle"
           v-if="tplIndexOfHours !== -1"
           :accessible="true"
           :aria-label="`${countDownData.hour}时`">
        <text :style="mrTimeTextStyle">{{countDownData.hour}}</text>
      </div>
      <div :style="mrDotBoxStyle" v-if="tplIndexOfHours !== -1" :aria-hidden="true">
        <text :style="mrDotTextStyle">{{getDot(tplIndexOfHours, tplIndexOfMinutes)}}</text>
      </div>

      <div :style="mrTimeBoxStyle" v-if="tplIndexOfMinutes !== -1"
           :accessible="true"
           :aria-label="`${countDownData.minute}分`">
        <text :style="mrTimeTextStyle">{{countDownData.minute}}</text>
      </div>
      <div :style="mrDotBoxStyle" v-if="tplIndexOfMinutes !== -1" :aria-hidden="true">
        <text :style="mrDotTextStyle">{{getDot(tplIndexOfMinutes, tplIndexOfSeconds)}}</text>
      </div>

      <div :style="mrTimeBoxStyle"
           v-if="tplIndexOfSeconds !== -1"
           :accessible="true"
           :aria-label="`${countDownData.second}秒`">
        <text :style="mrTimeTextStyle">{{countDownData.second}}</text>
      </div>
      <div :style="mrDotBoxStyle" v-if="tplIndexOfSeconds !== -1" :aria-hidden="true">
        <text :style="mrDotTextStyle">{{getDot(tplIndexOfSeconds, -1)}}</text>
      </div>
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
      tplIndexOfDays: -1,
      tplIndexOfHours: -1,
      tplIndexOfMinutes: -1,
      tplIndexOfSeconds: -1,
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
      }, this.interval);

      this.tplIndexOfDays = this.tpl.indexOf('d');
      this.tplIndexOfHours = this.tpl.indexOf('h');
      this.tplIndexOfMinutes = this.tpl.indexOf('m');
      this.tplIndexOfSeconds = this.tpl.indexOf('s');
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
            day: '00',
            hour: '00',
            minute: '00',
            second: '00'
          }
        }

        let day = 0;
        let hour = 0;
        let minute = 0;
        let second = 0;

        if (this.tplIndexOfDays !== -1) {
          day = Math.floor(timeSpacing / (24 * 60 * 60 * 1000));
          hour = Math.floor(timeSpacing % (24 * 60 * 60 * 1000) / (60 * 60 * 1000));
        } else {
          day = 0;
          hour = Math.floor(timeSpacing / (60 * 60 * 1000));
        }

        if (this.tplIndexOfHours !== -1) {
          hour = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000) / (60 * 60 * 1000));
          minute = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000) % (60 * 60 * 1000) / (60 * 1000));
        } else {
          hour = 0;
          minute = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000) / (60 * 1000));
        }

        if (this.tplIndexOfMinutes !== -1) {
          minute = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000) / (60 * 1000));
          second = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000) % (60 * 1000) / 1000);
        } else {
          minute = 0;
          second = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000) / 1000);
        }

        return {
          day: day < 10 ? '0' + day : '' + day,
          hour: hour < 10 ? '0' + hour : '' + hour,
          minute: minute < 10 ? '0' + minute : '' + minute,
          second: second < 10 ? '0' + second : '' + second
        }
      }
    },

    methods: {
      getDot (prevTagIndex, nextTagIndex = -1) {
        if (nextTagIndex === -1) {
          return this.tpl.slice(prevTagIndex + 2)
        }
        return this.tpl.slice(prevTagIndex + 2, nextTagIndex - 1)
      }
    }
  }
</script>
