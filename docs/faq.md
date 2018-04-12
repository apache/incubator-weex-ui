## FAQ

#### wxc-ep-slider、wxc-slider-bar Can't slide
- The two components in Weex Ui now depend on an innovative interaction feature called [BindingX](https://alibaba.github.io/bindingx/), And this feature is already open source, please refer to github [to import](https://github.com/alibaba/bindingx#installation).


#### Suggestions for using images in Weex.
- Use CDN image：It is recommended to use, and to ensure that the actual size and size of the image is consistent with what you need to show.
- Use local image：Weex’s native runtime support load image file from device’s disk, all you have to do set the file url like file:///sdcard/image_new0.png,More you can see [here](http://blog.csdn.net/codingfire/article/details/79528639), At the same time, Weex does not support the loading of image files in your project, nor does it support the direct use of local images by downgrade Web version. Therefore, it is recommended to use the CDN image link.
- Use Base64：This depends on native image library resolution, but it is not recommended to use more than 2k Base64 in Weex, which makes the bundle too large to affect performance.

#### Module not found: Error: Can't resolve 'weex-ui/packages/wxc-button/style.css'
- This error should be the `babel-plugin-component` lack of style configuration, You can refer to [Weex-toolkit](https://alibaba.github.io/weex-ui/#/?id=weex-toolkit) to fix it.


#### Uncaught SyntaxError: Unexpected token export；
- This error typically occurs on the page developed using old weex-toolkit.
- You can refer to [this document](https://alibaba.github.io/weex-ui/#/with-weex-toolkit) to fix it.

#### ERROR in XXX from UglifyJs Unexpected token: punc (() [XXX] 
- You can refer to [this document](https://alibaba.github.io/weex-ui/#/with-weex-toolkit) to fix it.
- If you are using a Windows system, you may still have this problem when you upgrade, you check the babel config about `webpack.config.js`, modify `exclude` like this:

   ```js
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

#### Does Weex Ui support the horizontal screen ？

- I'm sorry,Now Weex doesn't support horizontal screen, so Weex Ui doesn't have any horizontal screen mode yet. When Weex supports it, it will follow immediately.
- You can send a message to weex at the horizontal screen, Then handle this in your code.

  ```js
  function getHWidth (w) {
    return deviceWidth / w * 750
  }
  const meta = weex.requireModule('meta')
  // set viewport width
  meta.setViewport({
    width: getHWidth(w) // W is the width of the design draft
  })
  ```
  
#### Can Weex Ui be used in vue project ?
- Weex Ui can write once and support iOS / Android / Html5 right now!
- But if you want to use it in a pure vue project, you can replace it with this one, but not recommended：

    ```js
     import { WxcComponent1, WxcComponent2 } from "weex-ui/build/index.web.js"
    ```

#### Can Weex Ui be used in weex-dingtalk-cli ?
- Yes, but you need modify some config
- Add a `exclude` in `build/webpack.base.weex.conf.js` Like this:

  ```js
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

---- 
More questions can be found from the [issue list](https://github.com/alibaba/weex-ui/issues?utf8=%E2%9C%93&q=), If you find a new bug, Just file a  [issue](https://github.com/alibaba/weex-ui/issues/new).
