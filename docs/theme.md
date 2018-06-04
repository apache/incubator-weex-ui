# Theme

> One-Key convert the component color.

** In order to enrich the color of the components, Weex Ui provide the One-Key convert feature. **

## Support situation

Currently the following components have already supported convert:

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

## Before use

If you already install [`babel-plugin-component`](https://www.npmjs.com/package/babel-plugin-component), please use [`babel-plugin-weeexcomponent`](https://www.npmjs.com/package/babel-plugin-weex-ui) instead.

```shell
npm uninstall babel-plugin-component & npm install babel-plugin-weex-ui -D
```

And Modify your `.babelrc`:

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

## Configuration

Weex Ui has 4 different Build-in Themes, default is `yellow`。

Modify your `.babelrc` according to the following configuration, and then set your desired theme freely by modifying `theme`.

```javascript
{
    "presets": ["es2015", "stage-0"],
    "plugins": [
        [
            "weex-ui",
            {
                "libraryName": "weex-ui",
                "jsTheme": true,
                "theme": "default"   // The theme name
            }
        ]
    ]
}
```

## Custom theme

In addition to the built-in themes, Weex Ui also support custom theme, only need configure `customTheme` in your `.babelrc`.

**Notice: ** Currently only support develop your custom theme based on the `Weex Ui built-in themes`, please fork it in your project before develop. We will provide a visual theme generation tool in the near future.

```javascript
{
    "presets": ["es2015", "stage-0"],
    "plugins": [
        [
            "weex-ui",
            {
                "libraryName": "weex-ui",
                "jsTheme": true,
                "customTheme": "@/your-theme-lib-path"   // Your custom theme file path，@ represents the absolute path of the current project directory
            }
        ]
    ]
}
```

*Tips:* In order to simplify the ` customTheme `, and enhance collaboration, please configure the project's root path alias in Webpack.

``` javascript
// pseudocode
export default {
    ...yourOtherConfig,
    resolve: {
        alias: {
            'my-project': path.resolve(__dirname, '')
        }
    }
}
```

then use it like this:

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

More configuration please refer to [The babel-plugin-weex-ui Document](https://github.com/Yanjiie/babel-plugin-weex-ui)

## Build-in Themes
<img src="http://p1nq9peby.bkt.clouddn.com/theme.png" style="box-shadow: 0 5px 10px 0 #d9dce3; border-radius: 4px;" />

## FAQ

This feature is still constantly improving, if you have any questions or better idea during use. 

Welcome [Submit Issues or PR](https://github.com/alibaba/weex-ui/issues/new);

Also actively discuss with us in [#216](https://github.com/alibaba/weex-ui/issues/216)。
