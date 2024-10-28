<template>
  <div class="resourceArcticContainer">
    <div class="resourceTitleBox">
      <div style="background-color:orange;width:1vh;height:3vh;margin-top: 15px;"></div>
      <div class="resouceTitle">&nbsp;{{ resourceArctic.title }}</div>
    </div>
    <el-divider />
    <div class="ql-editor" v-html="resourceArctic.content"></div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
const resourceArctic = defineProps(['title','content'])
</script>

<style scoped lang="less">
.resourceTitleBox {
  display: flex;
  flex-direction: row;
  justify-content: left;
}
.resouceTitle {
  padding-top: 2vh;
    font-size:3vh;
    /* font-family: PingFangSC-medium; */

    font-weight: bold;
}
.resourceInformation{
  /* font-family: PingFangSC-medium; */

  font-size: 2.3vh;
  line-height:4vh;
    
}
.el-divider--horizontal {
  margin: 2% 0 2% 0;
}
</style>
