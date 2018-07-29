<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/07/28. -->

<template>
  <div>
    <div class="wxc-rich-text" v-if="isNotEmptyArray">
      <div v-for="v in configList">
        <wxc-rich-text-text v-if="v.type=='text' && v.value"
                            :text-value="v.value"
                            :text-style="v.style"
                            :has-text-margin="hasTextMargin"
                            :text-theme="v.theme"></wxc-rich-text-text>

        <wxc-rich-text-link v-if="v.type=='link' && v.href && v.value"
                            :link-value="v.value"
                            :link-href="v.href"
                            :link-style="v.style"
                            :has-text-margin="hasTextMargin"
                            :link-theme="v.theme"
                            @wxcRichTextLinkClick="linkClick"></wxc-rich-text-link>

        <wxc-rich-text-icon v-if="v.type=='icon' && v.src"
                            :icon-src="v.src"
                            :icon-style="v.style"></wxc-rich-text-icon>

        <wxc-rich-text-tag v-if="v.type=='tag' && v.value"
                           :tag-value="v.value"
                           :tag-theme="v.theme"
                           :tag-style="v.style"></wxc-rich-text-tag>
      </div>
    </div>
    <text class="default-text" v-if="isString">{{configList}}</text>
  </div>
</template>

<style scoped>
  .wxc-rich-text {
    align-items: center;
    flex-direction: row;
  }

  .default-text {
    color: #A5A5A5;
    font-size: 24px;
    line-height: 30px;
  }
</style>

<script>
  import Utils from '../utils';

  export default {
    components: {
      WxcRichTextText: require('./wxc-rich-text-text.vue'),
      WxcRichTextLink: require('./wxc-rich-text-link.vue'),
      WxcRichTextIcon: require('./wxc-rich-text-icon.vue'),
      WxcRichTextTag: require('./wxc-rich-text-tag.vue')
    },
    props: {
      configList: {
        type: [Array, String],
        default: function() {
          return []
        }
      },
      hasTextMargin: {
        type: Boolean,
        default: true
      }
    },
    data: () => ({}),
    computed: {
      isNotEmptyArray() {
        return Utils.isNonEmptyArray(this.configList);
      },
      isString() {
        return Utils.isString(this.configList);
      }
    },
    methods: {
      linkClick(e) {
        this.$emit('wxcRichTextLinkClick', e);
      }
    }
  };
</script>
