# Weex Ui

[![Build Status](https://img.shields.io/travis/alibaba/weex-ui.svg?style=flat-square)](https://travis-ci.org/alibaba/weex-ui)
[![npm](https://img.shields.io/npm/v/weex-ui.svg?maxAge=3600&style=flat-square)](https://www.npmjs.com/package/weex-ui)
[![NPM downloads](https://img.shields.io/npm/dm/weex-ui.svg?style=flat-square)](https://npmjs.org/package/weex-ui)
[![NPM all downloads](https://img.shields.io/npm/dt/weex-ui.svg?style=flat-square)](https://npmjs.org/package/weex-ui)
[![GitHub last commit](https://img.shields.io/github/last-commit/alibaba/weex-ui.svg?style=flat-square)](https://github.com/alibaba/weex-ui/commits/dev)
[![GitHub closed issues](https://img.shields.io/github/issues-closed/alibaba/weex-ui.svg?style=flat-square)](https://github.com/alibaba/weex-ui/issues?utf8=%E2%9C%93&q=)
[![Package Quality](http://npm.packagequality.com/shield/weex-ui.svg?style=flat-square)](http://packagequality.com/#?package=weex-ui)
[![Join the chat at https://gitter.im/alibaba-weex-ui/chat](https://img.shields.io/gitter/room/alibaba/weex-ui.svg?style=flat-square)](https://gitter.im/alibaba-weex-ui/chat?utm_source=share-link&utm_medium=link&utm_campaign=share-link)

> 一个基于 [Weex](https://github.com/apache/incubator-weex) 的富交互、轻量级、高性能的 UI 组件库

## 文档

* **[主页](https://alibaba.github.io/weex-ui/#/cn/)**
* [English](https://alibaba.github.io/weex-ui/#/)
* [搭配 weex-toolkit 使用 Weex Ui](https://alibaba.github.io/weex-ui/#/cn/with-weex-toolkit)

## 预览

<img src="https://img.alicdn.com/tfs/TB1O2ulhgoQMeJjy0FoXXcShVXa-1282-986.jpg" width=540/>

你可以通过飞猪、淘宝、天猫、Weex Playground 或者浏览器扫码[体验](https://h5.m.taobao.com/trip/weex-ui/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fweex-ui%2Fdemo%2Findex.native-min.js)

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

### 使用前

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

### 更多

* 如果 `webpack.config.js`中 babel-loader 有对 node_modules 进行 exclude 处理，请修改成这样 `exclude: /node_modules(?!(\/|\\).*(weex).*)/`
* 更多使用可见：[在 weex-toolkit 创建的项目中使用 Weex Ui](/docs/with-weex-toolkit_cn.md) 和 [weex-ui-demo](https://github.com/tw93/weex-ui-demo)
* 为了获取最新特性, 请常查看 [升级日志](https://github.com/alibaba/weex-ui/releases) 并更新组件到最新版本
* 很多常见问题可以从 [faq](https://alibaba.github.io/weex-ui/#/cn/faq) 和 [issue 列表](https://github.com/alibaba/weex-ui/issues?utf8=%E2%9C%93&q=) 获得答案，假如发现了新 Bug，可以给我们提一个[issue](https://github.com/alibaba/weex-ui/issues/new)
* 更多的 Weex 建设经验可以从 [Weex + Ui - Weex Conf 2018](https://alibaba.github.io/weex-ui/#/docs/weex-ui-weex-conf-2018) 这篇文章了解，欢迎翻译~

## 调试

```shell
npm i
npm run start
```

一旦它编译完成后，将会自动打开一个浏览器，你可以将浏览器切换到开发者模式，这时候在 console 中你可以看到一个预览二维码，直接使用你的 Weex App 扫码就可以看到 Demo 效果。


## 支持

* 在你的公司或个人项目中使用 Weex Ui
* 如果你觉得 Weex Ui 还不错，可以通过 Star 来表示你的喜欢
* <details>
  <summary>加入钉钉聊天群帮忙解答 Weex 技术问题</summary>
  <img alt="Join the chat at dingtalk" src="https://img.alicdn.com/tfs/TB1DSvMg2DH8KJjy1XcXXcpdXXa-750-850.jpg" width="240"/>
</details>

## 贡献

想解 Bug，贡献代码或者提高文档可读性？有这个想法非常好，在提交 pull request 前记得阅读一下 [Contributing Guide](https://github.com/alibaba/weex-ui/blob/master/CONTRIBUTING.md)。

感谢给 Weex Ui 贡献代码的你们！

<a href="https://github.com/alibaba/weex-ui/graphs/contributors"><img src="https://opencollective.com/weex-ui/contributors.svg"/></a>

## 协议

* 遵循 [MIT 协议](http://opensource.org/licenses/MIT)
* 请自由地享受和参与开源
