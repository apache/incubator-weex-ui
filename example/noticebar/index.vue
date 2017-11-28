<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 16/10/28. -->

<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <title title="wxc-noticebar"></title>
      <category title="使用案例"></category>
      <div class="demo">
        <wxc-noticebar notice="不配置参数的通告栏"></wxc-noticebar>
      </div>
      <div class="demo">
        <wxc-noticebar mode="link"
                       :notice-url="url"
                       notice="测试通告,可跳转"></wxc-noticebar>
      </div>
      <div class="demo">
        <wxc-noticebar :show="true"
                       mode="closable"
                       notice="测试通告，可关闭"></wxc-noticebar>
      </div>
      <div class="demo">
        <wxc-noticebar type="time"
                       notice="请在14分25秒内完成支付，超时将取消订单"></wxc-noticebar>
      </div>
      <div class="demo">
        <wxc-noticebar type="redbag"
                       notice="亲，你有很多很多红包可以用"></wxc-noticebar>
      </div>
      <div class="demo">
        <wxc-noticebar mode="link"
                       notice="一条测试通告,可跳转"
                       type="info"
                       @wxcNoticebarLinkClicked="wxcNoticebarLinkClicked"
                       :notice-url="url"></wxc-noticebar>
      </div>
      <div class="demo">
        <wxc-noticebar mode="closable"
                       notice="一条测试通告,关闭"
                       @wxcNoticebarCloseClicked="wxcNoticebarCloseClicked"
                       type="success"></wxc-noticebar>
      </div>
      <div class="demo">
        <wxc-noticebar mode="link"
                       notice="一行过长自动...的测试通告,可跳转测试通告,可跳转测试通告,可跳转可跳转测试通告,可跳转"
                       type="question"
                       :notice-url="url"></wxc-noticebar>
      </div>
      <div class="demo last-demo">
        <wxc-noticebar mode="closable"
                       notice="测试通告,可跳转测试通告,可跳转测试通告,可跳转测试通告,可跳转测试通告,可跳转"
                       :lines="2"
                       type="warn"></wxc-noticebar>
      </div>
    </scroller>
  </div>
</template>

<style scoped>

  .wxc-demo {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #FFFFFF;
  }

  .scroller {
    flex: 1;
  }

  .demo {
    margin-top: 40px;
  }

  .last-demo {
    margin-bottom: 40px;
  }

</style>

<script>
  const modal = weex.requireModule('modal');
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import { WxcNoticebar } from '../../index';

  import { setTitle } from '../_mods/set-nav';

  export default {
    components: { Title, Category, WxcNoticebar },
    data: () => ({
      url: 'https://h5.m.taobao.com/trip/weex-ui/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fweex-ui%2Fdemo%2Findex.native-min.js'
    }),
    created () {
      setTitle('Noticebar');
    },
    methods: {
      wxcNoticebarCloseClicked (e) {
        console.log(e);
        modal.toast({ 'message': 'wxcNoticebarCloseClicked', 'duration': 1 });
      },
      wxcNoticebarLinkClicked (e) {
        console.log(e);
        modal.toast({ 'message': 'wxcNoticebarLinkClicked', 'duration': 1 });
      }
    }
  };
</script>
