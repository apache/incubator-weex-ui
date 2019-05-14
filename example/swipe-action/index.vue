<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by wjun94 on 19/05/14. -->

<template>
<div>
  <scroller class="wxc-demo">
    <title title="wxc-swipe-action"></title>
    <category title="使用案例"></category>
    <WxcSwipeAction @onNodeClick='onTest' :data='data'/>
  </scroller>
</div>
</template>

<script>
import { WxcSwipeAction } from "../../index";
const modal = weex.requireModule("modal");
import Title from "../_mods/title.vue";
import Category from "../_mods/category.vue";
import { setTitle } from '../_mods/set-nav';

export default {
  components: {
    Title,
    Category,
    WxcSwipeAction
  },
  data() {
    return {
      data: [
        {
          title: "点击右边按钮隐藏",
          autoClose: true,
          right: [
            {
              text: "置顶",
              onPress: function() {
                modal.toast({
                  message: "置顶",
                  duration: 0.3
                });
              }
            },
            {
              text: "删除",
              onPress: () => {
                modal.toast({
                  message: "删除",
                  duration: 0.3
                });
              },
              style: { backgroundColor: "#F4333C", color: "white" }
            }
          ]
        },
        {
          title: "默认效果",
          right: [
            {
              text: "删除",
              onPress: () => {
                modal.toast({
                  message: "删除",
                  duration: 0.3
                });
              },
              style: { backgroundColor: "#F4333C", color: "white" }
            }
          ]
        }
      ]
    };
  },
  created() {
    setTitle("SwipeAction");
  },
  methods: {
    onTest(node, i) {
      modal.toast({
        message: node.title,
        duration: 0.3
      });
    }
  }
};
</script>

