<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by git@zwwill on 118/02/08. -->

<template>
  <div class="wxc-demo">
    <title title="wxc-refresher"></title>
    <category title="使用案例"></category>
    <list class="scroller" ref="scroller">
      <wxc-refresher scroller-ref="scroller"
                     main-text="下拉即可刷新(自定义)"
                     pulling-text="释放即可刷新(自定义)"
                     refreshing-text="加载中(自定义)"
                     :maxTime="3000"
                     :text-width="240"
                     @wxcTimeout="onTimeout"></wxc-refresher>
      <cell class="cell" v-for="(num,key) in lists" :key="key">
        <div class="panel">
          <text class="text">{{num}}</text>
        </div>
      </cell>
    </list>
  </div>
</template>

<script>
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import { setTitle } from '../_mods/set-nav';

  import { WxcRefresher } from '../../index';

  const modal = weex.requireModule('modal');

  export default {
    components: { Title, Category, WxcRefresher },
    data: () => ({
      lists: ['下拉刷新', 'Drop Down', '↓', '↓', '↓', '↓', '↓', '↓']
    }),
    created () {
      setTitle('Refresher');
    },
    methods: {
      onTimeout () {
        modal.toast({ message: '刷新超时，可定义超时时间', duration: 0 });
      }
    }
  };
</script>

<style scoped>
  .wxc-demo {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #FFFFFF;
  }

  .panel {
    width: 600px;
    height: 250px;
    margin-left: 75px;
    margin-top: 35px;
    margin-bottom: 35px;
    flex-direction: column;
    justify-content: center;
    border-width: 2px;
    border-style: solid;
    border-color: #DDDDDD;
    background-color: #F5F5F5;
  }

  .text {
    font-size: 50px;
    text-align: center;
    color: #41B883;
  }

  .scroller{
    flex: 1;
  }
</style>
