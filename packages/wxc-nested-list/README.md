# wxc-nested-list

## Effect

<img src="http://cdn.emas-poc.com/material/weex/4dml3-hnzk7.gif" width="240"/>&nbsp;&nbsp;&nbsp;&nbsp;<img src="http://cdn.emas-poc.com/material/weex/weex-ui-z-1.jpg" width="160"/>

## Code Example

!> It is recommended that weex_sdk be updated to 0.20+.

```vue
<template>
  <list>
    <header>
      <image style="width:750px;height:350px" src="https://gw.alicdn.com/tfs/TB1SOyrSVXXXXb3XXXXXXXXXXXX-1000-667.jpg"></image>
      <div style="width:750px;height:350px;position:absolute;left:0;top:0;justify-content:center;align-items:center">
        <text style="font-size: 50px;color:#ffffff;">header</text>
      </div>
    </header>
    <cell>
      <WxcNestedList @onLoadmore='onLoadmore' :isResetLoadMore='true' :styles="{backgroundColor: 'red'}" @onListClick='onList'>
            <div class="cell"  v-for="(num, i) in [1,2,3,4,5,6]" :key="'wxc-nested-' + i">
                <div class="panel">
                  <text class="text">{{num}}</text>
                </div>
            </div>
      </WxcNestedList>
    </cell>
    
    <cell class="cell" v-for="num in lists" :key="num">
      <div class="panel">
        <text class="text">{{num}}</text>
      </div>
    </cell>
  </list>
  
</template>

<script>
import { WxcNestedList } from 'weex-ui'
const modal = weex.requireModule("modal");

export default {
  components: {
    WxcNestedList
  },
  data() {
    return {
      lists: ["A", "B", "C", "D", "E", "F"],
    };
  },
  methods: {
    onList() {
      modal.toast({
        message: "触发单击",
        duration: 0.3
      });
    },
    onLoadmore() {
      modal.toast({
        message: "触发刷新",
        duration: 0.3
      });
    },
  }
};
</script>

<style scoped>
.header {
  height: 200px;
  width: 750px;
  background-color: blue;
  color: white;
}

.panel {
  width: 750px;
  height: 200px;
  flex-direction: column;
  justify-content: center;
  border-width: 2px;
  border-style: solid;
  border-color: rgb(162, 217, 192);
  background-color: rgba(162, 217, 192, 0.2);
}
.text {
  font-size: 88px;
  text-align: center;
  color: #41b883;
}
</style>
```

more detailed code can refer to [here](https://github.com/alibaba/weex-ui/blob/master/example/nested-list/index.vue)

### API
| Prop | Type | Required | Default | Description |
| ---- |:----:|:---:|:-------:| :----------:|
| **`styles`** | `Object` | `N` | `-` | set style |
| **`isLevel`** | `Boolean` | `N` | `false` | whether to slide horizontally |
| **`isResetLoadMore`** | `Boolean` | `N` | `false` | whether to force a refresh |
| **`isPagingEnabled`** | `Boolean` | `N` | `false` | whether to press the pagination mode |

### Event

```
// scroll to bottom trigger	@onLoadmore='onLoadmore'
// click	@onListClick='onListClick'
// will trigger when touched on the touch surface	@onTouchstart='onTouchstart'
return e
// Will be triggered when the touch point moves on the touch surface	@onTouchmove='onTouchmove'
return e
// Will be triggered when leaving from the touch surface	@onTouchend='onTouchend'
return e
```