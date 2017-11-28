<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 16/10/26. -->
<!--A loading indicator. Custom text supported. -->

<template>
  <div :hack-show="needShow">
    <div class="wxc-loading"
         :style="{ top: topPosition +'px'}"
         v-if="showLoading">
      <div :class="['loading-box',loading.class]" :aria-hidden="true">
        <image :src="loading.url"
               class="loading-trip-image"
               resize="contain"
               quality="original"></image>
        <text v-if="loadingText"
              class="loading-text">{{loadingText}}</text>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .wxc-loading {
    position: fixed;
    left: 287px;
    top: 500px;
    z-index: 9999;
  }

  .loading-box {
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    width: 175px;
    height: 175px;
    background-color: rgba(0, 0, 0, 0.8);
  }

  .trip-loading {
    background-color: rgba(0, 0, 0, .2);
  }

  .loading-trip-image {
    height: 75px;
    width: 75px;
  }

  .loading-text {
    color: #ffffff;
    font-size: 24px;
    line-height: 30px;
    height: 30px;
    margin-top: 8px;
    text-overflow: ellipsis;
    width: 140px;
    text-align: center;
  }
</style>

<script>
  import { GIF, BLACK_GIF } from './type';
  import Utils from '../utils';

  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      loadingText: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'default'
      },
      interval: {
        type: [Number, String],
        default: 0
      }
    },
    data: () => ({
      showLoading: false,
      tid: 0
    }),
    computed: {
      showText () {
        return this.loadingText;
      },
      loading () {
        let loading = {};
        switch (this.type) {
          case 'trip':
            loading = {
              url: GIF,
              class: 'trip-loading'
            };
            break;
          default:
            loading = {
              url: BLACK_GIF,
              class: 'default-loading'
            }
        }
        return loading;
      },
      topPosition () {
        return (Utils.env.getPageHeight() - 200) / 2;
      },
      needShow () {
        this.setShow();
        return this.show;
      }
    },
    methods: {
      setShow () {
        const { interval, show, showLoading } = this;
        const stInterval = parseInt(interval);
        clearTimeout(this.tid);
        if (show) {
          if (showLoading) {
            return;
          }
          if (stInterval === 0) {
            this.showLoading = true;
          } else {
            this.tid = setTimeout(() => {
              this.showLoading = true;
            }, stInterval);
          }
        } else {
          this.showLoading = false;
        }
      }
    }
  };
</script>
