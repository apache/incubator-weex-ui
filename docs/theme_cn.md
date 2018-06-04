# Theme 主题配色

> 一键切换组件默认配色

** 为了丰富组件的视觉效果，Weex Ui 提供了一键配色的功能。**

## 支持情况

目前以下组件均已支持主题化：

- `wxc-minibar`
- `wxc-searchbar`
- `wxc-radio`
- `wxc-checkbox`
- `wxc-simple-flow`
- `wxc-slider-bar`
- `wxc-grid-select`
- `wxc-page-calendar`

<div style="font-size: 0px;">
    <img src="http://p1nq9peby.bkt.clouddn.com/theme_yellow.jpg" style="display: inline-block; width: 24%; margin: 0 0.5%;" />
    <img src="http://p1nq9peby.bkt.clouddn.com/theme_blue.jpg" style="display: inline-block; width: 24%; margin: 0 0.5%;" />
    <img src="http://p1nq9peby.bkt.clouddn.com/theme_green.jpg" style="display: inline-block; width: 24%; margin: 0 0.5%;" />
    <img src="http://p1nq9peby.bkt.clouddn.com/theme_red.jpg" style="display: inline-block; width: 24%; margin: 0 0.5%;" />
</div>

## 使用前

如果你已经安装了 [`babel-plugin-component`](https://www.npmjs.com/package/babel-plugin-component)，请替换成 [`babel-plugin-weeexcomponent`](https://www.npmjs.com/package/babel-plugin-weex-ui)。

```shell
npm uninstall babel-plugin-component & npm install babel-plugin-weex-ui -D
```

同时修改你的 `.babelrc`

```json
{
    "presets": ["es2015", "stage-0"],
    "plugins": [
        [
            "weex-ui",
            {
                "libraryName": "weex-ui",
                "jsTheme": true
            }
        ]
    ]
}
```

## 配置

Weex Ui 内置了 4 套不同主题配色，默认配色为 `黄色`。

按照以下配置修改你的 `.babelrc`，通过修改 `theme` 即可自由设置你所需的主题。

```javascript
{
    "presets": ["es2015", "stage-0"],
    "plugins": [
        [
            "weex-ui",
            {
                "libraryName": "weex-ui",
                "jsTheme": true,
                "theme": "default"   // 主题名称
            }
        ]
    ]
}
```

## 自定义主题

除了内置主题，Weex Ui 还提供了自定义主题的功能，只需要在 `.babelrc` 中配置 `customTheme`。

**注意：**目前只能基于 Weex Ui 的内置主题修改，编写前请先 Fork Weex Ui 的主题( `weex-ui/lib/theme` )，我们将会在不久的将来提供可视化的主题生成工具。

```javascript
{
    "presets": ["es2015", "stage-0"],
    "plugins": [
        [
            "weex-ui",
            {
                "libraryName": "weex-ui",
                "jsTheme": true,
                "customTheme": "@/your-theme-lib-path"   // 你的自定义主题文件路径，@ 代表当前项目目录绝对路径
            }
        ]
    ]
}
```

*Tips:* 为了简化 `customTheme` 的路径，并增强协作开发中的通用性, 请在 webpack 中配置项目根目录别名

``` javascript
// 伪代码
export default {
    ...yourOtherConfig,
    resolve: {
        alias: {
            'my-project': path.resolve(__dirname, '')
        }
    }
}
```

然后通过这样使用你的根目录别名：

```javascript
// .babaelrc
{
    "presets": ["es2015", "stage-0"],
    "plugins": [
        [
            "weex-ui",
            {
                "libraryName": "weex-ui",
                "jsTheme": true,
                "customTheme": "my-project/your-theme-lib-path"
            }
        ]
    ]
}
```

更多配置项请查阅 [babel-plugin-weex-ui 文档](https://github.com/Yanjiie/babel-plugin-weex-ui)

## 内置配色
<img src="http://p1nq9peby.bkt.clouddn.com/theme.png" style="box-shadow: 0 5px 10px 0 #d9dce3; border-radius: 4px;" />

## FAQ

主题配色功能目前还在不断完善中，如果你在使用中有任何问题或更好的建议欢迎 [提交 Issue 或 PR](https://github.com/alibaba/weex-ui/issues/new)；

同时在 [#216](https://github.com/alibaba/weex-ui/issues/216) 中与我们积极讨论。


