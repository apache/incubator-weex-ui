## FAQ

#### wxc-ep-slider、wxc-slider-bar Can't slide
- The two components in Weex Ui now depend on an innovative interaction feature called [expressionBinding](https://github.com/alibaba/weex/issues/1730), Can only be used in Ali app for the time being, But this feature is in the open source process，You can find more [here](https://github.com/alibaba/weex-ui/issues/6).

#### Uncaught SyntaxError: Unexpected token export；
- This error typically occurs on the page developed using old weex-toolkit.
- You can refer to [this document](https://alibaba.github.io/weex-ui/#/with-weex-toolkit) to fix it.

#### ERROR in XXX from UglifyJs Unexpected token: punc (() [XXX] 
- You can refer to [this document](https://alibaba.github.io/weex-ui/#/with-weex-toolkit) to fix it.
- If you are using a Windows system, you may still have this problem when you upgrade, you check the babel config about `webpack.config.js`, modify `exclude` like this:

   ```
    rules: [{
         test: /\.js$/,
         use: [{
           loader: 'babel-loader'
         }],
         exclude: /node_modules(?!(\/|\\).*(weex).*)/
    }]
   ```

#### vue.runtime.js:478 [Vue warn]: Cannot find element: #root
- The default config of weex project create by weex-toolkit will generate entry config automatically, but this project has already used entry.js as entry config in webpack,Details of the cause are visible in [pull/21](https://github.com/zwwill/yanxuan-weex-demo/pull/21).

#### GIF images have no animation on Android
- This is supported by the underlying image library, More you can refer to [Weex 踩坑之 Gif 加载](https://zhoukekestar.github.io/notes/2017/07/17/weex-gif.html).

#### Can Weex Ui be used in vue project ?
- Weex Ui can write once and support iOS / Android / Html5 right now!
- But if you want to use it in a pure vue project, you can replace it with this one, but not recommended：

    ```
     import { WxcComponent1, WxcComponent2 } from "weex-ui/build/index.web.js"
    ```

#### Can Weex Ui be used in weex-dingtalk-cli ?
- Yes, but you need modify some config
- Add a `exclude` in `build/webpack.base.weex.conf.js` Like this:

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
- Please add 'babel-preset-stage-0' and 'babel-plugin-component' to .babelrc
  
  > npm i babel-plugin-component babel-preset-stage-0  -D
  
  Edit the `.babelrc` like this
  
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
#### Does Weex Ui support the horizontal screen ？
- I'm sorry,Now Weex doesn't support horizontal screen, so Weex Ui doesn't have any horizontal screen mode yet. When Weex supports it, it will follow immediately.

---- 
More questions can be found from the [issue list](https://github.com/alibaba/weex-ui/issues?utf8=%E2%9C%93&q=), If you find a new bug, Just file a  [issue](https://github.com/alibaba/weex-ui/issues/new).
