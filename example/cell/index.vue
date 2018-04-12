<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 16/11/03. -->

<template>
  <div class="wxc-demo">
    <scroller class="container">
      <title title="wxc-cell"></title>
      <category title="Basic Style"></category>
      <div class="demo">
        <wxc-cell label="Title"
                  @wxcCellClicked="wxcCellClicked"
                  :has-margin="false"
                  extraContent="extra content"></wxc-cell>
      </div>
      <category title="Subtitle"></category>
      <div class="demo">
        <wxc-cell title="Title"
                  desc="subtitle"
                  :has-arrow="true"
                  @wxcCellClicked="wxcCellClicked"
                  :has-top-border="true"></wxc-cell>
        <wxc-cell title="Listltem (Android)"
                  desc="There may have water ripple effect of material if you set the click event."
                  :has-arrow="true"
                  @wxcCellClicked="wxcCellClicked"
                  :has-top-border="true"></wxc-cell>
      </div>
      <category title="Customized Right Side（Empty Content / Text）"></category>
      <div class="demo">
        <wxc-cell label="Title"
                  @wxcCellClicked="wxcCellClicked"
                  :has-margin="false"></wxc-cell>
        <wxc-cell label="Title"
                  :has-arrow="true"
                  @wxcCellClicked="wxcCellClicked"
                  :has-top-border="false"></wxc-cell>
        <wxc-cell title="Title"
                  :has-arrow="true"
                  @wxcCellClicked="wxcCellClicked"
                  :has-top-border="true"
                  extraContent="extra content"></wxc-cell>
      </div>
      <category title="Align Vertical Center"></category>
      <div class="demo">
        <wxc-cell title="Title"
                  desc="subtitle"
                  @wxcCellClicked="wxcCellClicked"
                  :has-top-border="true"
                  extraContent="extra content"></wxc-cell>
      </div>
      <category title="Text Wrapping"></category>
      <div class="demo">
        <wxc-cell desc="Multiple line，long text will wrap；Long Text Long Text Long Text Long Text Long Text Long Text"
                  @wxcCellClicked="wxcCellClicked"
                  :has-top-border="true"></wxc-cell>
        <wxc-cell desc="Multiple line，long text will wrap；Long Text Long Text Long Text Long Text Long Text Long Text"
                  @wxcCellClicked="wxcCellClicked"
                  :has-top-border="true"
                  extraContent="extra content"></wxc-cell>
      </div>
      <category title="Text content"></category>
      <div class="demo">
        <wxc-cell label="title"
                  title="content title"
                  @wxcCellClicked="wxcCellClicked"
                  :has-margin="false"></wxc-cell>

        <wxc-cell label="title"
                  title="link"
                  :has-arrow="true"
                  :link="link"
                  @wxcCellClicked="wxcCellClicked"
                  :has-top-border="false"></wxc-cell>

        <wxc-cell label="title"
                  title="content title"
                  :has-arrow="true"
                  @wxcCellClicked="wxcCellClicked"
                  :has-top-border="false"></wxc-cell>

        <wxc-cell title="content title"
                  :has-arrow="true"
                  @wxcCellClicked="wxcCellClicked"
                  :has-top-border="false"></wxc-cell>
      </div>
      <category title="Custom cell" class="category"></category>
      <div class="demo">
        <wxc-cell title="title content"
                  desc="desc"
                  :has-arrow="true"
                  @wxcCellClicked="wxcCellClicked"
                  :has-top-border="true"></wxc-cell>
      </div>

      <div class="demo">
        <wxc-cell :has-arrow="false"
                  :has-top-border="false"
                  :auto-accessible="false">
          <text :style="{color:color}"
                slot="title">custom title content</text>
          <switch slot="value"
                  @change="color= color==='#000' ? '#FFC900' : '#000'"></switch>
        </wxc-cell>
        <wxc-cell :has-arrow="false"
                  :cell-style="cellStyle"
                  :has-top-border="false"
                  :auto-accessible="false">
          <image class="image"
                 slot="label"
                 src="https://img.alicdn.com/tfs/TB1eLvjSXXXXXaiXXXXXXXXXXXX-144-166.jpg"></image>
          <text class="red"
                slot="title">A custom title, style can also be added to the picture
          </text>
        </wxc-cell>
      </div>
    </scroller>
  </div>
</template>

<style scoped>
  .wxc-demo {
    width: 750px;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #ffffff;
  }

  .container {
    flex: 1;
  }

  .demo {
    width: 750px;
    background-color: #f2f3f4;
  }

  .category {
    margin-top: 40px;
  }

  .default {
    color: #000000;
  }

  .active {
    color: #FFC900;
  }

  .red {
    color: #C3413D;
  }

  .image {
    width: 80px;
    height: 80px;
    margin-right: 20px;
  }

  .demo-title {
    font-size: 30px;
    color: #333333;
    margin-top: 30px;
    margin-left: 30px;
    margin-bottom: 16px;
  }
</style>

<script>
  const modal = weex.requireModule('modal');
  import { WxcCell } from '../../index';
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import { setTitle } from '../_mods/set-nav';

  export default {
    components: { WxcCell, Title, Category },
    created () {
      setTitle('Cell');
      // 兼容weex playground的显示 正常业务不要用
      const { appName } = weex.config.env;
      if (/(WeexDemo)/i.test(appName)) {
        this.link = 'https://h5.m.taobao.com/trip/weex-ui/demo/index.native-min.js';
      }
    },
    data: () => ({
      color: '#000',
      cellStyle: {
        backgroundColor: '#f2f3f4'
      },
      link: 'https://h5.m.taobao.com/trip/weex-ui/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fweex-ui%2Fdemo%2Findex.native-min.js'
    }),
    methods: {
      wxcCellClicked (e) {
        modal.toast({
          'message': 'wxcCellClicked',
          'duration': 1
        })
      }
    }
  };
</script>
