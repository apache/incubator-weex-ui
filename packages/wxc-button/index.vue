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
  <div :class="['wxc-btn', isHighlight && !disabled && 'wxc-btn-highlight']"
       :style="mrBtnStyle"
       @click="onClicked"
       :accessible="true"
       :aria-label="text">
    <text class="btn-text" :style="mrTextStyle">{{text}}</text>
  </div>
</template>

<script>
  import { STYLE_MAP, TEXT_STYLE_MAP, BUTTON_STYLE_MAP, TEXT_FONTSIZE_STYLE_MAP } from './type';

  export default {
    props: {
      text: {
        type: String,
        default: '确认'
      },
      size: {
        type: String,
        default: 'full'
      },
      type: {
        type: String,
        default: 'red'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      isHighlight: {
        type: Boolean,
        default: false
      },
      btnStyle: Object,
      textStyle: Object,
      disabledStyle: Object
    },
    computed: {
      mrBtnStyle () {
        const { type, disabled, btnStyle, size, disabledStyle } = this;

        const mrBtnStyle = {
          ...STYLE_MAP[type],
          ...BUTTON_STYLE_MAP[size],
          ...btnStyle
        };

        let disabledInStyle = { opacity: 0.2 };
        if (type === 'white') {
          disabledInStyle = { backgroundColor: 'rgba(0, 0, 0, 0.1)' };
        }

        return disabled ? {
          ...mrBtnStyle,
          ...disabledInStyle,
          ...disabledStyle,
          borderWidth: 0
        } : mrBtnStyle;
      },
      mrTextStyle () {
        const { type, disabled, textStyle, size } = this;
        const mrTextStyle = { ...TEXT_STYLE_MAP[type], ...TEXT_FONTSIZE_STYLE_MAP[size], ...textStyle };
        return disabled ? { ...mrTextStyle, color: '#FFFFFF' } : mrTextStyle;
      }
    },
    methods: {
      onClicked (e) {
        const { type, disabled } = this;
        this.$emit('wxcButtonClicked', { e, type, disabled });
      }
    }
  };
</script>

<style scoped>
  .wxc-btn {
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    opacity: 1;
  }

  .wxc-btn-highlight:active {
    opacity: .8;
  }

  .btn-text {
    text-overflow: ellipsis;
    lines: 1;
    color: #ffffff;
  }
</style>
