# wxc-ep-slider 

!> 这个富交互体验组件依赖于 [BindingX](https://alibaba.github.io/bindingx/) 特性，使用前请确定你的App [是否安装](https://github.com/alibaba/bindingx#installation)

 > Weex Binding 效果的 slider 组件

### 规则
- 用于丰富 slide，包括商品橱窗，图片列表等 
- **假如子组件有点击事件，在 Android 由于 [此约束](http://weex-project.io/cn/references/gesture.html#约束)，目前需要在子元素里面绑定对应事件，Weex Ui 提供了 [wxc-pan-cell](https://github.com/alibaba/weex-ui/tree/master/packages/wxc-pan-item) 包裹器来解决此情况，具体可参考 [demo](https://github.com/alibaba/weex-ui/tree/master/example/ep-slider)**
- 支持滑到最右时候显示加载更多和事件回调，需要传入 `pull-more` slot，详细可见 demo

## [Demo](https://h5.m.taobao.com/trip/wx-detection-demo/ep-slider/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwx-detection-demo%2Fep-slider%2Findex.weex.js)
<img src="https://gw.alipayobjects.com/zos/rmsportal/lWWUuRBxjMdLCaJGVHsp.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<https://img.alicdn.com/tfs/TB1dzqbcuuSBuNjSsplXXbe8pXa-200-200.png" width="160"/>

## 使用方法

```vue
<template>
  <div class="wrapper">
    <wxc-ep-slider :slider-id="sliderId"
                   :card-length='cardLength'
                   :card-s="cardSize"
                   :select-index="2"
                   @wxcEpSliderCurrentIndexSelected="wxcEpSliderCurrentIndexSelected">

      <!--自动生成demo-->
      <div v-for="(v,index) in [1,2,3,4,5]"
           :key="index"
           :slot="`card${index}_${sliderId}`"
           :class="['slider',`slider${index}`]">
        <text>这里是第{{index + 1}}个滑块</text>
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

更多详细情况可以参考 [demo](https://github.com/alibaba/weex-ui/blob/master/example/ep-slider/index.vue)

### 可配置参数

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| slider-id | `Number` |`Y`| `1` | slider的id，避免页面多个ep-slider导致获取错误|
| card-length | `Number` |`Y`| `1` |  slider中item的数量|
| select-index | `Number` |`N`| `0` | 默认突出item的index|
| container-s | `Object` |`Y`| `{position: 'relative',width: 750,height: 352}` |  包裹容器的样式|
| card-s | `Object` | `Y`|`{width: 360,height: 300,spacing: 0,scale: 0.75}` | item容器的样式|
| auto-play | `Boolean` | `N`|`false` |是否需要自动播放|
| interval | `Number` | `N`|`1200` |自动播放时候的间隔|

### 渲染滑到最右时候的加载更多
```
// 样式需要自己根据个数和长度计算，详细参考 [demo](https://github.com/alibaba/weex-ui/blob/master/example/ep-slider/index.vue) 代码
<div class="more-slider" 
     slot="pull-more" 
     :style="{left: `${cardLength * (cardSize.width + cardSize.spacing)+60}px`,marginLeft:`${(750 - cardSize.width) / 2}px`}">
      <text>加载更多</text>
</div>
```

### API说明

### 主动触发设置

```
// 直接在wxc-ep-slider组件上面绑定ref="wxc-ep-slider",然后调用即可
// 譬如设置第二张
this.$refs['wxc-ep-slider'].manualSetPage(1); 
```

### Rebind

```
//ios下当放在list中，cell被回收后，导致下次appear的时候，手势失效了，需要再手动调用api，重新绑定下pan事件,同时注意 setTimeout 一下
// 直接在wxc-ep-slider组件上面绑定ref="wxc-ep-slider"
this.$refs['wxc-ep-slider'].rebind();
```

### 事件回调

```
//当前滑块被选中的回调
`@wxcEpSliderCurrentIndexSelected="wxcEpSliderCurrentIndexSelected"`
//滑到最右时候的事件回调
`@@wxcEpSliderPullMore="pullMore"`
```
