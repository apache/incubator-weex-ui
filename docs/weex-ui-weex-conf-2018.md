## Weex + Ui - Weex Conf 2018

*Welcome to [translate](https://github.com/alibaba/weex-ui/blob/master/docs/weex-ui-weex-conf-2018.md) this article.*

本文是2018年 Weex Conf 中议题《Weex + Ui》的内容文档整理，主要给大家介绍飞猪 Weex 技术体系从无到有的过程，包括 Weex Ui 组件库的开发和发展，重点分享在 Weex Ui 层建设的一些经验。

文章较长，首先放上 Weex Ui 的开源地址，欢迎大家提PR，同时也可以通过 Star 来表示你的喜欢。

> <https://github.com/alibaba/weex-ui>

## Why Weex ?

#### Weex vs H5 
我们为什么选择Weex作为我们首要的跨端开发技术呢？写过H5的同学肯定会被它的**简单高效**、**发布即更新**、**一条URL可适配多端**等这些**快**所吸引，但写过 Native 的同学肯定也会被 Native 的**富交互**、**性能体验**、**可调用原生能力**、**可管理内存**等特性给我们的业务带来更好的体验。

#### 快和体验想同时兼得 

但是很多时候，我们会想将H5的**快**和Native的**体验**兼得，飞猪前几年也一直在这个方向上面探索。

包括最开始的 Hybrid 开发，通过 Bridge 提供部分 Native
能⼒来提升 H5 体验，譬如我们在H5里面可以直接获取App的定位信息、使用相机、播放视频、导航跳转等能力，业界也有Cordova、Ionic、Meteor这些成熟的方案。

<img src="https://gw.alipayobjects.com/zos/rmsportal/YKtilLIfWxAyFhSrFzBi.jpeg" width="800"/>

还有利用离线包体系通过提前将资源⽂件下载，访问时路由拦截加载本地资源，让我们的H5页面可以达到秒出、动态更新、弱网可用效果，内部有手淘Zcache、飞猪信鸽、支付宝九州这些成熟的系统。

等到了16年左右，跨平台开发技术逐渐火起来后，一种全新的开发思路吸引这我们，也即用JS来写Native，⽤ Web 的开发体验构建⾼性能、可扩展的 Native 应⽤，同时真正获取上述所说的**快**和**体验**。

#### 业务对比分析
那么为什么会选择 Weex 呢？其实和飞猪业务特点很有关系，同时又可以很好解决这些痛点。

飞猪**业务迭代速度快**，也需要快速上线；同时很多时候**景点和海外弱网使用**，同时要体验良好；其中最重要的一点是**多容器接入，适配飞猪、手淘、天猫、支付宝**，也即我们一次重要业务的开发需要一个iOS、一个Android同学来开发两端，同时由一个H5同学来开发兼容手淘、支付宝、UC的 Web 版本，也即一次业务发布涉及到多端同时开发、上线。

<img src="https://gw.alipayobjects.com/zos/rmsportal/tTdJRPRQpdIPkIVvmUyU.jpeg" width="800"/>

Weex 其实很好的解决了上述的一些问题，包括在飞猪、手淘、天猫 Weex环境下完全 **Native体验**，同时Bundle 资源大小**较 H5 小很多**，加上富交互体验、长列表性能好非常适合商品列表页面和双十一场景，最重要的是真正让我们从3个人的开发减少到了1个人，其他2个人可以去做更多有意义的事情。


接下来我们可以从下面这个展示来看Weex和H5业务的一个展示、数据对比，详细可看此[录制视频>>>](https://gw.alipayobjects.com/os/rmsportal/FptvGkFpdBXRPtuNGMdk.mp4)

<video width="800" controls  muted><source src="https://gw.alipayobjects.com/os/rmsportal/FptvGkFpdBXRPtuNGMdk.mp4" type="video/mp4"></video>

这是一个业务逻辑复杂的页面，包括筛选、排序、日历选择、收藏、长列表、业务逻辑也很复杂的页面，重构成Weex以后，我们**首屏可用时间降级68%**、**Bundle大小直接减少了73%**，由于体验变好变快、让我们**页面转化率居然提升了14.5%**。

也上也就是我们为什么选择Weex作为我们跨端开发的一些重要原因，接下来介绍的是飞猪的weex 技术体系。


## 飞猪 Weex 技术体系

#### 架构图

<img src="https://gw.alipayobjects.com/zos/rmsportal/adNiyVpYLLOwVXUbrHFV.jpeg" width="800"/>

可以从底层一直往上看，底层由我们APP的Framework / Libraries / OS Kernel等组成，我们在Weex的上下层和手淘、天猫一起设计出一套统一的Api设计，包括接口请求、数据埋点、路由跳转、网络状态、支付功能、导航栏定制等这一系列的通用服务，在 Weex 上面我们封装了Weex Ui组件库、业务组件库、UPX搭建营销模块、还有抹平多端差异的 Util 函数库，这样在我们上层可以长出我们众多的业务。

由于 Weex 在我们这边和 H5 一样，都是当做页面来发布、而不是一个 View 里面写很多子View来组织，同时也很不建议大家使用vue-router来管理，更多的使用多页面来跳转体验会更好。

说到构建发布流程，我们统一通过Clam来对我们项目进行初始化、构建、debug、预发、发布等工作，同时在上线方面直接通过Awpp命令来直接发布页面到CND，同时可以通过信鸽将离线资源推送到APP，运营同学也可以直接通过搭建的方式将页面发布出去。

#### Weex 页面如何在飞猪、手淘、支付宝进行多端投放 ?

那你可能会问 Weex 页面如何在飞猪、手淘、支付宝进行多端投放呢 ?
这里有两种方式，第一种为**通过前端 URL 参数决定渲染为 Weex 还是 H5**

<img src="https://gw.alipayobjects.com/zos/rmsportal/UAdGXDERTrhPuWCdUKyu.jpeg" width="800"/>

`xxxx.html?_wx_tpl=xxxx.js`：前面为降级时的 H5 地址， 后面 `_wx_tpl` 带的参数代表 Weex JS 地址， 当容器发现 URL 带有 `_wx_tpl` 参数时, 会下载后面的 JS 地址然后用 Weex 容器渲染。

还有一种为**通过服务端返回内容决定渲染为 Weex 还是 H5**：

`xxxx?wh_weex=true`：前面可以是 JS 地址也可以是 H5 地址，后面是固定的参数 `wh_weex=true`，当容器发现 URL 带有 `wh_weex=true` 时, 会请求前面的 xxxx 地址， 如果发现响应的 mime type（HTTP header content-type）为 `application/javascript`，则使用 Weex 渲染返回的内容， 否则使用 WebView 渲染成 H5。


####  飞猪 Weex 业务大盘

 <img src="https://gw.alipayobjects.com/zos/rmsportal/xodsBNArvXGQaMMOJyMu.jpeg" width="800"/>
 
 Weex 并不是像外界某些人传言说没有什么公司在使用Weex的，反而是超过你的想象，以上是我们这边17年12月份前的一个相关weex页面的一览，大家可以在飞猪、手淘、支付宝里面找到这些页面，均是一份页面同时投放到多端的。
 
#### 什么业务适合用 Weex ？
 包括众多的营销业务、首页、频道、搜索列表、正向流程、简单详情、富交互页面都是很适合使用Weex来开发的，同时在我们这边也有一个对应的原则包括 **展示类项目优先使用 Weex**、**重构/新项目优先使用 Weex**、深度垂直类目尝试使用 Weex。
 
 
#### Weex 不适合复杂场景 ？
大家可以看下如下这几个场景的[视频展示>>>](https://gw.alipayobjects.com/os/rmsportal/SZwliPeMLRmyCyVvLYIp.mp4)

<video width="800" controls  muted><source src="https://gw.alipayobjects.com/os/rmsportal/SZwliPeMLRmyCyVvLYIp.mp4" type="video/mp4"></video>

大家可能会觉得Weex不适合复杂的场景，其实也不一定，通过很多方式是可以做到复杂场景的支持，包括**双11**超长列表滚动，30多屏数据，快速滚动很顺滑。

同时包括逻辑异常复杂、多组件的国际机票列表页，Weex 同样也可以胜任；包括图3富交互的使用场景，粘手效果的丝滑拖动，快速滑动，动态隐藏头部等等功能都是可以做到的。


通过在我们这边很多业务场景的使用 Weex 踩坑 最佳实践的积累，其实有很多东西可以沉淀下来 通过封装的方式给后续其他业务使用，这样让后面的业务可以达到快速生产，这也是我们建立Weex Ui 组件体系一个很大的原因。

## Weex Ui 的发展和开源
#### 为什么要建立 Weex Ui 组件库体系 ？
- 在引入 Weex 初期，通过 Weex Ui 让未接触 Weex 的同学对其编写有**借鉴作用**
- 提炼业务中的公共组件，便于直接引用，**提高大家开发效率**
- 业务规范、视觉规范、**最佳实践**的及时同步
- 将 Weex 业务中的**疑难杂症**通过组件封装，对外只暴露简单逻辑

#### Weex Ui 一览

经过一年多的建设，我们一步一步将 [Weex Ui](https://github.com/alibaba/weex-ui) 优化，整理，最终于20170930进行了开源，通过下图可以看到 Weex Ui 是怎么来的

<img src="https://gw.alipayobjects.com/zos/rmsportal/HbThsElNGBLMMRbbTxyx.jpeg" width="800"/>

目前 Weex Ui 组件库包括7大类31个成熟的组件，同时并不是直接开源给大家使用，而是在内部已经使用了1年多后稳定后开源给大家使用，大家可以通过手淘、飞猪、任何浏览器扫码进行预览

<img src="https://gw.alipayobjects.com/zos/rmsportal/MNIgWQQFnsXFVDgmXLrr.jpeg" width="800"/>

同时一个开源库的文档其实是后续发展中用户是否能快速上手的一个很大因素，Weex UI
包括组件说明、使用规则、Demo展示、详细使用API、升级文档等等，可以让你快速使用。

#### Weex Ui 是不是只适合电商体系呢？

近期我们队 Weex Ui的使用者做过一次[问卷调查](https://render.alipay.com/p/f/weex-ui/questionnaire.html)，结果让我们很惊喜，并不是只有电商在使用，还很很多其他的体系在使用，包括工具类、企业应用、文娱、自媒体、新闻这些其实都是有使用的。

<img src="https://gw.alipayobjects.com/zos/rmsportal/AEJVShlmkpZAtlondEMv.jpeg" width="800"/>

#### 组件化搭建你的 Weex 页面
很多时候基础建设，其实为了给业务开发来加速，譬如接下来这个飞猪专线的页面就是通过我们的Weex Ui组件库来搭建起来的

<img src="https://gw.alipayobjects.com/zos/rmsportal/IXRdWHrLXhhKOcZSPIEu.jpeg" width="800"/>

然而基础基础只能够解决通用组件的问题，其实还包括业务组件这一块，也即上图中的`your-item`组件,也即我们下面要说的 Weex 业务组件化

## 除了基础库，在 Weex Ui 层还可以做什么 ？
#### Weex 业务组件化

<img src="https://gw.alipayobjects.com/zos/rmsportal/dJgZKjtUqyJczzIbeUQJ.jpeg" width="800"/>

业务组件库更多是前端、后端、设计师之间的一个“约定”，通过一定规范共同让业务组件变得可复用。也即Weex代码中直接引入此组件，直接插入后端返回的原始数据，就可以生成设计师所设计出的商品卡片，最终可以做到**支撑任意 Weex 业务模块 投放到 任意 Weex 页面 中 任意位置 的能力**。

那么应该怎么做呢？

<img src="https://gw.alipayobjects.com/zos/rmsportal/JvdNJSPoMrpojagZAtut.jpeg" width="800"/>

#### 可以自动化测试 Weex 吗 ？
答案是可以的，之前通过[macacajs](https://macacajs.github.io)测试框架和Weex结合来弄，通过自定义一连串的手势、事件，最后通过用json来表明执行的顺序，可以做到，详细可见[视频地址>>>](http://p.tb.cn/rmsportal_7819_2026c3a73abfb162-1.mov)

1、安装app
2、自动打开native页面
3、登录，自动输入
4、自动测试飞猪度假首页，包括点击、跳转、滑动、下拉刷新等操作
5、自动测试飞猪专线、包括左滑、右滑操作
6、自动测试Weex Ui，包括打开组件、点击交互逻辑
7、自动各个页面运行截图，并将测试情况邮件给测试方

<video width="800" controls  muted><source src="http://p.tb.cn/rmsportal_7819_2026c3a73abfb162-1.mov" type="video/mp4"></video>

#### Weex 无障碍优化
Weex 其实也是支持无障碍的，也即让盲人在最短的时间内通过最快的方式找到自己想要的信息。
同时当盲人访问我们Weex页面时候，让他们对 Weex 是可感知的、可操作的、可理解的、同时页面也是鲁棒的。譬如如下这个[演示>>>](http://p.tb.cn/rmsportal_7819__E6_97_A0_E9_9A_9C_E7_A2_8D.mov)：

<video width="240" controls><source src="http://p.tb.cn/rmsportal_7819__E6_97_A0_E9_9A_9C_E7_A2_8D.mov" type="video/mp4"></video>

无障碍在Weex实现起来是很简单的，譬如如下实现：

<img src="https://gw.alipayobjects.com/zos/rmsportal/RmDWBkEtfKDVZLXLgHEp.png" width="400"/>


#### 飞猪 Weex 双十一性能优化
每年的双十一也就是我们Weex的一个战场，几乎所有会场页面均由Weex实现，如何让用户丝滑的逛我们的页面呢？期间我们也将之前很多经验包括优化技巧放到了双十一的会场页面，包括一些经验的整理。

<img src="https://gw.alipayobjects.com/zos/rmsportal/xzxwfrgmwGKMaVRcTMXF.png" width="800"/>


## 回到开源
其实 Weex 可以在很多很多地方使用，包括各种应用场景，这也是我们开源Weex Ui 的一个很大原因，给大家更多 Weex 可实现功能的输入，最佳实践实现的参考。

同时外部开发者也急需要一套成熟组件库来提高开发效率。

> <https://github.com/alibaba/weex-ui>

从20170930开始，我们一直在弄Weex Ui 的开源发展，包括共建 weex-toolkit 让其更好支持Weex Ui、欠缺组件的补全 + 现有组件的增强、继续扩展边界 + 轻舟解决方案 UI 库、引入更多富交互体验 + 组件的无障碍优化、简易的使用方式 + 详细的中英文档等等工作。

其实更多的是想大家一起参与进来，共同促进我们 Weex 的发展。

说到共同促进，那么你可以做什么呢？ 其实可以做很多很多事情

<img src="https://gw.alipayobjects.com/zos/rmsportal/WrZhBcWwQnEHuorIASWC.jpeg" width="800"/>

## 晚上圆桌会议关于 Weex 组件方向讨论总结

#### 1. Weex 原生组件的封装应该注意什么？
- 通用性，只有多个业务同时在使用，同时具备可抽离性特性的组件，譬如Video/TabBar/TitleBar/ImageUpload 这些在 Native中成熟的组件
- 稳定性，Native 组件不像 weex 上层的组件可调节性大，所以需要注意好 Native 组件一定需要没有Bug，防止修复和更新麻烦，同时 Native 组件一开始应该将大部分情况做成可配置化，防止频繁更新，导致需要适配很多版本
- 原子性，不建议一个组件同时做很多事情，应该是单一的功能，然后通过搭配的方式来得到更多功能

#### 2.weex 组件开发和实践过程中的一些经验？
- 811原则，默认80%的功能应该是不需要用户配置很多参数，10%的地方用户可以通过配置一些参数来达到目的，10%的稀有情况可以暂时不考虑，可能这里会花费很多时间开发，所以可以等到有业务需要使用时候，再更新上去
- 统一收口原则，为了避免后续组件变成一个大杂烩，后续迭代视觉交互、新功能的增加需要将通用性考虑进去，这里需要一个人统一来收口、开发维护此组件，可以避免很多“业务特性”来干扰组件的可用性
- 性能体验的优化，Weex 组件比页面的编写更应该保证他的性能体验
- 信任机制：很多时候别人使用你的组件一个很大原因是由于相信你的组件没有问题，是稳定的，同时后续会常常维护的

#### 3.大家认为Weex Ui组件还缺少什么？
- 缺少一些汇集起来使用的场景，目前单个组件的使用文档已经详细说明，但是对于多个组件的一些使用，或者页面层面的开发缺少相关案例，后期需要逐步补上[weex-ui-demo](https://github.com/tw93/weex-ui-demo)
- 主题配置灵活性上需要考虑进行，目前更多是通过参数配置的方式来更改主题颜色，其实是可以通过一个统一外部参数的配置来使它修改

#### 4.未来跨端开发会是怎么样的？
- Native的布局方式需要向H5的开发灵活性学习，逐步使用自动布局来实现，同时引入弹性思路开发，避免绝对计算
- 数据绑定方面会越来越便捷，譬如和MVVM思路一样，数据变化后，视图立马修改，而不是手动去触发


## More

大家可以通过用钉钉扫一扫如下二维码，大家一起来讨论交流：

<img src="https://img.alicdn.com/tfs/TB1irfjlyqAXuNjy1XdXXaYcVXa-624-823.png" width="300"/>

- 本次分享PDF文件: [《 Weex + Ui 》](http://p.tb.cn/rmsportal_7819_Weex_20_2B_20UI_20_20_20Weex_20Conf_20_E9_A3_9E_E7_8C_AA_20_E4_BE_91_E5_A4_95.pdf)
- 官网地址：<https://alibaba.github.io/weex-ui>
- Github地址：<https://github.com/alibaba/weex-ui>
- 云相册直播地址：<http://v.alltuu.com/album?id=1004641019>
