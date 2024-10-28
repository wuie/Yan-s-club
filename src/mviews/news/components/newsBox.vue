<template>
  <div class="newsBoxContainer" @click="handleClick">
    <div class="newsPict">
      <img :src="pictureUrl" :alt="newsData.title" @error="handleImageError" />
    </div>
    <div class="newsText">
      <div class="newsTitle">{{ newsData.title }}</div>
      <!-- 假设这里不需要再次显示pictureUrl，而是显示其他内容 -->
      <!-- <div class="newsTitle">{{ pictureUrl }}</div>   -->
      <div class="newContent">{{ newsData.writer + " " + newsData.date }}</div>
    </div>
  </div>
  <el-divider />
</template>

<script setup>
import { defineProps, ref, computed, onMounted } from "vue";
import useUserStore from "@/store/modules/user.js";
import { useRouter } from "vue-router";

const newsData = defineProps([
  "title",
  "writer",
  "date",
  "content",
  "picture",
  "links",
]);
const userStore = useUserStore();
const router = useRouter();

const baseUrl = computed(() => userStore.baseUrl);
const pictureUrl = computed(() => {
  return `${baseUrl.value}${newsData.picture}`;
});
const linkUrl = computed(() => {
  // 使用正则表达式匹配 <a> 标签的 href 属性
  const regex = /<a\s+[^>]*?href=["']([^"']+)["'][^>]*?>/;
  const match = newsData.links.match(regex);

  if (match) {
    // 提取捕获组（即 href 的值）
    return match[1]; // 直接返回第一个捕获组的内容，即 href 的值
  }
  return null; // 如果没有找到匹配项，返回 null
});

// 点击文章跳转文章详情页/原网址
const handleClick = () => {
  console.log("网站地址：", newsData.links);
  if (!newsData.links) {
    router.push({
      path: "/index/newsDetail",
      query: {
        title: newsData.title,
        writer: newsData.writer,
        date: newsData.date,
        contet: newsData.content,
      },
    });
  } else {
    window.open(newsData.links, "__blank");
  }
};
</script>

<style scoped lang="less">
.newsBoxContainer {
  max-width: 90%;
  height: 15vh;
  margin: 0 auto; /* 居中显示 */
  padding: 0;
  list-style-type: none !important;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; /* 注意：这里可能需要根据实际情况调整，因为flex-direction是row */
  flex-direction: row;
  align-items: flex-start; /* 如果需要，可以调整图片和文本的垂直对齐方式 */
  // background-color: red;
  transition: background-color 0.2s ease 0.1s;
}

.newsBoxContainer:hover {
  background-color: rgb(235, 235, 235);
}

.newsTitle:hover {
  color: orange;
  cursor: pointer;
}
.newsPict img {
  width: 30vw;
  height: 10vw;
  object-fit: cover; /* 裁剪图片以填充容器 */
}

.newsText {
  height: 5vw;
  flex: 1; /* 让新闻文本部分填充剩余空间 */
  padding: 2vh 3vw 0 2vw; /* 可选，为文本内容添加一些左边距 */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.newsTitle {
  font-family: PingFangSC-Regular;
  font-size: 1.5vw;
}

.newContent {
  padding-top: 2vh;
  color: grey;
}
img {
  width: 15vw !important;
  height: 15vh !important;
  object-fit: cover !important;
  margin: 0% 0 10% 0 !important;
}

.el-divider--horizontal {
  margin: 2% 0 2% 0;
}
@media (max-aspect-ratio: 4/3) {
  img {
    width: 15vw !important;
    height: 10vh !important;
    object-fit: cover;
    margin: 0% 0 10% 0;
  }
  .newsBoxContainer {
    height: 10vh;
  }
  .newsTitle {
    font-size: 2vh;
    line-height: 4vh;
  }
  .newContent {
    color: grey;
    font-size: 2vh;
  }
}
</style>

<!-- <template>
<div class="newsBoxContainer">
    <div class="newsPict">
        <img :src="pictureUrl">
    </div>
    <div class="newsText">
        <div class="newsTitle">{{ newsData.title }}</div>
        <div class="newsTitle">{{ pictureUrl}}</div>
        <div class="newContent">{{ newsData.writer +" "+ newsData.date}}</div>
    </div>
</div>
</template>

<script setup >
import { defineProps, onMounted } from "vue";
import useUserStore from "@/store/modules/user.js";
{/* <newsBox :title="i.titles" :content="i.content" :writer="i.writers" :picture="i.picture"/> */}

const newsData = defineProps(["title", "writer", "date","content","picture" ])
console.log("111",newsData)
// 拼接头像
const userStore = useUserStore(); // 正确调用store
const baseUrl = computed(() => userStore.baseUrl);
const pictureUrl = computed(() => {
  return `${baseUrl.value}${newsData.picture}`;
});
</script>

<style scoped lang="less">
.newsBoxContainer{
  max-width: 80vw;
  list-style-type: none !important;
  padding: 0%;
  margin: 0%;
  display:flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: row;
  background-color: red;
}

</style> -->
