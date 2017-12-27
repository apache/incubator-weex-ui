# wxc-city 

> 通用城市选择组件，允许配置输入框、定位、热门城市、普通城市列表等

## [Demo](https://h5.m.taobao.com/trip/wx-detection-demo/city/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwx-detection-demo%2Fcity%2Findex.weex.js)
<img src="https://img.alicdn.com/tfs/TB1tUfFkmYH8KJjSspdXXcRgVXa-562-1000.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1nj6FkmYH8KJjSspdXXcRgVXa-200-200.png" width="160"/>

## 使用方法

```vue
<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <div class="btn" @click="showCity">
        <text class="btn-txt">城市选择</text>
      </div>
      <div class="panel">
        <text v-if="currentCity" class="text">当前城市: {{currentCity}}</text>
      </div>
    </scroller>
    <wxc-city ref="wxcCity"
              :normal-list="normalList"
              :only-show-list="onlyShowList"
              :hot-list-config="hotListConfig"
              :city-location-config="cityLocationConfig"
              @wxcCityItemSelected="citySelect"
              @wxcCityOnInput="onInput"></wxc-city>
  </div>
</template>
<script>

   //城市数据 https://github.com/alibaba/weex-ui/blob/master/example/city/data.js 
  import sourceData from './data';
  import * as Util from 'weex-ui/packages/wxc-city/util';
  import { WxcCity } from 'weex-ui';

  export default {
    components: { WxcCity },
    data: () => ({
      currentCity: '',
      sourceData,
      onlyShowList: false,
      location: '定位中'
    }),
    created () {
      this.defaultSourceData = sourceData;
    },
    mounted () {
      // 模拟定位
      setTimeout(() => {
        this.location = '杭州';
      }, 500);
    },
    computed: {
      // 城市数据
      normalList () {
        return Util.getCities(this.sourceData.cities)
      },
      hotListConfig () {
        return {
          type: 'list',
          title: '热门',
          list: Util.getCities(this.sourceData.hotCity)
        }
      },
      cityLocationConfig () {
        return {
          type:'list',
          title: '定位',
          list: [
            { name: this.location, isLocation: true }
          ]
        }
      }
    },
    methods: {
      showCity () {
        this.$refs['wxcCity'].show();
      },
      citySelect (e) {
        this.currentCity = e.item;
      },
      onInput (e) {
        const { cities } = this.defaultSourceData;
        const { value } = e;
        if (value !== '' && cities && cities.length > 0) {
          const queryData = Util.query(cities, String(value).trim());
          this.sourceData = {
            cities: queryData,
            hotCity: []
          };
          this.onlyShowList = true;
        } else {
          this.sourceData = this.defaultSourceData;
          this.onlyShowList = false;
        }
      }
    }
  };
</script>
```
更详细代码可以参考 [demo](https://github.com/alibaba/weex-ui/blob/master/example/city/index.vue)


#### 可配置参数
| Prop | Type | Required | Default | Description |
| ---- |:----:|:---:|:-------:| :----------:|
| **`input-config`** | `Object` | `N` | `{}` | 城市选择输入框配置, 注1|
| **`normal-list`** | `Array` | `Y` | `[]` | 城市列表数组配置，注2 |
| **`hot-list-config`** | `Object` | `N` | `{}` | 热门城市配置，注3 |
| **`city-location-config`** | `Object` | `N` | `{}` | 定位城市配置，注4 |
| **`only-show-list`** | `Boolean` | `N` | `false` | 是否正在搜索，只显示搜索列表|
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
- 注2：城市列表数组配置，详细可见[data.js](https://github.com/alibaba/weex-ui/blob/master/example/city/data.js)
- 注3：热门城市配置，支持`group`和`list`形式的城市项目，hotCity的参考格式为[data.js](https://github.com/alibaba/weex-ui/blob/master/example/city/data.js),整体详细如下：

  ```
  {
    type: 'group',
    title: '热门',
    list: hotCity
  }
  ```
 - 注4：定位城市列表配置，详细如下：
 
  ```
  {
    type: 'group',
    title: '全部',
    list: [
      { name: `定位城市`, isLocation: true },
      { name: '全部城市', desc: '有机场城市' }
    ]
  }
  ```


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
