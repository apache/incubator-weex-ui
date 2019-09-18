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
  <div @click="onLinkClick">
    <wxc-rich-text-text
      :text-value="linkValue"
      :has-text-margin="hasTextMargin"
      :text-style="linkStyle?linkStyle:defObj"
      :text-theme="linkTheme?linkTheme:'black'"></wxc-rich-text-text>
  </div>
</template>

<script>
  import Utils from '../utils';
  import WxcRichTextText from './wxc-rich-text-text.vue'

  export default {
    components: { WxcRichTextText },
    props: {
      linkValue: {
        type: [String, Number],
        default: ''
      },
      hasTextMargin: {
        type: Boolean,
        default: true
      },
      linkHref: {
        type: String,
        default: ''
      },
      linkTheme: {
        type: String,
        default: 'black'
      },
      linkStyle: {
        type: Object,
        default: () => ({})
      }
    },
    data: () => ({
      defObj: {}
    }),
    methods: {
      onLinkClick (e) {
        this.$emit('wxcRichTextLinkClick', { element: e, href: this.linkHref });
        Utils.goToH5Page(this.linkHref);
      }
    }
  };
</script>
