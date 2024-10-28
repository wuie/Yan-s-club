<template>
<div class="researchABox">
    <div class="researchTitle">{{ research.title}}</div>
    <div class="researchIntroduce">{{ research.content }}</div>
</div>
</template>

<script setup>
import { defineProps } from 'vue';
const research = defineProps(['title','content'])

</script>

<style lang="less">
.researchABox{
    padding-bottom: 4vh;
}
.researchTitle{
    padding-bottom: 2vh;
    /* font-family: PingFangSC-medium; */

    font-size: 2vh;
}
.researchIntroduce{
    /* font-family: PingFangSC-medium; */

    font-size: 15px;
    line-height: 3vh;
    color: rgb(145, 145, 145);
}
</style>