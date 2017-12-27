# Weex Ui

[![Build Status](https://img.shields.io/travis/alibaba/weex-ui.svg?style=flat-square)](https://travis-ci.org/alibaba/weex-ui)
[![GitHub last commit](https://img.shields.io/github/last-commit/alibaba/weex-ui.svg?style=flat-square)](https://github.com/alibaba/weex-ui/commits/dev)
[![npm](https://img.shields.io/npm/v/weex-ui.svg?maxAge=3600&style=flat-square)](https://www.npmjs.com/package/weex-ui)
[![NPM downloads](https://img.shields.io/npm/dm/weex-ui.svg?style=flat-square)](https://npmjs.org/package/weex-ui)
[![GitHub closed issues](https://img.shields.io/github/issues-closed/alibaba/weex-ui.svg?style=flat-square)](https://github.com/alibaba/weex-ui/issues?utf8=%E2%9C%93&q=)
![Accessibility](https://img.shields.io/badge/accessibility-support-orange.svg?style=flat-square)
[![Join the chat at https://gitter.im/alibaba-weex-ui/chat](https://img.shields.io/gitter/room/alibaba/weex-ui.svg?style=flat-square)](https://gitter.im/alibaba-weex-ui/chat?utm_source=share-link&utm_medium=link&utm_campaign=share-link)

> 一个基于 [Weex](https://github.com/apache/incubator-weex) 的富交互、轻量级、高性能的 UI 组件库

## 预览
<img src="https://img.alicdn.com/tfs/TB1O2ulhgoQMeJjy0FoXXcShVXa-1282-986.jpg" width=540/>

*你可以通过[飞猪](https://www.fliggy.com/mobile/?spm=181.52816.a1z6c.19.1fcc529aNQO84O&ad_id=&am_id=1301048151a679d80b29)、[淘宝](https://mpage.taobao.com/hd/download.html?spm=a21bo.50862.201858.1.5523e29eOKuPPN)、[天猫](https://pages.tmall.com/wow/portal/act/app-download?spm=875.7931836/B.a2226mz.16&scm=1027.1.1.1)、[Weex Playground](https://weex.apache.org/cn/playground.html) 或者浏览器扫码[体验](https://h5.m.taobao.com/trip/weex-ui/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fweex-ui%2Fdemo%2Findex.native-min.js)* &nbsp;&nbsp;[English >>](./)

## 安装

```shell
npm i weex-ui -S
```

## 使用

```html
<template>
  <div>
    <wxc-button text="Open Popup"
                @wxcButtonClicked="buttonClicked"></wxc-button>
    <wxc-popup width="500"
               pos="left"
               :show="isShow"
               @wxcPopupOverlayClicked="overlayClicked"></wxc-popup>
  </div>
</template>

<script>
  import { WxcButton, WxcPopup } from 'weex-ui';
  module.exports = {
    components: { WxcButton, WxcPopup },
    data: () => ({
      isShow: false
    }),
    methods: {
      buttonClicked () {
        this.isShow = true;
      },
      overlayClicked () {
        this.isShow = false;
      }
    }
  };
</script>
```

### 汇集使用 (推荐)

```javascript
import { WxcComponent1, WxcComponent2 } from "weex-ui"
```
为了不打包所有的组件，你需要使用 [babel-plugin-component](https://www.npmjs.com/package/babel-plugin-component) 来只引入需要的组件打包。

```shell
npm i babel-plugin-component -D
```

```json
// 增加一个plugins的配置到 .babelrc 中
{
  "plugins": [
    [
      "component",
      {
        "libraryName": "weex-ui",
        "libDir": "packages"
      }
    ]
  ]
}
```

### 分开使用

```javascript
import WxcComponent1 from "weex-ui/packages/wxc-component1"
import WxcComponent2 from "weex-ui/packages/wxc-component2"
```
### Weex-toolkit
如果你使用[weex-toolkit](https://github.com/weexteam/weex-toolkit)来开发你的Weex项目，你需要向 .babelrc 文件中加入 'state-0' 和 'babel-plugin-component'

```shell
weex update weexpack
npm i babel-preset-stage-0 babel-plugin-component  -D
```

```json
{
  "presets": ["es2015", "stage-0"],
  "plugins": [
    [
      "component",
      {
        "libraryName": "weex-ui",
        "libDir": "packages",
         "style": false
      }
    ]
  ]
}
```
更多详细可见：[在 weex-toolkit 创建的项目中使用 Weex Ui](/docs/with-weex-toolkit_cn.md)。

### 更多
- 如果你的`webpack.config.js`中 babel-loader 配置有对 node_modules 进行 exclude 处理，需要将 weex-ui 包过滤才可以使用 `exclude: /node_modules(?!\/.*(weex).*)/`。
- 你可以从[这里](https://github.com/alibaba/weex-ui/tree/master/example)找到更多地例子，一次编写，同时支持iOS / Android / Html5。

## 文档
|组件名称|分类|描述|
|:--|:--|:--|
|[wxc-button](packages/wxc-button/README_cn.md)|布局|基础按钮组件|
|[wxc-cell](packages/wxc-cell/README_cn.md)|布局|单元格组件 展示表单、列表|
|[wxc-ep-slider](packages/wxc-ep-slider/) * |布局|表达式绑定效果的 slider |
|[wxc-lightbox](packages/wxc-lightbox/README_cn.md)|布局|图片全屏预览|
|[wxc-overlay](packages/wxc-overlay/README_cn.md)|布局|基础蒙层|
|[wxc-popup](packages/wxc-popup/README_cn.md)|布局|支持上下左右出现的滑板|
|[wxc-result](packages/wxc-result/README_cn.md)|布局|通用结果页|
|[wxc-slide-nav](packages/wxc-slide-nav/README_cn.md)|布局|导航滑动 增大视窗|
|[wxc-minibar](packages/wxc-minibar/README_cn.md)|导航|模拟导航栏|
|[wxc-tab-bar](packages/wxc-tab-bar/README_cn.md)|导航|底部Bar页面切换|
|[wxc-tab-page](packages/wxc-tab-page/) * |导航|Tab页面切换滑动组件|
|[wxc-checkbox](packages/wxc-checkbox/README_cn.md)|数据输入|复选列表|
|[wxc-city](packages/wxc-city/README_cn.md)|数据输入|通用城市选择|
|[wxc-countdown](packages/wxc-countdown/README_cn.md)|数据输入|倒计时|
|[wxc-radio](packages/wxc-radio/README_cn.md)|数据输入|单选列表|
|[wxc-slider-bar](packages/wxc-slider-bar/) * |数据输入|滑动选择数据|
|[wxc-stepper](packages/wxc-stepper/README_cn.md)|数据输入|计数器|
|[wxc-searchbar](packages/wxc-searchbar/README_cn.md)|数据输入|搜索栏|
|[wxc-grid-select](packages/wxc-grid-select/README_cn.md)|数据展示|网格选择|
|[wxc-icon](packages/wxc-icon/README_cn.md)|数据展示|通用 iconFont 汇集 |
|[wxc-indexlist](packages/wxc-indexlist/README_cn.md)|数据展示|索引列表|
|[wxc-page-calendar](packages/wxc-page-calendar/README_cn.md)|数据展示|全屏日历|
|[wxc-rich-text](packages/wxc-rich-text/README_cn.md)|数据展示|动态模块 富文本|
|[wxc-simple-flow](packages/wxc-simple-flow/README_cn.md)|数据展示|Simple flow chart|
|[wxc-tag](packages/wxc-tag/README_cn.md)|数据展示|多种形式的标签|
|[wxc-dialog](packages/wxc-dialog/README_cn.md)|反馈|二次确认弹框|
|[wxc-loading](packages/wxc-loading/README_cn.md)|反馈|加载器|
|[wxc-mask](packages/wxc-mask/README_cn.md)|反馈|中间出现浮层|
|[wxc-noticebar](packages/wxc-noticebar/README_cn.md)|反馈|信息通知栏|
|[wxc-progress](packages/wxc-progress/README_cn.md)|反馈|进度条|
|[wxc-lottery-rain](packages/wxc-lottery-rain/README_cn.md)|游戏|红包雨 抓猫猫游戏|
|[utils](packages/utils/README_cn.md)|服务|公共函数|

- `*` 这些富交互体验组件依赖于 Weex [expressionBinding](https://github.com/alibaba/weex/issues/1730) 特性，使用前请确定你的App[是否支持](https://github.com/alibaba/weex-ui/issues/6)。  
- 推荐使用 [Octotree](https://chrome.google.com/webstore/detail/octotree/bkhaagjahfmjljalopjnoealnfndnagc?hl=en-US) 扩展获得更好的组件文档查找体验。

## 调试

```shell
npm i
npm run start
```

一旦它编译完成后，将会自动打开一个浏览器，你可以将浏览器切换到开发者模式，这时候在console中你可以看到一个预览二维码，直接使用你的 Weex App 扫码就可以看到Demo效果。

## 支持

- 通过 npm 来安装使用
- 如果您喜欢这个组件库，可以 star 此项目
- 如果您有任何想法或建议来改善 Weex Ui，欢迎提交 [PR](./CONTRIBUTING.md)
- 假如使用过程中碰到了问题或者不明白某个地方为什么要这样处理？ 可以[新建一个 issue](https://github.com/alibaba/weex-ui/issues/new) 来咨询
- <details>
    <summary>加入钉钉聊天群</summary>
    <img alt="Join the chat at dingtalk" src="https://img.alicdn.com/tfs/TB1DSvMg2DH8KJjy1XcXXcpdXXa-750-850.jpg" width="240"/>
  </details>

## 协议
- 遵循 [MIT 协议](http://opensource.org/licenses/MIT)
- 请自由地享受和参与开源
