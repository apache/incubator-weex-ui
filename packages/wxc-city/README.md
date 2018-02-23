# wxc-city 

> General city select component, allow configuration input box, locate city, hot city, common city and so on.

## [Demo](https://h5.m.taobao.com/trip/wx-detection-demo/city/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwx-detection-demo%2Fcity%2Findex.weex.js)
<img src="https://img.alicdn.com/tfs/TB1tUfFkmYH8KJjSspdXXcRgVXa-562-1000.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1nj6FkmYH8KJjSspdXXcRgVXa-200-200.png" width="160"/>

`weex-ui >= 0.3.10`

## Code Example

```vue
<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <div class="btn" @click="showListCity">
        <text class="btn-txt">City Select</text>
      </div>
      <div class="panel">
        <text v-if="currentCity" class="text">Current City: {{currentCity}}</text>
      </div>
    </scroller>
    <wxc-city ref="wxcCity"
              :animationType="animationType"
              :currentLocation="location"
              :cityStyleType="cityStyleType"
              @wxcCityItemSelected="citySelect"
              @wxcCityOnInput="onInput"></wxc-city>
  </div>
</template>
<script>
   // Delete the data source configuration and use the default data.
  import { WxcCity } from 'weex-ui';
  export default {
    components: { WxcCity },
    data: () => ({
      animationType: 'push',
      currentCity: '',
      cityStyleType:'list',
      location: 'Positioning'
    }),
    mounted () {
      // Analog positioning
      setTimeout(() => {
        this.location = 'Hangzhou';
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
More details can be found in [here](https://github.com/alibaba/weex-ui/blob/master/example/city/index.vue)


#### API
| Prop | Type | Required | Default | Description |
| ---- |:----:|:---:|:-------:| :----------:|
| **`input-config`** | `Object` | `N` | `{}` | Search Input configuration (*1)|
| **`sourceData`** | `Object` | `N` | `Default China City data` | City data configuration (*2) |
| **`cityStyleType`** | `String` | `N` | `list` | Style configuration (*3) |
| **`currentLocation`** | `String` | `Y` | `` | Location of the city configuration (*4) |
| **`show-index`** | `Boolean` | `N` | `true` | Whether the right index item is displayed|
| **`city-height`** | `Number` | `N` | `0` | Custom City height, **non special business do not set up!**|
| **`animationType`** | `String` | `N` | `push` | Support model or push type|

- *1：Search Input configuration：

    ```
    {
        autofocus: false,
        alwaysShowCancel: true,
        placeholder: 'Search'
      }
    ```
- *2：City data configuration，Detailed as CityList can be see in [data.js](https://github.com/alibaba/weex-ui/blob/master/example/city/data.js)
 
  ```example
    {
        hotCity: [
            { cityName: '北京', pinYin: 'beijing', py: 'bj' }
        ],
        cities: [
            { cityName: '北京', pinYin: 'beijing', py: 'bj' }
        ]
    }
  ```
- *3：Style configuration，type：`group`，`list`
- *4：Location of the city configuration，example：Hangzhou


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
