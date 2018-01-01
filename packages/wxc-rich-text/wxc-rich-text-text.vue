<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/07/28. -->

<template>
  <text :class="['wxc-text', textTheme,hasTextMargin ? 'margin-text' : '']" :style="themeStyle">{{textValue}}</text>
</template>

<style scoped>
  .wxc-text {
    font-size: 24px;
    color: #3d3d3d;
  }

  .black {
    color: #3D3D3D;
  }

  .yellow {
    color: #EE9900;
  }

  .blue {
    color: #30A0FF;
  }

  .gray {
    color: #A5A5A5;
  }

  .red {
    color: #FF5000;
  }

  .margin-text {
    margin-right: 6px;
  }
</style>

<script>
  export default {
    props: {
      textValue: {
        type: String,
        default: ''
      },
      textTheme: {
        type: String,
        default: 'gray'
      },
      textStyle: {
        type: Object,
        default: () => ({})
      },
      hasTextMargin: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      themeStyle () {
        let style = {};
        const textStyle = this.textStyle;
        if (textStyle && textStyle.fontSize) {
          style = {
            ...style,
            fontSize: `${textStyle.fontSize}px`,
            height: `${textStyle.fontSize * 1.2}px`
          }
        }
        if (textStyle && textStyle.color) {
          style = {
            ...style,
            color: textStyle.color
          }
        }
        return style;
      }
    }
  };
</script>
