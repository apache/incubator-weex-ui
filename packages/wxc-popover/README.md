# wxc-popover

 > After clicking on a control or an area, a Popover menu appears for doing more. 

### Rule

- Often used to expand the bubble button group.
- Pop the bubble in the specified coordinate position and click the mask layer to close.
- Support top, bottom, left and right directions.
- Customizable bubble and arrow location.

## [Demo](https://h5.m.taobao.com/trip/wx-detection-demo/popover/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwx-detection-demo%2Fpopover%2Findex.weex.js)

<img src="https://gw.alipayobjects.com/zos/rmsportal/KneBnrpzaJFfbdsDbMli.gif" width="240"/> &nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB19m1fcrGYBuNjy0FoXXciBFXa-200-200.png" width="160"/>


## Code Example

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
  import { WxcMinibar, WxcPopover} from 'weex-ui';

  const modal = weex.requireModule('modal');

  // https://github.com/alibaba/weex-ui/blob/master/example/popover/type.js
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

More details can be found in [here](https://github.com/alibaba/weex-ui/blob/master/example/popover/index.vue)

### API

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| buttons | `Array` |`Y`|`[]` | buttons data,  |
| position | `Object` |`Y`|`{x:0,y:0}` | Bubble position, x>0 meaning the distance to the left, x<0 to right, and y is the same. |
| arrowPosition | `Object` |`Y`|`{pos:'top',x:0,y:0}` | Bubble arrow position，pos could be'top,bottom,left,right'  |
| coverColor | `String` |`N`|`rgba(0,0,0,0.4)`| Mask layer color, e.g `rgba(0,0,0,0.4)`，`rgb(0,0,0)`，`#000` |
| hasAnimation | `Boolean` |`N`| `true` | whether to animate  |

### Manual Show

```
<!-- <wxc-popup ref="wxc-popover"></wxc-popup> -->
this.$refs['wxc-popover'].wxcPopoverShow();
```

### Event

```
// `@wxcPopoverButtonClicked` return an object with `key` and `index`
```
