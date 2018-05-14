# Utils

> Util function services

!>In `weex-ui` V0.6.0 version above, in order to reduce packaging size, `Binding related judgments` are transferred from `Utils.env` to `BindEnv`.

## Rule
<img src="https://img.alicdn.com/tfs/TB1t2Y7nN9YBuNjy0FfXXXIsVXa-2952-1096.png" width="860"/>

## Code Example

```vue
<script>
  import { Utils } from 'weex-ui';
  // Utils.env.getPageHeight();
  // 如果想使用 bind 相关判断
  // import { BindEnv } from 'weex-ui';
</script>
```

More details can be found in [here](https://github.com/alibaba/weex-ui/blob/master/packages/utils)
