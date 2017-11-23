# wxc-tab-page 

> Weex版本tab页面滑动组件,允许对头部进行配置，正常版本Weex支持expressionBinding手势跟随效果，低版本和H5版本支持降级效果滑动切换。

**新增沉浸式全屏的FullTabPage**🎉 🎉 🎉 

- 规则
   - 常用于导购业务线Tab页面，目前支持**icon和文字**形式的顶栏,详细见配置文件[config];
  - **Android由于[此约束](http://weex-project.io/cn/references/gesture.html#约束)，目前需要在子元素里面绑定对应事件，可以通过`wxc-pan-item`解决此问题，详细使用见下面**
  - **沉浸式全屏的FullTabPage**请使用`@ali/wxc-tab-page/full-page.vue`
  - 支持配置**居中形式**的tab-page，需要将tabStyles中的leftOffset设置成合适的值即可，同时tab的数量不能超过屏幕能放下的数目。
 

## [Demo预览](https://h5.m.taobao.com/trip/wxc-tab-page/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-tab-page%2Fdemo%2Findex.native-min.js)
<img src="https://gw.alipayobjects.com/zos/rmsportal/gEfRLhYhoxktoSjPGoZx.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="http://gtms04.alicdn.com/tfs/TB1M7ywSpXXXXXuXXXXXXXXXXXX-200-200.png" width="160"/>


## wxc-pan-item的使用

#### 参数

| 名称      | 类型     | 默认值   | 备注  |
|-------------|------------|--------|-----|
| ext-id | `Number、String` | `0` | `必填` 滑动元素的id索引|
| url | `String` | `` | url跳转链接，自己处理可以不传|

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
import WxcPanItem from 'weex-ui';

//回调
wxcPanItemPan (e) {
        if (Utils.env.supportsEBForAndroid()) {
          this.$refs['wxc-tab-page'].bindExp(e.element);
        }
    }
```

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
                :spm-c="4307989"
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

  // 详细配置可见demo代码
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

| 名称      | 类型     | 默认值   | 备注  |
|-------------|------------|--------|-----|
| tab-titles | `Array` | `[]` | `必填`顶部nav显示配置,详细请见[master/demo/config.js#L55]|
| title-type | `String` | `icon` | 顶部样式是`icon`形式还是`text`形式，默认`icon`|
| tab-styles | `Array` | `[]` | `必填`顶部nav样式配置,详细请见[master/demo/config.js#L46]|
| tab-page-height | `Number` | `1334` |`必填`tab page页面的高度，详细计算可以参数demo中 |
| is-tab-view | `Boolean` | `true` |假如需要跳出tab，可以设置这个为`true`，同时在对应的tab配置中加入url参数即可 |
| need-slider | `Boolean` | `true` | 是否需要滑动功能，默认需要|
| pan-dist | `Number` | `200` | 滚动多少切换上下一屏幕|
| duration | `Number` | `300` | 页面切换动画的时间 |
| timing-function | `String` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | 页面切换动画函数 |
| spm-c | `String` | `0` | 顶部scroller模块的C点|
| title-use-slot | `Boolean` | `false` |是否使用slot的方式配置头部导航，注1|
| wrap-bg-color | `String` | `#F2F3F4` |page背景颜色支持自定义|


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
//当前页面被选中的回调`@wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected"`
```
