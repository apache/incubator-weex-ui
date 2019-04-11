<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/07/31. -->

<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <title title="wxc-button"></title>
      <category title="类型样式"></category>
      <div class="button-list">
        <text class="button-text">white</text>
        <wxc-button text="确定"
                    type="white"
                    @wxcButtonClicked="wxcButtonClicked"></wxc-button>
        <text class="button-text">white && disabled</text>
        <wxc-button text="确定"
                    type="white"
                    :disabled="true"
                    @wxcButtonClicked="wxcButtonClicked"></wxc-button>
        <text class="button-text">blue</text>
        <wxc-button text="确定"
                    type="blue"
                    @wxcButtonClicked="wxcButtonClicked"></wxc-button>
        <text class="button-text">blue && disabled</text>
        <wxc-button text="确定"
                    type="blue"
                    :disabled="true"
                    @wxcButtonClicked="wxcButtonClicked"></wxc-button>
        <text class="button-text">red</text>
        <wxc-button text="确定"
                    type="red"
                    @wxcButtonClicked="wxcButtonClicked"></wxc-button>
        <text class="button-text">red && disabled</text>
        <wxc-button text="确定"
                    type="red"
                    :disabled="true"
                    @wxcButtonClicked="wxcButtonClicked"></wxc-button>
        <text class="button-text">yellow</text>
        <wxc-button text="确定"
                    type="yellow"
                    @wxcButtonClicked="wxcButtonClicked"></wxc-button>
        <text class="button-text">yellow && disabled</text>
        <wxc-button text="确定"
                    type="yellow"
                    :disabled="true"
                    @wxcButtonClicked="wxcButtonClicked"></wxc-button>
      </div>
      <category title="尺寸"></category>
      <div>
        <text class="button-size-text">big</text>
        <div class="size">
          <wxc-button text="确定"
                      type="white"
                      size="big"
                      @wxcButtonClicked="wxcButtonClicked"></wxc-button>
          <wxc-button text="确定"
                      type="white"
                      size="big"
                      :disabled="true"
                      @wxcButtonClicked="wxcButtonClicked"></wxc-button>

        </div>
        <text class="button-size-text">medium</text>
        <div class="size">
          <wxc-button text="确定"
                      type="blue"
                      :disabled="disabled"
                      size="medium"
                      @wxcButtonClicked="wxcButtonClicked"></wxc-button>
          <wxc-button text="确定"
                      type="blue"
                      :disabled="true"
                      size="medium"
                      @wxcButtonClicked="wxcButtonClicked"></wxc-button>
          <wxc-button text="确定"
                      type="red"
                      size="medium"
                      @wxcButtonClicked="wxcButtonClicked"></wxc-button>
        </div>
        <text class="button-size-text">small</text>
        <div class="size">
          <wxc-button text="确定"
                      type="red"
                      size="small"
                      @wxcButtonClicked="wxcButtonClicked"></wxc-button>
          <wxc-button text="确定"
                      type="red"
                      size="small"
                      :disabled="true"
                      @wxcButtonClicked="wxcButtonClicked"></wxc-button>
          <wxc-button text="确定"
                      type="yellow"
                      size="small"
                      @wxcButtonClicked="wxcButtonClicked"></wxc-button>
          <wxc-button text="确定"
                      type="yellow"
                      :disabled="true"
                      size="small"
                      @wxcButtonClicked="wxcButtonClicked"></wxc-button>
        </div>
      </div>
      <category title="自定义样式"></category>
      <wxc-cell :has-top-border="false" title="按钮的文字">
        <input class="input"
               slot="value"
               placeholder="文字"
               :value="text"
               @input="text=$event.value" />
      </wxc-cell>
      <wxc-cell :has-top-border="false" title="是否禁用">
        <switch :checked="disabled"
                slot="value"
                @change="disabled = !disabled"></switch>
      </wxc-cell>

      <wxc-cell :has-top-border="false" title="按钮宽度">
        <input class="input"
               slot="value"
               placeholder="自定义样式实现, 默认宽度702px"
               :value="width"
               @input="width=$event.value" />
      </wxc-cell>
      <wxc-cell :has-top-border="false" title="按钮高度">
        <input class="input"
               slot="value"
               placeholder="自定义样式实现, 默认高度88px"
               :value="height"
               @input="height=$event.value" />
      </wxc-cell>
      <wxc-cell :has-top-border="false" title="背景颜色">
        <input class="input"
               slot="value"
               placeholder="自定义样式实现"
               :value="backgroundColor"
               @input="backgroundColor=$event.value" />
      </wxc-cell>
      <wxc-cell :has-top-border="false" title="边框颜色">
        <input class="input"
               slot="value"
               placeholder="自定义样式实现"
               :value="borderColor"
               @input="borderColor=$event.value" />
      </wxc-cell>
      <wxc-cell :has-top-border="false" title="边框圆角">
        <input class="input"
               slot="value"
               placeholder="自定义样式实现,默认12px"
               :value="borderRadius"
               @input="borderRadius=$event.value" />
      </wxc-cell>
      <div class="demo">
        <wxc-button :text="text"
                    :type="type"
                    :disabled="disabled"
                    :btn-style="btnStyle"
                    :text-style="textStyle"
                    @wxcButtonClicked="wxcButtonClicked"></wxc-button>
      </div>
    </scroller>
  </div>
</template>

<style scoped>
  .wxc-demo {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #ffffff;
  }

  .button-list {
    padding-left: 24px;
  }

  .button-text {
    margin-top: 40px;
    margin-left: 8px;
    margin-bottom: 16px;
  }

  .scroller {
    flex: 1;
  }

  .demo {
    align-items: center;
    margin-top: 40px;
    margin-bottom: 40px;
  }

  .input {
    width: 500px;
    text-align: right;
    font-size: 28px;
  }

  .size {
    flex-direction: row;
    justify-content: space-around;
  }

  .button-size-text {
    margin-left: 24px;
    margin-bottom: 24px;
    margin-top: 40px;
  }
</style>

<script>
  import { WxcButton, WxcCell } from '../../index';
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import { setTitle } from '../_mods/set-nav';

  const modal = weex.requireModule('modal');
  export default {
    components: { Title, Category, WxcButton, WxcCell },
    data: () => ({
      type: 'red',
      text: '按钮文字',
      width: '702px',
      height: '88px',
      disabled: false,
      backgroundColor: '#FF5000',
      borderColor: '#FF5000',
      borderRadius: '12px',
      fontSize: '36px',
      color: '#FFFFFF',
      btnLoginStyle: {
        width: '620px',
        height: '94px',
        // fontSize: '100px',//不起作用（bug）
        borderRadius: '94px',
        backgroundColor: '#008D92'// 3B444D
      }
    }),
    computed: {
      btnStyle () {
        const { width, height, backgroundColor, borderColor, borderRadius } = this;
        const customStyle = {};

        if (width) {
          customStyle.width = width;
        }

        if (height) {
          customStyle.height = height;
          customStyle.lineHeight = height;
        }

        if (backgroundColor) {
          customStyle.backgroundColor = backgroundColor;
        }

        if (borderColor) {
          customStyle.borderColor = borderColor;
          customStyle.borderWidth = '1px';
          customStyle.borderStyle = 'solid';
        }

        if (borderRadius) {
          customStyle.borderRadius = borderRadius;
        }
        return customStyle;
      },
      textStyle () {
        const { fontSize, color } = this;
        const customStyle = {};
        if (fontSize) {
          customStyle.fontSize = fontSize;
        }
        if (color) {
          customStyle.color = color;
        }
        return {
          fontSize, color
        }
      }
    },
    created () {
      setTitle('Button');
    },
    methods: {
      wxcButtonClicked (e) {
        const { type, disabled } = e;
        modal.toast({
          message: disabled ? `disabled=${disabled}` : `type=${type}`
        })
      }
    }
  }
</script>
