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
<!-- Created by Tw93 on 17/12/25. -->

<template>
  <text class="icon-font" :style="mergeStyle" @click="itemClicked(name)">{{Icon[name]}}</text>
</template>

<style scoped>
  .icon-font {
    color: #666666;
  }
</style>

<script>
  import Icon from './type';

  const dom = weex.requireModule('dom');

  export default {
    props: {
      name: {
        default: 'success',
        type: String
      },
      size: {
        default: 'small',
        type: String
      },
      iconStyle: {
        type: Object,
        default: () => ({})
      }
    },
    data: () => ({
      Icon
    }),
    beforeCreate () {
      dom.addRule('fontFace', {
        'fontFamily': "weexUiIconFont",
        'src': "url('https://at.alicdn.com/t/font_520368_r89ekv69euahsemi.ttf')"
      });
    },
    computed: {
      mergeStyle () {
        const { iconStyle, size } = this;
        let fontSize = '48px';
        switch (size) {
          case 'xs':
            fontSize = '24px';
            break;
          case 'small':
            fontSize = '48px';
            break;
          case 'medium':
            fontSize = '72px';
            break;
          case 'big':
            fontSize = '128px';
            break;
          default:
            fontSize = '48px';
        }
        return {
          fontFamily: 'weexUiIconFont',
          fontSize,
          ...iconStyle
        }
      }
    },
    methods: {
      itemClicked (name) {
        this.$emit('wxcIconClicked', {
          name
        });
      }
    },
  }
</script>
