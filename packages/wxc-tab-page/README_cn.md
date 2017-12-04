# wxc-tab-page 

> Weex tab 页面滑动切换组件

### 规则
- 允许对头部进行配置，支持 ExpressionBinding 手势跟随效果，H5 支持降级效果滑动切换
- 常用于 Tab 切换页面，目前支持**icon 和文字**形式的顶栏,详细可见[config.js](https://github.com/alibaba/weex-ui/blob/master/example/tab-page/config.js)
- **Android 由于[此约束](http://weex-project.io/cn/references/gesture.html#约束)，需在子元素上绑定对应事件，可通过`wxc-pan-item`解决此问题**
- 支持**居中形式 Tab**，将 tabStyles 中的 leftOffset 配置合适的值即可
 

## [Demo](https://h5.m.taobao.com/trip/wxc-tab-page/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-tab-page%2Fdemo%2Findex.native-min.js)
<img src="https://gw.alipayobjects.com/zos/rmsportal/drLGhWpwwSbMTjMCWomE.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1M7ywSpXXXXXuXXXXXXXXXXXX-200-200.png" width="160"/>

## 使用方法

```vue
<template>
  <wxc-tab-page ref="wxc-tab-page"
                :tab-titles="tabTitles"
                :tab-styles="tabStyles"
                title-type="icon"
                :needSlider="needSlider"
                :is-tab-view="isTabView"
                :tab-page-height="tabPageHeight"
                @wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected">
    <list v-for="(v,index) in tabList"
          :key="index"
          class="item-container"
          :style="{ height: (tabPageHeight - tabStyles.height) + 'px' }">
      <cell class="border-cell"></cell>
      <cell v-for="(demo,key) in v"
            class="cell"
            :key="key">
        <wxc-pan-item :ext-id="'1-' + (v) + '-' + (key)"
                      url="https://h5.m.taobao.com/trip/ticket/detail/index.html?scenicId=2675"
                      @wxcPanItemPan="wxcPanItemPan">
          <wxc-item image="https://gtd.alicdn.com/imgextra/TB12yGaNVXXXXX7aXXXSutbFXXX.jpg"
                    :image-text="tabTitles[index].title"
                    title="飞猪专线｜四川成都出发到九寨沟牟尼沟 温泉3天2晚纯玩跟团旅游"
                    :desc="desc"
                    :tags="tags"
                    price="219"
                    price-desc="月售58笔｜999+条评论"></wxc-item>
        </wxc-pan-item>
      </cell>
    </list>
  </wxc-tab-page>
</template>

<style scoped>
  .item-container {
    width: 750px;
    background-color: #f2f3f4;
  }

  .border-cell {
    background-color: #f2f3f4;
    width: 750px;
    height: 24px;
    align-items: center;
    justify-content: center;
    border-bottom-width: 1px;
    border-style: solid;
    border-color: #e0e0e0;
  }

  .cell {
    background-color: #ffffff;
  }
</style>
<script>
  const dom = weex.requireModule('dom');
  import { WxcTabPage, WxcPanItem, Utils } from 'weex-ui';

  // https://github.com/alibaba/weex-ui/blob/master/example/tab-page/config.js
  import Config from './config'

  export default {
    components: { WxcTabPage, WxcPanItem, WxcItem },
    data: () => ({
      tabTitles: Config.tabTitles,
      tabStyles: Config.tabStyles,
      tabList: [],
      needSlider: true,
      demoList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      supportSlide: true,
      isTabView: true,
      tabPageHeight: 1334,
      desc: [{
        type: 'text',
        value: '特价机票|班期:清明 3/27-4/2等',
        theme: 'gray'
      }],
      tags: [{
        type: 'tag',
        value: '满100减20测试',
        theme: 'yellow'
      }]
    }),
    created () {
      this.tabPageHeight = Utils.env.getPageHeight();
      this.tabList = [...Array(this.tabTitles.length).keys()].map(i => []);
      Vue.set(this.tabList, 0, this.demoList);
    },
    methods: {
      wxcTabPageCurrentTabSelected (e) {
        const self = this;
        const index = e.page;
        /* 未加载tab模拟数据请求 */
        if (!Utils.isNonEmptyArray(self.tabList[index])) {
          setTimeout(() => {
            Vue.set(self.tabList, index, self.demoList);
          }, 100);
        }
      },
      wxcPanItemPan (e) {
        if (Utils.env.supportsEBForAndroid()) {
          this.$refs['wxc-tab-page'].bindExp(e.element);
        }
      }
    }
  };
</script>

```
更详细代码可以参考 [demo](https://github.com/alibaba/weex-ui/blob/master/example/tab-page/index.vue)


### 可配置参数

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| tab-titles | `Array` |`Y`| `[]` | 顶部 [显示配置](https://github.com/alibaba/weex-ui/blob/master/example/tab-page/config.js#L7)|
| title-type | `String` |`N`| `icon` | 顶部类型 `icon`/`text`|
| tab-styles | `Array` |`N`| `[]` | 顶部 [样式配置](https://github.com/alibaba/weex-ui/blob/master/example/tab-page/config.js)|
| tab-page-height | `Number` |`N`| `1334` | Tab page 页面的高度 |
| is-tab-view | `Boolean` |`N`| `true` |当设置为`false`，同时 tab 配置 url 参数即可跳出|
| need-slider | `Boolean` |`N`| `true` | 是否需要滑动功能|
| pan-dist | `Number` |`N`| `200` | 滚动多少切换上下一屏幕|
| duration | `Number` |`N`| `300` | 页面切换动画的时间 |
| timing-function | `String` |`N`| `-` | 页面切换动画函数 |
| title-use-slot | `Boolean` |`N`| `false` | 使用 slot 配置头部导航 (注1)|
| wrap-bg-color | `String` |`N`| `#F2F3F4` |页面背景颜色|


### 注1：自定义头部导航块
- 当使用slot的方式配置头部导航的时候，需要确保原有简单配置已经不能满足现有需求情况下再使用，可以传入参数`:title-use-slot="true"`,同时在wxc-tab-page组件内部传入如下slot对应节点即可
- 可以通过遍历到方式来生成，同时根据wxcTabPageCurrentTabSelected来确定当前的选择页，自己管理颜色即可。
```
<div slot="tab-title-0"><text>111</text></div>
<div slot="tab-title-1"><text>222</text></div>
<div slot="tab-title-2"><text>333</text></div>
```

### 主动触发设置页面

```
// 直接在wxc-tab-page上面绑定ref="wxc-tab-page",然后调用即可
this.$refs['wxc-tab-page'].setPage(2)

// 如果想设置无动画跳转，可以这样使用(中间参数用于设置url，设置null即可)
this.$refs['wxc-tab-page'].setPage(2,null,false);
```

### 事件回调

```
@wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected"
```



## wxc-pan-item 的使用

#### 参数

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| ext-id | `Number、String` |`Y`| `0` | 滑动元素的id索引|
| url | `String` |`N`| `-` | url跳转链接，自己处理可以不传|

#### 使用
```
// 组件使用
<wxc-pan-item 
    :ext-id="1" 
    :url="url" 
    @wxcPanItemClicked="wxcPanItemClicked"
    @wxcPanItemPan="wxcPanItemPan">
      <your-item>....</your-item>
    </pan-item>
  
// 引用
import { WxcPanItem } from 'weex-ui';

//回调
wxcPanItemPan (e) {
    if (Utils.env.supportsEBForAndroid()) {
      this.$refs['wxc-tab-page'].bindExp(e.element);
    }
 }
```
