<template>
<div>
    <WxcSwipeAction @onNodeClick='onTest' :data='data'/>
</div>
</template>

<script>
import WxcSwipeAction from '../../index';
const modal = weex.requireModule("modal");

export default {
  data() {
    return {
      data: [
        {
          title: "标题1",
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
          title: "标题23",
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
        },
        {
          title: "标题3",
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
  components: {
    WxcSwipeAction
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

