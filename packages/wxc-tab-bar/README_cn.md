# wxc-tab-bar

> Weex 版本底部 tab-bar 组件

#### 规则
- 用于底部 Tab 切换页面，目前支持 **icon 、text 、iconFont**形式的底栏

## [Demo](https://h5.m.taobao.com/trip/wx-detection-demo/tab-bar/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwx-detection-demo%2Ftab-bar%2Findex.weex.js)


<img src="https://img.alicdn.com/tfs/TB1n6jOg3DD8KJjy0FdXXcjvXXa-562-1000.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1AEx7gcLJ8KJjy0FnXXcFDpXa-200-200.png" width="160"/>


## 使用方法

```vue
<template>
  <wxc-tab-bar :tab-titles="tabTitles"
               :tab-styles="tabStyles"
               title-type="icon"
               @wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">
    <!-- 第一个页面内容-->
    <div class="item-container" :style="contentStyle"><text>首页</text></div>
    
    <!-- 第二个页面内容-->
    <div class="item-container" :style="contentStyle"><text>特别推荐</text></div>
    
    <!-- 第三个页面内容-->
    <div class="item-container" :style="contentStyle"><text>消息中心</text></div>
    
    <!-- 第四个页面内容-->
    <div class="item-container" :style="contentStyle"><text>我的主页</text></div>
  </wxc-tab-bar>
</template>

<style scoped>
  .item-container {
    width: 750px;
    background-color: #f2f3f4;
    align-items: center;
    justify-content: center;
  }
</style>
<script>
  import { WxcTabBar, Utils } from 'weex-ui';
 
  // https://github.com/alibaba/weex-ui/blob/master/example/tab-bar/config.js 
  import Config from './config'

  export default {
    components: { WxcTabBar },
    data: () => ({
      tabTitles: Config.tabTitles,
      tabStyles: Config.tabStyles
    }),
    created () {
      const tabPageHeight = Utils.env.getPageHeight();
      // 如果页面没有导航栏，可以用下面这个计算高度的方法
      // const tabPageHeight = env.deviceHeight / env.deviceWidth * 750;
      const { tabStyles } = this;
      this.contentStyle = { height: (tabPageHeight - tabStyles.height) + 'px' };
    },
    methods: {
      wxcTabBarCurrentTabSelected (e) {
        const index = e.page;
        // console.log(index);
      }
    }
  };
</script>

```
更详细代码可以参考 [demo](https://github.com/alibaba/weex-ui/blob/master/example/tab-bar/index.vue)


### 可配置参数

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| tab-titles | `Array` |`Y`| `[]` | Tab显示 [配置](https://github.com/alibaba/weex-ui/blob/master/example/tab-bar/config.js#L7)|
| title-type | `String` |`N`| `icon` | 类型 `icon`/`text`/`iconFont`(注1)|
| tab-styles | `Array` |`N`| `[]` |  底部 Tab [样式配置](https://github.com/alibaba/weex-ui/blob/master/example/tab-bar/config.js)|
| is-tab-view | `Boolean` |`N`| `true` |当设置为`false`，同时 tab 配置 url 参数即可跳出 |
| duration | `Number` |`N`| `300` | 页面切换动画的时间 |
| title-use-slot | `Boolean` |`N`| `false` | 使用 slot 配置头部导航 (注2)|
| timing-function | `String` |`N`| `-` | 页面切换动画函数 |
| wrap-bg-color | `String` |`N`| `#F2F3F4` |页面背景颜色|

### 注1：使用 iconFont

- 在 Weex Ui 0.3.8以后，我们可以使用 iconFont 来代替原有 tab title 中的图片配置，像下面这个配置即可：
 
```
 // https://github.com/alibaba/weex-ui/blob/master/example/tab-bar/config.js#L51
 // '&#xe608;' -> '\ue608'
  tabIconFontTitles: [
    {
      title: 'Home',
      codePoint: '\ue608'
    },
    {
      title: 'Message',
      codePoint: '\ue752',
      badge: 5
    },
    // ....
  ],
  // https://github.com/alibaba/weex-ui/blob/master/example/tab-page/config.js#L72
  tabIconFontStyles: {
      bgColor: '#FFFFFF',
      titleColor: '#666666',
      activeTitleColor: '#3D3D3D',
      activeBgColor: '#FFFFFF',
      isActiveTitleBold: true,
      width: 160,
      height: 120,
      fontSize: 24,
      textPaddingLeft: 10,
      textPaddingRight: 10,
      iconFontSize: 50,
      iconFontColor: '#333333',
      activeIconFontColor: 'red',
      iconFontUrl: '//at.alicdn.com/t/font_501019_mauqv15evc1pp66r.ttf'
    }
```

### 注2：自定义底部导航块
- 当使用slot的方式配置底部导航的时候，需要确保原有简单配置已经不能满足现有需求情况下再使用，可以传入参数`:title-use-slot="true"`,同时在wxc-tab-bar组件内部传入如下slot对应节点即可
- 可以通过遍历到方式来生成，同时根据wxcTabBarCurrentTabSelected来确定当前的选择页，自己管理颜色即可。
```
<div slot="tab-title-0"><text>111</text></div>
<div slot="tab-title-1"><text>222</text></div>
<div slot="tab-title-2"><text>333</text></div>
```


### 主动触发设置页面

```
// 直接在wxc-tab-bar上面绑定ref="wxc-tab-bar",然后调用即可
this.$refs['wxc-tab-bar'].setPage(2)

// 如果想设置无动画跳转，可以这样使用(中间参数用于设置url，设置null即可)
this.$refs['wxc-tab-bar'].setPage(2,null,false);

```

### 事件回调
```
//当前页面被选中的回调`@wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected"`
```

