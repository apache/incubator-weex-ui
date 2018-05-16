<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by 南麓 on 2017/8/10. -->

<template>
  <div class="grid-select">
    <option
      v-for="(item, index) in dList"
      v-bind="Object.assign({}, customStyles, item)"
      :key="index"
      :index="index"
      :style="{marginTop: index >= cols ? lineSpacing : null}"
      @select="onSelect(index)"></option>

    <option
      v-for="(item, index) in cHackList"
      v-bind="Object.assign({}, customStyles, item)"
      :key="id + index"
      :style="{opacity: 0, marginTop: dList.length >= cols ? lineSpacing : null}"></option>
  </div>
</template>

<script>
  import Option from './option.vue';

  export default {
    components: { Option },
    props: {
      // 标识, 当界面展示多个grid, 防止v-for :key重复
      id: {
        type: String,
        default: 'one'
      },
      // 列数
      cols: {
        type: Number,
        default: 4
      },
      // 是否单选
      single: {
        type: Boolean,
        default: false
      },
      // 数据
      list: {
        type: Array,
        default: () => ([])
      },
      // 选择个数限制
      limit: {
        type: Number
      },
      // 用户自定义样式，用于个性化设置option样式
      customStyles: {
        type: Object,
        default: () => ({})
      }
    },
    data () {
      return {
        dList: this.initList()
      }
    },
    computed: {
      cHackList () {
        const { list, cols } = this;
        const remainder = list.length % cols;
        const len = remainder ? cols - remainder : 0;

        return Array.apply(null, { length: len });
      }
    },
    watch: {
      list () {
        this.dList = this.initList();
      }
    },
    created () {
      // 行间距
      this.lineSpacing = this.customStyles.lineSpacing || '12px';
    },
    methods: {
      onSelect (index) {
        const checked = this.dList[index].checked;
        if (this.limit <= this.checkedCount && !checked) {
          this.$emit('overLimit', this.limit);
        } else {
          this.updateList(index);
          this.$emit('select', {
            selectIndex: index,
            checked: !checked,
            checkedList: this.dList.filter(item => item.checked)
          });
        }
      },
      initList () {
        const single = this.single;
        let checkedCount = 0;

        const dList = this.list.map((item, i) => {
          let { checked, disabled } = item;
          disabled = !!disabled;
          // disabled为true时认为checked无效，同时单选模式下只认为第一个checked为true的为有效值
          checked = !disabled && !!checked && (!single || checkedCount === 0);
          if (item.checked) checkedCount += 1;
          return {
            ...item,
            checked,
            disabled
          }
        });

        this.checkedCount = checkedCount;
        return dList;
      },
      updateList (index) {
        const single = this.single;
        let checkedCount = 0;
        this.dList = this.dList.map((item, i) => {
          if (single) {
            item.checked = index === i && !item.checked;
          } else {
            if (i === index) item.checked = !item.checked;
          }
          if (item.checked) checkedCount += 1;
          return item;
        });
        this.checkedCount = checkedCount;
      }
    }
  };
</script>

<style scoped>
  .grid-select {
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  }
</style>
