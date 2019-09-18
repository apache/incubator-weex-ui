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
  <wxc-cell :has-top-border="hasTopBorder"
            :cell-style="{backgroundColor:backgroundColor}"
            @wxcCellClicked="wxcCellClicked"
            :accessible="true"
            :aria-label="`${title},状态为${checked?'已选中':'未选中'},${disabled?'不可更改':''}`">
    <text :style="{color:color}"
          class="title-text"
          slot="title">{{title}}</text>
    <image :src="radioIcon"
           v-if="radioIcon"
           slot="value"
           class="radio"></image>
  </wxc-cell>
</template>

<style scoped>
  .radio {
    width: 36px;
    height: 36px;
  }

  .title-text {
    font-size: 30px;
    height: 40px;
    line-height: 40px;
  }
</style>

<script>
  import WxcCell from '../wxc-cell';
  import { CHECKED, DISABLED } from './type.js'

  export default {
    components: { WxcCell },
    props: {
      hasTopBorder: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        require: true
      },
      value: {
        type: [String, Number, Object],
        require: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      checked: {
        type: Boolean,
        default: false
      },
      config: {
        type: Object,
        default: () => ({})
      }
    },
    data: () => ({
      icon: [CHECKED, DISABLED]
    }),
    computed: {
      radioIcon () {
        const { icon, disabled, checked, config } = this;
        const mergeIcon = icon;
        config.checkedIcon && (mergeIcon[0] = config.checkedIcon);
        config.disabledIcon && (mergeIcon[1] = config.disabledIcon);
        return checked ? mergeIcon[disabled ? 1 : 0] : '';
      },
      backgroundColor () {
        const { disabled } = this;
        return disabled ? '#F2F3F4' : '#FFFFFF';
      },
      color () {
        const { disabled, checked, config } = this;
        let checkedColor = '#EE9900';
        config.checkedColor && (checkedColor = config.checkedColor);
        return checked && !disabled ? checkedColor : '#3D3D3D';
      }
    },
    methods: {
      wxcCellClicked () {
        const { disabled, value } = this;
        if (!disabled) {
          this.$emit('wxcRadioItemChecked', { value, disabled })
        }
      }
    }
  }
</script>
