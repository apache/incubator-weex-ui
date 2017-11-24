# wxc-ep-slider 

 > Weex vue 版本的表达式绑定效果的slider组件
 
 - 背景：由于官方原生slider-neighbor体验和效果不是很好，但是此场景对于品质感交互又很有必要，所以通过expressionBinding尝试写一个ep-slider，欢迎提PR
 - 规则：
    - 用于丰富slide，包括商品橱窗，图片列表等 
    - 目前已经支持Ios、Android、H5的展示，同时支持自动播放。
    - **假如子组件有点击事件，在Android由于[此约束](http://weex-project.io/cn/references/gesture.html#约束)，目前需要在子元素里面绑定对应事件，我这边提供了一个[wxc-pan-cell](https://github.com/alibaba/weex-ui/tree/master/packages/wxc-pan-item)包裹器来解决此情况，具体使用可以参考[demo](https://github.com/alibaba/weex-ui/tree/master/example/ep-slider)**

## [Demo预览](https://h5.m.taobao.com/trip/wxc-ep-slider/index.html?_wx_tpl=https%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-ep-slider%2Fdemo%2Findex.native-min.js)
<img src="https://gw.alipayobjects.com/zos/rmsportal/lWWUuRBxjMdLCaJGVHsp.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1Ky4QSpXXXXbRapXXXXXXXXXX-200-200.png" width="160"/>

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

| 名称      | 类型     | 默认值   | 备注  |
|-------------|------------|--------|-----|
| slider-id | `Number` | `1` | slider的id，避免页面多个ep-slider导致获取错误|
| card-length | `Number` | `1` |  slider中item的数量|
| select-index | `Number` | `0` | 默认突出item的index|
| enable-swipe | `Boolean` | `true` | 是否需要滑动效果|
| container-s | `Object` | {position: 'relative',width: 750,height: 352,overflow: 'hidden'} |  包裹容器的样式|
| card-s | `Object` | {width: 360,height: 300,spacing: 0,scale: 0.75}} | item容器的样式|
| auto-play | `Boolean` | `false` |是否需要自动播放|
| interval | `Number` | 1200 |自动播放时候的间隔|

### API说明

```
//ios下当放在list中，cell被回收后，导致下次appear的时候，手势失效了，需要再手动调用api，重新绑定下pan事件
// 直接在wxc-ep-slider组件上面绑定ref="wxc-ep-slider"
this.$refs['wxc-ep-slider'].rebind();
```

### 主动触发设置

```
// 直接在wxc-ep-slider组件上面绑定ref="wxc-ep-slider",然后调用即可
// 譬如设置第二张
this.$refs['wxc-ep-slider'].manualSetPage(1); 
```

### 事件回调

```
//当前滑块被选中的回调
`v-on:wxcEpSliderCurrentIndexSelected="wxcEpSliderCurrentIndexSelected"`
```
