# wxc-stepper 

> Enter a number within certain range with the mouse or keyboard.

### Rule
- When a numeric value needs to be provided.


## [Demo](https://h5.m.taobao.com/trip/wxc-stepper/index.html?_wx_tpl=http%3A%2F%2Fh5.m.taobao.com%2Ftrip%2Fwxc-stepper%2Fdemo%2Findex.native-min.js)
<img src="https://gw.alipayobjects.com/zos/rmsportal/zSfnSJkqwDiMCikZnOmo.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://img.alicdn.com/tfs/TB1ZuPISpXXXXbtXVXXXXXXXXXX-200-200.png" width="160"/>

## Code Example

```vue
<template>
  <div class="wrapper">
    <div class="demo">
      <text class="text">no config:</text>
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
      <text class="text">disabled</text>
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

More details can be found in [here](https://github.com/alibaba/weex-ui/blob/master/example/stepper/index.vue)


### API

| Prop | Type | Required | Default | Description |
|-------------|------------|--------|-----|-----|
| default-value | `Number` |`N`| `1` | initial value|
| step | `Number` |`N`| `1` | step value |
| min | `Number` |`N`| `1` | min value |
| max | `Number` | `N`|`100` |max value |
| disabled | `Boolean` |`N`| `false` | disable the stepper |
| read-only | `Boolean` | `N`|`false` | disable the input |


### Event

```
@wxcStepperValueChanged="wxcStepperValueChanged"
@wxcStepperValueIsMinOver="wxcStepperValueIsMinOver"
@wxcStepperValueIsMaxOver="wxcStepperValueIsMaxOver"
```
