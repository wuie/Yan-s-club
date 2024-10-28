<template class="interestBox">
    <div class="interestContainer">
        <div class="interestTitle">{{proxy.title}}</div>
        <div class="interestDetail">
            {{proxy.content}}
        </div>
    </div>
</template>

<script setup>
import {onMounted,defineProps} from 'vue'
const proxy = defineProps(['title','content'])
// onMounted(()=>{
//     console.log(1);
//     console.log(proxy.title)
//     console.log(proxy.content)
// })
</script>
<style scoped lang="less">
.interestContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    word-wrap: break-word;
    /* 确保长单词换行 */
    overflow-wrap: break-word;
    /* 确保长单词换行（兼容性更好） */
    word-break: break-word;
    /* 确保长单词换行 */
    white-space: normal;
    /* 确保文本正常换行 */
    max-width: 100%;
    /* 确保子组件宽度不超过父组件 */
}

.interestContainer:hover .interestTitle {
    color: rgb(0, 0, 0);
}

.interestTitle {
    /* font-family: PingFangSC-medium; */

    font-weight: 600;
    font-size: 2vh;
    margin: 0%;
}

.interestDetail {
    color: rgb(99, 99, 99);
    font-size: 1.8vh;
    font-weight: lighter;
    /* font-family: PingFangSC-medium; */

    padding-top: 0.5vh;
    padding-bottom: 3vh;
    line-height: 2.8vh;
}
</style>