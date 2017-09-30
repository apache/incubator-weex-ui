<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 16/11/03. -->

<template>
  <div class="wxc-demo">
    <scroller class="container">
      <title title="wxc-cell"></title>
      <category title="列表list展示"></category>
      <div class="demo">
        <wxc-cell label="标题"
                  title="阿里旅行飞猪"
                  v-on:wxcCellDivClick="wxcCellDivClick"
                  :has-margin="false"></wxc-cell>

        <wxc-cell label="标题"
                  title="带链接"
                  :has-arrow="true"
                  :link="link"
                  v-on:wxcCellDivClick="wxcCellDivClick"
                  spm="181.12312312.12312.d01"
                  :has-top-border="false"></wxc-cell>

        <wxc-cell label="标题"
                  title="阿里旅行飞猪"
                  :has-arrow="true"
                  v-on:wxcCellDivClick="wxcCellDivClick"
                  :has-top-border="false"></wxc-cell>

        <wxc-cell title="阿里旅行飞猪"
                  :has-arrow="true"
                  v-on:wxcCellDivClick="wxcCellDivClick"
                  :has-top-border="false"></wxc-cell>
      </div>
      <category title="高级使用" class="category"></category>
      <div class="demo">
        <wxc-cell title="阿里旅行飞猪"
                  desc="这里是附加信息"
                  :has-arrow="true"
                  v-on:wxcCellDivClick="wxcCellDivClick"
                  :has-top-border="true"></wxc-cell>
      </div>

      <div class="demo">
        <wxc-cell :has-arrow="false"
                  :has-top-border="false">
          <text :style="{color:color}"
                slot="title">自定义标题</text>
          <switch slot="value"
                  @change="color= color==='#000' ? '#FFC900' : '#000'"></switch>
        </wxc-cell>
        <wxc-cell :has-arrow="false"
                  :cell-style="cellStyle"
                  :has-top-border="false">
          <image class="image"
                 slot="label"
                 src="http://gtms04.alicdn.com/tfs/TB1eLvjSXXXXXaiXXXXXXXXXXXX-144-166.jpg"></image>
          <text class="red"
                slot="title">自定义标题、样式还可以加图片</text>
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
    color: #000;
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
    color: #333;
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

  module.exports = {
    components: { WxcCell, Title, Category },
    created () {
      setTitle('Cell')
    },
    data: () => ({
      color: '#000',
      cellStyle: {
        backgroundColor: '#f2f3f4'
      },
      link: 'https://h5.m.taobao.com/trip/wx-travel-home/home/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwx-travel-home%2Fhome%2Findex.weex.js'
    }),
    methods: {
      wxcCellDivClick (e) {
        modal.toast({
          'message': 'wxcCellDivClick',
          'duration': 1
        })
      }
    }
  };
</script>
