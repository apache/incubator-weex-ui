<!-- CopyRight (C) 2017-2022 WeexUI Group Holding Limited. -->
<!-- Created by git@zwwill on 18/02/08. -->
<template>
  <refresh ref="wxc-refresher"
           class="wxc-refresher"
           @refresh="onrefresh"
           @pullingdown="onPullingdown"
           :display="refreshing ? 'show' : 'hide'">
    <div v-if="newStyleFlag" class="cycle-container" ref="cycle">
      <div class="u-cover c1" ref="cover1">
        <div class="u-cover-cycle cover1"></div></div>
      <div class="u-cover c2" ref="cover2">
        <div class="u-cover-cycle" ref="cover-cycle"></div>
      </div>
    </div>
    <image v-if="newStyleFlag" class="arrow-down" ref="arrow" :src="ICON_ARROW_DOWN" resize="contain"></image>
    <loading-indicator v-if="!newStyleFlag" class="indicator"></loading-indicator>
    <text class="u-txt" :style="{width:`${textWidth}px`}" lines="1">{{refresherText}}</text>
  </refresh>
</template>
<script>
  const animation = weex.requireModule('animation')
  const modal = weex.requireModule('modal')

  import bindingx from 'weex-bindingx';
  import Utils from '../utils';

  const ICON_ARROW_DOWN = 'https://img.alicdn.com/tfs/TB1A8faeTtYBeNjy1XdXXXXyVXa-48-48.png';

  export default {
    props: {
      scrollerRef: String,
      maxTime: {
        type: Number,
        default: 0
      },
      mainText:{
        tyle: String,
        default: '下拉即可刷新...'
      },
      pullingText:{
        tyle: String,
        default: '释放即可刷新...'
      },
      refreshingText:{
        tyle: String,
        default: '加载中...'
      },
      textWidth:{
        type: Number,
        default: 200
      }
    },
    data () {
      return {
        isAndroid:Utils.env.isAndroid(),
        isIOS:Utils.env.isIOS(),
        ICON_ARROW_DOWN,
        refreshing: false,
        couldUnlash: false
      }
    },
    computed:{
      isSupportBinding: function(){
        return bindingx && bindingx.isSupportBinding
      },
      newStyleFlag: function(){
        return this.scrollerRef && !this.isAndroid && this.isSupportBinding
      },
      refresherText: function () {
        return this.refreshing?this.refreshingText:this.pText;
      },
      pText: function () {
        return this.couldUnlash?this.pullingText:this.mainText;
      }
    },
    created(){
      this.newStyleFlag && this.animationBinding();
    },
    beforeDestroy(){
      this.bindingsDestory();
    },
    methods: {
      onrefresh (event) {
        this.refreshing = true;
        this.newStyleFlag && this.cycleGoRound();
        if(this.maxTime<=0) return;
        clearTimeout(this.timeoutSto);
        this.timeoutSto = setTimeout(() => {
          this.$emit('wxcTimeout');
          this.wxcCancel();
        }, this.maxTime);
      },
      /**
       * 取消 refreshing
       */
      wxcCancel () {
        this.refreshing = false;
        this.roundingDestory();
      },
      /**
       * 下拉事件
       */
      onPullingdown (event) {
        let pd = event.pullingDistance * (!!this.isIOS?-1:1);
        pd>(!!this.isAndroid?200:140)? (this.couldUnlash = true) : (this.couldUnlash = false);
        if(this.refreshing && pd<20){
          clearTimeout(this.timeoutSto);
          this.refreshing = false;
          this.roundingDestory();
        }
      },
      /**
       * 注册 bindingx
       */
      animationBinding(){
        if(this.isAndroid) return;
        setTimeout(() => {
          let scroller = this.$parent.$refs[this.scrollerRef].ref,
              cover2 = this.$refs['cover2'].ref,
              coverCycle = this.$refs['cover-cycle'].ref;
          if(!bindingx || !bindingx.isSupportBinding){
            return;
          }
          let bindingResult = bindingx.bind({
            eventType:'scroll',
            anchor: scroller,
            props: [
              {
                element: cover2,
                property:'transform.rotateZ',
                expression:'y>-140?(y%75/150*-360):156'
              },
              {
                element: coverCycle,
                property:'opacity',
                expression:'y<-75?1:0'
              }
            ]
          },function(e){
          });
          this.bindingToken = bindingResult.token;
        },300);
      },
      /**
       * 旋转动作
       */
      cycleGoRound(){
        if(this.isAndroid) return;
        let cycle = this.$refs['cycle'].ref;
        this.arrowShow(false);
        if(!cycle || !bindingx || !bindingx.isSupportBinding){
          return;
        }
        let roundingResult = bindingx.bind({
          eventType:'timing',
          props: [
            {
              element: cycle,
              property:'transform.rotateZ',
              expression:'t*0.72'
            }
          ]
        },function(e){
        });
        this.roundingToken = roundingResult.token;
      },
      /**
       * 箭头显隐控制
       */
      arrowShow(_show=true){
        let arrow = this.$refs['arrow'];
        !!arrow && animation.transition(arrow, {
          styles: {
            opacity: _show?1:0,
            transform: _show?"scale(1)":"scale(0.5)"
          },
          duration:300,
          delay: 0
        }, () => {
        });
      },
      /**
       * 安卓动画hack
       */
      androidStyleShow(_show=true){
        let coverCycle = this.$refs['cover-cycle'];
        !!coverCycle && animation.transition(coverCycle, {
          styles: {
            opacity: _show?1:0
          },
          duration:200
        }, () => {
        });
      },
      /**
       * 完整 bindingx 销毁
       */
      bindingsDestory(){
        if(this.bindingToken != 0) {
          bindingx && bindingx.unbind({
            eventType:'scroll',
            token:this.bindingToken
          });
          this.bindingToken = 0;
        }
        this.roundingDestory();
      },
      /**
       * 旋转 bindingx 销毁
       */
      roundingDestory(){
        if(this.roundingToken != 0) {
          bindingx && bindingx.unbind({
            eventType:'timing',
            token:this.roundingToken
          });
          this.roundingToken = 0;
        }
        this.arrowShow(true);
      }
    }
  }
</script>
<style scoped>

  .wxc-refresher{
    height: 140px;
    width: 750px;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    padding-top: 50px;
  }
  .cycle-container{
    position: relative;
    width: 60px;
    height: 60px;
  }
  .u-cover{
    position: absolute;
    width: 30px;
    height: 60px;
    top: 0;
    background-color: #fff;
    overflow: hidden;
    right: 0;
  }
  .c1{
    z-index: 1;
  }
  .c2{
    z-index: 2;
    transform-origin: left center;
    transform: rotateZ(0deg);
  }
  .u-cover-cycle{
    position: absolute;
    width: 60px;
    height: 60px;
    right: 0;
    top: 0;
    box-sizing: border-box;
    border-width: 2px;
    border-color: #666;
    border-style: solid;
    border-radius: 100%;
    opacity: 0;
  }
  .cover1{
    opacity: 1;
  }
  .indicator{
    margin-right: 20px;
    height: 60px;
    width: 60px;
    color: #666;
  }
  .arrow-down{
    position: relative;
    top: 15px;
    left: -45px;
    width: 30px;
    height: 30px;
  }
  .u-txt{
    font-size: 24px;
    line-height: 40px;
    color: #999;
    margin-top: 10px;
    margin-left: 10px;
    height: 40px;
    lines: 1;
  }
</style>
