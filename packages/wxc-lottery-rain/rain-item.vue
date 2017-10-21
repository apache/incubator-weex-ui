<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/09/06. -->
<!--A weex lottery rain game,this is an item-->

<template>
  <image :src="src"
         :style="pos"
         @click="caught"
         class="rain-item"
         v-if="showItem && src"
         :ref="`rain-item-${rainId}`"></image>
</template>

<style scoped>
  .rain-item {
    position: absolute;
    opacity: 0;
  }
</style>

<script>
  import * as Ani from './libs/animate.js';
  import * as  CFG from './libs/config.js';
  import Region from './libs/region.js';

  export default {
    props: {
      src: String,
      rainId: [String, Number],
      config: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      // 合并用户配置和默认
      cfg () {
        return {
          ...CFG.DEFAULT,
          ...this.config
        }
      }
    },
    data: () => ({
      showItem: false,
      hiding: false,
      pos: {},
      showTimer: null,
      hideTimer: null,
      intervalTimer: null
    }),
    created () {
      const { width, height } = this.cfg;
      this.pos = Region.get(width, height);
    },
    mounted () {
      this.start();
    },
    methods: {
      start () {
        const { cfg } = this;
        const random = Math.round(Math.random() * cfg.randomTime);
        const showTime = cfg.showTime + random;
        const intervalTime = Math.max(cfg.intervalTime, cfg.showAniTime + showTime + cfg.hideAniTime) + random;

        this.onShow = () => {
          this.hideTimer = setTimeout(() => {
            this.hide();
          }, showTime);
        };

        this.onHide = () => {
          Region.remove(this.pos);
          this.pos = {};
          this.showItem = false;
          this.hiding = false;
          const { width, height } = this.cfg;
          this.pos = Region.get(width, height);
        };

        this.showTimer = setTimeout(() => {
          this.show();
        }, random);

        this.intervalTimer = setInterval(() => {
          this.show();
        }, intervalTime);
      },

      hide () {
        const { cfg, rainId } = this;
        this.hiding = true;
        clearTimeout(this.showTimer);
        clearTimeout(this.hideTimer);
        Ani.hidePig(this.$refs[`rain-item-${rainId}`], cfg.hideAniTime, this.onHide);
      },

      show () {
        const { cfg, rainId } = this;
        this.showItem = true;
        Ani.showPig(this.$refs[`rain-item-${rainId}`], cfg.showAniTime, this.onShow);
      },

      caught () {
        const { rainId, hiding } = this;
        if (hiding) return;
        clearTimeout(this.showTimer);
        clearTimeout(this.hideTimer);
        Ani.shakePig(this.$refs[`rain-item-${rainId}`], () => {
          this.hide();
        });
        this.$emit('wxcLotteryRainCaught', { rainId });
      },

      destroy () {
        Region.remove(this.pos);
        clearTimeout(this.showTimer);
        clearTimeout(this.hideTimer);
        clearInterval(this.intervalTimer);
        this.showItem = false;
      }
    }
  }
</script>
