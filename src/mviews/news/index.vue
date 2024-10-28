<template>
  <div class="newsContainer">
    <ul class="newsBoxContainer" style="  list-style-type: none;">
      <li class="newsBoxLi" v-for="i in newsList" :key="i" >
        <newsBox
          :title="i.titles"
          :content="i.content"
          :writer="i.writers"
          :picture="i.picture"
          :date="i.date"
          :links="i.links"
        />
      </li>
    </ul>
  </div>
</template>

<script setup class="news">
import newsBox from "./components/newsBox.vue";
import { ref, onMounted } from "vue";
import { getNewsListApi } from "@/api/news/index.js";

const newsList = ref([]);

const getNewsList = async () => {
  const res = await getNewsListApi();
  newsList.value = res.rows;
};

onMounted(() => {
  getNewsList().then(() => {
    // 先清除素有title样式
    for (let i of newsList.value) {
      i.titles = i.titles.replace(/<[^>]+>/g, "");
    }
    // 先将所有新闻按照年份进行排序
    newsList.value.sort((a, b) => new Date(b.date) - new Date(a.date));
    console.log("newsNow:", newsList.value);
    // 然后将每一个news数据样式进行修改
    // 将news的titles，content，writers，date，picture传过去
  });
});
</script>

<style scoped lang="less" src="./assets/index.css">
ul.newsBoxContainer {
  list-style-type: none !important;
  cursor: default; /* 改为默认光标 */  


}

.newsBoxLi {
  padding:0 200vh 0 200vh;
  list-style-type: none;
  cursor: default; /* 改为默认光标 */  

}


</style>
