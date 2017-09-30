# wxc-button

> Weex 按钮组件，支持 4 种基本类型 button，可自定义样式，支持不可点击

-----

## [Demo预览](https://h5.m.taobao.com/trip/wxc-button/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-button%2Fdemo%2Findex.native-min.js)

<img src="http://gtms02.alicdn.com/tfs/TB1ZivISXXXXXbiXXXXXXXXXXXX-750-1334.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="http://gtms04.alicdn.com/tfs/TB1e69sSpXXXXclXXXXXXXXXXXX-200-200.png" width="160"/>


## 安装

```
tnpm i @ali/wxc-button --save
```

## 使用方法

```
<template>
  <wxc-button title="确定"
              type="fliggy"
              @wxcButtonClicked="wxcButtonClicked"></wxc-button>
</template>

<script>
  import { wxcButton } from 'weex-ui'
  export default {
    components: { wxcButton},
    methods: {
      wxcButtonClicked (e) {
        console.log(e)
      }
    }
  }
</script>
```


### 可配置参数
| Prop | Type | Required | Default | Description |
| ---- |:----:|:---:|:-------:| :----------:|
| **`text`** | `string` | `Y` | `` | 展现的文字， 不考虑其他情况类型的元素 |
| **`type`** | `enum` | `N` | `taobao` | 四种基本类型：'taobao', 'fliggy', 'normal', 'highlight' |
| **`disabled`** | `bool` | `N` | `false` | 是否 disabled（注1） |
| **`btnStyle`** | `object` | `N` | `{}` | 按钮的样式对象（注2） |
| **`textStyle`** | `object` | `N` | `{}` | 文字的样式对象（注3） |

* 注1：disabled 样式会覆盖掉默认样式
* 注2：对默认按钮样式的覆盖全部依赖btnStyle进行，详细样式可以参考【type.js】
* 注2：对默认字体样式的覆盖全部依赖textStyle进行，详细样式可以参考【type.js】

### 事件回调
```
//点击事件回调  `v-on:wxcButtonClicked="wxcButtonClicked"`
将会返回 e, type, disabled
```

## 版本历史

### [0.1.0]
- [+] button的第一个版本，按照蜂鸟视觉规范编写
- [+] 贡献到market版本，修改对应配置
- [+] 支持四种基本样式，支持设置不可用，支持样式覆盖
