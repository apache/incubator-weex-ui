# wxc-grid-select 

> Weex 网格形选择组件，支持单选、多选
  
## [Demo](https://h5.m.taobao.com/trip/wxc-grid-select/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-grid-select%2Fdemo%2Findex.native-min.js)

<img src="https://gw.alipayobjects.com/zos/rmsportal/KVPhzMhbGodSqBiRCEVQ.gif" width="240"><img src="https://gw.alipayobjects.com/zos/rmsportal/yJfbMufZVRJzKicHPQrn.png" width="180">

## 使用方法

```vue
<template>
  <wxc-grid-select
    :single="true"
    :cols="5"
    :customStyles="customStyles"
    :list="testData1"
    @select="params => onSelect('res3', params)">
  </wxc-grid-select>
  
  <wxc-grid-select
    :limit="5"
    :list="testData2"
    @overLimit="onOverLimit"
    @select="params => onSelect('res3', params)">
  </wxc-grid-select>
</template>
<script>
  import { WxcGridSelect } from 'weex-ui';
  export default {
    components: { WxcGridSelect },
    data: () => ({
      customStyles: {
        lineSpacing: '14px',
        width: '120px',
        height: '50px',
        icon: '',
        color: '#333333',
        checkedColor: '#ffffff',
        disabledColor: '#eeeeee',
        borderColor: '#666666',
        checkedBorderColor: '#ffb200',
        backgroundColor: '#ffffff',
        checkedBackgroundColor: '#ffb200'
      },
      testData1: [
        {
          'title': '上海'
        },
        {
          'title': '杭州',
          'checked': true
        },
        {
          'title': '北京'
        },
        {
          'title': '广州'
        },
        {
          'title': '深圳'
        },
        {
          'title': '南京'
        }
      ],
      testData2: [
        {
          'title': '上海'
        },
        {
          'title': '杭州',
          'checked': true
        },
        {
          'title': '北京',
          'checked': true
        },
        {
          'title': '广州'
        },
        {
          'title': '深圳'
        },
        {
          'title': '南京'
        }
      ]
    }),
    methods: {
      onSelect (res, {selectIndex, checked, checkedList}) {
        Vue.set(this, res, `本次选择的index：${selectIndex}\n是否选中：${checked ? '是' : '否'}\n选中列表：${checkedList.map(item => item.title).join(',')}`);
      },
      onOverLimit (limit) {
        modal.toast({
          message: `最多选择${limit}个`,
          duration: 0.8
        });
      }
    }
  }
</script>
```
更详细代码可以参考 [demo](https://github.com/alibaba/weex-ui/blob/master/example/grid-select/index.vue)

### Props

| Prop | Type | Required | Default | Description |
|-----|------|:-----:|--------|--------|
| list | `Array` | `Y`| `-` | 数据列表，可以动态更新 |
| list[{title}]| `String` | `N`|`''` | 标题 |
| list[{checked}]| `Boolean` |`N`| `false` | 是否选中 |
| list[{disabled}]| `Boolean` |`N`| `false` | 是否不可选中 |
| single | `Boolean` |`N`| `false` | 是否单选模式 |
| limit | `Number` | `N`|  `-` | 多选模式下选择数量限制，可以动态更新 |
| cols | `Number` | `Y`| `4` | 列数 |
| customStyles | `Object` |`N`| `{}` | 自定义样式 |
| customStyles{lineSpacing} | `String` | `N`|`12px` | 行间距 |
| customStyles{width} | `String` |`N`| `166px` | item的宽度 |
| customStyles{height} | `String` |`N`| `72px` | item的高度 |
| customStyles{color} | `String` |`N`| `#3d3d3d` | 正常状态文字色值 |
| customStyles{checkedColor} | `String` |`N`| `#3d3d3d` | 选中状态文字色值  |
| customStyles{disabledColor} | `String` |`N`| `#9b9b9b` | 不可选状态文字色值 |
| customStyles{borderColor} | `String` |`N`| `transparent` | 正常状态边框色值 |
| customStyles{checkedBorderColor} |`String` |`N`|  `#ffb200` | 选中状态边框色值 |
| customStyles{disabledBorderColor} | `String` | `N`|`transparent` | 不可选状态边框色值 |
| customStyles{backgroundColor} | `String` | `N`|`#f6f6f6` | 正常状态背景色值 |
| customStyles{checkedBackgroundColor} | `String` |`N`| `#ffffff` | 选中状态背景色值 |
| customStyles{disabledBackgroundColor} | `String` | `N`|`#f6f6f6` | 不可选状态背景色值 |
| customStyles{icon} | `String` | `N`| `x` | 选中状态icon，base64或url，传空则不显示 |


### Events
`select`
- 描述: 监听选择事件
- 参数: 
    ```json
    {
      selectIndex:本次选择的index
      checked:是否选中
      checkedList:选中列表
    }
    ```
- 示例:
    ```vue
    <wxc-grid-select @select="onSelect"></wxc-grid-select>
    ```
  
`overLimit`
- 描述: 监听选择数量溢出事件
- 参数: 
    ```
    arg1: 限制的选择数量
    ```
- 示例:
    ```
    <wxc-grid-select @overLimit="onOverLimit"></wxc-grid-select>
    ```
