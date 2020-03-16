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
<!-- Created by Tw93 on 17/07/31. -->

<template>
  <div class="sub-demo">
    <wxc-cell :has-top-border="false" title="标签内容">
      <input class="input"
             placeholder="请输入tag图片链接"
             :value="img"
             @input="img=$event.value"/>
    </wxc-cell>
    <div class="demo">
      <wxc-tag type="image" :img="img"></wxc-tag>
    </div>
  </div>
</template>

<style scoped>
  .input {
    width: 300px;
    text-align: right;
  }

  .demo {
    align-items: center;
    justify-content: center;
    height: 100px;
    margin-bottom: 20px;
  }
</style>

<script>
  import { WxcTag, WxcCell } from '../../index';

  export default {
    components: { WxcTag, WxcCell },
    data: () => ({
      img: '//gtms04.alicdn.com/tfs/TB1ZfodRVXXXXciXFXXXXXXXXXX-92-24.png'
    })
  }
</script>
