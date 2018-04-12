# Utils

> Weex Ui 中的公共函数服务

!> 在 `weex-ui` V0.6.0 版本以上，为了减少打包体积，Binding 相关判断由 `Utils.env ` 转移到 `BindEnv`

## 规则
<img src="https://img.alicdn.com/tfs/TB1KhdgfTtYBeNjy1XdXXXXyVXa-2932-940.png" width="860"/>

## 使用方法

```vue
<script>
  import { Utils } from 'weex-ui';
  // Utils.env.getPageHeight();
  // if you want to use bind utils
  // import { BindEnv } from 'weex-ui';
</script>
```
更详细代码可以参考 [utils](https://github.com/alibaba/weex-ui/blob/master/packages/utils)
