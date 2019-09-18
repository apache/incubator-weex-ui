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
  <text :class="['wxc-text', textTheme,hasTextMargin ? 'margin-text' : '']" :style="themeStyle">{{textValue}}</text>
</template>

<style scoped>
  .wxc-text {
    font-size: 24px;
    color: #3d3d3d;
  }

  .black {
    color: #3D3D3D;
  }

  .yellow {
    color: #EE9900;
  }

  .blue {
    color: #30A0FF;
  }

  .gray {
    color: #A5A5A5;
  }

  .red {
    color: #FF5000;
  }

  .margin-text {
    margin-right: 6px;
  }
</style>

<script>
  export default {
    props: {
      textValue: {
        type: String,
        default: ''
      },
      textTheme: {
        type: String,
        default: 'gray'
      },
      textStyle: {
        type: Object,
        default: () => ({})
      },
      hasTextMargin: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      themeStyle () {
        let style = { ...this.textStyle };
        if (style && (style.fontSize || style['font-size'])) {
          style = {
            ...style,
            fontSize: `${style.fontSize || style['font-size']}px`,
            height: `${(style.fontSize || style['font-size']) * 1.2}px`
          }
        }
        return style;
      }
    }
  };
</script>
