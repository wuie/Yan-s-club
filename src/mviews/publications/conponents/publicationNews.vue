<template>
  <div class="publicationNews">
    <a :href="newsUrl" target="_blank">
      <div class="newsTitle">
        {{ personList.title }}
      </div>
    </a>
    <div class="newsAuthor">
      {{ personList.writers }}
    </div>
    <div class="newsDate">
      {{ formattedDate }}
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted } from "vue";
import useUserStore from "@/store/modules/user.js";
const personList = defineProps(["title", "writers", "date", "pdf"]);

// 拼接论文地址
const userStore = useUserStore(); // 正确调用store
const baseUrl = computed(() => userStore.baseUrl);
const newsUrl = computed(() => {
  return `${baseUrl.value}${personList.pdf}`;
});

//格式化日期
const formattedDate = computed(() => {
  const date = new Date(personList.date);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
});
</script>

<style>
.publicationNews {
  transition: background-color 0.2s ease 0.1s;  
  padding-top: 2vh;
}

.publicationNews:hover{
  background-color: rgb(235, 235, 235);
}
.newsTitle {
  line-height: 3vh;
  font-size: 2vh;
  font-weight: bold;
  font-family: PingFangSC-Semibold;
  transition: color 0.2s ease 0.1s;  
}
.newsTitle:hover{
  color: orange !important;
}
.newsAuthor {
  font-size: 1.8vh;
  font-family: PingFangSC-Semibold;
  color: rgb(54, 54, 54);
  cursor: text;
}

.newsDate {
  /* font-family: PingFangSC-medium; */

  color: grey;
  font-size: 1.5vh;
  cursor: text;
}
</style>
