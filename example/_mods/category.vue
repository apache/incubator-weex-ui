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
<!-- Created by Tw93 on 17/03/31. -->

<template>
  <div class="category">
    <text class="category-text">{{title}}</text>
  </div>
</template>

<style scoped>
  .category {
    margin-top: 20px;
    padding-left: 24px;
    width: 750px;
    height: 68px;
    background-color: #FFF100;
    justify-content: center;
  }

  .category-text {
    color: #000000;
    font-weight: 600;
    font-size: 28px;
  }

</style>

<script>
  export default {
    props: {
      title: String
    }
  }
</script>
