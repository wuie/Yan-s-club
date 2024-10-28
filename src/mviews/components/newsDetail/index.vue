<template>
    <div class="detailContainer">
        <div class="newsName">{{ title }}</div>
        <div class="newsHeader">
            <div class="newsIntroduce">发布时间：{{ date }} | 作者：{{ writer }}</div>
        </div>
        <div class="newsContent" v-html="content"></div>
    </div>
 </template>

<script setup>
import { useRoute } from 'vue-router'



//首先在setup中定义
const route = useRoute()
// console.log(route)
//query
let title=route.query.title;
let writer = route.query.writer;
let date = route.query.date;
let content = route.query.contet
// console.log('avateru',userAvater)
// console.log(username)

</script>

<style scoped lang="less">
.detailContainer{
    width: 90%;
    padding-left: 5%;
}

.newsName{
    display: flex;
    justify-content: center;
    font-size: 3.5vh;
    font-weight: bold;
    padding-top: 3vh;
}

.newsHeader{
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: 2vh;
}

.newsContent{
    padding: 3vw;
}

.newsIntroduce{
    padding: 1vw;
}
</style>