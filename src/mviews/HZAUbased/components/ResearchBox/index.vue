<template>
<div class="ResearchBox">
    <div class="researchTitle">{{ research.title }}</div>
    <div class="researchIntroduce">{{ research.content }}</div>
</div>
</template>

<script setup>
import { defineProps } from 'vue';
const research = defineProps(['title','content'])

</script>

<style lang="less">
.ResearchBox{
    margin-bottom: 4vh;
    position: relative;
}
.researchTitle{
    padding-bottom: 2vh;
    /* font-family: PingFangSC-medium; */

    font-size: 2vh;
    font-weight: 600;
}
.researchIntroduce{
    /* font-family: PingFangSC-medium; */

    font-size: 15px;
    color: rgb(145, 145, 145);
    text-overflow: ellipsis;
    /* font-family: PingFangSC-medium; */
  
    font-size: 15px;  
    line-height: 1.5; /* 使用更合适的行高 */  

}
</style>