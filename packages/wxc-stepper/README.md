# wxc-stepper 

> 步进器：用作增加或者减少当前数值。

- 规则：常用于商品数量的小幅度修改。


## [Demo预览](https://h5.m.taobao.com/trip/wxc-stepper/index.html?_wx_tpl=http%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-stepper%2Fdemo%2Findex.native-min.js)
<img src="https://gw.alipayobjects.com/zos/rmsportal/zSfnSJkqwDiMCikZnOmo.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1ZuPISpXXXXbtXVXXXXXXXXXX-200-200.png" width="160"/>

## 使用方法

```vue
<template>
  <div class="wrapper">
    <div class="demo">
      <text class="text">无配置:</text>
      <wxc-stepper></wxc-stepper>
    </div>
    <div class="demo">
      <text class="text">{min:2,max:10,step:2,defaultValue:4}</text>
      <wxc-stepper default-value="4"
                   step="2"
                   max="10"
                   min="2"
                   @stepperValueChange="stepperValueChange"></wxc-stepper>
    </div>
    <div class="demo">
      <text class="text">禁用</text>
      <wxc-stepper default-value="4"
                   step="2"
                   max="10"
                   min="2"
                   :disabled="isDisabled"></wxc-stepper>
    </div>

    <div class="demo">
      <text class="text">input只读:</text>
      <wxc-stepper :read-only="isOnlyRead"></wxc-stepper>
    </div>
  </div>
</template>

<script>
  import { WxcStepper } from 'weex-ui';
  export default {
    components: { WxcStepper },
    data: () => ({
      value: 4,
      isDisabled: true,
      isOnlyRead: true
    }),
    methods: {
      stepperValueChange (e) {
        console.log(e.value);
      }
    }
  };
</script>
```

更详细代码可以参考 [demo](https://github.com/alibaba/weex-ui/blob/master/example/stepper/index.vue)


### 可配置参数

| 名称      | 类型     | 默认值   | 备注  |
|-------------|------------|--------|-----|
| default-value | `number` | 1 | 初始值|
| step | `number` | 1 | 步幅  |
| min | `number` | 1 | 范围（最小值） |
| max | `number` | 100 | 范围（最大值） |
| disabled | `bool` | false | 禁用计数器 |
| read-only | `bool` | false | 计数器input只可读 |


### 事件回调

```
// 可以通过`@wxcStepperValueChanged="wxcStepperValueChanged"`对计数器的值进行获取
// `wxcStepperValueIsMinOver`超过最小值的回调
// `wxcStepperValueIsMaxOver` 超过最大值的回调
```
