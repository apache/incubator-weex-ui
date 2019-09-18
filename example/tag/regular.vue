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
  <div class="tag-list">
    <wxc-tag v-for="(item,index) in demoData"
             :key="index"
             v-bind="item"></wxc-tag>
  </div>
</template>

<style scoped>
  .tag-list {
    flex-direction: row;
    justify-content: space-between;
    padding-top: 40px;
    padding-right: 24px;
    padding-left: 24px;
    padding-bottom: 60px;
  }
</style>

<script>
  import { WxcTag } from '../../index';
  import Data from './data'
  export default {
    components: { WxcTag },
    data: () => ({
      demoData:Data
    })
  }
</script>
