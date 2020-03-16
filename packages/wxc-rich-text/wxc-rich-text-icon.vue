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
<!-- Created by Tw93 on 17/07/28. -->

<template>
  <image class="wxc-image"
         :src="iconSrc"
         :aria-hidden="true"
         @load="onLoad"
         :style="{ width: computedStyle.width, height: computedStyle.height }">
  </image>
</template>

<style scoped>
  .wxc-image {
    width: 90px;
    height: 24px;
    margin-right: 6px;
  }
</style>

<script>
  export default {
    props: {
      iconSrc: String,
      iconStyle: {
        type: Object,
        default: () => ({
          height: 24
        })
      }
    },
    data: () => ({
      width: 90
    }),
    computed: {
      computedStyle () {
        const { width, iconStyle } = this;
        if (iconStyle && iconStyle.width && iconStyle.height) {
          return {
            width: `${iconStyle.width}px`,
            height: `${iconStyle.height}px`
          }
        } else {
          return {
            width: `${width}px`,
            height: `${iconStyle.height}px`
          }
        }
      }
    },
    methods: {
      onLoad (e) {
        if (e.success && e.size && e.size.naturalWidth > 0) {
          const width = e.size.naturalWidth;
          const height = e.size.naturalHeight;
          this.width = width * (this.iconStyle.height / height);
        }
      }
    }
  };
</script>
