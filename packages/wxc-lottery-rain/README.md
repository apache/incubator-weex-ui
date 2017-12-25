# wxc-lottery-rain
      
> Cat-Cat

### Rule
- Usually used in marketing campaigns, similar to cat-cat or groundhog.
- The element image and container style can be configured to match the current activity atmosphere.

## [Demo](https://h5.m.taobao.com/trip/wxc-lottery-rain/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-lottery-rain%2Fdemo%2Findex.native-min.js)
<img src="https://gw.alipayobjects.com/zos/rmsportal/LhUMuYgbZmUSAOezSTEV.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1MciTdwMPMeJjy1XbXXcwxVXa-200-200.png" width="160"/>

## Code Example

```vue
<template>
  <wxc-lottery-rain :config="config"
                    :pic-list="images"
                    ref="wxc-lottery-rain"
                    :wrap-style="wrapStyle"
                    @wxcLotteryRainCaught="wxcLotteryRainCaught"></wxc-lottery-rain>
</template>

<style scoped>

</style>

<script>
  import { WxcLotteryRain } from 'weex-ui';
  export default {
    components: { WxcLotteryRain },
    data: () => ({
      images: [
       'https://img.alicdn.com/tfs/TB1sZPlb5IRMeJjy0FbXXbnqXXa-241-206.png',
       'https://img.alicdn.com/tfs/TB1eCbwb3MPMeJjy1XcXXXpppXa-241-206.png',
       'https://img.alicdn.com/tfs/TB1rDTjb3MPMeJjy1XdXXasrXXa-241-206.png',
       'https://img.alicdn.com/tfs/TB1Nw2sb3MPMeJjy1XbXXcwxVXa-241-206.png',
       'https://img.alicdn.com/tfs/TB1hCbwb3MPMeJjy1XcXXXpppXa-241-206.png'
      ],
      config: {
        intervalTime: 450,
        hideAniTime: 300,
        showAniTime: 300,
        showTime: 450,
        randomTime: 300,
        width: 241,
        height: 206
      },
      wrapStyle: {
        backgroundColor: 'rgba(133, 11, 11, .7)'
      }
    }),
    methods: {
      wxcLotteryRainCaught (e) {
        // console.log(e.rainId)
      }
    }
  }
</script>

```

More details can be found in [here](https://github.com/alibaba/weex-ui/blob/master/example/lottery-rain/index.vue)


### API

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| pic-list | `Array` |`Y`| `[]` | a group of cat pictures|
| config | `Object` |`N`| `{}` |  [game config](https://github.com/alibaba/weex-ui/blob/master/packages/wxc-lottery-rain/libs/config.js) |
| wrap-style | `Object` |`N`| `{}` | wrap style |

### Caught Event

```
@wxcLotteryRainCaught="wxcLotteryRainCaught"
// will return id
```

### Destroy Event

When users leave the game, We need destroy the game
```
//<wxc-lottery-rain ref="wxc-lottery-rain"></wxc-lottery-rain>
this.$refs['wxc-lottery-rain'].destroy();
```
