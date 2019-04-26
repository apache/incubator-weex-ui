<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/07/28. -->
<!-- just hack for babel-plugin-component !!!-->

<template>
  <div class="wxc-special-rich-text" @click="$emit('wxcSpecialRichTextClick')">
    <div class="tag-div"
         :style="Object.assign({top:top+'px'}, newList[0].tagDivStyle)">
      <image class="wxc-image"
             v-if="newList[0] && newList[0].type === 'icon' && newList[0].src"
             :src="newList[0].src"
             quality="original"
             :original="true"
             @load="onLoad"
             :style="newList[0].style"
             :aria-hidden="true">
      </image>
      <wxc-rich-text-tag v-if="newList[0] && newList[0].type === 'tag' && newList[0].value"
                         :tag-value="newList[0].value"
                         :tag-theme="newList[0].theme"
                         :tag-style="newList[0].style"></wxc-rich-text-tag>
    </div>
    <text :class="['wxc-text', newList[0].theme]"
          :style="newList[0].style"
          v-if="newList[0] && newList[0].type === 'text' && newList[0].value">{{newList[0].value}}</text>

    <text :class="['wxc-text', newList[1].theme]"
          :style="newList[1].style"
          v-if="newList[1] && newList[1].value">{{newList[1].value}}</text>
  </div>
</template>

<style scoped>
  .wxc-special-rich-text {
    position: relative;
  }

  .tag-div {
    position: absolute;
    top: 0;
    color: #A5A5A5;
    font-size: 24px;
    line-height: 30px;
  }

  .wxc-text {
    font-size: 24px;
    line-height: 34px;
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
  import Utils from '../utils';

  const { appName, osName, deviceWidth } = weex.config.env;
  const needHack = ((Utils.env.isAlipay() || appName === 'UC' || appName === 'TUnionSDK') && osName !== 'iOS') || Utils.env.isAndroid();
  const isPad = osName === 'iOS' && deviceWidth > 1300;

  import WxcRichTextText from '../wxc-rich-text/wxc-rich-text-text.vue';
  import WxcRichTextTag from '../wxc-rich-text/wxc-rich-text-tag.vue'

  export default {
    components: {
      WxcRichTextText,
      WxcRichTextTag,
    },
    props: {
      configList: {
        type: [Array, String],
        default: () => ({})
      }
    },
    data: () => ({
      iconWidth: 90,
      iconHeight: 24,
      needHack
    }),
    computed: {
      newList () {
        const { configList, iconHeight, iconWidth, needHack } = this;
        if (Utils.isNonEmptyArray(configList) && configList.length === 2) {
          let r1 = configList[0];
          let r2 = configList[1];
          const iconStyle = r1.style;
          const textStyle = r2.style;
          let style = {};
          let fontSize = 24;
          let tagWidth = iconStyle && iconStyle.width ? iconStyle.width : 24;

          if (textStyle && textStyle.fontSize && !isNaN(textStyle.fontSize)) {
            fontSize = textStyle.fontSize;
            style = {
              fontSize: `${textStyle.fontSize}px`,
              lineHeight: `${Number(textStyle.fontSize * 1.4).toFixed(2)}px`
            }
          }

          if (textStyle && textStyle.color) {
            style = {
              ...style,
              color: textStyle.color
            }
          }

          if (textStyle && textStyle.lines) {
            style = {
              ...style,
              lines: textStyle.lines
            }
          }

          if (r1.type === 'icon' && iconStyle && iconStyle.height && !iconStyle.width) {
            tagWidth = parseInt(iconWidth * (iconStyle.height / iconHeight));
            r1 = {
              ...r1,
              style: {
                width: tagWidth + 'px',
                height: iconStyle.height + 'px'
              }
            }
          }

          if (r1.type === 'icon' && !(iconStyle && iconStyle.height)) {
            r1 = {
              ...r1,
              style: {
                width: iconWidth + 'px',
                height: iconHeight + 'px'
              }
            }
          }

          if (r1.type === 'tag' && iconStyle && iconStyle.width) {
            r1 = {
              ...r1,
              style: { ...iconStyle, width: null }
            }
          }

          let blank = '';
          let num = Math.ceil(tagWidth / fontSize) + 1;

          if (r1.type === 'tag' && r1.value) {
            num = this.countString(r1.value);
          }

          const tagMoreBlank = ((!isPad && num < 7) ? '  ' : '') + (needHack ? '  ' : '') + ((isPad && num < 3) ? '    ' : '');
          const iconMoreBlank = num > 2 ? (needHack ? '     ' : '   ') : ' ';
          if (r1.type === 'tag') {
            blank = new Array(num).join('  ') + tagMoreBlank;
          } else if (r1.type === 'icon') {
            blank = new Array(num).join('  ') + iconMoreBlank;
          }
          blank += (isPad && num > 2) ? '     ' : '';
          const newValue = r2.value ? blank + ` ${r2.value}` : '';

          r2 = {
            ...r2,
            style,
            value: newValue
          };

          return [r1, r2];
        } else {
          return configList;
        }
      },
      top () {
        const { configList, needHack } = this;
        if (Utils.isNonEmptyArray(configList) && configList.length === 2) {
          const iconStyle = configList[0].style;
          const textStyle = configList[1].style;
          let fontSize = 24;
          const tagHeight = iconStyle && iconStyle.height ? iconStyle.height : 26;
          if (textStyle && textStyle.fontSize) {
            fontSize = textStyle.fontSize;
          }
          const d = needHack ? 1.1 : 1.4;
          return Math.ceil((fontSize * d - tagHeight) / 2);
        } else {
          return 0;
        }
      }
    },
    methods: {
      onLoad (e) {
        if (e.success && e.size && e.size.naturalWidth > 0) {
          const { naturalWidth, naturalHeight } = e.size;
          this.iconWidth = naturalWidth;
          this.iconHeight = naturalHeight;
        } else {
          const { configList } = this;
          if (Utils.isNonEmptyArray(configList) && configList.length === 2) {
            const { style } = configList[0];
            if (style && style.height && style.width) {
              this.iconWidth = style.width;
              this.iconHeight = style.height;
            }
          }
        }
      },
      countString (str) {
        const chineseRegex = /[^ -~]/g;
        return str.replace(chineseRegex, '**').length;
      }
    }
  };
</script>
