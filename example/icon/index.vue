<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/07/31. -->

<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <title title="wxc-icon"></title>
      <category title="基本类型"></category>
      <div class="icon-total" v-for="(item,index) in chunkArr" :key="index">
        <div v-for="(v,i) in item" :key="i" class="icon-item">
          <wxc-icon :name="v" @wxcIconClicked="clicked"></wxc-icon>
          <text class="icon-text">{{v}}</text>
        </div>
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

  .scroller {
    flex: 1;
  }

  .icon-total {
    width: 750px;
    padding-left: 24px;
    justify-content: center;
    margin-top: 60px;
    flex-direction: row;
  }

  .icon-item {
    width: 160px;
    height: 120px;
    align-items: center;
    margin-right: 18px;
  }

  .icon-text {
    margin-top: 16px;
    font-size: 24px;
    color: #666666;
  }
</style>

<script>
  import { WxcIcon, Utils } from '../../index';
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import { setTitle } from '../_mods/set-nav';

  const clipboard = weex.requireModule('clipboard');
  const modal = weex.requireModule('modal');

  export default {
    components: { WxcIcon, Title, Category },
    data: () => ({
      iconList: ['less', 'more_unfold', 'back', 'more', 'add', 'subtract', 'close', 'cry', 'search', 'delete', 'help', 'refresh', 'success', 'warning', 'wrong', 'clock', 'scanning', 'filter', 'map', 'play']
    }),
    created () {
      this.chunkArr = Utils.arrayChunk(this.iconList);
      setTitle('Icon');
    },
    methods: {
      clicked (e) {
        clipboard && clipboard.setString(e.name);
        modal.toast({
          message: `${e.name} copied!`
        })
      }
    }
  }
</script>
