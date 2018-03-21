<template>
  <div>
    <div class="tab-box">
      <div class="tab-item"
           v-for="(name,i) in ['国内','国际']"
           :key="i"
           @click="switchTab(i)">
        <text class="['tab-item-text', i===checkedIndex && 'text-selected']">{{name}}</text>
      </div>
    </div>
    <div class="tab-item-selected-bar">
      <div class="tab-item-selected-bar-in"
           ref="tab-bar">
        <div class="tab-item-active"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .tab-box {
    width: 750px;
    flex-direction: row;
    justify-content: center;
  }

  .tab-item {
    flex: 1;
    height: 90px;
    background-color: #ffffff;
    align-items: center;
    justify-content: center;
  }

  .tab-item-text {
    text-align: center;
    color: #000000;
    font-size: 28px;
  }

  .text-selected {
    font-weight: bold;
  }

  .tab-item-selected-bar {
    width: 750px;
    background-color: #f2f3f4;
  }

  .tab-item-selected-bar-in {
    width: 375px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    height: 6px;
  }

  .tab-item-active {
    background-color: #ffb200;
    width: 92px;
    height: 6px;
  }
</style>

<script>
  export default {
    props: {},
    data: () => ({
      checkedIndex: 0
    }),
    methods: {
      switchTab (index) {
        const animation = weex.requireModule('animation');
        this.checkedIndex = index;
        this.$emit('wxcTabSwitch', {
          index
        });
        animation.transition(this.$refs['tab-bar'], {
          styles: {
            transform: `translateX(${index * 375}px)`
          },
          duration: 150, // ms
          timingFunction: 'ease',
          delay: 0 // ms
        }, function () {
        });
      },
    }
  };
</script>
