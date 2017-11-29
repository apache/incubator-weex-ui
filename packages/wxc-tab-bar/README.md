# wxc-tab-bar

> Weex版本底部tab-bar组件

- 规则: 用于底部Tab切换页面，目前支持**icon和文字**形式的底栏,详细见配置 [config.js](https://github.com/alibaba/weex-ui/blob/master/example/tab-bar/config.js)

## Demo

<img src="https://img.alicdn.com/tfs/TB1eVCBfIrI8KJjy0FhXXbfnpXa-376-668.gif" width="240"/>

## 使用方法

```vue
<template>
  <wxc-tab-bar :tab-titles="tabTitles"
               :tab-styles="tabStyles"
               title-type="icon"
               :tab-page-height="tabPageHeight"
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
  import Config from './config'

  export default {
    components: { WxcTabBar },
    data: () => ({
      tabTitles: Config.tabTitles,
      tabStyles: Config.tabStyles
    }),
    created () {
      this.tabPageHeight = Utils.env.getPageHeight();
      const { tabPageHeight, tabStyles } = this;
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

| 名称      | 类型     | 默认值   | 备注  |
|-------------|------------|--------|-----|
| tab-titles | `Array` | `[]` | `必填`底部tab显示配置,详细请见[master/demo/config.js#L55]|
| title-type | `String` | `icon` | 底部样式是`icon`形式还是`text`形式，默认`icon`|
| tab-styles | `Array` | `[]` | `必填`底部tab样式配置,详细请见[config.js](https://github.com/alibaba/weex-ui/blob/master/example/tab-bar/config.js)|
| tab-page-height | `Number` | `1334` |`必填`tab page页面的高度，详细计算可以参数demo中 |
| is-tab-view | `Boolean` | `true` |假如需要跳出tab，可以设置这个为`true`，同时在对应的tab配置中加入url参数即可 |
| duration | `Number` | `300` | 页面切换动画的时间 |
| timing-function | `String` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | 页面切换动画函数 |
| wrap-bg-color | `String` | `#F2F3F4` |page背景颜色支持自定义|

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

