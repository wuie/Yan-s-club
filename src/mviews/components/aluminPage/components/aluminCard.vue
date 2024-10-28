<template>
  <!-- 个人信息卡片 -->
  <div class="aluminCardLi">
    <img :src="aluminUrl" alt="头像" class="avatar" />
    <div class="name">{{ aluminInfo.aluminInfo.name }}</div>
    <el-divider style="width: 10vh ;margin:15px 0px 15px 0px;"/>
    <div class="textInfo">
        <div class="info-item"><span class="label">导师</span>{{ aluminInfo.aluminInfo.tutor }}</div>
        <div class="info-item"><span class="label">工作单位</span>{{ aluminInfo.aluminInfo.workPosition }}</div>
        <div class="info-item"><span class="label">毕业年份</span>{{ aluminInfo.aluminInfo.year }}</div>
        <div class="info-item"><span class="label">邮箱</span>{{ aluminInfo.aluminInfo.email }}</div>
        <div class="info-item"><span class="label">电话</span>{{ aluminInfo.aluminInfo.phone }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";
import useUserStore from "@/store/modules/user.js";  

const aluminInfo = defineProps({ aluminInfo: Array });
const userStore = useUserStore();  
const baseUrl = computed(() => userStore.baseUrl);  
const aluminUrl = computed(() => {  
    return `${baseUrl.value}${aluminInfo.aluminInfo.picture}`;  
  });  

onMounted(() => {
  console.log(aluminInfo);
  console.log('头像：',aluminUrl)
});
// 个人信息
</script>

<style scoped lang="less">
// 所有的毕业生信息：名字，头像，email，电话，导师，毕业年份，工作岗位，介绍文案
.aluminCardLi {
  min-width:300px;
  min-height:300px;
  width: 100%;
  position: relative; /* 设置为相对定位，作为子元素的定位参考 */
  padding-left: 6vh;
  padding-top:2vh;
  border-radius: 3px;
  box-shadow: 1px 1px 1px 1px gray;
}

.avatar {  
  position: absolute; /* 绝对定位 */  
  top: -5vh; /* 向上移动头像高度的一半（即50px），使头像的一半在容器上方 */  
  left: 37.5%; /* 如果需要，可以调整这个值来改变头像的水平位置 */  
  width: 10vh; /* 头像宽度 */  
  height: 10vh; /* 头像高度，与宽度相同以保持正方形 */  
  background-color: red; /* 临时背景色，用于演示，实际应使用img标签或背景图片 */  
  border-radius: 50%; /* 将头像裁剪为圆形 */  
  /* 如果使用img标签，则不需要background-color和下面的object-fit属性 */  
  /* object-fit: cover; /* 仅当使用背景图片或img标签且需要覆盖整个圆形区域时使用 */  
}  

.textInfo{
  display: flex;
  flex-direction: column;
  height: 30vh;
   justify-content: space-around;
    padding-top: -1vh;
    padding-right: 3vh;
}

.info-item {  
  display: flex;  
  align-items: center; /* 垂直居中对齐 */  
  margin-bottom: 10px; /* 底部边距 */  
}  
  
.label {  
  min-width: 80px; /* 标签的最小宽度 */  
  color: grey;  
  margin-right: 10px; /* 标签和值之间的间距 */  
}  

.name{
    font-size: 18px;
    font-weight: 600;
    /* font-family: PingFangSC-medium; */

    padding-top: 3vh;
}
.workPosition .year{  
  word-break: break-all; /* 或者使用 break-word，取决于你的具体需求 */  
  overflow-wrap: break-word; /* 允许长单词或 URL 地址内部进行断行 */  
  white-space: normal; /* 确保空白字符的处理是默认的，不是nowrap */  
}

.tutor, .workPosition{
    color: grey;
}


@media (max-aspect-ratio: 4/3) { 
  .name{
    font-size: 2.5vh;
    font-weight: 500;
    /* font-family: PingFangSC-medium; */

    padding-top: 3vh;
}
.textInfo{
    line-height: 3vh;
    padding-top: -1vh;
    font-size: 2vh;
}
}
</style>
