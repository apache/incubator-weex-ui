<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by 南麓 on 2017/5/25. -->

<template>
  <div class="root">
    <div v-for="(item, index) in cItems"
         :key="item.key"
         :accessible="true"
         :aria-label="`${item.title},${item.desc?item.desc:''},${item.date?item.date:''},${item.highlight?'已完成':'等待完成'}`">
      <div class="title flex-row">
        <div class="line" :class="item.__titleLineClass__" :style="item.__lineStyle__"></div>

        <div class="point" :class="item.__pointClass__" :style="item.__pointStyle__"></div>

        <text class="text-title full-rest" :class="item.__titleTextClass__"
              :style="item.__titleStyle__">{{item.title}}</text>
      </div>

      <div class="content flex-row" :class="item.__contentClass__">
        <div class="line" :class="item.__contentLineClass__" :style="item.__lineStyle__"></div>

        <div class="full-rest">
          <text v-if="item.desc" class="text-desc">{{item.desc}}</text>

          <text v-if="item.date" class="text-date">{{item.date}}</text>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .flex-row {
    flex-direction: row;
  }

  .full-rest {
    flex: 1;
  }

  .root {
    padding-top: 28px;
    padding-bottom: 24px;
    background-color: #ffffff;
  }

  .content {
    padding-top: 9px;
    padding-bottom: 42px;
  }

  .last-one-content {
    padding-bottom: 0;
  }

  .title,
  .content {
    padding-left: 70px;
    padding-right: 70px;
  }

  .line {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 38px;
    width: 2px;
    background-color: #FFC300;
  }

  .first-one-title-line {
    top: 20px;
  }

  .last-one-title-line {
    bottom: 20px;
  }

  .last-one-content-line {
    width: 0;
  }

  .point {
    position: absolute;
    top: 13px;
    left: 32px;
    width: 14px;
    height: 14px;
    background-color: #FFF0BD;
    border-style: solid;
    border-width: 2px;
    border-color: #EE9900;
    border-radius: 100px;
  }

  .highlight-point {
    top: 7px;
    left: 26px;
    width: 26px;
    height: 26px;
    background-color: #EE9900;
    border-style: solid;
    border-width: 6px;
    border-color: #FFE78D;
  }

  .text-title {
    font-size: 30px;
    color: #3d3d3d;
  }

  .text-highlight-title {
    color: #EE9900;
  }

  .text-desc,
  .text-date {
    font-size: 24px;
    color: #a5a5a5;
  }

  .text-desc {
    margin-bottom: 12px;
  }
</style>

<script>
  export default {
    props: {
      list: {
        type: Array,
        required: true
      },
      themeColor: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      cItems () {
        return this.adapter(this.list);
      }
    },
    methods: {
      adapter (items) {
        const {
          lineColor,
          pointInnerColor,
          pointBorderColor,
          highlightTitleColor,
          highlightPointInnerColor,
          highlightPointBorderColor
        } = this.themeColor;
        const len = items.length;
        const pre = Date.now();

        return items.map((item, index) => {
          item.key = `${pre}_${index}`;
          item.__titleLineClass__ = [];
          item.__contentClass__ = [];
          item.__contentLineClass__ = [];
          item.__pointClass__ = [];
          item.__titleTextClass__ = [];
          item.__pointStyle__ = {};
          item.__lineStyle__ = {};
          item.__titleStyle__ = {};

          if (lineColor) item.__lineStyle__.backgroundColor = lineColor;
          if (pointInnerColor) item.__pointStyle__.backgroundColor = pointInnerColor;
          if (pointBorderColor) item.__pointStyle__.borderColor = pointBorderColor;

          if (index === 0) {
            item.__titleLineClass__.push('first-one-title-line');
          }

          if (index === len - 1) {
            item.__titleLineClass__.push('last-one-title-line');
            item.__contentClass__.push('last-one-content');
            item.__contentLineClass__.push('last-one-content-line');
          }

          if (item.highlight) {
            item.__pointClass__.push('highlight-point');
            item.__titleTextClass__.push('text-highlight-title');
            if (highlightTitleColor) item.__titleStyle__.color = highlightTitleColor;
            if (highlightPointInnerColor) item.__pointStyle__.backgroundColor = highlightPointInnerColor;
            if (highlightPointBorderColor) item.__pointStyle__.borderColor = highlightPointBorderColor;
          }
          return item;
        });
      }
    }
  }
</script>
