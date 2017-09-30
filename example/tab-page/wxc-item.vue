<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/03/31. -->

<template>
  <div :class="['wxc-item',hasTwoTags?'two-tags-item':'',isBigImg?'big-mod':'']"
       :ref="'wxc-item-' + extId"
       :prevent-move-event="preventMoveEvent"
       :style="{ borderBottomWidth: extIndex+1 == extTotal ? '1px' : 0 }"
       @horizontalpan="dispatchPan"
       @appear="onItemAppear"
       @disappear="onItemDisAppear"
       @click="itemClicked(url)">

    <image :src="image"
           :class="['item-image',isBigImg?'big-image':'']"
           resize="cover"></image>

    <div class="category-tag"
         v-if="categoryTag">
      <text class="tag-text">{{categoryTag}}</text>
    </div>

    <div :class="['image-desc',isBigImg?'big-image-desc':'']"
         v-if="imageText"
         :style="{backgroundColor: 'rgba(0, 0, 0,' + (imageDescOpacity) + ')' }">
      <text class="image-text">{{imageText}}</text>
    </div>

    <div class="item-content"
         :style="{ borderBottomWidth: (extIndex+1 == extTotal || hideBorderBottom) ? 0 : '1px'}">
      <text :class="['item-text', titleLineCount==1 && 'one-line']"
            v-if="isTitleString">{{title}}</text>
      <wxc-special-rich-text :config-list="title"
                             v-else></wxc-special-rich-text>
      <div
        :class="['item-desc', descLineCount==1 && 'one-desc', titleLineCount==1 && descLineCount == 1 && 'sub-margin']">
        <wxc-rich-text :config-list="newDesc"></wxc-rich-text>
      </div>

      <div :class="['item-tag', titleLineCount==1 && descLineCount==1 && 'sub-margin']"
           v-if="newTags && newTags.length>0">
        <wxc-rich-text :config-list="newTags"></wxc-rich-text>
      </div>

      <div class="item-tag"
           v-if="newTags2 && newTags2.length>0">
        <wxc-rich-text :config-list="newTags2"></wxc-rich-text>
      </div>
      <slot name="progress"></slot>
      <div class="item-price">
        <wxc-rich-text :config-list="priceDesc"></wxc-rich-text>
        <div class="price-num">
          <text class="yen">&#65509;</text>
          <text class="price">{{price}}</text>
          <text class="postfix"
                v-if="postfix">起</text>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .wxc-item {
    width: 750px;
    height: 246px;
    flex-direction: row;
    position: relative;
    border-bottom-style: solid;
    border-bottom-color: #e0e0e0;
  }

  .big-mod {
    height: 306px;
  }

  .two-tags-item {
    height: 275px;
  }

  .item-image {
    width: 198px;
    height: 198px;
    margin-top: 24px;
    margin-left: 24px;
    margin-bottom: 24px;
    margin-right: 24px;
  }

  .big-image {
    width: 258px;
    height: 258px;
  }

  .image-desc {
    position: absolute;
    left: 24px;
    top: 186px;
    width: 198px;
    height: 36px;
    background-color: rgba(0, 0, 0, .8);
    align-items: center;
    justify-content: center;
  }

  .big-image-desc {
    top: 244px;
    width: 258px;
  }

  .image-text {
    font-size: 24px;
    color: #ffffff;
  }

  .item-content {
    flex: 1;
    border-bottom-color: #e0e0e0;
    border-bottom-style: solid;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 24px;
    padding-right: 24px;
    padding-bottom: 18px;
    overflow: hidden;
  }

  .item-desc {
    align-items: center;
  }

  .item-text {
    font-size: 28px;
    line-height: 40px;
    color: #333333;
    lines: 2;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .item-sub-text {
    color: #A5A5A5;
    font-size: 24px;
    lines: 2;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .item-tag {
    flex-direction: row;
  }

  .item-price {
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    height: 36px;
  }

  .price-num {
    flex-direction: row;
    align-items: center;
  }

  .price-des {
    color: #A5A5A5;
    font-size: 24px;
  }

  .yen {
    color: #FF5E00;
    font-size: 24px;
    margin-right: 2px;
    margin-top: 6px;
  }

  .price {
    color: #FF5E00;
    font-size: 36px;
  }

  .postfix {
    font-size: 24px;
    color: #A5A5A5;
    margin-top: 6px;
    margin-left: 2px;
  }

  .one-line {
    width: 480px;
    lines: 1;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .one-desc {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .sub-margin {
    margin-top: -30px;
  }

  .category-tag {
    padding-right: 12px;
    padding-left: 12px;
    height: 48px;
    justify-content: center;
    border-bottom-left-radius: 100px;
    border-top-left-radius: 100px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 100px;
    background-color: #FFC900;
    position: absolute;
    top: 34px;
    left: 34px;
  }

  .tag-text {
    color: #3d3d3d;
    font-size: 24px;
  }

</style>

<script>
  const Utils = require('./utils');
  const expressionBinding = weex.requireModule('expressionBinding');
  import { WxcRichText, WxcSpecialRichText } from '../../index';

  module.exports = {
    components: { WxcRichText, WxcSpecialRichText },
    props: {
      title: {
        type: [String, Array],
        default: ''
      },
      imageText: {
        type: String,
        default: ''
      },
      imageDescOpacity: {
        type: [String, Number],
        default: 0.8
      },
      isBigImg: {
        type: Boolean,
        default: false
      },
      image: {
        type: String,
        default: ''
      },
      desc: {
        type: Array,
        default: () => ([])
      },
      url: {
        type: String,
        default: ''
      },
      priceDesc: {
        type: [String, Array],
        default: ''
      },
      price: {
        type: [String, Number],
        default: 0
      },
      titleLineCount: {
        type: [String, Number],
        default: 2
      },
      descLineCount: {
        type: [String, Number],
        default: 1
      },
      tags: {
        type: [Array, String],
        default: () => ([])
      },
      tags2: {
        type: [Array, String],
        default: () => ([])
      },
      postfix: {
        type: Boolean,
        default: false
      },
      categoryTag: {
        type: String,
        default: ''
      },
      extId: {
        type: [String, Number],
        default: 0
      },
      extIndex: {
        type: [String, Number],
        default: 0
      },
      extTotal: {
        type: [String, Number],
        default: 1
      },
      supportSlide: {
        type: Boolean,
        default: false
      },
      hideBorderBottom: {
        type: Boolean,
        default: false
      },
      spm: {
        type: String,
        default: ''
      }
    },
    data: () => ({
      isPanning: false,
      preventMoveEvent: true,
      hasTwoTags: false,
      appearMap: []
    }),
    computed: {
      newDesc () {
        return this.trunkRichText(this.desc);
      },
      newTags () {
        return this.trunkRichText(this.tags);
      },
      newTags2 () {
        return this.trunkRichText(this.tags2);
      },
      isTitleString () {
        return Utils.isString(this.title);
      }
    },
    created () {
      const { tags2 } = this;
      if (Array.isArray(tags2) && tags2.length > 0) {
        this.hasTwoTags = true;
      }
    },
    methods: {
      trunkRichText (richText) {
        const { isBigImg } = this;
        const len = isBigImg ? 31 : 34;
        if (Array.isArray(richText) && richText.length > 0) {
          const newRich = [];
          richText.forEach((item, i) => {
            const { value, type } = item;
            if (type === 'text' && value) {
              item.value = Utils.truncateString(value, len);
              if (i === 0 && richText[1] && richText[1].value) {
                item.value = Utils.truncateString(value, 24);
              }
            }
            newRich.push(item);
          });
          return newRich;
        } else if (richText && Utils.isString(richText)) {
          return Utils.truncateString(richText, len);
        } else {
          return [];
        }
      },
      itemClicked (url) {
        const { ttid } = weex.config.env;
        if (!url || this.isPanning && this.supportSlide) {
          return;
        }
        this.$emit('wxcItemGoodClick', { index: this.extIndex });
//        Utils.goToH5Page(url, this.spm, ttid, true);
      },
      onItemAppear () {
        const extId = this.extId;
        if (!this.appearMap[extId] && Utils.env.supportsEBForAndroid() && this.supportSlide) {
          this.appearMap[extId] = true;
          expressionBinding.enableBinding(this.$refs[`wxc-item-${extId}`].ref, 'pan');
        }
      },

      onItemDisAppear () {
        const extId = this.extId;
        if (this.appearMap[extId] && Utils.env.supportsEBForAndroid() && this.supportSlide) {
          this.appearMap[extId] = false;
          expressionBinding.disableBinding(this.$refs[`wxc-item-${extId}`].ref, 'pan');
        }
      },
      dispatchPan (e) {
        const extId = this.extId;
        if (Utils.env.supportsEBForAndroid() && this.supportSlide) {
          if (e.state === 'start') {
            this.isPanning = true;
            const element = this.$refs[`wxc-item-${extId}`];
            this.$emit('wxcItemGoodPan', { element });
          } else if (e.state === 'end') {
            setTimeout(() => {
              this.isPanning = false;
            }, 50);
          }
        }
      }
    }
  };
</script>
