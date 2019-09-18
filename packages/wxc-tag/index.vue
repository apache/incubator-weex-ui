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
  <div>
    <div v-if="showSolid || showHollow"
         :class="['tag-item','tag-border',showHollow && 'tag-hollow']"
         :style="tagTextStyle">
      <text class="tag-text" :style="{color:fontColor}">{{value}}</text>
    </div>
    <image v-if="showImage"
           :src="img"
           @load="onLoad"
           :aria-hidden="true"
           :style="{ width: imgWidth+'px'}"
           class="tag-image"></image>
    <div class="tag-special tag-border"
         :style="{borderColor:tagColor}"
         :accessible="true"
         :aria-label="value"
         v-if="showSpecial">
      <div class="tag-left" :style="{backgroundColor:tagColor}">
        <image :src="specialIcon" class="left-image"></image>
      </div>
      <text class="tag-text" :style="{color:fontColor}">{{value}}</text>
    </div>
  </div>
</template>

<style scoped>
  .tag-item {
    height: 24px;
    justify-content: center;
    align-items: center;
    /* hack高度不居中问题，后续版本升级去掉 */
    padding-bottom: 2px;
  }

  .tag-border {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .tag-hollow {
    border-width: 1px;
  }

  .tag-image {
    height: 24px;
  }

  .tag-special {
    border-width: 1px;
    flex-direction: row;
  }

  .left-image {
    width: 20px;
    height: 20px;
  }

  .tag-left {
    width: 24px;
    height: 24px;
    align-items: center;
    justify-content: center;
  }

  .tag-text {
    font-size: 20px;
    height: 22px;
    line-height: 22px;
    padding-left: 6px;
    padding-right: 6px;
  }
</style>

<script>
  export default {
    props: {
      type: {
        type: String,
        default: 'solid'
      },
      value: {
        type: [String, Number],
        default: '测试测试'
      },
      tagColor: {
        type: String,
        default: '#ff5000'
      },
      fontColor: {
        type: String,
        default: '#333333'
      },
      specialIcon: {
        type: String,
        default: ''
      },
      img: {
        type: String,
        default: ''
      }
    },
    computed: {
      showSolid () {
        const { type, value } = this;
        return type === 'solid' && value !== '';
      },
      showHollow () {
        const { type, value } = this;
        return type === 'hollow' && value !== '';
      },
      showSpecial () {
        const { type, value, specialIcon } = this;
        return type === 'special' && value !== '' && specialIcon !== '';
      },
      showImage () {
        const { type, img } = this;
        return type === 'image' && img !== ''
      },
      tagTextStyle () {
        const { tagColor, showSolid } = this;
        return showSolid ? { backgroundColor: tagColor } : { borderColor: tagColor }
      }
    },
    data: () => ({
      imgWidth: 90
    }),
    methods: {
      onLoad (e) {
        if (e.success && e.size && e.size.naturalWidth > 0) {
          const width = e.size.naturalWidth;
          const height = e.size.naturalHeight;
          this.imgWidth = width * (24 / height);
        }
      }
    }
  }
</script>
