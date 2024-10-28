<template>
  <ul class="aluminCardBox">
    <li v-for="i in aluminList" class="aluminCard">
      <aluminCard :aluminInfo="i" class="cardDetail"/>
    </li>
  </ul>
</template>

<script setup>
import { useRoute } from "vue-router";
// 接口函数
import { getAluminListApi } from "@/api/alumin/alumin.js";
import { ref, onMounted } from "vue";
// 毕业生信息卡片组件
import aluminCard from "./components/aluminCard.vue";
//首先在setup中定义
const route = useRoute();
const aluminList = ref([]);
let aluminKind = route.query.kind;

// 获取全部指定kind下毕业生函数
const getAluminList = async () => {
  try {
    const res = await getAluminListApi(aluminKind);
    if (res && res.code === 200 && Array.isArray(res.rows)) {
      aluminList.value = res.rows; // 只将 rows 数组赋值给 aluminList.value
      console.log("aluminList:", aluminList.value); // 这里应该能看到正确的数据
    } else {
      console.error("Invalid response format:", res);
    }
  } catch (error) {
    console.error("Failed to fetch alumnus list:", error);
  }
};


onMounted(() => {
  getAluminList().then(() => {
    console.log("aluminList:", aluminList.value);
  });
});
</script>

<style scoped lang="less">
.aluminCardBox {
  display: flex;
  list-style-type: none; /* 移除列表项前的默认标记（如圆点或数字） */
  padding: 5vh;
  flex-direction: row;
  flex-wrap:wrap;

}

.aluminCard{
  margin:2vh;
  width: 30%;
  margin-bottom:5%;
}

.cardDetail{
  width: 100%;
}

@media (max-aspect-ratio: 4/3) { 
  .aluminCardBox {
    padding: 2vh;
  }

  .aluminCard{
  margin:0 2.5% 0 2.5%;
  width: 45%;
  margin-bottom:10%;
}
}
</style>
