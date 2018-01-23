# wxc-indexlist 

> Weex 索引列表组件, 可以通过索引快速定位

### 规则：
- 支持成组、成列显示
- 常用于联系人列表、城市列表的基础组件
    
## [Demo](https://h5.m.taobao.com/trip/wxc-indexlist/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-indexlist%2Fdemo%2Findex.native-min.js)【group、list】
<img src="https://gw.alipayobjects.com/zos/rmsportal/MQBwOrcmQyMwUwPppoPo.gif" width="240"/>&nbsp;&nbsp;<img src="https://gw.alipayobjects.com/zos/rmsportal/USnVdDeDTNIkrMomOOpO.gif" width="240"/>&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1qK2USpXXXXbSXpXXXXXXXXXX-200-200.png" width="160"/>


## 使用方法

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
        title: '热门',
        list: dataList.hotList
      },
      cityLocationConfig: {
        type: 'group',
        title: '定位',
        list: [{ name: '杭州', isLocation: true }]
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

更详细代码可以参考 [demo](https://github.com/alibaba/weex-ui/blob/master/example/indexlist/index.vue)

### 可配置参数

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| list | `Array` |`Y`| `[]` | 索引列表的数据项 (注1)|
| hot-list-config | `Object` | `N`|`{}` | 热门列表项目配置 (注2) |
| city-location-config | `Object` | `N`|`{}` | 特殊、城市定位逻辑配置 (注3) |
| show-index | `Boolean` |`N`| `true` |  是否显示索引 |
| only-show-list | `Boolean` | `N`|`false` |  是否只显示列表 (注4) |
| nav-style | `Object` |`N`| `{}` |  索引侧边栏样式自定义 |

- 注1：正常列表的配置项目，采用list的形式展示，详细可见 [demo/data.js#L16](https://github.com/alibaba/weex-ui/blob/master/example/indexlist/data.js#L16)
- 注2：有些索引列表需要在正常列表前面展示一个`热门`列表，同时支持`group`、`list`形式，格式可见[demo/data.js#L2](https://github.com/alibaba/weex-ui/blob/master/example/indexlist/data.js#L2)，整体配置为

   ```json
   hotListConfig: {
           type: 'group',
           title: '热门',
           list: dataList.hotList
         }
   ```
- 注3：特殊的城市列表需要展示定位逻辑，此处新增city-location-config配置，其他列表不需要配置，数据格式为，如果需要显示定位icon，传入isLocation

   ```json
   cityLocationConfig: {
           type: 'group',
           title: '定位',
           list: [{ name: '杭州', isLocation: true }]
         }
   ```
- 注4：是否只显示列表项目，去除定位、热门显示，常用于搜索结果的显示

### Slot

`<slot name="head"></slot>`: 可以在列表最开头插入一个自定义 slot ，同时可以传入nav-style 来兼容样式

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

### 事件回调

```
`@wxcIndexlistItemClicked="wxcIndexlistItemClicked"`
```

### 完全自定义样式
- 假如上述默认样式不符合要求，可以通过传入相对应的参数来覆盖原有的样式

<img src="https://img.alicdn.com/tfs/TB13DEPn8TH8KJjy0FiXXcRsXXa-776-1370.jpgg" width="300"/>
