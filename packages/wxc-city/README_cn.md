# wxc-city 

> 通用城市选择组件，允许配置输入框、定位、热门城市、普通城市列表等

## [Demo](https://h5.m.taobao.com/trip/wx-detection-demo/city/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwx-detection-demo%2Fcity%2Findex.weex.js)
<img src="https://img.alicdn.com/tfs/TB1tUfFkmYH8KJjSspdXXcRgVXa-562-1000.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1nj6FkmYH8KJjSspdXXcRgVXa-200-200.png" width="160"/>

`weex-ui >= 0.3.10`

## 使用方法

```vue
<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <div class="btn" @click="showListCity">
        <text class="btn-txt">城市选择</text>
      </div>
      <div class="panel">
        <text v-if="currentCity" class="text">当前城市: {{currentCity}}</text>
      </div>
    </scroller>
    <wxc-city ref="wxcCity"
              :currentLocation="location"
              :cityStyleType="cityStyleType"
              :sourceData="sourceData"
              @wxcCityItemSelected="citySelect"
              @wxcCityOnInput="onInput"></wxc-city>
  </div>
</template>
<script>
   // 若无特殊干掉data.js 直接使用默认的即可
  import sourceData from './data';
  import { WxcCity } from 'weex-ui';
  export default {
    components: { WxcCity },
    data: () => ({
      currentCity: '',
      sourceData,
      cityStyleType:'list',
      location: '定位中'
    }),
    mounted () {
      // 模拟定位
      setTimeout(() => {
        this.location = '杭州';
      }, 500);
    },
    methods: {
      showListCity () {
        this.cityStyleType = 'list'
        this.$refs['wxcCity'].show();
      },
      showGroupCity () {
        this.cityStyleType = 'group'
        this.$refs['wxcCity'].show();
      },
      citySelect (e) {
        this.currentCity = e.item;
      },
      onInput (e) {
      }
    }
  };
</script>
```
更详细代码可以参考 [demo](https://github.com/alibaba/weex-ui/blob/master/example/city/index.vue)
注：默认示例加载的是手动配置的城市数据源参考data.js，为区分默认数据源以及手动设置的数据源特在手动配置的数据源中去掉了'北京'这个城市

#### 可配置参数
| Prop | Type | Required | Default | Description |
| ---- |:----:|:---:|:-------:| :----------:|
| **`input-config`** | `Object` | `N` | `{}` | 城市选择输入框配置, 注1|
| **`sourceData`** | `Dictionary` | `N` | `注：常规城市列表数据源` | 城市列表数组配置，注2 |
| **`cityStyleType`** | `String` | `N` | `list` | 城市列表样式的配置，注3 |
| **`currentLocation`** | `String` | `Y` | `` | 定位城市配置，注4 |
| **`show-index`** | `Boolean` | `N` | `true` | 是否显示右侧索引项|
| **`show-tab`** | `Boolean` | `N` | `false` | 是否需要显示国内、国外TAB|
| **`city-height`** | `Number` | `N` | `0` | 自定义城市高度，**非特殊业务不要设置！**|

- 注1：输入框配置，采用deep copy merge，可以设置输入框的如下：

    ```
    {
        autofocus: false,
        alwaysShowCancel: true,
        placeholder: '中文/拼音/首字母'
      }
    ```
- 注2：城市列表数组配置，详细可见[data.js](https://github.com/alibaba/weex-ui/blob/master/example/city/data.js),整体详细如下：

  ```
    {
        hotCity: [
            { cityName: '北京', pinYin: 'beijing', py: 'bj' }
        ],
        cities: [
            { cityName: '北京', pinYin: 'beijing', py: 'bj' }
        ]
    }
  ```
- 注3：城市列表样式的配置，支持`group`和`list`形式
- 注4：定位城市列表配置，如：杭州


### 事件回调
```
// 取消按钮回调
@wxcCityCanceled="cityCancel"
// 城市选择后回调
@wxcCityItemSelected="citySelect"
// 输入回车回调
@wxcCityOnKeyUpEnter="cityOnKeyUpEnter"
// 城市输入框输入回调
@wxcCityOnInput="cityInputChange"
```
