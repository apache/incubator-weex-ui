## 搭配 weex-toolkit 使用 Weex Ui

### 安装前

安装前建议你的node版本是 >= 8.0, 推荐使用 [n](https://github.com/tj/n) 来进行版本管理，同时建议 npm 版本 >= 5

```
node -v
v8.2.1
npm --version
5.3.0
```
### 确保 [weex-toolkit](https://github.com/weexteam/weex-toolkit) 为新版本

> npm install -g weex-toolkit@latest

目前最新版本为：

> weex -v

```
   v1.1.0-beta.7
 - weexpack : v0.4.7-beta.26
 - weex-builder : v0.2.13-beta.4
 - weex-devtool : v0.3.2-beta.11
 - weex-previewer : v1.3.13-beta.13
 - toolkit-repair : v0.0.5
```

### 使用 weex-toolkit 创建一个项目

> weex create your_project

同时安装相关依赖

> npm i 

### 在项目中使用 Weex Ui

安装 weex-ui

>npm i weex-ui@latest -S

安装babel-preset-stage-0 和 babel-plugin-component 插件，前者用于babel编译，后者用于优化   weex-ui 包的组件引用

> npm i babel-plugin-component babel-preset-stage-0  -D

同时修改.babelrc如下

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

### 玩一玩 Weex Ui
修改 `src/index.vue` 进行测试

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

### 检测是否可以正常运行

启动一个web服务器

> npm run serve

可以看到如下：

<img src="https://img.alicdn.com/tfs/TB16db4hlTH8KJjy0FiXXcRsXXa-1920-1080.gif" width="400"/>

测试下 weex 编译单文件

> weex src/index.vue

<img src="https://img.alicdn.com/tfs/TB1QYEMhfDH8KJjy1XcXXcpdXXa-1672-824.png" width=400/>

测试下 Android 编译和打包

> weex platform add android
       
> weex run android

<img src="https://img.alicdn.com/tfs/TB1cqothcjI8KJjSsppXXXbyVXa-1620-892.png" width="400"/>    <img src="https://img.alicdn.com/tfs/TB1hq3xhgnH8KJjSspcXXb3QFXa-890-438.png" width="200" />


测试下 iOS 编译和打包

> weex platform add ios
       
> weex run ios

<img src="https://img.alicdn.com/tfs/TB1YdW2kvDH8KJjy1XcXXcpdXXa-2300-1156.png" width="600" />


### 更多
- [weex-ui-demo](https://github.com/tw93/weex-ui-demo)
