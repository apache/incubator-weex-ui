# 升级日志

## 0.6.2
- [+] [`utils`](https://alibaba.github.io/weex-ui/#/cn/packages/utils/) 功能增强，新增`objToParams`、`paramsToObj`、`getPageHeight`、`getScreenHeight`等功能，详细可见 [utils/index.js](https://github.com/alibaba/weex-ui/blob/master/packages/utils/index.js)
- [!] 修复 [`wxc-ep-slider`](https://alibaba.github.io/weex-ui/#/cn/packages/wxc-ep-slider/) 只有两个 slider 时候的滑动 bug  [pull/248](https://github.com/alibaba/weex-ui/pull/248)
- [!] 修复 [`wxc-searchbar`](https://alibaba.github.io/weex-ui/#/cn/packages/wxc-searchbar/) 同时设置自定义样式和主题时候的背景冲突 [issues/242](https://github.com/alibaba/weex-ui/issues/242)/[pull/245](https://github.com/alibaba/weex-ui/pull/245)
- [+] [`wxc-mask`](https://alibaba.github.io/weex-ui/#/cn/packages/wxc-mask/) 支持传入 `top` 参数控制距离顶部的高度  [issues/240](https://github.com/alibaba/weex-ui/issues/240)/[pull/241](https://github.com/alibaba/weex-ui/pull/241)
- [!] [`wxc-popover`](https://alibaba.github.io/weex-ui/#/cn/packages/wxc-popover/) demo 问题修复 [pull/236](https://github.com/alibaba/weex-ui/pull/236)


## 0.6.1
- [+] [`wxc-tab-page`](https://alibaba.github.io/weex-ui/#/cn/packages/wxc-tab-page/) 新增沉浸式全屏效果的页面切换组件 `wxc-full-page`,详细使用见组件文档
- [+] [`wxc-tab-page`](https://alibaba.github.io/weex-ui/#/cn/packages/wxc-tab-page/) 新增参数`need-slider` 控制是否需要手势滑动
- [!] 解决 `import {BindEnv} from 'weex-ui'` 的使用问题
- [!] [wxc-cell](https://alibaba.github.io/weex-ui/#/cn/packages/wxc-cell/) 功能增强，支持配置额外内容
- [!] 修复 [`wxc-slider-bar`](https://alibaba.github.io/weex-ui/#/cn/packages/wxc-slider-bar/) 在 Web 端和 iOS 端样式显示
- [+] [`wxc-refresher`](https://alibaba.github.io/weex-ui/#/cn/packages/wxc-refresher/) 放出 refresh 和 pullingdown 事件回调


## 0.6.0
- [+] [wxc-button](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-button/README.md) 组件支持更多 `type`，去除 `normal`/ `highlight`，新增 type 类型 `white`、`blue`，同时新增按钮 `size` 设置，升级后使用需要注意
- [!] 解决 bindingx 打包体积过大问题，Binding 相关判断由 `Utils.env` 转移到 `BindEnv`，升级需注意 [issue 191](https://github.com/alibaba/weex-ui/issues/191)
- [+] 新 Binding 组件: [`wxc-refresh`](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-refresh/README.md)，目前处于 beta 阶段，欢迎提建议
- [-] 移除高版本 weex-vue-loader 中对组件默认样式的提示 [issue 198](https://github.com/alibaba/weex-ui/issues/189)
- [+] [wxc-popover](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-popover/README.md) 组件支持动画 [pr 184](https://github.com/alibaba/weex-ui/pull/184/files)
- [+] [wxc-searchbar](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-searchbar/README.md) 支持设置 `bar-style` 样式覆盖主题颜色
- [!] [wxc-rich-text](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-rich-text/README.md)  对 `wxc-special-rich-text` iPad、Android 兼容性增强
- [+] 常见问题/bindingx 相关组件文档更新

## 0.5.3
- [!] [wxc-city](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-city/README.md) 支持不显示定位城市，直接传入`currentLocation`为空即可
- [+] [wxc-checkbox](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-checkbox/README.md) 新增 `has-top-border`/`has-bottom-border` 参数用于控制是否展示上线border线
- [+] [wxc-progress](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-progress/README.md) 新增 `bar-radius` 参数用于控制进度条的圆角

## 0.5.2
* [!] 重新使用 `rebind()` 用在适配 [wxc-ep-slider](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-ep-slider/README.md) 在 iOS Binding 老版本上面 list 滑动注销 Bug 
* [+] [wxc-searchbar](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-searchbar/README.md) 允许配置 取消 按钮文案
* [!][`wxc-mask`](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-tab-mask/README.md) 支持控制蒙层不可以自动关闭


## 0.5.0
* [+] [wxc-tab-page](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-tab-page/README.md)、[wxc-ep-slider](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-ep-slider/README.md)、[wxc-slider-bar](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-slider-bar/README.md) 支持[Bindingx](https://alibaba.github.io/bindingx/) 🎉🎉
* [-] 移除 [wxc-ep-slider](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-ep-slider/README.md) 中的 rebind() 调用
* [!] 修复 [`wxc-city`](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-city/README.md) 组件 props 参数问题
* [+] 给 [wxc-popover](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-popover/README.md) 增加更多 demo 同时兼容适配 Android

## 0.4.1
* [+] 新组件: [`wxc-popover`](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-popover/README.md). 🎉🎉
* [+] [wxc-city](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-city/README.md)、[wxc-page-calendar](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-calendar/README.md) 支持 model 形式动画
* [+] [wxc-tab-page](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-tab-page/README.md)、[wxc-tab-bar](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-tab-bar/README.md) 支持设置 iconFont 到 text 之间的 margin
* [+] [wxc-loading](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-city/README.md) 支持设置防误触蒙层
* [+] [wxc-simple-flow](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-simple-flow/README.md) 支持设置多行标题
 
 
## 0.4.0

* [+] 更强大的 [wxc-city](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-city/README.md) 组件，使用简单化，默认城市配置，不需传入很多参数，**但是涉及参数变动**
* [!] 优化 Github 中 Readme 中英文档的显示
* [+] 新增一个中文版本的 [Changelog](https://github.com/alibaba/weex-ui/blob/master/CHANGELOG_cn.md)
* [+] 从群里收集，新增更多的常见问题
* [+] 合并外部贡献者的代码提交

## 0.3.13

* [!] 修复 [`wxc-tab-bar`](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-tab-bar/README.md) slot bug
* [!][wxc-indexlist](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-indexlist/README.md) 完全支持自定义样式 [issue 132](https://github.com/alibaba/weex-ui/issues/132)
* [+] 新增一篇 [`Weex + Ui - Weex Conf 2018`](https://alibaba.github.io/weex-ui/#/cn/weex-ui-weex-conf-2018)文章, 欢迎来[翻译](https://github.com/alibaba/weex-ui/blob/master/docs/weex-ui-weex-conf-2018.md).

## 0.3.12

* [+] 新增 `happypack` 用来提高打包速度
* [+] 增加一个 [weex-ui](https://github.com/tw93/weex-ui-demo) 汇集使用案例
* [+][wxc-stepper](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-stepper/README.md) 支持默认值的动态更新 [issue126](https://github.com/alibaba/weex-ui/issues/126).
* [!] 修复 [wxc-grid-select](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-grid-select/README.md) 的[展示 bug](https://github.com/alibaba/weex-ui/issues/123).

## 0.3.11

* [+][`wxc-tab-bar`](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-tab-bar/README.md) 完全支持自定义导航栏头部
* [!] 修复 [wxc-radio](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-radio/README.md) 动态数据更新问题
* [!] 修复 [wxc-result](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-result/README.md)的文档代码错误 [issue112](https://github.com/alibaba/weex-ui/issues/112)
* [!] 修复 [wxc-mask](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-mask/README.md) 由于数据更新导致被隐藏的[bug](https://github.com/alibaba/weex-ui/issues/111)
* [!] 修复 [`wxc-tab-bar`](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-tab-bar/README.md) 中的 iconfont bug
* [+] 官网支持用户编辑文档和支持 copy 代码

## 0.3.10

* [+] 新组件: [`wxc-icon`](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-icon/README.md) 🎉🎉
* [+] 新组件: [`wxc-city`](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-city/README.md)
* [-] 移除所有组件中无用的默认样式
* [+] `wxc-indexlist` 新增头部 slot. [issue105](https://github.com/alibaba/weex-ui/issues/105)
* [+] `wxc-tab-bar` [支持 IPhoneX](https://img.alicdn.com/tfs/TB1_qrtkf2H8KJjy0FcXXaDlFXa-768-354.png).

## 0.3.9

* [+] `wxc-minibar` 支持 slot
* [+] 更强大的 [wxc-rich-text](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-rich-text/README.md) 组件,不再需要给一个 icon 同时传入高宽了
* [+] 新增一个 [FQA](https://alibaba.github.io/weex-ui/#/docs/fqa)

## 0.3.8

* [+][wxc-tab-bar](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-page-bar/README.md) 和 [wxc-tab-page](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-page-bar/README.md) 支持 `iconFont`.
* [!] 修复 [wxc-radio](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-radio/README.md)自定义样式时候的配置问题 [issue 89](https://github.com/alibaba/weex-ui/issues/89)
* [!] 修复 [wxc-button](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-button/README.md) 配置错误时候出现展示空白问题

## 0.3.7

* [!] 修复 [wxc-tab-bar](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-page-bar/README.md) 的高度计算问题
* [+] 功能函数的增强
* [!] 修改 webpack 的配置

## 0.3.4

* [+][wxc-radio](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-radio/README.md#api)、[wxc-checkbox](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-checkbox/README.md#checkboxlist) 新加一个 `config` 用来改变颜色和 icon
* [!][wxc-result](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-result/README.md) 使用公用主题代替飞猪色彩
* [!] wxc-button 使用 `red/yellow` 参数代替 `taobao/fliggy`
* [+] 在官网上新增一个 [`加入社区群`](https://alibaba.github.io/weex-ui/)

## 0.3.3

* [+][wxc-tab-bar](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-page-bar/README.md) 支出 `bedge`、`dot` 设置
* [+] 在官网中新增一个组件 [样板间](https://alibaba.github.io/weex-ui/docc/demo.html)

## 0.3.2

* [!] 梳理所有组件的使用文档，进行纠错优化
* [!][官网](https://alibaba.github.io/weex-ui/) 性能的一些优化
* [!] 修复一些组件在特定环境中使用报错 [issue 70](https://github.com/alibaba/weex-ui/issues/70)

## 0.3.1

* [+] wxc-page-calendar 新增 `showHeader` 参数
* [!] 修复 wxc-minibar 的函数回调问题

## 0.3.0

* [+] 新组件: [wxc-tab-bar](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-page-bar/README.md) 🎉🎉
* [-] 移除组件中所有阿里电商特色的东西

## 0.2.9

* [+] 组件展示适配 IPhoneX
* [!] 代码格式遵循 ESlint
* [+] 更强大的 [wxc-page-calendar](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-page-calendar/README.md) 组件
* [+] 正式发布 Weex Ui 官网 🎉🎉

## 0.2.8

* [+] 所有组件进行无障碍优化 🎉🎉

## 0.2.7

* [+] 更强大的 [wxc-tab-page](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-tab-page/README.md) 组件
* [!] 更新开发环境下面的包依赖
* [!] 补充 README 文档

## 0.2.6

* [!] 修复 `wxc-dialog` bug

## 0.2.3

* [-] 移除`wxc-mask`中`overlay-can-close` [入参](<(https://github.com/alibaba/weex-ui/issues/44)>)
* [-] 移除`wxc-cell`中[无用的样式](<(https://github.com/alibaba/weex-ui/issues/45)>)
* [!] 修复 `npm run start` 命令在 Windows 上面调试问题

## 0.2.2

* [!] 修复由于没有加协议头导致的图片展示问题

## 0.2.1

* [+] 更强大的 [wxc-ep-slider](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-ep-slider/README.md)
* [!] 新增 [功能函数](https://github.com/alibaba/weex-ui/blob/master/packages/utils/README.md)

## 0.2.0

* [!] 更新参考 demo 代码
* [!] 规范化代码结构体系
* [!] 修复一些在特定环境中由于 ES6 引用问题不能使用的组件

## 0.1.3

* [+] 文档中代码的支持高亮显示
* [!] 修复`wxc-indexlist` 的 [bug](https://github.com/alibaba/weex-ui/issues/16).
* [!] 规划化`wxc-searchbar`,`wxc-minibar` 的事件命名

## 0.1.2

* [!] 修复链接的跳转 bug
* [!] 修改部分组件的使用文档展示

## 0.1.1

* [!] 优化组件的使用文档

## 0.1.0

* [+] 第一个完整的版本 🎉🎉
