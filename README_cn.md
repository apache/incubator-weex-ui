# Weex Ui

[![Build Status](https://img.shields.io/travis/alibaba/weex-ui.svg?style=flat-square)](https://travis-ci.org/alibaba/weex-ui)
[![GitHub last commit](https://img.shields.io/github/last-commit/alibaba/weex-ui.svg?style=flat-square)](https://github.com/alibaba/weex-ui/commits/dev)
[![npm](https://img.shields.io/npm/v/weex-ui.svg?maxAge=3600&style=flat-square)](https://www.npmjs.com/package/weex-ui)
[![NPM downloads](https://img.shields.io/npm/dm/weex-ui.svg?style=flat-square)](https://npmjs.org/package/weex-ui)
[![NPM all downloads](https://img.shields.io/npm/dt/weex-ui.svg?style=flat-square)](https://npmjs.org/package/weex-ui)
[![GitHub closed issues](https://img.shields.io/github/issues-closed/alibaba/weex-ui.svg?style=flat-square)](https://github.com/alibaba/weex-ui/issues?utf8=%E2%9C%93&q=)
![Accessibility](https://img.shields.io/badge/accessibility-support-orange.svg?style=flat-square)
[![Join the chat at https://gitter.im/alibaba-weex-ui/chat](https://img.shields.io/gitter/room/alibaba/weex-ui.svg?style=flat-square)](https://gitter.im/alibaba-weex-ui/chat?utm_source=share-link&utm_medium=link&utm_campaign=share-link)

> 一个基于 [Weex](https://github.com/apache/incubator-weex) 的富交互、轻量级、高性能的 UI 组件库

## 文档
- **[中文文档](https://alibaba.github.io/weex-ui/#/cn/)**
- [English](https://alibaba.github.io/weex-ui/#/)
- [Weex + Ui - Weex Conf 2018](https://alibaba.github.io/weex-ui/#/docs/weex-ui-weex-conf-2018) 

## 预览
<img src="https://img.alicdn.com/tfs/TB1O2ulhgoQMeJjy0FoXXcShVXa-1282-986.jpg" width=540/>

*你可以通过[飞猪](https://www.fliggy.com/mobile/?spm=181.52816.a1z6c.19.1fcc529aNQO84O&ad_id=&am_id=1301048151a679d80b29)、[淘宝](https://mpage.taobao.com/hd/download.html?spm=a21bo.50862.201858.1.5523e29eOKuPPN)、[天猫](https://pages.tmall.com/wow/portal/act/app-download?spm=875.7931836/B.a2226mz.16&scm=1027.1.1.1)、[Weex Playground](https://weex.apache.org/cn/playground.html) 或者浏览器扫码[体验](https://h5.m.taobao.com/trip/weex-ui/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fweex-ui%2Fdemo%2Findex.native-min.js)* &nbsp;&nbsp;[English >>](/)

## 安装

```shell
npm i weex-ui -S
```

## 使用

```html
<template>
  <div>
    <wxc-button text="Open Popup"
                @wxcButtonClicked="buttonClicked">
    </wxc-button>
    <wxc-popup width="500"
               pos="left"
               :show="isShow"
               @wxcPopupOverlayClicked="overlayClicked">
    </wxc-popup>
  </div>
</template>

<script>
  import { WxcButton, WxcPopup } from 'weex-ui';
  // 或者分开引用（不是很推荐）
  // import WxcButton from 'weex-ui/packages/wxc-button';
  // import WxcPopup from 'weex-ui/packages/wxc-popup';
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

#### 使用前的配置

为了不打包所有的组件，你需要使用 [`babel-plugin-component`](https://www.npmjs.com/package/babel-plugin-component) 来只引入需要的组件打包，同时如果没有安装 `babel-preset-stage-0`，也需一并安装。

```shell
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

#### 更多
- 如果你的`webpack.config.js`中 babel-loader 有对 node_modules 进行 exclude 处理，请修改成这样 `exclude: /node_modules(?!(\/|\\).*(weex).*)/`。
- 更多使用详细可见：**[在 weex-toolkit 创建的项目中使用 Weex Ui](/docs/with-weex-toolkit_cn.md)** 和 [weex-ui-demo](https://github.com/tw93/weex-ui-demo)。
- 你可以从[这里](https://github.com/alibaba/weex-ui/tree/master/example)找到更多地例子，一次编写，同时支持iOS / Android / Html5。
- 如果碰到了使用问题，可以查找 [常见问题](https://alibaba.github.io/weex-ui/#/cn/faq) 和 [issue 列表](https://github.com/alibaba/weex-ui/issues?utf8=%E2%9C%93&q=) 来看是否为已解决问题。
- 为了获取最新特性和更好的体验, 请关注 [升级日志](https://github.com/alibaba/weex-ui/releases) 并**经常更新 `weex-ui` 到最新版本**.

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
