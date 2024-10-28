<template >
    <div class="bulletinLi">
<div class="bulletTitle" @click="goTarget(proxy.link,proxy.id)">{{proxy.title}}</div>
<div class="bulletDetail">{{proxy.date}}</div>
</div>
</template>

<script setup >
import {onMounted,defineProps} from 'vue'
import {addBulletinPVsAPI} from "@/api/Home/bulletin.js"
const proxy = defineProps(['title','date','link','id'])


// 点击链接跳转
function goTarget(url,id) {
  window.open(url, "__blank");
  addBulletinPVs(id);
}

// 点击增加浏览量
const addBulletinPVs=async(id)=>{
const res = await addBulletinPVsAPI(id);
console.log(res.code);
}
</script>

<style scoped>
.bulletinLi{
    padding-bottom: 1vh;
    transition: background-color 0.2s ease 0.1s;
}
.bulletinLi:hover{
  background-color: rgb(235, 235, 235) ;
}
.bulletTitle{
    cursor: pointer;
margin: 0%;
    font-weight:600;
    font-size:2vh;
    line-height:2.5vh;
    margin:0%;
    /* font-family: PingFangSC-medium; */

    transition:color 0.2s ease 0.1s;

   
}
.bulletTitle:hover{
    color: orange;
}
.bulletDetail{
    color: grey;
font-size: 1.7vh;
font-weight:lighter;
padding-top:1vh;
padding-bottom:2vh;
line-height:2.5vh;
font-family: PingFangSC-Semibold;
}
</style>