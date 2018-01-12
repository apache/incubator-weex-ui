<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/12/25. -->

<template>
  <text class="icon-font" :style="mergeStyle" @click="itemClicked(name)">{{Icon[name]}}</text>
</template>

<style scoped>
  .icon-font {
    color: #666666;
  }
</style>

<script>
  import Icon from './type';

  const dom = weex.requireModule('dom');

  export default {
    props: {
      name: {
        default: 'success',
        type: String
      },
      size: {
        default: 'small',
        type: String
      },
      iconStyle: {
        type: Object,
        default: () => ({})
      }
    },
    data: () => ({
      Icon
    }),
    beforeCreate () {
      dom.addRule('fontFace', {
        'fontFamily': "weexUiIconFont",
        'src': "url('//at.alicdn.com/t/font_520368_r89ekv69euahsemi.ttf')"
      });
    },
    computed: {
      mergeStyle () {
        const { iconStyle, size } = this;
        let fontSize = '48px';
        switch (size) {
          case 'xs':
            fontSize = '24px';
            break;
          case 'small':
            fontSize = '48px';
            break;
          case 'medium':
            fontSize = '72px';
            break;
          case 'big':
            fontSize = '128px';
            break;
          default:
            fontSize = '48px';
        }
        return {
          fontFamily: 'weexUiIconFont',
          fontSize,
          ...iconStyle
        }
      }
    },
    methods: {
      itemClicked (name) {
        this.$emit('wxcIconClicked', {
          name
        });
      }
    },
  }
</script>
