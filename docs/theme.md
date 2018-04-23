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

If you already install [`babel-plugin-component`](https://www.npmjs.com/package/babel-plugin-component), please use [`babel-plugin-weeexcomponent`](https://www.npmjs.com/package/babel-plugin-weexcomponent) instead.

```shell
npm uninstall babel-plugin-component & npm install babel-plugin-weexcomponent -D
```

And Modify your `.babelrc`:

```json
{
    "presets": ["es2015", "stage-0"],
    "plugins": [
        [
            "weexcomponent",
            {
                "libraryName": "weex-ui",
                "libDir": "packages",
                "style": false
            }
        ]
    ]
}
```

## Configuration

Weex Ui has 4 different Build-in Themes, default is `yellow`。

Modify your `.babelrc` according to the following configuration, and then set your desired theme freely by modifying `themeConfig.name`.

```javascript
{
    "presets": ["es2015", "stage-0"],
    "plugins": [
        [
            "weexcomponent",
            {
                "style": false,
                "jsTheme": true,
                "libraryName": "weex-ui",
                "libDir": "packages",
                "themeConfig": {
                    "name": "default"   // The theme name
                }
            }
        ]
    ]
}
```

More configuration please refer to [The babel-plugin-component Document](https://github.com/Yanjiie/babel-plugin-weexcomponent)

## Build-in Themes
<img src="http://p1nq9peby.bkt.clouddn.com/theme.png" style="box-shadow: 0 5px 10px 0 #d9dce3; border-radius: 4px;" />

## FAQ

This feature is still constantly improving, if you have any questions or better idea during use. 

Welcome [Submit Issues or PR](https://github.com/alibaba/weex-ui/issues/new);

Also actively discuss with us in [#216](https://github.com/alibaba/weex-ui/issues/216)。
