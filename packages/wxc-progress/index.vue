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
  <div class="wxc-progress"
       :style="runWayStyle"
       :accessible="true"
       :aria-label="`进度为百分之${value}`">
    <div class="progress" :style="progressStyle"></div>
  </div>
</template>

<style scoped>
  .wxc-progress {
    background-color: #f2f3f4;
  }

  .progress {
    position: absolute;
    background-color: #FFC900;
  }
</style>

<script>
  export default {
    props: {
      barColor: {
        type: String,
        default: '#FFC900'
      },
      barWidth: {
        type: Number,
        default: 600
      },
      barHeight: {
        type: Number,
        default: 8
      },
      barRadius: {
        type: Number,
        default: 0
      },
      value: {
        type: Number,
        default: 0
      },
      backgroundColor: {
        type: String,
        default: '#f2f3f4'
      }
    },
    computed: {
      runWayStyle () {
        const { barWidth, barHeight, barRadius, backgroundColor } = this;
        return {
          width: barWidth + 'px',
          height: barHeight + 'px',
          borderRadius: barRadius + 'px',
          backgroundColor
        }
      },
      progressStyle () {
        const { value, barWidth, barHeight, barColor,barRadius } = this;
        const newValue = value < 0 ? 0 : (value > 100 ? 100 : value);
        return {
          backgroundColor: barColor,
          borderRadius: barRadius + 'px',
          height: barHeight + 'px',
          width: newValue / 100 * barWidth + 'px'
        }
      }
    }
  }
</script>
