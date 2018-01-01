# wxc-grid-select 

> Grid selection component supports single and multiple choice
  
## [Demo](https://h5.m.taobao.com/trip/wxc-grid-select/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-grid-select%2Fdemo%2Findex.native-min.js)

<img src="https://gw.alipayobjects.com/zos/rmsportal/KVPhzMhbGodSqBiRCEVQ.gif" width="240"><img src="https://gw.alipayobjects.com/zos/rmsportal/yJfbMufZVRJzKicHPQrn.png" width="180">

## Code Example

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
          'title': 'shanghai'
        },
        {
          'title': 'hangzhou',
          'checked': true
        },
        {
          'title': 'beijing'
        },
        {
          'title': 'guangzhou'
        },
        {
          'title': 'shengzhen'
        },
        {
          'title': 'nanjin'
        }
      ],
      testData2: [
        {
          'title': 'shanghai'
        },
        {
          'title': 'hangzhou',
          'checked': true
        },
        {
          'title': 'beijing',
          'checked': true
        },
        {
          'title': 'guangzhou'
        },
        {
          'title': 'shengzhen'
        },
        {
          'title': 'nanjing'
        }
      ]
    }),
    methods: {
      onSelect (res, {selectIndex, checked, checkedList}) {
        Vue.set(this, res, `checked index：${selectIndex}：${checked ? 'yes' : 'no'}\n checked list：${checkedList.map(item => item.title).join(',')}`);
      },
      onOverLimit (limit) {
        modal.toast({
          message: `${limit}`,
          duration: 0.8
        });
      }
    }
  }
</script>
```
More details can be found in [here](https://github.com/alibaba/weex-ui/blob/master/example/grid-select/index.vue)

### Props

| Prop | Type | Required | Default | Description |
|-----|------|:-----:|--------|--------|
| list | `Array` | `Y`| `-` | config data list |
| list[{title}]| `String` | `N`|`''` | title |
| list[{checked}]| `Boolean` |`N`| `false` |  whether is checked |
| list[{disabled}]| `Boolean` |`N`| `false` | whether is been disabled |
| single | `Boolean` |`N`| `false` | whether is single choice |
| limit | `Number` | `N`|  `-` | maximum number of choices |
| cols | `Number` | `Y`| `4` | cols |
| customStyles | `Object` |`N`| `{}` | custom styles |
| customStyles{lineSpacing} | `String` | `N`|`12px` | lineSpacing |
| customStyles{width} | `String` |`N`| `166px` | item width |
| customStyles{height} | `String` |`N`| `72px` | item height |
| customStyles{color} | `String` |`N`| `#3d3d3d` | text color |
| customStyles{checkedColor} | `String` |`N`| `#3d3d3d` | checked text color |
| customStyles{disabledColor} | `String` |`N`| `#9b9b9b` | disabled text Color |
| customStyles{borderColor} | `String` |`N`| `transparent` | border color |
| customStyles{checkedBorderColor} |`String` |`N`|  `#ffb200` | checked border color |
| customStyles{disabledBorderColor} | `String` | `N`|`transparent` | disabled border color |
| customStyles{backgroundColor} | `String` | `N`|`#f6f6f6` | background color |
| customStyles{checkedBackgroundColor} | `String` |`N`| `#ffffff` | checked background color |
| customStyles{disabledBackgroundColor} | `String` | `N`|`#f6f6f6` | disabled background color |
| customStyles{icon} | `String` | `N`| `x` | icon when checked |


### Events
`select`
- data: 
    ```json
    {
      selectIndex:1
      checked: true
      checkedList:[1,2,3,4]
    }
    ```
- demo:
    ```vue
    <wxc-grid-select @select="onSelect"></wxc-grid-select>
    ```
  
`overLimit`
- data: 
    ```
    arg1: limit count
    ```
- demo:
    ```
    <wxc-grid-select @overLimit="onOverLimit"></wxc-grid-select>
    ```
