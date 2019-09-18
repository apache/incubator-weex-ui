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
  <div :class="['wxc-tag', 'border-' + tagTheme]"
       :style="newTheme.divStyle">
    <text :class="['tag-text', tagTheme]"
          :style="newTheme.textStyle">{{tagValue}}</text>
  </div>
</template>

<style scoped>
  .wxc-tag {
    border-color: #3d3d3d;
    border-width: 2px;
    border-radius: 4px;
    margin-right: 6px;
    background-color: transparent;
    padding-left: 6px;
    padding-right: 6px;
    height: 26px;
    justify-content: center;
    align-items: center;
  }

  .tag-text {
    font-size: 20px;
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

  .border-black {
    border-color: #A5A5A5;
  }

  .border-yellow {
    border-color: #EE9900;
  }

  .border-blue {
    border-color: #30A0FF;
  }

  .border-gray {
    border-color: #A5A5A5;
  }

  .border-red {
    border-color: #FF5000;
  }
</style>

<script>
  export default {
    props: {
      tagValue: {
        type: [String, Number],
        default: ''
      },
      tagTheme: {
        type: String,
        default: 'blue'
      },
      tagStyle: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      newTheme () {
        const tagStyle = this.tagStyle;
        const tagValue = this.tagValue;
        let divStyle = {};
        let textStyle = {};
        if (tagStyle && tagStyle.fontSize) {
          textStyle = {
            ...textStyle,
            fontSize: `${tagStyle.fontSize}px`
          }
        }
        if (tagStyle && tagStyle.color) {
          textStyle = {
            ...textStyle,
            color: tagStyle.color
          }
        }

        if (tagStyle && tagStyle.borderColor) {
          divStyle = {
            ...divStyle,
            borderColor: tagStyle.borderColor
          }
        }

        if (tagStyle && tagStyle.borderWidth) {
          divStyle = {
            ...divStyle,
            borderWidth: `${tagStyle.borderWidth}px`
          }
        }

        if (tagStyle && tagStyle.borderRadius) {
          divStyle = {
            ...divStyle,
            borderRadius: `${tagStyle.borderRadius}px`
          }
        }

        if (tagStyle && tagStyle.backgroundColor) {
          divStyle = {
            ...divStyle,
            backgroundColor: tagStyle.backgroundColor
          }
        }

        if (tagStyle && tagStyle.height) {
          divStyle = {
            ...divStyle,
            height: `${tagStyle.height}px`
          };
        }

        if (tagStyle && tagStyle.width) {
          divStyle = {
            ...divStyle,
            width: `${tagStyle.width}px`
          };
        }

        if (tagValue && tagValue.length === 1) {
          divStyle = {
            ...divStyle,
            paddingLeft: 0,
            paddingRight: 0
          };
        }

        return {
          divStyle,
          textStyle
        };
      }
    }
  };
</script>

