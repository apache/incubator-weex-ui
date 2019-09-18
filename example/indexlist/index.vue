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
<!-- Created by Tw93 on 16/10/26. -->
<!-- Update by Tw93 on 17/10/21. -->

<template>
  <div class="container">
    <wxc-indexlist :normal-list="list.normalList"
                   :hot-list-config="hotListConfig"
                   :city-location-config="cityLocationConfig"
                   :show-index="showIndex"
                   @wxcIndexlistItemClicked="wxcIndexlistItemClicked"></wxc-indexlist>
  </div>
</template>

<style scoped>
  .container {
    width: 750px;
    align-items: center;
  }
</style>

<script>
  const modal = weex.requireModule('modal');
  import { WxcIndexlist } from '../../index';
  import { dataList } from './data.js';
  import { setTitle } from '../_mods/set-nav';

  export default {
    components: { WxcIndexlist },
    data: () => ({
      list: dataList,
      showIndex: true,
      hotListConfig: {
        type: 'group',
        title: '热门',
        list: dataList.hotList
      },
      cityLocationConfig: {
        type: 'group',
        title: '定位',
        list: [{ name: '杭州', isLocation: true }]
      }
    }),
    created () {
      setTitle('IndexList');
    },
    methods: {
      wxcIndexlistItemClicked (e) {
        modal.toast({ 'message': JSON.stringify(e.item), 'duration': 1 });
      }
    }
  };
</script>
