<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
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
      list (newList) {
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
