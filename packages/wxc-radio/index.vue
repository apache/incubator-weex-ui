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
<!-- Created by Tw93 on 16/10/28. -->
<!-- Updated by Tw93 on 17/01/06. -->

<template>
  <div>
    <wxc-radio v-for="(item,i) in updateList"
               :config="config"
               v-bind="item"
               @wxcRadioItemChecked="wxcRadioItemChecked(i,$event)"
               :key="i"></wxc-radio>
  </div>
</template>

<style scoped>

</style>

<script>
  import wxcRadio from './item.vue';

  export default {
    components: { wxcRadio },
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
      checkedIndex: -1
    }),
    computed: {
      updateList () {
        const { checkedIndex, list } = this;
        const updateList = [];
        list && list.forEach((item, i) => {
          item.checked = i === checkedIndex;
          updateList.push(item);
        });
        return updateList;
      }
    },
    watch: {
      list (newList, oldList) {
        if (JSON.stringify(newList) !== JSON.stringify(oldList.map(v => {
          const {title, value} = v
          return {title, value}
        }))) {
          this.checkedIndex = -1
        }
        this.setListChecked(newList);
      }
    },
    created () {
      this.setListChecked(this.list);
    },
    methods: {
      setListChecked(list){
        if (list && list.length > 0) {
          list.forEach((item, i) => {
            item.checked && (this.checkedIndex = i);
          });
        }
      },
      wxcRadioItemChecked (i, e) {
        const oldIndex = this.checkedIndex;
        const { value, title } = this.list[i];
        this.checkedIndex = i;
        this.$emit('wxcRadioListChecked', { value, title, oldIndex, index: i })
      }
    }
  }
</script>
