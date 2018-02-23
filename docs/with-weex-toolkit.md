## Use Weex Ui with weex-toolkit

### Before installing

Before installing, It`s recommended that your Node version >= 8.0, Also recommended to use [n](https://github.com/tj/n) for version management, while suggesting NPM version >= 5

How to see

```
node -v
v8.2.1
npm --version
5.3.0
```

### Make sure [weex-toolkit](https://github.com/weexteam/weex-toolkit) is the latest

> npm install -g weex-toolkit@latest

How to see

> weex -v

```
   v1.1.0-beta.7
 - weexpack : v0.4.7-beta.26
 - weex-builder : v0.2.13-beta.4
 - weex-devtool : v0.3.2-beta.11
 - weex-previewer : v1.3.13-beta.13
 - toolkit-repair : v0.0.5
```

### Using weex-toolkit create a project

> weex create your_project

and install the dependencies

> npm i 

### Using Weex Ui

install weex-ui

>npm i weex-ui@latest -S

Please add 'babel-preset-stage-0' and 'babel-plugin-component' to .babelrc

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

### Weex Ui Demo
Edit `src/index.vue` like this

```vue
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

### Running

Start a Web server at 8080 port

> npm run serve

<img src="https://img.alicdn.com/tfs/TB16db4hlTH8KJjy0FiXXcRsXXa-1920-1080.gif" width="400"/>

Preview a vue file using Weex HTML5 renderer

> weex src/index.vue

<img src="https://img.alicdn.com/tfs/TB1QYEMhfDH8KJjy1XcXXcpdXXa-1672-824.png" width=400/>

Add a weex platform of Android and run commands for testing

> weex platform add android
   
> weex run android

<img src="https://img.alicdn.com/tfs/TB1cqothcjI8KJjSsppXXXbyVXa-1620-892.png" width="400"/>    <img src="https://img.alicdn.com/tfs/TB1hq3xhgnH8KJjSspcXXb3QFXa-890-438.png" width="200" />

Add a weex platform of iOS and run commands for testing

> weex platform add ios
       
> weex run ios

<img src="https://img.alicdn.com/tfs/TB1YdW2kvDH8KJjy1XcXXcpdXXa-2300-1156.png" width="600" />

### More Demo
- [weex-ui-demo](https://github.com/tw93/weex-ui-demo)
