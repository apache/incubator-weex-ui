<!--
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
-->
<!-- Created by wjun94 on 19/05/14. -->

<template>
<div>
  <scroller class="wxc-demo">
    <title title="wxc-swipe-action"></title>
    <category title="使用案例"></category>
    <WxcSwipeAction @onNodeClick='onTest' :data='data'>
      <text class="text" slot-scope="val">{{val.val.item.title}}{{val.val.index}}</text>
    </WxcSwipeAction>
  </scroller>
</div>
</template>

<style>
.text {
  line-height: 90px;
  margin-left: 15px !important;
  margin-left: 15px;
}
</style>


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
                this.data.splice(1, 1)
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

