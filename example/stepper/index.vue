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
<!-- Created by Tw93 on 16/10/25. -->

<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <title title="wxc-stepper"></title>
      <category title="使用案例"></category>
      <div class="demo">
        <text class="text">无配置:</text>
        <wxc-stepper></wxc-stepper>
      </div>
      <div class="demo">
        <text class="text">{min:2,max:10,step:2,defaultValue:4}</text>
        <wxc-stepper :default-value="value"
                     step="2"
                     max="10"
                     min="2"
                     @wxcStepperValueIsMinOver="wxcStepperValueIsMinOver"
                     @wxcStepperValueIsMaxOver="wxcStepperValueIsMaxOver"
                     @wxcStepperValueChanged="wxcStepperValueChanged"></wxc-stepper>
      </div>
      <div class="demo">
        <text class="text">禁用</text>
        <wxc-stepper :default-value="4"
                     step="2"
                     max="10"
                     min="2"
                     :disabled="isDisabled"></wxc-stepper>
      </div>

      <div class="demo">
        <text class="text">input只读:</text>
        <wxc-stepper :read-only="isOnlyRead"></wxc-stepper>
      </div>
    </scroller>
  </div>
</template>

<style scoped>

  .wxc-demo {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #FFFFFF;
  }

  .scroller {
    flex: 1;
  }

  .demo {
    width: 750px;
    align-items: flex-start;
    padding-top: 60px;
    padding-left: 60px;
  }

  .text {
    margin-bottom: 30px;
  }
</style>

<script>
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import { WxcStepper } from '../../index';

  const modal = weex.requireModule('modal');
  import { setTitle } from '../_mods/set-nav';

  export default {
    components: { Title, Category, WxcStepper },
    data: () => ({
      value: 4,
      isDisabled: true,
      isOnlyRead: true
    }),
    created () {
      setTitle('Stepper');
    },
    mounted(){
      setTimeout(()=>{
        this.value=10;
      },2000)
    },
    methods: {
      wxcStepperValueChanged (e) {
        console.log(e.value);
      },
      wxcStepperValueIsMaxOver () {
        modal.toast({
          message: '超过最大值啦'
        })
      },
      wxcStepperValueIsMinOver () {
        modal.toast({
          message: '超过最小值啦'
        })
      }
    }
  };
</script>
