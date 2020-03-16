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
<!-- Created by Tw93 on 16/10/25. -->
<!--A gray overlay mask-->

<template>
  <div>
    <div class="wxc-overlay"
         ref="wxc-overlay"
         v-if="show"
         :hack="shouldShow"
         @click="overlayClicked"
         :style="overlayStyle">
    </div>
  </div>
</template>

<style scoped>
  .wxc-overlay {
    width: 750px;
    position: fixed;
    bottom: 0;
    right: 0;
  }
</style>

<script>
  const animation = weex.requireModule('animation');
  import Utils from '../utils';

  export default {
    props: {
      show: {
        type: Boolean,
        default: true
      },
      top: {
        type: Number,
        default: 0
      },
      left: {
        type: Number,
        default: 0
      },
      hasAnimation: {
        type: Boolean,
        default: true
      },
      duration: {
        type: [Number, String],
        default: 300
      },
      timingFunction: {
        type: Array,
        default: () => (['ease-in', 'ease-out'])
      },
      opacity: {
        type: [Number, String],
        default: 0.6
      },
      canAutoClose: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      overlayStyle () {
        return {
          opacity: this.hasAnimation ? 0 : 1,
          backgroundColor: `rgba(0, 0, 0,${this.opacity})`,
          left: Utils.env.isWeb() ? this.left + 'px' : 0,
          top: this.top + 'px'
        }
      },
      shouldShow () {
        const { show, hasAnimation } = this;
        hasAnimation && setTimeout(() => {
          this.appearOverlay(show);
        }, 50);
        return show;
      }
    },
    methods: {
      overlayClicked (e) {
        this.canAutoClose ? this.appearOverlay(false) : this.$emit('wxcOverlayBodyClicked', {});
      },
      appearOverlay (bool, duration = this.duration) {
        const { hasAnimation, timingFunction, canAutoClose } = this;
        const needEmit = !bool && canAutoClose;
        needEmit && (this.$emit('wxcOverlayBodyClicking', {}));
        const overlayEl = this.$refs['wxc-overlay'];
        if (hasAnimation && overlayEl) {
          animation.transition(overlayEl, {
            styles: {
              opacity: bool ? 1 : 0
            },
            duration,
            timingFunction: timingFunction[bool ? 0 : 1],
            delay: 0
          }, () => {
            needEmit && (this.$emit('wxcOverlayBodyClicked', {}));
          });
        } else {
          needEmit && (this.$emit('wxcOverlayBodyClicked', {}));
        }
      }
    }
  };
</script>
