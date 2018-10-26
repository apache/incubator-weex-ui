# wxc-indexlist 

> An indexed list, can be navigated by index.

### Rule：
- Support to set up columns and group presentations.
- Basic component that`s often used in contact lists and city lists.
    
## [Demo](https://h5.m.taobao.com/trip/wxc-indexlist/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-indexlist%2Fdemo%2Findex.native-min.js)【group、list】
<img src="https://gw.alipayobjects.com/zos/rmsportal/MQBwOrcmQyMwUwPppoPo.gif" width="240"/>&nbsp;&nbsp;<img src="https://gw.alipayobjects.com/zos/rmsportal/USnVdDeDTNIkrMomOOpO.gif" width="240"/>&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1qK2USpXXXXbSXpXXXXXXXXXX-200-200.png" width="160"/>


## Code Example

```vue
<template>
  <div class="container">
    <wxc-indexlist :normal-list="list.normalList"
                   :hot-list-config="hotListConfig"
                   :city-location-config="cityLocationConfig"
                   @wxcIndexlistItemClicked="wxcIndexlistItemClicked"
                   :show-index="showIndex"></wxc-indexlist>
  </div>
</template>

<script>
  const modal = weex.requireModule('modal');
  import { WxcIndexlist } from 'weex-ui';
  import {datelist} from 'data.js'
  export default {
    components: { WxcIndexlist },
    data: () => ({
      list: dataList,
      showIndex: true,
      hotListConfig: {
        type: 'group',
        title: 'hot',
        list: dataList.hotList
      },
      cityLocationConfig: {
        type: 'group',
        title: 'location',
        list: [{ name: 'hangzhou', isLocation: true }]
      }
    }),
    methods: {
      wxcIndexlistItemClicked (e) {
        console.log(e)
      }
    }
  };
</script>
```

More details can be found in [here](https://github.com/alibaba/weex-ui/blob/master/example/indexlist/index.vue)

### API

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| list | `Array` |`Y`| `[]` |data list (*1)|
| hot-list-config | `Object` | `N`|`{}` | hot list (*2) |
| city-location-config | `Object` | `N`|`{}` | special、positioning configuration (*3) |
| show-index | `Boolean` |`N`| `true` |  whether to show index nav | 
| only-show-list | `Boolean` | `N`|`false` |  whether to only show list *4) |
| nav-style | `Object` |`N`| `{}` |  index sidebar custom style |
| need-animation | `Boolean` |`N`| `true` | whether to need index nav animation|

- *1：The configuration items of the normal list, Detailed data format: [demo/data.js#L16](https://github.com/alibaba/weex-ui/blob/master/example/indexlist/data.js#L16)
- *2：Some index list need in front of the normal list shows a list of popular form ,Support `group`,`list` type, Detailed data format: [demo/data.js#L2](https://github.com/alibaba/weex-ui/blob/master/example/indexlist/data.js#L2): 

   ```json
   hotListConfig: {
           type: 'group',
           title: 'hot',
           list: dataList.hotList
         }
   ```
   
- *3：Added a `city-location-config` for setting location city.

   ```json
   cityLocationConfig: {
           type: 'group',
           title: 'location',
           list: [{ name: 'hangzhou', isLocation: true }]
         }
   ```
- *4：Whether to only display list items, remove location, hot display, often used for search results display.

### Slot

`<slot name="head"></slot>`: A custom slot can be inserted at the beginning of the list, and `nav-style` can be introduced to compatible the styles.

```
<wxc-indexlist :normal-list="list.normalList"
                   :hot-list-config="hotListConfig"
                   :city-location-config="cityLocationConfig"
                   :show-index="showIndex"
                   @wxcIndexlistItemClicked="wxcIndexlistItemClicked">
                <div slot="head"><text>aaaaaa</text></div>       
</wxc-indexlist>
```
<img src="https://img.alicdn.com/tfs/TB1YhUjj9_I8KJjy0FoXXaFnVXa-818-276.jpg" width="240"/>

### Event

```
`@wxcIndexlistItemClicked="wxcIndexlistItemClicked"`
```

### Completely custom style
- If the above default styles do not meet the requirements, you can cover the original style by passing the corresponding parameters.

<img src="https://img.alicdn.com/tfs/TB13DEPn8TH8KJjy0FiXXcRsXXa-776-1370.jpg" width="300"/>

