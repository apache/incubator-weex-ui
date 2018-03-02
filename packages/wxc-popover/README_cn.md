# wxc-popover 

 > 在点击控件或者某个区域后，浮出一个气泡菜单来做更多的操作。 同时设置了遮罩层，通过点击遮罩层的任一位置，进行退出。

### 规则
- 常用于拓展气泡按钮组
- 在指定坐标位置弹出气泡，点击遮罩层进行关闭
- 支持上、下、左、右四个方向
- 可自定义气泡和箭头具体位置

## 使用方法

```vue
<template>
  <div class="wxc-demo">
    <wxc-minibar @wxcMinibarRightButtonClicked="minibarRightButtonClick"
                 right-text="..."></wxc-minibar>
    <wxc-popover ref="wxc-popover"
                 :buttons="btns"
                 :position="popoverPosition"
                 :arrowPosition="popoverArrowPosition"
                 @wxcPopoverButtonClicked="popoverButtonClicked"></wxc-popover>
  </div>
</template>

<script>
  import { WxcMinibar, WxcPopover} from '../../index';

  const modal = weex.requireModule('modal');

  import { RETURN_ICON, SCAN_ICON, QRCODE_ICON, QUESTION_ICON } from './type';

  export default {
    components: { WxcMinibar, WxcPopover },
    data: () => ({
      leftButton: RETURN_ICON,
      btns:[
        {
         icon: SCAN_ICON,
         text:'Scan',
         key:'key-scan'
        },
        {
          icon: QRCODE_ICON,
          text:'My Qrcode',
          key:'key-qrcode'
        },
        {
          icon: QUESTION_ICON,
          text:'Help',
          key:'key-help'
        },
      ],
      popoverPosition:{x:-14,y:380},
      popoverArrowPosition:{pos:'top',x:-15}
    }),
    methods: {
      minibarRightButtonClick () {
        this.$refs['wxc-popover'].wxcPopoverShow();
      },
      popoverButtonClicked (obj) {
        modal.toast({ 'message': `key:${obj.key}, index:${obj.index}`, 'duration': 1 });
      }
    }
  };
</script>
```

更详细代码可以参考 [demo](https://github.com/alibaba/weex-ui/blob/master/example/popover/index.vue)

### 可配置参数

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| buttons | `Array` |`Y`|`[]` | 气泡按钮数据列表，如 `[{icon: 'http://cdn.zwwill.com/weexui/icon/scan.png',text:'Help',key:'key-help'}]` |
| position | `Object` |`Y`|`{x:0,y:0}` | 气泡位置，x>0 为左边距，x<0 为右边距，y同理 |
| arrowPosition | `Object` |`Y`|`{pos:'top',x:0,y:0}` | 气泡箭头位置，pos 为'top|bottom|left|right'，配合x，y定位箭头位置  |
| coverColor | `String` |`N`|`rgba(0,0,0,0.4)`| 遮罩层颜色，如 `rgba(0,0,0,0.4)`，`rgb(0,0,0)`，`#000` |

### 调用显示

```
在wxc-popover上面绑定ref，然后调用this.$refs['wxc-popover'].hide();即可显示
```

### 事件回调

```
// `@wxcPopoverButtonClicked` 返回一个对象，标志点击按钮的 `key` 和 `index`
```
