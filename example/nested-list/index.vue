<template>
  <list>
    <header>
      <image style="width:750px;height:350px" src="https://gw.alicdn.com/tfs/TB1SOyrSVXXXXb3XXXXXXXXXXXX-1000-667.jpg"></image>
      <div style="width:750px;height:350px;position:absolute;left:0;top:0;justify-content:center;align-items:center">
        <text style="font-size: 50px;color:#ffffff;">header</text>
      </div>
    </header>
    <cell>
      <WxcNestedList @onLoadmore='onLoadmore' :isResetLoadMore='true' :styles="{backgroundColor: 'red'}" @onListClick='onList'>
            <div class="cell"  v-for="(num, i) in [1,2,3,4,5,6]" :key="'wxc-nested-' + i">
                <div class="panel">
                  <text class="text">{{num}}</text>
                </div>
            </div>
      </WxcNestedList>
    </cell>
    
    <cell class="cell" v-for="num in lists" :key="num">
      <div class="panel">
        <text class="text">{{num}}</text>
      </div>
    </cell>
  </list>
  
</template>

<script>
import { WxcNestedList } from '../../index';
const modal = weex.requireModule("modal");

export default {
  components: {
    WxcNestedList
  },
  data() {
    return {
      lists: ["A", "B", "C", "D", "E", "F"],
    };
  },
  methods: {
    onList() {
      modal.toast({
        message: "触发单击",
        duration: 0.3
      });
    },
    onLoadmore() {
      modal.toast({
        message: "触发刷新",
        duration: 0.3
      });
    },
  }
};
</script>

<style scoped>
.header {
  height: 200px;
  width: 750px;
  background-color: blue;
  color: white;
}

.panel {
  width: 750px;
  height: 200px;
  flex-direction: column;
  justify-content: center;
  border-width: 2px;
  border-style: solid;
  border-color: rgb(162, 217, 192);
  background-color: rgba(162, 217, 192, 0.2);
}
.text {
  font-size: 88px;
  text-align: center;
  color: #41b883;
}
</style>