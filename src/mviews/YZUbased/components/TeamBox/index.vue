<template class="teamBox">
    <div>
        <ul class="teamContainer">
            <li v-for = "item in personList.PersonDatas" :key="item.id"  class="teamBoxLi">
               <workerBox :name="item.name" :avater="item.picture" :way="item.way" :id="item.id" :kind="personList.kind"/>
            </li>
        </ul>
    </div>
</template>

<script setup>
import workerBox from './components/workerBox'
import {defineProps,onMounted} from 'vue'
const personList = defineProps({PersonDatas:Array,kind:String})
</script>

<style lang="less" src='./assets/teamBox.css'></style>