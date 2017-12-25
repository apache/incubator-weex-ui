# wxc-tag 

> Tag component supports `solid/hollow/special/image` types

## [Demo](https://h5.m.taobao.com/trip/wxc-tag/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-tag%2Fdemo%2Findex.native-min.js)
<img src="https://gw.alipayobjects.com/zos/rmsportal/hErVCTKqGcxNiyAmVWkp.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB11omrSXXXXXagXVXXXXXXXXXX-200-200.png" width="160"/>

## Code Example

```vue
<template>
  <div class="wrapper">
   <wxc-tag type="solid"
            tag-color="#ff5000"
            font-color="#ffffff"
            value="solid tag"></wxc-tag>
  </div>
</template>
<script>
  import { WxcTag } from 'weex-ui';
  export default {
    components: { WxcTag }
  };
</script>
```

- More details can be found in [here](https://github.com/alibaba/weex-ui/blob/master/example/tag/index.vue) and [demo/data.js](https://github.com/alibaba/weex-ui/blob/master/example/tag/data.js).


### API

| Prop | Type | Required | Default | Description |
| ---- |:----:|:---:|:-------:| :----------:|
| type | `String` | `N` | `solid` | tag style type(*1) |
| value | `String` | `Y` | `-` | tag text value |
| tag-color | `String` | `N` | `#ff5000` | tag warp color |
| font-color | `String` | `N` | `#ffffff` | tag text color |
| special-icon | `String` | `N` | `-` | special icon in the left |
| img | `String` | `N` | `-` | img src(*2) |

* *1: Supports `solid/hollow/'special/image`.
* *2: When the type is `image`, You need post a `img` param.
