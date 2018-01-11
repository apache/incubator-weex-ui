## 常见问题

#### wxc-ep-slider、wxc-slider-bar 不能正常滑动
- 目前 Weex Ui 中这两个组件依赖于一个创新交互特性 [expressionBinding](https://github.com/alibaba/weex/issues/1730)，暂时只支持有业务在阿里系 App 中的 ISV 开发同学使用,不过此特性正在开源中，具体进度可以关注此 [issue](https://github.com/alibaba/weex-ui/issues/6)。

#### Uncaught SyntaxError: Unexpected token export；
- 此错误一般出现在使用老的 weex-toolkit 工具开发的页面。
- 可以参考[此文档](https://alibaba.github.io/weex-ui/#/cn/with-weex-toolkit)进行相关依赖升级。

#### ERROR in XXX from UglifyJs Unexpected token: punc (() [XXX] 
- 此错误为 webpack 打包过程中寻找weex-ui依赖出现的问题，目前新版本 weex-toolkit 已经修复
- 统一可以参考[此文档](https://alibaba.github.io/weex-ui/#/cn/with-weex-toolkit)进行相关依赖升级。
- 假如是 windows 系统，升级依赖后可能还是有此问题，可以检查 `webpack.config.js` 中 babel 配置(两处),将 exclude 修改成这样:

   ```
    rules: [{
         test: /\.js$/,
         use: [{
           loader: 'babel-loader'
         }],
         exclude: /node_modules(?!(\/|\\).*(weex).*)/
    }]
   ```

#### 在 web 中报 vue.runtime.js:478 [Vue warn]: Cannot find element: #root
- 详细错误原因可见 [pull/21](https://github.com/zwwill/yanxuan-weex-demo/pull/21)，为修改了weex-toolkit默认的入口导致，解决方案为 [commits](https://github.com/zwwill/yanxuan-weex-demo/pull/21/commits/3754517983c83945e11871ef1f2c85ae3dc6e8e4)。

#### gif 图片在 Android 上面没有动画
- 这个是底层图片库需要支持的，playground 的图片库是不支持的 gif 的, 这个功能偏适配层，需要开发自己在自己的图片库实现。
- 具体解决可见 [Weex 踩坑之 Gif 加载](https://zhoukekestar.github.io/notes/2017/07/17/weex-gif.html)。

#### Weex Ui 能否在 vue h5 项目中使用?
- Weex Ui 是同时支持 iOS、Android和 Weex 降级的H5使用的。
- 假如想在纯 vue 项目中使用，可以讲使用方式替换成这个试试，但是不推荐：

    ```
     import { WxcComponent1, WxcComponent2 } from "weex-ui/build/index.web.js"
    ```
    
    
#### Weex Ui 可以在钉钉 Weex 中 【weex-dingtalk-cli】运行吗 ?
- 是的，不过你需要需改一些配置来兼容下
- 像这样新增一个 `exclude` 在 `build/webpack.base.weex.conf.js` 文件中:

  ```
  module: {
      rules: [
        {
          test: /\.vue(\?[^?]+)?$/,
          loaders: ['weex-loader'],
          exclude: /node_modules(?!(\/|\\).*(weex).*)/
        },
        {
          test: /\.js$/,
          loaders: ['babel-loader'],
          exclude: /node_modules(?!(\/|\\).*(weex).*)/
        }
      ]
    }
  ```
- 同时需要像其他使用一样加入'babel-preset-stage-0' 和 'babel-plugin-component' 到 .babelrc 中
  
  > npm i babel-plugin-component babel-preset-stage-0  -D
  
  编辑 `.babelrc` 文件：
  
  ```
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

#### Weex Ui 现在支持横屏吗 ？
- 很抱歉，目前由于 Weex 本身还不支持横屏，所以 Weex Ui 现在也还没有横屏模式，等到 Weex 支持后，这边会立马跟上的。

-----
更多问题可以通过 [issue 列表](https://github.com/alibaba/weex-ui/issues?utf8=%E2%9C%93&q=)查找，假如有新问题，可以给我们提 [issue](https://github.com/alibaba/weex-ui/issues/new)。
