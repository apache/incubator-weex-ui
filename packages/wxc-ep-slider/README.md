# wxc-ep-slider 

 > Binding Slider

!> These rich interaction components are based on [BindingX](https://alibaba.github.io/bindingx/) feature. Make sure your app [install it](https://github.com/alibaba/bindingx#installation).

### Rule
- Used to enrich slide, including merchandise window, picture list, etc.
- If the child element has click event, **because of the [reason](http://weex-project.io/cn/references/gesture.html#约束) in android**, You now need to bind the expression event in child element, Weex Ui has provided [wxc-pan-cell](https://github.com/alibaba/weex-ui/tree/master/packages/wxc-pan-item) to solve this issue, you can see more in [here](https://github.com/alibaba/weex-ui/tree/master/example/ep-slider).

## [Demo](https://h5.m.taobao.com/trip/wx-detection-demo/ep-slider/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwx-detection-demo%2Fep-slider%2Findex.weex.js)
<img src="https://gw.alipayobjects.com/zos/rmsportal/lWWUuRBxjMdLCaJGVHsp.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<https://img.alicdn.com/tfs/TB1dzqbcuuSBuNjSsplXXbe8pXa-200-200.png" width="160"/>

## Code Example

```vue
<template>
  <div class="wrapper">
    <wxc-ep-slider :slider-id="sliderId"
                   :card-length='cardLength'
                   :card-s="cardSize"
                   :select-index="2"
                   @wxcEpSliderCurrentIndexSelected="wxcEpSliderCurrentIndexSelected">

      <!--demo-->
      <div v-for="(v,index) in [1,2,3,4,5]"
           :key="index"
           :slot="`card${index}_${sliderId}`"
           :class="['slider',`slider${index}`]">
        <text>this is the {{index + 1}} slider</text>
      </div>
    </wxc-ep-slider>
  </div>
</template>

<style scoped>
  .wrapper {
    padding-top: 100px;
  }

  .slider {
    width: 400px;
    height: 300px;
    background-color: #C3413D;
    align-items: center;
    justify-content: center;
  }

  .slider1 {
    background-color: #635147;
  }

  .slider2 {
    background-color: #FFC302;
  }

  .slider3 {
    background-color: #FF9090;
  }

  .slider4 {
    background-color: #546E7A;
  }
</style>

<script>
  import { WxcEpSlider } from 'weex-ui';

  export default {
    components: { WxcEpSlider },
    data: () => ({
      sliderId: 1,
      cardLength: 5,
      cardSize: {
        width: 400,
        height: 300,
        spacing: 0,
        scale: 0.8
      }
    }),
    methods: {
      wxcEpSliderCurrentIndexSelected (e) {
        const index = e.currentIndex;
        console.log(index);
      }
    }
  }
</script>
```

More details can be found in [here](https://github.com/alibaba/weex-ui/blob/master/example/ep-slider/index.vue)

### API

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| slider-id | `Number` |`Y`| `1` | slider id|
| card-length | `Number` |`Y`| `1` |  count of slider items|
| select-index | `Number` |`N`| `0` | default card |
| container-s | `Object` |`Y`| `{position: 'relative',width: 750,height: 352}` | container style|
| card-s | `Object` | `Y`|`{width: 360,height: 300,spacing: 0,scale: 0.75}` | card style|
| auto-play | `Boolean` | `N`|`false` |whether is auto-play|
| interval | `Number` | `N`|`1200` |interval of auto-play|

### More

### Manually setting page

```
// <wxc-ep-slider ref="wxc-ep-slider"></wxc-ep-slider
this.$refs['wxc-ep-slider'].manualSetPage(1); 
```

### Rebind

```
// <wxc-ep-slider ref="wxc-ep-slider"></wxc-ep-slider
this.$refs['wxc-ep-slider'].rebind(); 
```

### Event

```
// @wxcEpSliderCurrentIndexSelected="wxcEpSliderCurrentIndexSelected"
```
