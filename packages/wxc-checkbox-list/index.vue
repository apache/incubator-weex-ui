<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- just hack for babel-plugin-component !!!-->

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
  import WxcCheckbox from '../wxc-checkbox/index.vue';

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
