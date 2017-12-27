# wxc-city 

> General city select component, allow configuration input box, locate city, hot city, common city and so on.

## [Demo](https://h5.m.taobao.com/trip/wx-detection-demo/city/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwx-detection-demo%2Fcity%2Findex.weex.js)
<img src="https://img.alicdn.com/tfs/TB1tUfFkmYH8KJjSspdXXcRgVXa-562-1000.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1nj6FkmYH8KJjSspdXXcRgVXa-200-200.png" width="160"/>

## Code Example

```vue
<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <div class="btn" @click="showCity">
        <text class="btn-txt">City Select</text>
      </div>
      <div class="panel">
        <text v-if="currentCity" class="text">Current City: {{currentCity}}</text>
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

   //city data https://github.com/alibaba/weex-ui/blob/master/example/city/data.js 
  import sourceData from './data';
  import * as Util from 'weex-ui/packages/wxc-city/util';
  import { WxcCity } from 'weex-ui';

  export default {
    components: { WxcCity },
    data: () => ({
      currentCity: '',
      sourceData,
      onlyShowList: false,
      location: 'Positioning'
    }),
    created () {
      this.defaultSourceData = sourceData;
    },
    mounted () {
      // Analog positioning
      setTimeout(() => {
        this.location = 'Hangzhou';
      }, 500);
    },
    computed: {
      // City Data
      normalList () {
        return Util.getCities(this.sourceData.cities)
      },
      hotListConfig () {
        return {
          type: 'list',
          title: 'Hot',
          list: Util.getCities(this.sourceData.hotCity)
        }
      },
      cityLocationConfig () {
        return {
          type:'list',
          title: 'Location',
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
More details can be found in [here](https://github.com/alibaba/weex-ui/blob/master/example/city/index.vue)


#### API
| Prop | Type | Required | Default | Description |
| ---- |:----:|:---:|:-------:| :----------:|
| **`input-config`** | `Object` | `N` | `{}` | Search Input configuration (*1)|
| **`normal-list`** | `Array` | `Y` | `[]` | Common city list array configuration (*2) |
| **`hot-list-config`** | `Object` | `N` | `{}` | Hot city list configuration (*3) |
| **`city-location-config`** | `Object` | `N` | `{}` | Location city configuration (*4) |
| **`only-show-list`** | `Boolean` | `N` | `false` | Whether or not it is searching, only a search list |
| **`show-index`** | `Boolean` | `N` | `true` | Whether the right index item is displayed|
| **`city-height`** | `Number` | `N` | `0` | Custom City height, **non special business do not set up!**|

- *1：Search Input configuration：

    ```
    {
        autofocus: false,
        alwaysShowCancel: true,
        placeholder: 'Search'
      }
    ```
    
- *2：Common City list configuration, Detailed as CityList can be see in [data.js](https://github.com/alibaba/weex-ui/blob/master/example/city/data.js)
- *3：Hot city list configuration, Support for projects in the form of `group` or `list`, Detailed as hotCity can be see in [data.js](https://github.com/alibaba/weex-ui/blob/master/example/city/data.js)：

  ```
  {
    type: 'group',
    title: 'Hot',
    list: hotCity
  }
  ```
- *4：Location city configuration, detailed as follows：
 
  ```
  {
    type: 'group',
    title: '全部',
    list: [
      { name: `Location`, isLocation: true },
      { name: 'Total City', desc: 'Airport City' }
    ]
  }
  ```


### Event

```
// Cancel button callback
@wxcCityCanceled="cityCancel"
// City selection callback
@wxcCityItemSelected="citySelect"
// Enter the return callback
@wxcCityOnKeyUpEnter="cityOnKeyUpEnter"
// City input box input callback
@wxcCityOnInput="cityInputChange"
```
