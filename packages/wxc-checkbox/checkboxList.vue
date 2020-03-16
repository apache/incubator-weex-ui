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
<!-- Created by Tw93 on 17/07/31. -->

<template>
  <div>
    <wxc-checkbox v-for="(item,i) in list"
                  v-bind="item"
                  :config="config"
                  @wxcCheckBoxItemChecked="wxcCheckBoxItemChecked"
                  :key="i"></wxc-checkbox>
  </div>
</template>

<script>
  import WxcCheckbox from './index.vue';

  export default {
    components: { WxcCheckbox },
    props: {
      list: {
        type: Array,
        default: () => ([])
      },
      config: {
        type: Object,
        default: () => ({})
      }
    },
    data: () => ({
      checkedList: []
    }),
    created () {
      const { list } = this;
      if (list && list.length > 0) {
        list.forEach((item, i) => {
          item.checked && this.checkedList.push(item.value);
        });
      }
    },
    methods: {
      wxcCheckBoxItemChecked (e) {
        if (e.checked) {
          this.checkedList.push(e.value);
        } else {
          const index = this.checkedList.indexOf(e.value);
          this.checkedList.splice(index, 1);
        }
        this.$emit('wxcCheckBoxListChecked', { checkedList: this.checkedList })
      }
    }
  }
</script>
