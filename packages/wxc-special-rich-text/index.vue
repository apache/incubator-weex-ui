<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/07/28. -->
<!-- just hack for babel-plugin-component !!!-->

<template>
  <div class="wxc-special-rich-text">
    <div class="tag-div"
         :style="{top:top+'px'}">
      <wxc-rich-text-icon v-if="newList[0].type == 'icon' && newList[0].src"
                          :icon-src="newList[0].src"
                          :icon-style="newList[0].style"></wxc-rich-text-icon>
      <wxc-rich-text-tag v-if="newList[0].type=='tag' && newList[0].value"
                         :tag-value="newList[0].value"
                         :tag-theme="newList[0].theme"
                         :tag-style="newList[0].style"></wxc-rich-text-tag>
    </div>
    <text :class="['wxc-text', newList[1].theme]"
          :style="newList[1].style"
          v-if="newList[1].value">{{newList[1].value}}</text>
  </div>
</template>

<style scoped>
  .wxc-special-rich-text {
    position: relative;
  }

  .tag-div {
    position: absolute;
    top: 0;
    left: 0;
    color: #A5A5A5;
    font-size: 24px;
    line-height: 30px;
  }

  .wxc-text {
    font-size: 24px;
    color: #3d3d3d;
    lines: 2;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .black {
    color: #3D3D3D;
  }

  .yellow {
    color: #EE9900;
  }

  .blue {
    color: #30A0FF,
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
  import Utils from '../utils';

  import WxcRichTextText from '../wxc-rich-text/wxc-rich-text-text.vue';
  import WxcRichTextIcon from '../wxc-rich-text/wxc-rich-text-icon.vue';
  import WxcRichTextTag from '../wxc-rich-text/wxc-rich-text-tag.vue'

  export default {
    components: {
      WxcRichTextText,
      WxcRichTextIcon,
      WxcRichTextTag
    },
    props: {
      configList: {
        type: [Array, String],
        default: () => ({})
      }
    },
    computed: {
      newList () {
        const { configList } = this;
        if (Utils.isNonEmptyArray(configList) && configList.length === 2) {
          let r1 = configList[0];
          let r2 = configList[1];
          const iconStyle = r1.style;
          const textStyle = r2.style;
          let style = {};
          let fontSize = 24;
          const tagWidth = iconStyle && iconStyle.width ? iconStyle.width : 24;

          if (textStyle && textStyle.fontSize) {
            fontSize = textStyle.fontSize;
            style = {
              fontSize: `${textStyle.fontSize}px`,
              lineHeight: `${textStyle.fontSize * 1.4}px`
            }
          }

          if (textStyle && textStyle.color) {
            style = {
              ...style,
              color: textStyle.color
            }
          }

          if (r1.type === 'tag' && iconStyle && iconStyle.width) {
            r1 = {
              ...r1,
              style: { ...iconStyle, width: null }
            }
          }
          const newValue = r2.value ? new Array(Math.ceil(tagWidth / fontSize) + 1).join('    ') + ` ${r2.value}` : '';
          r2 = {
            ...r2,
            style,
            value: newValue
          }
          return [r1, r2];
        } else {
          return [];
        }
      },
      top () {
        const { configList } = this;
        if (Utils.isNonEmptyArray(configList) && configList.length === 2) {
          const iconStyle = configList[0].style;
          const textStyle = configList[1].style;
          let fontSize = 24;
          const tagHeight = iconStyle && iconStyle.height ? iconStyle.height : 26;
          if (textStyle && textStyle.fontSize) {
            fontSize = textStyle.fontSize;
          }
          return Math.ceil((fontSize * 1.3 - tagHeight) / 2);
        } else {
          return 0;
        }
      }
    }
  };
</script>
